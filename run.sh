#!/bin/sh

python setImageSet.py $1

if [ ! -f voc2007.pkl ];then
    echo "No voc2007.pkl"
    exit1
fi

echo "Use firefox to open index.html"
python server.py 
