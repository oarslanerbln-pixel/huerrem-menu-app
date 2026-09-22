import re
import json
import time
from deep_translator import GoogleTranslator

def escape_str(s):
    if not s:
        return ""
    return s.replace("'", "\\'")

def translate_missing():
    with open("src/data/menu.ts", "r", encoding="utf-8") as f:
        content = f.read()

    translators = {
        "FR": GoogleTranslator(source='de', target='fr'),
        "ES": GoogleTranslator(source='de', target='es'),
        "RU": GoogleTranslator(source='de', target='ru')
    }

    cache_file = "scripts/translation_cache.json"
    cache = {}
    try:
        with open(cache_file, "r", encoding="utf-8") as f:
            cache = json.load(f)
    except FileNotFoundError:
        pass

    def get_translation(text, lang):
        if not text: return ""
        if text not in cache: cache[text] = {}
        if lang in cache[text]: return cache[text][lang]
        
        try:
            print(f"Translating to {lang}: {text[:20]}...", flush=True)
            res = translators[lang].translate(text)
            cache[text][lang] = res
            time.sleep(0.1)  # avoid rate limits
            
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)
                
            return res
        except Exception as e:
            print(f"Error translating to {lang}: {e}", flush=True)
            return text

    def replacer(match):
        prefix = match.group(1) # 'name' or 'description'
        inner = match.group(2)  # contents of { ... }
        
        de_match = re.search(r"DE:\s*'((?:[^'\\]|\\.)*)'", inner)
        en_match = re.search(r"EN:\s*'((?:[^'\\]|\\.)*)'", inner)
        tr_match = re.search(r"TR:\s*'((?:[^'\\]|\\.)*)'", inner)
        fr_match = re.search(r"FR:\s*'((?:[^'\\]|\\.)*)'", inner)
        es_match = re.search(r"ES:\s*'((?:[^'\\]|\\.)*)'", inner)
        ru_match = re.search(r"RU:\s*'((?:[^'\\]|\\.)*)'", inner)
        
        if not de_match:
            return match.group(0)
            
        de_val = de_match.group(1)
        en_val = en_match.group(1) if en_match else ""
        tr_val = tr_match.group(1) if tr_match else ""
        fr_val = fr_match.group(1) if fr_match else ""
        es_val = es_match.group(1) if es_match else ""
        ru_val = ru_match.group(1) if ru_match else ""
        
        if not fr_val: fr_val = get_translation(de_val, "FR")
        if not es_val: es_val = get_translation(de_val, "ES")
        if not ru_val: ru_val = get_translation(de_val, "RU")
        
        new_inner = f" DE: '{de_val}'"
        if en_val: new_inner += f", EN: '{en_val}'"
        if tr_val: new_inner += f", TR: '{tr_val}'"
        if fr_val: new_inner += f", FR: '{escape_str(fr_val)}'"
        if es_val: new_inner += f", ES: '{escape_str(es_val)}'"
        if ru_val: new_inner += f", RU: '{escape_str(ru_val)}'"
        new_inner += " "
        
        return f"{prefix}: {{{new_inner}}}"

    print("Starting replacement...", flush=True)
    new_content = re.sub(r"(name|description):\s*\{([^}]*)\}", replacer, content)

    with open("src/data/menu.ts", "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Translation complete!", flush=True)

if __name__ == "__main__":
    translate_missing()
