define(['butterfly/view','js/client','js/iscroll'], function(View,Client,Iscroll){

  return View.extend({

    events:{
        "click .askQuestion":"askQuestion",
        "click .cancel":"cancel",
        "focus #title":"focus",
    },

    initialize: function () {

      // console.log('a.html init');
    },

    render: function(){
      // console.log('a.html render');
    },

    onShow: function(){
        Client.classify();
        this.getQuestionList();
        Client.questionScroll();
      setTimeout(function () {
        myScroll.refresh();
      }, 1000);

        // Client.question();
    },

    askQuestion:function(){
        var _this = $('.content')
        _this.removeClass('current')

    },
    cancel:function(){
        var _this = $('.content')
        _this.addClass('current')

    },
    focus:function(){
        var _this = $('#title')
        _this.focus(function() {
           if(_this.val()=='请输入问题...'){
            _this.val ('')
           }
        _this.blur(function(event) {
            if(_this.val()==''){
                _this.val ('请输入问题...')
            }
        });
        });
    },

    getQuestionList:function(){
      var paths = '/question.json'
      var x = $('.question-moban')
      var y = $('#question .question-list')
      Client.question(paths,x,y)
    },
  });
});
