import os
import re

directories = ['src', 'public']
extensions = ['.tsx', '.ts', '.css', '.html']
prefix = '/wp-content/plugins/huerrem-premium-menu/app'

for root_dir in directories:
    for dirpath, _, filenames in os.walk(f'../{root_dir}'):
        for filename in filenames:
            if any(filename.endswith(ext) for ext in extensions):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace /images/ and /models/
                # We only replace if it's not already prefixed
                new_content = re.sub(r"(?<!/app)(/images/)", f"{prefix}/images/", content)
                new_content = re.sub(r"(?<!/app)(/models/)", f"{prefix}/models/", new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
