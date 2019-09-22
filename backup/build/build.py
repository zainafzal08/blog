import shutil
import os

from Meta import Meta
from Renderer import Renderer
from MarkdownPostFile import MarkdownPostFile

def build():
    # read meta data
    meta = Meta()
    renderer = Renderer()

    # read files and render any new/changed ones
    for filename in os.listdir(meta.posts_dir):
        if filename == 'meta.json':
            continue
        postFile = MarkdownPostFile(os.path.join(meta.posts_dir, filename))
        should_render = meta.add_post(postFile)
        if should_render:
            print(f"    ... Rendering {postFile.filename}")
            renderer.render(postFile, os.path.join(meta.output_dir, 'post'))

    # save the updated meta file
    meta.save()
    # copy over index
    shutil.copy('src/index.html', 'docs/index.html')

if __name__ == "__main__":
    build()