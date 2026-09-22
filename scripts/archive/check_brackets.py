with open(r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Filter out quotes and comments to avoid false positives!
import re
text = re.sub(r"'[^']*'", "''", text)
text = re.sub(r'"[^"]*"', '""', text)
text = re.sub(r'//.*', '', text)
text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)

stack = []
for i, char in enumerate(text):
    line = text.count('\n', 0, i) + 1
    col = i - text.rfind('\n', 0, i)
    if char in '{[':
        stack.append((char, line, col))
    elif char in '}]':
        if not stack:
            print(f"Error: unmatched {char} at line {line}, col {col}")
            break
        top, tline, tcol = stack.pop()
        if (char == '}' and top != '{') or (char == ']' and top != '['):
            print(f"Error: mismatched {char} at line {line}, col {col} (expected {']' if top == '[' else '}'} to match {top} at line {tline}, col {tcol})")
            break
else:
    if stack:
        print(f"Error: unclosed {stack[-1][0]} from line {stack[-1][1]}")
    else:
        print("Brackets are perfectly balanced!")
