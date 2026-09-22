import urllib.request
import re
import json

try:
    html = urllib.request.urlopen('https://huerremsultan-menu.netlify.app/').read().decode('utf-8')
    match = re.search(r'src="(/assets/index-.*?\.js)"', html)
    if match:
        js_url = 'https://huerremsultan-menu.netlify.app' + match.group(1)
        js = urllib.request.urlopen(js_url).read().decode('utf-8')
        with open('netlify_js_bundle.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print('Saved bundle:', js_url)
    else:
        print("Could not find JS bundle in HTML:", html[:500])
except Exception as e:
    print("Error:", e)
