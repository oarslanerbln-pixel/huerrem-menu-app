import urllib.request
import re

try:
    req = urllib.request.Request(
        'https://huerremsultan-menu.netlify.app/', 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'src="(/assets/index-.*?\.js)"', html)
    if match:
        js_url = 'https://huerremsultan-menu.netlify.app' + match.group(1)
        req_js = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
        js = urllib.request.urlopen(req_js).read().decode('utf-8')
        
        # let's find the imageUrls inside the JS bundle!
        urls = re.findall(r'imageUrl:\s*"([^"]+)"', js)
        urls.extend(re.findall(r"imageUrl:\s*'([^']+)'", js))
        
        with open('netlify_urls.txt', 'w', encoding='utf-8') as f:
            for u in set(urls):
                f.write(u + '\n')
        print(f"Extracted {len(set(urls))} unique imageUrls from netlify JS.")
    else:
        print("Could not find JS bundle")
except Exception as e:
    print("Error:", e)
