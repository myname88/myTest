require.config({
	baseUrl: '../',
	packages: [{
		name: 'butterfly',
		location: './lib/js',
		main: 'butterfly'
	}],
	paths: {
		// require.js plugins
		view: 'lib/js/requirejs-butterfly',
		// lib
		zepto: 'lib/bower_components/zepto/zepto.min',
		underscore: 'lib/bower_components/underscore/underscore-min',
		backbone: 'lib/bower_components/backbone/backbone',
		text: 'lib/bower_components/requirejs-text/text',
		spin: 'lib/bower_components/spin.js/spin.min'
	},
	waitSeconds: 7,
	shim: {
		zepto: {exports: '$'},
		underscore: {exports: '_'},
		backbone: {
			deps: ['underscore'],
			exports: 'Backbone'
		}
	}
});

require(['butterfly'],
	function(butterfly){

		//ios7 issue fix
		// if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
  // 		$('html').addClass('ipad ios7');
		// }
		//iOS scroll to top
		setTimeout(function() {window.scrollTo(0, 1);}, 0);


		//enable fastclick
		// FastClick.attach(document.body);

		//this will stop the page from scrolling without IScroll
		// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
});
