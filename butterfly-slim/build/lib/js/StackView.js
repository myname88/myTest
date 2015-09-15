define(['butterfly/view'], function(View){

  //show only contain one direct subview
  return View.extend({

    initialize: function(options){
      View.prototype.initialize.apply(this, arguments);
      this.views = [];
      this.currentView = '';
      this.baseZIndex = 10;
      this.firstLoad = true;
    },

    route: function(paths, options){  
      var path = (paths === null) ? 'views/main' : paths;
      // this.showLoading();//添加loading层

      require(['view!' + path + '.html'], function(ViewClass){
        var viewsLength = this.views.length;
        //判断是不是后退操作。
        if (viewsLength > 1 && (this.views[viewsLength - 2].path === path)) {
          var currentView = this.views[this.views.length - 1].view;
          currentView.animateSlideOutRight(function(){
            //hide & remote top
            currentView.$el.hide();
            currentView.$el.remove();
            //show next
            this.views[this.views.length - 2].view.show();
            this.views.pop();
            this.baseZIndex--;
            console.log(this.views)
          }.bind(this));
          
        } else {
          var newView = new ViewClass();
          this.views.push({path: path, view: newView});
          console.log(this.views)
          newView.$el.css({
            'position': 'absolute',
            'top': '0px',
            'bottom': '0px',
            'width': '100%',
            'z-index': this.baseZIndex++
          });
          newView.render();
          this.el.appendChild(newView.el);
          newView.show(options);

          if (!this.firstLoad) newView.animateSlideInRight();
        }

        this.firstLoad = false;
        // this.hideLoading();//删除loading层
      }.bind(this), function(err){
        Backbone.history.navigate('#/');
      });


    }
  });
});
