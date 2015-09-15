define(['butterfly/view', 'spin', 'js/iscroll', 'js/client'], function(View, Spin,Iscroll, Client){

  return View.extend({
    events:{
      'click .fa-list':'KnowledgeDown',
      'click .Hide':'KnowledgeViews',
    },

  	initialize: function () {

  	},

    render: function(){
      // console.log('subview.html render');

    },

    onShow: function(){
      this.wrapperiScroll();
      this.GetKnowledge();
      setTimeout(function () {
        myScroll.refresh();
      }, 50);
    },

    KnowledgeDown: function () {
      var $KnowledgeDown =  $('.KnowledgeDown');
      $KnowledgeDown.show();
      $KnowledgeDown.css({'height': 0});
      if ( $KnowledgeDown.height() === 0 ) {
        $KnowledgeDown.css({'height': 175});
      } 
    },

    KnowledgeViews:function(){
       $('.KnowledgeDown').css({'height': 0});
    },

    wrapperiScroll:function() {
        (function(){
        myScroll = new IScroll('#wrapper',{
          scrollX:true,
          scrollY:false,
          momentum: false,
          snap: true,
          snapSpeed: 400,
          keyBindings: true,
          useTransform:true,
          indicators: {
            el: '#indicator',
            resize: false
          },
        })
        
      })()

      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        
    },

    GetKnowledge:function(params){
      var params = {
        success:function(data){
          console.log(data)
            var KnowledgeJson = _.template($('.KnowledgeJson').html());
            $('.Getknowledge-1').html(KnowledgeJson({data:data.list}));
            $('.Getknowledge-2').html(KnowledgeJson({data:data.ProjectList}));
        },
        error:function(){
          alert("error");
        }
      }
      Client.apiKnowledge(params);
    }

  });
});
