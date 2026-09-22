import re
import json

with open("src/data/menu.ts", encoding="utf-8") as f:
    content = f.read()

names = re.findall(r"name:\s*\{\s*DE:\s*['\"](.*?)['\"]", content)
descs = re.findall(r"description:\s*\{\s*DE:\s*['\"](.*?)['\"]", content)

data = {
    "names": list(set(names)),
    "descriptions": list(set(descs))
}

with open("scripts/texts_to_translate.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
