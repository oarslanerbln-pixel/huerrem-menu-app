import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We know the last valid item we added was spiele_1.
# It ends with `imageUrl: ''\n  },`
# After that, there is broken junk until `];`
# Let's fix it by regex.

fixed_content = re.sub(
    r"(imageUrl: ''\n\s*\}.*?)(?=\n\];)",
    r"imageUrl: ''\n  }",
    content,
    flags=re.DOTALL
)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Fixed menu.ts")
