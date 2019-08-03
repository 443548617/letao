
$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      page:1,
      pageSize:5
    },
    dataType:"json",
    success:function(info){
       console.log(info);
       //准备数据
       var htmlStr = template("tpl",info);
       $("tbody").html(htmlStr);
    }
  })
});