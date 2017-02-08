#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
###########
Usage:
python getImages.py image_path

'''

def editJS(content):
    assert len(content) == 2
    with open('main.js', 'r') as fid:
        lines = fid.readlines();
    with open('main.js', 'w') as fid:
        for l in lines:
            if '    var filepath' in l:
                fid.write('    ' + content[0] + '\n')
            elif '    var loadImage' in l:
                fid.write('    ' + content[1] + '\n')
            else:
                fid.write(l)


def getImages(argv):
    filepath = argv[1]
    if not filepath.endswith('/'):
        filepath += '/'
    import os
    files = os.listdir(filepath)
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
    if len(sys.argv) != 2:
        print(__doc__)
        return
    editJS(getImages(sys.argv))
    print "Written to main.js, open index.html using browser"

if __name__ == "__main__":
    main()
