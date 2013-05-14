var request = require('request'), cheerio = require('cheerio'), xiangmuPre = require('./xiangmu-pre');
var mongoose = require('mongoose');
var urlBase = 'http://www.jnfdc.gov.cn';
var urls = [];
xiangmuPre.on("onload", function(data) {
	console.log(data);
	var url = 'http://www.jnfdc.gov.cn/onsaling/index';
	var url = url || 'http://localhost/Test/fangcan/dailysale.htm';
	for ( var i = 1; i < data.totalPages; i++) {
		request(url + i + '.shtml', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('loaded');
				parseUrl(cheerio.load(body));
			} else {
				// fail to load, try reload
				console.log("fail load");
			}
			if(i == data.totalPages){
				console.log(urls);
				getXiangmu();
			}
		});
	}

	
});

function parseUrl($) {
	
	$('.project_table a').each(function(index, element){
		urls[urls.length] = $(element).attr('href');
	});
	
	
	
//	console.log($.html());
}
function parseXiangmu($){
	console.log($('body').html());
}
function getXiangmu(){
	urls.forEach(function(element, index){
		
		request(urlBase + element, function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log('loaded');
				parseXiangmu(cheerio.load(body));
			} else {
				// fail to load, try reload
				console.log("fail load");
			}
		});
	});
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