const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

module.exports = {
  getMSISDN: (req, res) => {

    const msisdn = req.headers['msisdn'];  
    console.log("msisdn:", msisdn);
    console.log("All Headers:\n", req.headers);

    const uniqueTID = uuidv4();
    const redirecturl = encodeURIComponent('http://zm.kidszonepro.com/redirect');  
    const url = `http://zamtel.oneaggregator.com/zamtelUtility/queryMsisdn?vendorId=boldmedia&redirectUrl=${redirecturl}&serviceId=kidszone_d&tid=${uniqueTID}&packName=kidszone_d`;

    console.log("URL Generated:", url);

    const axiosConfig = {
      headers: {
        'msisdn': msisdn  
      }
    };

    axios.get(url, axiosConfig)
      .then(apiResponse => {
        // console.log("api response\n", apiResponse)
        // console.log("\n API Response Data:\n ", apiResponse.data);
        console.log("Final Redirect URL:", apiResponse.request.res.responseUrl);
        res.json({url:apiResponse.request.res.responseUrl, headers:req.headers});  
      
      })
      .catch(error => {
        console.error("Error calling the API:", error);
        res.status(500).json({
          error: "Failed to fetch data",
          details: error.message  
        });
      });
  },
};