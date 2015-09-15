define(['underscore'], function(_) {

  return {
    server: '/json',
    request: function(params) {
      var defaults = {
        url: this.server + params.path,//http://localhost:1338/user, 
        type: 'GET',
        dataType:"json",

        // contentType: 'text/plain', //raw; charset=utf-8
        complete: function(request, status) {},
        beforeSend: function(){}
      };

      params = _.extend(defaults, params);

      var _preSuccessFunc = params.success;
      var _preErrorFunc = params.error;
      var _preCompeteFunc = params.complete;
      var _preBeforeSend = params.beforeSend;

      params.beforeSend = function() {
      	
        _preBeforeSend();
      };

      params.success = function(data) {
        _preSuccessFunc(data);
      };

      params.error = function(events, statusText) {
        _preErrorFunc(events, statusText);

      };

      params.complete = function(request, status) {
      	
        _preCompeteFunc(status, request);
      };
      console.log(params)
      $.ajax(params);
    },

    getList: function (params) {
      console.log(params)
      this.request(params);
    },
    classify:function(){
        var _this = $('.classify-in');
        var _classify = $('.classify');
        var _classify_li = $('.classify-in li');
        _this.hide()
        var zt = true;
        _classify.click(function(){
            _this.show()
            // alert(zt)
            if(zt==true){
                _this.addClass('current')
                zt = !true
            }else{
                _this.removeClass('current')
                zt = true
            }
        })
        _classify_li.click(function(event) {
           _this.removeClass('current')
           zt = true
        });
    },
    //首页json
    main:function(){
			var params={
    		path: '/main.json',
    		data:{    
		      
		      dataType:'json',
		    },
		    dataType:'json',
		    success:function(data){
					
						var mainDocument = _.template($('#mainDocument').html());//引用模版
						$('#documentInfo').html(mainDocument({data:data}));//模版添加数据
						
						var mainDocument2 = _.template($('#mainDocument2').html());//引用模版
						$('#documentInfo2').html(mainDocument2({data:data}));//模版添加数据
					
				},
				error:function(){
					alert("error");
				}
    	}
			this.request(params);
    },
    question:function(paths,x,y){
     var params={
        path: paths,
        data:{    
        dataType:'json'
        },
        success:function(data){
          var moban = _.template(x.html())
          y.append(moban({data:data.list}))

        },
        error:function(){
          alert("error");
        }
      }
      this.request(params);
    },
    
    apiKnowledge:function(params){      
     	params.path = '/knowledge.json',
     	this.request(params);
   	},

    //下拉刷新
    questionScroll:function(){
      (function(){
            myScroll = new IScroll('.question-wrapper', {minScrollY: 40});
            myScroll.on("scrollEnd",function(){
              //判断是否下拉刷新
              
              console.log(this.y)
                if(this.y==40){
                  alert('ok')
                  //此处执行下拉刷新部分的代码，目前采用
                  setTimeout(function(){
                    myScroll.scrollTo(0, 0, 600);
                  }, 1500); 
                }
              //判断是否上拉加载分页数据
               if(this.y < (document.querySelector('.question-scroller').clientHeight - document.querySelector('.question-wrapper').clientHeight)){
                    document.querySelector('.question-loading').style.display = 'block';
                    setTimeout(function(){
                    document.querySelector('.question-loading').style.display = 'none';
                    },1500);
                } 
              });
      })()
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    

  }

});