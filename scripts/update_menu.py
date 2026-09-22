import re
import json

def update_menu():
    with open("scripts/translation_map.json", "r", encoding="utf-8") as f:
        translations = json.load(f)

    with open("src/data/menu.ts", "r", encoding="utf-8") as f:
        content = f.read()

    def escape_str(s):
        if not s:
            return ""
        return s.replace("'", "\\'")

    def replacer(match):
        prefix = match.group(1) # 'name' or 'description'
        inner = match.group(2)  # the contents of { ... }
        
        # Extract DE, EN, TR strings robustly
        de_match = re.search(r"DE:\s*'((?:[^'\\]|\\.)*)'", inner)
        en_match = re.search(r"EN:\s*'((?:[^'\\]|\\.)*)'", inner)
        tr_match = re.search(r"TR:\s*'((?:[^'\\]|\\.)*)'", inner)
        
        if not de_match:
            return match.group(0)
            
        de_val = de_match.group(1)
        en_val = en_match.group(1) if en_match else ""
        tr_val = tr_match.group(1) if tr_match else ""
        
        # Revert escaped quotes to find the original text in translation map
        # Wait, translation map keys might have the escaped quotes? 
        # No, texts_to_translate.json extracted them directly from the TS file with regex.
        # Actually my texts_to_translate.json used `(.*?)`, so it had backslashes.
        # But anyway, let's just lookup with de_val.
        trans = translations.get(de_val, {})
        
        fr_val = trans.get("FR", "")
        es_val = trans.get("ES", "")
        ru_val = trans.get("RU", "")
        
        if not fr_val:
            fr_match = re.search(r"FR:\s*'((?:[^'\\]|\\.)*)'", inner)
            fr_val = fr_match.group(1) if fr_match else ""
            
        if not es_val:
            es_match = re.search(r"ES:\s*'((?:[^'\\]|\\.)*)'", inner)
            es_val = es_match.group(1) if es_match else ""
            
        if not ru_val:
            ru_match = re.search(r"RU:\s*'((?:[^'\\]|\\.)*)'", inner)
            ru_val = ru_match.group(1) if ru_match else ""
            
        new_inner = f" DE: '{de_val}'"
        if en_val: new_inner += f", EN: '{en_val}'"
        if tr_val: new_inner += f", TR: '{tr_val}'"
        if fr_val: new_inner += f", FR: '{escape_str(fr_val)}'"
        if es_val: new_inner += f", ES: '{escape_str(es_val)}'"
        if ru_val: new_inner += f", RU: '{escape_str(ru_val)}'"
        new_inner += " "
        
        return f"{prefix}: {{{new_inner}}}"

    # Match name: { ... } or description: { ... }
    new_content = re.sub(r"(name|description):\s*\{([^}]*)\}", replacer, content)

    with open("src/data/menu.ts", "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    update_menu()
