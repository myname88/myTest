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
      this.GetProject();
    },

    KnowledgeDown: function () {
      var $KnowledgeDown =  $('.KnowledgeDown');

      $KnowledgeDown.show();
      $KnowledgeDown.css({'height': 0});
      if ( $KnowledgeDown.height() === 0 ) {
        $KnowledgeDown.css({'height': 105});
      } 
    },

    KnowledgeViews:function(){
       $('.KnowledgeDown').css({'height': 0});
    },

    GetProject:function(params){
      var params = {
        success:function(data){
          console.log(data)
            var KnowledgeJson = _.template($('.KnowledgeJson').html());
            $('#GetProject').html(KnowledgeJson({data:data.ProjectList}));
        },
        error:function(){
          alert("error");
        }
      }
      Client.apiKnowledge(params);
    }


  });
});
