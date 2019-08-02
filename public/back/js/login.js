$(function(){
  $("#form").bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      username:{
        validators:{
            //非空
          notEmpty:{
            message:"用户名不能为空"
          },
          //长度校验
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须在2-6之间"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          //非空
        notEmpty:{
          message:"密码不能为空"
        },
        //长度校验
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须在6-12之间"
        },
        callback:{
          message:"密码错误"
        }
       }
      }
    }
  })

  //2.登录功能
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
         console.log( info );
         if(info.success){
          location.href = "index.html";
         }
         if(info.error === 1000){
          //  alert("当前用户名不存在");
          $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
         }
         if(info.error === 1001){
          // alert("密码错误");
          $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }

      }
    });
});

//3 重置功能
$("[type=reset]").click(function(){
  $("#form").data('bootstrapValidator').resetForm();
});
})