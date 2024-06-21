const {checkuserexists}=require("./login.service")

module.exports={

    checkuser:(req,res)=>{
        const {msisdn}=req.query
        console.log("msisdn", msisdn)

        checkuserexists(msisdn, (err,result)=>{
            if (err) {
                console.error("Error querying subscription:", err);
                res.status(500).send('Error checking subscription');
            } 

          console.log("result", result)

          if(result.length>0){
            res.json({status:1, detail:result})
          }
          else{
            res.json({status:0})
          }
          
        })

    }
}