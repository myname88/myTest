define(['butterfly/view','js/client','js/iscroll'], function(View,Client,Iscroll){

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
      this.expertList();
      Client.classify()
      Client.questionScroll();
      setTimeout(function () {
        myScroll.refresh();
      }, 1000);
    },
    expertList:function(){
      var paths = '/expert.json'
      var x = $('.expert-moban')
      var y = $('#expert .question-list')
      Client.question(paths,x,y)
    }
  });
});
