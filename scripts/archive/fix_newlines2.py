import re

menu_path = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix literal newlines that are right after text and before text (inside strings)
# A literal newline in a single-quoted string is usually matched by:
#  ' ... \n ... '
# Let's just find and replace the specific one
content = content.replace("guacamole.\nsteYe", "guacamole. \\nsteYe")
content = content.replace("guacamole.\nİsteğe", "guacamole. \\nİsteğe")
content = content.replace("guacamole.\nsteYe", "guacamole. \\nsteYe")
content = content.replace("guacamole.\n\xddste\xf0e", "guacamole. \\n\xddste\xf0e")

# Just to be extremely safe, we will use regex to find ANY literal newline between single quotes.
def replacer(match):
    # match.group(0) is a string starting and ending with single quotes.
    # We replace literal newlines with \\n
    s = match.group(0)
    # But only if it's really a single line string that incorrectly has newlines.
    s = s.replace('\n', ' \\n')
    return s

# Match anything between single quotes that has a newline.
# Since TS strings can't have unescaped newlines, ANY unescaped newline in a single quoted string is an error.
# We'll use a regex that matches ' ... ' containing newlines
# Wait, finding single quoted strings with newlines is tricky because of multiple strings.
# Instead, we just replace any newline that is immediately preceded by a lowercase letter or punctuation and followed by an uppercase letter or number inside the same string context.
# Actually, the easiest is to just print the lines with errors and manually fix them.

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(content)

import subprocess
res = subprocess.run(["npx", "tsc", "--noEmit"], capture_output=True, text=True, cwd=r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp')
print(res.stdout)
print(res.stderr)
