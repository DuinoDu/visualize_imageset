#!/bin/sh

if [ ! -n "$1" ] || [ ! -n "$2" ] || [ ! -n "$3" ];then
    echo "Usage: ./run.sh [image set path] [annotation set path] [annotation saved file]"
    exit 1
fi
python setImageSet.py $1 $2 $3

if [ ! -f $3 ];then
    echo "No $3"
    exit1
fi

echo "Use firefox to open index.html"
python server.py $3 
