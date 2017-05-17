import nltk
import json
import requests
from pprint import pprint
from WikipediaAPI import *
from zomatoAPI import *
import time
import sys
import os

def psleep(n, t = 0.1):
    for i in range(n):
        sys.stdout.write(".")
        time.sleep(t)

def filterword(tagged):
    output = {'Noun':[],
              'Verb':[],
              'Other':[]}
    print("\n\nFiltering the words...\n")
    for i in tagged:
        for j in i:
            if j[1] in ['NN' , 'NNS' , 'NNP' , 'NNPS']:
                output['Noun'].append(j[0])
            elif j[1] in ['VB' , 'VBD' , 'VBG' , 'VBN' , 'VBP' , 'VBZ']:
                output['Verb'].append(j[0])
            else:
                output['Other'].append(j[0])
    print(json.dumps(output, indent=4))
    return output



javahome = os.getenv("JAVA_HOME")           # Getting java home from system  (Java installation required)
os.environ["JAVAHOME"] = javahome + '/bin/java'  
psleep(3)
print("JAVA_HOME found...")

from nltk.tag.stanford import StanfordPOSTagger

cwd = os.getcwd()
os.environ["STANFORD_MODELS"] = cwd + '/stanford-postagger-full/models'  # For English Bidirectional model file
psleep(3)
print("   Got models  ...")

_path_to_jar = cwd + '/stanford-postagger-full/stanford-postagger.jar'   # For Stanford Tagger
psleep(3)
print("Got Tagger file...")

st = StanfordPOSTagger('english-bidirectional-distsim.tagger', path_to_jar=_path_to_jar)  # Stanford Tagger
psleep(3)
print("  Tagger ready ...")

psleep(21, 0.01)
print("\n\n")

cont = True
while(cont):
    sent = input(ques["default"][0])

    print("\n\nTokenizing the words...\n")
    words = nltk.word_tokenize(sent)
    print(words)

    print("\n\nTagging the words...\n")
    tagged = []
    tagged.append(st.tag(words))
    print(tagged)
    
    output = filterword(tagged)

    dictnoun = {}
    print("\n\nFinding attributes of some nouns...\n")
    dictnoun = findattr1(dictnoun, output['Noun'])
    print(json.dumps(dictnoun, indent = 4))

    cont = False
# THE END