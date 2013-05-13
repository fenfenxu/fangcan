var request = require('request'), cheerio = require('cheerio');
var url = 'http://www.jnfdc.gov.cn/onsaling/index.shtml';
var url = url || 'http://localhost/Test/fangcan/dailysale.htm';
var saleDetails = [], saleInfos = [];
var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();

// Do some work, and after some time emit
// the 'ready' event from the module itself.
var parse = function($) {
	module.exports.emit('onload', {
		curPage : $('#pagespan  #pageno').val(),
		totalPages : $('#pagespan  #allpage').val(),
		totalNums : $('#pagespan  #allcounts').val()
	});
};
console.log('xiangmu-pre start');
request(url, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log('xiangmu-pre loaded');
		parse(cheerio.load(body));
	} else {
		// fail to load, try reload
		console.err("fail load");
	}
});
