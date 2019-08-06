
$(function(){

  //功能1 列表渲染功能
  // var arr = [ "耐克", "阿迪", "阿迪王", "耐克王", "新百伦" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr );
  render();

  // 从本地存储中读取历史记录, 以数组的形式返回
  function getHistory(){
    var history = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(history);
    return arr;
  }
  //读取数组 进行页面渲染
  function render(){
    var arr = getHistory();
    var htmlStr = template("historyTpl",{arr:arr});
    $(".lt_history").html(htmlStr);
  }


  //功能2 清空历史记录
  $(".lt_history").on("click",".btn_empty",function(){
    
    //添加确认框
    mui.confirm("您确定要清空历史记录吗？","温馨提示",["取消","确认"],function(e){
      if(e.index === 1){
        localStorage.removeItem("search_list");
        render();
      }
    })
    
  });


  //功能3 删除单条记录
  $(".lt_history").on("click",'.btn_del',function(){
    var that =this;
    //添加确认框
    mui.confirm("您确定要清空历史记录吗？","温馨提示",["取消","确认"],function(e){
      if(e.index === 1){
        var index = $(that).data("index");
        var arr = getHistory();
        arr.splice("index",1);
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
      }
    })
    
  });




  //功能4 添加历史纪录功能 
  $(".search_btn").click(function(){
    var key = $(".search_input").val().trim();

    if(key == ""){
      alert("请输入搜索关键词");
      return;
    }
    var arr = getHistory();
    var index = arr.indexOf(key);
    if(index != -1){
     arr.splice(index,1)
    }
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key="+key;
  });


})