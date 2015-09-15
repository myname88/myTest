define(['backbone', 'spin'], function(Backbone, Spinner){

	// Butterfly View
	// ==============

	var View =  Backbone.View.extend({

		//default event
		events: {
			"click a[data-action='back']": "goBack"
		},

		goBack: function(){
			window.history.back();
		},

		//add superview & subviews property
		constructor: function(options){
			if(options)this.superview = options.superview;
			this.subviews = [];

			Backbone.View.apply(this, arguments);
		},

		//remove superview & subviews reference
		remove: function(){
			Backbone.View.prototype.remove.call(this);

			this.superview = null;
			_.each(this.subviews, function(subview){
				subview.remove();
			});
		},

		//find a subview
		//Breadth First Search
		find: function(id){
			var result = _.find(this.subviews, function(subview){
				return subview.el.id == id;
			});

			if (!result) {
				var container = _.find(this.subviews, function(subview){
					return subview.find(id);
				});
				result = container.find(id);
			}

			return result;
		},

		addSubview: function(view){
			this.subviews.push(view);
		},

		render: function(){
			Backbone.View.prototype.render.apply(this, arguments);
			return this;
		},

		/* show this view */
		show: function(options){
			this.onShow(options);
		},
		/* hide this view */
		hide: function(){
			this.onHide();
		},

		//events
		onShow: function(){
			$(window).on('orientationchange', this.onOrientationchange);
			$(window).on('resize', this.onWindowResize);
			$(window).on('scroll', this.onWindowScroll);
		},
		onHide: function(){
			$(window).off('orientationchange', this.onOrientationchange);
			$(window).off('resize', this.onWindowResize);
			$(window).off('scroll', this.onWindowScroll);
		},

		onOrientationchange: function() {
				this.$('input').blur();
		},

		onWindowScroll: function() {},

		onWindowResize: function() {},

		route: function(){}
	});


	// View Animation Extentions
	// =========================

	var animations = ['slideInLeft', 'slideInRight', 'slideOutLeft', 'slideOutRight', 'slideInUp', 'slideInDown', 'slideOutUp', 'slideOutDown'];

	//animate
	var animationExtentions = {
		animate: function(name, onFinish){
			var me = this;

			this.$el.addClass('animated ' + name);
			this.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				me.$el.removeClass('animated ' + name);
				if (onFinish) onFinish();
			});
		}
	}

	//transform animation name array to <name: fn> mapping json object
	animationExtentions = _.foldl(animations, function(memo, animation){
		memo['animate' + animation[0].charAt(0).toUpperCase() + animation.substring(1)] = function(onFinish){
			this.animate(animation, onFinish);
		}
		return memo;
	}, animationExtentions);

	//add to View prototype
	_.extend(View.prototype, animationExtentions);


	// View Modal Support
	// ==================
	_.extend(View.prototype, {

		$loadingMask: $('#loadingMask'),
		$Modal: $('#Modal'),

		spinner: new Spinner({lines: 8}),

		doModal: function(){
			// TODO: reserved for shadow effect
			// this.mask = document.createElement('div');
			// this.mask.classList.add('butterfly-modal-mask');
			// document.body.appendChild(this.mask);

			this.$el.addClass('butterfly-modal');
			this.$el.appendTo(document.body);
			this.animateSlideInUp();
		},

		dismiss: function(){
			var me = this;
			this.animateSlideOutDown(function(){
				me.$el.removeClass('butterfly-modal');
				me.remove();
			});
		},

		showModal: function (options) {
			this.$Modal.show();
			return this.$Modal;
		},

		hideModal: function () {
			this.$Modal.hide();
		},

		showLoading: function () {	
			this.$loadingMask.show();
			this.spinner.spin(this.$loadingMask[0]);
		},

		hideLoading: function () {
			this.spinner.stop();
			this.$loadingMask.hide();
		},

		showDialog: function (options) {
			var defaultOptions = {
				text: 'Hello',
				type: 'alert', //只有 alert 和 confirm
				success: function () {
					console.log('callback nofound')
				}
			}
			var $Modal = this.showModal();
			var opts = _.extend(defaultOptions, options);
			require(['text!lib/components/dialog.html'], function(ViewClass){
				var dialogContainer = document.createElement('div');
				dialogContainer.innerHTML = ViewClass;
				var dialogTmpl = $(dialogContainer).children()[0].innerHTML;
        var dialogTemplate = _.template(dialogTmpl);
        $Modal.html(dialogTemplate({options: opts}));
       	$('#confirm').on('click', function () {
      		opts.success();
      		this.hideDialog($Modal);
      	}.bind(this));
        if (opts.type === 'confirm') {
        	$('#cancel').on('click', function () {
	        	this.hideDialog($Modal);
	        }.bind(this));
        }
      }.bind(this), function(err){
        
      });
		},

		hideDialog: function ($Modal) {
			$Modal.html('').hide()
		}
	});

	return View;
});
