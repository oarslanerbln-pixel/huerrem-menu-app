import json
import re

with open('C:/Users/oarsl/.gemini/antigravity-ide/brain/8868f513-cff5-4552-98bd-a9b1f2ad4258/.system_generated/steps/3196/content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's see if we can find Blue Lychee Mosquito and get some context around it
matches = re.finditer(r'.{0,100}Blue Lychee Mosquito.{0,100}', html)
for m in matches:
    print(m.group(0))
    
matches = re.finditer(r'.{0,100}Solero.{0,100}', html)
for m in matches:
    print(m.group(0))

