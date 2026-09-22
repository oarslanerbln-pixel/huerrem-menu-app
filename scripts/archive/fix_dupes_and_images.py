import sys, re
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# 1. Fix duplicate shake entries — remove the SECOND occurrence of each d_shake_ id
# They appear twice because the script ran twice. Keep the first occurrence of each.
seen_ids = set()
lines = content.split('\n')
result_lines = []
skip_block = False
brace_depth = 0
current_id = None

i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if this line starts a new item block with a duplicate id
    id_match = re.search(r"id:\s*'([^']+)'", line)
    
    if id_match and '{' in lines[max(0,i-1)] or (id_match and i > 0):
        found_id = id_match.group(1)
        # Look back a few lines to see if we're in a new { block
        # Check if previous non-empty line has opening brace
        pass
    
    result_lines.append(line)
    i += 1

# Simpler approach: find all item blocks using regex and deduplicate
# Split on item boundaries (each item starts with "  {" and ends with "  },")
item_pattern = re.compile(r'  \{\s*\n(?:    [^\n]*\n)*?    imageUrl:[^\n]*\n  \},?', re.DOTALL)

# Actually, let's do a targeted fix:
# Remove the ADDED HAPPY HOUR section that's duplicated, and the duplicate shakes
# The duplicate pattern: items hh_1, hh_2, spiele_1 were added AGAIN via the script

# Find and remove the second "// --- ADDED HAPPY HOUR ---" block with all its content
# up to "];"
second_hh_comment = content.find('// --- ADDED HAPPY HOUR ---', 
                                   content.find('// --- ADDED HAPPY HOUR ---') + 1)

if second_hh_comment != -1:
    # Find the start of this block (go back to the newline)
    block_start = content.rfind('\n', 0, second_hh_comment)
    # Find "];" after this block
    block_end = content.find('\n];', second_hh_comment)
    if block_end != -1:
        removed_section = content[block_start:block_end]
        print(f"Found duplicate section to remove ({len(removed_section)} chars)")
        print("First 200 chars:", removed_section[:200])
        content = content[:block_start] + content[block_end:]
        print(f"Removed! New length: {len(content)} (was {original_len})")
    else:
        print("Could not find ]; after second ADDED HAPPY HOUR")
else:
    print("No duplicate ADDED HAPPY HOUR section found")

# 2. Fix cocktail image paths: 
# /images/menury_originals/signature_cocktails__X.webp -> /images/drinks/cocktails/signature_cocktails__X.webp
# /images/menury_originals/high_class_cocktails__X.webp -> /images/drinks/cocktails/high_class_cocktails__X.webp

old_path = '/images/menury_originals/signature_cocktails__'
new_path = '/images/drinks/cocktails/signature_cocktails__'
count1 = content.count(old_path)
content = content.replace(old_path, new_path)
print(f"Fixed {count1} signature cocktail image paths")

old_path2 = '/images/menury_originals/high_class_cocktails__'
new_path2 = '/images/drinks/cocktails/high_class_cocktails__'
count2 = content.count(old_path2)
content = content.replace(old_path2, new_path2)
print(f"Fixed {count2} high class cocktail image paths")

# Also fix heisse specials if they were set to menury_originals
old_hs = '/images/menury_originals/heisse_specials__'
new_hs = '/images/menury_originals/heisse_specials__'  # keep same for now - check if files exist

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! File saved. Final length: {len(content)}")
