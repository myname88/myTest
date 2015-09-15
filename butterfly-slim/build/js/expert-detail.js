define(['butterfly/view','js/client','js/iscroll','js/TouchSlide'], function(View,Client,Iscroll,Touch){

  return View.extend({

    events:{

    },

    initialize: function () {
      // console.log('a.html init');
    },

    render: function(){
      // console.log('a.html render');
    },

    onShow: function(){
      this.detailsTouchSlide()
      // this.detailsIScroll();
      // setTimeout(function () {
      //   myScroll.refresh();
      // }, 1000);

      
    },
    detailsTouchSlide:function(){
      TouchSlide({ slideCell:"#leftTabBox" });
    },
    detailsIScroll:function(){
      (function(){
        myScroll = new IScroll('#wrapper',{
          scrollX:true,
          scrollY:true,
          momentum: false,
          snap: true,
          snapSpeed: 400,
          keyBindings: true,
          useTransform:false,
          indicators: {
            el: document.getElementById('indicator'),
            resize: false
          },
        })
      })()
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },

  });
});
