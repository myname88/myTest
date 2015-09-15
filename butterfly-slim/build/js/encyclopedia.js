define(['butterfly/view', 'spin', 'js/client'], function(View, Spin, Client){

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
      this.GetKnowledge();
      // console.log(location.hash.split('?')[1].indexOf('&'))
    },

    KnowledgeDown: function () {
      var $KnowledgeDown =  $('.KnowledgeDown');

      $KnowledgeDown.show();
      $KnowledgeDown.css({'height': 0});
      if ( $KnowledgeDown.height() === 0 ) {
        $KnowledgeDown.css({'height': 140});
      } 
    },

    KnowledgeViews:function(){
       $('.KnowledgeDown').css({'height': 0});
    },

    GetKnowledge:function(params){
      var params = {
        success:function(data){
          console.log(data)
            var KnowledgeJson = _.template($('.KnowledgeJson').html());
            $('#GetEncyclopedia').html(KnowledgeJson({data:data.list}));
        },
        error:function(){
          alert("error");
        }
      }
      Client.apiKnowledge(params);
    }


  });
});
