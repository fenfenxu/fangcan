var request = require('request'), cheerio = require('cheerio');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var saleSumSchema = mongoose.Schema({
    qu: String,
    avaTaoshu: Number,
    avaZhuTaoshu: Number,
    taoshu: Number,
    square: Number,
    
});
var saleDetailSchema = mongoose.Schema({
    xiangmu: String,
    loupan: String,
    type: String,
    taoshu: Number,
    square: Number
});
var dailySaleSchema = mongoose.Schema({
    date: String,
    saleSum : [saleSumSchema],
    saleDetail : [saleDetailSchema]
});
var DailySale = mongoose.model('DailySale', dailySaleSchema);
var url = 'http://www.jnfdc.gov.cn/saletoday/index.shtml';
var url = url || 'http://localhost/Test/fangcan/dailysale.htm';
var saleDetails = [], saleInfos = [];
var parse = function($){
	var c = $('div[class=premises_list]');
	
	var $saleDetail = c.eq(0).find('#sale tr');
	$saleDetail.each(function(index, element){
		var $td = $(element).find('td');
		var saleDetail = {
			xiangmu:$td.eq(1).html().trim(),
			loupan:$td.eq(2).html().trim(),
			type:$td.eq(3).html().trim(),
			taoshu:$td.eq(4).html().trim(),
			square:$td.eq(5).html().trim()
		};
		saleDetails[saleDetails.length] = saleDetail;
	});
	
	
	var $saleInfo = c.eq(1).find('tr').slice(1);
	$saleInfo.each(function(index, element){
		var $td = $(element).find('td');
		var saleInfo = {
				qu:$td.eq(1).html().trim(),
				avaTaoshu:$td.eq(2).html().trim(),
				avaZhuTaoshu:$td.eq(3).html().trim(),
				taoshu:$td.eq(4).html().trim(),
				square:$td.eq(5).html().trim()
		};
		saleInfos[saleInfos.length] = saleInfo;
	});
	
	var saveCallback = function(err, data){
		if(!err){
			console.log('success saved!');
		}
	};
	DailySale.create({date: '20130513', saleSum: saleInfos, saleDetail: saleDetails}, saveCallback);
	
};
console.log('start');
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log('end');
      parse(cheerio.load(body));
  }
});
