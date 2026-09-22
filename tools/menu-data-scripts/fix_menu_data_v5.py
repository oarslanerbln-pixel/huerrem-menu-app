import sys

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# The mistake was appending new items inside quizQuestions.
# I will find "id": "c_butterfly"
idx_butterfly = content.find('{\n    "id": "c_butterfly"')
if idx_butterfly == -1:
    idx_butterfly = content.find('  {\n    "id": "c_butterfly"')

if idx_butterfly != -1:
    # Find the closing ]; of quizQuestions, which is after t_linden
    idx_end_bracket = content.find('];', idx_butterfly)
    
    # Extract the wrongly inserted string
    # We want to remove from the comma before butterfly up to the end bracket, but keep the end bracket for quizQuestions
    # Actually my previous script did: pre_text[:last_bracket] + ',' + new_items + '\n];'
    # So I just need to find the comma before butterfly and remove up to ];
    
    # Wait, my script did: pre_text[:last_bracket] + ',' + new_items + '\n];'
    # Meaning it replaced ]; with , new_items ];
    # So to revert quizQuestions, I just need to find the comma, remove new_items, and put back ];
    
    # Let's locate the comma:
    idx_comma = content.rfind(',', 0, idx_butterfly)
    
    wrongly_inserted = content[idx_comma:idx_end_bracket]
    
    # Clean up quizQuestions
    content = content[:idx_comma] + '\n];' + content[idx_end_bracket+2:]
    
    # Now let's extract new_items
    new_items_str = wrongly_inserted[1:] # remove comma
    
    # Now find the REAL end of menuData
    # menuData ends right before export const quizQuestions
    idx_quiz = content.find('export const quizQuestions')
    if idx_quiz != -1:
        # Find the ]; before idx_quiz
        idx_menu_end = content.rfind('];', 0, idx_quiz)
        if idx_menu_end != -1:
            content = content[:idx_menu_end] + ',' + new_items_str + '\n];' + content[idx_menu_end+2:]
            with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
                f.write(content)
            print("Fixed menu.ts")
        else:
            print("Could not find end of menuData")
    else:
        print("Could not find quizQuestions")
else:
    print("Could not find c_butterfly")
