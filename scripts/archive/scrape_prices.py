import urllib.request
import json
import re

url = 'https://menury.com/r/acf150c429/Berlin/H%C3%BCrremLounge/de/6af3dd0'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f'HTML length: {len(html)}')
        
        # Look for NEXT_DATA
        next_data_match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if next_data_match:
            data = json.loads(next_data_match.group(1))
            with open('menury_data.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print('Saved NEXT_DATA to menury_data.json')
        else:
            print('NEXT_DATA not found. Looking for other JSON objects...')
except Exception as e:
    print(f'Error: {e}')
