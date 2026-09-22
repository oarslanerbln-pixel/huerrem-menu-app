import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://menury.com/api/guest/restaurant/acf150c429/de"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept': 'application/json'})
try:
    with urllib.request.urlopen(req, context=ctx) as response:
        content = response.read().decode('utf-8')
        data = json.loads(content)
        print("Success! Keys in data:", data.keys())
        if 'categories' in data:
            print("Found categories!")
            with open('original_menu.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
except Exception as e:
    print("Error:", e)
    
url2 = "https://menury.com/api/guest/restaurant/acf150c429"
req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'})
try:
    with urllib.request.urlopen(req2, context=ctx) as response:
        content = response.read().decode('utf-8')
        data = json.loads(content)
        print("Success URL2! Keys in data:", data.keys())
        with open('original_menu.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
except Exception as e:
    print("URL2 Error:", e)
