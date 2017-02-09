#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from flask import jsonify, request
app = Flask(__name__)

#import logging
#log = logging.getLogger('werkzeug')
#log.setLevel(logging.ERROR)

import os
import cPickle
import copy

annotation_file = ""
annotation = None
def loadAnnotation(filename):
    global annotation
    if annotation is None and os.path.exists(filename):
        with open(filename, 'rb') as fid:
            annotation = cPickle.load(fid)

@app.route('/')
def sendBBoxes():
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    global annotation_file 
    loadAnnotation(annotation_file)
    global annotation
    assert(annotation != None)

    assert(start >= 0 and start < end and end < len(annotation))
    response = jsonify(data = annotation[start : end])
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

def main():
    import sys
    if len(sys.argv) != 2:
        print "no annotation file path"
        return
    global annotation_file 
    annotation_file = sys.argv[1]
    app.run(host='127.0.0.1', port=5000)

def test():
    import sys
    if len(sys.argv) != 2:
        print "no annotation file path"
        return
    global annotation_file 
    annotation_file = sys.argv[1]
    loadAnnotation(annotation_file)
    global annotation
    assert(annotation != None)
    print annotation[0]

if __name__ == "__main__":
    #test()
    main()
