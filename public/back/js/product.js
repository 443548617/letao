$(function(){
  var currentPage = 1;
  var pageSize = 5;

  //1一进入页面 就进行渲染
  render();
  function render(){
     $.ajax({
       type:"get",
       url:"/product/queryProductDetailList",
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       dataType:"json",
       success:function(info){
         console.log(info)
         var htmlStr = template("tpl",info);
         $(".lt_content tbody").html(htmlStr);

          // 进行分页初始化
         $('#paginator').bootstrapPaginator({
          // 版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 配置按钮大小
          size: "normal",
          // 配置按钮文本
          // 每个按钮在初始化的时候, 都会调用一次这个函数, 通过返回值进行设置文本
          // 参数1: type  取值: page  first  last  prev  next
          // 参数2: page  指当前这个按钮所指向的页码
          // 参数3: current 当前页
          itemTexts: function( type, page, current ) {
            // console.log( arguments );
            // switch case
            switch ( type ) {
              case "page":
                return page;
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },
          // 配置 title 提示信息
          // 每个按钮在初始化的时候, 都会调用一次这个函数, 通过返回值设置title文本
          tooltipTitles: function( type, page, current ) {
            switch ( type ) {
              case "page":
                return "前往第" + page + "页";
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },

          // 使用 bootstrap 的提示框组件
          useBootstrapTooltip: true,

          // 添加按钮点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
       }
     })
  }

  

  //2 点击添加商品按钮，显示模态框
  $("#addBtn").click(function(){
    $("#addModal").modal('show');
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function( info ){
        console.log(info);
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });


  //3 给下拉框里面的a注册点击事件,显示文本
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id =$(this).data("id");
    $("[name=brandId]").val(id);
  })
});