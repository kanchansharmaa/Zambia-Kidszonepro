const axios = require('axios');

module.exports = {
  unsubscribeUser: (req, res) => {
    const { msisdn } = req.query;
    console.log("msisdn", msisdn);

    let unsubUrl = `http://zamtel.oneaggregator.com/SMInterface/onlineRequest.htm?msisdn=${msisdn}&userText=unsub kidszone_d&channel=WAP&shortCode=53030&sendMessage=1&operator=zamtel&circle=zambia`;

    console.log("Unsub url ==\n", unsubUrl);

    // Making a POST request using Axios
    axios.post(unsubUrl)
    .then(response => {
      console.log('Response data:', response.data);
  
      // Splitting the response string on the '|' character
      const parts = response.data.split('|');
      
      // Example of accessing parts if needed
      const statusCode = parts[0];
      const errorCode = parts[1];
      const message = parts[2];
  
      console.log('Status Code:', statusCode);
      console.log('Error Code:', errorCode);
      console.log('Message:', message);
  
      // Handling based on the status code or error code
      res.json({"statusCode":statusCode,"error":errorCode,"message":message})
    })
    .catch(error => {
      console.error('Error in Unsubscribing:', error);
      res.status(500).send('Error in Unsubscribe process');
    });
  
  }
};
