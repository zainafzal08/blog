import hashlib
import os
from time import time
import json

class MarkdownPostFile:
    def __init__(self, file):
        self.filename, self.file_extension = os.path.splitext(os.path.split(file)[-1])
        self.filePath = file
        self.sync()
    
    def sync(self):
        print(f"Syncing {self.filePath}")
        with open(self.filePath, "r") as f:
            self.lines = [x.strip() for x in f.readlines()]
            post_meta = json.loads(self.lines[0])
            self.tags = post_meta['tags']
            self.title = post_meta['title']
        with open(self.filePath, "rb") as f:
            self.hash = hashlib.sha256(f.read()).hexdigest()

        self.raw = "\n".join(self.lines[1:])
        
    def generate_meta_info(self):
        current_time = time()
        details = {}
        details['hash'] = self.hash
        details['posted_time'] = current_time
        details['last_updated'] = current_time
        details['title'] = self.title
        details['tags'] = self.tags
        return details
    
    def __str__(self):
        return self.filePath
    
    def __repr__(self):
        return self.__str__()