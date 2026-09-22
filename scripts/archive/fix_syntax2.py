import re

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix subimageUrl
    content = content.replace('subimageUrl:', 'imageUrl:')

    # We will split by items
    items = re.split(r'(?=\{.*?id:\s*\'[^\']*\'[^{}]*\})', content, flags=re.DOTALL)
    
    # Wait, splitting by {} is hard because description has {}. 
    # Let's just do a simple line replacement and check for duplicates.
    
    lines = content.split('\n')
    new_lines = []
    
    in_object = False
    keys_seen = set()
    
    for line in lines:
        if 'id:' in line and 'name:' not in line:
            in_object = True
            keys_seen = set()
            
        if '}' in line and 'name:' not in line and 'description:' not in line:
            in_object = False
            
        if in_object:
            key_match = re.search(r'^\s*([a-zA-Z0-9_]+):', line)
            if key_match:
                k = key_match.group(1)
                
                if k == 'category':
                    val = line.split(":", 1)[1]
                    if 'Fresh Homemade' in val or 'Smoothies' in val or 'Homemade Iced Tea' in val or 'Softdrinks' in val:
                        # wrong category
                        val_str = val.strip().replace(',', '')
                        if 'category' in keys_seen:
                            # We already saw category! Just turn this into subcategory
                            line = f"    subcategory: {val_str},"
                        else:
                            line = f"    subcategory: {val_str},\n    category: 'drinks',"
                            keys_seen.add('category')
                    elif 'Hürrem Kombis' in val:
                        if 'category' in keys_seen:
                            line = f"    subcategory: 'Hürrem Kombis',"
                        else:
                            line = f"    subcategory: 'Hürrem Kombis',\n    category: 'kombis',"
                            keys_seen.add('category')
                    else:
                        if 'category' in keys_seen:
                            continue # skip duplicate
                        keys_seen.add('category')
                        
                elif k == 'subcategory':
                    if 'subcategory' in keys_seen:
                        continue
                    keys_seen.add('subcategory')
                elif k == 'imageUrl':
                    if 'imageUrl' in keys_seen:
                        continue
                    keys_seen.add('imageUrl')
                elif k == 'subimageUrl':
                    continue # already handled above with string replace but just in case
                    
        new_lines.append(line)
        
    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))

if __name__ == '__main__':
    main()
