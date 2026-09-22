import re

with open('src/i18n/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_keys = {
    'TR': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Kendi Kokteylini Yarat (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Kendi Nargileni Yarat (21.90€)',
        'labor_juices_title': 'Säfte (Meyve Suları)',
        'labor_max_3_selection': 'Maksimum 3 seçim',
        'labor_max_2_selection': 'Maksimum 2 seçim',
        'labor_syrups_title': 'Sirup & Extras',
        'labor_cream_title': 'Krema (Sahne)',
        'labor_with_cream': 'Mit Sahne',
        'labor_without_cream': 'Ohne Sahne',
        'labor_flavor_title': 'Aromalar',
        'labor_continue': 'Devam',
        'labor_final_step': 'Son Aşama',
        'labor_name_placeholder': "Örn: Sultan's Dream..."
    },
    'EN': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Create Your Cocktail (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Create Your Hookah (21.90€)',
        'labor_juices_title': 'Säfte (Juices)',
        'labor_max_3_selection': 'Max 3 choices',
        'labor_max_2_selection': 'Max 2 choices',
        'labor_syrups_title': 'Syrups & Extras',
        'labor_cream_title': 'Cream (Sahne)',
        'labor_with_cream': 'With Cream',
        'labor_without_cream': 'Without Cream',
        'labor_flavor_title': 'Flavors',
        'labor_continue': 'Continue',
        'labor_final_step': 'Final Step',
        'labor_name_placeholder': "E.g.: Sultan's Dream..."
    },
    'DE': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Kreiere deinen Cocktail (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Kreiere deine Shisha (21.90€)',
        'labor_juices_title': 'Säfte',
        'labor_max_3_selection': 'Maximal 3 Auswahl',
        'labor_max_2_selection': 'Maximal 2 Auswahl',
        'labor_syrups_title': 'Sirup & Extras',
        'labor_cream_title': 'Sahne',
        'labor_with_cream': 'Mit Sahne',
        'labor_without_cream': 'Ohne Sahne',
        'labor_flavor_title': 'Aromen',
        'labor_continue': 'Weiter',
        'labor_final_step': 'Letzter Schritt',
        'labor_name_placeholder': "Z.B.: Sultan's Dream..."
    },
    'ES': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Crea Tu Cóctel (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Crea Tu Cachimba (21.90€)',
        'labor_juices_title': 'Säfte (Zumos)',
        'labor_max_3_selection': 'Máx 3 opciones',
        'labor_max_2_selection': 'Máx 2 opciones',
        'labor_syrups_title': 'Jarabes y Extras',
        'labor_cream_title': 'Crema (Sahne)',
        'labor_with_cream': 'Con Crema',
        'labor_without_cream': 'Sin Crema',
        'labor_flavor_title': 'Sabores',
        'labor_continue': 'Continuar',
        'labor_final_step': 'Último Paso',
        'labor_name_placeholder': "Ej: Sultan's Dream..."
    },
    'FR': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Créez Votre Cocktail (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Créez Votre Chicha (21.90€)',
        'labor_juices_title': 'Säfte (Jus)',
        'labor_max_3_selection': 'Max 3 choix',
        'labor_max_2_selection': 'Max 2 choix',
        'labor_syrups_title': 'Sirops & Extras',
        'labor_cream_title': 'Crème (Sahne)',
        'labor_with_cream': 'Avec Crème',
        'labor_without_cream': 'Sans Crème',
        'labor_flavor_title': 'Saveurs',
        'labor_continue': 'Continuer',
        'labor_final_step': 'Dernière Étape',
        'labor_name_placeholder': "Ex : Sultan's Dream..."
    },
    'RU': {
        'labor_cocktail_title': 'Labor Eigene Mischung',
        'labor_cocktail_desc': 'Создай свой коктейль (10.90€)',
        'labor_hookah_title': 'Spezial LED Pfeife',
        'labor_hookah_desc': 'Создай свой кальян (21.90€)',
        'labor_juices_title': 'Säfte (Соки)',
        'labor_max_3_selection': 'Максимум 3',
        'labor_max_2_selection': 'Максимум 2',
        'labor_syrups_title': 'Сиропы и Экстра',
        'labor_cream_title': 'Сливки (Sahne)',
        'labor_with_cream': 'Со сливками',
        'labor_without_cream': 'Без сливок',
        'labor_flavor_title': 'Вкусы',
        'labor_continue': 'Продолжить',
        'labor_final_step': 'Последний шаг',
        'labor_name_placeholder': "Например: Sultan's Dream..."
    }
}

for lang, keys in new_keys.items():
    last_key_match = re.search(r"(serviceRequestBill: '[^']+')(,\s*\n\s*},?)", content)
    
    lines_to_add = ",\n" + "\n".join([f"    {k}: '{v.replace('`', '').replace(chr(39), chr(92)+chr(39))}'" for k, v in keys.items()])
    
    pattern = re.compile(rf"  {lang}: \{{(.*?)(serviceRequestBill: '[^']+')(,\s*\n\s*\}})", re.DOTALL)
    
    def replacer(match):
        return f"  {lang}: {{{match.group(1)}{match.group(2)}{lines_to_add}{match.group(3)}"
    
    content = pattern.sub(replacer, content)

with open('src/i18n/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
