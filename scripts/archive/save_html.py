import urllib.request

url = 'https://menury.com/r/acf150c429/Berlin/H%C3%BCrremLounge/de/6af3dd0'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        with open('menury.html', 'w', encoding='utf-8') as f:
            f.write(html)
except Exception as e:
    print(f'Error: {e}')
