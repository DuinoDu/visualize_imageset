#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
###########
Usage:
python getImages.py image_path (annotation_path)

'''
import os
import cPickle
import xml.etree.ElementTree as ET

def voc2012():
    pass
def coco():
    pass
def dianwang():
    pass

def voc2007(annotationPath):
    """TODO: Docstring for voc2007.
    :returns: TODO

    """
    cache_file = 'voc2007.pkl'
    if not os.path.exists(cache_file):
        print 'parse annotation file...'
        files = os.listdir(annotationPath)
        files = sorted(files)
        annotation = []
        for f in files:
            assert(f.endswith('xml'))
            tree = ET.parse(os.path.join(annotationPath, f))
            width = tree.find('size').find('width').text, 
            height = tree.find('size').find('height').text
            boxes = []
            objs = tree.findall('object')
            for ix, obj in enumerate(objs):
                objName = obj.find('name').text
                bbox = obj.find('bndbox')
                x1 = float(bbox.find('xmin').text) - 1
                y1 = float(bbox.find('ymin').text) - 1
                x2 = float(bbox.find('xmax').text) - 1
                y2 = float(bbox.find('ymax').text) - 1
                boxes.append([objName, width, height, x1, y1, x2, y2])
            annotation.append(boxes)

        with open(cache_file, 'wb') as fid:
            cPickle.dump(annotation, fid, cPickle.HIGHEST_PROTOCOL)
        print 'wrote voc2007 annotation to {}'.format(cache_file)

def editJS(content):
    assert len(content) == 2
    with open('main.js', 'r') as fid:
        lines = fid.readlines();
    with open('main.js', 'w') as fid:
        for l in lines:
            if 'var filepath' in l:
                fid.write(content[0] + '\n')
            elif 'var loadImage' in l:
                fid.write(content[1] + '\n')
            else:
                fid.write(l)

def getImages(argv):
    filepath = argv[1]
    if not filepath.endswith('/'):
        filepath += '/'
    files = os.listdir(filepath)
    files = sorted(files)
    loadImage = "{\"Date\":["
    for f in files:
        if f.endswith('jpg') or f.endswith('JPG'):
            loadImage += "{"
            loadImage += "\"src\":"
            loadImage += "\"{}\"".format(f)
            loadImage += "},"
    loadImage += "]}"
    
    contents = []
    contents.append("var filepath=\"{}\"".format(filepath))
    contents.append("var loadImage={}".format(loadImage))
    return contents

def main():
    import sys
    if len(sys.argv) < 2:
        print(__doc__)
        return
    editJS(getImages(sys.argv))
    
    if len(sys.argv) == 3:
        voc2007(sys.argv[2])


if __name__ == "__main__":
    main()
