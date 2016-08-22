/*
 五子棋的开发步骤
 1: 造棋盘  table+背景图片就可以
 2: 开发下棋功能
 3: 判断胜负
 */


/*
在table上加点击事件，事件对象中的srcElement属性，判断点击的是哪个td
 */

//下一颗棋子的颜色
var cnt = (function(){
    var curr = "white";
    return function(){
        if(curr=="white"){
            curr = "black";
        }
        else{
            curr = "white";
        }
        var temp = curr;
        return temp;
    }
})();
window.onload = function(){
    var Iswin = false;
    //下棋
    document.getElementsByTagName("table")[0].onclick = function(ev) {
            play.call(ev.srcElement);
    }



    //下一颗棋
    function play(){
        if(Iswin == true){
            alert("下次再玩！");
            return;
        }
        if(this.style.background.indexOf("images")>=0){
            alert("此处已有棋");
            return;
        }
        var Chesscolor = cnt();//即将下的棋子的颜色
        this.style.background = "url(images/"+Chesscolor+".gif)";
        document.getElementById("_play").play();
        judge.call(this,Chesscolor);
    }

    //判断胜负
    function judge(color){
        //获得所有单元格
        var tds = document.getElementsByTagName("td");
        //找出当前棋子的坐标
        var current = {x:this.cellIndex,y:this.parentElement.rowIndex};
        //用于存储横竖左右棋子的颜色序列
        var line = ["","","",""];
        //循环所有单元格
        for(var i = 0;i<225;i++){
            //每个单元格的坐标
            var temp = {x:tds[i].cellIndex,y:tds[i].parentElement.rowIndex,color:"0"}
            //每个单元格的背景颜色
            if(tds[i].style.background.indexOf("black")>=0){
                temp.color = "b";
            }
            else if(tds[i].style.background.indexOf("white")>=0){
                temp.color = "w";
            }
            else{
                temp.color = "0";
            }
           //循环所有单元格，找出横竖左右与current在同一直线的棋子
            if(current.y == temp.y){//同一横线上
                line[0] += temp.color;
            }
            if(current.x == temp.x){//同一竖线上
                line[1] += temp.color;
            }
            if( (current.x+current.y) == (temp.x+temp.y) ){//同一左斜线上
                line[2] += temp.color;
            }
            if( (current.x-temp.x) == (current.y-temp.y) ){//同一右斜线上
                line[3] += temp.color;
            }
        }

        //定胜负
        var clo = color == "black" ? "bbbbb":"wwwww";
        for( var i = 0;i<4;i++){
            if(line[i].indexOf(clo)>=0){
                if(clo == "bbbbb")
                {alert("恭喜黑棋赢了!");}
                else
                {alert("恭喜白棋赢了!");}
                Iswin =true;
                break;
            }
        }

    }
}







