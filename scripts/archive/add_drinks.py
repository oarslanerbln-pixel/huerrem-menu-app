import re

new_items = """
  // --- New Softdrinks ---
  {
    id: 'd_sd_moloko',
    name: { DE: 'Moloko', EN: 'Moloko', TR: 'Moloko' },
    price: 4.60,
    description: { 
      DE: '0,25l - Für alle Sorten bitte unser Personal fragen.\\nZusatzstoffe: (1) mit Farbstoff, (2) mit Konservierungsstoffen, (3) mit Antioxidationsmitteln, (13) koffeinhaltig.', 
      EN: '0.25l - Please ask our staff for all varieties.\\nAdditives: (1) with colorant, (2) with preservatives, (3) with antioxidants, (13) caffeinated.', 
      TR: '0,25l - Tüm çeşitler için lütfen personelimize danışın.\\nKatkı maddeleri: (1) renklendirici, (2) koruyucu, (3) antioksidan, (13) kafein içerir.' 
    },
    category: 'drinks',
    subcategory: 'Softdrinks',
  },
  {
    id: 'd_sd_redbull',
    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },
    price: 4.90,
    description: { 
      DE: 'Erfrischende Vielfalt mit dem vollen Energy-Kick – ob klassisch, zuckerfrei oder in fruchtigen Editionen wie Blaubeere, Kokos-Blaubeere, Kiwi-Apfel, Wassermelone, Grapefruit oder Fuji-Apfel. Für alle Sorten bitte unser Personal fragen.', 
      EN: 'Refreshing variety with the full energy kick – whether classic, sugar-free or in fruity editions like blueberry, coconut-blueberry, kiwi-apple, watermelon, grapefruit or Fuji-apple. Please ask our staff for all varieties.', 
      TR: 'Tam enerji veren ferahlatıcı çeşitlilik – klasik, şekersiz veya yaban mersini, hindistan cevizi-yaban mersini, kivi-elma, karpuz, greyfurt veya fuji-elma gibi meyveli çeşitleriyle. Tüm çeşitler için lütfen personelimize danışın.' 
    },
    category: 'drinks',
    subcategory: 'Softdrinks',
  },
  {
    id: 'd_sd_28black',
    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },
    price: 4.90,
    description: { 
      DE: 'Fruchtig, erfrischend und ohne Taurin – erhältlich in Sorten wie Acai, Sour Mango-Kiwi oder Sour Cherry. Für alle Sorten bitte unser Personal fragen.', 
      EN: 'Fruity, refreshing and without taurine – available in flavors like Acai, Sour Mango-Kiwi or Sour Cherry. Please ask our staff for all varieties.', 
      TR: 'Meyvemsi, ferahlatıcı ve taurinsiz – Acai, Ekşi Mango-Kivi veya Ekşi Vişne gibi çeşitleri mevcuttur. Tüm çeşitler için lütfen personelimize danışın.' 
    },
    category: 'drinks',
    subcategory: 'Softdrinks',
  },

  // --- New Teas ---
  {
    id: 'd_tea_cay',
    name: { DE: 'Türkischer Cay groß', EN: 'Large Turkish Tea', TR: 'Büyük Türk Çayı' },
    price: 3.20,
    description: { 
      DE: 'Klassischer türkischer Schwarztee, kräftig im Geschmack und traditionell serviert.', 
      EN: 'Classic Turkish black tea, strong in taste and traditionally served.', 
      TR: 'Klasik Türk siyah çayı, yoğun lezzetli ve geleneksel sunumlu.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1576092762791-dd9e2220d0f4?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['classic', 'intense']
  },
  {
    id: 'd_tea_kamille',
    name: { DE: 'BIO Kamille Tee mit Honig', EN: 'BIO Chamomile Tea with Honey', TR: 'Ballı BIO Papatya Çayı' },
    price: 4.50,
    description: { 
      DE: 'Milder Kräutertee mit beruhigender Wirkung und angenehmem, blumigem Aroma.', 
      EN: 'Mild herbal tea with a calming effect and pleasant, floral aroma.', 
      TR: 'Sakinleştirici etkisi ve hoş çiçeksi aromasıyla hafif bitki çayı.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'floral', 'sweet']
  },
  {
    id: 'd_tea_salbei',
    name: { DE: 'BIO Salbei Tee mit Honig', EN: 'BIO Sage Tea with Honey', TR: 'Ballı BIO Adaçayı' },
    price: 4.50,
    description: { 
      DE: 'Ein wohltuender Tee aus aromatischem Salbei, ideal für kalte Tage.', 
      EN: 'A soothing tea made from aromatic sage, ideal for cold days.', 
      TR: 'Aromatik adaçayından yapılan rahatlatıcı bir çay, soğuk günler için ideal.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'fresh']
  },
  {
    id: 'd_tea_sencha',
    name: { DE: 'BIO Japanischer Sencha Tee mit Honig', EN: 'BIO Japanese Sencha Tea with Honey', TR: 'Ballı BIO Japon Sencha Çayı' },
    price: 4.50,
    description: { 
      DE: 'Ein fein-herber Grüntee mit zarten Noten, direkt aus Japan.', 
      EN: 'A fine-tart green tea with delicate notes, directly from Japan.', 
      TR: 'Doğrudan Japonya\\'dan, zarif notalara sahip hafif mayhoş yeşil çay.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1627490847250-934ab3bda2eb?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'fresh']
  },
  {
    id: 'd_tea_hotbeauty',
    name: { DE: 'BIO Hot Beauty Tee mit Honig', EN: 'BIO Hot Beauty Tea with Honey', TR: 'Ballı BIO Hot Beauty Çayı' },
    price: 5.20,
    description: { 
      DE: 'Ein luxuriöser Tee aus Rosenknospen, getrockneten Longan-Früchten und roten Datteln – zart und exotisch.', 
      EN: 'A luxurious tea made from rose buds, dried longan fruits and red dates – delicate and exotic.', 
      TR: 'Gül tomurcukları, kurutulmuş longan meyveleri ve kırmızı hurmalardan yapılan lüks çay – zarif ve egzotik.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'floral', 'exotic']
  },
  {
    id: 'd_tea_fourseason',
    name: { DE: 'BIO Four Season Tee mit Honig', EN: 'BIO Four Season Tea with Honey', TR: 'Ballı BIO Four Season Çayı' },
    price: 5.20,
    description: { 
      DE: 'Eine würzige Mischung aus getrockneter Feige, Datteln, Nelke und Zitrone – perfekt für Genießer.', 
      EN: 'A spicy blend of dried fig, dates, cloves and lemon – perfect for connoisseurs.', 
      TR: 'Kuru incir, hurma, karanfil ve limonun baharatlı bir karışımı – gurmeler için mükemmel.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1596484552993-8fbc4c986c75?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'spicy']
  },
  {
    id: 'd_tea_bluedream',
    name: { DE: 'Blue Dream Tee mit Honig', EN: 'Blue Dream Tea with Honey', TR: 'Ballı Blue Dream Çayı' },
    price: 5.20,
    description: { 
      DE: 'Ein süßer Früchtetraum aus Blaubeeren, Honig und Süßholz, der sowohl fruchtig als auch wohltuend ist.', 
      EN: 'A sweet fruit dream made from blueberries, honey and licorice, which is both fruity and soothing.', 
      TR: 'Yaban mersini, bal ve meyankökünden oluşan, hem meyvemsi hem de rahatlatıcı tatlı bir meyve rüyası.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1620619572115-38fc7183e8fa?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['sweet', 'fruity']
  },
  {
    id: 'd_tea_mango',
    name: { DE: 'Sweet Mango Tee mit Honig', EN: 'Sweet Mango Tea with Honey', TR: 'Ballı Sweet Mango Çayı' },
    price: 5.20,
    description: { 
      DE: 'Tropische Mangostücke, verfeinert mit Honig, Minze und einem Hauch Mangosaft – für einen exotischen Genussmoment.', 
      EN: 'Tropical mango pieces, refined with honey, mint and a hint of mango juice – for an exotic moment of pleasure.', 
      TR: 'Bal, nane ve bir miktar mango suyu ile tatlandırılmış tropikal mango parçaları – egzotik bir keyif anı için.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['sweet', 'fruity', 'exotic']
  },
  {
    id: 'd_tea_apple',
    name: { DE: 'Orient Apple Tee mit Honig', EN: 'Orient Apple Tea with Honey', TR: 'Ballı Orient Apple Çayı' },
    price: 5.20,
    description: { 
      DE: 'Ein warmer Apfeltee mit Noten von Zimt, Nelken und einem Hauch Agavensirup – orientalischer Flair in jeder Tasse.', 
      EN: 'A warm apple tea with notes of cinnamon, cloves and a hint of agave syrup – oriental flair in every cup.', 
      TR: 'Tarçın, karanfil ve bir dokunuş agav şurubu notalarıyla sıcak bir elma çayı – her fincanda oryantal bir esinti.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1577859714523-5e925c48b26f?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['sweet', 'fruity', 'spicy']
  },
  {
    id: 'd_tea_blossom',
    name: { DE: 'BIO Blossom Tee mit Honig', EN: 'BIO Blossom Tea with Honey', TR: 'Ballı BIO Blossom Çayı' },
    price: 5.20,
    description: { 
      DE: 'Eine blumige Mischung aus Rosenblüten, Kirschblüten, Kornblumenblüten, Orangenblüten und Lavendel – ein wahres Blütenmeer.', 
      EN: 'A floral mixture of rose petals, cherry blossoms, cornflower petals, orange blossoms and lavender – a true sea of flowers.', 
      TR: 'Gül yaprakları, kiraz çiçekleri, peygamber çiçeği yaprakları, portakal çiçekleri ve lavantanın çiçeksi karışımı – adeta bir çiçek denizi.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Teas',
    tags: ['bio', 'floral', 'sweet']
  },

  // --- New Coffees ---
  {
    id: 'd_coffee_espresso',
    name: { DE: 'Espresso', EN: 'Espresso', TR: 'Espresso' },
    price: 2.80,
    description: { 
      DE: 'Ein kräftiger, italienischer Klassiker mit intensivem Aroma.', 
      EN: 'A strong, Italian classic with an intense aroma.', 
      TR: 'Yoğun aromalı, güçlü bir İtalyan klasiği.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['intense', 'classic']
  },
  {
    id: 'd_coffee_crema',
    name: { DE: 'Cafe Crema', EN: 'Cafe Crema', TR: 'Cafe Crema' },
    price: 3.40,
    description: { 
      DE: 'Sanfter Kaffeegenuss mit einer cremigen Note.', 
      EN: 'Gentle coffee enjoyment with a creamy note.', 
      TR: 'Kremsi bir dokunuşla yumuşak kahve keyfi.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['creamy', 'classic']
  },
  {
    id: 'd_coffee_latte',
    name: { DE: 'Latte Macchiato', EN: 'Latte Macchiato', TR: 'Latte Macchiato' },
    price: 4.60,
    description: { 
      DE: 'Ein eleganter Genuss aus geschichtetem Espresso, Milch und Milchschaum', 
      EN: 'An elegant treat of layered espresso, milk and milk foam', 
      TR: 'Katmanlı espresso, süt ve süt köpüğünden oluşan zarif bir lezzet' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['creamy', 'classic']
  },
  {
    id: 'd_coffee_mokka',
    name: { DE: 'Türkischer Mokka', EN: 'Turkish Mokka', TR: 'Türk Kahvesi' },
    price: 3.60,
    description: { 
      DE: 'Kräftiger, aromatischer Kaffee nach traditioneller türkischer Art zubereitet.', 
      EN: 'Strong, aromatic coffee prepared in the traditional Turkish way.', 
      TR: 'Geleneksel Türk usulü hazırlanan sert, aromatik kahve.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1544253303-c4dbd8ebfcba?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['intense', 'classic']
  }
"""

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Append before the last ];
match = re.search(r'\];\s*\n*// Quiz Questions', content)
if match:
    # insert before match
    insert_pos = match.start()
    # verify there's a comma before ] if needed. The last item is k5 without a comma.
    # so we need to add a comma before inserting.
    
    # Let's find the last } before insert_pos
    last_brace = content.rfind('}', 0, insert_pos)
    new_content = content[:last_brace+1] + ',' + new_items + content[last_brace+1:]
    
    with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added new items successfully.")
else:
    print("Could not find the insertion point.")
