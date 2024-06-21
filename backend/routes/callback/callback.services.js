
const pool = require('../../config/db')
require('dotenv').config()
const moment = require('moment');  
module.exports={

    insertCallback: (data) => {
        return new Promise((resolve, reject) => {
            const {
                msisdn,
                userStatus,
            } = data;
    
            let type_event;
           
            if (userStatus == 1) {
                type_event = 'UNSUB';  
               
                executeLogQuery();
            } else { 
             
                pool.query(`SELECT * FROM tbl_subscription WHERE msisdn='${msisdn}'`, [], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Result user exists", result);
                        type_event = (result.length > 0) ? 'REN' : 'SUB';  // Set type_event based on user existence
                        executeLogQuery();
                    }
                });
            }
    
            function executeLogQuery() {
     
                const insertCallbackLogs = process.env.insertCallbackLogs
                    .replace('<msisdn>', data.msisdn)
                    .replace('<vendorName>', data.vendorName)
                    .replace('<circle>', data.circle)
                    .replace('<amount>', data.amount)
                    .replace('<transactionId>', data.transactionId)
                    .replace('<action>', data.action)
                    .replace('<userStatus>', data.userStatus)
                    .replace('<operator>', data.operator)
                    .replace('<channel>', data.channel)
                    .replace('<language>', data.language)
                    .replace('<packName>', data.packName)
                    .replace('<type_event>', type_event);
    
                pool.query(`${insertCallbackLogs}`, [], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    },
    
    

    insertIntoSubscription: (data) => {
        return new Promise((resolve, reject) => {
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const nextBilledDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    
            
            pool.query(`SELECT * FROM tbl_subscription WHERE msisdn='${data.msisdn}'`, [], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let type_event = (result.length > 0) ? 'REN' : 'SUB';  // Set type_event based on user existence
    
                    // Prepare the SQL query using the type_event determined
                    const insertIntoSubscription = process.env.insertIntoSubscription
                      .replace('<msisdn>', data.msisdn)
                      .replace('<vendorName>', data.vendorName)
                      .replace('<circle>', data.circle)
                      .replace('<amount>', data.amount)
                      .replace('<transactionId>', data.transactionId)
                      .replace('<action>', data.action)
                      .replace('<userStatus>', data.userStatus)
                      .replace('<operator>', data.operator)
                      .replace('<channel>', data.channel)
                      .replace('<language>', data.language)
                      .replace('<subdatetime>', currentDate)
                      .replace('<lastbilled_date>', currentDate)
                      .replace('<nextbilled_date>', nextBilledDate)
                      .replace('<type_event>', type_event)
                      .replace('<packName>', data.packName);
    
                    console.log("insertIntoSubscription SQL: ", insertIntoSubscription);
    
                    // Execute the prepared SQL query
                    pool.query(`${insertIntoSubscription}`, [], (insertErr, insertResult) => {
                        if (insertErr) {
                            reject(insertErr);
                        } else {
                            resolve(insertResult);
                        }
                    });
                }
            });
        });
    },


     insertIntoBillingSuccess : (data) => {
        return new Promise((resolve, reject) => {
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const nextBilledDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            
           console.log("type evnt in billing success", data.type_event) // Default to 'SUB' or dynamically set based on your logic
            
            // Prepare the SQL query
            const insertIntoBillingSuccessSQL = process.env.insertIntoBillingSuccess
                .replace('<msisdn>', data.msisdn)
                .replace('<amount>', data.amount)
                .replace('<transactionId>', data.transactionId)
                .replace('<action>', data.action)
                .replace('<userStatus>', data.userStatus)
                .replace('<operator>', data.operator)
                .replace('<billingdatetime>', currentDate)
                .replace('<nextbilled_date>', nextBilledDate)
                .replace('<type_event>', data.type_event)
                .replace('<packName>', data.packName);
            
            console.log("insertIntoBillingSuccess SQL: ", insertIntoBillingSuccessSQL);
            
            // Execute the prepared SQL query
            pool.query(insertIntoBillingSuccessSQL, [], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

     updateTblSubscription : (data) => {
        return new Promise((resolve, reject) => {
            const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const nextBilledDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            
            // Prepare the SQL query using environment variable for the SQL template
            const updateTblSubscriptionSQL = process.env.updateTblSubscription
                .replace('<msisdn>', data.msisdn)
                .replace('<lastbilled_date>', currentDate)
                .replace('<nextbilled_date>', nextBilledDate)
                .replace('<type_event>', 'REN'); // Assuming you are setting type_event to REN on all updates
            
            console.log("updateTblSubscription SQL: ", updateTblSubscriptionSQL);
            
            // Execute the prepared SQL query
            pool.query(updateTblSubscriptionSQL, [], (err, result) => {
                if (err) {
                    reject(err);
                    console.error("Error updating tbl_subscription:", err);
                } else {
                    resolve(result);
                    console.log("Updated tbl_subscription successfully.");
                }
            });
        });
    },

     insertIntoUnsub : (data) => {
        return new Promise((resolve, reject) => {
            
            const insertIntoTblUnsubSQL = process.env.insertIntoTblUnsub
                .replace('<msisdn>', data.msisdn)
                .replace('<action>', data.action)
                .replace('<userStatus>', data.userStatus)
                .replace('<type_event>', 'UNSUB')
                .replace('<packName>', data.packName);
    
            console.log("insertIntoTblUnsub SQL: ", insertIntoTblUnsubSQL);
    
            // Execute the insertion query
            pool.query(insertIntoTblUnsubSQL, [], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Error inserting into tbl_unsub:", insertErr);
                    reject(insertErr);
                } else {
                    console.log("Inserted into tbl_unsub successfully");
    
                    // Prepare the SQL query for deletion from the subscription table
                    const deletefromSubscription = process.env.deletefromSubscription
                        .replace('<msisdn>', data.msisdn);
    
                    console.log("deleteFromSubscription SQL: ", deletefromSubscription);
    
                    // Execute the deletion query
                    pool.query(deletefromSubscription, [], (deleteErr, deleteResult) => {
                        if (deleteErr) {
                            console.error("Error deleting from tbl_subscription:", deleteErr);
                            reject(deleteErr);
                        } else {
                            console.log("Deleted from tbl_subscription successfully");
                            resolve({ unsubResult: insertResult, deleteResult: deleteResult });
                        }
                    });
                }
            });
        });
    }
    
    
    



}