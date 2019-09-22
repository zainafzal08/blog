import os
import json

class Meta():
    def __init__(self, posts_dir='src/posts', output_dir = 'docs'):
        self.posts_dir = posts_dir
        self.output_dir = output_dir
        try:
            with open(os.path.join(posts_dir, 'meta.json')) as f:
                self.obj = json.load(f)
        except:
            raise Exception("Could not parse posts/meta.json")
    
    def _get_meta_obj(self, path):
        curr = self.obj
        currPath = ['root']
        for arg in path:
            if arg not in curr:
                pathStr = '.'.join(currPath)
                raise Exception(f"Malformed meta.json, missing field {arg} from {pathStr} in meta.json")
            currPath.append(arg)
            curr = curr[arg]
        return curr

    def get(self, path):
        return self._get_meta_obj(path.split('.'))

    def set(self, path, val):
        obj = self._get_meta_obj(path.split('.'))
        obj[key] = val

    def check(self, path):
        path = path.split('.')
        val = path[-1]
        obj = self._get_meta_obj(path[:-1])
        return val in obj
    
    def add_post(self, postFile):
        path = f'posts.{postFile.filename}'
        if self.check(path):
            return postFile.hash != self.get(f'{path}.hash')
        else:
            self.set(path, postFile.generate_meta_info())
        return False
    
    def save(self):
        with open(os.path.join(self.posts_dir, 'meta.json'), 'w') as f:
            json.dump(self.obj, f)
        with open(os.path.join(self.output_dir, 'meta.json'), 'w') as f:
            json.dump(self.obj, f)