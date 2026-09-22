export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour' | 'spiele';

export interface MenuItemVariation {
  label: string | Record<string, string>;
  price: number;
}

export interface MenuItem {
  group?: Record<string, string>;
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;
  variations?: MenuItemVariation[];
  tags?: string[];
  allergens?: string[];
  additives?: string[];
  includes?: string[];
  badge?: string | Record<string, string>;
  intensity?: 1 | 2 | 3 | 4 | 5;
  arModelUrl?: string;
  arIosModelUrl?: string;
  themeColor?: string;
  flavorProfile?: {
    sweetness: number;
    sourness: number;
    freshness: number;
    strength: number;
  };
}


export const menuData: MenuItem[] = [
  {
    "id": "s1",
    "name": {
      "DE": "Doppel Apfel",
      "EN": "Double Apple",
      "TR": "Çift Elma",
      "FR": "Pomme double",
      "ES": "manzana doble",
      "RU": "Двойное яблоко"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein klassischer Favorit! Der intensive Geschmack von saftigen roten und grünen Äpfeln mit einer feinen Anis-Note. Perfekt für Liebhaber traditioneller Shisha Aromen.",
      "EN": "A classic favorite! The intense taste of juicy red and green apples with a fine anise note. Perfect for lovers of traditional shisha flavors.",
      "TR": "Klasik bir favori! Sulu kırmızı ve yeşil elmaların ince bir anason notasıyla yoğun tadı. Geleneksel nargile aroması sevenler için mükemmel.",
      "FR": "Un classique préféré ! Le goût intense des pommes rouges et vertes juteuses avec une subtile note d'anis. Parfait pour les amateurs de saveurs de chicha traditionnelles.",
      "ES": "¡Un clásico favorito! El sabor intenso de jugosas manzanas rojas y verdes con una sutil nota de anís. Perfecta para los amantes de los sabores tradicionales de shisha.",
      "RU": "Классический фаворит! Интенсивный вкус сочных красных и зеленых яблок с тонкой ноткой аниса. Идеально подходит для любителей традиционных вкусов кальяна."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__doppel_apfel.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "classic",
      "intense"
    ],
    "intensity": 5
  },
  {
    "id": "s2",
    "name": {
      "DE": "Apfel Minze",
      "EN": "Apple Mint",
      "TR": "Elma Nane",
      "FR": "Pomme menthe",
      "ES": "menta de manzana",
      "RU": "Яблоко и мята"
    },
    "price": 16.9,
    "description": {
      "DE": "Fruchtiger Apfel trifft auf erfrischende Minze - eine perfekte Kombination für einen belebenden Rauchgenuss.",
      "EN": "Fruity apple meets refreshing mint - a perfect combination for an invigorating smoking experience.",
      "TR": "Meyvemsi elma ferahlatıcı nane ile buluşuyor - canlandırıcı bir nargile keyfi için mükemmel bir kombinasyon.",
      "FR": "La pomme fruitée rencontre la menthe rafraîchissante - une combinaison parfaite pour une expérience de fumage revigorante.",
      "ES": "La fruta afrutada de la manzana se combina con la refrescante menta: una combinación perfecta para una experiencia estimulante al fumar.",
      "RU": "Фруктовое яблоко сочетается с освежающей мятой — идеальное сочетание для бодрящего курения."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__apfel_minze.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "classic",
      "fresh",
      "fruity"
    ],
    "intensity": 4
  },
  {
    "id": "s3",
    "name": {
      "DE": "Traube Minze",
      "EN": "Grape Mint",
      "TR": "Üzüm Nane",
      "FR": "Menthe raisin",
      "ES": "Menta de uva",
      "RU": "Виноградная мята"
    },
    "price": 16.9,
    "description": {
      "DE": "Die Süße von saftigen Trauben vereint mit kühler Frische der Minze, ein absolutes Highlight für jeden Shisha-Liebhaber.",
      "EN": "The sweetness of juicy grapes combined with the cool freshness of mint, an absolute highlight for every shisha lover.",
      "TR": "Sulu üzümlerin tatlılığı, nanenin serinletici ferahlığıyla birleşiyor, her nargile sever için kesinlikle denenmesi gereken bir lezzet.",
      "FR": "La douceur des raisins juteux combinée à la fraîcheur fraîche de la menthe, un point fort absolu pour tout amateur de chicha.",
      "ES": "La dulzura de las jugosas uvas combinada con el frescor de la menta es un verdadero placer para todos los amantes de la shisha.",
      "RU": "Сладость сочного винограда в сочетании с прохладной свежестью мяты — настоящий подарок для каждого любителя кальяна."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__traube_minze.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "classic",
      "fresh",
      "sweet"
    ],
    "intensity": 3
  },
  {
    "id": "s4",
    "name": {
      "DE": "Black Nana",
      "EN": "Black Nana",
      "TR": "Black Nana",
      "FR": "Nana noire",
      "ES": "abuela negra",
      "RU": "Черная Нана"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein starker, intensiver Geschmack von schwarzen Trauben, kombiniert mit kühler Minz-Note. Perfekt für Liebhaber kräftiger und kühler Aromen.",
      "EN": "A strong, intense taste of black grapes, combined with a cool mint note. Perfect for lovers of strong and cool flavors.",
      "TR": "Siyah üzümlerin ferahlatıcı nane notasıyla harmanlanmış güçlü ve yoğun tadı. Keskin ve serinletici aroma sevenler için ideal.",
      "FR": "Un goût fort et intense de raisin noir associé à des notes de menthe fraîche. Parfait pour les amateurs de saveurs fortes et fraîches.",
      "ES": "Un sabor fuerte e intenso a uvas negras combinado con notas frescas de menta. Perfecto para los amantes de los sabores fuertes y frescos.",
      "RU": "Сильный, интенсивный вкус черного винограда в сочетании с прохладными нотками мяты. Идеально подходит для любителей сильных и прохладных вкусов."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__black_nana.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "intense",
      "fresh",
      "dark"
    ],
    "intensity": 4
  },
  {
    "id": "s5",
    "name": {
      "DE": "Sternstaub",
      "EN": "Stardust",
      "TR": "Yıldız Tozu",
      "FR": "Poussière d'étoile",
      "ES": "polvo de estrellas",
      "RU": "Звездная пыль"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein faszinierender Mix aus süßen, fruchtigen Noten und der spritzigen Frische von Grapefruit. Ein Hauch von Exotik, der deine Sinne verzaubert.",
      "EN": "A fascinating mix of sweet, fruity notes and the sparkling freshness of grapefruit. A touch of exoticism that enchants your senses.",
      "TR": "Tatlı, meyvemsi notaların ve greyfurtun canlı ferahlığının büyüleyici bir karışımı. Duyularınızı büyüleyecek egzotik bir dokunuş.",
      "FR": "Un mélange fascinant de notes sucrées et fruitées et de la fraîcheur acidulée du pamplemousse. Une touche d'exotisme qui enchante vos sens.",
      "ES": "Una mezcla fascinante de notas dulces y afrutadas y la frescura picante del pomelo. Un toque de exotismo que encanta tus sentidos.",
      "RU": "Завораживающее сочетание сладких фруктовых нот и пикантной свежести грейпфрута. Прикосновение экзотики, которое очаровывает ваши чувства."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__sternstaub.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "sweet",
      "exotic",
      "fruity"
    ],
    "intensity": 3
  },
  {
    "id": "s6",
    "name": {
      "DE": "Luftschloss",
      "EN": "Castle in the Air",
      "TR": "Hayal Şatosu",
      "FR": "Château dans les airs",
      "ES": "Castillo en el aire",
      "RU": "Замок в воздухе"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein erfrischender Geschmack von saftiger Wassermelone kombiniert mit der kühlen Frische von Minze – ein leichter, fruchtiger und unglaublich erfrischender Genuss.",
      "EN": "A refreshing taste of juicy watermelon combined with the cool freshness of mint – light, fruity and incredibly refreshing.",
      "TR": "Sulu karpuzun ferahlatıcı tadı, nanenin serin tazeliğiyle buluşuyor – hafif, meyvemsi ve inanılmaz derecede ferahlatıcı.",
      "FR": "Un goût rafraîchissant de pastèque juteuse associé à la fraîcheur de la menthe – léger, fruité et incroyablement rafraîchissant.",
      "ES": "Un sabor refrescante de sandía jugosa combinado con el frescor de la menta: ligero, afrutado e increíblemente refrescante.",
      "RU": "Освежающий вкус сочного арбуза в сочетании с прохладной свежестью мяты — лёгкий, фруктовый и невероятно освежающий."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__luftschloss.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "fresh",
      "fruity",
      "sweet"
    ],
    "intensity": 2
  },
  {
    "id": "s7",
    "name": {
      "DE": "Limette Minze",
      "EN": "Lime Mint",
      "TR": "Misket Limonu Nane",
      "FR": "Menthe citron vert",
      "ES": "menta lima",
      "RU": "Лайм и мята"
    },
    "price": 16.9,
    "description": {
      "DE": "Die spritzige Frische von Limetten kombiniert mit der kühlen Note von Minze. Eine echte Erfrischung für heiße Tage.",
      "EN": "The sparkling freshness of limes combined with the cool note of mint. A real refreshment for hot days.",
      "TR": "Misket limonu ferahlığının, nanenin serinletici notasıyla birleşimi. Sıcak günler için gerçek bir ferahlık.",
      "FR": "La fraîcheur acidulée du citron vert alliée à la note fraîche de la menthe. Un véritable rafraîchissement pour les journées chaudes.",
      "ES": "La frescura picante de la lima combinada con la nota fresca de la menta. Un verdadero refresco para los días calurosos.",
      "RU": "Острая свежесть лайма в сочетании с прохладной ноткой мяты. Настоящее освежение в жаркие дни."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__limette_minze.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "fresh",
      "citrus"
    ],
    "intensity": 3
  },
  {
    "id": "s8",
    "name": {
      "DE": "Lemon Chill",
      "EN": "Lemon Chill",
      "TR": "Limon Chill",
      "FR": "Refroidissement au citron",
      "ES": "Frío De Limón",
      "RU": "Лимонный холод"
    },
    "price": 16.9,
    "description": {
      "DE": "Frischer Zitronengeschmack mit einem eisigen Abgang, der für einen angenehm kühlen Rauch sorgt.",
      "EN": "Fresh lemon taste with an icy finish that provides a pleasantly cool smoke.",
      "TR": "Rahatlatıcı, serin bir içim sağlayan, buz gibi bir bitişe sahip taze limon tadı.",
      "FR": "Saveur de citron frais avec une finale glacée qui procure une fumée agréablement fraîche.",
      "ES": "Sabor fresco a limón con un final helado que proporciona una fumada agradablemente fresca.",
      "RU": "Свежий лимонный вкус с ледяным послевкусием, обеспечивающим приятную прохладу дыма."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__lemon_chill.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "fresh",
      "citrus",
      "ice"
    ],
    "intensity": 3
  },
  {
    "id": "s9",
    "name": {
      "DE": "Blueberry",
      "EN": "Blueberry",
      "TR": "Yaban Mersini",
      "FR": "Myrtille",
      "ES": "Arándano",
      "RU": "Черника"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein harmonischer Mix aus saftigen Blaubeeren und süßen aromatischen Trauben - perfekt für ein fruchtig-erfrischendes Raucherlebnis.",
      "EN": "A harmonious mix of juicy blueberries and sweet aromatic grapes - perfect for a fruity-refreshing smoking experience.",
      "TR": "Sulu yaban mersinleri ve tatlı aromatik üzümlerin uyumlu karışımı - meyvemsi ve ferahlatıcı bir nargile deneyimi için mükemmel.",
      "FR": "Un mélange harmonieux de myrtilles juteuses et de raisins sucrés et aromatiques - parfait pour une expérience de fumage fruitée et rafraîchissante.",
      "ES": "Una mezcla armoniosa de jugosos arándanos y uvas dulces y aromáticas, perfecta para una experiencia de fumar refrescante y afrutada.",
      "RU": "Гармоничное сочетание сочной черники и сладкого ароматного винограда идеально подходит для фруктового, освежающего курения."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__blueberry.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "fruity",
      "sweet"
    ],
    "intensity": 2
  },
  {
    "id": "s10",
    "name": {
      "DE": "Nasty Girl",
      "EN": "Nasty Girl",
      "TR": "Nasty Girl",
      "FR": "Méchante fille",
      "ES": "chica desagradable",
      "RU": "противная девчонка"
    },
    "price": 16.9,
    "description": {
      "DE": "Eine süße Kombination aus reifer Erdbeere und saftiger Wassermelone und ein fruchtiger Mix, der begeistert.",
      "EN": "A sweet combination of ripe strawberry and juicy watermelon and a fruity mix that inspires.",
      "TR": "Olgun çilek ve sulu karpuzun tatlı bir kombinasyonu; sizi büyüleyecek meyvemsi bir karışım.",
      "FR": "Une douce combinaison de fraises mûres et de pastèque juteuse et un mélange fruité qui ravit.",
      "ES": "Una dulce combinación de fresas maduras y jugosa sandía y una mezcla frutal que deleita.",
      "RU": "Сладкое сочетание спелой клубники и сочного арбуза и фруктовый микс, который восхищает."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__nasty_girl.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "sweet",
      "fruity"
    ],
    "intensity": 2
  },
  {
    "id": "s11",
    "name": {
      "DE": "Love 66",
      "EN": "Love 66",
      "TR": "Love 66",
      "FR": "Amour 66",
      "ES": "amor 66",
      "RU": "Любовь 66"
    },
    "price": 16.9,
    "description": {
      "DE": "Eine Mischung aus Wassermelone, Honigmelone, Minze und Passionsfrucht. Perfekte Balance aus süßen und blumigen Noten, sehr sanft.",
      "EN": "A blend of watermelon, honeydew melon, mint and passion fruit. Perfect balance of sweet and floral notes, very smooth.",
      "TR": "Karpuz, kavun, nane ve çarkıfelek meyvesinin bir karışımı. Tatlı ve çiçeksi notaların mükemmel dengesi, içimi oldukça yumuşak.",
      "FR": "Un mélange de pastèque, de melon miel, de menthe et de fruit de la passion. Equilibre parfait de notes sucrées et florales, d'une grande douceur.",
      "ES": "Una mezcla de sandía, melón dulce, menta y maracuyá. Equilibrio perfecto de notas dulces y florales, muy suave.",
      "RU": "Смесь арбуза, дыни, мяты и маракуйи. Идеальный баланс сладких и цветочных нот, очень нежный."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__love66.webp",
    "category": "shisha",
    "subcategory": "Premium Blends",
    "tags": [
      "sweet",
      "fruity",
      "exotic"
    ],
    "intensity": 2
  },
  {
    "id": "s12",
    "name": {
      "DE": "Pfirsich Minze",
      "EN": "Peach Mint",
      "TR": "Şeftali Nane",
      "FR": "Pêche menthe",
      "ES": "Menta melocotón",
      "RU": "Персиковая мята"
    },
    "price": 16.9,
    "description": {
      "DE": "Der saftige Geschmack von reifen Pfirsichen, perfekt ergänzt durch die Frische von Minze - ein echter Klassiker.",
      "EN": "The juicy taste of ripe peaches, perfectly complemented by the freshness of mint - a real classic.",
      "TR": "Nanenin ferahlığıyla mükemmel bir şekilde tamamlanan olgun şeftalilerin sulu tadı - gerçek bir klasik.",
      "FR": "Le goût juteux des pêches mûres, parfaitement complété par la fraîcheur de la menthe - un véritable classique.",
      "ES": "El jugoso sabor de los melocotones maduros, perfectamente complementado con la frescura de la menta, es un auténtico clásico.",
      "RU": "Сочный вкус спелых персиков, прекрасно дополненный свежестью мяты – настоящая классика."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__pfirsich_minze.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "sweet",
      "fresh",
      "fruity"
    ],
    "intensity": 3
  },
  {
    "id": "s13",
    "name": {
      "DE": "Falim Red",
      "EN": "Falim Red",
      "TR": "Falım Red",
      "FR": "Falim Rouge",
      "ES": "Falim Rojo",
      "RU": "Фалим Красный"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein intensiver, fruchtiger Mix aus süßen Erdbeernoten und dem charakteristischen Aroma des türkischen Kaugummis. Orientalisches Flair.",
      "EN": "An intense, fruity mix of sweet strawberry notes and the characteristic aroma of Turkish chewing gum. Oriental flair.",
      "TR": "Tatlı çilek notaları ve Türk sakızının (Falım) karakteristik aromasının yoğun, meyveli bir karışımı. Oryantal bir esinti.",
      "FR": "Un mélange intense et fruité de notes sucrées de fraise et de l'arôme caractéristique du chewing-gum turc. Une touche orientale.",
      "ES": "Una mezcla intensa y afrutada de notas dulces de fresa y el característico aroma del chicle turco. Estilo oriental.",
      "RU": "Интенсивная фруктовая смесь нот сладкой клубники и характерного аромата турецкой жевательной резинки. Oriental flair."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__falim_red.webp",
    "category": "shisha",
    "subcategory": "Premium Blends",
    "tags": [
      "sweet",
      "fruity",
      "exotic"
    ],
    "intensity": 3
  },
  {
    "id": "s14",
    "name": {
      "DE": "Ice Kaktus",
      "EN": "Ice Cactus",
      "TR": "Buzlu Kaktüs",
      "FR": "Cactus de glace",
      "ES": "cactus de hielo",
      "RU": "Ледяной кактус"
    },
    "price": 16.9,
    "description": {
      "DE": "Ein einzigartiger Mix aus fruchtigem Kaktus und einer kühlen, eisigen Note - für ein außergewöhnliches Geschmackserlebnis.",
      "EN": "A unique mix of fruity cactus and a cool, icy note - for an extraordinary taste experience.",
      "TR": "Meyvemsi kaktüs ve serin, buz gibi bir notanın eşsiz bir karışımı - sıra dışı bir lezzet deneyimi için.",
      "FR": "Un mélange unique de cactus fruité et d'une note fraîche et glacée - pour une expérience gustative extraordinaire.",
      "ES": "Una mezcla única de cactus afrutado y una nota fresca y helada, para una experiencia de sabor extraordinaria.",
      "RU": "Уникальное сочетание фруктовых нот кактуса и прохладной ледяной ноты – для необыкновенного вкуса."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__ice_kaktus.webp",
    "category": "shisha",
    "subcategory": "Premium Blends",
    "tags": [
      "fresh",
      "ice",
      "exotic"
    ],
    "intensity": 3
  },
  {
    "id": "s15",
    "name": {
      "DE": "African Queen",
      "EN": "African Queen",
      "TR": "African Queen",
      "FR": "Reine africaine",
      "ES": "reina africana",
      "RU": "Африканская королева"
    },
    "price": 16.9,
    "description": {
      "DE": "Eine exotische Mischung aus Waldbeeren, Trauben und weiteren erlesenen Früchten - süß, fruchtig und herrlich erfrischend.",
      "EN": "An exotic mixture of wild berries, grapes and other exquisite fruits - sweet, fruity and wonderfully refreshing.",
      "TR": "Orman meyveleri, üzüm ve diğer seçkin meyvelerin egzotik bir karışımı - tatlı, meyvemsi ve harika bir şekilde ferahlatıcı.",
      "FR": "Un mélange exotique de baies sauvages, de raisins et d'autres fruits sélectionnés - doux, fruités et merveilleusement rafraîchissants.",
      "ES": "Una mezcla exótica de frutos del bosque, uvas y otras frutas selectas: dulce, afrutada y maravillosamente refrescante.",
      "RU": "Экзотическая смесь лесных ягод, винограда и других отборных фруктов — сладкая, фруктовая и чудесно освежающая."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__african_queen.webp",
    "category": "shisha",
    "subcategory": "Premium Blends",
    "tags": [
      "sweet",
      "fruity",
      "exotic"
    ],
    "intensity": 3
  },
  {
    "id": "s16",
    "name": {
      "DE": "Raffaello",
      "EN": "Raffaello",
      "TR": "Raffaello",
      "FR": "Raphaël",
      "ES": "rafaello",
      "RU": "Рафаэлло"
    },
    "price": 16.9,
    "description": {
      "DE": "Der süße, cremige Geschmack von Kokos und Mandeln, inspiriert vom beliebten Dessert - ein Genuss, der auf der Zunge zergeht.",
      "EN": "The sweet, creamy taste of coconut and almonds, inspired by the popular dessert - a treat that melts on the tongue.",
      "TR": "Sevilen tatlıdan ilham alan Hindistan cevizi ve bademin tatlı, kremsi tadı - ağızda eriyen bir lezzet.",
      "FR": "Le goût sucré et crémeux de la noix de coco et des amandes, inspiré du dessert populaire - un plaisir qui fond dans la bouche.",
      "ES": "El sabor dulce y cremoso del coco y las almendras, inspirado en el popular postre, un placer que se deshace en la boca.",
      "RU": "Сладкий, сливочный вкус кокоса и миндаля, вдохновленный популярным десертом – удовольствие, которое тает во рту."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__raffaello.webp",
    "category": "shisha",
    "subcategory": "Premium Blends",
    "tags": [
      "sweet",
      "creamy"
    ],
    "intensity": 2
  },
  {
    "id": "s17",
    "name": {
      "DE": "Ice Apfel",
      "EN": "Ice Apple",
      "TR": "Buzlu Elma",
      "FR": "Pomme glacée",
      "ES": "manzana helada",
      "RU": "Ледяное яблоко"
    },
    "price": 16.9,
    "description": {
      "DE": "Knackige, frische Äpfel mit einer eisigen Note, die für ein angenehm kühles Rauchvergnügen sorgen.",
      "EN": "Crisp, fresh apples with an icy note that provide a pleasantly cool smoking pleasure.",
      "TR": "Keyifli ve serin bir içim sağlayan, buz gibi notasıyla çıtır, taze elmalar.",
      "FR": "Des pommes fraîches et croquantes avec une note glacée qui assurent une expérience de fumage agréablement fraîche.",
      "ES": "Manzanas frescas y crujientes con una nota helada que garantizan una experiencia de fumar agradable y fresca.",
      "RU": "Хрустящие свежие яблоки с ледяной ноткой, обеспечивающие приятную прохладу при курении."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__ice_apfel.webp",
    "category": "shisha",
    "subcategory": "Classic",
    "tags": [
      "fresh",
      "ice",
      "fruity"
    ],
    "intensity": 3
  },
  {
    "id": "s18",
    "name": {
      "DE": "Hürrem Spezial Hookah",
      "EN": "Hürrem Special Hookah",
      "TR": "Hürrem Özel Nargile",
      "FR": "Chicha spéciale Hürrem",
      "ES": "Cachimba Especial Hürrem",
      "RU": "Специальный кальян Хюррем"
    },
    "price": 19.9,
    "description": {
      "DE": "Erlebe unsere exklusive Hürrem LED-Shisha mit dem hochwertigen Quasar Kopf. Wähle deinen individuellen Tabakmix aus zwei Sorten ganz nach deinem Geschmack.",
      "EN": "Experience our exclusive Hürrem LED shisha with the high-quality Quasar bowl. Choose your individual tobacco mix from two varieties entirely according to your taste.",
      "TR": "Özel Hürrem LED nargilemizi yüksek kaliteli Quasar lüle ile deneyimleyin. İki çeşit tütün ile tamamen damak zevkinize özel karışımınızı oluşturun.",
      "FR": "Découvrez notre chicha LED exclusive Hürrem avec la tête Quasar de haute qualité. Choisissez votre mélange de tabac individuel parmi deux variétés selon votre goût.",
      "ES": "Experimente nuestra exclusiva shisha LED Hürrem con el cabezal Quasar de alta calidad. Elija su mezcla de tabaco individual entre dos variedades según su gusto.",
      "RU": "Испытайте наш эксклюзивный светодиодный кальян Hürrem с высококачественной головкой Quasar. Выберите свой индивидуальный табачный микс из двух сортов по своему вкусу."
    },
    "imageUrl": "/images/menury_originals/hookahs/hookahs__hürremspecial_hookah.webp",
    "category": "shisha",
    "subcategory": "Signature Blends",
    "isSignature": true,
    "tags": [
      "premium",
      "exclusive"
    ],
    "arModelUrl": "/models/hookah.glb",
    "arIosModelUrl": "",
    "themeColor": "#FFD700",
    "intensity": 3
  },
  {
    "id": "s19",
    "name": {
      "DE": "Neuer Kopf",
      "EN": "New Bowl",
      "TR": "Yeni Lüle",
      "FR": "Nouveau chef",
      "ES": "nueva cabeza",
      "RU": "Новая голова"
    },
    "price": 10,
    "description": {
      "DE": "Frischer Tabakkopf für deine Shisha mit dem Geschmack deiner Wahl.",
      "EN": "Fresh tobacco bowl for your shisha with the flavor of your choice.",
      "TR": "Nargileniz için seçtiğiniz aroma ile hazırlanmış taze lüle.",
      "FR": "Bol à tabac frais pour votre chicha avec l'arôme de votre choix.",
      "ES": "Bol de tabaco fresco para tu shisha con el sabor que elijas.",
      "RU": "Чаша для свежего табака для кальяна со вкусом по вашему выбору."
    },
    "imageUrl": "",
    "category": "shisha",
    "tags": [
      "extra"
    ]
  },
  {
    "id": "d1",
    "allergens": ["A", "G", "H", "P"],
    "name": {
      "DE": "GOLDEN MANGO MACCHIATTO",
      "EN": "GOLDEN MANGO MACCHIATTO",
      "TR": "GOLDEN MANGO MACCHIATTO",
      "FR": "MACCHIATTO À LA MANGUE DORÉE",
      "ES": "MACCHIATTO DE MANGO DORADO",
      "RU": "ЗОЛОТОЙ МАНГО МАККИАТТО"
    },
    "price": 7.5,
    "description": {
      "DE": "Die perfekte Fusion aus Orient und Okzident: Eine fruchtig-süße Basis aus goldenem Mangopüree, geschichtet mit eiskalter, cremiger Milch und abgerundet durch einen kräftigen, frisch gebrühten Espresso-Shot. Ein erfrischendes Geschmackserlebnis voller Energie.",
      "EN": "The perfect fusion of Orient and Occident: A fruity-sweet base of golden mango puree, layered with ice-cold, creamy milk and rounded off by a strong, freshly brewed espresso shot. A refreshing taste experience full of energy.",
      "TR": "Doğu ve Batı'nın mükemmel füzyonu: Altın rengi mango püresinden oluşan meyvemsi tatlı bir taban, buz gibi, kremsi sütle katmanlanmış ve sert, taze demlenmiş bir espresso shot ile tamamlanmış. Enerji dolu serinletici bir lezzet deneyimi.",
      "FR": "La fusion parfaite de l'Orient et de l'Occident : une base fruitée et sucrée de purée de mangue dorée, recouverte de lait glacé et crémeux et complétée par un expresso puissant fraîchement infusé. Une expérience gustative rafraîchissante et pleine d'énergie.",
      "ES": "La fusión perfecta de Oriente y Occidente: una base dulce y afrutada de puré de mango dorado, cubierta con leche cremosa helada y rematada con un trago de espresso fuerte y recién hecho. Una experiencia de sabor refrescante y llena de energía.",
      "RU": "Идеальное сочетание Востока и Запада: фруктово-сладкая основа из пюре золотистого манго, прослоенная ледяным сливочным молоком и дополненная крепким свежесваренным эспрессо. Освежающий вкус, полный энергии."
    },
    "imageUrl": "/images/menury_originals/sommer_specials__golden_mango_macchiatto.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "sweet",
      "creamy",
      "coffee"
    ],
  },
  {
    "id": "d2",
    "allergens": ["A", "G", "H"],
    "name": {
      "DE": "ICED STRAWBERRY VELVET",
      "EN": "ICED STRAWBERRY VELVET",
      "TR": "ICED STRAWBERRY VELVET",
      "FR": "VELOURS DE FRAISE GLACÉ",
      "ES": "TERCIOPELO HELADO DE FRESA",
      "RU": "ЗАМОРОЖЕННАЯ КЛУБНИКА БАРХАТ"
    },
    "price": 7.5,
    "description": {
      "DE": "Ein samtig-cremiger Sommertraum im Glas. Fruchtiges Erdbeer-Püree trifft auf sanfte, gekühlte Milch und die edle, herbe Note von feinstem Espresso. Intensiv, fruchtig und unbeschreiblich cremig.",
      "EN": "A velvety, creamy summer dream in a glass. Fruity strawberry puree meets gentle, chilled milk and the noble, tart note of finest espresso. Intense, fruity and indescribably creamy.",
      "TR": "Bardakta kadifemsi, kremsi bir yaz rüyası. Meyvemsi çilek püresi, hafif, soğutulmuş süt ve en ince espressonun asil, mayhoş notasıyla buluşuyor. Yoğun, meyveli ve tarif edilemez derecede kremsi.",
      "FR": "Un rêve d'été velouté et crémeux dans un verre. La purée de fraises fruitée rencontre le lait doux et frais et la note noble et acidulée du meilleur expresso. Intense, fruité et incroyablement crémeux.",
      "ES": "Un sueño de verano cremoso y aterciopelado en una copa. El puré de fresas afrutado se une a la suave leche fría y a la nota noble y ácida del mejor espresso. Intenso, afrutado e indescriptiblemente cremoso.",
      "RU": "Бархатистая, сливочная летняя мечта в бокале. Фруктовое клубничное пюре сочетается с нежным охлажденным молоком и благородной терпкой ноткой лучшего эспрессо. Интенсивный, фруктовый и неописуемо сливочный."
    },
    "imageUrl": "/images/menury_originals/sommer_specials__iced_strawberry_velvet.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "sweet",
      "creamy",
      "coffee"
    ],
    "additives": [
      "9"
    ]
  },
  {
    "id": "d3",
    "name": {
      "DE": "MANGO MATCHA FUSION",
      "EN": "MANGO MATCHA FUSION",
      "TR": "MANGO MATCHA FUSION",
      "FR": "FUSION MANGUE MATCHA",
      "ES": "FUSIÓN DE MANGO Y MATCHA",
      "RU": "МАНГО МАТЧА ФЬЮЖН"
    },
    "price": 7.5,
    "description": {
      "DE": "Erlebe die perfekte Balance aus fruchtig-süßer Mango und der cremigen Energie von feinstem Matcha.",
      "EN": "Experience the perfect balance of fruity-sweet mango and the creamy energy of finest matcha.",
      "TR": "Meyvemsi tatlı mango ile en ince matchanın kremsi enerjisinin mükemmel dengesini deneyimleyin.",
      "FR": "Découvrez l'équilibre parfait entre la mangue fruitée et sucrée et l'énergie crémeuse du meilleur matcha.",
      "ES": "Experimente el equilibrio perfecto entre el mango dulce y afrutado y la energía cremosa del mejor matcha.",
      "RU": "Испытайте идеальный баланс фруктово-сладкого манго и сливочной энергии лучшего матча."
    },
    "imageUrl": "/images/menury_originals/sommer_specials__mango_matcha_fusion.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "sweet",
      "creamy",
      "matcha"
    ]
  },
  {
    "id": "d4",
    "name": {
      "DE": "LILA MANGO TRAUM",
      "EN": "LILA MANGO TRAUM",
      "TR": "LILA MANGO TRAUM",
      "FR": "RÊVE DE MANGUE VIOLET",
      "ES": "SUEÑO DE MANGO PÚRPURA",
      "RU": "ФИОЛЕТОВАЯ МАНГО МЕЧТА"
    },
    "price": 7.5,
    "description": {
      "DE": "Sieht magisch aus, schmeckt auch so! Fruchtige Mango trifft auf die samtige, sanfte Süße von lila Süßkartoffel-Pulver. Der absolute Eyecatcher!",
      "EN": "Looks magical, tastes like it too! Fruity mango meets the velvety, gentle sweetness of purple sweet potato powder. The absolute eye-catcher!",
      "TR": "Sihirli görünüyor, tadı da öyle! Meyveli mango, mor tatlı patates tozunun kadifemsi, hafif tatlılığıyla buluşuyor. Göz alıcı bir lezzet!",
      "FR": "Ça a l’air magique et ça a aussi un goût magique ! La mangue fruitée rencontre la douceur veloutée et douce de la poudre de patate douce violette. L'accroche-regard absolu !",
      "ES": "¡Parece mágico y sabe mágico también! El mango afrutado se combina con la dulzura suave y aterciopelada del polvo de camote morado. ¡El verdadero atractivo!",
      "RU": "Выглядит волшебно и на вкус тоже волшебно! Фруктовый манго сочетается с бархатистой, нежной сладостью фиолетового порошка сладкого картофеля. Абсолютное зрелище!"
    },
    "imageUrl": "/images/menury_originals/sommer_specials__lila_mango_traum.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "sweet",
      "exotic"
    ]
  },
  {
    "id": "d5",
    "name": {
      "DE": "STRAWBERRY MATCHA CHILL",
      "EN": "STRAWBERRY MATCHA CHILL",
      "TR": "STRAWBERRY MATCHA CHILL",
      "FR": "REFROIDISSEMENT AU MATCHA À LA FRAISE",
      "ES": "CHILL DE MATCHA DE FRESA",
      "RU": "КЛУБНИКА МАТЧА ЧИЛЛ"
    },
    "price": 7.5,
    "description": {
      "DE": "Die ultimative Erfrischung: Fruchtige Erdbeeren treffen auf eine intensiv-cremige Matcha-Milchstraße. Dein neuer Lieblings-Drink für die perfekte Auszeit.",
      "EN": "The ultimate refreshment: Fruity strawberries meet an intensely creamy matcha milky way. Your new favorite drink for the perfect time out.",
      "TR": "Nihai ferahlık: Meyveli çilekler yoğun kremsi bir matcha samanyoluyla buluşuyor. Mükemmel bir mola için yeni favori içeceğiniz.",
      "FR": "Le rafraîchissement ultime : des fraises fruitées rencontrent une voie lactée matcha intensément crémeuse. Votre nouvelle boisson préférée pour une pause parfaite.",
      "ES": "El refresco definitivo: las fresas afrutadas se encuentran con una vía láctea matcha intensamente cremosa. Tu nueva bebida favorita para el descanso perfecto.",
      "RU": "Невероятное освежение: фруктовая клубника сочетается с насыщенным сливочным вкусом матча «Млечный путь». Ваш новый любимый напиток для идеального перерыва."
    },
    "imageUrl": "/images/menury_originals/sommer_specials__strawberry_matcha_chill.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "sweet",
      "matcha",
      "creamy"
    ]
  },
  {
    "id": "d6",
    "name": {
      "DE": "Iced Latte",
      "EN": "Iced Latte",
      "TR": "Iced Latte",
      "FR": "Latté glacé",
      "ES": "café con leche helado",
      "RU": "Ледяной латте"
    },
    "price": 6.9,
    "description": {
      "DE": "Kalt servierter Latte Macchiato - perfekt für heiße Tage.",
      "EN": "Latte Macchiato served cold - perfect for hot days.",
      "TR": "Soğuk servis edilen Latte Macchiato - sıcak günler için mükemmel.",
      "FR": "Latte Macchiato servi froid - parfait pour les journées chaudes.",
      "ES": "Latte Macchiato servido frío, perfecto para los días calurosos.",
      "RU": "Латте Маккиато подается холодным – идеально подходит для жарких дней."
    },
    "imageUrl": "/images/menury_originals/sommer_specials__iced_latte.webp",
    "category": "drinks",
    "subcategory": "Sommer-Specials",
    "tags": [
      "coffee",
      "creamy",
      "ice"
    ],
    "allergens": [
      "G"
    ]
  },
  {
    "id": "d7",
    "name": {
      "DE": "Fritz Cola",
      "EN": "Fritz Cola",
      "TR": "Fritz Cola",
      "FR": "Fritz Cola",
      "ES": "Fritz Cola",
      "RU": "Фриц Кола"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/fritz-cola.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d8",
    "name": {
      "DE": "Fritz Cola Zero",
      "EN": "Fritz Cola Zero",
      "TR": "Fritz Cola Zero",
      "FR": "Fritz Cola Zéro",
      "ES": "Fritz Cola Cero",
      "RU": "Фриц Кола Зеро"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/fritz-cola-zero.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d9",
    "name": {
      "DE": "Coca-Cola",
      "EN": "Coca-Cola",
      "TR": "Coca-Cola",
      "FR": "Coca-Cola",
      "ES": "coca-cola",
      "RU": "Кока-Кола"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__coca_cola.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d10",
    "name": {
      "DE": "Coca-Cola Zero",
      "EN": "Coca-Cola Zero",
      "TR": "Coca-Cola Zero",
      "FR": "Coca-Cola Zéro",
      "ES": "Coca-Cola Cero",
      "RU": "Кока-Кола Зеро"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__coca_cola_zero.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d11",
    "name": {
      "DE": "Fanta",
      "EN": "Fanta",
      "TR": "Fanta",
      "FR": "Fantaisie",
      "ES": "fanta",
      "RU": "Фанта"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__fanta.webp",
    "category": "drinks",
    "subcategory": "Softdrinks",
    "additives": [
      "1",
      "3"
    ]
  },
  {
    "id": "d12",
    "name": {
      "DE": "Sprite",
      "EN": "Sprite",
      "TR": "Sprite",
      "FR": "Lutin",
      "ES": "Duende",
      "RU": "Спрайт"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/sprite.02..webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d13",
    "name": {
      "DE": "Stilles & Mineral Wasser",
      "EN": "Still & Mineral Water",
      "TR": "Stilles & Mineral Wasser",
      "FR": "Eau plate et minérale",
      "ES": "Agua sin gas y mineral",
      "RU": "Негазированная и минеральная вода"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,7l (8.20 €)",
      "EN": "0.2l (3.20 €) | 0.7l (8.20 €)",
      "TR": "0,2l (3.20 €) | 0,7l (8.20 €)",
      "FR": "0,2l (3,20 €) | 0,7l (8,20 €)",
      "ES": "0,2l (3,20€) | 0,7l (8,20€)",
      "RU": "0,2л (3,20 €) | 0,7л (8,20 €)"
    },
    "imageUrl": "/images/menury_originals/softdrinks__mineralwasser.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d14",
    "name": {
      "DE": "Churchill 0,2l",
      "EN": "Churchill 0.2l",
      "TR": "Churchill 0,2l",
      "FR": "Churchill 0,2l",
      "ES": "Iglesia 0,2l",
      "RU": "Черчилль 0,2л"
    },
    "price": 3.8,
    "description": {
      "DE": "Mineralwasser mit einem Hauch Salz und frischer Zitrone.",
      "EN": "Mineral water with a hint of salt and fresh lemon.",
      "TR": "Tuz ve taze limon dokunuşuyla maden suyu (Churchill).",
      "FR": "Eau minérale avec une touche de sel et de citron frais.",
      "ES": "Agua mineral con un toque de sal y limón fresco.",
      "RU": "Минеральная вода с оттенком соли и свежего лимона."
    },
    "imageUrl": "/images/menury_originals/softdrinks__churchill_02l.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d16",
    "name": {
      "DE": "Schweppes Ginger Ale",
      "EN": "Schweppes Ginger Ale",
      "TR": "Schweppes Zencefilli Gazoz",
      "FR": "Schweppes Ginger Ale",
      "ES": "Ginger Ale Schweppes",
      "RU": "Швепс Имбирный Эль"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__schweppes_ginger_ale.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d17",
    "additives": ["1", "2", "3", "9"],
    "name": {
      "DE": "Schweppes Wild Berry",
      "EN": "Schweppes Wild Berry",
      "TR": "Schweppes Wild Berry",
      "FR": "Baies sauvages de Schweppes",
      "ES": "Baya silvestre de Schweppes",
      "RU": "Швепс Вайлд Берри"
    },
    "price": 3.6,
    "description": {
      "DE": "0,2l",
      "EN": "0.2l",
      "TR": "0,2l",
      "FR": "0,2l",
      "ES": "0,2l",
      "RU": "0,2л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__schweppes_wild_berry.webp",
    "category": "drinks",
    "subcategory": "Softdrinks",
  },
  {
    "id": "d18",
    "additives": ["1", "2", "3", "9"],
    "name": {
      "DE": "Rixdorfer Fassbrause",
      "EN": "Rixdorfer Fassbrause",
      "TR": "Rixdorfer Fassbrause",
      "FR": "Douche tonneau Rixdorfer",
      "ES": "Ducha de barril Rixdorfer",
      "RU": "Душ-бочка Rixdorfer"
    },
    "price": 4.2,
    "description": {
      "DE": "0,33l",
      "EN": "0.33l",
      "TR": "0,33l",
      "FR": "0,33 l",
      "ES": "0,33l",
      "RU": "0,33л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__rixdorfer_fassbrause.webp",
    "category": "drinks",
    "subcategory": "Softdrinks",
  },
  {
    "id": "d19",
    "additives": ["1", "2", "9"],
    "name": {
      "DE": "Club-Mate",
      "EN": "Club-Mate",
      "TR": "Club-Mate",
      "FR": "Club Mate",
      "ES": "compañero de club",
      "RU": "Клубный приятель"
    },
    "price": 4.6,
    "description": {
      "DE": "0,33l",
      "EN": "0.33l",
      "TR": "0,33l",
      "FR": "0,33 l",
      "ES": "0,33l",
      "RU": "0,33л"
    },
    "imageUrl": "/images/menury_originals/softdrinks__club_mate.webp",
    "category": "drinks",
    "subcategory": "Softdrinks",
  },
  {
    "id": "d20",
    "additives": ["1", "2", "3"],
    "name": {
      "DE": "Elephant Bay",
      "EN": "Elephant Bay",
      "TR": "Elephant Bay",
      "FR": "Baie des Éléphants",
      "ES": "Bahía del Elefante",
      "RU": "Элефант Бэй"
    },
    "price": 4.6,
    "description": {
      "DE": "0,33l - Erhältlich in den Sorten: Granatapfel, Peach, Peach Zero, Mango-Ananas. Für die Sorten bitte unser Personal fragen.",
      "EN": "0.33l - Available in the following flavors: Pomegranate, Peach, Peach Zero, Mango-Pineapple. Please ask our staff for the varieties.",
      "TR": "0,33l - Nar, Şeftali, Şeftali Zero, Mango-Ananas çeşitleri mevcuttur. Çeşitler için lütfen personelimize danışın.",
      "FR": "0,33l - Disponible dans les variétés suivantes : Grenade, Pêche, Pêche Zéro, Mangue-Ananas. Veuillez demander les variétés à notre personnel.",
      "ES": "0,33l - Disponible en las siguientes variedades: Granada, Melocotón, Melocotón Zero, Mango-Piña. Por favor pregunte a nuestro personal por las variedades.",
      "RU": "0.33l - Available in the following varieties: Pomegranate, Peach, Peach Zero, Mango-Pineapple. Сорта уточняйте у наших сотрудников."
    },
    "imageUrl": "/images/menury_originals/softdrinks__elephant_bay.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d_sd_moloko",
    "additives": ["1", "2", "3", "13"],
    "name": { "DE": "Moloko", "EN": "Moloko", "TR": "Moloko", "FR": "Moloko", "ES": "Moloko", "RU": "Moloko" },
    "price": 4.6,
    "description": {
      "DE": "0,25 l – für alle Sorten bitte unser Personal fragen.",
      "EN": "0.25 l – please ask our staff for all flavours.",
      "TR": "0,25 l – tüm çeşitler için lütfen personelimize danışın.",
      "FR": "0,25 l – demandez à notre personnel pour toutes les saveurs.",
      "ES": "0,25 l – pregunte a nuestro personal por todos los sabores.",
      "RU": "0,25 л – о всех вкусах спрашивайте у персонала."
    },
    "imageUrl": "/images/menury_originals/softdrinks__moloko.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d_juice_1",
    "name": {
      "DE": "Orangensaft",
      "EN": "Orange Juice",
      "TR": "Portakal Suyu",
      "FR": "du jus d'orange",
      "ES": "zumo de naranja",
      "RU": "апельсиновый сок"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_2",
    "name": {
      "DE": "Apfelsaft",
      "EN": "Apple Juice",
      "TR": "Elma Suyu",
      "FR": "jus de pomme",
      "ES": "zumo de manzana",
      "RU": "яблочный сок"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_3",
    "name": {
      "DE": "Maracujasaft",
      "EN": "Passion Fruit Juice",
      "TR": "Çarkıfelek Meyvesi Suyu",
      "FR": "Jus de fruit de la passion",
      "ES": "Jugo de maracuyá",
      "RU": "Сок маракуйи"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_4",
    "name": {
      "DE": "Mangosaft",
      "EN": "Mango Juice",
      "TR": "Mango Suyu",
      "FR": "Jus de mangue",
      "ES": "Jugo de mango",
      "RU": "Сок манго"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_5",
    "name": {
      "DE": "KiBa (Kirsch-Bananen-Saft)",
      "EN": "KiBa (Cherry-Banana Juice)",
      "TR": "KiBa (Vişne-Muz Suyu)",
      "FR": "KiBa (jus de banane cerise)",
      "ES": "KiBa (jugo de plátano y cereza)",
      "RU": "Киба (вишнево-банановый сок)"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_6",
    "name": {
      "DE": "Kirschnektar",
      "EN": "Cherry Nectar",
      "TR": "Vişne Nektarı",
      "FR": "Nectar de cerise",
      "ES": "néctar de cereza",
      "RU": "Вишневый нектар"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_7",
    "name": {
      "DE": "Bananennektar",
      "EN": "Banana Nectar",
      "TR": "Muz Nektarı",
      "FR": "Nectar de banane",
      "ES": "néctar de plátano",
      "RU": "Банановый нектар"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_8",
    "name": {
      "DE": "Cranberrysaft",
      "EN": "Cranberry Juice",
      "TR": "Kızılcık Suyu",
      "FR": "Jus de canneberge",
      "ES": "jugo de arándano",
      "RU": "Клюквенный сок"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_juice_9",
    "name": {
      "DE": "Ananassaft",
      "EN": "Pineapple Juice",
      "TR": "Ananas Suyu",
      "FR": "Jus d'ananas",
      "ES": "jugo de piña",
      "RU": "Ананасовый сок"
    },
    "price": 3.2,
    "description": {
      "DE": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "EN": "0.2l (3.20 €) | 0.4l (4.90 €)",
      "TR": "0,2l (3.20 €) | 0,4l (4.90 €)",
      "FR": "0,2l (3,20 €) | 0,4l (4,90 €)",
      "ES": "0,2l (3,20€) | 0,4l (4,90 €)",
      "RU": "0,2л (3,20 €) | 0,4л (4,90 €)"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Säfte"
  },
  {
    "id": "d_hs_1",
    "name": {
      "DE": "Chai Latte",
      "EN": "Chai Latte",
      "TR": "Chai Latte",
      "FR": "Chaï latté",
      "ES": "café con leche",
      "RU": "Чай латте"
    },
    "price": 4.5,
    "description": {
      "DE": "Aromatischer Gewürztee kombiniert mit Milch und einem cremigen Milchschaum - würzig und beruhigend.",
      "EN": "Aromatic spiced tea combined with milk and creamy milk froth - spicy and soothing.",
      "TR": "Süt ve kremsi süt köpüğü ile harmanlanmış aromatik baharat çayı - baharatlı ve rahatlatıcı.",
      "FR": "Thé épicé aromatique combiné avec du lait et une mousse de lait crémeuse – épicé et apaisant.",
      "ES": "Té aromático y especiado combinado con leche y una cremosa espuma de leche, especiado y calmante.",
      "RU": "Ароматный пряный чай в сочетании с молоком и сливочной молочной пеной – пряный и успокаивающий."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Heiße Specials",
    "tags": [
      "creamy",
      "spicy"
    ]
  },
  {
    "id": "d_hs_2",
    "name": {
      "DE": "Matcha Latte",
      "EN": "Matcha Latte",
      "TR": "Matcha Latte",
      "FR": "Matcha latté",
      "ES": "café con leche matcha",
      "RU": "Матча латте"
    },
    "price": 5.5,
    "description": {
      "DE": "Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.",
      "EN": "Fine Japanese green tea, frothily creamed - for all who love a special taste.",
      "TR": "İnce Japon yeşil çayı, kremsi köpüklü - özel bir tat sevenler için.",
      "FR": "Thé vert japonais fin, mousse crémeuse - pour tous ceux qui aiment son goût particulier.",
      "ES": "Fino té verde japonés, espuma cremosa, para todos los que aman el sabor especial.",
      "RU": "Прекрасный японский зеленый чай со сливочной пеной – для всех, кто любит особенный вкус."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__matcha_latte.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials",
    "tags": [
      "creamy",
      "matcha"
    ]
  },
  {
    "id": "d_hs_5",
    "name": {
      "DE": "Sahlep",
      "EN": "Sahlep",
      "TR": "Sahlep",
      "FR": "Sahlep",
      "ES": "Sahlep",
      "RU": "Сахлеп"
    },
    "price": 5.5,
    "description": {
      "DE": "Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.",
      "EN": "A traditional, creamy hot drink with a fine vanilla note and a hint of cinnamon.",
      "TR": "İnce vanilya notası ve bir tutam tarçın ile geleneksel, kremsi bir sıcak içecek.",
      "FR": "Une boisson chaude traditionnelle et crémeuse avec une subtile note vanillée et une pointe de cannelle.",
      "ES": "Una bebida caliente tradicional y cremosa con una sutil nota de vainilla y un toque de canela.",
      "RU": "Традиционный сливочный горячий напиток с тонкими нотками ванили и корицы."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__sahlep.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials",
    "tags": [
      "creamy",
      "classic"
    ]
  },
  {
    "id": "d_hit_1",
    "name": {
      "DE": "Yuzu",
      "EN": "Yuzu",
      "TR": "Yuzu",
      "FR": "Yuzu",
      "ES": "Yuzu",
      "RU": "Юзу"
    },
    "price": 6.9,
    "description": {
      "DE": "Ein erfrischender Eistee mit der feinherben Zitrusnote der asiatischen Yuzu-Frucht - ein wahrer Genuss für Liebhaber exotischer Aromen.",
      "EN": "A refreshing iced tea with the fine tart citrus note of the Asian yuzu fruit - a real treat for lovers of exotic flavors.",
      "TR": "Asya yuzu meyvesinin mayhoş narenciye notasıyla ferahlatıcı bir soğuk çay - egzotik aroma sevenler için gerçek bir lezzet.",
      "FR": "Un thé glacé rafraîchissant avec la délicate note hespéridée du fruit asiatique yuzu, un véritable régal pour les amateurs de saveurs exotiques.",
      "ES": "Un refrescante té helado con la delicada nota cítrica de la fruta asiática yuzu: un verdadero placer para los amantes de los sabores exóticos.",
      "RU": "Освежающий холодный чай с нежной цитрусовой ноткой азиатского фрукта юзу – настоящее удовольствие для любителей экзотических вкусов."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea",
    "tags": [
      "fresh",
      "citrus"
    ]
  },
  {
    "id": "d_hit_2",
    "name": {
      "DE": "Peach",
      "EN": "Peach",
      "TR": "Şeftali",
      "FR": "Pêche",
      "ES": "Durazno",
      "RU": "Персик"
    },
    "price": 6.9,
    "description": {
      "DE": "Fruchtiger Eistee mit dem süßen Geschmack von reifen Pfirsichen.",
      "EN": "Fruity iced tea with the sweet taste of ripe peaches.",
      "TR": "Olgun şeftalilerin tatlı lezzetiyle meyvemsi soğuk çay.",
      "FR": "Thé glacé fruité au goût sucré de pêches mûres.",
      "ES": "Té helado afrutado con el dulce sabor de los melocotones maduros.",
      "RU": "Фруктовый холодный чай со сладким вкусом спелых персиков."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea",
    "tags": [
      "sweet",
      "fruity"
    ]
  },
  {
    "id": "d_hit_3",
    "name": {
      "DE": "Wildberry",
      "EN": "Wildberry",
      "TR": "Orman Meyveli",
      "FR": "Baies sauvages",
      "ES": "mora silvestre",
      "RU": "Вайлдберри"
    },
    "price": 6.9,
    "description": {
      "DE": "Aromatischer Mix aus Waldbeeren, perfekt für Beerenliebhaber.",
      "EN": "Aromatic mix of wild berries, perfect for berry lovers.",
      "TR": "Orman meyvelerinin aromatik karışımı, meyve tutkunları için mükemmel.",
      "FR": "Mélange aromatique de baies sauvages, parfait pour les amateurs de baies.",
      "ES": "Mezcla aromática de frutos del bosque, perfecta para los amantes de las bayas.",
      "RU": "Ароматная смесь лесных ягод, идеальна для любителей ягод."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea",
    "tags": [
      "fruity",
      "sweet"
    ]
  },
  {
    "id": "d_hit_4",
    "name": {
      "DE": "Sweet Melon",
      "EN": "Sweet Melon",
      "TR": "Sweet Melon",
      "FR": "Melon sucré",
      "ES": "melón dulce",
      "RU": "Сладкая дыня"
    },
    "price": 6.9,
    "description": {
      "DE": "Süßer und erfrischender Eistee mit der sommerlichen Note von Wassermelone.",
      "EN": "Sweet and refreshing iced tea with the summery note of watermelon.",
      "TR": "Karpuzun yaz esintisini taşıyan tatlı ve ferahlatıcı soğuk çay.",
      "FR": "Thé glacé sucré et rafraîchissant à la note estivale de pastèque.",
      "ES": "Té helado dulce y refrescante con la nota veraniega de sandía.",
      "RU": "Сладкий и освежающий холодный чай с летней ноткой арбуза."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea",
    "tags": [
      "sweet",
      "fresh"
    ]
  },
  {
    "id": "d_hit_5",
    "name": {
      "DE": "Acai Strawberry",
      "EN": "Acai Strawberry",
      "TR": "Acai Çilek",
      "FR": "Açaï Fraise",
      "ES": "Fresa Acaí",
      "RU": "Клубника асаи"
    },
    "price": 6.9,
    "description": {
      "DE": "Exotische Acai-Beeren kombiniert mit der Süße frischer Erdbeeren.",
      "EN": "Exotic acai berries combined with the sweetness of fresh strawberries.",
      "TR": "Egzotik acai meyvelerinin taze çileklerin tatlılığıyla birleşimi.",
      "FR": "Des baies d'açaï exotiques combinées à la douceur des fraises fraîches.",
      "ES": "Bayas de acai exóticas combinadas con la dulzura de las fresas frescas.",
      "RU": "Экзотические ягоды асаи в сочетании со сладостью свежей клубники."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea",
    "tags": [
      "fruity",
      "exotic"
    ]
  },
  {
    "id": "d_hit_6",
    "name": {
      "DE": "Cotton Candy",
      "EN": "Cotton Candy",
      "TR": "Cotton Candy",
      "FR": "Barbe à papa",
      "ES": "algodon de azucar",
      "RU": "Сладкая вата"
    },
    "price": 6.9,
    "description": {
      "DE": "Ein verspielter Eistee mit dem süßen Geschmack von Zuckerwatte - ein echtes Highlight.",
      "EN": "A playful iced tea with the sweet taste of cotton candy - a real highlight.",
      "TR": "Pamuk şekerin tatlı lezzetiyle eğlenceli bir soğuk çay - tam bir hit.",
      "FR": "Un thé glacé ludique au goût sucré de barbe à papa - un véritable point fort.",
      "ES": "Un divertido té helado con el dulce sabor del algodón de azúcar: una verdadera atracción.",
      "RU": "Игривый холодный чай со сладким вкусом сладкой ваты – настоящая изюминка."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea"
  },
  {
    "id": "d_hit_7",
    "name": {
      "DE": "Kaktus Feige",
      "EN": "Cactus Fig",
      "TR": "Kaktüs İnciri",
      "FR": "Figue de Barbarie",
      "ES": "higo de cactus",
      "RU": "Кактус инжир"
    },
    "price": 6.9,
    "description": {
      "DE": "Ein exotischer Genuss mit dem einzigartigen Aroma von Kaktusfeigen.",
      "EN": "An exotic treat with the unique aroma of cactus figs.",
      "TR": "Kaktüs incirinin eşsiz aromasıyla egzotik bir keyif.",
      "FR": "Un délice exotique à l'arôme unique de figue de Barbarie.",
      "ES": "Una delicia exótica con el aroma único de las tunas.",
      "RU": "Экзотическое наслаждение с неповторимым ароматом опунции."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Homemade Iced Tea"
  },
  {
    "id": "d_fh_1",
    "name": {
      "DE": "Hibiscus Orange Limo",
      "EN": "Hibiscus Orange Limo",
      "TR": "Hibiscus Orange Limo",
      "FR": "Limonade à l'hibiscus et à l'orange",
      "ES": "Limonada De Naranja Y Hibisco",
      "RU": "Гибискус апельсиновый лимонад"
    },
    "price": 6.9,
    "description": {
      "DE": "Orangensaft mit Hibiskustee und ein Hauch von Limettensaft - fruchtig und erfrischend.",
      "EN": "Orange juice with hibiscus tea and a hint of lime juice - fruity and refreshing.",
      "TR": "Portakal suyu, ebegümeci çayı ve bir dokunuş misket limonu - meyvemsi ve ferahlatıcı.",
      "FR": "Jus d'orange avec thé d'hibiscus et une touche de jus de citron vert - fruité et rafraîchissant.",
      "ES": "Zumo de naranja con té de hibisco y un toque de zumo de lima: afrutado y refrescante.",
      "RU": "Апельсиновый сок с чаем из гибискуса и оттенком сока лайма — фруктовый и освежающий."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_2",
    "name": {
      "DE": "53",
      "EN": "53",
      "TR": "53",
      "FR": "53",
      "ES": "53",
      "RU": "53"
    },
    "price": 6.9,
    "description": {
      "DE": "Ein exotischer Mix aus Maracujasaft, Rohrzucker, Jasmintee und frischer Minze - pure Harmonie im Glas.",
      "EN": "An exotic mix of passion fruit juice, cane sugar, jasmine tea and fresh mint - pure harmony in a glass.",
      "TR": "Çarkıfelek meyvesi suyu, esmer şeker, yasemin çayı ve taze nanenin egzotik karışımı - bardakta saf uyum.",
      "FR": "Un mélange exotique de jus de fruit de la passion, de sucre de canne, de thé au jasmin et de menthe fraîche - une pure harmonie dans un verre.",
      "ES": "Una mezcla exótica de zumo de maracuyá, azúcar de caña, té de jazmín y menta fresca: pura armonía en un vaso.",
      "RU": "Экзотическая смесь сока маракуйи, тростникового сахара, жасминового чая и свежей мяты – чистая гармония в бокале."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_3",
    "name": {
      "DE": "Blue Wonder",
      "EN": "Blue Wonder",
      "TR": "Blue Wonder",
      "FR": "Merveille bleue",
      "ES": "maravilla azul",
      "RU": "Голубое чудо"
    },
    "price": 6.9,
    "description": {
      "DE": "Jasmin- und blauer Blütentee treffen auf Aloe Vera und frische Blaubeeren - ein wahrer Genuss für die Sinne.",
      "EN": "Jasmine and blue blossom tea meet aloe vera and fresh blueberries - a real treat for the senses.",
      "TR": "Yasemin ve mavi çiçek çayı, aloe vera ve taze yaban mersini ile buluşuyor - duyular için gerçek bir şölen.",
      "FR": "Le thé au jasmin et aux fleurs bleues rencontre l'aloe vera et les myrtilles fraîches - un véritable régal pour les sens.",
      "ES": "El té de jazmín y flores azules se combina con aloe vera y arándanos frescos: un verdadero placer para los sentidos.",
      "RU": "Жасминовый и синий цветочный чай сочетаются с алоэ вера и свежей черникой — настоящее наслаждение для чувств."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_4",
    "allergens": ["G"],
    "name": {
      "DE": "Softy Gold",
      "EN": "Softy Gold",
      "TR": "Softy Gold",
      "FR": "Doux Or",
      "ES": "Oro suave",
      "RU": "Мягкое золото"
    },
    "price": 6.9,
    "description": {
      "DE": "Cremige Kombination aus frischen Mangostückchen, Joghurt, Zucker und Milch - tropisch und samtig.",
      "EN": "Creamy combination of fresh mango pieces, yogurt, sugar and milk - tropical and velvety.",
      "TR": "Taze mango parçaları, yoğurt, şeker ve sütün kremsi kombinasyonu - tropikal ve kadifemsi.",
      "FR": "Combinaison crémeuse de morceaux de mangue fraîche, de yaourt, de sucre et de lait - tropicale et veloutée.",
      "ES": "Cremosa combinación de trozos de mango fresco, yogur, azúcar y leche: tropical y aterciopelada.",
      "RU": "Сливочное сочетание кусочков свежего манго, йогурта, сахара и молока – тропическое и бархатистое."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_5",
    "name": {
      "DE": "Aloe Vera",
      "EN": "Aloe Vera",
      "TR": "Aloe Vera",
      "FR": "Aloé vera",
      "ES": "Áloe vera",
      "RU": "Алоэ вера"
    },
    "price": 6.9,
    "description": {
      "DE": "Reiner Aloe-Vera-Drink für eine erfrischende und gesunde Auszeit.",
      "EN": "Pure aloe vera drink for a refreshing and healthy break.",
      "TR": "Ferahlatıcı ve sağlıklı bir mola için saf aloe vera içeceği.",
      "FR": "Boisson pure à l'aloe vera pour une pause rafraîchissante et saine.",
      "ES": "Bebida pura de aloe vera para un descanso refrescante y saludable.",
      "RU": "Напиток из чистого алоэ вера для освежающего и здорового отдыха."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_6",
    "allergens": ["G"],
    "name": {
      "DE": "Berry Yakult Peach Limo",
      "EN": "Berry Yakult Peach Limo",
      "TR": "Berry Yakult Peach Limo",
      "FR": "Limonade aux pêches et aux baies Yakult",
      "ES": "Limonada de melocotón y bayas Yakult",
      "RU": "Ягодный Якулт Персиковый Лимонад"
    },
    "price": 7.4,
    "description": {
      "DE": "Frische Beeren, kombiniert mit Yakult und Whitepeach - eine spritzige und fruchtige Spezialität.",
      "EN": "Fresh berries combined with Yakult and white peach - a sparkling and fruity specialty.",
      "TR": "Yakult ve beyaz şeftali ile birleştirilmiş taze meyveler - canlı ve meyveli bir spesiyalite.",
      "FR": "Des baies fraîches associées au Yakult et à la Whitepeach – une spécialité acidulée et fruitée.",
      "ES": "Bayas frescas combinadas con Yakult y Whitepeach: una especialidad picante y afrutada.",
      "RU": "Свежие ягоды в сочетании с Якультом и Уайтперсиком — пикантный и фруктовый деликатес."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_7",
    "name": {
      "DE": "Pink Lover",
      "EN": "Pink Lover",
      "TR": "Pink Lover",
      "FR": "Amant rose",
      "ES": "Amante rosa",
      "RU": "Розовый любовник"
    },
    "price": 7.4,
    "description": {
      "DE": "Eine bezaubernde Mischung aus Mineralwasser, frischem Zitronensaft und Drachenfruchtpüree.",
      "EN": "An enchanting mixture of mineral water, fresh lemon juice and dragon fruit puree.",
      "TR": "Maden suyu, taze limon suyu ve ejder meyvesi püresinin büyüleyici bir karışımı.",
      "FR": "Un mélange enchanteur d'eau minérale, de jus de citron frais et de purée de fruit du dragon.",
      "ES": "Una encantadora mezcla de agua mineral, jugo de limón fresco y puré de fruta del dragón.",
      "RU": "Очаровательная смесь минеральной воды, свежевыжатого лимонного сока и пюре из драконьего фрукта."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "d_fh_8",
    "allergens": ["G"],
    "name": {
      "DE": "Rosé",
      "EN": "Rosé",
      "TR": "Rosé",
      "FR": "Rose",
      "ES": "Rosa",
      "RU": "Роза"
    },
    "price": 7.4,
    "description": {
      "DE": "Frische Beeren, Kokosnussmilch, Holunderblütensirup, Hibiskustee.",
      "EN": "Fresh berries, coconut milk, elderflower syrup, hibiscus tea.",
      "TR": "Taze meyveler, hindistan cevizi sütü, mürver çiçeği şurubu, ebegümeci çayı.",
      "FR": "Baies fraîches, lait de coco, sirop de fleur de sureau, thé d'hibiscus.",
      "ES": "Bayas frescas, leche de coco, sirope de flor de saúco, té de hibisco.",
      "RU": "Свежие ягоды, кокосовое молоко, сироп бузины, чай из каркаде."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Fresh Homemade"
  },
  {
    "id": "f_burger_1",
    "allergens": ["A", "G"],
    "name": {
      "DE": "Truffle Blue Burger",
      "EN": "Truffle Blue Burger",
      "TR": "Truffle Blue Burger",
      "FR": "Burgers bleus à la truffe",
      "ES": "Hamburguesas De Trufa Azul",
      "RU": "Трюфельно-голубые бургеры"
    },
    "price": 14.9,
    "description": {
      "DE": "Rindfleisch-Patty, überbacken mit Gorgonzola, kombiniert mit Blattsalat, Zwiebeln und Trüffel-Mayonnaise. Serviert mit Süßkartoffel-Pommes.\nExtra Beef Patty: +3,00 €",
      "EN": "Beef patty, baked with Gorgonzola, combined with lettuce, onions and truffle mayonnaise. Served with sweet potato fries.\nExtra Beef Patty: +3,00 €",
      "TR": "Gorgonzola ile fırınlanmış dana köftesi, marul, soğan ve trüf mayonezi ile. Tatlı patates kızartması ile servis edilir.\nEkstra Dana Köftesi: +3,00 €",
      "FR": "Galette de bœuf gratinée au Gorgonzola, accompagnée de laitue, d'oignons et de mayonnaise aux truffes. Servi avec des frites de patates douces.\nGalette de bœuf supplémentaire : +3,00 €",
      "ES": "Hamburguesa de ternera gratinada con Gorgonzola, combinada con lechuga, cebolla y mayonesa de trufa. Servido con batatas fritas.\nEmpanada de ternera extra: +3,00 €",
      "RU": "Котлета из говядины, запеченная с горгонзолой, в сочетании с салатом, луком и трюфельным майонезом. Подается с картофелем фри из сладкого картофеля.\nДополнительная котлета из говядины: +3,00 €"
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Burger Gerichte",
    "tags": [
      "meat",
      "intense",
      "premium"
    ]
  },
  {
    "id": "f_burger_2",
    "allergens": ["A", "G"],
    "name": {
      "DE": "Crispy Chicken Delight",
      "EN": "Crispy Chicken Delight",
      "TR": "Crispy Chicken Delight",
      "FR": "Délice de poulet croustillant",
      "ES": "Delicia de pollo crujiente",
      "RU": "Хрустящие куриные деликатесы"
    },
    "price": 13.5,
    "description": {
      "DE": "Knuspriges Hähnchenfilet, belegt mit Blattsalat, Strauchtomaten, Gewürzgurken und unserer speziellen Burger-Sauce. Serviert mit Pommes.\nExtra Chicken Patty: +3,00 €",
      "EN": "Crispy chicken fillet, topped with lettuce, vine tomatoes, pickles and our special burger sauce. Served with fries.\nExtra Chicken Patty: +3,00 €",
      "TR": "Marul, salkım domates, kornişon turşu ve özel burger sosumuzla hazırlanan çıtır tavuk fileto. Patates kızartması ile servis edilir.\nEkstra Tavuk Köftesi: +3,00 €",
      "FR": "Filet de poulet croustillant, garni de laitue, de tomates en grappe, de cornichons et de notre sauce spéciale burger. Servi avec des frites.\nGalette de poulet supplémentaire : +3,00 €",
      "ES": "Filete de pollo crujiente, cubierto con lechuga, tomates en rama, pepinillos y nuestra salsa especial para hamburguesas. Servido con papas fritas.\nEmpanada de pollo extra: +3,00 €",
      "RU": "Хрустящее куриное филе, украшенное листьями салата, томатами, солеными огурцами и нашим фирменным соусом для бургера. Подается с картофелем фри.\nДополнительная куриная котлета: +3,00 €"
    },
    "imageUrl": "/images/menury_originals/burger_gerichte__crispy_chicken_delight.webp",
    "category": "food",
    "subcategory": "Burger Gerichte",
    "tags": [
      "meat",
      "crispy"
    ]
  },
  {
    "id": "f_burger_3",
    "allergens": ["A", "G"],
    "name": {
      "DE": "Classic Cheeseburger",
      "EN": "Classic Cheeseburger",
      "TR": "Classic Cheeseburger",
      "FR": "Cheeseburgers classiques",
      "ES": "Hamburguesas con queso clásicas",
      "RU": "Классические чизбургеры"
    },
    "price": 13.9,
    "description": {
      "DE": "Ein saftiges Rindfleisch-Patty mit Chesterkäse, Blattsalat, Tomaten, Zwiebeln und Gewürzgurken, abgerundet mit unserer Burger-Sauce. Serviert mit Pommes.\nExtra Beef Patty: +3,00 €",
      "EN": "A juicy beef patty with Chester cheese, lettuce, tomatoes, onions and pickles, rounded off with our burger sauce. Served with fries.\nExtra Beef Patty: +3,00 €",
      "TR": "Chester peyniri, marul, domates, soğan, kornişon turşu ve özel burger sosumuzla taçlandırılmış sulu dana köftesi. Patates kızartması ile servis edilir.\nEkstra Dana Köftesi: +3,00 €",
      "FR": "Une galette de bœuf juteuse avec du fromage Chester, de la laitue, des tomates, des oignons et des cornichons, le tout agrémenté de notre sauce burger. Servi avec des frites.\nGalette de bœuf supplémentaire : +3,00 €",
      "ES": "Una jugosa hamburguesa de ternera con queso Chester, lechuga, tomates, cebollas y pepinillos, rematada con nuestra salsa para hamburguesas. Servido con papas fritas.\nEmpanada de ternera extra: +3,00 €",
      "RU": "Сочная говяжья котлета с сыром Честер, листьями салата, помидорами, луком и солеными огурцами, заправленная нашим соусом для бургера. Подается с картофелем фри.\nДополнительная котлета из говядины: +3,00 €"
    },
    "imageUrl": "/images/menury_originals/burger_gerichte__classic_cheeseburger.webp",
    "category": "food",
    "subcategory": "Burger Gerichte",
    "tags": [
      "meat",
      "classic"
    ]
  },
  {
    "id": "f_burger_4",
    "name": {
      "DE": "Veggie Grill Burger",
      "EN": "Veggie Grill Burger",
      "TR": "Veggie Grill Burger",
      "FR": "Burgers végétariens grillés",
      "ES": "Hamburguesas vegetarianas a la parrilla",
      "RU": "Овощные бургеры на гриле"
    },
    "price": 13.5,
    "description": {
      "DE": "Hausgemachter Gemüse-Patty, saisonales Grillgemüse, Blattsalat, Avocado-Creme, Tomaten und Gewürzgurken. Serviert mit Pommes.",
      "EN": "Homemade vegetable patty, seasonal grilled vegetables, lettuce, avocado cream, tomatoes and pickles. Served with fries.",
      "TR": "Ev yapımı sebze köftesi, mevsimlik ızgara sebzeler, marul, avokado kreması, domates ve kornişon turşu. Patates kızartması ile servis edilir.",
      "FR": "Galette de légumes maison, légumes grillés de saison, laitue, crème d'avocat, tomates et cornichons. Servi avec des frites.",
      "ES": "Empanada de verduras casera, verduras de temporada asadas, lechuga, crema de aguacate, tomate y pepinillos. Servido con papas fritas.",
      "RU": "Домашняя овощная котлета, сезонные овощи на гриле, салат, крем из авокадо, помидоры и соленые огурцы. Подается с картофелем фри."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Burger Gerichte",
    "tags": [
      "vegetarian"
    ],
    "allergens": [
      "A"
    ]
  },
  {
    "id": "f_haupt_1",
    "allergens": ["A", "G", "H"],
    "name": {
      "DE": "Mexican Style Fajitas",
      "EN": "Mexican Style Fajitas",
      "TR": "Mexican Style Fajitas",
      "FR": "Fajitas à la mexicaine",
      "ES": "fajitas estilo mexicano",
      "RU": "фахитас в мексиканском стиле"
    },
    "price": 16.9,
    "description": {
      "DE": "Würzige Hähnchenbruststreifen, angebraten mit Paprika-Mix, Zwiebeln und Mais. Serviert mit Tortilla-Brot und drei Dips: Hummus, Sour Cream und Guacamole.\nOptional mit Argentinischem Rinderfilet (20,90 €)",
      "EN": "Spicy chicken breast strips, fried with mixed peppers, onions and corn. Served with tortilla bread and three dips: hummus, sour cream and guacamole.\nOptional with Argentine beef fillet (€20.90)",
      "TR": "Biber karışımı, soğan ve mısırla sotelenmiş baharatlı tavuk göğsü şeritleri. Tortilla ekmeği ve üç sos ile servis edilir: Humus, ekşi krema ve guacamole.\nİsteğe bağlı Arjantin dana bonfile ile (20,90 €)",
      "FR": "Lanières de poitrine de poulet épicées, frites avec un mélange de poivrons, oignons et maïs. Servi avec du pain tortilla et trois trempettes : houmous, crème sure et guacamole.\nEn option avec un filet de bœuf argentin (20,90 €)",
      "ES": "Tiras de pechuga de pollo picantes, fritas con una mezcla de pimientos, cebolla y maíz. Servido con pan de tortilla y tres dips: hummus, crema agria y guacamole.\nOpcional con solomillo de ternera argentina (20,90 €)",
      "RU": "Острые полоски куриной грудки, обжаренные со смесью перцев, луком и кукурузой. Подается с тортильей и тремя соусами: хумусом, сметаной и гуакамоле.\nПо желанию с филе аргентинской говядины (20,90 евро)"
    },
    "imageUrl": "/images/menury_originals/hauptgerichte__mexican_style_fajitas.webp",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "meat",
      "spicy"
    ],
  },
  {
    "id": "f_haupt_2",
    "name": {
      "DE": "Grillspieß Oriental",
      "EN": "Grillspieß Oriental",
      "TR": "Grillspieß Oriental",
      "FR": "Brochette de grillades orientales",
      "ES": "Brocheta de parrilla oriental",
      "RU": "Восточный шашлык-гриль"
    },
    "price": 16.9,
    "description": {
      "DE": "Saftig marinierter Hähnchenspieß, auf dem Lavagrill perfekt gegart. Serviert mit Basmati-Reis, gegrillter Paprika, Tomate und frischem Beilagensalat.\nMit Rosmarin Kartoffeln: 18,90 €",
      "EN": "Juicy marinated chicken skewer, cooked to perfection on the lava grill. Served with basmati rice, grilled peppers, tomatoes and a fresh side salad.\nWith rosemary potatoes: €18.90",
      "TR": "Lav ızgarasında mükemmel pişirilmiş sulu marine tavuk şiş. Basmati pirinci, ızgara biber, domates ve taze yan salata ile servis edilir.\nBiberiyeli patates ile: 18,90 €",
      "FR": "Brochette de poulet mariné juteux, cuit à la perfection sur le grill de lave. Servi avec du riz basmati, des poivrons grillés, des tomates et une salade fraîche.\nAux pommes de terre au romarin : 18,90 €",
      "ES": "Jugosa brocheta de pollo marinado, cocinada a la perfección en la parrilla de lava. Servido con arroz basmati, pimientos asados, tomates y ensalada fresca.\nCon patatas al romero: 18,90 €",
      "RU": "Сочный маринованный куриный шашлык, идеально приготовленный на лавовом гриле. Подается с рисом басмати, жареным перцем, помидорами и свежим салатом.\nС картофелем с розмарином: 18,90 евро."
    },
    "imageUrl": "/images/menury_originals/hauptgerichte__grillspiess_oriental.webp",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "meat",
      "classic"
    ]
  },
  {
    "id": "f_haupt_3",
    "allergens": ["G", "H"],
    "name": {
      "DE": "Türkische Grillköfte",
      "EN": "Turkish Grillköfte",
      "TR": "Türkische Grillköfte",
      "FR": "Kofta grillée turque",
      "ES": "Kofta parrilla turca",
      "RU": "Турецкий гриль-кофта"
    },
    "price": 16.9,
    "description": {
      "DE": "Traditionell gewürzte, gegrillte Köfte, wahlweise mit Basmati-Reis oder knusprigen Pommes. Dazu Beilagensalat, Hummus und eine scharfe Paste.\nMit Rosmarin Kartoffeln: 18,90 €",
      "EN": "Traditionally spiced, grilled meatballs, choice of basmati rice or crispy fries. Served with side salad, hummus and a spicy paste.\nWith rosemary potatoes: €18.90",
      "TR": "Geleneksel baharatlı, ızgara köfte, basmati pirinci veya çıtır patates kızartması seçeneğiyle. Yanında salata, humus ve acı ezme ile servis edilir.\nBiberiyeli patates ile: 18,90 €",
      "FR": "Kofta grillé traditionnellement assaisonné, avec du riz basmati ou des frites croustillantes. Plus une salade d'accompagnement, du houmous et une pâte épicée.\nAux pommes de terre au romarin : 18,90 €",
      "ES": "Kofta a la parrilla, sazonada tradicionalmente, con arroz basmati o patatas fritas crujientes. Además de ensalada, hummus y una pasta picante.\nCon patatas al romero: 18,90 €",
      "RU": "Традиционно приправленная кофта на гриле с рисом басмати или хрустящим картофелем фри. Плюс гарнир, хумус и острая паста.\nС картофелем с розмарином: 18,90 евро."
    },
    "imageUrl": "/images/menury_originals/hauptgerichte__tuerkische_grillkoefte.webp",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "meat",
      "classic"
    ]
  },
  {
    "id": "f_haupt_4",
    "allergens": ["A", "G"],
    "name": {
      "DE": "Goldenes Hähnchenschnitzel",
      "EN": "Golden Chicken Schnitzel",
      "TR": "Goldenes Hähnchenschnitzel",
      "FR": "Escalope de poulet dorée",
      "ES": "Escalope de pollo dorado",
      "RU": "Золотой куриный шницель"
    },
    "price": 16.9,
    "description": {
      "DE": "Knusprig paniertes Hähnchenschnitzel, serviert mit Champignon-Sahnesauce, knusprigen Pommes und frischem Beilagensalat.\nMit Rosmarin-Kartoffeln statt Pommes: 18,90 €",
      "EN": "Crispy breaded chicken schnitzel, served with mushroom cream sauce, crispy fries and fresh side salad.\nWith rosemary potatoes instead of fries: €18.90",
      "TR": "Çıtır panelenmiş tavuk şinitzel; mantarlı krema sosu, çıtır patates kızartması ve taze yan salata ile servis edilir.\nPatates kızartması yerine biberiyeli patates ile: 18,90 €",
      "FR": "Escalope de poulet panée croustillante, servie avec une sauce à la crème aux champignons, des frites croustillantes et une salade fraîche.\nAvec pommes de terre au romarin au lieu des frites : 18,90 €",
      "ES": "Schnitzel de pollo empanizado crujiente, servido con salsa de crema de champiñones, papas fritas crujientes y ensalada fresca.\nCon patatas al romero en lugar de papas fritas: 18,90 €",
      "RU": "Хрустящий куриный шницель в панировке, подается со сливочно-грибным соусом, хрустящим картофелем фри и свежим гарниром.\nС картофелем с розмарином вместо картофеля фри: 18,90 €"
    },
    "imageUrl": "/images/menury_originals/hauptgerichte__goldenes_haehnchenschnitzel.webp",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "meat",
      "crispy"
    ]
  },
  {
    "id": "f_haupt_5",
    "allergens": ["G"],
    "name": {
      "DE": "Pfefferhähnchen-Traum",
      "EN": "Pepper Chicken Dream",
      "TR": "Pfefferhähnchen-Traum",
      "FR": "Rêve de poulet au poivre",
      "ES": "Soñar con pollo a la pimienta",
      "RU": "Куриный сон с перцем"
    },
    "price": 16.9,
    "description": {
      "DE": "Zartes Hähnchengeschnetzeltes mit grünen Erbsen und Champignons, verfeinert in einer cremigen Pfeffer-Rahmsauce. Serviert mit duftendem Basmati-Reis.",
      "EN": "Tender sliced chicken with green peas and mushrooms, refined in a creamy pepper sauce. Served with fragrant basmati rice.",
      "TR": "Yeşil bezelye ve mantarlı, kremsi biber sosuyla tatlandırılmış yumuşak dilimlenmiş tavuk. Mis kokulu basmati pirinci ile servis edilir.",
      "FR": "Tendres lanières de poulet aux petits pois et champignons, affinées dans une sauce crémeuse au poivre et à la crème. Servi avec du riz basmati parfumé.",
      "ES": "Tiernas tiras de pollo con guisantes y champiñones, refinadas en una cremosa salsa de crema de pimientos. Servido con arroz basmati aromático.",
      "RU": "Нежные куриные стрипсы с зеленым горошком и грибами, изысканные в сливочно-перечно-сливочном соусе. Подается с ароматным рисом басмати."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "meat",
      "creamy"
    ]
  },
  {
    "id": "f_haupt_6",
    "name": {
      "DE": "Zarter Grilllachs",
      "EN": "Tender Grilled Salmon",
      "TR": "Zarter Grilllachs",
      "FR": "Tendre saumon grillé",
      "ES": "Salmón tierno a la parrilla",
      "RU": "Нежный лосось на гриле"
    },
    "price": 21.9,
    "description": {
      "DE": "Zart mariniertes Lachsfilet vom Grill, serviert mit Rosmarinkartoffeln, gegrilltem Gemüse und einem frischen Beilagensalat.",
      "EN": "Tender marinated salmon fillet from the grill, served with rosemary potatoes, grilled vegetables and a fresh side salad.",
      "TR": "Izgarada yumuşak marine edilmiş somon fileto; biberiyeli patates, ızgara sebzeler ve taze yan salata ile servis edilir.",
      "FR": "Filet de saumon grillé délicatement mariné, servi avec pommes de terre au romarin, légumes grillés et salade fraîche.",
      "ES": "Filete de salmón a la parrilla delicadamente marinado, servido con papas al romero, vegetales asados ​​y ensalada fresca.",
      "RU": "Нежно маринованное филе лосося на гриле, подается с картофелем с розмарином, овощами-гриль и свежим салатом."
    },
    "imageUrl": "/images/menury_originals/hauptgerichte__zarter_grilllachs.webp",
    "category": "food",
    "subcategory": "Hauptgerichte",
    "tags": [
      "fish",
      "premium"
    ],
    "allergens": [
      "D"
    ]
  },
  {
    "id": "f_bowl_1",
    "name": {
      "DE": "Rinderfilet Bowl",
      "EN": "Beef Balance Bowl",
      "TR": "Beef Balance Bowl",
      "FR": "Bol de filet de boeuf",
      "ES": "Tazón de filete de ternera",
      "RU": "Чаша из говяжьего филе"
    },
    "price": 16.9,
    "description": {
      "DE": "Marinierte Scheiben von zartem Rinderfilet, auf Basmati-Reis, Mais, Hummus, gemischtem Salat und Paprika, abgerundet mit Cherrytomaten und Honig-Senf-Dressing.",
      "EN": "Marinated slices of tender beef fillet on basmati rice, corn, hummus, mixed salad and peppers, rounded off with cherry tomatoes and honey-mustard dressing.",
      "TR": "Basmati pirinci, mısır, humus, karışık salata ve biber üzerinde yumuşak dana bonfile dilimleri; çeri domates ve ballı hardal sosuyla taçlandırılmış.",
      "FR": "Tranches de filet de bœuf tendre marinées sur riz basmati, maïs, houmous, salade composée et poivrons, le tout agrémenté de tomates cerises et vinaigrette moutarde au miel.",
      "ES": "Rebanadas de filete de res tierno marinadas sobre arroz basmati, maíz, hummus, ensalada mixta y pimientos, rematadas con tomates cherry y aderezo de mostaza y miel.",
      "RU": "Маринованные кусочки нежного говяжьего филе с рисом басмати, кукурузой, хумусом, микс-салатом и перцем, дополненные помидорами черри и медово-горчичным соусом."
    },
    "imageUrl": "/images/menury_originals/bowls_and_salate__beef_balance_bowl.webp",
    "category": "food",
    "subcategory": "Bowls & Salate",
    "tags": [
      "meat",
      "fresh",
      "healthy"
    ],
    "allergens": [
      "F",
      "G",
      "H"
    ]
  },
  {
    "id": "f_bowl_2",
    "name": {
      "DE": "Hähnchen Bowl",
      "EN": "Chicken Power Bowl",
      "TR": "Chicken Power Bowl",
      "FR": "Bol de poulet",
      "ES": "tazón de pollo",
      "RU": "Куриная миска"
    },
    "price": 14.9,
    "description": {
      "DE": "Zart marinierte Hähnchenbruststücke auf Basmati-Reis, kombiniert mit Edamamebohnen, Paprika, Avocado, Humus, Cherrytomaten, Mais und Gurken. Abgerundet mit einem cremigen Honig-Senf-Dressing.",
      "EN": "Tender marinated chicken breast pieces on basmati rice, combined with edamame beans, peppers, avocado, hummus, cherry tomatoes, corn and cucumber. Rounded off with a creamy honey-mustard dressing.",
      "TR": "Basmati pirinci üzerinde yumuşak marine edilmiş tavuk göğsü parçaları; edamame fasulyesi, biber, avokado, humus, çeri domates, mısır ve salatalık ile. Kremsi ballı hardal sosuyla tamamlanmış.",
      "FR": "Morceaux de poitrine de poulet tendrement marinés sur riz basmati, combinés avec des haricots edamame, des poivrons, de l'avocat, du houmous, des tomates cerises, du maïs et du concombre. Terminé avec une vinaigrette crémeuse au miel et à la moutarde.",
      "ES": "Trozos de pechuga de pollo tiernamente marinados sobre arroz basmati, combinados con frijoles edamame, pimientos, aguacate, hummus, tomates cherry, maíz y pepino. Terminado con un aderezo cremoso de mostaza y miel.",
      "RU": "Нежно маринованные кусочки куриной грудки на рисе басмати в сочетании с фасолью эдамаме, перцем, авокадо, хумусом, помидорами черри, кукурузой и огурцом. Завершается сливочно-медово-горчичным соусом."
    },
    "imageUrl": "/images/menury_originals/bowls_and_salate__chicken_power_bowl.webp",
    "category": "food",
    "subcategory": "Bowls & Salate",
    "tags": [
      "meat",
      "fresh",
      "healthy"
    ],
    "allergens": [
      "F",
      "M"
    ]
  },
  {
    "id": "f_bowl_3",
    "name": {
      "DE": "Lachs Bowl",
      "EN": "Salmon Energy Bowl",
      "TR": "Salmon Energy Bowl",
      "FR": "Bol de saumon",
      "ES": "cuenco de salmón",
      "RU": "Чаша с лососем"
    },
    "price": 15.9,
    "description": {
      "DE": "Frisch gegrillter Lachs auf duftendem Basmati-Reis, serviert mit Edamamebohnen, Avocado, Humus, Paprika, Mais, Gurken, Cherrytomaten und Honig-Senf-Dressing.",
      "EN": "Freshly grilled salmon on fragrant basmati rice, served with edamame beans, avocado, hummus, peppers, corn, cucumber, cherry tomatoes and honey-mustard dressing.",
      "TR": "Mis kokulu basmati pirinci üzerinde taze ızgara somon; edamame fasulyesi, avokado, humus, biber, mısır, salatalık, çeri domates ve ballı hardal sosuyla servis edilir.",
      "FR": "Saumon fraîchement grillé sur riz basmati parfumé, servi avec haricots edamame, avocat, houmous, poivrons, maïs, concombre, tomates cerises et vinaigrette moutarde au miel.",
      "ES": "Salmón recién asado sobre fragante arroz basmati, servido con frijoles edamame, aguacate, hummus, pimientos, maíz, pepino, tomates cherry y aderezo de mostaza y miel.",
      "RU": "Свежезапеченный лосось на ароматном рисе басмати, подается с фасолью эдамаме, авокадо, хумусом, перцем, кукурузой, огурцом, помидорами черри и медово-горчичным соусом."
    },
    "imageUrl": "/images/menury_originals/bowls_and_salate__salmon_energy_bowl.webp",
    "category": "food",
    "subcategory": "Bowls & Salate",
    "tags": [
      "fish",
      "fresh",
      "healthy"
    ],
    "allergens": [
      "D",
      "F"
    ]
  },
  {
    "id": "f_bowl_4",
    "name": {
      "DE": "Classic Caesar Salad",
      "EN": "Classic Caesar Salad",
      "TR": "Classic Caesar Salad",
      "FR": "Salade César Classique",
      "ES": "Ensalada César Clásica",
      "RU": "Классический салат Цезарь"
    },
    "price": 14.9,
    "description": {
      "DE": "Knackiger Römersalat mit marinierten Hähnchenbruststreifen, Cherrytomaten, Gurken, knusprigen Croutons und einem cremigen Caesar-Dressing.",
      "EN": "Crisp romaine lettuce with marinated chicken breast strips, cherry tomatoes, cucumbers, crispy croutons and a creamy Caesar dressing.",
      "TR": "Marine tavuk göğsü şeritleri, çeri domates, salatalık, çıtır kruton ve kremsi Sezar soslu çıtır marul salatası.",
      "FR": "Laitue romaine croquante avec lanières de poitrine de poulet marinées, tomates cerises, concombres, croûtons croustillants et vinaigrette César crémeuse.",
      "ES": "Lechuga romana crujiente con tiras de pechuga de pollo marinadas, tomates cherry, pepinos, picatostes crujientes y un cremoso aderezo César.",
      "RU": "Хрустящий салат ромэн с маринованными полосками куриной грудки, помидорами черри, огурцами, хрустящими гренками и сливочным соусом «Цезарь»."
    },
    "imageUrl": "/images/menury_originals/bowls_and_salate__classic_caesar_salad.webp",
    "category": "food",
    "subcategory": "Bowls & Salate",
    "tags": [
      "meat",
      "fresh"
    ],
    "allergens": [
      "A",
      "D",
      "G"
    ]
  },
  {
    "id": "f_pasta_1",
    "name": {
      "DE": "Oriental Manti",
      "EN": "Oriental Manti",
      "TR": "Oriental Manti",
      "FR": "Mante orientale",
      "ES": "mantí oriental",
      "RU": "Восточные манты"
    },
    "price": 12.9,
    "description": {
      "DE": "Traditionelle, gefüllte Teigtaschen mit Rinderhackfleisch, serviert mit cremigem Joghurt, Knoblauch und Paprikatomatensoße. Verfeinert mit getrockneter Minze.",
      "EN": "Traditional dumplings filled with minced beef, served with creamy yogurt, garlic and paprika-tomato sauce. Refined with dried mint.",
      "TR": "Dana kıymalı geleneksel mantı; sarımsaklı kremsi yoğurt ve biberli domates sosu ile servis edilir. Kuru nane ile tatlandırılmış.",
      "FR": "Dumplings traditionnels fourrés au bœuf haché, servis avec du yaourt crémeux, de l'ail et une sauce tomate poivrée. Affiné avec de la menthe séchée.",
      "ES": "Tradicionales dumplings rellenos de carne molida, servidos con salsa cremosa de yogurt, ajo y tomate pimiento. Refinado con menta seca.",
      "RU": "Традиционные пельмени с начинкой из говяжьего фарша, подаются со сливочным йогуртом, чесноком и томатным соусом с перцем. Утончен сушеной мятой."
    },
    "imageUrl": "/images/menury_originals/pasta_gerichte__oriental_manti.webp",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "classic",
      "meat"
    ],
    "allergens": [
      "A",
      "C",
      "G"
    ]
  },
  {
    "id": "f_pasta_2",
    "name": {
      "DE": "Oven-Baked Gnocchi",
      "EN": "Oven-Baked Gnocchi",
      "TR": "Oven-Baked Gnocchi",
      "FR": "Gnocchis au four",
      "ES": "ñoquis al horno",
      "RU": "Ньокки, запеченные в духовке"
    },
    "price": 12.9,
    "description": {
      "DE": "Zarte Gnocchi in einer cremigen Tomaten-Sahnesoße, mit herzhaftem Käse überbacken - perfekt für Vegetarier und Liebhaber italienischer Klassiker.",
      "EN": "Tender gnocchi in a creamy tomato-cream sauce, baked with hearty cheese - perfect for vegetarians and lovers of Italian classics.",
      "TR": "Kremsi domates-krema soslu, doyurucu peynirle fırınlanmış yumuşak gnocchi - vejetaryenler ve İtalyan klasikleri sevenler için mükemmel.",
      "FR": "De tendres gnocchis dans une sauce crémeuse à la crème de tomates, cuits avec du fromage copieux - parfaits pour les végétariens et les amateurs de classiques italiens.",
      "ES": "Tiernos ñoquis en una cremosa salsa de tomate, horneados con abundante queso, perfectos para vegetarianos y amantes de los clásicos italianos.",
      "RU": "Нежные ньокки в сливочно-томатно-сливочном соусе, запеченные с сытным сыром – идеальны для вегетарианцев и любителей итальянской классики."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "vegetarian",
      "creamy"
    ],
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "f_pasta_3",
    "name": {
      "DE": "Your Favorite",
      "EN": "Your Favorite",
      "TR": "Your Favorite",
      "FR": "Votre favori",
      "ES": "Tu favorito",
      "RU": "Ваш любимый"
    },
    "price": 13.9,
    "description": {
      "DE": "Penne-Nudeln mit knusprig panierten Hähnchenstücken in einer cremigen Tomaten-Sahnesoße - ein echter Klassiker!",
      "EN": "Penne pasta with crispy breaded chicken pieces in a creamy tomato-cream sauce - a real classic!",
      "TR": "Kremsi domates-krema sosunda çıtır panelenmiş tavuk parçalarıyla penne makarna - gerçek bir klasik!",
      "FR": "Pâtes penne avec des morceaux de poulet panés croustillants dans une sauce crémeuse à la crème de tomate - un vrai classique !",
      "ES": "Pasta penne con trozos de pollo empanizados crujientes en una cremosa salsa de crema de tomate: ¡un verdadero clásico!",
      "RU": "Паста Пенне с хрустящими кусочками курицы в панировке в сливочно-томатно-сливочном соусе – настоящая классика!"
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "meat",
      "creamy"
    ],
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "f_pasta_4",
    "allergens": ["A", "G"],
    "name": {
      "DE": "Creamy Chicken Penne (Penne-Pollo)",
      "EN": "Creamy Chicken Penne",
      "TR": "Creamy Chicken Penne",
      "FR": "Penne crémeuse au poulet (Penne Pollo)",
      "ES": "Penne De Pollo Cremoso (Penne Pollo)",
      "RU": "Сливочный куриный пенне (Пенне Полло)"
    },
    "price": 13.9,
    "description": {
      "DE": "Penne-Nudeln mit Hähnchenbruststreifen, Champignons und Brokkoli, wahlweise in Sahne-, Tomatensahne- oder Tomatensoße. Getoppt mit Parmesan.\nMit knusprig panierten Hähnchenstücken: 14,90 €",
      "EN": "Penne pasta with chicken breast strips, mushrooms and broccoli, choice of cream, tomato-cream or tomato sauce. Topped with Parmesan.\nWith crispy breaded chicken pieces: €14.90",
      "TR": "Tavuk göğsü şeritleri, mantar ve brokoli ile penne makarna; krema, domates-krema veya domates sosu seçeneğiyle. Parmesan ile taçlandırılmış.\nÇıtır panelenmiş tavuk parçaları ile: 14,90 €",
      "FR": "Penne avec lanières de poitrine de poulet, champignons et brocoli, au choix à la crème, à la crème de tomate ou à la sauce tomate. Garni de parmesan.\nAvec des morceaux de poulet panés croustillants : 14,90 €",
      "ES": "Pasta penne con tiras de pechuga de pollo, champiñones y brócoli, opcionalmente en nata, crema de tomate o salsa de tomate. Cubierto con parmesano.\nCon trozos de pollo empanados crujientes: 14,90 €",
      "RU": "Паста пенне с полосками куриной грудки, грибами и брокколи, по желанию в сливках, томатном креме или томатном соусе. Украшен пармезаном.\nС кусочками курицы в хрустящей панировке: 14,90 евро."
    },
    "imageUrl": "/images/menury_originals/pasta_gerichte__creamy_chicken_penne_penne_pollo.webp",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "meat",
      "creamy"
    ],
  },
  {
    "id": "f_pasta_5",
    "name": {
      "DE": "Rigatoni Creamy Sucuk",
      "EN": "Rigatoni Creamy Sucuk",
      "TR": "Rigatoni Creamy Sucuk",
      "FR": "Rigatoni Sucuk Crémeux",
      "ES": "Rigatoni Sucuk Cremoso",
      "RU": "Ригатони Сливочный Сучук"
    },
    "price": 12.9,
    "description": {
      "DE": "Al dente gekochte Rigatoni in einer herrlich cremigen Tomaten-Sahnesauce, verfeinert mit der kräftigen Würze von gebratener Premium-Sucuk und Paprika. Garniert mit frisch geriebenem Parmesan, fruchtigen Kirschtomaten und knackigem Rucola.",
      "EN": "Al dente cooked rigatoni in a wonderfully creamy tomato-cream sauce, refined with the strong flavor of fried premium sucuk and peppers. Garnished with freshly grated Parmesan, fruity cherry tomatoes and crisp arugula.",
      "TR": "Kızartılmış birinci sınıf sucuk ve biberin güçlü aromasıyla tatlandırılmış, harika kremsi domates-krema sosunda al dente pişmiş rigatoni. Taze rendelenmiş Parmesan, meyvemsi çeri domates ve çıtır roka ile süslenmiş.",
      "FR": "Rigatoni cuits al dente dans une sauce à la crème de tomate merveilleusement crémeuse, raffinée avec les épices fortes du sucuk frit de première qualité et des poivrons. Garni de parmesan fraîchement râpé, de tomates cerises fruitées et de roquette croquante.",
      "ES": "Rigatoni cocinado al dente en una maravillosa y cremosa salsa de tomate, refinada con el fuerte sabor del sucuk premium frito y pimientos. Adornado con parmesano recién rallado, tomates cherry afrutados y rúcula crujiente.",
      "RU": "Ригатони, приготовленный «аль денте», в чудесном сливочно-томатно-сливочном соусе, приправленном сильными пряностями жареного сукука премиум-класса и перца. Украшается свежим тертым пармезаном, фруктовыми помидорами черри и хрустящей рукколой."
    },
    "imageUrl": "/images/menury_originals/pasta_gerichte__rigatoni_creamy_sucuk.webp",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "meat",
      "creamy",
      "spicy"
    ],
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "f_pasta_6",
    "name": {
      "DE": "Rigatoni Creamy Chicken",
      "EN": "Rigatoni Creamy Chicken",
      "TR": "Rigatoni Creamy Chicken",
      "FR": "Rigatoni Poulet Crémeux",
      "ES": "Pollo Cremoso Rigatoni",
      "RU": "Ригатони со сливочной курицей"
    },
    "price": 13.9,
    "description": {
      "DE": "Rigatoni-Nudeln mit Hähnchenbruststreifen, Champignons und Brokkoli in Sahnesoße. Getoppt mit Parmesan.\nMit knusprig panierten Hähnchenstücken: 14,90 €",
      "EN": "Rigatoni pasta with chicken breast strips, mushrooms and broccoli in cream sauce. Topped with Parmesan.\nWith crispy breaded chicken pieces: €14.90",
      "TR": "Tavuk göğsü şeritleri, mantar ve brokoli ile krema soslu rigatoni makarna. Parmesan ile taçlandırılmış.\nÇıtır panelenmiş tavuk parçaları ile: 14,90 €",
      "FR": "Pâtes rigatoni avec lanières de poitrine de poulet, champignons et brocoli dans une sauce à la crème. Garni de parmesan.\nAvec des morceaux de poulet panés croustillants : 14,90 €",
      "ES": "Pasta rigatoni con tiras de pechuga de pollo, champiñones y brócoli en salsa de crema. Cubierto con parmesano.\nCon trozos de pollo empanados crujientes: 14,90 €",
      "RU": "Паста Ригатони с полосками куриной грудки, грибами и брокколи в сливочном соусе. Украшен пармезаном.\nС кусочками курицы в хрустящей панировке: 14,90 евро."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "meat",
      "creamy"
    ],
    "allergens": [
      "G"
    ],
    "additives": [
      "19"
    ]
  },
  {
    "id": "f_pasta_7",
    "name": {
      "DE": "Seafood Penne",
      "EN": "Seafood Penne",
      "TR": "Seafood Penne",
      "FR": "Pennes aux fruits de mer",
      "ES": "penne de mariscos",
      "RU": "Пенне с морепродуктами"
    },
    "price": 14.9,
    "description": {
      "DE": "Penne-Nudeln mit Scampi, Champignons und Parmesan, wahlweise in Sahne-, Tomatensahne- oder Tomatensoße. Ein Genuss für Meeresfrüchte-Fans!",
      "EN": "Penne pasta with scampi, mushrooms and Parmesan, choice of cream, tomato-cream or tomato sauce. A treat for seafood fans!",
      "TR": "Karides, mantar ve Parmesan ile penne makarna; krema, domates-krema veya domates sosu seçeneğiyle. Deniz ürünü severler için tam bir keyif!",
      "FR": "Penne aux langoustines, champignons et parmesan, éventuellement à la crème, crème de tomate ou sauce tomate. Un régal pour les amateurs de fruits de mer !",
      "ES": "Pasta penne con gambas, champiñones y parmesano, opcionalmente en nata, crema de tomate o salsa de tomate. ¡Un placer para los amantes del marisco!",
      "RU": "Паста пенне с креветками, грибами и пармезаном, по желанию в сливках, томатном креме или томатном соусе. Наслаждение для любителей морепродуктов!"
    },
    "imageUrl": "/images/menury_originals/pasta_gerichte__seafood_penne.webp",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "fish",
      "creamy"
    ],
    "allergens": [
      "A",
      "D",
      "G"
    ]
  },
  {
    "id": "f_pasta_8",
    "name": {
      "DE": "Pesto Scampi Penne",
      "EN": "Pesto Scampi Penne",
      "TR": "Pesto Karidesli Penne",
      "FR": "Penne de langoustines au pesto",
      "ES": "Penne con pesto y gambas",
      "RU": "Песто пенне с креветками"
    },
    "price": 14.9,
    "description": {
      "DE": "Penne mit saftigen Scampi, Brokkoli und getrockneten Tomaten, abgerundet mit einer Pesto-Soße.",
      "EN": "Penne with juicy scampi, broccoli and dried tomatoes, rounded off with a pesto sauce.",
      "TR": "Sulu karides, brokoli ve kurutulmuş domatesle penne; pesto sosuyla tamamlanmış.",
      "FR": "Penne aux langoustines juteuses, brocoli et tomates séchées, agrémentées d'une sauce au pesto.",
      "ES": "Penne con jugosas gambas, brócoli y tomates secos, rematado con salsa pesto.",
      "RU": "Пенне с сочными креветками, брокколи и сушеными помидорами, дополненными соусом песто."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "fish",
      "premium"
    ],
    "allergens": [
      "A",
      "D",
      "G"
    ]
  },
  {
    "id": "f_pasta_9",
    "name": {
      "DE": "Beef & Broccoli Penne",
      "EN": "Beef & Broccoli Penne",
      "TR": "Dana Etli & Brokolili Penne",
      "FR": "Penne au bœuf et au brocoli",
      "ES": "Penne de carne y brócoli",
      "RU": "Пенне из говядины и брокколи"
    },
    "price": 17.9,
    "description": {
      "DE": "Penne-Nudeln mit zarten Rinderfiletstreifen, Champignons und Brokkoli, wahlweise in Sahne-, Tomatensahne- oder Tomatensoße. Mit Parmesan verfeinert.",
      "EN": "Penne pasta with tender beef fillet strips, mushrooms and broccoli, choice of cream, tomato-cream or tomato sauce. Refined with Parmesan.",
      "TR": "Yumuşak dana bonfile şeritleri, mantar ve brokoli ile penne makarna; krema, domates-krema veya domates sosu seçeneğiyle. Parmesan ile tatlandırılmış.",
      "FR": "Pâtes penne avec de tendres lanières de filet de bœuf, champignons et brocolis, au choix à la crème, à la crème de tomate ou à la sauce tomate. Affiné avec du parmesan.",
      "ES": "Pasta penne con tiernas tiras de solomillo de ternera, champiñones y brócoli, opcionalmente en nata, crema de tomate o salsa de tomate. Refinado con parmesano.",
      "RU": "Паста пенне с нежными полосками говяжьего филе, грибами и брокколи, по желанию в сливках, томатном креме или томатном соусе. Утончен пармезаном."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Pasta Gerichte",
    "tags": [
      "meat",
      "premium"
    ],
    "allergens": [
      "A",
      "G",
      "L"
    ]
  },
  {
    "id": "food_starter_1",
    "name": {
      "DE": "Edamame",
      "EN": "Edamame",
      "TR": "Edamame",
      "FR": "Édamame",
      "ES": "Edamame",
      "RU": "Эдамаме"
    },
    "price": 5.5,
    "description": {
      "DE": "Gedämpfte Sojabohnen mit grobem Meersalz.",
      "EN": "Steamed soybeans with coarse sea salt.",
      "TR": "Kaba deniz tuzuyla buğulanmış soya fasulyesi.",
      "FR": "Soja cuit à la vapeur avec du gros sel marin.",
      "ES": "Soja al vapor con sal marina gruesa.",
      "RU": "Соевые бобы, приготовленные на пару с крупной морской солью."
    },
    "imageUrl": "/images/menury_originals/vorspeisen__edamame.webp",
    "category": "food",
    "subcategory": "Vorspeisen",
    "tags": [
      "vegetarian",
      "light"
    ],
    "allergens": [
      "F"
    ]
  },
  {
    "id": "food_starter_4",
    "name": {
      "DE": "Frühlingsrollen",
      "EN": "Spring Rolls",
      "TR": "Baharat Rulosu",
      "FR": "Rouleaux de printemps",
      "ES": "rollitos de primavera",
      "RU": "Спринг-роллы"
    },
    "price": 5.5,
    "description": {
      "DE": "Fünf knusprige, vegetarische Frühlingsrollen, serviert mit unserer süß-scharfen Chili-Sauce.",
      "EN": "Five crispy, vegetarian spring rolls, served with our sweet-spicy chili sauce.",
      "TR": "Tatlı-acı chili sosuyla servis edilen beş çıtır vejetaryen baharat rulosu.",
      "FR": "Cinq rouleaux de printemps végétariens croustillants, servis avec notre sauce chili sucrée et épicée.",
      "ES": "Cinco rollitos de primavera crujientes y vegetarianos, servidos con nuestra salsa de chile dulce y picante.",
      "RU": "Пять хрустящих вегетарианских блинчиков с начинкой, подаются со сладким и острым соусом чили."
    },
    "imageUrl": "/images/menury_originals/vorspeisen__fruehlingsrollen.webp",
    "category": "food",
    "subcategory": "Vorspeisen",
    "tags": [
      "vegetarian",
      "crispy"
    ],
    "allergens": [
      "A",
      "F"
    ]
  },
  {
    "id": "food_starter_2",
    "name": {
      "DE": "Acılı Ezme",
      "EN": "Spicy Tomato Ezme",
      "TR": "Acılı Ezme",
      "FR": "Acılı Ezme",
      "ES": "Acıli Ezme",
      "RU": "Аджилы Эзме"
    },
    "price": 5.5,
    "description": {
      "DE": "Würzige türkische Tomaten-Paprika-Paste, fein gehackt mit frischen Kräutern.",
      "EN": "Spicy Turkish tomato and pepper paste, finely chopped with fresh herbs.",
      "TR": "Taze otlarla ince kıyılmış, acı domates-biber ezmesi.",
      "FR": "Pâte de tomates et poivrons turcs épicés, finement hachés avec des herbes fraîches.",
      "ES": "Pasta turca picante de tomate y pimiento, finamente picada con hierbas frescas.",
      "RU": "Острая турецкая паста из томатов и перца, мелко нарезанная со свежей зеленью."
    },
    "imageUrl": "/images/menury_originals/vorspeisen__acili_ezme.webp",
    "category": "food",
    "subcategory": "Vorspeisen",
    "tags": [
      "vegetarian",
      "spicy"
    ]
  },
  {
    "id": "food_starter_3",
    "name": {
      "DE": "Hummus",
      "EN": "Hummus",
      "TR": "Humus",
      "FR": "Houmous",
      "ES": "Hummus",
      "RU": "Хумус"
    },
    "price": 5.5,
    "description": {
      "DE": "Cremiger Kichererbsen-Hummus mit Olivenöl, serviert mit warmem Fladenbrot.",
      "EN": "Creamy chickpea hummus with olive oil, served with warm flatbread.",
      "TR": "Zeytinyağlı kremsi nohut humusu, sıcak pide ile servis edilir.",
      "FR": "Houmous crémeux de pois chiches à l'huile d'olive, servi avec du pain pita chaud.",
      "ES": "Hummus cremoso de garbanzos con aceite de oliva, servido con pan pita tibio.",
      "RU": "Сливочный хумус из нута с оливковым маслом, подается с теплым лавашем."
    },
    "imageUrl": "/images/menury_originals/vorspeisen__hummus.webp",
    "category": "food",
    "subcategory": "Vorspeisen",
    "tags": [
      "vegetarian"
    ],
    "allergens": [
      "H"
    ]
  },
  {
    "id": "food_soup_1",
    "name": {
      "DE": "Linsensuppe",
      "EN": "Lentil Soup",
      "TR": "Mercimek Çorbası",
      "FR": "Soupe aux lentilles",
      "ES": "sopa de lentejas",
      "RU": "Чечевичный суп"
    },
    "price": 6,
    "description": {
      "DE": "Traditionelle türkische Linsensuppe, samtig püriert und mit einem Hauch Minze verfeinert.",
      "EN": "Traditional Turkish lentil soup, velvety pureed and refined with a hint of mint.",
      "TR": "Geleneksel Türk mercimek çorbası, kadifemsi kıvamda ve hafif nane dokunuşuyla.",
      "FR": "Soupe turque traditionnelle aux lentilles, purée veloutée et raffinée avec un soupçon de menthe.",
      "ES": "Sopa tradicional turca de lentejas, aterciopelada en puré y refinada con un toque de menta.",
      "RU": "Традиционный турецкий суп из чечевицы, бархатистое пюре, изысканное с оттенком мяты."
    },
    "imageUrl": "/images/menury_originals/suppen__linsensuppe.webp",
    "category": "food",
    "subcategory": "Suppen",
    "tags": [
      "vegetarian"
    ]
  },
  {
    "id": "food_soup_2",
    "name": {
      "DE": "Tomatensuppe",
      "EN": "Tomato Soup",
      "TR": "Domates Çorbası",
      "FR": "Soupe à la tomate",
      "ES": "Sopa de tomate",
      "RU": "Томатный суп"
    },
    "price": 6,
    "description": {
      "DE": "Fruchtige Tomatensuppe mit Basilikum.",
      "EN": "Fruity tomato soup with basil.",
      "TR": "Fesleğenli, meyvemsi domates çorbası.",
      "FR": "Soupe fruitée de tomates au basilic.",
      "ES": "Sopa de tomate afrutada con albahaca.",
      "RU": "Фруктовый томатный суп с базиликом."
    },
    "imageUrl": "/images/menury_originals/suppen__tomatensuppe.webp",
    "category": "food",
    "subcategory": "Suppen",
    "tags": [
      "vegetarian"
    ]
  },
  {
    "id": "food_snack_1",
    "allergens": ["F", "H", "N"],
    "name": {
      "DE": "Hürrem Nuss Deluxe",
      "EN": "Hürrem Nut Deluxe",
      "TR": "Hürrem Kuruyemiş Deluxe",
      "FR": "Hurrem Noix Deluxe",
      "ES": "Nuez Hurrem Deluxe",
      "RU": "Хюррем Орех Делюкс"
    },
    "price": 5.9,
    "description": {
      "DE": "Eine edle Auswahl feinster Nüsse: Pistazien, Walnüsse, Cashews, Haselnüsse, Erdnüsse und gesalzene Mandeln.",
      "EN": "A fine selection of the finest nuts: pistachios, walnuts, cashews, hazelnuts, peanuts and salted almonds.",
      "TR": "Antep fıstığı, ceviz, kaju, fındık, yer fıstığı ve tuzlu bademden oluşan seçkin kuruyemiş karışımı.",
      "FR": "Une belle sélection des plus belles noix : pistaches, noix, noix de cajou, noisettes, cacahuètes et amandes salées.",
      "ES": "Una cuidada selección de los mejores frutos secos: pistachos, nueces, anacardos, avellanas, cacahuetes y almendras saladas.",
      "RU": "Прекрасный выбор лучших орехов: фисташки, грецкие орехи, кешью, фундук, арахис и соленый миндаль."
    },
    "imageUrl": "/images/menury_originals/finger_food__huerrem_nuss_deluxe.webp",
    "category": "food",
    "subcategory": "Snacks",
    "tags": [
      "vegetarian"
    ],
  },
  {
    "id": "food_snack_2",
    "name": {
      "DE": "Crunchy Finger Food Platter",
      "EN": "Crunchy Finger Food Platter",
      "TR": "Çıtır Finger Food Tabağı",
      "FR": "Plateau d'amuse-gueules croquants",
      "ES": "Plato crujiente para picar",
      "RU": "Хрустящая тарелка с закусками"
    },
    "price": 19.9,
    "description": {
      "DE": "Ein Mix aus knusprigen Klassikern: 3x Mozzarella-Sticks, 3x Onion Rings, 3x Shrimps, 3x Chicken Filet, 3x pikante Chicken Wings. Serviert mit Pommes und drei Dips: Salsa, Sour Cream und Guacamole.",
      "EN": "A mix of crispy classics: 3x mozzarella sticks, 3x onion rings, 3x shrimp, 3x chicken filet, 3x spicy chicken wings. Served with fries and three dips: salsa, sour cream and guacamole.",
      "TR": "Çıtır klasiklerin karışımı: 3x Mozzarella Çubuğu, 3x Soğan Halkası, 3x Karides, 3x Tavuk Fileto, 3x Acılı Tavuk Kanadı. Patates kızartması ve üç sosla servis edilir: Salsa, ekşi krema ve guacamole.",
      "FR": "Un mélange de classiques croustillants : 3x bâtonnets de mozzarella, 3x rondelles d'oignon, 3x crevettes, 3x filet de poulet, 3x ailes de poulet épicées. Servi avec frites et trois trempettes : salsa, crème sure et guacamole.",
      "ES": "Una mezcla de clásicos crujientes: 3 palitos de mozzarella, 3 aros de cebolla, 3 camarones, 3 filetes de pollo, 3 alitas de pollo picantes. Servido con papas fritas y tres dips: salsa, crema agria y guacamole.",
      "RU": "Микс хрустящей классики: 3 палочки моцареллы, 3 колечка лука, 3 креветки, 3 куриных филе, 3 острых куриных крылышка. Подается с картофелем фри и тремя соусами: сальса, сметана и гуакамоле."
    },
    "imageUrl": "/images/menury_originals/finger_food__crunchy_finger_food_platter.webp",
    "category": "food",
    "subcategory": "Snacks",
    "isSignature": true,
    "tags": [
      "sharing"
    ],
    "allergens": [
      "A",
      "D",
      "G"
    ]
  },
  {
    "id": "food_snack_3",
    "allergens": ["F", "G", "N"],
    "name": {
      "DE": "Hürrem Knabbermix",
      "EN": "Hürrem Snack Mix",
      "TR": "Hürrem Atıştırmalık Karışımı",
      "FR": "Mélange de collations Hürrem",
      "ES": "Mezcla de snacks Hürrem",
      "RU": "Закусочная смесь Хюррем"
    },
    "price": 9.9,
    "description": {
      "DE": "Der perfekte Mix für den kleinen Hunger! Knusprige Original Pringles, herzhafte Lorenz Double Crunch Peanuts, knusprige Salzstangen und luftige Erdnuss Flips.",
      "EN": "The perfect mix for a little hunger! Crispy original Pringles, hearty Lorenz Double Crunch peanuts, crispy pretzel sticks and airy peanut flips.",
      "TR": "Küçük acıkmalar için mükemmel karışım! Çıtır orijinal Pringles, lezzetli Lorenz Double Crunch fıstık, çıtır tuzlu çubuklar ve hafif fıstıklı cipsler.",
      "FR": "Le mélange parfait pour une petite faim ! Pringles originaux croustillants, cacahuètes Lorenz Double Crunch copieuses, bâtonnets de bretzel croquants et flips de cacahuètes aérés.",
      "ES": "¡La mezcla perfecta para un poco de hambre! Pringles originales crujientes, maní crujiente doble Lorenz, palitos de pretzel crujientes y volteretas de maní aireadas.",
      "RU": "Идеальная смесь для небольшого голода! Хрустящие оригинальные чипсы Pringles, сытный арахис Lorenz Double Crunch, хрустящие палочки кренделя и воздушные блинчики с арахисом."
    },
    "imageUrl": "/images/menury_originals/finger_food__huerrem_knabbermix.webp",
    "category": "food",
    "subcategory": "Snacks",
    "tags": [
      "sharing"
    ],
  },
  {
    "id": "food_snack_4",
    "name": {
      "DE": "Loaded Nachos",
      "EN": "Loaded Nachos",
      "TR": "Loaded Nachos",
      "FR": "Nachos chargés",
      "ES": "nachos cargados",
      "RU": "Загруженные начос"
    },
    "price": 9.9,
    "description": {
      "DE": "Knusprige Nachos, serviert mit Salsa, Sour Cream und Guacamole.\nnatur: 9,90 € | mit Käse überbacken: 10,90 € | mit Käse überbacken + Jalapenos: 11,90 € | mit marinierter Hähnchenbrust: 12,90 €",
      "EN": "Crispy nachos served with salsa, sour cream and guacamole.\nplain: €9.90 | baked with cheese: €10.90 | baked with cheese + jalapenos: €11.90 | with marinated chicken breast: €12.90",
      "TR": "Salsa, ekşi krema ve guacamole ile servis edilen çıtır nachos.\nsade: 9,90 € | peynirli fırınlanmış: 10,90 € | peynirli + jalapeno: 11,90 € | marine tavuk göğsü ile: 12,90 €",
      "FR": "Nachos croustillants servis avec salsa, crème sure et guacamole.\nnaturel : 9,90 € | gratiné au fromage : 10,90 € | gratiné au fromage + jalapenos : 11,90 € | avec blanc de poulet mariné : 12,90 €",
      "ES": "Nachos crujientes servidos con salsa, crema agria y guacamole.\nnaturales: 9,90€ | gratinado con queso: 10,90 € | gratinado con queso + jalapeños: 11,90 € | con pechuga de pollo marinada: 12,90 €",
      "RU": "Хрустящие начос подаются с сальсой, сметаной и гуакамоле.\nнатуральный: 9,90 евро | запеченный с сыром: 10,90 € | запеченный с сыром + халапеньо: 11,90 € | с маринованной куриной грудкой: €12,90"
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Snacks",
    "tags": [
      "vegetarian",
      "sharing"
    ],
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_snack_5",
    "name": {
      "DE": "Classic Fries",
      "EN": "Classic Fries",
      "TR": "Klasik Patates Kızartması",
      "FR": "Frise classique",
      "ES": "friso clásico",
      "RU": "Классический фриз"
    },
    "price": 4.9,
    "description": {
      "DE": "Knusprige Pommes, heiß und perfekt gesalzen – ein zeitloser Klassiker.",
      "EN": "Crispy fries, hot and perfectly salted – a timeless classic.",
      "TR": "Sıcak ve mükemmel tuzlanmış çıtır patates kızartması – zamansız bir klasik.",
      "FR": "Des frites croustillantes, chaudes et parfaitement salées, un classique intemporel.",
      "ES": "Patatas fritas crujientes, calientes y perfectamente saladas: un clásico atemporal.",
      "RU": "Хрустящий картофель фри, горячий и идеально соленый – вечная классика."
    },
    "imageUrl": "/images/menury_originals/finger_food__classic_fries.webp",
    "category": "food",
    "subcategory": "Snacks",
    "tags": [
      "vegetarian"
    ]
  },
  {
    "id": "food_snack_6",
    "name": {
      "DE": "Extra Finger Food",
      "EN": "Extra Finger Food",
      "TR": "Ekstra Finger Food",
      "FR": "Des amuse-gueules supplémentaires",
      "ES": "comida extra para picar",
      "RU": "Дополнительная еда, которую едят руками"
    },
    "price": 4.9,
    "description": {
      "DE": "Wähle einzeln: je 5 Mozzarella-Sticks, Onion Rings, Shrimps, Chicken Filet oder pikante Chicken Wings.",
      "EN": "Choose individually: 5 each of mozzarella sticks, onion rings, shrimp, chicken filet or spicy chicken wings.",
      "TR": "Tek tek seç: 5'er adet Mozzarella Çubuğu, Soğan Halkası, Karides, Tavuk Fileto veya Acılı Tavuk Kanadı.",
      "FR": "Choisissez individuellement : 5 bâtonnets de mozzarella, rondelles d'oignon, crevettes, filet de poulet ou ailes de poulet épicées.",
      "ES": "Elija individualmente: 5 de cada uno de palitos de mozzarella, aros de cebolla, camarones, filete de pollo o alitas de pollo picantes.",
      "RU": "Выбирайте индивидуально: по 5 палочек моцареллы, кольца лука, креветки, куриное филе или острые куриные крылышки."
    },
    "imageUrl": "",
    "category": "food",
    "subcategory": "Snacks",
    "tags": [
      "sharing"
    ],
    "allergens": [
      "A",
      "D",
      "G"
    ]
  },
  {
    "id": "food_dessert_1",
    "name": {
      "DE": "Lotus Caramel Cheesecake",
      "EN": "Lotus Caramel Cheesecake",
      "TR": "Lotus Karamel Cheesecake",
      "FR": "Gâteau au fromage au caramel et au lotus",
      "ES": "Tarta de queso con caramelo de loto",
      "RU": "Чизкейк «Лотос» с карамелью"
    },
    "description": {
      "DE": "Cremiger Cheesecake, verfeinert mit Karamellsauce und frischen Beerenfrüchten.",
      "EN": "Creamy cheesecake, refined with caramel sauce and fresh berries.",
      "TR": "Karamel sosu ve taze orman meyveleri ile tatlandırılmış kremsi cheesecake.",
      "FR": "Cheesecake crémeux, raffiné avec une sauce au caramel et des baies fraîches.",
      "ES": "Tarta de queso cremosa, refinada con salsa de caramelo y frutos rojos frescos.",
      "RU": "Сливочный чизкейк, изысканный карамельным соусом и свежими ягодами."
    },
    "price": 7.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__lotus_caramel_cheesecake.webp",
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_dessert_2",
    "name": {
      "DE": "Chocolate Lava Brownie",
      "EN": "Chocolate Lava Brownie",
      "TR": "Çikolatalı Lava Brownie",
      "FR": "Brownie de lave au chocolat",
      "ES": "Brownie de chocolate y lava",
      "RU": "Шоколадно-лавовый брауни"
    },
    "description": {
      "DE": "Warmer, schokoladiger Brownie, serviert mit Vanilleeis und frischen Beeren.",
      "EN": "Warm, chocolatey brownie served with vanilla ice cream and fresh berries.",
      "TR": "Sıcak, çikolatalı brownie, vanilyalı dondurma ve taze meyveler ile servis edilir.",
      "FR": "Brownie chaud et chocolaté servi avec glace à la vanille et baies fraîches.",
      "ES": "Brownie tibio de chocolate servido con helado de vainilla y frutos rojos frescos.",
      "RU": "Теплый шоколадный брауни подается с ванильным мороженым и свежими ягодами."
    },
    "price": 8.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__chocolate_lava_brownie.webp",
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_dessert_3",
    "name": {
      "DE": "Golden Churros",
      "EN": "Golden Churros",
      "TR": "Altın Churros",
      "FR": "Churros dorés",
      "ES": "Churros Dorados",
      "RU": "Золотой Чуррос"
    },
    "description": {
      "DE": "Knusprige, frittierte Spritzgebäck-Stangen, bestäubt mit Zimtzucker. Dazu eine cremige Nutella-Sauce.",
      "EN": "Crispy fried pastry sticks dusted with cinnamon sugar. Served with creamy Nutella sauce.",
      "TR": "Tarçın ve şeker serpilmiş çıtır churros. Yanında kremsi Nutella sosu ile.",
      "FR": "Bâtonnets de sablés croustillants et frits saupoudrés de sucre à la cannelle. Plus une sauce crémeuse au Nutella.",
      "ES": "Palitos de mantequilla crujientes y fritos espolvoreados con azúcar y canela. Además de una salsa cremosa de Nutella.",
      "RU": "Хрустящие жареные палочки песочного печенья, посыпанные сахаром с корицей. Плюс сливочный соус «Нутелла»."
    },
    "price": 9.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__golden_churros.webp",
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_dessert_4",
    "allergens": ["A", "C", "F", "G"],
    "name": {
      "DE": "Mini Pancakes",
      "EN": "Mini Pancakes",
      "TR": "Mini Krepler",
      "FR": "Mini-crêpes",
      "ES": "mini panqueques",
      "RU": "Мини блинчики"
    },
    "description": {
      "DE": "Zwölf luftige Mini Pancakes, serviert mit cremiger Schokosoße und einer Kugel feinstem Vanilleeis. Abgerundet mit frischen Früchten und einem Hauch Puderzucker – perfekt zum Genießen und Teilen.",
      "EN": "Twelve fluffy mini pancakes served with creamy chocolate sauce and a scoop of vanilla ice cream. Topped with fresh fruit and powdered sugar.",
      "TR": "On iki adet puf mini krep, çikolata sosu ve vanilyalı dondurma ile. Taze meyveler ve pudra şekeri ile tamamlanmıştır.",
      "FR": "Douze mini crêpes aériennes, servies avec une sauce crémeuse au chocolat et une boule de la meilleure glace à la vanille. Complété par des fruits frais et une touche de sucre en poudre, parfait à déguster et à partager.",
      "ES": "Doce mini panqueques esponjosos, servidos con cremosa salsa de chocolate y una bola del mejor helado de vainilla. Se completa con fruta fresca y un toque de azúcar glass, perfecto para disfrutar y compartir.",
      "RU": "Двенадцать воздушных мини-блинов, подаются со сливочно-шоколадным соусом и шариком нежнейшего ванильного мороженого. Завершенный свежими фруктами и небольшим количеством сахарной пудры, он идеально подходит для того, чтобы насладиться им и поделиться им."
    },
    "price": 11.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__mini_pancakes.webp",
  },
  {
    "id": "food_dessert_5",
    "name": {
      "DE": "Austrian Kaiserschmarrn",
      "EN": "Austrian Kaiserschmarrn",
      "TR": "Avusturya Kaiserschmarrn",
      "FR": "Kaiserschmarrn autrichien",
      "ES": "Kaiserschmarrn austríaco",
      "RU": "Австрийский Кайзершмаррн"
    },
    "description": {
      "DE": "Luftiger Kaiserschmarrn, serviert mit Vanillesoße, Apfelmus und Puderzucker. (+2.00 € mit Nutella)",
      "EN": "Fluffy shredded pancake served with vanilla sauce, applesauce, and powdered sugar.",
      "TR": "Vanilya sosu, elma püresi ve pudra şekeri ile servis edilen puf krep parçaları.",
      "FR": "Kaiserschmarrn aéré, servi avec sauce vanille, compote de pommes et sucre en poudre. (+2,00 € avec Nutella)",
      "ES": "Airy Kaiserschmarrn, servido con salsa de vainilla, puré de manzana y azúcar en polvo. (+2,00€ con Nutella)",
      "RU": "Воздушный Кайзершмаррн, подается с ванильным соусом, яблочным пюре и сахарной пудрой. (+2,00 € с Нутеллой)"
    },
    "price": 12.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__austrian_kaiserschmarrn.webp",
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_dessert_6",
    "name": {
      "DE": "Warm Apple Delight",
      "EN": "Warm Apple Delight",
      "TR": "Sıcak Elma Rüyası",
      "FR": "Délice tiède aux pommes",
      "ES": "Delicia cálida de manzana",
      "RU": "Теплый яблочный восторг"
    },
    "description": {
      "DE": "Gebackener Apfelstrudel mit Rosinen, serviert mit Vanillesoße und einer Kugel Vanilleeis.",
      "EN": "Baked apple strudel with raisins, served with vanilla sauce and a scoop of vanilla ice cream.",
      "TR": "Üzümlü fırınlanmış elmalı turta, vanilya sosu ve bir top vanilyalı dondurma ile.",
      "FR": "Strudel aux pommes au four avec raisins secs, servi avec une sauce à la vanille et une boule de glace à la vanille.",
      "ES": "Strudel de manzana al horno con pasas, servido con salsa de vainilla y una bola de helado de vainilla.",
      "RU": "Запеченный яблочный штрудель с изюмом, подается с ванильным соусом и шариком ванильного мороженого."
    },
    "price": 8.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__warm_apple_delight.webp",
    "allergens": [
      "A",
      "G"
    ]
  },
  {
    "id": "food_dessert_7",
    "name": {
      "DE": "Obstteller",
      "EN": "Fruit Platter",
      "TR": "Meyve Tabağı",
      "FR": "Assiette de fruits",
      "ES": "Plato de fruta",
      "RU": "Фруктовая тарелка"
    },
    "description": {
      "DE": "Seasonal Fruit Platter. Frisch angerichtetes, saisonales Obst - leicht, gesund und erfrischend.",
      "EN": "Freshly prepared seasonal fruit platter - light, healthy, and refreshing.",
      "TR": "Taze hazırlanmış mevsim meyveleri tabağı - hafif, sağlıklı ve ferahlatıcı.",
      "FR": "Plateau de fruits de saison. Fruits de saison fraîchement préparés - légers, sains et rafraîchissants.",
      "ES": "Plato de frutas de temporada. Fruta de temporada recién preparada: ligera, saludable y refrescante.",
      "RU": "Ассорти сезонных фруктов. Свежеприготовленные сезонные фрукты – легкие, полезные и освежающие."
    },
    "price": 19.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__obstteller.webp"
  },
  {
    "id": "food_dessert_8",
    "allergens": ["A", "C", "G"],
    "name": {
      "DE": "Original San Sebastián Cheesecake",
      "EN": "Original San Sebastian Cheesecake",
      "TR": "Orijinal San Sebastian Cheesecake",
      "FR": "Cheesecake original de Saint-Sébastien",
      "ES": "Tarta de queso original de San Sebastián",
      "RU": "Оригинальный чизкейк Сан-Себастьян"
    },
    "description": {
      "DE": "Klassik: 6.90 €, mit Vollmilchschokosoße: 8.90 €, mit weißer Schokosoße: 8.90 €",
      "EN": "Classic: 6.90 €, with milk chocolate sauce: 8.90 €, with white chocolate sauce: 8.90 €",
      "TR": "Klasik: 6.90 €, sütlü çikolata sosu ile: 8.90 €, beyaz çikolata sosu ile: 8.90 €",
      "FR": "Classique : 6,90 €, avec sauce chocolat au lait : 8,90 €, avec sauce chocolat blanc : 8,90 €",
      "ES": "Clásico: 6,90 €, con salsa de chocolate con leche: 8,90 €, con salsa de chocolate blanco: 8,90 €",
      "RU": "Классический: 6,90 евро, с соусом из молочного шоколада: 8,90 евро, с соусом из белого шоколада: 8,90 евро."
    },
    "price": 6.9,
    "category": "food",
    "subcategory": "Desserts",
    "imageUrl": "/images/menury_originals/dessert__original_san_sebastián_cheesecake.webp"
  },
  {
    "id": "d_sd_redbull",
    "name": {
      "DE": "RedBull",
      "EN": "RedBull",
      "TR": "RedBull",
      "FR": "Taureau Rouge",
      "ES": "toro rojo",
      "RU": "Ред Булл"
    },
    "price": 4.9,
    "description": {
      "DE": "Erfrischende Vielfalt mit dem vollen Energy-Kick – ob klassisch, zuckerfrei oder in fruchtigen Editionen wie Blaubeere, Kokos-Blaubeere, Kiwi-Apfel, Wassermelone, Grapefruit oder Fuji-Apfel. Für alle Sorten bitte unser Personal fragen.",
      "EN": "Refreshing variety with the full energy kick – whether classic, sugar-free or in fruity editions like blueberry, coconut-blueberry, kiwi-apple, watermelon, grapefruit or Fuji-apple. Please ask our staff for all varieties.",
      "TR": "Tam enerji veren ferahlatıcı çeşitlilik – klasik, şekersiz veya yaban mersini, hindistan cevizi-yaban mersini, kivi-elma, karpuz, greyfurt veya fuji-elma gibi meyveli çeşitleriyle. Tüm çeşitler için lütfen personelimize danışın.",
      "FR": "Variété rafraîchissante pleine d'énergie - qu'elle soit classique, sans sucre ou dans des éditions fruitées comme la myrtille, la myrtille à la noix de coco, la pomme kiwi, la pastèque, le pamplemousse ou la pomme Fuji. Pour toutes les variétés, veuillez vous renseigner auprès de notre personnel.",
      "ES": "Variedad refrescante y llena de energía, ya sea clásica, sin azúcar o en versiones afrutadas como arándano, coco, arándano, kiwi, sandía, pomelo o manzana Fuji. Para todas las variedades consulte a nuestro personal.",
      "RU": "Освежающий сорт с полным зарядом энергии — будь то классический, без сахара или фруктовый вариант, такой как черника, кокосовая черника, яблоко киви, арбуз, грейпфрут или яблоко Фуджи. Все сорта уточняйте у наших сотрудников."
    },
    "imageUrl": "/images/menury_originals/energydrink__redbull.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d_sd_28black",
    "name": {
      "DE": "28 Black (Schwarze Dose)",
      "EN": "28 Black",
      "TR": "28 Black",
      "FR": "28 Noir (boîte noire)",
      "ES": "28 Negro (lata negra)",
      "RU": "28 Черный (черная банка)"
    },
    "price": 4.9,
    "description": {
      "DE": "Fruchtig, erfrischend und ohne Taurin – erhältlich in Sorten wie Acai, Sour Mango-Kiwi oder Sour Cherry. Für alle Sorten bitte unser Personal fragen.",
      "EN": "Fruity, refreshing and without taurine – available in flavors like Acai, Sour Mango-Kiwi or Sour Cherry. Please ask our staff for all varieties.",
      "TR": "Meyvemsi, ferahlatıcı ve taurinsiz – Acai, Ekşi Mango-Kivi veya Ekşi Vişne gibi çeşitleri mevcuttur. Tüm çeşitler için lütfen personelimize danışın.",
      "FR": "Fruité, rafraîchissant et sans taurine - disponible dans des variétés telles que Acai, Sour Mango-Kiwi ou Sour Cherry. Pour toutes les variétés, veuillez vous renseigner auprès de notre personnel.",
      "ES": "Afrutado, refrescante y sin taurina, disponible en variedades como Acai, Sour Mango-Kiwi o Sour Cherry. Para todas las variedades consulte a nuestro personal.",
      "RU": "Фруктовый, освежающий и без таурина — доступен в таких вариантах, как асаи, кислое манго-киви или кислая вишня. Все сорта уточняйте у наших сотрудников."
    },
    "imageUrl": "/images/menury_originals/energydrink__28_black_schwarze_dose.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d_tea_cay",
    "name": {
      "DE": "Türkischer Cay groß",
      "EN": "Large Turkish Tea",
      "TR": "Büyük Türk Çayı",
      "FR": "Caye turque grande",
      "ES": "Cayo Turco grande",
      "RU": "Турецкий Кей большой"
    },
    "price": 3.2,
    "description": {
      "DE": "Klassischer türkischer Schwarztee, kräftig im Geschmack und traditionell serviert.",
      "EN": "Classic Turkish black tea, strong in taste and traditionally served.",
      "TR": "Klasik Türk siyah çayı, yoğun lezzetli ve geleneksel sunumlu.",
      "FR": "Thé noir turc classique, au goût fort et servi traditionnellement.",
      "ES": "Té negro turco clásico, de sabor fuerte y servido tradicionalmente.",
      "RU": "Классический турецкий черный чай, крепкий на вкус и традиционно подаваемый."
    },
    "imageUrl": "/images/menury_originals/traditionell__tuerkischer_cay_gross.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "classic",
      "intense"
    ]
  },
  {
    "id": "d_tea_kamille",
    "name": {
      "DE": "BIO Kamille Tee mit Honig",
      "EN": "BIO Chamomile Tea with Honey",
      "TR": "Ballı BIO Papatya Çayı",
      "FR": "Thé à la camomille BIO et au miel",
      "ES": "Té de manzanilla BIO con miel",
      "RU": "ОРГАНИЧЕСКИЙ ромашковый чай с медом"
    },
    "price": 4.5,
    "description": {
      "DE": "Milder Kräutertee mit beruhigender Wirkung und angenehmem, blumigem Aroma.",
      "EN": "Mild herbal tea with a calming effect and pleasant, floral aroma.",
      "TR": "Sakinleştirici etkisi ve hoş çiçeksi aromasıyla hafif bitki çayı.",
      "FR": "Tisane douce à effet calmant et à l'arôme floral agréable.",
      "ES": "Infusión de hierbas suave con efecto calmante y agradable aroma floral.",
      "RU": "Мягкий травяной чай с успокаивающим эффектом и приятным цветочным ароматом."
    },
    "imageUrl": "/images/menury_originals/kraeuter_und_bluetentees__bio_kamille_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "floral",
      "sweet"
    ]
  },
  {
    "id": "d_tea_salbei",
    "name": {
      "DE": "BIO Salbei Tee mit Honig",
      "EN": "BIO Sage Tea with Honey",
      "TR": "Ballı BIO Adaçayı",
      "FR": "Thé à la sauge BIO et au miel",
      "ES": "Té de salvia BIO con miel",
      "RU": "ОРГАНИЧЕСКИЙ чай с шалфеем и медом"
    },
    "price": 4.5,
    "description": {
      "DE": "Ein wohltuender Tee aus aromatischem Salbei, ideal für kalte Tage.",
      "EN": "A soothing tea made from aromatic sage, ideal for cold days.",
      "TR": "Aromatik adaçayından yapılan rahatlatıcı bir çay, soğuk günler için ideal.",
      "FR": "Un thé apaisant à base de sauge aromatique, idéal pour les journées froides.",
      "ES": "Un té calmante elaborado con salvia aromática, ideal para los días fríos.",
      "RU": "Успокаивающий чай из ароматного шалфея, идеально подходящий для холодных дней."
    },
    "imageUrl": "/images/menury_originals/kraeuter_und_bluetentees__bio_salbei_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "fresh"
    ]
  },
  {
    "id": "d_tea_sencha",
    "name": {
      "DE": "BIO Japanischer Sencha Tee mit Honig",
      "EN": "BIO Japanese Sencha Tea with Honey",
      "TR": "Ballı BIO Japon Sencha Çayı",
      "FR": "Thé Sencha japonais BIO au miel",
      "ES": "Té Sencha japonés BIO con miel",
      "RU": "ОРГАНИЧЕСКИЙ японский чай Сенча с медом"
    },
    "price": 4.5,
    "description": {
      "DE": "Ein fein-herber Grüntee mit zarten Noten, direkt aus Japan.",
      "EN": "A fine-tart green tea with delicate notes, directly from Japan.",
      "TR": "Doğrudan Japonya'dan, zarif notalara sahip hafif mayhoş yeşil çay.",
      "FR": "Un thé vert fin et amer aux notes délicates, directement venu du Japon.",
      "ES": "Un té verde fino, amargo y con notas delicadas, directamente de Japón.",
      "RU": "Прекрасный, горьковатый зеленый чай с нежными нотками, прямо из Японии."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__bio_japanischer_sencha_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "fresh"
    ]
  },
  {
    "id": "d_tea_hotbeauty",
    "name": {
      "DE": "BIO Hot Beauty Tee mit Honig",
      "EN": "BIO Hot Beauty Tea with Honey",
      "TR": "Ballı BIO Hot Beauty Çayı",
      "FR": "Thé de Beauté Chaud BIO au Miel",
      "ES": "Té de belleza caliente ORGÁNICO con miel",
      "RU": "ОРГАНИЧЕСКИЙ Горячий косметический чай с медом"
    },
    "price": 5.2,
    "description": {
      "DE": "Ein luxuriöser Tee aus Rosenknospen, getrockneten Longan-Früchten und roten Datteln – zart und exotisch.",
      "EN": "A luxurious tea made from rose buds, dried longan fruits and red dates – delicate and exotic.",
      "TR": "Gül tomurcukları, kurutulmuş longan meyveleri ve kırmızı hurmalardan yapılan lüks çay – zarif ve egzotik.",
      "FR": "Un thé luxueux à base de boutons de rose, de longanes séchés et de dattes rouges - délicat et exotique.",
      "ES": "Un té lujoso elaborado con capullos de rosa, frutos secos de longan y dátiles rojos, delicado y exótico.",
      "RU": "Роскошный чай из бутонов роз, сушеных плодов лонгана и красных фиников – нежный и экзотический."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__bio_hot_beauty_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "floral",
      "exotic"
    ]
  },
  {
    "id": "d_tea_fourseason",
    "name": {
      "DE": "BIO Four Season Tee mit Honig",
      "EN": "BIO Four Season Tea with Honey",
      "TR": "Ballı BIO Four Season Çayı",
      "FR": "Thé Quatre Saisons BIO au Miel",
      "ES": "Té ORGÁNICO Four Seasons con miel",
      "RU": "ОРГАНИЧЕСКИЙ чай Four Season с медом"
    },
    "price": 5.2,
    "description": {
      "DE": "Eine würzige Mischung aus getrockneter Feige, Datteln, Nelke und Zitrone – perfekt für Genießer.",
      "EN": "A spicy blend of dried fig, dates, cloves and lemon – perfect for connoisseurs.",
      "TR": "Kuru incir, hurma, karanfil ve limonun baharatlı bir karışımı – gurmeler için mükemmel.",
      "FR": "Un mélange épicé de figues séchées, de dattes, de clous de girofle et de citron – parfait pour les connaisseurs.",
      "ES": "Una mezcla picante de higos secos, dátiles, clavo y limón, perfecta para los conocedores.",
      "RU": "Пряная смесь сушеного инжира, фиников, гвоздики и лимона – идеальна для ценителей."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__bio_four_season_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "spicy"
    ]
  },
  {
    "id": "d_tea_bluedream",
    "name": {
      "DE": "Blue Dream Tee mit Honig",
      "EN": "Blue Dream Tea with Honey",
      "TR": "Ballı Blue Dream Çayı",
      "FR": "Thé Blue Dream au miel",
      "ES": "Té Blue Dream con miel",
      "RU": "Чай Blue Dream с медом"
    },
    "price": 5.2,
    "description": {
      "DE": "Ein süßer Früchtetraum aus Blaubeeren, Honig und Süßholz, der sowohl fruchtig als auch wohltuend ist.",
      "EN": "A sweet fruit dream made from blueberries, honey and licorice, which is both fruity and soothing.",
      "TR": "Yaban mersini, bal ve meyankökünden oluşan, hem meyvemsi hem de rahatlatıcı tatlı bir meyve rüyası.",
      "FR": "Un doux rêve fruité à base de myrtilles, de miel et de réglisse à la fois fruité et apaisant.",
      "ES": "Un dulce sueño frutal elaborado con arándanos, miel y regaliz que es a la vez afrutado y relajante.",
      "RU": "Сладкая фруктовая мечта из черники, меда и лакрицы, одновременно фруктовая и успокаивающая."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__blue_dream_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "sweet",
      "fruity"
    ]
  },
  {
    "id": "d_tea_mango",
    "name": {
      "DE": "Sweet Mango Tee mit Honig",
      "EN": "Sweet Mango Tea with Honey",
      "TR": "Ballı Sweet Mango Çayı",
      "FR": "Thé sucré à la mangue et au miel",
      "ES": "Té dulce de mango con miel",
      "RU": "Сладкий чай из манго с медом"
    },
    "price": 5.2,
    "description": {
      "DE": "Tropische Mangostücke, verfeinert mit Honig, Minze und einem Hauch Mangosaft – für einen exotischen Genussmoment.",
      "EN": "Tropical mango pieces, refined with honey, mint and a hint of mango juice – for an exotic moment of pleasure.",
      "TR": "Bal, nane ve bir miktar mango suyu ile tatlandırılmış tropikal mango parçaları – egzotik bir keyif anı için.",
      "FR": "Morceaux de mangue tropicale, affinés avec du miel, de la menthe et une touche de jus de mangue – pour un moment de plaisir exotique.",
      "ES": "Trozos de mango tropical, refinados con miel, menta y un toque de jugo de mango, para un momento exótico de disfrute.",
      "RU": "Кусочки тропического манго, украшенные медом, мятой и нотками сока манго – для экзотического момента наслаждения."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__sweet_mango_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "sweet",
      "fruity",
      "exotic"
    ]
  },
  {
    "id": "d_tea_apple",
    "name": {
      "DE": "Orient Apple Tee mit Honig",
      "EN": "Orient Apple Tea with Honey",
      "TR": "Ballı Orient Apple Çayı",
      "FR": "Thé aux pommes d'Orient et au miel",
      "ES": "Té de manzana oriental con miel.",
      "RU": "Восточный яблочный чай с медом."
    },
    "price": 5.2,
    "description": {
      "DE": "Ein warmer Apfeltee mit Noten von Zimt, Nelken und einem Hauch Agavensirup – orientalischer Flair in jeder Tasse.",
      "EN": "A warm apple tea with notes of cinnamon, cloves and a hint of agave syrup – oriental flair in every cup.",
      "TR": "Tarçın, karanfil ve bir dokunuş agav şurubu notalarıyla sıcak bir elma çayı – her fincanda oryantal bir esinti.",
      "FR": "Un thé aux pommes chaud avec des notes de cannelle, de clou de girofle et une touche de sirop d'agave - une touche orientale dans chaque tasse.",
      "ES": "Un té de manzana caliente con notas de canela, clavo y un toque de sirope de agave: un toque oriental en cada taza.",
      "RU": "Теплый яблочный чай с нотками корицы, гвоздики и оттенком сиропа агавы – восточный колорит в каждой чашке."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__orient_apple_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "sweet",
      "fruity",
      "spicy"
    ]
  },
  {
    "id": "d_tea_blossom",
    "name": {
      "DE": "BIO Blossom Tee mit Honig",
      "EN": "BIO Blossom Tea with Honey",
      "TR": "Ballı BIO Blossom Çayı",
      "FR": "Thé aux fleurs BIO au miel",
      "ES": "Té de flores BIO con miel",
      "RU": "ОРГАНИЧЕСКИЙ Цветочный чай с медом"
    },
    "price": 5.2,
    "description": {
      "DE": "Eine blumige Mischung aus Rosenblüten, Kirschblüten, Kornblumenblüten, Orangenblüten und Lavendel – ein wahres Blütenmeer.",
      "EN": "A floral mixture of rose petals, cherry blossoms, cornflower petals, orange blossoms and lavender – a true sea of flowers.",
      "TR": "Gül yaprakları, kiraz çiçekleri, peygamber çiçeği yaprakları, portakal çiçekleri ve lavantanın çiçeksi karışımı – adeta bir çiçek denizi.",
      "FR": "Un mélange floral de pétales de rose, de fleurs de cerisier, de fleurs de bleuet, de fleurs d'oranger et de lavande - une véritable mer de fleurs.",
      "ES": "Una mezcla floral de pétalos de rosa, flores de cerezo, flores de aciano, azahar y lavanda: un verdadero mar de flores.",
      "RU": "Цветочная смесь лепестков роз, цветов вишни, василька, цветов апельсина и лаванды – настоящее море цветов."
    },
    "imageUrl": "/images/menury_originals/exklusiv_and_aromatisch__bio_blossom_tee_mit_honig.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten",
    "tags": [
      "bio",
      "floral",
      "sweet"
    ]
  },
  {
    "id": "d_coffee_espresso",
    "name": {
      "DE": "Espresso",
      "EN": "Espresso",
      "TR": "Espresso",
      "FR": "espresso",
      "ES": "café exprés",
      "RU": "эспрессо"
    },
    "price": 2.8,
    "description": {
      "DE": "Ein kräftiger, italienischer Klassiker mit intensivem Aroma.",
      "EN": "A strong, Italian classic with an intense aroma.",
      "TR": "Yoğun aromalı, güçlü bir İtalyan klasiği.",
      "FR": "Un classique italien fort avec un arôme intense.",
      "ES": "Un clásico italiano fuerte con un aroma intenso.",
      "RU": "Крепкая итальянская классика с интенсивным ароматом."
    },
    "imageUrl": "/images/menury_originals/kaffeespezialitaeten__espresso.webp",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "intense",
      "classic"
    ]
  },
  {
    "id": "d_coffee_crema",
    "name": {
      "DE": "Cafe Crema",
      "EN": "Cafe Crema",
      "TR": "Cafe Crema",
      "FR": "Café Crème",
      "ES": "Café Crema",
      "RU": "Кафе Крема"
    },
    "price": 3.4,
    "description": {
      "DE": "Sanfter Kaffeegenuss mit einer cremigen Note.",
      "EN": "Gentle coffee enjoyment with a creamy note.",
      "TR": "Kremsi bir dokunuşla yumuşak kahve keyfi.",
      "FR": "Un café doux avec une note crémeuse.",
      "ES": "Disfrute de un café suave con una nota cremosa.",
      "RU": "Нежное наслаждение кофе со сливочной ноткой."
    },
    "imageUrl": "/images/menury_originals/kaffeespezialitaeten__cafe_crema.webp",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "creamy",
      "classic"
    ]
  },
  {
    "id": "d_coffee_cappuccino",
    "name": { "DE": "Cappuccino", "EN": "Cappuccino", "TR": "Cappuccino", "FR": "Cappuccino", "ES": "Capuchino", "RU": "Капучино" },
    "price": 3.9,
    "description": {
      "DE": "Eine köstliche Kombination aus Espresso, Milch und Milchschaum.",
      "EN": "A delicious combination of espresso, milk and milk foam.",
      "TR": "Espresso, süt ve süt köpüğünün lezzetli birleşimi.",
      "FR": "Une délicieuse combinaison d'espresso, de lait et de mousse de lait.",
      "ES": "Una deliciosa combinación de espresso, leche y espuma de leche.",
      "RU": "Восхитительное сочетание эспрессо, молока и молочной пены."
    },
    "imageUrl": "/images/menury_originals/kaffeespezialitaeten__cappuccino.webp",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": ["creamy", "classic"]
  },
  {
    "id": "d_coffee_latte",
    "name": {
      "DE": "Latte Macchiato",
      "EN": "Latte Macchiato",
      "TR": "Latte Macchiato",
      "FR": "Latté macchiato",
      "ES": "café con leche macchiato",
      "RU": "Латте макиато"
    },
    "price": 4.6,
    "description": {
      "DE": "Ein eleganter Genuss aus geschichtetem Espresso, Milch und Milchschaum",
      "EN": "An elegant treat of layered espresso, milk and milk foam",
      "TR": "Katmanlı espresso, süt ve süt köpüğünden oluşan zarif bir lezzet",
      "FR": "Un plaisir élégant à base d'espresso superposé, de lait et de mousse de lait",
      "ES": "Un placer elegante elaborado con capas de espresso, leche y espuma de leche.",
      "RU": "Элегантное удовольствие из многослойного эспрессо, молока и молочной пенки."
    },
    "imageUrl": "/images/menury_originals/kaffeespezialitaeten__latte_macchiato.webp",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "creamy",
      "classic"
    ]
  },
  {
    "id": "d_coffee_mokka",
    "name": {
      "DE": "Türkischer Kaffee",
      "EN": "Turkish Coffee",
      "TR": "Türk Kahvesi",
      "FR": "café turc",
      "ES": "café turco",
      "RU": "турецкий кофе"
    },
    "price": 3.6,
    "description": {
      "DE": "Kräftiger, aromatischer Kaffee nach traditioneller türkischer Art zubereitet.",
      "EN": "Strong, aromatic coffee prepared in the traditional Turkish way.",
      "TR": "Geleneksel Türk usulü hazırlanan sert, aromatik kahve.",
      "FR": "Café fort et aromatique préparé dans le style traditionnel turc.",
      "ES": "Café fuerte y aromático preparado al estilo tradicional turco.",
      "RU": "Крепкий, ароматный кофе, приготовленный в традиционном турецком стиле."
    },
    "imageUrl": "/images/menury_originals/kaffeespezialitaeten__tuerkischer_mokka.webp",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "intense",
      "classic"
    ]
  },
  {
    "id": "d_sm_1",
    "allergens": ["H"],
    "name": {
      "DE": "Very Berry",
      "EN": "Very Berry",
      "TR": "Very Berry",
      "FR": "Très Berry",
      "ES": "muy baya",
      "RU": "Очень Берри"
    },
    "price": 7.9,
    "description": {
      "DE": "Erdbeeren, Himbeeren, Beerenmix, Acai-Beeren, Kokosmilch, Gurke.",
      "EN": "Strawberries, raspberries, mixed berries, acai berries, coconut milk, cucumber.",
      "TR": "Çilek, ahududu, karışık orman meyveleri, acai meyvesi, hindistan cevizi sütü, salatalık.",
      "FR": "Fraises, framboises, fruits mélangés, baies d'açaï, lait de coco, concombre.",
      "ES": "Fresas, frambuesas, frutos rojos, bayas de acai, leche de coco, pepino.",
      "RU": "Клубника, малина, ягодный микс, ягоды асаи, кокосовое молоко, огурец."
    },
    "imageUrl": "/images/menury_originals/smoothies__very_berry.webp",
    "category": "drinks",
    "subcategory": "Smoothies"
  },
  {
    "id": "d_sm_2",
    "allergens": ["H"],
    "name": {
      "DE": "Green Goddess",
      "EN": "Green Goddess",
      "TR": "Green Goddess",
      "FR": "Déesse verte",
      "ES": "Diosa Verde",
      "RU": "Зеленая Богиня"
    },
    "price": 7.9,
    "description": {
      "DE": "Mango, Mandelmilch, Spinat, Banane.",
      "EN": "Mango, almond milk, spinach, banana.",
      "TR": "Mango, badem sütü, ıspanak, muz.",
      "FR": "Mangue, lait d'amande, épinards, banane.",
      "ES": "Mango, leche de almendras, espinacas, plátano.",
      "RU": "Манго, миндальное молоко, шпинат, банан."
    },
    "imageUrl": "/images/menury_originals/smoothies__green_goddess.webp",
    "category": "drinks",
    "subcategory": "Smoothies"
  },
  {
    "id": "d_sm_3",
    "allergens": ["H"],
    "name": {
      "DE": "Pink Punch",
      "EN": "Pink Punch",
      "TR": "Pink Punch",
      "FR": "Coup de poing rose",
      "ES": "Ponche rosa",
      "RU": "Розовый пунш"
    },
    "price": 7.9,
    "description": {
      "DE": "Himbeere, Ananas, Kokosmilch, Banane, Mango.",
      "EN": "Raspberry, pineapple, coconut milk, banana, mango.",
      "TR": "Ahududu, ananas, hindistan cevizi sütü, muz, mango.",
      "FR": "Framboise, ananas, lait de coco, banane, mangue.",
      "ES": "Frambuesa, piña, leche de coco, plátano, mango.",
      "RU": "Малина, ананас, кокосовое молоко, банан, манго."
    },
    "imageUrl": "/images/menury_originals/smoothies__pink_punch.webp",
    "category": "drinks",
    "subcategory": "Smoothies"
  },
  {
    "id": "d_sm_4",
    "name": {
      "DE": "Orange Glow",
      "EN": "Orange Glow",
      "TR": "Orange Glow",
      "FR": "Lueur orange",
      "ES": "Resplandor naranja",
      "RU": "Оранжевое свечение"
    },
    "price": 7.9,
    "description": {
      "DE": "Karotten, Banane, Orangen, Mango, Maracuja.",
      "EN": "Carrots, banana, oranges, mango, passion fruit.",
      "TR": "Havuç, muz, portakal, mango, çarkıfelek meyvesi.",
      "FR": "Carottes, bananes, oranges, mangues, fruits de la passion.",
      "ES": "Zanahorias, plátano, naranjas, mango, maracuyá.",
      "RU": "Морковь, банан, апельсины, манго, маракуйя."
    },
    "imageUrl": "/images/menury_originals/smoothies__orange_glow.webp",
    "category": "drinks",
    "subcategory": "Smoothies"
  },
  {
    "id": "d_sm_5",
    "allergens": ["H"],
    "name": {
      "DE": "Pina Colada",
      "EN": "Pina Colada",
      "TR": "Pina Colada",
      "FR": "Pina Colada",
      "ES": "piña colada",
      "RU": "Пина Колада"
    },
    "price": 7.9,
    "description": {
      "DE": "Banane, Kokoswasser, Kokosmilch, Ananas.",
      "EN": "Banana, coconut water, coconut milk, pineapple.",
      "TR": "Muz, hindistan cevizi suyu, hindistan cevizi sütü, ananas.",
      "FR": "Banane, eau de coco, lait de coco, ananas.",
      "ES": "Plátano, agua de coco, leche de coco, piña.",
      "RU": "Банан, кокосовая вода, кокосовое молоко, ананас."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Smoothies"
  },
  {
    "id": "d_coffee_milchkaffee",
    "name": {
      "DE": "Milchkaffee",
      "EN": "Café au Lait",
      "TR": "Sütlü Kahve",
      "FR": "Latté",
      "ES": "café con leche",
      "RU": "Латте"
    },
    "price": 4.2,
    "description": {
      "DE": "Große Tasse Kaffee mit viel heißer Milch für einen sanften Start in den Tag.",
      "EN": "Large cup of coffee with lots of hot milk for a gentle start to the day.",
      "TR": "Güne yumuşak bir başlangıç için bol sıcak sütlü büyük fincan kahve.",
      "FR": "Une grande tasse de café avec beaucoup de lait chaud pour commencer la journée en douceur.",
      "ES": "Taza grande de café con mucha leche caliente para empezar el día con tranquilidad.",
      "RU": "Большая чашка кофе с большим количеством горячего молока для нежного начала дня."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "creamy",
      "mild"
    ]
  },
  {
    "id": "d_hot_choco",
    "name": {
      "DE": "Heiße Schokolade",
      "EN": "Hot Chocolate",
      "TR": "Sıcak Çikolata",
      "FR": "Chocolat chaud",
      "ES": "Chocolate caliente",
      "RU": "Горячий шоколад"
    },
    "price": 4.9,
    "description": {
      "DE": "Cremige, heiße Schokolade aus feinster Kakaobohne - ein Trost für die Seele.",
      "EN": "Creamy hot chocolate made from the finest cocoa beans - comfort for the soul.",
      "TR": "En kaliteli kakao çekirdeklerinden yapılmış kremsi sıcak çikolata - ruhunuzu ısıtır.",
      "FR": "Un chocolat chaud et crémeux fabriqué à partir des meilleures fèves de cacao - un réconfort pour l'âme.",
      "ES": "Chocolate caliente cremoso elaborado con los mejores granos de cacao: un consuelo para el alma.",
      "RU": "Сливочный, горячий шоколад из лучших какао-бобов – комфорт для души."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten",
    "tags": [
      "sweet",
      "creamy"
    ]
  },
  {
    "id": "f_ff_2",
    "name": {
      "DE": "Curly Fries",
      "EN": "Curly Fries",
      "TR": "Kıvırcık Patates",
      "FR": "Frites frisées",
      "ES": "papas fritas rizadas",
      "RU": "Картошка фри"
    },
    "price": 4.9,
    "description": {
      "DE": "Würzige Curly Fries.",
      "EN": "Spicy curly fries.",
      "TR": "Baharatlı kıvırcık patates.",
      "FR": "Frites frisées épicées.",
      "ES": "Papas fritas rizadas picantes.",
      "RU": "Острый кудрявый картофель фри."
    },
    "imageUrl": "/images/menury_originals/finger_food__curly_fries.webp",
    "category": "food",
    "subcategory": "Finger Food"
  },
  {
    "id": "f_ff_3",
    "name": {
      "DE": "Sweet Potato Fries",
      "EN": "Sweet Potato Fries",
      "TR": "Tatlı Patates",
      "FR": "Frites de patates douces",
      "ES": "Patatas fritas",
      "RU": "Сладкий картофель фри"
    },
    "price": 4.9,
    "description": {
      "DE": "Knusprige Süßkartoffelpommes.",
      "EN": "Crispy sweet potato fries.",
      "TR": "Çıtır tatlı patates kızartması.",
      "FR": "Frites de patates douces croustillantes.",
      "ES": "Patatas fritas crujientes.",
      "RU": "Хрустящий сладкий картофель фри."
    },
    "imageUrl": "/images/menury_originals/finger_food__sweet_potato_fries.webp",
    "category": "food",
    "subcategory": "Finger Food"
  },
  {
    "id": "d_hc_1",
    "allergens": ["C", "G"],
    "name": {
      "DE": "Another One Wood Smoke",
      "EN": "Another One Wood Smoke",
      "TR": "Another One Wood Smoke",
      "FR": "Une autre fumée de bois",
      "ES": "Otro Humo De Leña",
      "RU": "Еще один древесный дым"
    },
    "price": 10.9,
    "description": {
      "DE": "Apfelsaft, Orangensaft, Mandelsirup, Vanillesirup, Eiweiß, Zimt\nGarniert mit Zimtstange und sanftem Holzrauch.",
      "EN": "Apple juice, orange juice, almond syrup, vanilla syrup, egg white, cinnamon\nGarnished with a cinnamon stick and gentle wood smoke.",
      "TR": "Elma suyu, portakal suyu, badem şurubu, vanilya şurubu, yumurta akı, tarçın\nTarçın çubuğu ve hafif odun dumanı ile servis edilir.",
      "FR": "Jus de pomme, jus d'orange, sirop d'amande, sirop de vanille, blanc d'œuf, cannelle\nGarni d'un bâton de cannelle et d'une douce fumée de bois.",
      "ES": "Zumo de manzana, zumo de naranja, sirope de almendra, sirope de vainilla, clara de huevo, canela\nDecorado con rama de canela y un suave humo de madera.",
      "RU": "Яблочный сок, апельсиновый сок, миндальный сироп, ванильный сироп, яичный белок, корица\nПодаётся с палочкой корицы и лёгким древесным дымом."
    },
    "imageUrl": "/images/menury_originals/high_class_cocktails__another_one_wood_smoke.webp",
    "category": "drinks",
    "subcategory": "High-Class Cocktails"
  },
  {
    "id": "d_hc_2",
    "allergens": ["G"],
    "name": {
      "DE": "Cloud Seven Balloon Glass",
      "EN": "Cloud Seven Balloon Glass",
      "TR": "Cloud Seven Balloon Glass",
      "FR": "Verre ballon Cloud Seven",
      "ES": "Vaso Globo Nube Siete",
      "RU": "Стекло Cloud Seven для воздушных шаров"
    },
    "price": 10.9,
    "description": {
      "DE": "Cotton Candy-Sirup, Bananensaft, Kokoscreme, Sahne\nServiert in einem eleganten Ballonglas.",
      "EN": "Cotton candy syrup, banana juice, coconut cream, cream\nServed in an elegant balloon glass.",
      "TR": "Pamuk şeker şurubu, muz suyu, hindistan cevizi kreması, krema\nŞık bir balon bardakta servis edilir.",
      "FR": "Sirop barbe à papa, jus de banane, crème de coco, crème\nServi dans un élégant verre ballon.",
      "ES": "Sirope de algodón de azúcar, zumo de plátano, crema de coco, nata\nServido en una elegante copa globo.",
      "RU": "Сироп сахарной ваты, банановый сок, кокосовые сливки, сливки\nПодаётся в элегантном бокале-шаре."
    },
    "imageUrl": "/images/menury_originals/high_class_cocktails__cloud_seven_balloon_glass.webp",
    "category": "drinks",
    "subcategory": "High-Class Cocktails"
  },
  {
    "id": "d_hc_3",
    "name": {
      "DE": "Funky Passion Bubble Tea",
      "EN": "Funky Passion Bubble Tea",
      "TR": "Funky Passion Bubble Tea",
      "FR": "Thé aux bulles Funky Passion",
      "ES": "Té de burbujas de pasión funky",
      "RU": "Баббл-чай Funky Passion"
    },
    "price": 10.9,
    "description": {
      "DE": "Weißer Tee, frisches Maracujapüree, Mangosaft, Maracujaperlen\nEine fruchtige Fusion mit Boba-Twist.",
      "EN": "White tea, fresh passion fruit purée, mango juice, passion fruit pearls\nA fruity fusion with a boba twist.",
      "TR": "Beyaz çay, taze çarkıfelek püresi, mango suyu, çarkıfelek incileri\nBoba dokunuşlu meyveli bir füzyon.",
      "FR": "Thé blanc, purée de fruit de la passion fraîche, jus de mangue, perles de fruit de la passion\nUne fusion fruitée avec une touche boba.",
      "ES": "Té blanco, puré fresco de maracuyá, zumo de mango, perlas de maracuyá\nUna fusión afrutada con un toque boba.",
      "RU": "Белый чай, свежее пюре маракуйи, манговый сок, жемчужины маракуйи\nФруктовый микс с бабл-ти твистом."
    },
    "imageUrl": "/images/menury_originals/high_class_cocktails__funky_passion_bubble_tea.webp",
    "category": "drinks",
    "subcategory": "High-Class Cocktails"
  },
  {
    "id": "d_hc_4",
    "allergens": ["C", "G"],
    "name": {
      "DE": "Violet Wood Smoke",
      "EN": "Violet Wood Smoke",
      "TR": "Violet Wood Smoke",
      "FR": "Fumée De Bois De Violette",
      "ES": "Humo de madera violeta",
      "RU": "Фиолетовый древесный дым"
    },
    "price": 10.9,
    "description": {
      "DE": "Lavendelsirup, Lavendeltee, Zitronensaft, Blaubeersaft, Eiweiß, Soda\nMit sanfter Holzrauch-Infusion.",
      "EN": "Lavender syrup, lavender tea, lemon juice, blueberry juice, egg white, soda\nWith a gentle wood smoke infusion.",
      "TR": "Lavanta şurubu, lavanta çayı, limon suyu, yaban mersini suyu, yumurta akı, soda\nHafif odun dumanı ile.",
      "FR": "Sirop de lavande, thé à la lavande, jus de citron, jus de myrtille, blanc d'œuf, soda\nAvec une douce infusion de fumée de bois.",
      "ES": "Sirope de lavanda, té de lavanda, zumo de limón, zumo de arándanos, clara de huevo, soda\nCon una suave infusión de humo de madera.",
      "RU": "Лавандовый сироп, лавандовый чай, лимонный сок, черничный сок, яичный белок, содовая\nС лёгким древесным дымом."
    },
    "imageUrl": "/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp",
    "category": "drinks",
    "subcategory": "High-Class Cocktails"
  },
  {
    "id": "d_sig_1",
    "name": {
      "DE": "Blue Lychee Mosquito",
      "EN": "Blue Lychee Mosquito",
      "TR": "Blue Lychee Mosquito",
      "FR": "Moustique litchi bleu",
      "ES": "Mosquito lichi azul",
      "RU": "Синий комар-личи"
    },
    "price": 9.4,
    "description": {
      "DE": "Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette",
      "EN": "Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette",
      "TR": "Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette",
      "FR": "Thé aux pois papillon, litchi frais, menthe, sucre de canne, eau tonique, citron vert",
      "ES": "Té de guisantes mariposa, lichi fresco, menta, azúcar de caña, agua tónica, lima",
      "RU": "Чай Butterfly Pea, свежий личи, мята, тростниковый сахар, тоник, лайм."
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_sig_2",
    "allergens": ["G"],
    "name": {
      "DE": "Coconut Kiss",
      "EN": "Coconut Kiss",
      "TR": "Coconut Kiss",
      "FR": "Baiser à la noix de coco",
      "ES": "Beso de coco",
      "RU": "Кокосовый поцелуй"
    },
    "price": 8.9,
    "description": {
      "DE": "Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine",
      "EN": "Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine",
      "TR": "Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine",
      "FR": "Crème de coco, crème, jus d'ananas, jus de cerise, grenadine",
      "ES": "Crema de coco, nata, zumo de piña, zumo de cereza, granadina",
      "RU": "Кокосовый крем, сливки, ананасовый сок, вишневый сок, гренадин"
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__coconut_kiss.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_sig_3",
    "name": {
      "DE": "Dragonfruit Sunset",
      "EN": "Dragonfruit Sunset",
      "TR": "Dragonfruit Sunset",
      "FR": "Coucher de soleil sur le fruit du dragon",
      "ES": "Atardecer de fruta de dragón",
      "RU": "Закат драконьего фрукта"
    },
    "price": 9.4,
    "description": {
      "DE": "Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!",
      "EN": "Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!",
      "TR": "Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!",
      "FR": "Une explosion tropicale de couleurs dans un verre ! Super rafraîchissant et fruité-exotique avec de la poudre de fruit du dragon biologique de haute qualité et des baies. Obtenez les vacances directement dans votre verre !",
      "ES": "¡Una explosión tropical de color en un vaso! Súper refrescante y afrutado exótico con fruta del dragón en polvo y bayas orgánicas de alta calidad. ¡Obtén las vacaciones directamente en tu vaso!",
      "RU": "Тропический взрыв цвета в бокале! Супер освежающий и фруктово-экзотический с высококачественным органическим порошком драконьего фрукта и ягодами. Получите праздник прямо в свой стакан!"
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_sig_4",
    "name": {
      "DE": "Fancy Love",
      "EN": "Fancy Love",
      "TR": "Fancy Love",
      "FR": "Amour fantaisie",
      "ES": "Amor elegante",
      "RU": "Необычная любовь"
    },
    "price": 9.4,
    "description": {
      "DE": "Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren",
      "EN": "Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren",
      "TR": "Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren",
      "FR": "Jus d'ananas, sirop de mangue, eau de coco, jus de citron vert, menthe, fruit de la passion frais, baies d'açai",
      "ES": "Jugo de piña, sirope de mango, agua de coco, jugo de lima, menta, maracuyá fresca, bayas de açai",
      "RU": "Ананасовый сок, сироп манго, кокосовая вода, сок лайма, мята, свежая маракуйя, ягоды асаи."
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__fancy_love.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_sig_5",
    "name": {
      "DE": "Mosquito",
      "EN": "Mosquito",
      "TR": "Mosquito",
      "FR": "Moustique",
      "ES": "Mosquito",
      "RU": "Комар"
    },
    "price": 8.9,
    "description": {
      "DE": "Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)",
      "EN": "Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)",
      "TR": "Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)",
      "FR": "Ginger ale, menthe fraîche, citron vert, sucre de canne, glace pilée (avec Black28 : 10,90 €)",
      "ES": "Ginger ale, menta fresca, lima, azúcar de caña, hielo picado (con Black28: 10,90 €)",
      "RU": "Имбирный эль, свежая мята, лайм, тростниковый сахар, колотый лед (с Black28: 10,90 евро)"
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__mosquito.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_sig_6",
    "allergens": ["G"],
    "name": {
      "DE": "Solero",
      "EN": "Solero",
      "TR": "Solero",
      "FR": "Soléro",
      "ES": "Solero",
      "RU": "Солеро"
    },
    "price": 8.9,
    "description": {
      "DE": "Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft",
      "EN": "Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft",
      "TR": "Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft",
      "FR": "Sirop de caramel, sirop de vanille, crème, jus de fruit de la passion, jus de mangue, jus d'orange",
      "ES": "Sirope de caramelo, sirope de vainilla, nata, zumo de maracuyá, zumo de mango, zumo de naranja",
      "RU": "Карамельный сироп, ванильный сироп, сливки, сок маракуйи, сок манго, апельсиновый сок"
    },
    "imageUrl": "/images/menury_originals/signature_cocktails__solero.webp",
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "d_shake_1",
    "allergens": ["A", "G", "H"],
    "name": {
      "DE": "Royal Delight",
      "EN": "Royal Delight",
      "TR": "Royal Delight",
      "FR": "Délice Royal",
      "ES": "Delicia real",
      "RU": "Королевское наслаждение"
    },
    "price": 7.9,
    "description": {
      "DE": "Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber",
      "EN": "Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber",
      "TR": "Ein königlicher Genuss aus cremigem MaxiKing, Schokolade ve Karamell - der Shake für echte Schoko-Liebhaber",
      "FR": "Un délice royal à base de MaxiKing crémeux, de chocolat et de caramel - le shake pour les vrais amateurs de chocolat",
      "ES": "Un capricho real elaborado con el cremoso MaxiKing, chocolate y caramelo: el batido para los verdaderos amantes del chocolate.",
      "RU": "Королевское лакомство из сливочного MaxiKing, шоколада и карамели – коктейль для настоящих ценителей шоколада."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Shakes"
  },
  {
    "id": "d_shake_2",
    "allergens": ["A", "G", "H"],
    "name": {
      "DE": "Midnight Cravings",
      "EN": "Midnight Cravings",
      "TR": "Midnight Cravings",
      "FR": "Envies de minuit",
      "ES": "Antojos de medianoche",
      "RU": "Полночная тяга"
    },
    "price": 7.9,
    "description": {
      "DE": "Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck",
      "EN": "Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck",
      "TR": "Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck",
      "FR": "Le classique avec des biscuits Oreo et un soupçon de vanille - une nuit de rêve à chaque gorgée",
      "ES": "El clásico con galletas Oreo y un toque de vainilla: un sueño nocturno en cada sorbo",
      "RU": "Классика с печеньем Орео и нотками ванили – ночная мечта в каждом глотке."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Shakes"
  },
  {
    "id": "d_shake_3",
    "allergens": ["A", "G", "H"],
    "name": {
      "DE": "Hazelnut Bliss",
      "EN": "Hazelnut Bliss",
      "TR": "Hazelnut Bliss",
      "FR": "Le bonheur aux noisettes",
      "ES": "Felicidad de avellana",
      "RU": "Фундуковое блаженство"
    },
    "price": 7.9,
    "description": {
      "DE": "Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht",
      "EN": "Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht",
      "TR": "Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht",
      "FR": "Un rêve gourmand au chocolat et aux noisettes avec des morceaux croquants de Kinder Bueno qui fondent dans la bouche",
      "ES": "Delicioso sueño de chocolate con avellanas y crujientes trozos de Kinder Bueno que se derriten en la boca",
      "RU": "Нежная орехово-шоколадная мечта с хрустящими кусочками Kinder Bueno, которые тают во рту"
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Shakes"
  },
  {
    "id": "d_shake_4",
    "allergens": ["G", "H"],
    "name": {
      "DE": "Tropical Escape",
      "EN": "Tropical Escape",
      "TR": "Tropical Escape",
      "FR": "Évasion tropicale",
      "ES": "escapada tropical",
      "RU": "Тропический побег"
    },
    "price": 7.9,
    "description": {
      "DE": "Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.",
      "EN": "Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.",
      "TR": "Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.",
      "FR": "Une aventure tropicale à base de noix de coco, de chocolat et de lait crémeux - des vacances dans un verre.",
      "ES": "Una aventura tropical a base de coco, chocolate y leche cremosa: unas vacaciones en un vaso.",
      "RU": "Тропическое приключение из кокоса, шоколада и сливочного молока – праздник в стакане."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Shakes"
  },
  {
    "id": "d_shake_5",
    "allergens": ["G", "H"],
    "name": {
      "DE": "Banana Boost",
      "EN": "Banana Boost",
      "TR": "Banana Boost",
      "FR": "Coup de banane",
      "ES": "Impulso de plátano",
      "RU": "Банановый буст"
    },
    "price": 7.9,
    "description": {
      "DE": "Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.",
      "EN": "Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.",
      "TR": "Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.",
      "FR": "Du pouvoir pur ! Le beurre de cacahuète rencontre la banane fraîche et un soupçon de cannelle – le coup de pouce énergétique parfait.",
      "ES": "¡Puro poder! La mantequilla de maní se combina con plátano fresco y un toque de canela: la inyección de energía perfecta.",
      "RU": "Чистая сила! Арахисовое масло сочетается со свежим бананом и нотками корицы — идеальный заряд энергии."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Shakes"
  },
  {
    "id": "hh_angebot_1",
    "name": {
      "DE": "SHISHA + SOFTDRINK",
      "EN": "SHISHA + SOFTDRINK",
      "TR": "SHISHA + SOFTDRINK",
      "FR": "CHISHA + BOISSONS GAZEUSES",
      "ES": "SHISHA + REFRESCO",
      "RU": "КАЛЬЯН + БЕЗАЛКОГОЛЬНЫЙ НАПИТОК"
    },
    "price": 13.9,
    "description": {
      "DE": "Shisha + Softdrink Nachwahl\nMontag-Freitag 14:00 - 19:00 Uhr",
      "EN": "Shisha + Softdrink of choice\nMonday-Friday 14:00 - 19:00",
      "TR": "Nargile + Seçtiğiniz Meşrubat\nPazartesi-Cuma 14:00 - 19:00",
      "FR": "Chicha + boisson gazeuse au choix\nLundi-vendredi 14h00 - 19h00",
      "ES": "Shisha + refresco a elección\nLunes a viernes 14:00 h. - 19:00",
      "RU": "Кальян + безалкогольный напиток на выбор\nПонедельник-пятница 14:00. - 19:00"
    },
    "imageUrl": "",
    "category": "happy_hour",
    "subcategory": "Happy Hour",
    "allergens": [
      "C"
    ],
    "additives": [
      "13",
      "16"
    ]
  },
  {
    "id": "hh_angebot_2",
    "name": {
      "DE": "PASTA, BURGER, SALAT, BOWL'S",
      "EN": "PASTA, BURGER, SALAD, BOWL'S",
      "TR": "PASTA, BURGER, SALAT, BOWL'S",
      "FR": "PÂTES, BURGERS, SALADE, BOWL'S",
      "ES": "PASTA, HAMBURGUESAS, ENSALADA, BOWL'S",
      "RU": "ПАСТА, БУРГЕРЫ, САЛАТ, БОУЛ'С"
    },
    "price": 9.9,
    "description": {
      "DE": "Montag-Freitag | 16:00-19:00 Uhr\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\nAusgenommen: Beef & Broccoli Penne sowie Rinderfilet Bowl.",
      "EN": "Monday-Friday | 16:00-19:00\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl.\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.",
      "TR": "Pazartesi-Cuma | 16:00-19:00\nHappy Hour'ımızın tadını çıkarın ve Makarna, Burger, Salata veya Kase kategorilerinden favori yemeğinizi seçin.\nHariç tutulanlar: Dana Etli & Brokolili Penne ve Beef Balance Bowl.",
      "FR": "Lundi-vendredi | 16h00 - 19h00\nProfitez de notre happy hour et choisissez votre plat préféré parmi les catégories pâtes, burger, salade ou bowl.\nExclus : Penne au bœuf et brocoli et Bol de filet de boeuf.",
      "ES": "Lunes-Viernes | 16:00 - 19:00\nDisfruta de nuestro happy hour y elige tu plato favorito entre las categorías de pasta, hamburguesa, ensalada o bowl.\nExcluidos: Penne de res y brócoli y Tazón de filete de ternera.",
      "RU": "понедельник-пятница | 16:00. - 19:00\nНаслаждайтесь нашим счастливым часом и выберите свое любимое блюдо из категорий пасты, гамбургеров, салатов или боулов.\nВ комплект не входят: пенне с говядиной и брокколи и миска для баланса говядины."
    },
    "imageUrl": "",
    "category": "happy_hour",
    "subcategory": "Happy Hour"
  },
  {
    "id": "d_heisse_schokolade",
    "name": {
      "DE": "Dunkle Schokolade",
      "EN": "Dark Chocolate",
      "TR": "Bitter Çikolata",
      "FR": "Chocolat noir",
      "ES": "Chocolate negro",
      "RU": "Тёмный шоколад"
    },
    "price": 4.90,
    "description": {
      "DE": "Intensive dunkle Schokolade, (Auf Wunsch mit Sahne) - ein Traum für Schokoladenliebhaber.",
      "EN": "Intensive dark chocolate, (with cream on request) - a dream for chocolate lovers.",
      "TR": "Yoğun bitter çikolata, (istek üzerine krema ile) - çikolata severler için bir rüya."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__dark_chocolate.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials"
  },
  {
    "id": "d_white_chocolate",
    "name": {
      "DE": "Weiße Schokolade",
      "EN": "White Chocolate",
      "TR": "Beyaz Çikolata",
      "FR": "Chocolat blanc",
      "ES": "Chocolate blanco",
      "RU": "Белый шоколад"
    },
    "price": 4.90,
    "description": {
      "DE": "Cremige weiße Schokolade, (Auf Wunsch mit Sahne und zerbröselten Spekulatius) - perfekt für süße Genussmomente.",
      "EN": "Creamy white chocolate, (with cream and crumbled speculoos on request) - perfect for sweet moments of pleasure.",
      "TR": "Kremsi beyaz çikolata, (istek üzerine krema ve ufalanmış speculoos bisküvisi ile) - tatlı keyif anları için mükemmel."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__white_chocolate.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials"
  },
{
    "id": "spiele_info",
    "name": {
      "DE": "Spiele & Unterhaltung",
      "EN": "Games & Entertainment",
      "TR": "Oyunlar & Eğlence",
      "FR": "Jeux et divertissement",
      "ES": "Juegos y entretenimiento",
      "RU": "Игры и развлечения"
    },
    "price": 0,
    "description": {
      "DE": "Für Ihr Vergnügen stehen verschiedene Spiel- und Unterhaltungsangebote zur Verfügung. Bitte fragen Sie unser Team.",
      "EN": "A variety of games and entertainment options are available for your enjoyment. Please ask our team.",
      "TR": "Keyfiniz için çeşitli oyun ve eğlence seçenekleri mevcuttur. Lütfen ekibimize danışın.",
      "FR": "Une variété d'options de jeux et de divertissements sont disponibles pour votre plaisir. Veuillez demander à notre équipe.",
      "ES": "Una variedad de juegos y opciones de entretenimiento están disponibles para su disfrute. Por favor pregunte a nuestro equipo.",
      "RU": "A variety of games and entertainment options are available for your enjoyment. Пожалуйста, спросите нашу команду."
    },
    "imageUrl": "",
    "category": "spiele",
    "subcategory": "Spiele & Spaß"
  },
  {
    "id": "c_butterfly",
    "name": {
      "DE": "Butterfly Pea Flower Tea",
      "EN": "Butterfly Pea Flower Tea",
      "TR": "Butterfly Pea Flower Tea"
    },
    "price": 8.9,
    "description": {
      "DE": "Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis",
      "EN": "Blue blossom tea meets fruity wild berry and sweet honey - a gentle, harmonious taste experience",
      "TR": "Mavi çiçek çayı meyvemsi wildberry ve tatlı bal ile buluşuyor - yumuşak, uyumlu bir lezzet deneyimi"
    },
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "c_beautiful_dream",
    "name": {
      "DE": "Beautiful Dream",
      "EN": "Beautiful Dream",
      "TR": "Beautiful Dream"
    },
    "price": 9.4,
    "description": {
      "DE": "Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft",
      "EN": "Strawberry puree, cream, coconut cream, white chocolate, cherry juice",
      "TR": "Çilek püresi, krema, hindistan cevizi kreması, beyaz çikolata, vişne suyu"
    },
    "allergens": ["G"],
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "ss_iced_americano",
    "name": {
      "DE": "Iced Americano",
      "EN": "Iced Americano",
      "TR": "Iced Americano"
    },
    "price": 6.9,
    "description": {
      "DE": "Klassischer eisgekühlter Americano",
      "EN": "Classic iced Americano",
      "TR": "Klasik buzlu Americano"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  },
  {
    "id": "ss_iced_matcha",
    "name": {
      "DE": "Iced Matcha",
      "EN": "Iced Matcha",
      "TR": "Iced Matcha"
    },
    "price": 6.9,
    "description": {
      "DE": "Erfrischender Iced Matcha",
      "EN": "Refreshing iced Matcha",
      "TR": "Ferahlatıcı buzlu Matcha"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  },
  {
    "id": "c_espresso_doppio",
    "name": {
      "DE": "Espresso Doppio",
      "EN": "Espresso Doppio",
      "TR": "Espresso Doppio",
      "FR": "Espresso Doppio",
      "ES": "Espresso Doppio",
      "RU": "Espresso Doppio"
    },
    "price": 3.9,
    "description": {
      "DE": "Doppelter Espresso",
      "EN": "Double Espresso",
      "TR": "Duble Espresso"
    },
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten"
  },
  {
    "id": "t_cay_klein",
    "name": {
      "DE": "Kleiner Türkischer Tee",
      "EN": "Small Turkish Tea",
      "TR": "Küçük Çay",
      "FR": "Petit thé turc",
      "ES": "Pequeño té turco",
      "RU": "Маленький турецкий чай"
    },
    "price": 1.9,
    "description": {
      "DE": "Klassischer türkischer Schwarztee im kleinen Glas",
      "EN": "Classic Turkish black tea in a small glass",
      "TR": "İnce belli bardakta klasik Türk çayı"
    },
    "imageUrl": "/images/menury_originals/tee__cay_kleine.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_minztee",
    "name": {
      "DE": "Frischer Minztee",
      "EN": "Fresh Mint Tea",
      "TR": "Taze Nane Çayı",
      "FR": "Thé à la menthe fraîche",
      "ES": "Té de menta fresca",
      "RU": "Свежий мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Tee aus frischen Minzblättern",
      "EN": "Tea made from fresh mint leaves",
      "TR": "Taze nane yapraklarından çay"
    },
    "imageUrl": "/images/menury_originals/tee__frischer_minztee.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer",
    "name": {
      "DE": "Ingwer Tee",
      "EN": "Ginger Tea",
      "TR": "Zencefil Çayı",
      "FR": "Thé au gingembre",
      "ES": "Té de jengibre",
      "RU": "Имбирный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Wärmender Tee mit frischem Ingwer",
      "EN": "Warming tea with fresh ginger",
      "TR": "Taze zencefilli ısıtan çay"
    },
    "imageUrl": "/images/menury_originals/tee__ingwer_teee.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer_minze",
    "name": {
      "DE": "Ingwer Minze Tee",
      "EN": "Ginger Mint Tea",
      "TR": "Zencefilli Nane Çayı",
      "FR": "Thé gingembre-menthe",
      "ES": "Té de jengibre y menta",
      "RU": "Имбирно-мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Erfrischende Kombination aus Ingwer und Minze",
      "EN": "Refreshing combination of ginger and mint",
      "TR": "Zencefil ve nanenin ferahlatıcı uyumu"
    },
    "imageUrl": "/images/menury_originals/tee__ingwer_minze_tee.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_huerrem",
    "name": {
      "DE": "Hürrem Tee",
      "EN": "Hürrem Tea",
      "TR": "Hürrem Çayı",
      "FR": "Thé Hürrem",
      "ES": "Té Hürrem",
      "RU": "Чай Хюррем"
    },
    "price": 5.2,
    "description": {
      "DE": "Unsere exklusive Hürrem Hausmischung",
      "EN": "Our exclusive Hürrem house blend",
      "TR": "Özel Hürrem ev yapımı harmanımız"
    },
    "imageUrl": "/images/menury_originals/kraeuter_und_bluetentees__huerrem_tee.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_linden",
    "name": {
      "DE": "Lindenblüten Tee",
      "EN": "Linden Blossom Tea",
      "TR": "Ihlamur Çayı",
      "FR": "Thé de tilleul",
      "ES": "Té de tilo",
      "RU": "Липовый чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Beruhigender Lindenblütentee",
      "EN": "Soothing linden blossom tea",
      "TR": "Rahatlatıcı ıhlamur çayı"
    },
    "imageUrl": "/images/menury_originals/tee__lindenbluten_tee.webp",
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  }
];

export const quizQuestions = [
  {
    id: 'q1',
    question: 'Hangi tat profili sana daha yakın?',
    options: [
      { text: 'Tatlı ve Meyveli 🍓', tag: 'sweet' },
      { text: 'Ferah ve Naneli ❄️', tag: 'fresh' },
      { text: 'Yoğun ve Karakterli ☕', tag: 'intense' },
    ]
  },
  {
    id: 'q2',
    question: 'Bugün ruh halin nasıl?',
    options: [
      { text: 'Egzotik maceralar arıyorum 🌴', tag: 'exotic' },
      { text: 'Klasiklerden şaşmam 🏛️', tag: 'classic' },
      { text: 'Yumuşak ve kremsi 🥥', tag: 'creamy' },
    ]
  }
,
  // --- ADDED FINGER FOOD ---
  {
    id: 'f_ff_1',
    name: { DE: 'Classic Fries', EN: 'Classic Fries', TR: 'Klasik Patates', FR: 'Classic Fries', ES: 'Classic Fries', RU: 'Classic Fries' },
    price: 4.90,
    description: { DE: 'Knusprige klassische Pommes Frites.', EN: 'Crispy classic french fries.', TR: 'Çıtır klasik patates kızartması.', FR: 'Frites classiques croustillantes.', ES: 'Patatas fritas clásicas y crujientes.', RU: 'Хрустящий классический картофель фри.' },
    imageUrl: '/images/menury_originals/finger_food__classic_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_2',
    name: { DE: 'Curly Fries', EN: 'Curly Fries', TR: 'Kıvırcık Patates', FR: 'Curly Fries', ES: 'Curly Fries', RU: 'Curly Fries' },
    price: 5.50,
    description: { DE: 'Würzige Curly Fries.', EN: 'Spicy curly fries.', TR: 'Baharatlı kıvırcık patates.', FR: 'Würzige Curly Fries.', ES: 'Würzige Curly Fries.', RU: 'Würzige Curly Fries.' },
    imageUrl: '/images/menury_originals/finger_food__curly_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_3',
    name: { DE: 'Sweet Potato Fries', EN: 'Sweet Potato Fries', TR: 'Tatlı Patates', FR: 'Sweet Potato Fries', ES: 'Sweet Potato Fries', RU: 'Sweet Potato Fries' },
    price: 6.50,
    description: { DE: 'Knusprige Süßkartoffelpommes.', EN: 'Crispy sweet potato fries.', TR: 'Çıtır tatlı patates kızartması.', FR: 'Frites de patates douces croustillantes.', ES: 'Patatas fritas crujientes.', RU: 'Knusprige Süßkartoffelpommes.' },
    imageUrl: '/images/menury_originals/finger_food__sweet_potato_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_4',
    name: { DE: 'Crunchy Finger Food Platter', EN: 'Crunchy Finger Food Platter', TR: 'Çıtır Karışık Tabak', FR: 'Crunchy Finger Food Platter', ES: 'Crunchy Finger Food Platter', RU: 'Crunchy Finger Food Platter' },
    price: 14.90,
    description: { DE: 'Eine bunte Mischung aus knusprigen Snacks.', EN: 'A colorful mix of crispy snacks.', TR: 'Çıtır atıştırmalıklardan oluşan karışık tabak.', FR: 'Eine bunte Mischung aus knusprigen Snacks.', ES: 'Eine bunte Mischung aus knusprigen Snacks.', RU: 'Eine bunte Mischung aus knusprigen Snacks.' },
    imageUrl: '/images/menury_originals/finger_food__crunchy_finger_food_platter.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_5',
    name: { DE: 'Hürrem Knabbermix', EN: 'Hürrem Snack Mix', TR: 'Hürrem Çerez Mix', FR: 'Mélange de collations Hürrem', ES: 'Mezcla de snacks Hürrem', RU: 'Закусочная смесь Хюррем' },
    price: 6.90,
    description: { DE: 'Hausgemachter Knabbermix.', EN: 'Homemade snack mix.', TR: 'Ev yapımı çerez karışımı.', FR: 'Mélange de collations maison.', ES: 'Mezcla de snacks caseros.', RU: 'Hausgemachter Knabbermix.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_knabbermix.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_6',
    name: { DE: 'Hürrem Nuss Deluxe', EN: 'Hürrem Nut Deluxe', TR: 'Hürrem Lüks Kuruyemiş', FR: 'Hürrem Nuss Deluxe', ES: 'Hürrem Nuss Deluxe', RU: 'Hürrem Nuss Deluxe' },
    price: 8.90,
    description: { DE: 'Hochwertige Nussmischung.', EN: 'Premium nut mix.', TR: 'Lüks kuruyemiş karışımı.', FR: 'Hochwertige Nussmischung.', ES: 'Hochwertige Nussmischung.', RU: 'Hochwertige Nussmischung.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_nuss_deluxe.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  
  // --- ADDED SUPPEN ---
  {
    id: 'f_soup_1',
    name: { DE: 'Linsensuppe', EN: 'Lentil Soup', TR: 'Mercimek Çorbası', FR: 'Soupe aux lentilles', ES: 'sopa de lentejas', RU: 'Чечевичный суп' },
    price: 6.90,
    description: { DE: 'Hausgemachte traditionelle Linsensuppe.', EN: 'Homemade traditional lentil soup.', TR: 'Geleneksel ev yapımı mercimek çorbası.', FR: 'Hausgemachte traditionelle Linsensuppe.', ES: 'Hausgemachte traditionelle Linsensuppe.', RU: 'Hausgemachte traditionelle Linsensuppe.' },
    imageUrl: '/images/menury_originals/suppen__linsensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },
  {
    id: 'f_soup_2',
    name: { DE: 'Tomatensuppe', EN: 'Tomato Soup', TR: 'Domates Çorbası', FR: 'Soupe à la tomate', ES: 'Sopa de tomate', RU: 'Томатный суп' },
    price: 6.50,
    description: { DE: 'Fruchtige Tomatensuppe mit Basilikum.', EN: 'Fruity tomato soup with basil.', TR: 'Fesleğenli taze domates çorbası.', FR: 'Soupe fruitée de tomates au basilic.', ES: 'Sopa de tomate afrutada con albahaca.', RU: 'Фруктовый томатный суп с базиликом.' },
    imageUrl: '/images/menury_originals/suppen__tomatensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },

  // --- ADDED VORSPEISEN ---
  {
    id: 'f_vor_1',
    name: { DE: 'Acili Ezme', EN: 'Spicy Tomato Dip', TR: 'Acılı Ezme', FR: 'Acili Ezmé', ES: 'Acili Ezme', RU: 'Acili Ezme' },
    price: 5.90,
    description: { DE: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.', EN: 'Spicy dip made from finely chopped tomatoes and peppers.', TR: 'İnce kıyılmış domates ve biberden acılı ezme.', FR: 'Trempette épicée à base de tomates et de poivrons finement hachés.', ES: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.', RU: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.' },
    imageUrl: '/images/menury_originals/vorspeisen__acili_ezme.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_2',
    name: { DE: 'Edamame', EN: 'Edamame', TR: 'Edamame', FR: 'Édamame', ES: 'Edamame', RU: 'Эдамаме' },
    price: 5.50,
    description: { DE: 'Gedämpfte Sojabohnen mit Meersalz.', EN: 'Steamed soybeans with sea salt.', TR: 'Deniz tuzu ile buharda pişmiş soya fasulyesi.', FR: 'Soja cuit à la vapeur avec du sel marin.', ES: 'Gedämpfte Sojabohnen mit Meersalz.', RU: 'Соевые бобы, приготовленные на пару с морской солью.' },
    imageUrl: '/images/menury_originals/vorspeisen__edamame.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_3',
    name: { DE: 'Frühlingsrollen', EN: 'Spring Rolls', TR: 'Sigara Böreği / Çin Böreği', FR: 'Frühlingsrollen', ES: 'rollitos de primavera', RU: 'Спринг-роллы' },
    price: 6.90,
    description: { DE: 'Knusprige Frühlingsrollen mit Sweet-Chili-Dip.', EN: 'Crispy spring rolls with sweet chili dip.', TR: 'Tatlı chili soslu çıtır börekler.', FR: 'Rouleaux de printemps croustillants avec trempette au chili doux.', ES: 'Rollitos de primavera crujientes con salsa de chile dulce.', RU: 'Хрустящие спринг-роллы со сладким соусом из чили.' },
    imageUrl: '/images/menury_originals/vorspeisen__fruehlingsrollen.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_4',
    name: { DE: 'Hummus', EN: 'Hummus', TR: 'Humus', FR: 'Houmous', ES: 'Hummus', RU: 'Хумус' },
    price: 6.50,
    description: { DE: 'Cremiges Kichererbsenpüree mit Tahini und Olivenöl.', EN: 'Creamy chickpea puree with tahini and olive oil.', TR: 'Tahin ve zeytinyağlı süzme humus.', FR: 'Purée de pois chiches crémeuse au tahini et à l\'huile d\'olive.', ES: 'Puré cremoso de garbanzos con tahini y aceite de oliva.', RU: 'Сливочное пюре из нута с тахиной и оливковым маслом.' },
    imageUrl: '/images/menury_originals/vorspeisen__hummus.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },

  // --- ADDED HIGH CLASS COCKTAILS ---
  {
    id: 'd_hc_1',
    name: { DE: 'Another One Wood Smoke', EN: 'Another One Wood Smoke', TR: 'Another One Wood Smoke' },
    price: 12.90,
    description: { DE: 'Exklusiver Cocktail mit Rauch-Aroma.', EN: 'Exclusive cocktail with wood smoke flavor.', TR: 'Özel tütsülenmiş kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__another_one_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_2',
    name: { DE: 'Cloud Seven Balloon Glass', EN: 'Cloud Seven Balloon Glass', TR: 'Cloud Seven Balloon Glass' },
    price: 13.90,
    description: { DE: 'Ein himmlischer Genuss im Ballonglas.', EN: 'A heavenly delight in a balloon glass.', TR: 'Balon bardakta eşsiz bir lezzet.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cloud_seven_balloon_glass.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_3',
    name: { DE: 'Funky Passion Bubble Tea', EN: 'Funky Passion Bubble Tea', TR: 'Funky Passion Bubble Tea', FR: 'Funky Passion Bubble Tea', ES: 'Funky Passion Bubble Tea', RU: 'Funky Passion Bubble Tea' },
    price: 11.90,
    description: { DE: 'Fruchtiger Cocktail mit Tapioka-Perlen.', EN: 'Fruity cocktail with tapioca pearls.', TR: 'Tapyoka incili meyveli kokteyl.', FR: 'Cocktail fruité aux perles de tapioca.', ES: 'Cóctel de frutas con perlas de tapioca.', RU: 'Фруктовый коктейль с жемчугом тапиоки.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__funky_passion_bubble_tea.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_4',
    name: { DE: 'Violet Wood Smoke', EN: 'Violet Wood Smoke', TR: 'Violet Wood Smoke' },
    price: 13.50,
    description: { DE: 'Mystischer lila Cocktail mit Rauch-Effekt.', EN: 'Mystical purple cocktail with smoke effect.', TR: 'Duman efektli mistik mor kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },

  // --- ADDED SIGNATURE COCKTAILS ---
  {
    id: 'd_sig_1',
    name: { DE: 'Blue Lychee Mosquito', EN: 'Blue Lychee Mosquito', TR: 'Blue Lychee Mosquito', FR: 'Moustique litchi bleu', ES: 'Blue Lychee Mosquito', RU: 'Blue Lychee Mosquito' },
    price: 9.40,
    description: { DE: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', EN: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', TR: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', FR: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', ES: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', RU: 'Чай Butterfly Pea, свежий личи, мята, тростниковый сахар, тоник, лайм.' },
    imageUrl: '/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_2',
    name: { DE: 'Coconut Kiss', EN: 'Coconut Kiss', TR: 'Coconut Kiss', FR: 'Coconut Kiss', ES: 'Coconut Kiss', RU: 'Coconut Kiss' },
    price: 8.90,
    description: { DE: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', EN: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', TR: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', FR: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', ES: 'Crema de coco, nata, zumo de piña, zumo de cereza, granadina', RU: 'Кокосовый крем, сливки, ананасовый сок, вишневый сок, гренадин' },
    imageUrl: '/images/menury_originals/signature_cocktails__coconut_kiss.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_3',
    name: { DE: 'Dragonfruit Sunset', EN: 'Dragonfruit Sunset', TR: 'Dragonfruit Sunset', FR: 'Dragonfruit Sunset', ES: 'Atardecer de fruta de dragón', RU: 'Dragonfruit Sunset' },
    price: 9.40,
    description: { DE: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', EN: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', TR: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', FR: 'Une explosion tropicale de couleurs dans un verre ! Super rafraîchissant et fruité-exotique avec de la poudre de fruit du dragon biologique de haute qualité et des baies. Obtenez les vacances directement dans votre verre !', ES: '¡Una explosión tropical de color en un vaso! Súper refrescante y afrutado exótico con fruta del dragón en polvo y bayas orgánicas de alta calidad. ¡Obtén las vacaciones directamente en tu vaso!', RU: 'Тропический взрыв цвета в бокале! Супер освежающий и фруктово-экзотический с высококачественным органическим порошком драконьего фрукта и ягодами. Получите праздник прямо в свой стакан!' },
    imageUrl: '/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_4',
    name: { DE: 'Fancy Love', EN: 'Fancy Love', TR: 'Fancy Love', FR: 'Amour fantaisie', ES: 'Amor elegante', RU: 'Необычная любовь' },
    price: 9.40,
    description: { DE: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', EN: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', TR: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', FR: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', ES: 'Jugo de piña, sirope de mango, agua de coco, jugo de lima, menta, maracuyá fresca, bayas de açai', RU: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren' },
    imageUrl: '/images/menury_originals/signature_cocktails__fancy_love.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_5',
    name: { DE: 'Mosquito', EN: 'Mosquito', TR: 'Mosquito', FR: 'Mosquito', ES: 'Mosquito', RU: 'Mosquito' },
    price: 8.90,
    description: { DE: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', EN: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', TR: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', FR: 'Ginger ale, menthe fraîche, citron vert, sucre de canne, glace pilée (avec Black28 : 10,90 €)', ES: 'Ginger ale, menta fresca, lima, azúcar de caña, hielo picado (con Black28: 10,90 €)', RU: 'Имбирный эль, свежая мята, лайм, тростниковый сахар, колотый лед (с Black28: 10,90 евро)' },
    imageUrl: '/images/menury_originals/signature_cocktails__mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    price: 4.90,
    description: { DE: 'Knusprige klassische Pommes Frites.', EN: 'Crispy classic french fries.', TR: 'Çıtır klasik patates kızartması.', FR: 'Frites classiques croustillantes.', ES: 'Patatas fritas clásicas y crujientes.', RU: 'Хрустящий классический картофель фри.' },
    imageUrl: '/images/menury_originals/finger_food__classic_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_2',
    name: { DE: 'Curly Fries', EN: 'Curly Fries', TR: 'Kıvırcık Patates', FR: 'Curly Fries', ES: 'Curly Fries', RU: 'Curly Fries' },
    price: 5.50,
    description: { DE: 'Würzige Curly Fries.', EN: 'Spicy curly fries.', TR: 'Baharatlı kıvırcık patates.', FR: 'Würzige Curly Fries.', ES: 'Würzige Curly Fries.', RU: 'Würzige Curly Fries.' },
    imageUrl: '/images/menury_originals/finger_food__curly_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_3',
    name: { DE: 'Sweet Potato Fries', EN: 'Sweet Potato Fries', TR: 'Tatlı Patates', FR: 'Sweet Potato Fries', ES: 'Sweet Potato Fries', RU: 'Sweet Potato Fries' },
    price: 6.50,
    description: { DE: 'Knusprige Süßkartoffelpommes.', EN: 'Crispy sweet potato fries.', TR: 'Çıtır tatlı patates kızartması.', FR: 'Frites de patates douces croustillantes.', ES: 'Patatas fritas crujientes.', RU: 'Knusprige Süßkartoffelpommes.' },
    imageUrl: '/images/menury_originals/finger_food__sweet_potato_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_4',
    name: { DE: 'Crunchy Finger Food Platter', EN: 'Crunchy Finger Food Platter', TR: 'Çıtır Karışık Tabak', FR: 'Crunchy Finger Food Platter', ES: 'Crunchy Finger Food Platter', RU: 'Crunchy Finger Food Platter' },
    price: 14.90,
    description: { DE: 'Eine bunte Mischung aus knusprigen Snacks.', EN: 'A colorful mix of crispy snacks.', TR: 'Çıtır atıştırmalıklardan oluşan karışık tabak.', FR: 'Eine bunte Mischung aus knusprigen Snacks.', ES: 'Eine bunte Mischung aus knusprigen Snacks.', RU: 'Eine bunte Mischung aus knusprigen Snacks.' },
    imageUrl: '/images/menury_originals/finger_food__crunchy_finger_food_platter.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_5',
    name: { DE: 'Hürrem Knabbermix', EN: 'Hürrem Snack Mix', TR: 'Hürrem Çerez Mix', FR: 'Mélange de collations Hürrem', ES: 'Mezcla de snacks Hürrem', RU: 'Закусочная смесь Хюррем' },
    price: 6.90,
    description: { DE: 'Hausgemachter Knabbermix.', EN: 'Homemade snack mix.', TR: 'Ev yapımı çerez karışımı.', FR: 'Mélange de collations maison.', ES: 'Mezcla de snacks caseros.', RU: 'Hausgemachter Knabbermix.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_knabbermix.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_6',
    name: { DE: 'Hürrem Nuss Deluxe', EN: 'Hürrem Nut Deluxe', TR: 'Hürrem Lüks Kuruyemiş', FR: 'Hürrem Nuss Deluxe', ES: 'Hürrem Nuss Deluxe', RU: 'Hürrem Nuss Deluxe' },
    price: 8.90,
    description: { DE: 'Hochwertige Nussmischung.', EN: 'Premium nut mix.', TR: 'Lüks kuruyemiş karışımı.', FR: 'Hochwertige Nussmischung.', ES: 'Hochwertige Nussmischung.', RU: 'Hochwertige Nussmischung.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_nuss_deluxe.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  
  // --- ADDED SUPPEN ---
  {
    id: 'f_soup_1',
    name: { DE: 'Linsensuppe', EN: 'Lentil Soup', TR: 'Mercimek Çorbası', FR: 'Soupe aux lentilles', ES: 'sopa de lentejas', RU: 'Чечевичный суп' },
    price: 6.90,
    description: { DE: 'Hausgemachte traditionelle Linsensuppe.', EN: 'Homemade traditional lentil soup.', TR: 'Geleneksel ev yapımı mercimek çorbası.', FR: 'Hausgemachte traditionelle Linsensuppe.', ES: 'Hausgemachte traditionelle Linsensuppe.', RU: 'Hausgemachte traditionelle Linsensuppe.' },
    imageUrl: '/images/menury_originals/suppen__linsensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },
  {
    id: 'f_soup_2',
    name: { DE: 'Tomatensuppe', EN: 'Tomato Soup', TR: 'Domates Çorbası', FR: 'Soupe à la tomate', ES: 'Sopa de tomate', RU: 'Томатный суп' },
    price: 6.50,
    description: { DE: 'Fruchtige Tomatensuppe mit Basilikum.', EN: 'Fruity tomato soup with basil.', TR: 'Fesleğenli taze domates çorbası.', FR: 'Soupe fruitée de tomates au basilic.', ES: 'Sopa de tomate afrutada con albahaca.', RU: 'Фруктовый томатный суп с базиликом.' },
    imageUrl: '/images/menury_originals/suppen__tomatensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },

  // --- ADDED VORSPEISEN ---
  {
    id: 'f_vor_1',
    name: { DE: 'Acili Ezme', EN: 'Spicy Tomato Dip', TR: 'Acılı Ezme', FR: 'Acili Ezmé', ES: 'Acili Ezme', RU: 'Acili Ezme' },
    price: 5.90,
    description: { DE: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.', EN: 'Spicy dip made from finely chopped tomatoes and peppers.', TR: 'İnce kıyılmış domates ve biberden acılı ezme.', FR: 'Trempette épicée à base de tomates et de poivrons finement hachés.', ES: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.', RU: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.' },
    imageUrl: '/images/menury_originals/vorspeisen__acili_ezme.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_2',
    name: { DE: 'Edamame', EN: 'Edamame', TR: 'Edamame', FR: 'Édamame', ES: 'Edamame', RU: 'Эдамаме' },
    price: 5.50,
    description: { DE: 'Gedämpfte Sojabohnen mit Meersalz.', EN: 'Steamed soybeans with sea salt.', TR: 'Deniz tuzu ile buharda pişmiş soya fasulyesi.', FR: 'Soja cuit à la vapeur avec du sel marin.', ES: 'Gedämpfte Sojabohnen mit Meersalz.', RU: 'Соевые бобы, приготовленные на пару с морской солью.' },
    imageUrl: '/images/menury_originals/vorspeisen__edamame.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_3',
    name: { DE: 'Frühlingsrollen', EN: 'Spring Rolls', TR: 'Sigara Böreği / Çin Böreği', FR: 'Frühlingsrollen', ES: 'rollitos de primavera', RU: 'Спринг-роллы' },
    price: 6.90,
    description: { DE: 'Knusprige Frühlingsrollen mit Sweet-Chili-Dip.', EN: 'Crispy spring rolls with sweet chili dip.', TR: 'Tatlı chili soslu çıtır börekler.', FR: 'Rouleaux de printemps croustillants avec trempette au chili doux.', ES: 'Rollitos de primavera crujientes con salsa de chile dulce.', RU: 'Хрустящие спринг-роллы со сладким соусом из чили.' },
    imageUrl: '/images/menury_originals/vorspeisen__fruehlingsrollen.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_4',
    name: { DE: 'Hummus', EN: 'Hummus', TR: 'Humus', FR: 'Houmous', ES: 'Hummus', RU: 'Хумус' },
    price: 6.50,
    description: { DE: 'Cremiges Kichererbsenpüree mit Tahini und Olivenöl.', EN: 'Creamy chickpea puree with tahini and olive oil.', TR: 'Tahin ve zeytinyağlı süzme humus.', FR: 'Purée de pois chiches crémeuse au tahini et à l\'huile d\'olive.', ES: 'Puré cremoso de garbanzos con tahini y aceite de oliva.', RU: 'Сливочное пюре из нута с тахиной и оливковым маслом.' },
    imageUrl: '/images/menury_originals/vorspeisen__hummus.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },

  // --- ADDED HIGH CLASS COCKTAILS ---
  {
    id: 'd_hc_1',
    name: { DE: 'Another One Wood Smoke', EN: 'Another One Wood Smoke', TR: 'Another One Wood Smoke' },
    price: 12.90,
    description: { DE: 'Exklusiver Cocktail mit Rauch-Aroma.', EN: 'Exclusive cocktail with wood smoke flavor.', TR: 'Özel tütsülenmiş kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__another_one_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_2',
    name: { DE: 'Cloud Seven Balloon Glass', EN: 'Cloud Seven Balloon Glass', TR: 'Cloud Seven Balloon Glass' },
    price: 13.90,
    description: { DE: 'Ein himmlischer Genuss im Ballonglas.', EN: 'A heavenly delight in a balloon glass.', TR: 'Balon bardakta eşsiz bir lezzet.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cloud_seven_balloon_glass.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_3',
    name: { DE: 'Funky Passion Bubble Tea', EN: 'Funky Passion Bubble Tea', TR: 'Funky Passion Bubble Tea', FR: 'Funky Passion Bubble Tea', ES: 'Funky Passion Bubble Tea', RU: 'Funky Passion Bubble Tea' },
    price: 11.90,
    description: { DE: 'Fruchtiger Cocktail mit Tapioka-Perlen.', EN: 'Fruity cocktail with tapioca pearls.', TR: 'Tapyoka incili meyveli kokteyl.', FR: 'Cocktail fruité aux perles de tapioca.', ES: 'Cóctel de frutas con perlas de tapioca.', RU: 'Фруктовый коктейль с жемчугом тапиоки.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__funky_passion_bubble_tea.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_4',
    name: { DE: 'Violet Wood Smoke', EN: 'Violet Wood Smoke', TR: 'Violet Wood Smoke' },
    price: 13.50,
    description: { DE: 'Mystischer lila Cocktail mit Rauch-Effekt.', EN: 'Mystical purple cocktail with smoke effect.', TR: 'Duman efektli mistik mor kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },

  // --- ADDED SIGNATURE COCKTAILS ---
  {
    id: 'd_sig_1',
    name: { DE: 'Blue Lychee Mosquito', EN: 'Blue Lychee Mosquito', TR: 'Blue Lychee Mosquito', FR: 'Moustique litchi bleu', ES: 'Blue Lychee Mosquito', RU: 'Blue Lychee Mosquito' },
    price: 9.40,
    description: { DE: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', EN: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', TR: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', FR: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', ES: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', RU: 'Чай Butterfly Pea, свежий личи, мята, тростниковый сахар, тоник, лайм.' },
    imageUrl: '/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_2',
    name: { DE: 'Coconut Kiss', EN: 'Coconut Kiss', TR: 'Coconut Kiss', FR: 'Coconut Kiss', ES: 'Coconut Kiss', RU: 'Coconut Kiss' },
    price: 8.90,
    description: { DE: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', EN: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', TR: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', FR: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', ES: 'Crema de coco, nata, zumo de piña, zumo de cereza, granadina', RU: 'Кокосовый крем, сливки, ананасовый сок, вишневый сок, гренадин' },
    imageUrl: '/images/menury_originals/signature_cocktails__coconut_kiss.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_3',
    name: { DE: 'Dragonfruit Sunset', EN: 'Dragonfruit Sunset', TR: 'Dragonfruit Sunset', FR: 'Dragonfruit Sunset', ES: 'Atardecer de fruta de dragón', RU: 'Dragonfruit Sunset' },
    price: 9.40,
    description: { DE: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', EN: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', TR: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', FR: 'Une explosion tropicale de couleurs dans un verre ! Super rafraîchissant et fruité-exotique avec de la poudre de fruit du dragon biologique de haute qualité et des baies. Obtenez les vacances directement dans votre verre !', ES: '¡Una explosión tropical de color en un vaso! Súper refrescante y afrutado exótico con fruta del dragón en polvo y bayas orgánicas de alta calidad. ¡Obtén las vacaciones directamente en tu vaso!', RU: 'Тропический взрыв цвета в бокале! Супер освежающий и фруктово-экзотический с высококачественным органическим порошком драконьего фрукта и ягодами. Получите праздник прямо в свой стакан!' },
    imageUrl: '/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_4',
    name: { DE: 'Fancy Love', EN: 'Fancy Love', TR: 'Fancy Love', FR: 'Amour fantaisie', ES: 'Amor elegante', RU: 'Необычная любовь' },
    price: 9.40,
    description: { DE: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', EN: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', TR: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', FR: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', ES: 'Jugo de piña, sirope de mango, agua de coco, jugo de lima, menta, maracuyá fresca, bayas de açai', RU: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren' },
    imageUrl: '/images/menury_originals/signature_cocktails__fancy_love.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_5',
    name: { DE: 'Mosquito', EN: 'Mosquito', TR: 'Mosquito', FR: 'Mosquito', ES: 'Mosquito', RU: 'Mosquito' },
    price: 8.90,
    description: { DE: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', EN: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', TR: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', FR: 'Ginger ale, menthe fraîche, citron vert, sucre de canne, glace pilée (avec Black28 : 10,90 €)', ES: 'Ginger ale, menta fresca, lima, azúcar de caña, hielo picado (con Black28: 10,90 €)', RU: 'Имбирный эль, свежая мята, лайм, тростниковый сахар, колотый лед (с Black28: 10,90 евро)' },
    imageUrl: '/images/menury_originals/signature_cocktails__mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_6',
    name: { DE: 'Solero', EN: 'Solero', TR: 'Solero', FR: 'Soléro', ES: 'Solero', RU: 'Солеро' },
    price: 8.90,
    description: { DE: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', EN: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', TR: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', FR: 'Sirop de caramel, sirop de vanille, crème, jus de fruit de la passion, jus de mangue, jus d\'orange', ES: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', RU: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft' },
    imageUrl: '/images/menury_originals/signature_cocktails__solero.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },

  // --- Heiße Specials ---
  {
    id: 'd_hs_1',
    name: { DE: 'Chai Latte', EN: 'Chai Latte', TR: 'Chai Latte', FR: 'Chai Latte', ES: 'café con leche', RU: 'Chai Latte' },
    price: 4.50,
    description: { DE: 'Aromatischer Gewürztee kombiniert mit Milch und einem cremigen Milchschaum - würzig und beruhigend.', EN: 'Aromatic spiced tea combined with milk and creamy milk foam - spicy and soothing.', TR: 'Süt ve kremsi süt köpüğü ile harmanlanmış aromatik baharat çayı - baharatlı ve rahatlatıcı.', FR: 'Thé épicé aromatique combiné avec du lait et une mousse de lait crémeuse – épicé et apaisant.', ES: 'Té aromático y especiado combinado con leche y una cremosa espuma de leche, especiado y calmante.', RU: 'Ароматный пряный чай в сочетании с молоком и сливочной молочной пеной – пряный и успокаивающий.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_2',
    name: { DE: 'Matcha Latte', EN: 'Matcha Latte', TR: 'Matcha Latte', FR: 'Matcha Latte', ES: 'café con leche matcha', RU: 'Matcha Latte' },
    price: 4.90,
    description: { DE: 'Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.', EN: 'Fine Japanese green tea, frothily whipped - for all those who love a special taste.', TR: 'İnce Japon yeşil çayı, kremsi köpüklü - özel bir lezzet sevenler için.', FR: 'Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.', ES: 'Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.', RU: 'Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.' },
    imageUrl: '/images/menury_originals/heisse_specials__matcha_latte.webp',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_3',
    name: { DE: 'Weiße Schokolade', EN: 'White Chocolate', TR: 'Beyaz Çikolata', FR: 'Chocolat blanc', ES: 'Chocolate blanco', RU: 'Белый шоколад' },
    price: 4.90,
    description: { DE: 'Cremige weiße Schokolade, (Auf Wunsch mit Sahne und zerbröselten Spekulatius) - perfekt für süße Genussmomente.', EN: 'Creamy white chocolate, (with cream and crumbled speculoos on request) - perfect for sweet moments of pleasure.', TR: 'Kremsi beyaz çikolata, (istek üzerine krema ve ufalanmış speculoos bisküvisi ile) - tatlı keyif anları için mükemmel.' },
    imageUrl: '/images/menury_originals/heisse_specials__white_chocolate.webp',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_4',
    name: { DE: 'Heiße Schokolade', EN: 'Hot Chocolate', TR: 'Sıcak Çikolata', FR: 'Chocolat chaud', ES: 'Chocolate caliente', RU: 'Горячий шоколад' },
    price: 4.90,
    description: { DE: 'Intensive dunkle Schokolade, (Auf Wunsch mit Sahne) - ein Traum für Schokoladenliebhaber.', EN: 'Intensive dark chocolate, (with cream on request) - a dream for chocolate lovers.', TR: 'Yoğun bitter çikolata, (istek üzerine krema ile) - çikolata severler için bir rüya.' },
    imageUrl: '/images/menury_originals/heisse_specials__dark_chocolate.webp',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_5',
    name: { DE: 'Sahlep', EN: 'Sahlep', TR: 'Sahlep', FR: 'Sahlep', ES: 'Sahlep', RU: 'Сахлеп' },
    price: 4.50,
    description: { DE: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.', EN: 'A traditional, creamy hot drink with a subtle vanilla note and a hint of cinnamon.', TR: 'İnce vanilya notası ve bir tutam tarçın ile geleneksel, kremsi sıcak içecek.', FR: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.', ES: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.', RU: 'Традиционный сливочный горячий напиток с тонкими нотками ванили и корицы.' },
    imageUrl: '/images/menury_originals/heisse_specials__sahlep.webp',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },

  // --- SHAKES ---
  {
    id: 'd_shake_1',
    name: { DE: 'Royal Delight', EN: 'Royal Delight', TR: 'Royal Delight', FR: 'Royal Delight', ES: 'Royal Delight', RU: 'Royal Delight' },
    price: 7.90,
    description: { DE: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', EN: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', TR: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade ve Karamell - der Shake für echte Schoko-Liebhaber', FR: 'Un délice royal à base de MaxiKing crémeux, de chocolat et de caramel - le shake pour les vrais amateurs de chocolat', ES: 'Un capricho real elaborado con el cremoso MaxiKing, chocolate y caramelo: el batido para los verdaderos amantes del chocolate.', RU: 'Королевское лакомство из сливочного MaxiKing, шоколада и карамели – коктейль для настоящих ценителей шоколада.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_2',
    name: { DE: 'Midnight Cravings', EN: 'Midnight Cravings', TR: 'Midnight Cravings', FR: 'Envies de minuit', ES: 'Antojos de medianoche', RU: 'Полночная тяга' },
    price: 7.90,
    description: { DE: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck', EN: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck', TR: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck', FR: 'Le classique avec des biscuits Oreo et un soupçon de vanille - une nuit de rêve à chaque gorgée', ES: 'El clásico con galletas Oreo y un toque de vainilla: un sueño nocturno en cada sorbo', RU: 'Классика с печеньем Орео и нотками ванили – ночная мечта в каждом глотке.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_3',
    name: { DE: 'Hazelnut Bliss', EN: 'Hazelnut Bliss', TR: 'Hazelnut Bliss', FR: 'Le bonheur aux noisettes', ES: 'Felicidad de avellana', RU: 'Фундуковое блаженство' },
    price: 7.90,
    description: { DE: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht', EN: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht', TR: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht', FR: 'Un rêve gourmand au chocolat et aux noisettes avec des morceaux croquants de Kinder Bueno qui fondent dans la bouche', ES: 'Delicioso sueño de chocolate con avellanas y crujientes trozos de Kinder Bueno que se derriten en la boca', RU: 'Нежная орехово-шоколадная мечта с хрустящими кусочками Kinder Bueno, которые тают во рту' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_4',
    name: { DE: 'Tropical Escape', EN: 'Tropical Escape', TR: 'Tropical Escape', FR: 'Tropical Escape', ES: 'Tropical Escape', RU: 'Тропический побег' },
    price: 7.90,
    description: { DE: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', EN: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', TR: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', FR: 'Une aventure tropicale à base de noix de coco, de chocolat et de lait crémeux - des vacances dans un verre.', ES: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', RU: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_5',
    name: { DE: 'Banana Boost', EN: 'Banana Boost', TR: 'Banana Boost', FR: 'Banana Boost', ES: 'Banana Boost', RU: 'Банановый буст' },
    price: 7.90,
    description: { DE: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', EN: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', TR: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', FR: 'Du pouvoir pur ! Le beurre de cacahuète rencontre la banane fraîche et une touche de cannelle – le coup de pouce énergétique parfait.', ES: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', RU: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },

  // --- HAPPY HOUR COMBOS ---
  {
    id: 'hh_kombi1',
    name: { DE: 'Kombi 1', EN: 'Combo 1', TR: 'Kombi 1' },
    price: 18.90,
    description: { DE: 'Classic Pfeife + Tee (Schwarztee, Apfeltee, Früchtetee oder Grüntee). Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Tea (Black, Apple, Fruit or Green). Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Çay (Siyah, Elma, Meyve veya Yeşil). Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_kombi2',
    name: { DE: 'Kombi 2', EN: 'Combo 2', TR: 'Kombi 2' },
    price: 19.90,
    description: { DE: 'Classic Pfeife + Softdrink / Saft. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Soft drink / Juice. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Meşrubat / Meyve Suyu. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_kombi3',
    name: { DE: 'Kombi 3', EN: 'Combo 3', TR: 'Kombi 3' },
    price: 21.90,
    description: { DE: 'Classic Pfeife + Milchshake. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Milkshake. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Milkshake. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }

];

export const allergenLegend: Record<string, string> = {
  'A': 'Glutenhaltiges Getreide', 'B': 'Krebstiere', 'C': 'Eier', 'D': 'Fisch', 'E': 'Erdnüsse',
  'F': 'Sojabohnen', 'G': 'Milch', 'H': 'Schalenfrüchte', 'L': 'Sellerie', 'M': 'Senf',
  'N': 'Sesamsamen', 'O': 'Schwefeldioxid und Sulfite', 'P': 'Lupinen', 'R': 'Weichtiere'
};

export const additiveLegend: Record<string, string> = {
  '1': 'mit Farbstoff', '2': 'mit Konservierungsstoffen', '3': 'mit Antioxidationsmitteln',
  '4': 'mit Geschmacksverstärker', '5': 'geschwefelt', '6': 'geschwärzt', '7': 'mit Phosphat',
  '8': 'mit Süßungsmittel', '9': 'enthält eine Phenylalaninquelle', '10': 'gewachst',
  '11': 'mit Nitritpökelsalz', '12': 'Tartrazin', '13': 'koffeinhaltig', '14': 'chininhaltig',
  '15': 'genetisch verändert', '16': 'mit Milcheiweiß', '17': 'mit Taurin', '18': 'alkoholhaltig',
  '19': 'mit Laktose', '20': 'Säuerungsmittel', '21': 'unter Schutzatmosphäre verpackt',
  '22': 'mit Zucker und Süßungsmitteln'
};
