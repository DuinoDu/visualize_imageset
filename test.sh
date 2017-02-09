#!/bin/sh

if [ ! -n "$1" ];then
    echo "./test.sh 0 --- voc2007"
    echo "./test.sh 1 --- dianwang"
    echo "./test.sh 2 --- voc2012"
    echo "./test.sh 3 --- coco"
    exit 1
elif [ $1 = "0" ];then
    echo "run on voc2007"
    ./run.sh ~/data/VOCdevkit/VOC2007/JPEGImages ~/data/VOCdevkit/VOC2007/Annotations voc2007.pkl
elif [ $1 = "1" ];then
    echo "run on dian2016"
    ./run.sh ~/data/LABdevkit/DIAN2016/JEPGImages_1200 ~/data/LABdevkit/DIAN2016/Annotations dian2016.pkl
elif [ $1 = "2" ];then
    echo "run on voc2012"
    echo "No complemented"
elif [ $1 = "3" ];then
    echo "run on coco"
    echo "No complemented"
fi
