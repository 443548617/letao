$(function(){
  // 1 一进入页面就发送ajax请求，渲染一级分类
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log( info );
      var htmlStr = template("leftTpl",info);
      $(".lt_category_left ul").html(htmlStr);
      rendSecondById(info.rows[0].id);
    }
  });

  //  2. 点击一级分类, 渲染二级分类
  $(".lt_category_left").on("click","a",function(){
     $(this).addClass("current").parent().siblings().find("a").removeClass("current");
     var id = $(this).attr("data-id");
     rendSecondById(id);
  });

  // 将二级分类封装成一个函数
  function rendSecondById(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
         console.log(info);
         var htmlStr = template("rightTpl",info);
         $(".lt_category_right ul").html(htmlStr);
      }
    })
  }
})