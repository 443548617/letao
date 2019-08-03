$(function(){
var currentPage= 1;
var pageSize = 5;
render();
//1
function render(){
   $.ajax({
     type:"get",
     url:"/category/querySecondCategoryPaging",
     data:{
       page:currentPage,
       pageSize:pageSize
     },
     dataType:"json",
     success:function(info){
       console.log(info)
       var htmlStr = template("secondTpl",info);
       $(".lt_content tbody").html(htmlStr);

       // 分页插件初始化
       $('#paginator').bootstrapPaginator({
        // 指定bootstrap版本号
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil( info.total / info.size ),
        // 给页码添加点击事件
        onPageClicked: function( a, b, c, page ) {
          // 更新当前页, 重新渲染
          currentPage = page;
          render();
        }
      });
     }
   });
}

//2 显示模态框
$("#addBtn").click(function(){
  $("#addModal").modal("show");
});
});