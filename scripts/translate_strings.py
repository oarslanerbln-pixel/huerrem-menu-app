import json
import os
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from deep_translator import GoogleTranslator

lock = threading.Lock()

def translate_texts():
    with open("scripts/texts_to_translate.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    all_texts = list(set(data["names"] + data["descriptions"]))
    
    translation_map = {}
    if os.path.exists("scripts/translation_map.json"):
        try:
            with open("scripts/translation_map.json", "r", encoding="utf-8") as f:
                translation_map = json.load(f)
        except:
            pass

    print(f"Total texts to translate: {len(all_texts)}", flush=True)

    def process_text(text):
        if not text:
            return None
        
        with lock:
            if text in translation_map and len(translation_map[text]) == 3:
                return None
            if text not in translation_map:
                translation_map[text] = {}

        # create new translators per thread to be safe
        translators = {
            "FR": GoogleTranslator(source='de', target='fr'),
            "ES": GoogleTranslator(source='de', target='es'),
            "RU": GoogleTranslator(source='de', target='ru')
        }

        local_results = {}
        for lang, translator in translators.items():
            with lock:
                if lang in translation_map[text]:
                    continue
            try:
                translated = translator.translate(text)
                local_results[lang] = translated
            except Exception as e:
                local_results[lang] = text
        
        with lock:
            for lang, trans in local_results.items():
                translation_map[text][lang] = trans
            
            # save
            with open("scripts/translation_map.json", "w", encoding="utf-8") as f:
                json.dump(translation_map, f, indent=2, ensure_ascii=False)
                
        return text

    count = 0
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(process_text, text): text for text in all_texts}
        for future in as_completed(futures):
            res = future.result()
            if res:
                count += 1
                if count % 10 == 0:
                    print(f"Translated {count} new items", flush=True)

    print("Finished translation.", flush=True)

if __name__ == "__main__":
    translate_texts()
