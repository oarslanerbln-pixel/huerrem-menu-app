import sys, re
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original length: {len(content)}")

# Split into items by finding all { ... } blocks at item level
# Strategy: split on the export/const boundaries to get the raw array string
# Then parse items, deduplicate by id, reconstruct

# Find the array content
array_start = content.find('export const menuData')
array_open = content.find('[', array_start)
array_close = content.rfind('];')

header = content[:array_open+1]
footer = content[array_close:]
array_body = content[array_open+1:array_close]

print(f"Array body length: {len(array_body)}")

# Split into individual item blocks
# Each item block starts with { and ends with the matching }
blocks = []
depth = 0
current = []
in_string = False
string_char = None
escape_next = False
i = 0

while i < len(array_body):
    ch = array_body[i]
    
    if escape_next:
        escape_next = False
        current.append(ch)
        i += 1
        continue
    
    if ch == '\\' and in_string:
        escape_next = True
        current.append(ch)
        i += 1
        continue
    
    if ch in ('"', "'") and not in_string:
        in_string = True
        string_char = ch
        current.append(ch)
        i += 1
        continue
    
    if ch == string_char and in_string:
        in_string = False
        string_char = None
        current.append(ch)
        i += 1
        continue
    
    if not in_string:
        if ch == '{':
            depth += 1
            current.append(ch)
        elif ch == '}':
            depth -= 1
            current.append(ch)
            if depth == 0:
                block_text = ''.join(current).strip().rstrip(',').strip()
                if block_text and len(block_text) > 10:
                    blocks.append(block_text)
                current = []
        else:
            current.append(ch)
    else:
        current.append(ch)
    i += 1

print(f"Found {len(blocks)} raw blocks")

# Deduplicate by id
seen_ids = set()
unique_blocks = []
comment_blocks = []
duplicates = 0

for block in blocks:
    id_match = re.search(r"id:\s*'([^']+)'", block)
    if id_match:
        item_id = id_match.group(1)
        if item_id in seen_ids:
            duplicates += 1
            print(f"  DUPLICATE removed: {item_id}")
        else:
            seen_ids.add(item_id)
            unique_blocks.append(block)
    else:
        # Keep blocks without id (shouldn't happen but keep for safety)
        unique_blocks.append(block)

print(f"\nRemoved {duplicates} duplicates. Unique items: {len(unique_blocks)}")

# Reconstruct the array
new_array_body = '\n  ' + ',\n  '.join(unique_blocks) + '\n'
new_content = header + new_array_body + footer

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Final length: {len(new_content)} (was {len(content)})")
print("Done!")
