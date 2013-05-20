var request = require('request'), cheerio = require('cheerio'), xiangmuPre = require('./xiangmu-pre'), flow = require('nimble');
var mongoose = require('mongoose');
var urlBase = 'http://www.jnfdc.gov.cn';
var xiangmuUrls = [];
xiangmuPre.on("onload", function(data) {
	console.log(data);
	var url = 'http://www.jnfdc.gov.cn/onsaling/index';
	var requestCount = 0;
	
	var parseUrlTasks = [];
	
	for ( var i = 1; i < data.totalPages; i++) {
		parseUrlTasks[parseUrlTasks.length] = (function(url){
			return function(callback){
				request(url, function(error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log('xiangmu url loaded');
						
						parseUrl(cheerio.load(body)).forEach(function(ele){
							xiangmuUrls.push(ele);
						});
					} else {
						// fail to load, try reload
						console.log("fail load");
					}
					// 
					callback();
					
				});
			};
		})(url + i + '.shtml');
	}
	
	flow.parallel(parseUrlTasks, function(callback){
		
		getXiangmu();
	});
			
});

/**
 * 获取项目详细页的url
 */
function parseUrl($) {
	
	var urls = [];
	$('.project_table a').each(function(index, element){
		urls[urls.length] = $(element).attr('href');
	});
	return urls;

}
var count = 0;
function parseXiangmu($){
	//console.log($('body').html());
	console.log('Get xiangmu, ' + (++count));
	
	
	// 项目信息
	$('.message_table table tbody');
	
	// 项目楼盘列表 需分页查询
	$('.project_table table tr');
}
function getXiangmu(){

	var tasks = [];
	xiangmuUrls.forEach(function(element, index){
		tasks.push((function(url){
			return function(callback){
				request(url, function(error, response, body){
					if (!error && response.statusCode == 200) {
						console.log('xiangmu loaded');
						parseXiangmu(cheerio.load(body));
					} else {
						// fail to load, try reload
						console.log("xiangmu fail load");
					}
					callback();
				});
			};
		})(urlBase + element));
	});
	
	flow.parallel(tasks);

}
console.log('start');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var loupanSchema = mongoose.Schema({
	name : String,
	xuke : String,
	taoshu : Number,
	square : Number,
	avaTaoshu : Number,
	avaSquare : Number,
	soldTaoshu : Number,
	soldSquare : Number
});
var xiangmuSchema = mongoose.Schema({
	name : String,
	addr : String,
	taoshu : Number,
	qiye : String,
	guimo : String,
	saleAddr : String,
	saleCall : String,
	wuye : String,
	qu : String,
	dongshu : Number,
	loupans : [ loupanSchema ]
});
var Xiangmu = mongoose.model('Xiangmu', xiangmuSchema);