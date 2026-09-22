import sys

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the premature closing bracket of menuData
# It is located just before "// Quiz Questions"
idx = content.find('];\n\n// Quiz Questio')
if idx != -1:
    content = content[:idx] + ',\n' + content[idx+4:]

# 2. Extract the quizQuestions definition
quiz_start = content.find('// Quiz Questions mapped for tags\nexport const quizQuestions = [')
if quiz_start != -1:
    # Let's find where the quiz questions end.
    # The quiz questions end right before ', \n  // --- ADDED FINGER FOOD ---'
    # Or just ', \n  // --- ADDED'
    ff_idx = content.find(',\n  // --- ADDED FINGER FOOD ---')
    if ff_idx == -1:
        ff_idx = content.find(',\n  // ---')
    
    if ff_idx != -1:
        quiz_text = content[quiz_start:ff_idx] + '\n];\n\n'
        # Remove quiz_text from its current location
        content = content[:quiz_start] + content[ff_idx+2:]
        
        # Append quiz_text at the end of the file, just before allergenLegend
        allergen_idx = content.find('export const allergenLegend')
        if allergen_idx != -1:
            content = content[:allergen_idx] + quiz_text + content[allergen_idx:]

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed menu.ts structure.")
