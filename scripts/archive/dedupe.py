import re
import codecs

def dedupe_menu():
    with codecs.open('src/data/menu.ts', 'r', 'utf-8') as f:
        content = f.read()

    # Find the start and end of the menuData array
    match = re.search(r'export const menuData: MenuItem\[\] = \[(.*)\];', content, re.DOTALL)
    if not match:
        print("Could not find menuData")
        return

    array_content = match.group(1)
    
    # We will split by `  },` which separates objects
    # But some might be `  }` at the end.
    objects = re.split(r'\n\s*\},', array_content)
    
    seen_ids = set()
    seen_names = set()
    
    unique_objects = []
    
    for obj in objects:
        if not obj.strip():
            continue
            
        # Re-add the closing brace and comma if it's not the last one
        obj_text = obj + '\n  },'
        
        # Extract id
        id_match = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', obj_text)
        if id_match:
            item_id = id_match.group(1)
            if item_id in seen_ids:
                print(f"Skipping duplicate ID: {item_id}")
                continue
            seen_ids.add(item_id)
        else:
            # Extract name
            name_match = re.search(r'name:\s*\{\s*DE:\s*[\'"]([^\'"]+)[\'"]', obj_text)
            if name_match:
                item_name = name_match.group(1)
                if item_name in seen_names:
                    print(f"Skipping duplicate Name: {item_name}")
                    continue
                seen_names.add(item_name)
            else:
                # E.g. Missing ID and name! 
                # Let's extract description
                desc_match = re.search(r'description:\s*\{\s*DE:\s*[\'"]([^\'"]+)[\'"]', obj_text)
                if desc_match:
                    desc = desc_match.group(1)
                    if desc in seen_names:
                        print(f"Skipping duplicate Description: {desc}")
                        continue
                    seen_names.add(desc)
                else:
                    print("Could not find ID, Name, or Description, keeping it.")
        
        unique_objects.append(obj_text)
        
    # The last object might have an extra `,`, let's fix it when we join
    new_array_content = ''.join(unique_objects)
    
    # Remove the trailing comma of the last item if any
    new_array_content = new_array_content.rstrip().rstrip(',')
    
    new_content = content[:match.start(1)] + new_array_content + '\n' + content[match.end(1):]
    
    # Also remove Virgin Mojito and Passion Fruit Cooler completely
    # They have ids d24 and d25, but just to be sure we remove them if they are still there
    
    with codecs.open('src/data/menu.ts', 'w', 'utf-8') as f:
        f.write(new_content)
        
dedupe_menu()
