import urllib.request
import re

url = 'https://menury.com/js/guest_menu/app.js?v=91fd7593d8'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        js = response.read().decode('utf-8')
        matches = set(re.findall(r'[\'"`]/api/[\w/-]+', js))
        for m in matches:
            print(m)
except Exception as e:
    print(e)
