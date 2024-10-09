import os
import pickle
import numpy
import nltk
from nltk.stem import WordNetLemmatizer
import json

# nltk.download('punkt_tab')

CURRENT_DIRECTORY = os.getcwd()

lemmatizer = WordNetLemmatizer()

words = []
classes = []
documents = []
ignoreLetters = ['.', ',', '?', '!', "'", '"']

with open(fr"{CURRENT_DIRECTORY}\chatbot_server\chatEngine\data.json") as dataJSON:
    data = json.load(dataJSON)
    
    for intent in data['intents']:
        for pattern in intent['patterns']:
            
            wordList = nltk.word_tokenize(pattern)
            words.extend(wordList)
            
            documents.append({
                "wordList": wordList,
                "tag": intent['tag']
            })
            
            if intent['tag'] not in classes:
                classes.append(intent['tag'])
                
                
print(words)