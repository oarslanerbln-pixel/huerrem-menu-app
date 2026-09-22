with open('src/components/UI/MenuItemCard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The specific onClick block we want to remove is attached to the image container:
block_to_remove = """              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                if (navigator.vibrate) navigator.vibrate(15);
              }}"""

content = content.replace(block_to_remove, "")

with open('src/components/UI/MenuItemCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed existing image onClicks!")
