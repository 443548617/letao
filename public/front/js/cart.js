$(function(){
  function render(){
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/cart/queryCart",
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.error === 400){
            location.href = "login.html";
            return;
          }
          var htmlStr = template("cartTpl",{arr:info});
          $(".mui-table-view").html(htmlStr);
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      });
    },500)
    
  
  }
  //2 配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto:true,
        callback :function(){
           render();
        }
      }
    }
  });


  //3 删除功能
  $(".lt_main").on("tap",".btn_delete",function(){
    var id = $(this).data("id");
    $.ajax({
      type:"get",
      url:"/cart/deleteCart",
      data:{
        id:[id]
      },
      dataType:"json",
      success:function(info){
         console.log(info);
         mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
      }
    })
  })
})