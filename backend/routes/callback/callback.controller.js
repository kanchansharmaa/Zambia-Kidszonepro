const { insertCallback, insertIntoSubscription, insertIntoBillingSuccess, updateTblSubscription,insertIntoUnsub } = require('./callback.services');
const pool = require('../../config/db');

module.exports = {
    getCallback: (req, res) => {
        let data = {
            vendorName: req.query.vendorName,
            circle: req.query.circle,
            msisdn: req.query.msisdn,
            amount: req.query.amount,
            transactionId: req.query.transactionId,
            action: req.query.action,
            userStatus: req.query.userStatus,
            operator: req.query.operator,
            channel: req.query.channel,
            packName: req.query.packName,
            language: req.query.language
        };

        console.log("Data received:", data);
        insertCallback(data).then(result => {
            console.log("Inserted in callback");

            if (data.userStatus === '0') {
                pool.query(`SELECT * FROM tbl_subscription WHERE msisdn='${data.msisdn}'`, [], (err, results) => {
                    if (err) {
                        console.error("Error querying subscription:", err);
                        res.status(500).send('Error checking subscription');
                    } else if (results.length > 0) {
                        data.type_event = 'REN';
                        insertIntoBillingSuccess(data).then(billingSuccessResult => {
                            console.log("Inserted into billing success with REN");

                            // Call updateTblSubscription after successful billing success entry
                            updateTblSubscription(data).then(updateResult => {
                                console.log("Updated tbl_subscription successfully with REN");
                                res.status(200).json({response: "Success"});
                            }).catch(updateError => {
                                console.error("Error updating tbl_subscription:", updateError);
                                res.status(500).send('Error updating subscription');
                            });

                        }).catch(billingSuccessError => {
                            console.error("Error inserting into billing success:", billingSuccessError);
                            res.status(500).send('Error processing billing success');
                        });
                    } else {
                        // User does not exist, proceed with SUB
                        data.type_event = 'SUB';
                        insertIntoSubscription(data).then(subscriptionResult => {
                            console.log("Inserted into subscription with SUB");
                            insertIntoBillingSuccess(data).then(billingSuccessResult => {
                                console.log("Inserted into billing success with SUB");
                                res.status(200).json({response: "Success"});
                            }).catch(billingSuccessError => {
                                console.error("Error inserting into billing success:", billingSuccessError);
                                res.status(500).send('Error processing billing success');
                            });
                        }).catch(subscriptionError => {
                            console.error("Error inserting into subscription:", subscriptionError);
                            res.status(500).send('Error processing subscription');
                        });
                    }
                });
            }
            
            else if (data.userStatus === '1') {
                // User intends to unsubscribe
                insertIntoUnsub(data).then(unsubResult => {
                    console.log("Inserted into tbl_unsub successfully");
                    res.status(200).json({response: "Unsubscribed successfully"});
                }).catch(unsubError => {
                    console.error("Error inserting into tbl_unsub:", unsubError);
                    res.status(500).send('Error processing unsubscription');
                });
            } 
            
            else{
                res.status(200).json({response: "Invalid action"});
            }
        }).catch(error => {
            console.error("Error inserting data into callback:", error);
            res.status(500).send('Error processing request');
        });
    }
};
