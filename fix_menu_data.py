import codecs
import re
import sys

def main():
    content = codecs.open('src/data/menu.ts', 'r', 'utf-8').read()

    # 1. Remove duplicate Cocktails
    # We will remove any item that has the EXACT same name in DE as a previously seen item in Cocktails
    # But since it's hard to parse TS safely without a JS parser, we can just replace the specific duplicates:
    # "Another One Wood Smoke", "Cloud Seven Balloon Glass", "Funky Passion Bubble Tea", "Violet Wood Smoke", "Blue Lychee Mosquito", "Coconut Kiss", "Dragonfruit Sunset", "Fancy Love", "Mosquito"
    # Wait, the easiest way to remove the duplicates is to deduplicate items with the same id.
    
    # 2. Fix Happy Hour
    # Happy hour items currently have "Kombi 1", "Kombi 2", "Kombi 3" inside subcategory 'Happy Hour'.
    # We need to remove all items with subcategory: 'Happy Hour' and insert the correct ones.
    
    # 3. Add missing cocktails
    
    # Let's do this by executing a JS script that parses and rewrites menu.ts! 
    # Much safer.
    pass

if __name__ == '__main__':
    main()
