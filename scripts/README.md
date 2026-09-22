# Scripts Directory

Bu klasör Hürrem Menu projesi için geliştirilen veri işleme, çeviri ve menü düzenleme betiklerini içerir.

## Aktif Betikler

- **`analyze_menu_ts.py`**: `src/data/menu.ts` dosyasını analiz etmek ve yapısal kontrol yapmak için kullanılır.
- **`update_menu.py`**: Menü verilerinde genel güncellemeler ve manipülasyonlar yapmak için kullanılır.
- **`translate_strings.py`**: JSON formatında dışarı çıkarılan metinleri çevirmek veya güncel çevirileri projeye enjekte etmek için kullanılır.
- **`translation_cache.json` & `translation_map.json`**: Çeviri geçmişi ve haritalaması için tutulan cache dosyalarıdır.
- **`texts_to_translate.json`**: Çeviriye ihtiyaç duyan eksik veya yeni metinlerin toplandığı dosyadır.

## Arşiv (`archive/`)
Önceki migration işlemleri, tek seferlik scriptler, geçici düzeltmeler ve eski yedek betikler arşiv klasörüne taşınmıştır. İleride referans amaçlı incelenebilir ancak günlük iş akışında kullanılmazlar.
