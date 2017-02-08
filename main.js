window.onload=function(){
    imgLocation("content","box");
    var filepath="images/"
    var loadImage={"Date":[{"src":"03.jpg"},{"src":"16.jpg"},{"src":"10.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"07.jpg"},{"src":"000456.jpg"},{"src":"01.jpg"},{"src":"04.jpg"},{"src":"09.jpg"},{"src":"000542.jpg"},{"src":"001150.jpg"},{"src":"06.jpg"},{"src":"12.jpg"},{"src":"02.jpg"},{"src":"15.jpg"},{"src":"11.jpg"},{"src":"05.jpg"},{"src":"004545.jpg"},{"src":"08.jpg"},{"src":"17.jpg"},{"src":"001763.jpg"},]}

    var flag1 = 0;
    var flag2 = 20;
    
    // init
    var first_img = document.getElementsByTagName("img")[0];
    first_img.src=filepath+loadImage.Date[0].src;
    for(var i=1;i<Math.min(10, loadImage.Date.length);i++){
        var box=document.createElement("div");
        box.className="box";
        var cparent=document.getElementById("content");
        cparent.appendChild(box);
        var box_img=document.createElement("div");
        box_img.className="box_img";
        box.appendChild(box_img);
        var img=document.createElement("img");
        img.src=filepath+loadImage.Date[i].src;
        box_img.appendChild(img);
    }

    window.onscroll=function(){
        if(checkFlag()){
            for(var i = flag1;i < Math.min(flag2, loadImage.Date.length); i++){
                var box=document.createElement("div");
                box.className="box";
                var cparent=document.getElementById("content");
                cparent.appendChild(box);
                var box_img=document.createElement("div");
                box_img.className="box_img";
                box.appendChild(box_img);
                var img=document.createElement("img");
                img.src = filepath + loadImage.Date[i].src;
                box_img.appendChild(img);
            }
            imgLocation("content","box");
            flag1 += 20;
            flag2 += 20;
            if (flag1 > Math.min(flag2, loadImage.Date.length)){
                flag1 = 0;
            }
            if (flag2 > loadImage.Date.length){ 
                flag1 = 0;
                flag2 = 20;
            }
        }
    }
}

function checkFlag(){
    var cparent=document.getElementById("content");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    console.log(lastContentHeight+":"+scrollHeight+":"+pageHeight);
    if(lastContentHeight<scrollHeight+pageHeight){
        return true;
    }
}

function imgLocation(parent,child){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,child);
    var imgwidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/imgwidth);
    cparent.style.cssText="width:"+imgwidth*cols+"px;margin:30px auto";
    var heightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){
            heightArr.push(ccontent[i].offsetHeight);
        }else{
            var minHeight=Math.min.apply(null,heightArr);
            var minIndex=getMinIndex(heightArr,minHeight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            heightArr[minIndex]+=ccontent[i].offsetHeight;
        }
    }
}

function getMinIndex(heightArr,minHeight){
    for(var i=0;i<heightArr.length;i++){
        if(heightArr[i]==minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content){
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
