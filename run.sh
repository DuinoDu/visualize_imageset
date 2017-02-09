#!/bin/sh

if [ ! -n "$1" ] || [ ! -n "$2" ];then
    echo "Usage: ./run.sh [image set path] [annotation set path]"
    exit 1
fi
python setImageSet.py $1 $2

annotation='voc2007.pkl'
if [ ! -f $annotation ];then
    echo "No ${annotation}"
    exit1
fi

echo "Use firefox to open index.html"
python server.py ${annotation} 
