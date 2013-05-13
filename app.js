var request = require('request'), cheerio = require('cheerio');
//var url = 'http://www.jnfdc.gov.cn/saletoday/index.shtml';
var url = 'http://localhost/Test/fangcan/dailysale.htm';
var saleDetails = [], saleInfos = [];
var parse = function($){
	var c = $('div[class=premises_list]');
	
	var $saleDetail = c.eq(0).find('#sale tr');
	$saleDetail.each(function(index, element){
		var $td = $(element).find('td');
		var saleDetail = {
				pname:$td.eq(1).html().trim(),
				fname:$td.eq(2).html().trim(),
				ftype:$td.eq(3).html().trim(),
				num:$td.eq(4).html().trim(),
				area:$td.eq(5).html().trim()
		};
		saleDetails[saleDetails.length] = saleDetail;
	});
	console.log(JSON.stringify(saleDetails));
	
	var $saleInfo = c.eq(1).find('tr').slice(1);
	$saleInfo.each(function(index, element){
		var $td = $(element).find('td');
		var saleInfo = {
				qu:$td.eq(1).html().trim(),
				avaNum:$td.eq(2).html().trim(),
				avaZhuNum:$td.eq(3).html().trim(),
				num:$td.eq(4).html().trim(),
				area:$td.eq(5).html().trim()
		};
		saleInfos[saleInfos.length] = saleInfo;
	});
	console.log(JSON.stringify(saleInfos));
	
};
console.log('start');
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log('end');
      parse(cheerio.load(body));
  }
});
