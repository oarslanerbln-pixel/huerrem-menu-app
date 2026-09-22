import sys

with open(r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace contents of strings/comments with spaces so line/col are perfectly preserved
in_str = False
str_char = ''
in_line_comment = False
in_block_comment = False
new_text = list(text)

i = 0
while i < len(text):
    c = text[i]
    if in_line_comment:
        if c == '\n':
            in_line_comment = False
        else:
            new_text[i] = ' '
    elif in_block_comment:
        if c == '*' and i+1 < len(text) and text[i+1] == '/':
            new_text[i] = ' '
            new_text[i+1] = ' '
            in_block_comment = False
            i += 1
        elif c != '\n':
            new_text[i] = ' '
    elif in_str:
        if c == '\\':
            new_text[i] = ' '
            if i+1 < len(text):
                new_text[i+1] = ' '
                i += 1
        elif c == str_char:
            in_str = False
            # keep quote or not? replace with space so it doesn't mess up
            new_text[i] = ' '
        elif c != '\n':
            new_text[i] = ' '
    else:
        if c == '/' and i+1 < len(text) and text[i+1] == '/':
            in_line_comment = True
            new_text[i] = ' '
            new_text[i+1] = ' '
            i += 1
        elif c == '/' and i+1 < len(text) and text[i+1] == '*':
            in_block_comment = True
            new_text[i] = ' '
            new_text[i+1] = ' '
            i += 1
        elif c in "'\"`":
            in_str = True
            str_char = c
            new_text[i] = ' '
    i += 1

text = "".join(new_text)

stack = []
for i, char in enumerate(text):
    if char in '{[':
        line = text.count('\n', 0, i) + 1
        col = i - text.rfind('\n', 0, i)
        stack.append((char, line, col))
    elif char in '}]':
        line = text.count('\n', 0, i) + 1
        col = i - text.rfind('\n', 0, i)
        if not stack:
            print(f"Error: unmatched {char} at line {line}, col {col}")
            sys.exit(1)
        top, tline, tcol = stack.pop()
        if (char == '}' and top != '{') or (char == ']' and top != '['):
            print(f"Error: mismatched {char} at line {line}, col {col} (expected {']' if top == '[' else '}'} to match {top} at line {tline}, col {tcol})")
            sys.exit(1)

if stack:
    print(f"Error: unclosed {stack[-1][0]} from line {stack[-1][1]}, col {stack[-1][2]}")
else:
    print("Brackets are perfectly balanced!")
