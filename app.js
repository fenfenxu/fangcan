console.log('start');
var request = require('request');
request('http://www.jnfdc.gov.cn/saletoday/index.shtml', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log('end');
    console.log(body) // Print the google web page.
  }
})