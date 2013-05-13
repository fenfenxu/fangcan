var request = require('request'), cheerio = require('cheerio');
var url = 'http://www.jnfdc.gov.cn/saletoday/index.shtml';
var parse = function($){
	var c = $('div[class=premises_list]');
	var $saleDetail = $(c[0]);
	var $saleInfo = $(c[1]);
	console.log($saleDetail.html());
	console.log($saleInfo.html());
};
console.log('start');
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log('end');
      parse(cheerio.load(body));
  }
});
