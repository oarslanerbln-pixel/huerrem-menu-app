import re

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix subsubcategory typo
    content = content.replace('subsubcategory:', 'subcategory:')

    # Fix missing subcategory for those items
    # The TS error says: Property 'subcategory' is missing in type...
    # Let's just make subcategory optional in MenuItem! That is the cleanest way.

    with open('../src/types.ts', 'w') as f:
        pass # Wait, let's check if we can edit MenuItem interface in menu.ts

    # The interface is in menu.ts at the top:
    # export interface MenuItem {
    #   ...
    #   subcategory?: string;
    # }
    # Let's ensure subcategory is optional.
    content = re.sub(r'subcategory\s*:\s*string\s*;', 'subcategory?: string;', content)

    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
