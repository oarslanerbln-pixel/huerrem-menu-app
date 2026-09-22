import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add subcategory to hh_1
content = content.replace(
    "    category: 'happy_hour',\n    imageUrl: '',\n    additives: ['13', '16', 'C']",
    "    category: 'happy_hour',\n    subcategory: 'Happy Hour',\n    imageUrl: '',\n    additives: ['13', '16', 'C']"
)

# Add subcategory to hh_2
content = content.replace(
    "    category: 'happy_hour',\n    imageUrl: ''\n  }",
    "    category: 'happy_hour',\n    subcategory: 'Happy Hour',\n    imageUrl: ''\n  }"
)

# Add subcategory to spiele_1
content = content.replace(
    "    category: 'spiele',\n    imageUrl: ''\n  }",
    "    category: 'spiele',\n    subcategory: 'Spiele & Spaß',\n    imageUrl: ''\n  }"
)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added subcategories")
