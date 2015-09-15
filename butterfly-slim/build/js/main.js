
define(['butterfly/view','js/iscroll','js/swiper.min','js/client'], function(View,Iscroll,Swiper,Client){

  return View.extend({
    

    el: '#main-page',

    events: {
     
    },
    initialize: function () {
        // console.log('main init')
    },

    render: function(){
      // console.log('main render')
      
    },

    onShow: function(){
			
     Client.main();
     
     //左右滑动
     var tabsSwiper = new Swiper('#tabs-container',{
		    speed:500,
		    onSlideChangeStart: function(){
		      $(".CenterTitle .Selected").removeClass('Selected')
		      $(".CenterTitle .kan").eq(tabsSwiper.activeIndex).addClass('Selected')  
		    }
		  })
		  $(".CenterTitle .kan").on('touchstart mousedown',function(e){
		    e.preventDefault()
		    $(".CenterTitle .Selected").removeClass('Selected')
		    $(this).addClass('Selected')
		    tabsSwiper.slideTo( $(this).index() )
		  })
		  $(".CenterTitle .kan").click(function(e){
		    e.preventDefault()
		  })
    },

  });
});
