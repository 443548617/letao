
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log( info );
        var htmlStr = template("firstTpl",info);
        $(".lt_content tbody").html(htmlStr);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  });


  //表单验证
  $("#form").bootstrapValidator({
      // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields:{
      //配置字段
      categoryName:{
        //配置规则
        validators:{
          notEmpty:{
            message:"不能为空"
          }
      }
    }
   }
  });
  
  //注册表单验证成功事件
  $("#form").on("success.form.bv",function(e){
     e.preventDefault();
     $.ajax({
       type:"POST",
       url:"/category/addTopCategory",
       data:$(form).serialize(),
       dataType:"json",
       success:function( info ){
          console.log(info);
          if(info.success){
            currentPage = 1;
            $("#addModal").modal("hide");
            render();

            $('#form').data("bootstrapValidator").resetForm(true);
       }
     }
     });
  });
});
