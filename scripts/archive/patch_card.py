import re

with open('src/components/UI/MenuItemCard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add onClick to motion.article
article_str = "    <motion.article"
replacement = """    <motion.article
      onClick={(e) => {
        // e.stopPropagation(); // Keep propagation if it breaks other things, but usually for card clicks we don't need it on the root
        setIsExpanded(true);
        if (navigator.vibrate) navigator.vibrate(15);
      }}"""
      
# Only replace the first occurrence (which is the root article)
content = content.replace(article_str, replacement, 1)

# 2. Remove old onClicks. The easiest is to use a regex that matches the block
# We know they look like:
'''
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                if (navigator.vibrate) navigator.vibrate(15);
              }}
'''

pattern = r'\s*onClick=\{\(e\) => \{\s*e\.stopPropagation\(\);\s*setIsExpanded\(true\);\s*if \(navigator\.vibrate\) navigator\.vibrate\(15\);\s*\}\}'
content = re.sub(pattern, '', content)

with open('src/components/UI/MenuItemCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched MenuItemCard.tsx successfully!")
