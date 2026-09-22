import re

# Premium Hookah / Shisha Unsplash photos
shisha_photos = [
    "https://images.unsplash.com/photo-1510816922405-1a80c9e6d0aa?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1572097560227-848e02d645e5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1527027581781-8b7762696e1b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602444318723-5e728469a47c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588667614088-7e44a49edcb1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1629813589718-2c700cbdd38b?auto=format&fit=crop&q=80&w=600",
]

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by blocks roughly matching items
    # Since we know the id structure, let's just do line by line.
    lines = content.split('\n')
    
    current_id = None
    shisha_index = 0
    
    for i, line in enumerate(lines):
        match_id = re.search(r"id:\s*'([^']+)'", line)
        if match_id:
            current_id = match_id.group(1)
            
        if current_id and current_id.startswith('s') and current_id[1:].isdigit():
            if 'imageUrl:' in line:
                # Replace with a hookah image
                img_url = shisha_photos[shisha_index % len(shisha_photos)]
                lines[i] = re.sub(r"imageUrl:\s*'.*?'", f"imageUrl: '{img_url}'", line)
                shisha_index += 1

    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
        
    print("Fixed Shisha Images successfully!")

if __name__ == '__main__':
    main()
