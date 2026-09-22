import re

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Replace wrong categories with subcategory + category 'drinks'
    wrong_categories = ["'Fresh Homemade'", "'Smoothies'", "'Homemade Iced Tea'", "'Softdrinks'"]
    for w in wrong_categories:
        content = re.sub(r"category:\s*" + w + r"\s*,", f"subcategory: {w},\n    category: 'drinks',", content)
        
    content = re.sub(r"category:\s*'Hürrem Kombis'\s*,", f"subcategory: 'Hürrem Kombis',\n    category: 'kombis',", content)

    # Step 2: Remove duplicate 'category' and 'subcategory' keys within an item { ... } block
    def remove_duplicates(match):
        block = match.group(0)
        lines = block.split('\n')
        new_lines = []
        seen = set()
        
        for line in lines:
            m = re.match(r'^\s*([a-zA-Z0-9_]+):', line)
            if m:
                k = m.group(1)
                if k in ['category', 'subcategory', 'imageUrl', 'subimageUrl']:
                    if k in seen:
                        continue
                    seen.add(k)
            new_lines.append(line)
        return '\n'.join(new_lines)

    content = re.sub(r'\{[^{}]*id:\s*\'[^\']*\'[^{}]*\}', remove_duplicates, content, flags=re.DOTALL)
    
    # Actually wait, description has {} like {{ something }} so the regex breaks.
    # Instead of regex, split by '  {\n    id:'
    
    blocks = content.split('  {\n    id:')
    out = [blocks[0]]
    for block in blocks[1:]:
        header = '  {\n    id:'
        # Find where the object ends (usually '  },')
        end_idx = block.rfind('\n  },')
        if end_idx == -1:
            end_idx = block.rfind('\n  }')
            
        if end_idx != -1:
            obj_content = block[:end_idx]
            rest = block[end_idx:]
            
            lines = obj_content.split('\n')
            new_lines = []
            seen = set()
            for line in lines:
                m = re.match(r'^\s*([a-zA-Z0-9_]+):', line)
                if m:
                    k = m.group(1)
                    if k in ['category', 'subcategory', 'imageUrl']:
                        if k in seen:
                            continue
                        seen.add(k)
                new_lines.append(line)
            out.append(header + '\n'.join(new_lines) + rest)
        else:
            out.append(header + block)

    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(''.join(out))

if __name__ == '__main__':
    main()
