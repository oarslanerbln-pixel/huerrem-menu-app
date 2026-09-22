import sys, re
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The file currently has: export const menuData: MenuItem[] = [ ... ], \n // Quiz Questions \n export const quizQuestions = [ { ... }, { ... } ... ]
# We want to extract ALL { ... } blocks from the file.
# Then filter them into:
# 1. menu_blocks (those with category)
# 2. quiz_blocks (those with id: 'q1', 'q2', etc.)

blocks = []
depth = 0
current = []
in_string = False
string_char = None
escape_next = False
i = 0

while i < len(content):
    ch = content[i]
    if escape_next:
        escape_next = False
        current.append(ch)
    elif ch == '\\' and in_string:
        escape_next = True
        current.append(ch)
    elif ch in ('"', "'") and not in_string:
        in_string = True
        string_char = ch
        current.append(ch)
    elif ch == string_char and in_string:
        in_string = False
        string_char = None
        current.append(ch)
    elif not in_string:
        if ch == '{':
            if depth == 0:
                current = []
            depth += 1
            current.append(ch)
        elif ch == '}':
            depth -= 1
            current.append(ch)
            if depth == 0:
                blocks.append(''.join(current).strip())
                current = []
        else:
            if depth > 0:
                current.append(ch)
    else:
        current.append(ch)
    i += 1

print(f"Extracted {len(blocks)} blocks total.")

menu_blocks = []
quiz_blocks = []
allergen_dict = None
additive_dict = None

for b in blocks:
    if "category:" in b or "category :" in b:
        menu_blocks.append(b)
    elif "question:" in b or "question :" in b:
        quiz_blocks.append(b)
    elif "'A':" in b and "Getreide" in b:
        allergen_dict = b
    elif "'1':" in b and "Farbstoff" in b:
        additive_dict = b

print(f"Found {len(menu_blocks)} menu items, {len(quiz_blocks)} quiz items.")
if allergen_dict: print("Found allergenLegend")
if additive_dict: print("Found additiveLegend")

# Reconstruct
new_content = """import { Divide } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour' | 'spiele';

export interface MenuItem {
  id: string;
  name: string | {
    DE: string;
    EN?: string;
    TR?: string;
  };
  price: number;
  description?: string | {
    DE: string;
    EN?: string;
    TR?: string;
  };
  category: MenuCategory;
  subcategory?: string;
  section?: string;
  tags?: string[];
  imageUrl?: string;
  allergens?: string[];
  isSignature?: boolean;
}

export const menuData: MenuItem[] = [
  """ + ",\n  ".join(menu_blocks) + """
];

export const allergenLegend: Record<string, string> = """ + allergen_dict + """;

export const additiveLegend: Record<string, string> = """ + additive_dict + """;

// Quiz Questions mapped for tags
export const quizQuestions = [
  """ + ",\n  ".join(quiz_blocks) + """
];
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Successfully reconstructed menu.ts!")
