# Menü Karşılaştırma Raporu (Orjinal vs. Yeni Sistem)

Gönderdiğin ekran görüntülerini (orjinal sistemi) inceledim ve şu anki kodumuzdaki (`menu.ts`) verilerle detaylı bir karşılaştırma yaptım. Büyük oranda uyuşsak da bazı eksikler ve güncellenmesi gereken kısımlar tespit ettim. 

İşte farklılıklar ve eksikler:

### 1. Happy Hour (En Büyük Fark)
Orjinal sistemde Happy Hour kampanyaları ve saatleri tamamen farklı:
*   **Orjinal Sistem:** 
    *   **Shisha + Softdrink** (13,90 €) - *Pzt-Cum 14:00 - 19:00*
    *   **Pasta, Burger, Salat, Bowl's** (9,90 €) - *Pzt-Cum 16:00 - 19:00* (Beef & Broccoli Penne ve Beef Balance Bowl hariç)
*   **Bizim Sistem (`menu.ts`):** Şu an Kombi 1 (18,90€), Kombi 2 (19,90€) ve Kombi 3 (21,90€) şeklinde *10:00 - 15:00* saatleri arası bambaşka kampanyalar kayıtlı. 

### 2. Görselsiz Olduğu İçin Unutulan Kokteyller
Bazı kokteyllerin klasörde görseli olmadığı için `menu.ts`'e hiç eklenmediğini fark ettim. Orjinal menüde bunlar metin olarak (görselsiz) bulunuyor:
*   **Signature Cocktails:**
    *   `Butterfly Pea Flower Tea` (8,90 €)
    *   `Beautiful Dream` (9,40 €)
*   **High-Class Cocktails:**
    *   `Dreamy Breeze (Bubble-Tea)` (10,90 €)

### 3. Alerjen ve İçerik Bildirimleri (Üst Simgeler)
Orjinal sistemde ürün isimlerinin yanında küçük alerjen kodları var (Örn: `Coconut Kiss ⁹`, `Solero ᶜ`, `Beautiful Dream ⁶`, `Violet ᵃ, ᶜ`). 
*   **Bizim Sistem:** İsimleri temiz tutmak adına bu kodları ürün başlıklarına henüz eklemedik. 

### 4. Birebir Uyuşanlar ✅
*   `Mineralwasser` fiyatlandırması (0,2l: 3,20 € / 0,7l: 8,20 €) birebir aynı.
*   `Neuer Kopf` (10,00 €) ve açıklaması birebir aynı.
*   Görseli olan tüm kokteyllerin (Dragonfruit Sunset, Fancy Love, Violet vs.) fiyatları birebir aynı. Sadece "Mosquito" için "mit Black28 10,90 €" opsiyonunu biz isim yerine açıklamaya yazdık, ki bu daha okunaklı bir yöntem.

---

### Ne Yapalım?
Sistemimizin orjinal mekanın menüsüyle %100 aynı olması için:
1. Eski "Kombi 1-2-3" Happy Hour verilerini silip, ekran görüntüsündeki **gerçek Happy Hour** verilerini ekleyebilirim.
2. Görseli olmayan **3 eksik kokteyli** menüye entegre edebilirim.
3. İstersen alerjen kodlarını (`⁹`, `ᶜ`) isimlerin yanına ekleyebilirim (veya tasarımı bozmaması için açıklamalarında bırakabiliriz).

Bu 3 güncellemeyi hemen koda işleyeyim mi?
