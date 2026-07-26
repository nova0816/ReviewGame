/* ==========================================================================
   Monster Snack Shop - Core Engine & Logic (Level 1-10 Expansion)
   ========================================================================== */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. DATABASE & CONFIGURATIONS
  // -------------------------------------------------------------------------

  // All 36 Food & Cutlery Items Database
  const ALL_ITEMS = [
    // Level 1-6 Base Foods (12 Items)
    { id: 'red_apple', name: 'Red Apple', pluralName: 'Red Apples', category: 'fruits', adjective: 'red', unlockLevel: 1 },
    { id: 'green_apple', name: 'Green Apple', pluralName: 'Green Apples', category: 'fruits', adjective: 'green', unlockLevel: 1 },
    { id: 'banana', name: 'Yellow Banana', pluralName: 'Yellow Bananas', category: 'fruits', adjective: 'yellow', unlockLevel: 1 },
    { id: 'berries', name: 'Blue Berries', pluralName: 'Blue Berries', category: 'fruits', adjective: 'blue', unlockLevel: 1 },
    { id: 'donut', name: 'Big Donut', pluralName: 'Big Donuts', category: 'bakery', adjective: 'big', unlockLevel: 1 },
    { id: 'cookie', name: 'Small Cookie', pluralName: 'Small Cookies', category: 'bakery', adjective: 'small', unlockLevel: 1 },
    { id: 'croissant', name: 'Warm Croissant', pluralName: 'Warm Croissants', category: 'bakery', adjective: 'warm', unlockLevel: 1 },
    { id: 'cake', name: 'Sweet Cake', pluralName: 'Sweet Cakes', category: 'bakery', adjective: 'sweet', unlockLevel: 1 },
    { id: 'cocoa', name: 'Warm Cocoa', pluralName: 'Warm Cocoas', category: 'drinks', adjective: 'warm', unlockLevel: 1 },
    { id: 'milk', name: 'Cold Milk', pluralName: 'Cold Milk', category: 'drinks', adjective: 'cold', unlockLevel: 1 },
    { id: 'juice', name: 'Red Juice', pluralName: 'Red Juices', category: 'drinks', adjective: 'red', unlockLevel: 1 },
    { id: 'iced_tea', name: 'Iced Tea', pluralName: 'Iced Teas', category: 'drinks', adjective: 'iced', unlockLevel: 1 },

    // Level 7 New Foods (12 Items)
    { id: 'orange', name: 'Fresh Orange', pluralName: 'Fresh Oranges', category: 'fruits', adjective: 'fresh', unlockLevel: 7 },
    { id: 'strawberry', name: 'Sweet Strawberry', pluralName: 'Sweet Strawberries', category: 'fruits', adjective: 'sweet', unlockLevel: 7 },
    { id: 'watermelon', name: 'Juicy Watermelon', pluralName: 'Juicy Watermelons', category: 'fruits', adjective: 'juicy', unlockLevel: 7 },
    { id: 'pizza', name: 'Hot Pizza', pluralName: 'Hot Pizzas', category: 'fastfood', adjective: 'hot', unlockLevel: 7 },
    { id: 'burger', name: 'Big Burger', pluralName: 'Big Burgers', category: 'fastfood', adjective: 'big', unlockLevel: 7 },
    { id: 'fries', name: 'Crunchy Fries', pluralName: 'Crunchy Fries', category: 'fastfood', adjective: 'crunchy', unlockLevel: 7 },
    { id: 'icecream', name: 'Cold Ice Cream', pluralName: 'Cold Ice Creams', category: 'bakery', adjective: 'cold', unlockLevel: 7 },
    { id: 'cupcake', name: 'Sweet Cupcake', pluralName: 'Sweet Cupcakes', category: 'bakery', adjective: 'sweet', unlockLevel: 7 },
    { id: 'pancake', name: 'Warm Pancake', pluralName: 'Warm Pancakes', category: 'bakery', adjective: 'warm', unlockLevel: 7 },
    { id: 'hot_tea', name: 'Hot Tea', pluralName: 'Hot Teas', category: 'drinks', adjective: 'hot', unlockLevel: 7 },
    { id: 'soda', name: 'Fizzy Soda', pluralName: 'Fizzy Sodas', category: 'drinks', adjective: 'fizzy', unlockLevel: 7 },
    { id: 'water', name: 'Cold Water', pluralName: 'Cold Water', category: 'drinks', adjective: 'cold', unlockLevel: 7 },

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
    { id: 'wet_wipe', name: 'Wet Wipe', pluralName: 'Wet Wipes', category: 'cutlery', adjective: 'wet', unlockLevel: 9 }
  ];

  // Level Descriptions & Features (Levels 1 to 10)
  const LEVEL_DESCRIPTIONS = {
    1: "Level 1: Basic foods & single item requests.",
    2: "Level 2: Plural nouns & size adjectives.",
    3: "Level 3: 2 combined food items in single order.",
    4: "Level 4: Varied functional request dialogue patterns.",
    5: "Level 5: 3 combined food items with adjectives.",
    6: "Level 6 (Master Mode): Picture icon clues removed! Read & listen directly.",
    7: "Level 7: Unlocked 12 New Foods (Orange, Pizza, Burger, Ice Cream...)!",
    8: "Level 8: Cashier Register Payment step added for food orders!",
    9: "Level 9: Unlocked 12 Cutlery & Supplies items (Tissue, Fork, Plate...)!",
    10: "Level 10: Task & Social Guidance Missions unlocked! Use '🙋 Action' button."
  };

  // SVG Renderer Engine for All 10 Silly Monster Characters (Happy, Impatient, Angry)
  function getMonsterSvg(id, mood) {
    const isImpatient = mood === 'impatient';
    const isAngry = mood === 'angry';

    // Facial Feature Paths based on Mood
    let mouthPath = isAngry 
      ? '<path d="M 50 115 Q 70 95 90 115" stroke="#222" stroke-width="4" fill="none"/>' // Angry frown
      : isImpatient 
      ? '<line x1="50" y1="110" x2="90" y2="110" stroke="#222" stroke-width="4" stroke-linecap="round"/>' // Flat line
      : '<path d="M 50 100 Q 70 125 90 100 Z" fill="#222"/>'; // Big happy smile

    let eyeStyle = isAngry 
      ? '<path d="M 45 75 L 60 82 M 95 82 L 110 75" stroke="#222" stroke-width="4"/><circle cx="55" cy="85" r="6" fill="#222"/><circle cx="95" cy="85" r="6" fill="#222"/>'
      : isImpatient
      ? '<line x1="45" y1="80" x2="65" y2="80" stroke="#222" stroke-width="4"/><line x1="85" y1="80" x2="105" y2="80" stroke="#222" stroke-width="4"/>'
      : '<circle cx="55" cy="80" r="10" fill="#222"/><circle cx="95" cy="80" r="10" fill="#222"/><circle cx="58" cy="77" r="3" fill="#fff"/><circle cx="98" cy="77" r="3" fill="#fff"/>';

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
      default:
        return `<svg viewBox="0 0 140 140">
          <polygon points="70,15 88,52 128,56 98,84 106,124 70,103 34,124 42,84 12,56 52,52" fill="#ffdd59" stroke="#ffa801" stroke-width="4"/>
          ${eyeStyle} ${mouthPath}
        </svg>`;
    }
  }

  // Silly Monster Profiles
  const MONSTER_PROFILES = [
    { id: 'baby_blobby', name: 'Baby Blobby 🍼', pitch: 1.85, speed: 1.15, voiceType: 'child', getSvg: (m) => getMonsterSvg('baby_blobby', m) },
    { id: 'gobby', name: 'Gobby 👺', pitch: 1.6, speed: 1.1, voiceType: 'squeaky', getSvg: (m) => getMonsterSvg('gobby', m) },
    { id: 'fluffy', name: 'Fluffy 🐻', pitch: 0.55, speed: 0.75, voiceType: 'deep', getSvg: (m) => getMonsterSvg('fluffy', m) },
    { id: 'sparky', name: 'Sparky 🐲', pitch: 1.45, speed: 1.25, voiceType: 'energetic', getSvg: (m) => getMonsterSvg('sparky', m) },
    { id: 'mimi', name: 'Mimi 🐰', pitch: 1.55, speed: 1.05, voiceType: 'cute', getSvg: (m) => getMonsterSvg('mimi', m) },
    { id: 'kiki', name: 'Kiki 👾', pitch: 1.75, speed: 1.3, voiceType: 'alien', getSvg: (m) => getMonsterSvg('kiki', m) },
    { id: 'chomper', name: 'Chomper 👁️', pitch: 1.35, speed: 0.95, voiceType: 'bouncy', getSvg: (m) => getMonsterSvg('chomper', m) },
    { id: 'shadow', name: 'Shadow 👻', pitch: 0.8, speed: 0.7, voiceType: 'whisper', getSvg: (m) => getMonsterSvg('shadow', m) },
    { id: 'coco', name: 'Coco 🥥', pitch: 0.7, speed: 1.1, voiceType: 'raspy', getSvg: (m) => getMonsterSvg('coco', m) },
    { id: 'pip', name: 'Pip 🌟', pitch: 1.95, speed: 1.35, voiceType: 'tiny', getSvg: (m) => getMonsterSvg('pip', m) }
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
        { text: "You go straight and turn right! 🚻", isCorrect: true },
        { text: "I don't know! 🤷", isCorrect: false },
        { text: "It is on the moon! 🌙", isCorrect: false }
      ]
    },
    {
      question: "Hello! What time does the cafe close?",
      correct: "We close at 8 o'clock!",
      options: [
        { text: "We close at 8 o'clock! 🕗", isCorrect: true },
        { text: "I don't know! 🤷", isCorrect: false },
        { text: "We never sleep! 👁️", isCorrect: false }
      ]
    },
    {
      question: "Hi! How do I get to the sunny park?",
      correct: "Turn left and walk two blocks!",
      options: [
        { text: "Turn left and walk two blocks! 🌳", isCorrect: true },
        { text: "I don't know! 🤷", isCorrect: false },
        { text: "Fly into the clouds! ☁️", isCorrect: false }
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
    
    const utterance = new SpeechSynthesisUtterance(text);
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

        let angrySpeech = "Where is my food, please? I am hungry!";
        if (gameState.currentOrder && gameState.currentOrder.isActionMission) {
          angrySpeech = "Excuse me! Can someone help answer my question, please?";
        } else if (gameState.currentOrder && gameState.currentOrder.isCutlery) {
          angrySpeech = "Excuse me! Where are my cutlery supplies, please?";
        }

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
    const monster = MONSTER_PROFILES[Math.floor(Math.random() * MONSTER_PROFILES.length)];
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

      if (gameState.level >= 6) {
        // Level 6+: Master Reading Mode
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

  function verifyOrder() {
    if (!gameState.currentOrder || gameState.currentOrder.isActionMission) return;

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

    // Speak price amount
    speakOrderText(`That will be ${price} coins, please!`, gameState.currentMonster);

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
      speakOrderText(`No, I heard ${expected} coins!`, gameState.currentMonster);
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

  function openSelfLearnModal() {
    gameState.isSelfLearning = true;
    const modal = document.getElementById('selfLearnModal');
    renderSelfLearnGrid('all');
    modal.classList.add('active');
  }

  function renderSelfLearnGrid(category) {
    const grid = document.getElementById('learnItemsGrid');
    grid.innerHTML = '';

    const unlocked = ALL_ITEMS.filter(i => i.unlockLevel <= gameState.level);
    const items = category === 'all' ? unlocked : unlocked.filter(i => i.category === category);

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'learn-card';
      card.innerHTML = `
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
    gameState.isSelfLearning = false;
    document.getElementById('selfLearnModal').classList.remove('active');
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
      speakOrderText(`That will be ${price} coins, please!`, gameState.currentMonster);
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

    // Level Celebration Continue Button
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
      document.getElementById('celebrationModal').classList.remove('active');
      renderMonsterCustomer();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
