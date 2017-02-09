var filepath="images/"
var loadImage={"Date":[{"src":"000456.jpg"},{"src":"000542.jpg"},{"src":"001150.jpg"},{"src":"001763.jpg"},{"src":"004545.jpg"},{"src":"01.jpg"},{"src":"02.jpg"},{"src":"03.jpg"},{"src":"04.jpg"},{"src":"05.jpg"},{"src":"06.jpg"},{"src":"07.jpg"},{"src":"08.jpg"},{"src":"09.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},]}

var bboxes = {};
var loadingNum = 3;
var flag1 = 0;
var flag2 = loadingNum;

var serverAddr = "http://localhost:5000"
window.onload=function(){
    imgLocation("content","box");
    window.onscroll=function(){
        //if(checkFlag()){
        if(1){
            url = serverAddr + "/?start="+flag1 + "&end=" + flag2;
            $.getJSON( url, function(data){
                if(typeof(data) == 'undefined'){
                    return;
                }
                // assert data['data'].length == loadingNum
                for(var i = flag1;i < Math.min(flag2, loadImage.Date.length); i++){
                    if(typeof(data['data'][i]) == 'undefined'){
                        continue;
                    }
                    var box=document.createElement("div");
                    box.className="box";
                    var cparent=document.getElementById("content");
                    cparent.appendChild(box);
                    var box_img=document.createElement("div");
                    box_img.className="box_img";
                    box.appendChild(box_img);

                    var img = document.createElement("canvas");
                    drawCanvas(img, filepath + loadImage.Date[i].src, data['data'][i]);

                    box_img.appendChild(img);
                }
                imgLocation("content","box");
                flag1 += loadingNum;
                flag2 += loadingNum;
                if (flag1 > Math.min(flag2, loadImage.Date.length)){
                    flag1 = 0;
                    flag2 = loadingNum;
                }
                if (flag2 > loadImage.Date.length){ 
                    flag1 = 0;
                    flag2 = loadingNum;
                }
            });
        }
    }
}


function drawCanvas(canvas, imgsrc, bboxes){
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = imgsrc;
    image.onload = function() {
        if (image.width != canvas.width) {
            canvas.width = image.width;
        }
        if (image.height != canvas.height) {
            canvas.height = image.height;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.strokeStyle = "#FF6600";
        ctx.lineWidth = 2;

        width_bbox = bboxes[0][1];
        height_bbox = bboxes[0][2];
        for(var i=0; i < bboxes.length; i++){
            x1 = bboxes[i][3]*image.width/width_bbox;
            y1 = bboxes[i][4]*image.height/height_bbox;
            x2 = bboxes[i][5]*image.width/width_bbox;
            y2 = bboxes[i][6]*image.height/height_bbox;
            ctx.strokeRect( x1, y1, x2-x1, y2-y1);
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
