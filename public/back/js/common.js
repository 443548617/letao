//开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  NProgress.done();
});


//登录拦截功能

if(location.href.indexOf("login.html") === -1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function( info ){
       console.log( info )
       if(info.success){
         console.log("登录了");
       }
       if(info.error === 400){
         location.href = "login.html";
       }
    }
  })
}


$(function(){
  //切换二级分类
  $(".nav .category").click(function(){
    $(".nav .child").stop().slideToggle();
  });

 // 切换侧边栏
 $(".icon_menu").click(function(){
   $(".lt_aside").toggleClass("hidemenu");
   $(".lt_main").toggleClass("hidemenu");
   $(".lt_topbar").toggleClass("hidemenu");
 });

 //切换模态框
 $(".icon_logout").click(function(){
   $("#logoutModal").modal('show')
 });


 //点击模态框的退出按钮进行退出
 $("#logoutBtn").click(function(){
   $.ajax({
     type:"get",
     url:"/employee/employeeLogout",
     dataType:"json",
     success:function(info){
       console.log(info);
       if(info.success){
         location.href = "login.html";
       }
     }
   })
 });
});

