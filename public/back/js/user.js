 var currentPage = 1;
 var pageSize = 5;

$(function(){
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
         console.log(info);
         //准备数据
         var htmlStr = template("tpl",info);
         $("tbody").html(htmlStr);
         $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  
  
});