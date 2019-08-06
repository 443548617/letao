$(function(){
  // 功能1: 获取地址栏传递过来的搜索关键字, 设置给 input
  var key =  getSearch("key");
  $(".search_input").val(key);

  render();
function render(){
  $(".lt_product").html('<div class="loading"></div>');
  var params = {
    proName:$(".search_input").val(),
    page:1,
    pageSize:100
  };

  var $current = $(".lt_sort a.current");
  if($current.length > 0){
    var sortName = $current.data('type');
    var sortValue = $current.find('i').hasClass("fa-angle-down")?2:1;
    params[sortName]=sortValue;
  }

  setTimeout(function(){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:params,
      dataType:"json",
      success:function(info){
        console.log( info );
        var htmlStr = template("productTpl",info);
        $(".lt_product").html(htmlStr);
      }
  
    });
  },500)

}
  


  // 功能2: 点击搜索按钮, 实现搜索功能
  $(".search_btn").click(function(){
    var key = $('.search_input').val().trim();
    if ( key === "" ) {
      mui.toast("请输入搜索关键字", {
        duration: 2000
      })
      return;
    }
    render();
    var history = localStorage.getItem("search_list")|| '[]';
    var arr = JSON.parse(history);
    var index = arr.indexOf(key);
    if(index != -1){
      arr.splice(index,1);
    }
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift( key );
    localStorage.setItem("search_list",JSON.stringify(arr));
    $('.search_input').val('');
  });


  //功能3 排序
  $(".lt_sort a[data-type]").click(function(){
    //如果有高亮的类 切换箭头方向
    if($(this).hasClass("current")){
       $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else{
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  });
})