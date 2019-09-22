import mistune
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import html
import re
import os
from jinja2 import Template

class HighlightRenderer(mistune.Renderer):
    def block_code(self, code, lang):
        if not lang:
            return '\n<pre><code>%s</code></pre>\n' % \
                mistune.escape(code)
        lexer = get_lexer_by_name(lang, stripall=True)
        formatter = html.HtmlFormatter(linenos=True)
        return '<div class="highlight-wrapper">%s</div>\n' % highlight(code, lexer, formatter)

class Renderer:
    def __init__(self):
        self.markdown = mistune.Markdown(hard_wrap=True, renderer=HighlightRenderer())
        with open('src/blog_post.html') as f:
            self.post_html = f.read()

    def make_js_interactive(self, raw):
        return raw
    
    def render(self, postFile, output_dir):
        post = self.make_js_interactive(postFile.raw)
        post = self.markdown(post)
        post = re.sub(r'\!\{([\w\-]+)\}', r'<i class="mdi mdi-\1"></i>', post)
        meta = postFile.generate_meta_info()
        post = Template(self.post_html).render(
            post=post,
            title=postFile.title,
            posted_time=meta['posted_time'],
            update_time=meta['last_updated'],
            tags=meta['tags']
        )
        with open(os.path.join(output_dir, postFile.filename+'.html'), 'w') as f:
            f.write(post)
