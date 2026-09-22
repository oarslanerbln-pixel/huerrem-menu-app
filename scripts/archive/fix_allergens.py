import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

allergen_codes = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'O', 'P', 'R'}
additive_codes = {'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'}

# The pattern looks for a space followed by a list of comma separated codes at the end of the string.
# e.g. "ICED STRAWBERRY VELVET 9, A, H"
# regex: r' (([A-Z0-9]{1,2}(, )?)+)"$'

out_lines = []
current_allergens = set()
current_additives = set()
in_item = False
brace_level = 0
last_item_end_idx = -1

for i, line in enumerate(lines):
    if '{' in line and 'id":' in lines[min(i+1, len(lines)-1)] or 'id":' in line:
        in_item = True
        current_allergens = set()
        current_additives = set()
    
    if in_item:
        # Check name fields
        match = re.search(r'"(DE|EN|TR|FR|ES|RU)": "(.*?) ((([A-Z0-9]{1,2})(, )?)+)"', line)
        if match:
            codes_str = match.group(3)
            codes = [c.strip() for c in codes_str.split(',')]
            valid = True
            for c in codes:
                if c not in allergen_codes and c not in additive_codes:
                    valid = False
            
            if valid:
                for c in codes:
                    if c in allergen_codes:
                        current_allergens.add(c)
                    elif c in additive_codes:
                        current_additives.add(c)
                
                # Strip it from the line
                new_line = line.replace(f' {codes_str}"', '"')
                line = new_line
        
        # When closing an item, insert allergens/additives if any
        if line.strip() == '},' or line.strip() == '}':
            # Wait, an item ends when the top-level brace of that item closes.
            # To simplify, we can just look for the end of the item by checking if the next line is `  },` or `  }` for the top level array.
            if line.startswith('  },') or line.startswith('  }'):
                # We need to insert allergens and additives before this line
                if current_allergens:
                    arr_str = ", ".join([f'"{c}"' for c in sorted(list(current_allergens))])
                    out_lines.append(f'    "allergens": [{arr_str}],\n')
                if current_additives:
                    arr_str = ", ".join([f'"{c}"' for c in sorted(list(current_additives))])
                    out_lines.append(f'    "additives": [{arr_str}],\n')
                
                # Reset
                current_allergens = set()
                current_additives = set()
                in_item = False

    # Also clean up duplicate allergens/additives fields if we just added them, but they might already exist.
    # Actually if they exist, it's safer to let manual merge, but wait:
    # If the file already has "allergens": [ ... ], we might duplicate it.
    # We will just do a pass that removes existing empty or partial allergen/additives for this run to keep it simple, OR we just merge them.
    
    out_lines.append(line)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.writelines(out_lines)

print("Parsed allergens and additives from names.")
