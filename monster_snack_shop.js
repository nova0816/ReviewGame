/* ==========================================================================
   Monster Snack Shop - Core Engine & Logic (Level 1-10 Expansion)
   ========================================================================== */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. DATABASE & CONFIGURATIONS
  // -------------------------------------------------------------------------

  // All 51 Food & Cutlery Items Database
  const ALL_ITEMS = [
    // Level 1 Base Foods (6 Items)
    { id: 'red_apple', name: 'Red Apple', pluralName: 'Red Apples', category: 'fruits', adjective: 'red', unlockLevel: 1 },
    { id: 'green_apple', name: 'Green Apple', pluralName: 'Green Apples', category: 'fruits', adjective: 'green', unlockLevel: 1 },
    { id: 'banana', name: 'Banana', pluralName: 'Bananas', category: 'fruits', adjective: 'yellow', unlockLevel: 1 },
    { id: 'cookie', name: 'Cookie', pluralName: 'Cookies', category: 'bakery', adjective: 'small', unlockLevel: 1 },
    { id: 'milk', name: 'Milk', pluralName: 'Milk', category: 'drinks', adjective: 'cold', unlockLevel: 1 },
    { id: 'juice', name: 'Juice', pluralName: 'Juices', category: 'drinks', adjective: 'red', unlockLevel: 1 },

    // Level 2 Unlocked Foods (+3 Items: Berries, Donut, Iced Tea)
    { id: 'berries', name: 'Berries', pluralName: 'Berries', category: 'fruits', adjective: 'blue', unlockLevel: 2 },
    { id: 'donut', name: 'Donut', pluralName: 'Donuts', category: 'bakery', adjective: 'big', unlockLevel: 2 },
    { id: 'iced_tea', name: 'Iced Tea', pluralName: 'Iced Teas', category: 'drinks', adjective: 'iced', unlockLevel: 2 },

    // Level 3 Unlocked Foods (+3 Items: Croissant, Cake, Cocoa)
    { id: 'croissant', name: 'Croissant', pluralName: 'Croissants', category: 'bakery', adjective: 'warm', unlockLevel: 3 },
    { id: 'cake', name: 'Cake', pluralName: 'Cakes', category: 'bakery', adjective: 'sweet', unlockLevel: 3 },
    { id: 'cocoa', name: 'Cocoa', pluralName: 'Cocoas', category: 'drinks', adjective: 'warm', unlockLevel: 3 },

    // Level 4 Unlocked Foods (+4 Items: Grape, Mango, Waffle, Muffin)
    { id: 'grape', name: 'Grape', pluralName: 'Grapes', category: 'fruits', adjective: 'sweet', unlockLevel: 4 },
    { id: 'mango', name: 'Mango', pluralName: 'Mangoes', category: 'fruits', adjective: 'ripe', unlockLevel: 4 },
    { id: 'waffle', name: 'Waffle', pluralName: 'Waffles', category: 'bakery', adjective: 'warm', unlockLevel: 4 },
    { id: 'muffin', name: 'Muffin', pluralName: 'Muffins', category: 'bakery', adjective: 'sweet', unlockLevel: 4 },

    // Level 5 Unlocked Foods (+4 Items: Peach, Cherry, Pretzel, Smoothie)
    { id: 'peach', name: 'Peach', pluralName: 'Peaches', category: 'fruits', adjective: 'juicy', unlockLevel: 5 },
    { id: 'cherry', name: 'Cherry', pluralName: 'Cherries', category: 'fruits', adjective: 'red', unlockLevel: 5 },
    { id: 'pretzel', name: 'Pretzel', pluralName: 'Pretzels', category: 'bakery', adjective: 'salty', unlockLevel: 5 },
    { id: 'smoothie', name: 'Smoothie', pluralName: 'Smoothies', category: 'drinks', adjective: 'fruity', unlockLevel: 5 },

    // Level 6 Unlocked Foods (+4 Items: Pineapple, Brownie, Lemonade, Hot Chocolate)
    { id: 'pineapple', name: 'Pineapple', pluralName: 'Pineapples', category: 'fruits', adjective: 'tropical', unlockLevel: 6 },
    { id: 'brownie', name: 'Brownie', pluralName: 'Brownies', category: 'bakery', adjective: 'rich', unlockLevel: 6 },
    { id: 'lemonade', name: 'Lemonade', pluralName: 'Lemonades', category: 'drinks', adjective: 'sour', unlockLevel: 6 },
    { id: 'hot_cocoa_marshmallow', name: 'Hot Chocolate', pluralName: 'Hot Chocolates', category: 'drinks', adjective: 'warm', unlockLevel: 6 },

    // Level 7 Unlocked Fast Foods (+7 Items)
    { id: 'orange', name: 'Orange', pluralName: 'Oranges', category: 'fruits', adjective: 'fresh', unlockLevel: 7 },
    { id: 'strawberry', name: 'Strawberry', pluralName: 'Strawberries', category: 'fruits', adjective: 'sweet', unlockLevel: 7 },
    { id: 'watermelon', name: 'Watermelon', pluralName: 'Watermelons', category: 'fruits', adjective: 'juicy', unlockLevel: 7 },
    { id: 'pizza', name: 'Pizza', pluralName: 'Pizzas', category: 'fastfood', adjective: 'hot', unlockLevel: 7 },
    { id: 'burger', name: 'Burger', pluralName: 'Burgers', category: 'fastfood', adjective: 'big', unlockLevel: 7 },
    { id: 'fries', name: 'Fries', pluralName: 'Fries', category: 'fastfood', adjective: 'crunchy', unlockLevel: 7 },
    { id: 'icecream', name: 'Ice Cream', pluralName: 'Ice Creams', category: 'bakery', adjective: 'cold', unlockLevel: 7 },

    // Level 8 Unlocked Foods (+6 Items)
    { id: 'cupcake', name: 'Cupcake', pluralName: 'Cupcakes', category: 'bakery', adjective: 'sweet', unlockLevel: 8 },
    { id: 'pancake', name: 'Pancake', pluralName: 'Pancakes', category: 'bakery', adjective: 'warm', unlockLevel: 8 },
    { id: 'hot_tea', name: 'Hot Tea', pluralName: 'Hot Teas', category: 'drinks', adjective: 'hot', unlockLevel: 8 },
    { id: 'soda', name: 'Soda', pluralName: 'Sodas', category: 'drinks', adjective: 'fizzy', unlockLevel: 8 },
    { id: 'water', name: 'Water', pluralName: 'Water', category: 'drinks', adjective: 'cold', unlockLevel: 8 },
    { id: 'iced_coffee', name: 'Iced Coffee', pluralName: 'Iced Coffees', category: 'drinks', adjective: 'cold', unlockLevel: 8 },

    // Level 9 Cutlery & Supplies (12 Items)
    { id: 'tissue', name: 'Tissue', pluralName: 'Tissues', category: 'cutlery', adjective: 'clean', unlockLevel: 9 },
    { id: 'plate', name: 'Plate', pluralName: 'Plates', category: 'cutlery', adjective: 'white', unlockLevel: 9 },
    { id: 'cup', name: 'Cup', pluralName: 'Cups', category: 'cutlery', adjective: 'glass', unlockLevel: 9 },
    { id: 'fork', name: 'Fork', pluralName: 'Forks', category: 'cutlery', adjective: 'metal', unlockLevel: 9 },
    { id: 'spoon', name: 'Spoon', pluralName: 'Spoons', category: 'cutlery', adjective: 'soup', unlockLevel: 9 },
    { id: 'knife', name: 'Knife', pluralName: 'Knives', category: 'cutlery', adjective: 'butter', unlockLevel: 9 },
    { id: 'straw', name: 'Straw', pluralName: 'Straws', category: 'cutlery', adjective: 'drink', unlockLevel: 9 },
    { id: 'napkin', name: 'Napkin', pluralName: 'Napkins', category: 'cutlery', adjective: 'cloth', unlockLevel: 9 },
    { id: 'bowl', name: 'Bowl', pluralName: 'Bowls', category: 'cutlery', adjective: 'soup', unlockLevel: 9 },
    { id: 'chopsticks', name: 'Chopsticks', pluralName: 'Chopsticks', category: 'cutlery', adjective: 'wooden', unlockLevel: 9 },
    { id: 'tray', name: 'Tray', pluralName: 'Trays', category: 'cutlery', adjective: 'serving', unlockLevel: 9 },
    { id: 'wet_wipe', name: 'Wet Wipe', pluralName: 'Wet Wipes', category: 'cutlery', adjective: 'wet', unlockLevel: 9 },

    // Level 10 Final Gourmet Items (+2 Items: Pie, Boba Drink)
    { id: 'pie', name: 'Pie', pluralName: 'Pies', category: 'bakery', adjective: 'crispy', unlockLevel: 10 },
    { id: 'boba_tea', name: 'Boba Drink', pluralName: 'Boba Drinks', category: 'drinks', adjective: 'sweet', unlockLevel: 10 }
  ];

  // Level Descriptions & Features (Levels 1 to 10)
  const LEVEL_DESCRIPTIONS = {
    1: "Level 1: 8 Monsters & 6 Base Foods Unlocked! (Apples, Banana, Cookie, Milk, Juice)",
    2: "Level 2: Unlocked Coco 🥥 & Pip 🌟! Unlocked Berries 🫐, Donut 🍩, Iced Tea 🧊!",
    3: "Level 3: Unlocked Noodle 🍜 & Zippy ⚡! Unlocked Croissant 🥐, Cake 🍰, Cocoa ☕!",
    4: "Level 4: Unlocked Puff ☁️ & Octo 🐙! Unlocked Grape 🍇, Mango 🥭, Waffle 🧇, Muffin 🧁!",
    5: "Level 5: Unlocked Munchkin 🧁 & Wobble 🍮! Unlocked Peach 🍑, Cherry 🍒, Pretzel 🥨, Smoothie 🥤!",
    6: "Level 6: Unlocked Dino 🦖 & Pixel 🎮! Unlocked Pineapple 🍍, Brownie 🍫, Lemonade 🍋, Hot Chocolate ☕!",
    7: "Level 7: Unlocked Cosmo 🚀 & Sprout 🌱! Unlocked Fast Food tab (Pizza, Burger, Fries, Ice Cream)!",
    8: "Level 8: Unlocked Boba 🧋 & Chip 🍪! Unlocked Cupcake, Pancake, Soda, Water, Iced Coffee! Cashier payment step added!",
    9: "Level 9: Unlocked Sunny ☀️ & Frosty 🍧! Unlocked 12 Cutlery & Supplies items!",
    10: "Level 10: Unlocked Twinkle 🦄 & Gummy 🍬! Unlocked Pie 🥧 & Boba Drink 🧋! Task Guidance Missions unlocked!"
  };

  // SVG Renderer Engine for All 26 Silly Monster Characters (Happy, Impatient, Angry)
  function getMonsterSvg(id, mood) {
    const isImpatient = mood === 'impatient';
    const isAngry = mood === 'angry';

    function getEyes(id, mood) {
      if (mood === 'angry') {
        return `<path d="M 45 70 L 62 78 M 95 78 L 112 70" stroke="#222" stroke-width="4" stroke-linecap="round"/><circle cx="55" cy="82" r="6" fill="#222"/><circle cx="95" cy="82" r="6" fill="#222"/>`;
      }
      if (mood === 'impatient') {
        return `<line x1="45" y1="78" x2="65" y2="78" stroke="#222" stroke-width="4" stroke-linecap="round"/><line x1="85" y1="78" x2="105" y2="78" stroke="#222" stroke-width="4" stroke-linecap="round"/>`;
      }

      switch(id) {
        case 'baby_blobby':
          return `<circle cx="52" cy="78" r="11" fill="#222"/><circle cx="98" cy="78" r="11" fill="#222"/><circle cx="49" cy="74" r="4" fill="#fff"/><circle cx="95" cy="74" r="4" fill="#fff"/><circle cx="55" cy="81" r="2" fill="#fff"/><circle cx="101" cy="81" r="2" fill="#fff"/>`;
        case 'gobby':
          return `<path d="M 40 68 Q 55 60 70 70" stroke="#222" stroke-width="3" fill="none"/><path d="M 80 70 Q 95 60 110 68" stroke="#222" stroke-width="3" fill="none"/><ellipse cx="55" cy="78" rx="8" ry="10" fill="#222"/><ellipse cx="95" cy="78" rx="8" ry="10" fill="#222"/><circle cx="53" cy="75" r="3" fill="#fff"/><circle cx="93" cy="75" r="3" fill="#fff"/>`;
        case 'fluffy':
          return `<path d="M 45 80 Q 55 68 65 80" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M 85 80 Q 95 68 105 80" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/>`;
        case 'sparky':
          return `<ellipse cx="53" cy="75" rx="10" ry="12" fill="#f1c40f" stroke="#222" stroke-width="2"/><ellipse cx="97" cy="75" rx="10" ry="12" fill="#f1c40f" stroke="#222" stroke-width="2"/><line x1="53" y1="65" x2="53" y2="85" stroke="#222" stroke-width="4"/><line x1="97" y1="65" x2="97" y2="85" stroke="#222" stroke-width="4"/>`;
        case 'mimi':
          return `<circle cx="55" cy="78" r="9" fill="#222"/><circle cx="95" cy="78" r="9" fill="#222"/><circle cx="58" cy="75" r="3" fill="#fff"/><circle cx="98" cy="75" r="3" fill="#fff"/><path d="M 44 70 L 40 64 M 48 67 L 46 60 M 106 70 L 110 64 M 102 67 L 104 60" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
        case 'kiki':
          return `<circle cx="42" cy="75" r="8" fill="#222"/><circle cx="70" cy="65" r="12" fill="#222"/><circle cx="98" cy="75" r="8" fill="#222"/><circle cx="44" cy="72" r="3" fill="#fff"/><circle cx="73" cy="61" r="4" fill="#fff"/><circle cx="100" cy="72" r="3" fill="#fff"/>`;
        case 'chomper':
          return `<circle cx="70" cy="62" r="18" fill="#fff" stroke="#222" stroke-width="3"/><circle cx="70" cy="62" r="8" fill="#00cec9"/><circle cx="70" cy="62" r="4" fill="#222"/><circle cx="73" cy="59" r="2.5" fill="#fff"/>`;
        case 'shadow':
          return `<ellipse cx="52" cy="75" rx="9" ry="12" fill="#2d3436"/><ellipse cx="98" cy="75" rx="9" ry="12" fill="#2d3436"/><ellipse cx="52" cy="75" rx="5" ry="7" fill="#74b9ff"/><ellipse cx="98" cy="75" rx="5" ry="7" fill="#74b9ff"/>`;
        case 'coco':
          return `<circle cx="48" cy="72" r="14" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="50" cy="74" r="7" fill="#222"/><circle cx="94" cy="76" r="8" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="93" cy="77" r="4" fill="#222"/>`;
        case 'pip':
          return `<circle cx="55" cy="78" r="10" fill="#222"/><circle cx="95" cy="78" r="10" fill="#222"/><polygon points="55,73 57,77 61,77 58,79 59,83 55,80 51,83 52,79 49,77 53,77" fill="#fff"/><polygon points="95,73 97,77 101,77 98,79 99,83 95,80 91,83 92,79 89,77 93,77" fill="#fff"/>`;
        case 'noodle':
          return `<path d="M 42 66 Q 52 60 62 68 M 88 68 Q 98 60 108 66" stroke="#222" stroke-width="3" fill="none"/><circle cx="52" cy="78" r="9" fill="#222"/><circle cx="98" cy="78" r="9" fill="#222"/><circle cx="55" cy="75" r="3" fill="#fff"/><circle cx="101" cy="75" r="3" fill="#fff"/>`;
        case 'zippy':
          return `<path d="M 40 68 L 52 64 L 62 70 M 110 68 L 98 64 L 88 70" stroke="#d63031" stroke-width="3.5" fill="none"/><circle cx="52" cy="78" r="9" fill="#222"/><circle cx="98" cy="78" r="9" fill="#222"/><circle cx="55" cy="75" r="3" fill="#fff"/><circle cx="101" cy="75" r="3" fill="#fff"/>`;
        case 'puff':
          return `<path d="M 45 76 C 45 70 65 70 65 76 C 65 82 45 82 45 76 Z" fill="#222"/><path d="M 85 76 C 85 70 105 70 105 76 C 105 82 85 82 85 76 Z" fill="#222"/><circle cx="52" cy="74" r="3" fill="#fff"/><circle cx="92" cy="74" r="3" fill="#fff"/>`;
        case 'octo':
          return `<ellipse cx="52" cy="70" rx="11" ry="9" fill="#fff" stroke="#222" stroke-width="2.5"/><ellipse cx="98" cy="70" rx="11" ry="9" fill="#fff" stroke="#222" stroke-width="2.5"/><rect x="45" y="68" width="14" height="4" rx="2" fill="#222"/><rect x="91" y="68" width="14" height="4" rx="2" fill="#222"/>`;
        case 'munchkin':
          return `<circle cx="53" cy="78" r="10" fill="#222"/><circle cx="97" cy="78" r="10" fill="#222"/><path d="M 53 74 C 53 71 50 71 50 74 C 50 76 53 78 53 79 C 53 78 56 76 56 74 C 56 71 53 71 53 74 Z" fill="#ff7675"/><path d="M 97 74 C 97 71 94 71 94 74 C 94 76 97 78 97 79 C 97 78 100 76 100 74 C 100 71 97 71 97 74 Z" fill="#ff7675"/>`;
        case 'wobble':
          return `<ellipse cx="52" cy="78" rx="8" ry="12" fill="#222"/><ellipse cx="98" cy="78" rx="8" ry="12" fill="#222"/><circle cx="50" cy="73" r="3.5" fill="#fff"/><circle cx="96" cy="73" r="3.5" fill="#fff"/>`;
        case 'dino':
          return `<path d="M 40 66 Q 55 58 70 66 M 80 66 Q 95 58 110 66" stroke="#006266" stroke-width="4" fill="none"/><circle cx="55" cy="76" r="9" fill="#222"/><circle cx="95" cy="76" r="9" fill="#222"/><circle cx="58" cy="73" r="3" fill="#fff"/><circle cx="98" cy="73" r="3" fill="#fff"/>`;
        case 'pixel':
          return `<rect x="42" y="68" width="18" height="14" rx="3" fill="#00cec9"/><rect x="80" y="68" width="18" height="14" rx="3" fill="#00cec9"/><rect x="48" y="72" width="6" height="6" fill="#fff"/><rect x="86" y="72" width="6" height="6" fill="#fff"/>`;
        case 'cosmo':
          return `<ellipse cx="53" cy="75" rx="10" ry="10" fill="#0984e3" stroke="#fff" stroke-width="2"/><ellipse cx="97" cy="75" rx="10" ry="10" fill="#0984e3" stroke="#fff" stroke-width="2"/><circle cx="55" cy="72" r="4" fill="#fff"/><circle cx="99" cy="72" r="4" fill="#fff"/>`;
        case 'sprout':
          return `<circle cx="53" cy="78" r="10" fill="#222"/><circle cx="97" cy="78" r="10" fill="#222"/><path d="M 53 72 C 48 76 53 82 53 82 C 53 82 58 76 53 72 Z" fill="#26de81"/><path d="M 97 72 C 92 76 97 82 97 82 C 97 82 102 76 97 72 Z" fill="#26de81"/>`;
        case 'boba':
          return `<circle cx="50" cy="76" r="11" fill="#2d3436"/><circle cx="90" cy="76" r="11" fill="#2d3436"/><circle cx="47" cy="72" r="4" fill="#fff"/><circle cx="87" cy="72" r="4" fill="#fff"/><circle cx="53" cy="79" r="2" fill="#fff"/><circle cx="93" cy="79" r="2" fill="#fff"/>`;
        case 'cookie_monster':
          return `<circle cx="48" cy="70" r="13" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="46" cy="68" r="6" fill="#222"/><circle cx="96" cy="72" r="14" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="98" cy="75" r="7" fill="#222"/>`;
        case 'sunny':
          return `<circle cx="53" cy="70" r="10" fill="#222"/><circle cx="97" cy="70" r="10" fill="#222"/><circle cx="56" cy="67" r="3.5" fill="#fff"/><circle cx="100" cy="67" r="3.5" fill="#fff"/><path d="M 38 70 L 33 70 M 112 70 L 117 70" stroke="#e67e22" stroke-width="3" stroke-linecap="round"/>`;
        case 'frosty':
          return `<circle cx="53" cy="76" r="10" fill="#0984e3"/><circle cx="97" cy="76" r="10" fill="#0984e3"/><polygon points="53,70 55,74 59,76 55,78 53,82 51,78 47,76 51,74" fill="#fff"/><polygon points="97,70 99,74 103,76 99,78 97,82 95,78 91,76 95,74" fill="#fff"/>`;
        case 'twinkle':
          return `<circle cx="53" cy="78" r="11" fill="#d63031"/><circle cx="97" cy="78" r="11" fill="#d63031"/><circle cx="50" cy="74" r="4.5" fill="#fff"/><circle cx="94" cy="74" r="4.5" fill="#fff"/><circle cx="56" cy="81" r="2.5" fill="#fff"/><circle cx="100" cy="81" r="2.5" fill="#fff"/>`;
        case 'gummy':
        default:
          return `<circle cx="53" cy="78" r="9" fill="#d63031" stroke="#222" stroke-width="2"/><circle cx="97" cy="78" r="9" fill="#d63031" stroke="#222" stroke-width="2"/><circle cx="55" cy="75" r="3" fill="#fff"/><circle cx="99" cy="75" r="3" fill="#fff"/>`;
      }
    }

    function getMouth(id, mood) {
      if (mood === 'angry') {
        return `<path d="M 50 115 Q 70 95 90 115" stroke="#222" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      }
      if (mood === 'impatient') {
        return `<line x1="50" y1="110" x2="90" y2="110" stroke="#222" stroke-width="4.5" stroke-linecap="round"/>`;
      }

      switch(id) {
        case 'baby_blobby':
          return `<circle cx="70" cy="105" r="7" fill="#222"/><ellipse cx="70" cy="105" rx="4" ry="5" fill="#ff7675"/>`;
        case 'gobby':
          return `<path d="M 45 98 Q 70 128 95 98 Z" fill="#222"/><polygon points="55,98 59,106 63,98" fill="#fff"/><polygon points="77,98 81,106 85,98" fill="#fff"/>`;
        case 'fluffy':
          return `<path d="M 48 98 Q 70 126 92 98 Z" fill="#222"/><path d="M 60 106 Q 70 122 80 106 Z" fill="#ff7675"/>`;
        case 'sparky':
          return `<path d="M 46 98 Q 70 126 94 98 Z" fill="#222"/><polygon points="54,98 58,105 62,98" fill="#fff"/><polygon points="78,98 82,105 86,98" fill="#fff"/>`;
        case 'mimi':
          return `<path d="M 52 98 Q 61 108 70 98 Q 79 108 88 98" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/><polygon points="66,94 74,94 70,98" fill="#ff7675"/>`;
        case 'kiki':
          return `<path d="M 45 102 L 53 110 L 61 102 L 69 110 L 77 102 L 85 110 L 93 102" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        case 'chomper':
          return `<rect x="42" y="96" width="56" height="22" rx="6" fill="#222"/><rect x="46" y="96" width="10" height="8" rx="1" fill="#fff"/><rect x="58" y="96" width="10" height="8" rx="1" fill="#fff"/><rect x="70" y="96" width="10" height="8" rx="1" fill="#fff"/><rect x="82" y="96" width="10" height="8" rx="1" fill="#fff"/>`;
        case 'shadow':
          return `<path d="M 46 102 Q 58 112 70 102 Q 82 92 94 102" stroke="#2d3436" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        case 'coco':
          return `<path d="M 52 105 Q 75 125 96 98" stroke="#222" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
        case 'pip':
          return `<ellipse cx="70" cy="100" rx="6" ry="7" fill="#222"/>`;
        case 'noodle':
          return `<path d="M 48 100 Q 70 125 92 100 Z" fill="#222"/><path d="M 64 104 Q 70 120 78 108 Z" fill="#ff7675"/>`;
        case 'zippy':
          return `<path d="M 46 98 Q 70 128 94 98 Z" fill="#222"/><polygon points="64,98 70,108 76,98" fill="#f1c40f"/>`;
        case 'puff':
          return `<circle cx="70" cy="102" r="7" fill="#222"/><path d="M 82 98 Q 88 94 94 98 M 85 104 Q 90 101 95 104" stroke="#0984e3" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
        case 'octo':
          return `<ellipse cx="70" cy="98" rx="8" ry="10" fill="#222" stroke="#d63031" stroke-width="2"/><ellipse cx="70" cy="98" rx="4" ry="6" fill="#ff7675"/>`;
        case 'munchkin':
          return `<path d="M 48 98 Q 70 126 92 98 Z" fill="#222"/><path d="M 48 98 Q 58 106 68 98 Q 78 106 88 98" stroke="#fff" stroke-width="3" fill="none"/>`;
        case 'wobble':
          return `<path d="M 46 100 Q 58 114 70 102 Q 82 114 94 100" stroke="#222" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
        case 'dino':
          return `<path d="M 44 96 Q 70 126 96 96 Z" fill="#222"/><polygon points="50,96 54,103 58,96" fill="#fff"/><polygon points="64,96 68,103 72,96" fill="#fff"/><polygon points="78,96 82,103 86,96" fill="#fff"/>`;
        case 'pixel':
          return `<rect x="45" y="98" width="50" height="12" rx="2" fill="#222"/><rect x="49" y="102" width="8" height="4" fill="#00cec9"/><rect x="61" y="102" width="8" height="4" fill="#00cec9"/><rect x="73" y="102" width="8" height="4" fill="#00cec9"/><rect x="85" y="102" width="8" height="4" fill="#00cec9"/>`;
        case 'cosmo':
          return `<path d="M 50 100 Q 70 120 90 100" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        case 'sprout':
          return `<path d="M 48 98 Q 70 122 92 98" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M 70 106 C 70 114 78 114 78 106 Z" fill="#26de81"/>`;
        case 'boba':
          return `<path d="M 48 98 Q 70 124 92 98 Z" fill="#222"/><ellipse cx="70" cy="106" rx="5" ry="6" fill="#ff7675"/>`;
        case 'cookie_monster':
          return `<path d="M 42 94 Q 70 130 98 94 Z" fill="#222"/><circle cx="48" cy="94" r="3" fill="#e1b12c"/><circle cx="92" cy="94" r="3" fill="#e1b12c"/>`;
        case 'sunny':
          return `<path d="M 44 94 Q 70 128 96 94 Z" fill="#222"/><path d="M 54 106 Q 70 122 86 106 Z" fill="#ff7675"/>`;
        case 'frosty':
          return `<path d="M 46 98 Q 70 124 94 98 Z" fill="#222"/><polygon points="56,98 60,105 64,98" fill="#81ecec"/><polygon points="76,98 80,105 84,98" fill="#81ecec"/>`;
        case 'twinkle':
          return `<path d="M 48 98 Q 70 124 92 98 Z" fill="#222"/><path d="M 58 104 Q 70 118 82 104 Z" fill="#fd79a8"/>`;
        case 'gummy':
        default:
          return `<ellipse cx="70" cy="95" rx="16" ry="12" fill="#fff" opacity="0.5"/><path d="M 62 94 Q 70 104 78 94" stroke="#222" stroke-width="3" fill="none"/><circle cx="70" cy="90" r="3.5" fill="#222"/>`;
      }
    }

    const eyeStyle = getEyes(id, mood);
    const mouthPath = getMouth(id, mood);

    switch (id) {
      case 'baby_blobby': // Pink Blobby
        return `<svg viewBox="0 0 140 140">
          <path d="M 20 100 C 10 30 130 30 120 100 C 130 130 10 130 20 100 Z" fill="#ff70a6" stroke="#ff477e" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
          <circle cx="35" cy="95" r="8" fill="#ff9ebb" opacity="0.6"/>
          <circle cx="105" cy="95" r="8" fill="#ff9ebb" opacity="0.6"/>
        </svg>`;

      case 'gobby': // Green Goblin
        return `<svg viewBox="0 0 140 140">
          <rect x="25" y="40" width="90" height="85" rx="30" fill="#70e000" stroke="#38b000" stroke-width="4"/>
          <path d="M 15 50 L 30 65 L 25 75 Z M 125 50 L 110 65 L 115 75 Z" fill="#70e000" stroke="#38b000" stroke-width="3"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'fluffy': // Purple Gentle Yeti
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 30 Q 70 10 110 30 Q 130 70 110 120 Q 70 135 30 120 Q 10 70 30 30 Z" fill="#a55eea" stroke="#8854d0" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
          <path d="M 40 20 L 50 35 M 70 15 L 70 32 M 100 20 L 90 35" stroke="#a55eea" stroke-width="4" stroke-linecap="round"/>
        </svg>`;

      case 'sparky': // Orange Dragon
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 40 Q 70 20 110 40 L 120 110 Q 70 130 20 110 Z" fill="#ff9f43" stroke="#ee5253" stroke-width="4"/>
          <polygon points="40,25 50,40 30,40" fill="#ee5253"/>
          <polygon points="100,25 110,40 90,40" fill="#ee5253"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'mimi': // Blue Bunny
        return `<svg viewBox="0 0 140 140">
          <ellipse cx="45" cy="30" rx="12" ry="25" fill="#4895ef" stroke="#4361ee" stroke-width="3"/>
          <ellipse cx="95" cy="30" rx="12" ry="25" fill="#4895ef" stroke="#4361ee" stroke-width="3"/>
          <circle cx="70" cy="80" r="45" fill="#4895ef" stroke="#4361ee" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'kiki': // Lime 3-Eyed Alien
        return `<svg viewBox="0 0 140 140">
          <circle cx="70" cy="75" r="45" fill="#54a0ff" stroke="#2e86de" stroke-width="4"/>
          <line x1="70" y1="30" x2="70" y2="10" stroke="#2e86de" stroke-width="4"/>
          <circle cx="70" cy="10" r="7" fill="#ff9f43"/>
          ${isAngry 
            ? '<circle cx="45" cy="65" r="6" fill="#222"/><circle cx="70" cy="60" r="6" fill="#222"/><circle cx="95" cy="65" r="6" fill="#222"/>'
            : '<circle cx="45" cy="65" r="8" fill="#222"/><circle cx="70" cy="60" r="10" fill="#222"/><circle cx="95" cy="65" r="8" fill="#222"/>'}
          ${mouthPath}
        </svg>`;

      case 'chomper': // Yellow Cyclops
        return `<svg viewBox="0 0 140 140">
          <circle cx="70" cy="75" r="48" fill="#feca57" stroke="#ff9f43" stroke-width="4"/>
          <circle cx="70" cy="65" r="16" fill="#fff" stroke="#222" stroke-width="3"/>
          <circle cx="70" cy="65" r="7" fill="#222"/>
          ${mouthPath}
        </svg>`;

      case 'shadow': // Ghost Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 110 C 20 20 120 20 110 110 L 95 100 L 80 110 L 65 100 L 50 110 L 35 100 Z" fill="#c8d6e5" stroke="#8395a7" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'coco': // Coconut Monster
        return `<svg viewBox="0 0 140 140">
          <circle cx="70" cy="75" r="46" fill="#834c32" stroke="#542e1b" stroke-width="4"/>
          <path d="M 30 50 Q 70 70 110 50" stroke="#542e1b" stroke-width="3" fill="none"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'pip': // Star Monster
        return `<svg viewBox="0 0 140 140">
          <polygon points="70,15 88,52 128,56 98,84 106,124 70,103 34,124 42,84 12,56 52,52" fill="#ffdd59" stroke="#ffa801" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'noodle': // Noodle Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 25 50 Q 70 30 115 50 Q 125 100 110 120 Q 70 135 30 120 Q 15 100 25 50 Z" fill="#ff7675" stroke="#d63031" stroke-width="4"/>
          <path d="M 40 30 Q 50 15 60 30 M 70 25 Q 80 10 90 25 M 100 30 Q 110 15 120 30" stroke="#fdcb6e" stroke-width="4" fill="none" stroke-linecap="round"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'zippy': // Lightning Volt Monster
        return `<svg viewBox="0 0 140 140">
          <polygon points="70,10 85,45 105,45 80,75 110,75 45,130 60,85 40,85" fill="#f1c40f" stroke="#f39c12" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'puff': // Cloud Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 35 100 C 15 100 15 70 30 65 C 20 40 50 30 65 45 C 80 25 110 35 110 60 C 125 65 125 95 105 100 Z" fill="#74b9ff" stroke="#0984e3" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'octo': // Octopus Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 60 C 30 20 110 20 110 60 C 110 85 100 100 95 125 C 85 105 75 125 70 105 C 65 125 55 105 45 125 C 40 100 30 85 30 60 Z" fill="#e84393" stroke="#d63031" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'munchkin': // Cupcake Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 75 Q 70 50 110 75 L 95 125 Q 70 135 45 125 Z" fill="#a29bfe" stroke="#6c5ce7" stroke-width="4"/>
          <path d="M 35 75 Q 70 25 105 75 Z" fill="#fd79a8" stroke="#e84393" stroke-width="3"/>
          <circle cx="70" cy="30" r="10" fill="#d63031"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'wobble': // Jelly Pudding Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 40 45 Q 70 35 100 45 L 115 115 Q 70 130 25 115 Z" fill="#55efc4" stroke="#00b894" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
          <ellipse cx="70" cy="45" rx="30" ry="8" fill="#81ecec" opacity="0.6"/>
        </svg>`;

      case 'dino': // Dino Monster
        return `<svg viewBox="0 0 140 140">
          <rect x="30" y="45" width="80" height="75" rx="35" fill="#00b894" stroke="#006266" stroke-width="4"/>
          <polygon points="40,45 30,30 50,40" fill="#fdcb6e"/>
          <polygon points="70,40 70,20 80,35" fill="#fdcb6e"/>
          <polygon points="100,45 110,30 95,40" fill="#fdcb6e"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'pixel': // Pixel Robot Monster
        return `<svg viewBox="0 0 140 140">
          <rect x="25" y="35" width="90" height="85" rx="14" fill="#6c5ce7" stroke="#341f97" stroke-width="4"/>
          <rect x="63" y="10" width="14" height="25" fill="#341f97"/>
          <circle cx="70" cy="10" r="8" fill="#ff7675"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'cosmo': // Cosmo Astronaut Monster
        return `<svg viewBox="0 0 140 140">
          <circle cx="70" cy="75" r="48" fill="#0984e3" stroke="#2c3e50" stroke-width="4"/>
          <circle cx="70" cy="75" r="40" fill="#74b9ff" opacity="0.3"/>
          <polygon points="70,12 80,28 60,28" fill="#f1c40f"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'sprout': // Plant Seedling Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 60 C 30 30 110 30 110 60 C 110 110 30 110 30 60 Z" fill="#2ed573" stroke="#26de81" stroke-width="4"/>
          <path d="M 70 35 C 50 15 70 5 70 5 C 70 5 90 15 70 35 Z" fill="#7bed9f" stroke="#26de81" stroke-width="3"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'boba': // Boba Pearl Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 35 40 L 105 40 L 95 125 Q 70 135 45 125 Z" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="4"/>
          <circle cx="50" cy="105" r="7" fill="#2d3436"/>
          <circle cx="70" cy="110" r="7" fill="#2d3436"/>
          <circle cx="90" cy="105" r="7" fill="#2d3436"/>
          <line x1="70" y1="40" x2="70" y2="10" stroke="#ff7675" stroke-width="6" stroke-linecap="round"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'cookie_monster': // Cookie Monster
        return `<svg viewBox="0 0 140 140">
          <circle cx="70" cy="75" r="48" fill="#e1b12c" stroke="#cd84f1" stroke-width="4"/>
          <circle cx="45" cy="45" r="6" fill="#4b6584"/>
          <circle cx="95" cy="45" r="6" fill="#4b6584"/>
          <circle cx="35" cy="90" r="6" fill="#4b6584"/>
          <circle cx="105" cy="90" r="6" fill="#4b6584"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'sunny': // Sun Monster
        return `<svg viewBox="0 0 140 140">
          <polygon points="70,10 80,30 100,15 100,38 125,35 112,55 135,70 112,85 125,105 100,102 100,125 80,110 70,130 60,110 40,125 40,102 15,105 28,85 5,70 28,55 15,35 40,38 40,15 60,30" fill="#f1c40f" stroke="#e67e22" stroke-width="3"/>
          <circle cx="70" cy="70" r="35" fill="#f39c12"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'frosty': // Snow Ice Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 40 50 Q 70 20 100 50 L 110 115 Q 70 130 30 115 Z" fill="#81ecec" stroke="#00cec9" stroke-width="4"/>
          <path d="M 35 50 Q 70 30 105 50" fill="#74b9ff" stroke="#0984e3" stroke-width="3"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'twinkle': // Unicorn Horn Monster
        return `<svg viewBox="0 0 140 140">
          <path d="M 30 55 C 30 25 110 25 110 55 L 115 115 Q 70 130 25 115 Z" fill="#fd79a8" stroke="#e84393" stroke-width="4"/>
          <polygon points="70,5 62,35 78,35" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="3"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;

      case 'gummy': // Candy Bear Monster
      default:
        return `<svg viewBox="0 0 140 140">
          <circle cx="35" cy="40" r="16" fill="#ff7675" stroke="#d63031" stroke-width="3"/>
          <circle cx="105" cy="40" r="16" fill="#ff7675" stroke="#d63031" stroke-width="3"/>
          <rect x="28" y="45" width="84" height="75" rx="35" fill="#ff7675" stroke="#d63031" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;
    }
  }

  // Silly Monster Profiles (8 Starting Monsters at L1, +2 Monsters Per Level Up To Level 10 - 26 Total!)
  const MONSTER_PROFILES = [
    // Level 1 (8 Monsters Starting Pool)
    { id: 'baby_blobby', name: 'Baby Blobby 🍼', pitch: 1.85, speed: 1.15, voiceType: 'child', unlockLevel: 1, getSvg: (m) => getMonsterSvg('baby_blobby', m) },
    { id: 'gobby', name: 'Gobby 👺', pitch: 1.6, speed: 1.1, voiceType: 'squeaky', unlockLevel: 1, getSvg: (m) => getMonsterSvg('gobby', m) },
    { id: 'fluffy', name: 'Fluffy 🐻', pitch: 0.55, speed: 0.75, voiceType: 'deep', unlockLevel: 1, getSvg: (m) => getMonsterSvg('fluffy', m) },
    { id: 'sparky', name: 'Sparky 🐲', pitch: 1.45, speed: 1.25, voiceType: 'energetic', unlockLevel: 1, getSvg: (m) => getMonsterSvg('sparky', m) },
    { id: 'mimi', name: 'Mimi 🐰', pitch: 1.55, speed: 1.05, voiceType: 'cute', unlockLevel: 1, getSvg: (m) => getMonsterSvg('mimi', m) },
    { id: 'kiki', name: 'Kiki 👾', pitch: 1.75, speed: 1.3, voiceType: 'alien', unlockLevel: 1, getSvg: (m) => getMonsterSvg('kiki', m) },
    { id: 'chomper', name: 'Chomper 👁️', pitch: 1.35, speed: 0.95, voiceType: 'bouncy', unlockLevel: 1, getSvg: (m) => getMonsterSvg('chomper', m) },
    { id: 'shadow', name: 'Shadow 👻', pitch: 0.8, speed: 0.7, voiceType: 'whisper', unlockLevel: 1, getSvg: (m) => getMonsterSvg('shadow', m) },

    // Level 2 (+2 Monsters -> 10 Total)
    { id: 'coco', name: 'Coco 🥥', pitch: 0.7, speed: 1.1, voiceType: 'raspy', unlockLevel: 2, getSvg: (m) => getMonsterSvg('coco', m) },
    { id: 'pip', name: 'Pip 🌟', pitch: 1.95, speed: 1.35, voiceType: 'tiny', unlockLevel: 2, getSvg: (m) => getMonsterSvg('pip', m) },

    // Level 3 (+2 Monsters -> 12 Total)
    { id: 'noodle', name: 'Noodle 🍜', pitch: 1.65, speed: 1.2, voiceType: 'cute', unlockLevel: 3, getSvg: (m) => getMonsterSvg('noodle', m) },
    { id: 'zippy', name: 'Zippy ⚡', pitch: 1.8, speed: 1.4, voiceType: 'energetic', unlockLevel: 3, getSvg: (m) => getMonsterSvg('zippy', m) },

    // Level 4 (+2 Monsters -> 14 Total)
    { id: 'puff', name: 'Puff ☁️', pitch: 1.7, speed: 1.0, voiceType: 'child', unlockLevel: 4, getSvg: (m) => getMonsterSvg('puff', m) },
    { id: 'octo', name: 'Octo 🐙', pitch: 1.2, speed: 1.1, voiceType: 'bouncy', unlockLevel: 4, getSvg: (m) => getMonsterSvg('octo', m) },

    // Level 5 (+2 Monsters -> 16 Total)
    { id: 'munchkin', name: 'Munchkin 🧁', pitch: 1.9, speed: 1.1, voiceType: 'squeaky', unlockLevel: 5, getSvg: (m) => getMonsterSvg('munchkin', m) },
    { id: 'wobble', name: 'Wobble 🍮', pitch: 0.9, speed: 0.85, voiceType: 'raspy', unlockLevel: 5, getSvg: (m) => getMonsterSvg('wobble', m) },

    // Level 6 (+2 Monsters -> 18 Total)
    { id: 'dino', name: 'Dino 🦖', pitch: 0.65, speed: 0.9, voiceType: 'deep', unlockLevel: 6, getSvg: (m) => getMonsterSvg('dino', m) },
    { id: 'pixel', name: 'Pixel 🎮', pitch: 1.5, speed: 1.3, voiceType: 'alien', unlockLevel: 6, getSvg: (m) => getMonsterSvg('pixel', m) },

    // Level 7 (+2 Monsters -> 20 Total)
    { id: 'cosmo', name: 'Cosmo 🚀', pitch: 1.1, speed: 1.15, voiceType: 'energetic', unlockLevel: 7, getSvg: (m) => getMonsterSvg('cosmo', m) },
    { id: 'sprout', name: 'Sprout 🌱', pitch: 1.8, speed: 1.2, voiceType: 'tiny', unlockLevel: 7, getSvg: (m) => getMonsterSvg('sprout', m) },

    // Level 8 (+2 Monsters -> 22 Total)
    { id: 'boba', name: 'Boba 🧋', pitch: 1.6, speed: 1.1, voiceType: 'cute', unlockLevel: 8, getSvg: (m) => getMonsterSvg('boba', m) },
    { id: 'cookie_monster', name: 'Chip 🍪', pitch: 1.4, speed: 1.0, voiceType: 'bouncy', unlockLevel: 8, getSvg: (m) => getMonsterSvg('cookie_monster', m) },

    // Level 9 (+2 Monsters -> 24 Total)
    { id: 'sunny', name: 'Sunny ☀️', pitch: 1.75, speed: 1.25, voiceType: 'child', unlockLevel: 9, getSvg: (m) => getMonsterSvg('sunny', m) },
    { id: 'frosty', name: 'Frosty 🍧', pitch: 0.75, speed: 0.8, voiceType: 'whisper', unlockLevel: 9, getSvg: (m) => getMonsterSvg('frosty', m) },

    // Level 10 (+2 Monsters -> 26 Total)
    { id: 'twinkle', name: 'Twinkle 🦄', pitch: 1.85, speed: 1.1, voiceType: 'cute', unlockLevel: 10, getSvg: (m) => getMonsterSvg('twinkle', m) },
    { id: 'gummy', name: 'Gummy 🍬', pitch: 1.5, speed: 1.2, voiceType: 'child', unlockLevel: 10, getSvg: (m) => getMonsterSvg('gummy', m) }
  ];

  const NUMBER_WORDS = ['one', 'two', 'three', 'four'];

  // Speech Variations
  const FOOD_THANK_YOU_PHRASES = [
    "Thank you! Fantastic job!",
    "Thanks! This looks super yummy!",
    "Good job! Thank you so much!",
    "Awesome! Delicious snacks!",
    "Great! I love it!",
    "Yummy, yummy! Thanks a lot!",
    "Wonderful! Delicious meal!",
    "Thank you! You are a great cafe boss!"
  ];

  const CUTLERY_THANK_YOU_PHRASES = [
    "Thank you! Now I have my supplies!",
    "Thanks a lot! You are super helpful!",
    "Awesome! Thanks for the clean cutlery!",
    "Great job! Now I am ready to eat!",
    "Thank you! Perfect cafe service!"
  ];

  const ACTION_THANK_YOU_PHRASES = [
    "Thank you so much! That was super helpful!",
    "Thanks! You are a very polite cafe host!",
    "Awesome! I know where to go now! Thanks!",
    "Great directions! Thank you very much!",
    "Wonderful! Thanks for your help!"
  ];

  const WRONG_ITEM_PHRASES = [
    "Hmm, that is not what I ordered!",
    "Oops! This is not what I want!",
    "Oh no, this is not my meal!",
    "Hmm, I didn't ask for this!",
    "Sorry, these are not the right items!"
  ];

  const FOOD_ANGRY_PHRASES = [
    "Where is my food, please? I am hungry!",
    "Excuse me, is my order ready yet?",
    "Hurry up, please! My tummy is rumbling!",
    "Where is my snack, please? I am starving!",
    "Hello! Don't forget my food, please!",
    "Excuse me, I have been waiting for my food!"
  ];

  const CUTLERY_ANGRY_PHRASES = [
    "Excuse me! Where are my cutlery supplies, please?",
    "Hello, can I get my napkin and utensils, please?",
    "Excuse me! I need my fork and plate to eat!",
    "Where are my supplies, please? I cannot eat without them!",
    "Excuse me! Please don't forget my cutlery!"
  ];

  const ACTION_ANGRY_PHRASES = [
    "Excuse me! Can someone help answer my question, please?",
    "Hello! Could someone please give me an answer?",
    "Excuse me! I am still waiting for an answer, please!",
    "Is anyone there? Can someone help me, please?",
    "Excuse me! Please help answer my question!"
  ];

  const TIMEOUT_WALKOUT_PHRASES = [
    "It's been too long, I don't want them anymore! Goodbye!",
    "I waited too long, I am leaving now! Bye!",
    "Too slow! I am going to another cafe! Goodbye!"
  ];

  const ORDER_PATTERNS = [
    { prefix: "Can I have ", suffix: ", please?" },
    { prefix: "I would like ", suffix: ", please." },
    { prefix: "I'd like ", suffix: ", please." },
    { prefix: "I want ", suffix: ", please." },
    { prefix: "I need ", suffix: ", please." },
    { prefix: "Please give me ", suffix: "." },
    { prefix: "Could I get ", suffix: ", please?" }
  ];

  // Level 10 Guidance Missions
  const ACTION_MISSIONS = [
    {
      question: "Excuse me, where is the toilet, please?",
      correct: "You go straight and turn right!",
      options: [
        { text: "You go straight and turn right!", isCorrect: true },
        { text: "I don't know!", isCorrect: false },
        { text: "It is on the moon!", isCorrect: false }
      ]
    },
    {
      question: "Hello! What time does the cafe close?",
      correct: "We close at 8 o'clock!",
      options: [
        { text: "We close at 8 o'clock!", isCorrect: true },
        { text: "I don't know!", isCorrect: false },
        { text: "We never sleep!", isCorrect: false }
      ]
    },
    {
      question: "Hi! How do I get to the sunny park?",
      correct: "Turn left and walk two blocks!",
      options: [
        { text: "Turn left and walk two blocks!", isCorrect: true },
        { text: "I don't know!", isCorrect: false },
        { text: "Fly into the clouds!", isCorrect: false }
      ]
    }
  ];

  // Shop Catalog
  const SHOP_CATALOG = {
    wallpapers: [
      { id: 'wall-default', name: 'Cozy Pastel', price: 0, color: '#f8ece4' },
      { id: 'wall-mint', name: 'Mint Fresh', price: 50, color: '#e6fcf5' },
      { id: 'wall-starry', name: 'Starry Night', price: 80, color: '#25262b' },
      { id: 'wall-candy', name: 'Candy Pink', price: 120, color: '#fff0f6' }
    ],
    tablecloths: [
      { id: 'cloth-default', name: 'Red Checker', price: 0, style: 'repeating-linear-gradient(45deg, #ff6b6b, #ff6b6b 16px, #ffffff 16px, #ffffff 32px)' },
      { id: 'cloth-blue', name: 'Blue Polka', price: 40, style: 'repeating-linear-gradient(45deg, #4ecdc4, #4ecdc4 16px, #ffffff 16px, #ffffff 32px)' },
      { id: 'cloth-gold', name: 'Golden Sparkle', price: 75, style: 'repeating-linear-gradient(45deg, #ffd43b, #ffd43b 16px, #ffffff 16px, #ffffff 32px)' }
    ],
    decor: [
      { id: 'decor-none', name: 'Empty Slot', price: 0, icon: '' },
      { id: 'decor-flowers', name: 'Cute Flowers', price: 45, icon: '💐' },
      { id: 'decor-neon', name: 'Neon Sign', price: 90, icon: '☕✨' },
      { id: 'decor-plush', name: 'Monster Plush', price: 110, icon: '🧸' }
    ]
  };

  // -------------------------------------------------------------------------
  // 2. GAME STATE MANAGEMENT
  // -------------------------------------------------------------------------

  let gameState = {
    level: 1,
    coins: 0,
    servedMonsters: 0,
    voiceEnabled: true,
    activeCategory: 'all',
    currentMonster: null,
    currentMood: 'happy',
    currentOrder: null, // { itemsNeeded, text, isCutlery, isActionMission, price, actionMission }
    trayItems: [],
    typedCashierVal: '',
    isSelfLearning: false,
    equipped: { wallpaper: 'wall-default', tablecloth: 'cloth-default', decor: 'decor-none' },
    inventory: ['wall-default', 'cloth-default', 'decor-none']
  };

  let patienceSeconds = 0;
  let patienceInterval = null;

  try {
    const saved = localStorage.getItem('monster_snack_shop_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState.coins = parsed.coins || 0;
      gameState.level = parsed.level || 1;
      gameState.servedMonsters = parsed.servedMonsters || 0;
      if (parsed.equipped) gameState.equipped = parsed.equipped;
      if (parsed.inventory) gameState.inventory = parsed.inventory;
    }
  } catch (e) {}

  function saveState() {
    try {
      localStorage.setItem('monster_snack_shop_save', JSON.stringify({
        coins: gameState.coins,
        level: gameState.level,
        servedMonsters: gameState.servedMonsters,
        equipped: gameState.equipped,
        inventory: gameState.inventory
      }));
    } catch (e) {}
  }

  // -------------------------------------------------------------------------
  // 3. AUDIO ENGINE & SPEECH SYNTHESIS
  // -------------------------------------------------------------------------

  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playSound(type) {
    initAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    if (type === 'add') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'clear') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.25, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'coin') {
      [987.77, 1318.51].forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08); osc.stop(now + idx * 0.08 + 0.15);
      });
    } else if (type === 'cheer') {
      [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.1);
        gain.gain.setValueAtTime(0.25, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.1 + 0.3);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.1); osc.stop(now + idx * 0.1 + 0.3);
      });
    } else if (type === 'angry') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4);
      gain.gain.setValueAtTime(0.3, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.4);
    }
  }

  function speakOrderText(text, profile, onEndCallback) {
    if (!gameState.voiceEnabled || !('speechSynthesis' in window)) {
      if (typeof onEndCallback === 'function') setTimeout(onEndCallback, 0);
      return;
    }
    window.speechSynthesis.cancel();
    
    const cleanSpeechText = (text || '').replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.pitch = profile ? profile.pitch : 1.0;
    utterance.rate = profile ? profile.speed : 1.0;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      let preferred = null;
      if (profile && (profile.voiceType === 'child' || profile.voiceType === 'tiny' || profile.voiceType === 'cute')) {
        preferred = voices.find(v => (v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Female')) && v.lang.startsWith('en'));
      } else if (profile && (profile.voiceType === 'deep' || profile.voiceType === 'raspy')) {
        preferred = voices.find(v => (v.name.includes('David') || v.name.includes('Male') || v.name.includes('George')) && v.lang.startsWith('en'));
      }
      if (!preferred) preferred = voices.find(v => v.lang.startsWith('en')) || voices[0];
      if (preferred) utterance.voice = preferred;
    }

    const audioBtn = document.getElementById('replaySpeechBtn');
    let callbackCalled = false;
    const handleEnd = () => {
      if (callbackCalled) return;
      callbackCalled = true;
      if (audioBtn) audioBtn.classList.remove('speaking');
      if (typeof onEndCallback === 'function') {
        onEndCallback();
      }
    };

    if (audioBtn) {
      utterance.onstart = () => audioBtn.classList.add('speaking');
    }
    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    // Safety fallback timer in case SpeechSynthesis onend fails to trigger
    const estimatedDuration = Math.max(1200, text.length * 90);
    setTimeout(() => {
      if (!callbackCalled) handleEnd();
    }, estimatedDuration);

    window.speechSynthesis.speak(utterance);
  }

  // -------------------------------------------------------------------------
  // 4. PATIENCE TIMER MECHANISM (30s Impatient, 60s Angry, 120s Timeout Walk-Out)
  // -------------------------------------------------------------------------

  function startPatienceTimer() {
    stopPatienceTimer();
    patienceSeconds = 0;
    gameState.currentMood = 'happy';

    const wrapper = document.getElementById('patienceWrapper');
    const fill = document.getElementById('patienceFill');
    const icon = document.getElementById('patienceIcon');
    const timeLabel = document.getElementById('patienceTime');

    wrapper.className = 'patience-bar-wrapper';
    fill.style.width = '100%';
    fill.style.backgroundColor = '#40c057';
    icon.textContent = '😊';
    timeLabel.textContent = '0s';

    patienceInterval = setInterval(() => {
      if (gameState.isSelfLearning) return; // Pause timer when in self-learning mode

      patienceSeconds++;
      timeLabel.textContent = `${patienceSeconds}s`;

      const pct = Math.max(0, 100 - (patienceSeconds / 120) * 100);
      fill.style.width = `${pct}%`;

      if (patienceSeconds >= 30 && patienceSeconds < 60 && gameState.currentMood === 'happy') {
        gameState.currentMood = 'impatient';
        wrapper.className = 'patience-bar-wrapper impatient';
        fill.style.backgroundColor = '#f59f00';
        icon.textContent = '😐';
        updateMonsterMoodVisuals('impatient');
        showToast(`${gameState.currentMonster.name} is waiting... ⏳`);

      } else if (patienceSeconds >= 60 && patienceSeconds < 120 && gameState.currentMood === 'impatient') {
        gameState.currentMood = 'angry';
        wrapper.className = 'patience-bar-wrapper angry';
        fill.style.backgroundColor = '#fa5252';
        icon.textContent = '😡';
        updateMonsterMoodVisuals('angry');
        playSound('angry');

        let phrasePool = FOOD_ANGRY_PHRASES;
        if (gameState.currentOrder && gameState.currentOrder.isActionMission) {
          phrasePool = ACTION_ANGRY_PHRASES;
        } else if (gameState.currentOrder && gameState.currentOrder.isCutlery) {
          phrasePool = CUTLERY_ANGRY_PHRASES;
        }

        const angrySpeech = phrasePool[Math.floor(Math.random() * phrasePool.length)];

        speakOrderText(angrySpeech, gameState.currentMonster);
        showToast(`${gameState.currentMonster.name} is angry! 😡`);

      } else if (patienceSeconds >= 120) {
        // 2-Minute (120s) Customer Timeout Walk-out
        stopPatienceTimer();

        let walkoutSpeech = TIMEOUT_WALKOUT_PHRASES[Math.floor(Math.random() * TIMEOUT_WALKOUT_PHRASES.length)];
        if (gameState.currentOrder && gameState.currentOrder.isActionMission) {
          walkoutSpeech = "No one helped me, I am leaving now! Goodbye!";
        } else if (gameState.currentOrder && gameState.currentOrder.isCutlery) {
          walkoutSpeech = "I waited too long for my cutlery! I'm leaving now! Goodbye!";
        }

        document.getElementById('orderText').textContent = `"${walkoutSpeech}"`;
        playSound('angry');
        showToast(`${gameState.currentMonster.name} waited 2 minutes and left! 🚶‍♂️`);

        speakOrderText(walkoutSpeech, gameState.currentMonster, () => {
          setTimeout(() => {
            gameState.trayItems = [];
            renderTray();
            renderMonsterCustomer();
          }, 1000);
        });
      }
    }, 1000);
  }

  function stopPatienceTimer() {
    if (patienceInterval) {
      clearInterval(patienceInterval);
      patienceInterval = null;
    }
  }

  function updateMonsterMoodVisuals(mood) {
    const sprite = document.getElementById('monsterSprite');
    if (!sprite || !gameState.currentMonster) return;
    sprite.className = 'monster-sprite';
    if (mood === 'impatient') sprite.classList.add('monster-impatient');
    if (mood === 'angry') sprite.classList.add('monster-angry');
    sprite.innerHTML = gameState.currentMonster.getSvg(mood);
  }

  // -------------------------------------------------------------------------
  // 5. ORDER GENERATOR (LEVEL 1-10 PROGRESSION & 50% FREQUENCY RULES)
  // -------------------------------------------------------------------------

  function generateOrder(level) {
    // Level 10 Task Guidance Mission Check (50% Frequency at Level 10)
    if (level >= 10 && Math.random() < 0.5) {
      const mission = ACTION_MISSIONS[Math.floor(Math.random() * ACTION_MISSIONS.length)];
      return {
        isActionMission: true,
        actionMission: mission,
        text: mission.question,
        itemsNeeded: []
      };
    }

    // Determine available unlocked items for current level
    const unlockedItems = ALL_ITEMS.filter(item => item.unlockLevel <= level);

    // Level 9 Cutlery Request Check
    let isCutlery = false;
    if (level >= 9 && Math.random() < 0.4) {
      isCutlery = true;
    }

    const availablePool = isCutlery 
      ? unlockedItems.filter(i => i.category === 'cutlery')
      : unlockedItems.filter(i => i.category !== 'cutlery');

    // Level 7+ Priority Rule: 50% of food orders must include items from Level 7 newly added foods!
    let selectedItems = [];
    let itemCount = 1;
    if (level >= 3) itemCount = 2;
    if (level >= 5 && Math.random() > 0.4) itemCount = 3;

    if (level >= 7 && !isCutlery && Math.random() < 0.5) {
      const l7Items = availablePool.filter(i => i.unlockLevel === 7);
      if (l7Items.length > 0) {
        const primaryL7 = l7Items[Math.floor(Math.random() * l7Items.length)];
        selectedItems.push(primaryL7);
      }
    }

    // Fill remaining item slots
    const poolShuffled = [...availablePool].sort(() => 0.5 - Math.random());
    poolShuffled.forEach(item => {
      if (selectedItems.length < itemCount && !selectedItems.some(i => i.id === item.id)) {
        selectedItems.push(item);
      }
    });

    const itemsNeeded = [];
    const clausePhrases = [];

    selectedItems.forEach(item => {
      const maxCount = level === 1 ? 1 : Math.floor(Math.random() * 2) + 1;
      itemsNeeded.push({ id: item.id, count: maxCount });

      const numWord = NUMBER_WORDS[maxCount - 1];
      const nounForm = maxCount === 1 ? item.name.toLowerCase() : item.pluralName.toLowerCase();
      clausePhrases.push(`${numWord} ${nounForm}`);
    });

    const pattern = ORDER_PATTERNS[Math.floor(Math.random() * ORDER_PATTERNS.length)];
    let itemsText = "";
    if (clausePhrases.length === 1) itemsText = clausePhrases[0];
    else if (clausePhrases.length === 2) itemsText = `${clausePhrases[0]} and ${clausePhrases[1]}`;
    else itemsText = `${clausePhrases[0]}, ${clausePhrases[1]}, and ${clausePhrases[2]}`;

    const sentence = `${pattern.prefix}${itemsText}${pattern.suffix}`;

    // Price calculation for Level 8+ Cashier Payment step
    const price = Math.floor(Math.random() * 40) + 10; // e.g. 10 to 50 coins

    return {
      isActionMission: false,
      isCutlery,
      itemsNeeded,
      text: sentence,
      price
    };
  }

  // -------------------------------------------------------------------------
  // 6. UI RENDERING ENGINE
  // -------------------------------------------------------------------------

  function updateHeaderStats() {
    document.getElementById('levelValue').textContent = gameState.level;
    document.getElementById('coinValue').textContent = gameState.coins;
    document.getElementById('servedValue').textContent = gameState.servedMonsters;
    document.getElementById('shopCoinDisplay').textContent = gameState.coins;

    // Show/hide Fast Food tab starting Level 7
    const fastfoodTabBtn = document.getElementById('fastfoodTabBtn');
    if (fastfoodTabBtn) {
      fastfoodTabBtn.style.display = gameState.level >= 7 ? 'inline-flex' : 'none';
    }

    // Show/hide Cutlery tab starting Level 9
    const cutleryTabBtn = document.getElementById('cutleryTabBtn');
    if (cutleryTabBtn) {
      cutleryTabBtn.style.display = gameState.level >= 9 ? 'inline-flex' : 'none';
    }
  }

  function getFoodIconHtml(foodId, sizeClass) {
    const s = sizeClass || 'size-md';
    const item = ALL_ITEMS.find(i => i.id === foodId);
    const prefix = (item && item.category === 'cutlery') ? 'item_' : 'food_';
    return `<img src="assets/${prefix}${foodId}.png" class="food-img-icon ${s}" alt="${foodId}" />`;
  }

  function renderPantryShelves() {
    const grid = document.getElementById('shelfGrid');
    grid.innerHTML = '';

    const unlocked = ALL_ITEMS.filter(i => i.unlockLevel <= gameState.level);
    const filtered = gameState.activeCategory === 'all' 
      ? unlocked 
      : unlocked.filter(item => item.category === gameState.activeCategory);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.setAttribute('data-id', item.id);
      card.innerHTML = `
        <div class="food-emoji">${getFoodIconHtml(item.id, 'size-lg')}</div>
        <div class="food-title">${item.name}</div>
        <div class="food-badge">${item.adjective}</div>
      `;

      card.addEventListener('click', () => {
        addItemToTray(item.id);
      });

      grid.appendChild(card);
    });
  }

  function renderTray() {
    const surface = document.getElementById('traySurface');
    const clearBtn = document.getElementById('clearTrayBtn');
    const serveBtn = document.getElementById('serveBtn');
    
    surface.innerHTML = '';

    if (gameState.trayItems.length === 0) {
      surface.innerHTML = `<div class="empty-tray-msg"><span>Tap snacks below to prepare the order!</span></div>`;
      clearBtn.disabled = true;
      serveBtn.disabled = true;
      return;
    }

    clearBtn.disabled = false;
    serveBtn.disabled = false;

    const counts = {};
    gameState.trayItems.forEach(id => counts[id] = (counts[id] || 0) + 1);

    Object.keys(counts).forEach(id => {
      const item = ALL_ITEMS.find(f => f.id === id);
      if (!item) return;

      const chip = document.createElement('div');
      chip.className = 'tray-item-chip';
      chip.innerHTML = `
        <span class="chip-icon">${getFoodIconHtml(item.id, 'size-md')}</span>
        <span class="chip-name">${counts[id] > 1 ? `${counts[id]}x ` : ''}${item.name}</span>
        <button class="chip-remove" title="Remove item">&times;</button>
      `;

      chip.querySelector('.chip-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        removeItemFromTray(id);
      });

      surface.appendChild(chip);
    });
  }

  function renderMonsterCustomer() {
    const availableMonsters = MONSTER_PROFILES.filter(m => (m.unlockLevel || 1) <= gameState.level);
    const monsterPool = availableMonsters.length > 0 ? availableMonsters : [MONSTER_PROFILES[0]];
    const monster = monsterPool[Math.floor(Math.random() * monsterPool.length)];
    gameState.currentMonster = monster;

    updateMonsterMoodVisuals('happy');
    document.getElementById('monsterNameTag').textContent = monster.name;

    const order = generateOrder(gameState.level);
    gameState.currentOrder = order;

    const orderTextEl = document.getElementById('orderText');
    orderTextEl.textContent = `"${order.text}"`;

    const breakdownEl = document.getElementById('orderBreakdown');
    breakdownEl.innerHTML = '';

    const actionBtn = document.getElementById('actionMissionBtn');

    if (order.isActionMission) {
      // Level 10 Guidance Mission: Show Action button without giving explicit hint tag
      actionBtn.style.display = 'inline-flex';
      const tag = document.createElement('div');
      tag.className = 'tag-item master-tag';
      tag.innerHTML = `<span>🎓</span> <span>Master Mode: Read the text!</span>`;
      breakdownEl.appendChild(tag);

    } else {
      actionBtn.style.display = 'none';

      if (gameState.level >= 3) {
        // Level 3+: Master Reading Mode
        const tag = document.createElement('div');
        tag.className = 'tag-item master-tag';
        tag.innerHTML = `<span>🎓</span> <span>Master Mode: Read the text!</span>`;
        breakdownEl.appendChild(tag);
      } else {
        order.itemsNeeded.forEach(itemInfo => {
          const item = ALL_ITEMS.find(f => f.id === itemInfo.id);
          if (item) {
            const tag = document.createElement('div');
            tag.className = 'tag-item';
            tag.innerHTML = `<span>${getFoodIconHtml(item.id, 'size-sm')}</span> <span>${itemInfo.count} ${itemInfo.count > 1 ? item.pluralName : item.name}</span>`;
            breakdownEl.appendChild(tag);
          }
        });
      }
    }

    speakOrderText(order.text, monster);
    startPatienceTimer();
  }

  function applyEquippedDecor() {
    const bg = document.getElementById('cafeBackground');
    const wallItem = SHOP_CATALOG.wallpapers.find(w => w.id === gameState.equipped.wallpaper);
    if (wallItem) bg.style.backgroundColor = wallItem.color;

    const clothLayer = document.getElementById('tableclothLayer');
    const clothItem = SHOP_CATALOG.tablecloths.find(c => c.id === gameState.equipped.tablecloth);
    if (clothItem) clothLayer.style.background = clothItem.style;

    const decorSlot = document.getElementById('tableDecorSlot');
    const decorItem = SHOP_CATALOG.decor.find(d => d.id === gameState.equipped.decor);
    if (decorItem) decorSlot.textContent = decorItem.icon || '';
  }

  // -------------------------------------------------------------------------
  // 7. GAMEPLAY TRAY & SERVING ENGINE
  // -------------------------------------------------------------------------

  function addItemToTray(foodId) {
    if (gameState.trayItems.length >= 6) {
      showToast("Tray is full! Serve or clear first.");
      return;
    }
    gameState.trayItems.push(foodId);
    playSound('add');
    renderTray();
  }

  function removeItemFromTray(foodId) {
    const idx = gameState.trayItems.indexOf(foodId);
    if (idx > -1) {
      gameState.trayItems.splice(idx, 1);
      playSound('clear');
      renderTray();
    }
  }

  function clearTray() {
    if (gameState.trayItems.length > 0) {
      gameState.trayItems = [];
      playSound('clear');
      renderTray();
    }
  }

  function autoScrollToMonster() {
    const target = document.getElementById('speechWrapper') || document.getElementById('monsterContainer');
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function verifyOrder() {
    if (!gameState.currentOrder || gameState.currentOrder.isActionMission) return;

    // Auto-scroll back up smoothly to show monster's face & animated reaction
    autoScrollToMonster();

    const trayCounts = {};
    gameState.trayItems.forEach(id => trayCounts[id] = (trayCounts[id] || 0) + 1);

    let isCorrect = true;
    const itemsNeeded = gameState.currentOrder.itemsNeeded;
    itemsNeeded.forEach(req => {
      if ((trayCounts[req.id] || 0) !== req.count) isCorrect = false;
    });
    if (Object.keys(trayCounts).length !== itemsNeeded.length) isCorrect = false;

    if (isCorrect) {
      stopPatienceTimer();

      updateMonsterMoodVisuals('happy');
      const sprite = document.getElementById('monsterSprite');
      sprite.classList.add('monster-happy');

      // Check Level 8+ Cashier Numpad Step (For Food Orders; Cutlery Orders in L9 bypass cashier)
      if (gameState.level >= 8 && !gameState.currentOrder.isCutlery) {
        openCashierModal();
      } else {
        completeSuccessfulOrder();
      }

    } else {
      // Varied Wrong Item Speech Phrases
      const wrongSpeech = WRONG_ITEM_PHRASES[Math.floor(Math.random() * WRONG_ITEM_PHRASES.length)];
      showToast(wrongSpeech);
      speakOrderText(wrongSpeech, gameState.currentMonster);
    }
  }

  function completeSuccessfulOrder() {
    let phrasePool = FOOD_THANK_YOU_PHRASES;
    if (gameState.currentOrder && gameState.currentOrder.isActionMission) {
      phrasePool = ACTION_THANK_YOU_PHRASES;
    } else if (gameState.currentOrder && gameState.currentOrder.isCutlery) {
      phrasePool = CUTLERY_THANK_YOU_PHRASES;
    }

    const praisePhrase = phrasePool[Math.floor(Math.random() * phrasePool.length)];
    document.getElementById('orderText').textContent = `"${praisePhrase}"`;
    document.getElementById('orderBreakdown').innerHTML = `<div class="tag-item"><span>🪙</span> <span>+${15 + gameState.level * 5} Coins Tip</span></div>`;

    playSound('cheer');
    playSound('coin');

    let speedBonus = patienceSeconds < 30 ? 10 : 0;
    const coinsEarned = 15 + (gameState.level * 5) + speedBonus;
    gameState.coins += coinsEarned;
    gameState.servedMonsters += 1;

    // Rule: Serve 8 customers to level up!
    let leveledUp = false;
    if (gameState.servedMonsters % 8 === 0) {
      gameState.level += 1;
      leveledUp = true;
    }

    saveState();
    updateHeaderStats();

    speakOrderText(praisePhrase, gameState.currentMonster, () => {
      setTimeout(() => {
        gameState.trayItems = [];
        renderTray();

        if (leveledUp) {
          openCelebrationModal(coinsEarned);
        } else {
          renderMonsterCustomer();
        }
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 8. CASHIER REGISTER MODAL (LEVEL 8+)
  // -------------------------------------------------------------------------

  function openCashierModal() {
    const modal = document.getElementById('cashierModal');
    const price = gameState.currentOrder.price || 35;
    gameState.typedCashierVal = '';

    document.getElementById('cashierTypedValue').textContent = '0';
    const promptEl = document.getElementById('cashierPromptText');
    promptEl.textContent = `Customer asks: "How much is it?" 🔊`;

    // Speak price amount at normal 1.0x speed so numbers are perfectly clear
    const cashierVoice = gameState.currentMonster 
      ? { ...gameState.currentMonster, speed: 1.0 } 
      : { speed: 1.0, pitch: 1.0 };

    speakOrderText(`That will be ${price} coins, please!`, cashierVoice);

    modal.classList.add('active');
  }

  function handleNumpadInput(val) {
    if (gameState.typedCashierVal.length < 3) {
      gameState.typedCashierVal += val;
      playSound('add');
      document.getElementById('cashierTypedValue').textContent = gameState.typedCashierVal;
    }
  }

  function handleNumpadBackspace() {
    if (gameState.typedCashierVal.length > 0) {
      gameState.typedCashierVal = gameState.typedCashierVal.slice(0, -1);
      playSound('clear');
      document.getElementById('cashierTypedValue').textContent = gameState.typedCashierVal || '0';
    }
  }

  function handleNumpadEnter() {
    const expected = (gameState.currentOrder.price || 35).toString();
    const modal = document.getElementById('cashierModal');

    if (gameState.typedCashierVal === expected) {
      playSound('coin');
      modal.classList.remove('active');
      completeSuccessfulOrder();
    } else {
      playSound('angry');
      showToast(`Incorrect total! Customer said ${expected} coins. 🧮`);

      const cashierVoice = gameState.currentMonster 
        ? { ...gameState.currentMonster, speed: 1.0 } 
        : { speed: 1.0, pitch: 1.0 };

      speakOrderText(`No, I heard ${expected} coins!`, cashierVoice);
      gameState.typedCashierVal = '';
      document.getElementById('cashierTypedValue').textContent = '0';
    }
  }

  // -------------------------------------------------------------------------
  // 9. TASK & ACTION GUIDANCE MISSION MODAL (LEVEL 10)
  // -------------------------------------------------------------------------

  let selectedActionOption = null;

  function openActionMissionModal() {
    if (!gameState.currentOrder || !gameState.currentOrder.isActionMission) return;
    const modal = document.getElementById('actionModal');
    const mission = gameState.currentOrder.actionMission;
    selectedActionOption = null;

    const confirmBtn = document.getElementById('confirmActionBtn');
    confirmBtn.disabled = true;

    document.getElementById('actionQuestionText').textContent = `"${mission.question}"`;
    speakOrderText(mission.question, gameState.currentMonster);

    const list = document.getElementById('actionOptionsList');
    list.innerHTML = '';

    mission.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'action-opt-btn';
      btn.textContent = opt.text;

      btn.addEventListener('click', () => {
        // 1. Option selection speaks the text in English voice
        speakOrderText(opt.text, { pitch: 1.0, speed: 1.0 });
        playSound('add');

        // Highlight selected card
        list.querySelectorAll('.action-opt-btn').forEach(b => b.classList.remove('selected-opt'));
        btn.classList.add('selected-opt');

        selectedActionOption = opt;
        confirmBtn.disabled = false;
      });

      list.appendChild(btn);
    });

    modal.classList.add('active');
  }

  function handleConfirmAction() {
    if (!selectedActionOption) return;
    const modal = document.getElementById('actionModal');
    modal.classList.remove('active');
    stopPatienceTimer();
    autoScrollToMonster();

    if (selectedActionOption.isCorrect) {
      // 2. Correct Option: Award coins & complete mission
      completeSuccessfulOrder();
    } else {
      // 3. Wrong Option: Do-able, but 0 Coins/Score, and customer complains
      const complainSpeech = "Oh, maybe I should ask others!";
      document.getElementById('orderText').textContent = `"${complainSpeech}"`;
      document.getElementById('orderBreakdown').innerHTML = `<div class="tag-item master-tag"><span>🤔</span> <span>0 Coins (Wrong Option)</span></div>`;

      playSound('clear');
      speakOrderText(complainSpeech, gameState.currentMonster, () => {
        setTimeout(() => {
          gameState.trayItems = [];
          renderTray();
          renderMonsterCustomer();
        }, 1000);
      });
    }
  }

  // -------------------------------------------------------------------------
  // 10. SELF-LEARNING EXPLORER MODE
  // -------------------------------------------------------------------------

  function openSelfLearnModal(isLevelUpTrigger = false) {
    gameState.isSelfLearning = true;
    gameState.isLevelUpSelfLearn = isLevelUpTrigger;
    const modal = document.getElementById('selfLearnModal');
    const banner = document.getElementById('learnLevelUpBanner');
    const bannerText = document.getElementById('learnBannerText');
    const startBtn = document.getElementById('startNextLevelBtn');

    if (isLevelUpTrigger) {
      banner.style.display = 'flex';
      startBtn.style.display = 'block';
      bannerText.textContent = `Welcome to Level ${gameState.level}! Practice your NEW! ✨ items below before serving customer orders!`;
      startBtn.textContent = `Start Level ${gameState.level}! 🚀`;
    } else {
      banner.style.display = 'none';
      startBtn.style.display = 'none';
    }

    renderSelfLearnGrid('all');
    modal.classList.add('active');
  }

  function renderSelfLearnGrid(category) {
    const grid = document.getElementById('learnItemsGrid');
    grid.innerHTML = '';

    const unlocked = ALL_ITEMS.filter(i => i.unlockLevel <= gameState.level);
    const items = category === 'all' ? unlocked : unlocked.filter(i => i.category === category);

    items.forEach(item => {
      const isNew = item.unlockLevel === gameState.level;
      const card = document.createElement('div');
      card.className = `learn-card ${isNew ? 'newly-unlocked-card' : ''}`;
      card.innerHTML = `
        ${isNew ? '<span class="new-item-badge">NEW! ✨</span>' : ''}
        <div class="food-emoji">${getFoodIconHtml(item.id, 'size-lg')}</div>
        <div class="food-title">${item.name}</div>
        <div class="food-badge">${item.adjective}</div>
        <span class="learn-audio-hint">Listen 🔊</span>
      `;

      card.addEventListener('click', () => {
        speakOrderText(item.name, { pitch: 1.0, speed: 1.0 });
        playSound('add');
      });

      grid.appendChild(card);
    });
  }

  function closeSelfLearnModal() {
    const wasLevelUp = gameState.isLevelUpSelfLearn;
    gameState.isSelfLearning = false;
    gameState.isLevelUpSelfLearn = false;
    document.getElementById('selfLearnModal').classList.remove('active');

    if (wasLevelUp) {
      renderMonsterCustomer();
    }
  }

  // -------------------------------------------------------------------------
  // 11. LEVEL SELECTOR MODAL
  // -------------------------------------------------------------------------

  function openLevelSelectModal() {
    const modal = document.getElementById('levelSelectModal');
    const grid = document.getElementById('levelsGrid');
    grid.innerHTML = '';

    for (let lvl = 1; lvl <= 10; lvl++) {
      const btn = document.createElement('div');
      btn.className = `level-card-btn ${lvl === gameState.level ? 'active-level' : ''}`;
      btn.innerHTML = `
        <div class="level-num">⭐ Level ${lvl}</div>
        <div class="level-desc">${LEVEL_DESCRIPTIONS[lvl]}</div>
      `;

      btn.addEventListener('click', () => {
        gameState.level = lvl;
        saveState();
        updateHeaderStats();
        renderPantryShelves();
        renderMonsterCustomer();
        modal.classList.remove('active');
        showToast(`Jumped to Level ${lvl}! 🚀`);
      });

      grid.appendChild(btn);
    }

    modal.classList.add('active');
  }

  function openCelebrationModal(earnedCoins) {
    const modal = document.getElementById('celebrationModal');
    document.getElementById('earnedCoinsText').textContent = `+${earnedCoins} Coins 🪙`;
    document.getElementById('nextLevelText').textContent = `Level ${gameState.level} Unlocked! ⭐`;
    document.getElementById('celebrationTitle').textContent = `Unlocked Level ${gameState.level}!`;
    document.getElementById('levelFeatureBox').textContent = LEVEL_DESCRIPTIONS[gameState.level] || `Level ${gameState.level} Unlocked!`;
    modal.classList.add('active');
  }

  // -------------------------------------------------------------------------
  // 12. SHOP SYSTEM
  // -------------------------------------------------------------------------

  let activeShopTab = 'wallpapers';

  function renderShopGrid() {
    const grid = document.getElementById('shopItemsGrid');
    grid.innerHTML = '';
    const items = SHOP_CATALOG[activeShopTab] || [];

    items.forEach(item => {
      const isOwned = gameState.inventory.includes(item.id);
      const isEquipped = gameState.equipped[activeShopTab.slice(0, -1)] === item.id || 
                         (activeShopTab === 'wallpapers' && gameState.equipped.wallpaper === item.id) ||
                         (activeShopTab === 'tablecloths' && gameState.equipped.tablecloth === item.id) ||
                         (activeShopTab === 'decor' && gameState.equipped.decor === item.id);

      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.innerHTML = `
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-price">${item.price === 0 ? 'Free' : `🪙 ${item.price}`}</div>
        <button class="btn buy-btn ${isEquipped ? 'btn-secondary' : 'btn-primary'}" ${isEquipped ? 'disabled' : ''}>
          ${isEquipped ? 'Equipped ✅' : isOwned ? 'Equip 🧵' : 'Buy 🪙'}
        </button>
      `;

      card.querySelector('.buy-btn').addEventListener('click', () => {
        if (isOwned) {
          if (activeShopTab === 'wallpapers') gameState.equipped.wallpaper = item.id;
          if (activeShopTab === 'tablecloths') gameState.equipped.tablecloth = item.id;
          if (activeShopTab === 'decor') gameState.equipped.decor = item.id;
          saveState(); applyEquippedDecor(); renderShopGrid();
          showToast(`Equipped ${item.name}! ✨`);
        } else {
          if (gameState.coins >= item.price) {
            gameState.coins -= item.price;
            gameState.inventory.push(item.id);
            if (activeShopTab === 'wallpapers') gameState.equipped.wallpaper = item.id;
            if (activeShopTab === 'tablecloths') gameState.equipped.tablecloth = item.id;
            if (activeShopTab === 'decor') gameState.equipped.decor = item.id;
            playSound('coin'); saveState(); updateHeaderStats(); applyEquippedDecor(); renderShopGrid();
            showToast(`Bought ${item.name}! 🎉`);
          } else {
            showToast("Not enough coins! Keep serving monsters! 🪙");
          }
        }
      });
      grid.appendChild(card);
    });
  }

  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // -------------------------------------------------------------------------
  // 13. INITIALIZATION & EVENT LISTENERS
  // -------------------------------------------------------------------------

  function init() {
    updateHeaderStats();
    renderPantryShelves();
    renderTray();
    applyEquippedDecor();

    // Spawn first monster customer
    renderMonsterCustomer();

    // Event Listeners
    document.getElementById('replaySpeechBtn').addEventListener('click', () => {
      if (gameState.currentOrder && gameState.currentMonster) {
        speakOrderText(gameState.currentOrder.text, gameState.currentMonster);
      }
    });

    document.getElementById('clearTrayBtn').addEventListener('click', clearTray);
    document.getElementById('serveBtn').addEventListener('click', verifyOrder);
    document.getElementById('actionMissionBtn').addEventListener('click', openActionMissionModal);

    document.getElementById('voiceToggleBtn').addEventListener('click', () => {
      gameState.voiceEnabled = !gameState.voiceEnabled;
      document.getElementById('voiceIcon').textContent = gameState.voiceEnabled ? '🔊' : '🔇';
      showToast(gameState.voiceEnabled ? 'Monster Voice Enabled 🔊' : 'Monster Voice Muted 🔇');
    });

    // Self-Learn Explorer Triggers
    document.getElementById('selfLearnBtn').addEventListener('click', openSelfLearnModal);
    document.getElementById('closeLearnBtn').addEventListener('click', closeSelfLearnModal);
    document.querySelectorAll('#learnTabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#learnTabs .tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderSelfLearnGrid(e.target.getAttribute('data-category'));
      });
    });

    // Action Mission Triggers
    document.getElementById('confirmActionBtn').addEventListener('click', handleConfirmAction);
    document.getElementById('closeActionBtn').addEventListener('click', () => {
      document.getElementById('actionModal').classList.remove('active');
    });

    // Level Selector Triggers
    document.getElementById('levelSelectBtn').addEventListener('click', openLevelSelectModal);
    document.getElementById('closeLevelSelectBtn').addEventListener('click', () => {
      document.getElementById('levelSelectModal').classList.remove('active');
    });

    // Cashier Numpad Triggers
    document.querySelectorAll('.numpad-btn[data-val]').forEach(btn => {
      btn.addEventListener('click', () => handleNumpadInput(btn.getAttribute('data-val')));
    });
    document.getElementById('cashierBackBtn').addEventListener('click', handleNumpadBackspace);
    document.getElementById('cashierEnterBtn').addEventListener('click', handleNumpadEnter);
    document.getElementById('cashierReplayBtn').addEventListener('click', () => {
      const price = gameState.currentOrder ? gameState.currentOrder.price || 35 : 35;
      const cashierVoice = gameState.currentMonster 
        ? { ...gameState.currentMonster, speed: 1.0 } 
        : { speed: 1.0, pitch: 1.0 };
      speakOrderText(`That will be ${price} coins, please!`, cashierVoice);
    });

    // Pantry Tabs
    document.querySelectorAll('#pantryTabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget || e.target;
        document.querySelectorAll('#pantryTabs .tab-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        gameState.activeCategory = target.getAttribute('data-category');
        renderPantryShelves();
        if (target.scrollIntoView) {
          target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    // Shop Triggers
    const shopModal = document.getElementById('shopModal');
    document.getElementById('openShopBtn').addEventListener('click', () => {
      renderShopGrid(); shopModal.classList.add('active');
    });
    document.getElementById('closeShopBtn').addEventListener('click', () => {
      shopModal.classList.remove('active');
    });
    document.querySelectorAll('.shop-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        activeShopTab = e.target.getAttribute('data-tab');
        renderShopGrid();
      });
    });

    // Level Celebration Continue Button -> Opens Self-Learning Mode first to highlight new items!
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
      document.getElementById('celebrationModal').classList.remove('active');
      openSelfLearnModal(true);
    });
    document.getElementById('startNextLevelBtn').addEventListener('click', closeSelfLearnModal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
