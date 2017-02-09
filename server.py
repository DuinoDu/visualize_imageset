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

    cache_file = 'voc2007.pkl'
    loadAnnotation(cache_file)
    global annotation
    assert(annotation != None)

    response = jsonify(data = annotation[start : end])
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
