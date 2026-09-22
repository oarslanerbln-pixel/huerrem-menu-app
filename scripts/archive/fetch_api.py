import urllib.request
import re

url = "https://menury.com/js/guest_menu/app.js?v=ca97460b60"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        urls = re.findall(r'[\'\"\/]api\/[a-zA-Z0-9_\-\/]*', content)
        print("Found API endpoints:")
        for u in set(urls):
            print(u)
except Exception as e:
    print("Error:", e)
