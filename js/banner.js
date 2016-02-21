/*自适应*/
function getEle(ele){
    return document.querySelector(ele)
}
var main = getEle('#main');
var oLis = document.querySelectorAll("#list>li");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 1008;
if(desW/desH<winW/winH){
    main.style.webkitTransform = 'scale('+winW/desW+')';
}else{
    main.style.webkitTransform = 'scale('+winH/desH+')';
}

/*所有图片滑动*/
[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;//move时的坐标
    var movePos = moveTouch-this.startY;//移动的距离
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id="";
    })
    if(movePos>0){/*↓*/
        var pos = -winH+movePos;
        this.prevsIndex = (index ==0?oLis.length-1:index-1);//上一张索引
    }else if(movePos<0){/*↑*/
        var  pos = winH+movePos;
        this.prevsIndex = (index == oLis.length-1?0:index+1);//下一张的索引

    }
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";


}
function end(e){
    if(this.flag){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }

}
document.addEventListener("touchmove",function(){
},false);

var audioBtn=document.querySelector("#audio-btn");
var media=document.querySelector("#media");

audioBtn.onclick = function(){
    if (media.paused) {
        media.play();
        audioBtn.id="audio-btn";
    }
    else {
        media.pause();
        audioBtn.id="";
    }
};