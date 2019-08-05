
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
    localStorage.removeItem("search_list");
    render();
  })
})