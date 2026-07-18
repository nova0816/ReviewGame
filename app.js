// Vocabulary Explorer Game Logic - Autumn Wind (15 Levels)

const levels = [
  {
    targetWord: "Autumn",
    statement: "It's Autumn time",
    words: ["It's", "Autumn", "time"],
    distractors: ["summer", "spring"],
    sentenceWithBlank: "It's _______ time.",
    image: "assets/autumn.png",
    emoji: "🍂"
  },
  {
    targetWord: "windy",
    statement: "It is quite windy",
    words: ["It", "is", "quite", "windy"],
    distractors: ["sunny", "calm"],
    sentenceWithBlank: "It is quite _______.",
    image: "assets/windy.png",
    emoji: "🌬️"
  },
  {
    targetWord: "freezing",
    statement: "It's freezing cold",
    words: ["It's", "freezing", "cold"],
    distractors: ["warm", "boiling"],
    sentenceWithBlank: "It's _______ cold!",
    image: "assets/freezing.png",
    emoji: "🥶"
  },
  {
    targetWord: "heating",
    statement: "Turn the heating on",
    words: ["Turn", "the", "heating", "on"],
    distractors: ["cooling", "lights"],
    sentenceWithBlank: "Turn the _______ on.",
    image: "assets/heating.png",
    emoji: "🔥"
  },
  {
    targetWord: "scarf",
    statement: "Wear your warm scarf",
    words: ["Wear", "your", "warm", "scarf"],
    distractors: ["shoes", "t-shirt"],
    sentenceWithBlank: "Wear your warm _______.",
    image: "assets/scarf.png",
    emoji: "🧣"
  },
  {
    targetWord: "pond",
    statement: "The ball is in the pond",
    words: ["The", "ball", "is", "in", "the", "pond"],
    distractors: ["sky", "tree"],
    sentenceWithBlank: "The ball is in the _______.",
    image: "assets/pond.png",
    emoji: "🦆"
  },
  {
    targetWord: "muddy",
    statement: "Jumping in muddy puddles",
    words: ["Jumping", "in", "muddy", "puddles"],
    distractors: ["dry", "clean"],
    sentenceWithBlank: "Jumping in _______ puddles.",
    image: "assets/muddy.png",
    emoji: "🐷"
  },
  {
    targetWord: "Shake",
    statement: "Shake the thin tree",
    words: ["Shake", "the", "thin", "tree"],
    distractors: ["Climb", "Cut"],
    sentenceWithBlank: "_______ the thin tree.",
    image: "assets/shake.png",
    emoji: "🌳"
  },
  {
    targetWord: "Lean",
    statement: "Lean into the wind",
    words: ["Lean", "into", "the", "wind"],
    distractors: ["Jump", "Run"],
    sentenceWithBlank: "_______ into the wind.",
    image: "assets/lean.png",
    emoji: "💨"
  },
  {
    targetWord: "suppose",
    statement: "I suppose it is funny",
    words: ["I", "suppose", "it", "is", "funny"],
    distractors: ["forget", "know"],
    sentenceWithBlank: "I _______ it is funny.",
    image: "assets/suppose.png",
    emoji: "🤔"
  },
  {
    targetWord: "thin",
    statement: "The tree is too thin",
    words: ["The", "tree", "is", "too", "thin"],
    distractors: ["thick", "strong"],
    sentenceWithBlank: "The tree is too _______.",
    image: "assets/thin.png",
    emoji: "🌿"
  },
  {
    targetWord: "heavy",
    statement: "I am too heavy",
    words: ["I", "am", "too", "heavy"],
    distractors: ["light", "small"],
    sentenceWithBlank: "I am too _______.",
    image: "assets/heavy.png",
    emoji: "🐘"
  },
  {
    targetWord: "weight",
    statement: "It cannot take your weight",
    words: ["It", "cannot", "take", "your", "weight"],
    distractors: ["height", "speed"],
    sentenceWithBlank: "It cannot take your _______.",
    image: "assets/weight.png",
    emoji: "⚖️"
  },
  {
    targetWord: "favorite",
    statement: "What's your favorite game",
    words: ["What's", "your", "favorite", "game"],
    distractors: ["boring", "hardest"],
    sentenceWithBlank: "What's your _______ game?",
    image: "assets/favorite.png",
    emoji: "💖"
  },
  {
    targetWord: "stroke",
    statement: "What a stroke of luck",
    words: ["What", "a", "stroke", "of", "luck"],
    distractors: ["problem", "accident"],
    sentenceWithBlank: "What a _______ of luck!",
    image: "assets/luck.png",
    emoji: "🍀"
  }
];

// Game State
let currentLevelIndex = 0;
let score = 0;
let selectedWords = []; // Array of strings currently placed in slots
let soundMuted = false;
let isCurrentLevelSolved = false;
let currentDifficulty = 'easy';
let listenChoicesMemo = [];
let levelChoicesMemo = [];

// Audio Context for sound synthesis
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Play synthesized sound effects
function playSound(type) {
  if (soundMuted) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    switch (type) {
      case 'click': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'correct': {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, now + index * 0.08);
          gain.gain.linearRampToValueAtTime(0.1, now + index * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.08);
          osc.stop(now + index * 0.08 + 0.3);
        });
        break;
      }
      case 'incorrect': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(130, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
      case 'victory': {
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, now + index * 0.06);
          gain.gain.linearRampToValueAtTime(0.15, now + index * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.06);
          osc.stop(now + index * 0.06 + 0.4);
        });
        break;
      }
    }
  } catch (e) {
    console.error("Audio Synthesis error: ", e);
  }
}

// Text-to-Speech synthesis
function speak(text, slow = false) {
  if (soundMuted) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.65 : 0.8;
    utterance.pitch = 1.1; // Friendly higher pitch for kids
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                         voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) ||
                         voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    window.speechSynthesis.speak(utterance);
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// Confetti Particle System
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confettiActive = false;
let confettiParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height - 20;
    this.size = Math.random() * 12 + 10;
    // Autumn themed confetti colors: reds, oranges, yellows, greens
    const colors = [
      `hsl(${Math.random() * 20 + 10}, 95%, 55%)`,  // Orange-Red
      `hsl(${Math.random() * 15 + 40}, 95%, 50%)`,  // Gold/Yellow
      `hsl(${Math.random() * 10 + 0}, 90%, 50%)`,   // Maple Red
      `hsl(${Math.random() * 25 + 90}, 80%, 45%)`   // Pine Green
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 6 - 3;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 5 + 4;
    this.shape = Math.random() > 0.4 ? 'rect' : 'circle';
  }

  update() {
    this.x += this.x > canvas.width || this.x < 0 ? -this.speedX : this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    
    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function startConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 120; i++) {
    confettiParticles.push(new ConfettiParticle());
  }
  confettiActive = true;
  animateConfetti();
  setTimeout(() => {
    confettiActive = false;
  }, 1600);
}

function animateConfetti() {
  if (!confettiActive && confettiParticles.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confettiParticles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.y > canvas.height) {
      if (confettiActive) {
        confettiParticles[index] = new ConfettiParticle();
      } else {
        confettiParticles.splice(index, 1);
      }
    }
  });
  
  requestAnimationFrame(animateConfetti);
}

// DOM Elements
const episodeScreen = document.getElementById('episodeScreen');
const episodeCard1 = document.getElementById('episodeCard1');
const startScreen = document.getElementById('startScreen');
const backToEpisodesBtn = document.getElementById('backToEpisodesBtn');
const levelGrid = document.getElementById('levelGrid');
const gameContainer = document.getElementById('gameContainer');
const menuBtn = document.getElementById('menuBtn');
const victoryMenuBtn = document.getElementById('victoryMenuBtn');

const vocabImage = document.getElementById('vocabImage');
const speakPhraseBtn = document.getElementById('speakPhraseBtn');
const slotsTray = document.getElementById('slotsTray');
const wordDeck = document.getElementById('wordDeck');
const messageBanner = document.getElementById('messageBanner');
const messageText = document.getElementById('messageText');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const scoreValue = document.getElementById('scoreValue');
const progressFill = document.getElementById('progressFill');
const levelIndicator = document.getElementById('levelIndicator');
const soundToggle = document.getElementById('soundToggle');
const soundOnIcon = document.getElementById('soundOnIcon');
const soundOffIcon = document.getElementById('soundOffIcon');
const victoryModal = document.getElementById('victoryModal');
const playAgainBtn = document.getElementById('playAgainBtn');
const interactionTitle = document.getElementById('interactionTitle');

// Listen Mode DOM Elements
const listenMain = document.getElementById('listenMain');
const listenGrid = document.getElementById('listenGrid');
const listenReplayBtn = document.getElementById('listenReplayBtn');
const listenMessageBanner = document.getElementById('listenMessageBanner');
const listenMessageText = document.getElementById('listenMessageText');
const listenNextLevelBtn = document.getElementById('listenNextLevelBtn');

// Fisher-Yates Shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate the level selector grid dynamically
function renderLevelGrid() {
  levelGrid.innerHTML = '';
  levels.forEach((level, index) => {
    const card = document.createElement('button');
    card.className = 'level-card';
    card.setAttribute('aria-label', `Play level ${index + 1}: ${level.targetWord}`);
    
    card.innerHTML = `
      <span class="level-card-icon">${level.emoji}</span>
      <span class="level-card-title">${level.targetWord}</span>
      <span class="level-card-num">${index + 1}</span>
    `;
    
    card.addEventListener('click', () => {
      playSound('click');
      currentLevelIndex = index;
      initLevel();
      
      startScreen.classList.add('hidden');
      gameContainer.classList.remove('hidden');
    });
    
    levelGrid.appendChild(card);
  });
}

// Get unique distractors for Normal mode
function getRandomNormalDistractors(correctWord) {
  const others = [];
  levels.forEach(lvl => {
    if (lvl.targetWord !== correctWord && !others.includes(lvl.targetWord)) {
      others.push(lvl.targetWord);
    }
  });
  return shuffle(others).slice(0, 3);
}

// Get 2 unique random level indices as distractors for Listen mode
function getRandomListenDistractors(correctIndex) {
  const otherIndices = [];
  for (let i = 0; i < levels.length; i++) {
    if (i !== correctIndex) {
      otherIndices.push(i);
    }
  }
  const shuffled = shuffle(otherIndices);
  return [shuffled[0], shuffled[1]];
}

// Render Listen & Match Stage pictures
function renderListenStage() {
  const currentLevel = levels[currentLevelIndex];
  listenGrid.innerHTML = '';
  
  listenMessageBanner.classList.add('hidden');
  listenNextLevelBtn.classList.add('hidden');
  
  listenChoicesMemo.forEach(lvlIndex => {
    const optLevel = levels[lvlIndex];
    
    const card = document.createElement('button');
    card.className = 'listen-pic-card';
    card.setAttribute('aria-label', `Choose picture for: ${optLevel.targetWord}`);
    
    const img = document.createElement('img');
    img.src = optLevel.image;
    img.alt = `Illustration choice`;
    img.className = 'listen-pic-img';
    img.draggable = false;
    
    const fallback = document.createElement('div');
    fallback.className = 'listen-pic-fallback hidden';
    fallback.innerHTML = `<span class="fallback-emoji-small">${optLevel.emoji}</span>`;
    
    img.onerror = () => {
      img.classList.add('hidden');
      fallback.classList.remove('hidden');
    };
    
    card.appendChild(img);
    card.appendChild(fallback);
    
    card.addEventListener('click', () => {
      if (isCurrentLevelSolved) return;
      
      if (lvlIndex === currentLevelIndex) {
        // Correct choice!
        isCurrentLevelSolved = true;
        score += 10;
        scoreValue.textContent = score;
        card.classList.add('correct');
        playSound('correct');
        startConfetti();
        
        setTimeout(() => {
          speak(currentLevel.targetWord);
        }, 400);
        
        const congratsMessages = [
          "Excellent job! 🎉",
          "Fantastic! You got it! 🌟",
          "Super star! ⭐",
          "You are amazing! 🎈",
          "Wow! Spot on! 🌈"
        ];
        listenMessageText.textContent = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
        listenMessageBanner.classList.remove('hidden');
        listenNextLevelBtn.classList.remove('hidden');
      } else {
        // Incorrect choice!
        card.classList.add('incorrect');
        playSound('incorrect');
        
        listenMessageText.textContent = "Oops! Try again. 💡";
        listenMessageBanner.classList.remove('hidden');
        
        setTimeout(() => {
          card.classList.remove('incorrect');
        }, 800);
      }
    });
    
    listenGrid.appendChild(card);
  });
}

// Initialize Level
function initLevel() {
  const currentLevel = levels[currentLevelIndex];
  isCurrentLevelSolved = false;
  selectedWords = [];
  
  // Hide UI elements from previous solved level
  messageBanner.classList.add('hidden');
  nextLevelBtn.classList.add('hidden');
  listenMessageBanner.classList.add('hidden');
  listenNextLevelBtn.classList.add('hidden');
  slotsTray.classList.remove('correct', 'incorrect');
  
  // Update indicators
  levelIndicator.textContent = `Level ${currentLevelIndex + 1} of ${levels.length}`;
  progressFill.style.width = `${((currentLevelIndex) / levels.length) * 100}%`;
  scoreValue.textContent = score;

  if (currentDifficulty === 'listen') {
    document.getElementById('gameMain').classList.add('hidden');
    listenMain.classList.remove('hidden');
    
    const distractors = getRandomListenDistractors(currentLevelIndex);
    listenChoicesMemo = shuffle([currentLevelIndex, ...distractors]);
    
    renderListenStage();
    
    setTimeout(() => {
      speak(currentLevel.targetWord);
    }, 500);
  } else {
    document.getElementById('gameMain').classList.remove('hidden');
    listenMain.classList.add('hidden');
    
    // Reset fallback image state
    vocabImage.classList.remove('hidden');
    document.getElementById('imageFallback').classList.add('hidden');
    
    vocabImage.src = currentLevel.image;
    vocabImage.alt = `Illustration for: ${currentLevel.targetWord}`;
    
    // Voice helper button visibility
    if (currentDifficulty === 'easy') {
      speakPhraseBtn.classList.remove('hidden');
    } else {
      speakPhraseBtn.classList.add('hidden');
    }

    // Set up choices based on difficulty
    if (currentDifficulty === 'normal') {
      interactionTitle.textContent = "Fill in the blank:";
      const dists = getRandomNormalDistractors(currentLevel.targetWord);
      levelChoicesMemo = shuffle([currentLevel.targetWord, ...dists]);
    } else {
      interactionTitle.textContent = "Put the words in order:";
      levelChoicesMemo = shuffle([...currentLevel.words, ...currentLevel.distractors]);
    }

    renderSlotsTray();
    renderWordDeck(levelChoicesMemo);
  }
}

// Render slots tray
function renderSlotsTray() {
  slotsTray.innerHTML = '';
  const currentLevel = levels[currentLevelIndex];
  
  if (currentDifficulty === 'normal') {
    // Fill-in-the-blank style slots rendering
    const parts = currentLevel.sentenceWithBlank.split("_______");
    
    // Render first text part
    if (parts[0]) {
      const textSpan = document.createElement('span');
      textSpan.className = 'static-sentence-text';
      textSpan.textContent = parts[0];
      slotsTray.appendChild(textSpan);
    }
    
    // Render slot
    const slot = document.createElement('div');
    slot.className = 'slot-placeholder';
    if (selectedWords[0]) {
      const card = document.createElement('div');
      card.className = 'word-card';
      card.textContent = selectedWords[0];
      card.addEventListener('click', () => {
        if (isCurrentLevelSolved) return;
        playSound('click');
        selectedWords = [];
        updateGameFlow();
      });
      slot.appendChild(card);
    } else {
      slot.textContent = '?';
    }
    slotsTray.appendChild(slot);
    
    // Render second text part
    if (parts[1]) {
      const textSpan = document.createElement('span');
      textSpan.className = 'static-sentence-text';
      textSpan.textContent = parts[1];
      slotsTray.appendChild(textSpan);
    }
  } else {
    // Normal sentence ordering slots rendering
    const slotsCount = currentLevel.words.length;
    for (let i = 0; i < slotsCount; i++) {
      const slot = document.createElement('div');
      slot.className = 'slot-placeholder';
      
      if (selectedWords[i]) {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.textContent = selectedWords[i];
        card.addEventListener('click', () => {
          if (isCurrentLevelSolved) return;
          playSound('click');
          selectedWords.splice(i, 1);
          updateGameFlow();
        });
        slot.appendChild(card);
      } else {
        slot.textContent = '?';
      }
      slotsTray.appendChild(slot);
    }
  }
}

// Render word pool deck
function renderWordDeck(availableChoices) {
  wordDeck.innerHTML = '';
  let tempSelected = [...selectedWords];
  const remainingChoices = [];
  
  availableChoices.forEach(choice => {
    const index = tempSelected.indexOf(choice);
    if (index > -1) {
      tempSelected.splice(index, 1);
    } else {
      remainingChoices.push(choice);
    }
  });

  remainingChoices.forEach(word => {
    const card = document.createElement('button');
    card.className = 'word-card';
    card.textContent = word;
    
    card.addEventListener('click', () => {
      if (isCurrentLevelSolved) return;
      const currentLevel = levels[currentLevelIndex];
      const maxSlots = currentDifficulty === 'normal' ? 1 : currentLevel.words.length;
      
      if (selectedWords.length < maxSlots) {
        playSound('click');
        speak(word);
        selectedWords.push(word);
        updateGameFlow();
      }
    });
    
    wordDeck.appendChild(card);
  });
}

// Update game flow when card is selected or deselected
function updateGameFlow() {
  renderSlotsTray();
  const choices = getLevelChoices();
  renderWordDeck(choices);
  
  slotsTray.classList.remove('correct', 'incorrect');
  messageBanner.classList.add('hidden');
  
  const maxSlots = currentDifficulty === 'normal' ? 1 : levels[currentLevelIndex].words.length;
  if (selectedWords.length === maxSlots) {
    checkAnswer();
  }
}

function getLevelChoices() {
  return levelChoicesMemo;
}

// Check Answer
function checkAnswer() {
  const currentLevel = levels[currentLevelIndex];
  let isCorrect = false;
  
  if (currentDifficulty === 'normal') {
    isCorrect = (selectedWords[0].toLowerCase() === currentLevel.targetWord.toLowerCase());
  } else {
    isCorrect = (selectedWords.join(' ').toLowerCase() === currentLevel.statement.toLowerCase());
  }
  
  if (isCorrect) {
    isCurrentLevelSolved = true;
    score += 10;
    scoreValue.textContent = score;
    slotsTray.classList.add('correct');
    
    playSound('correct');
    startConfetti();
    setTimeout(() => {
      speak(currentDifficulty === 'normal' ? currentLevel.targetWord : currentLevel.statement);
    }, 400);

    const congratsMessages = [
      "Excellent job! 🎉",
      "Fantastic! You got it! 🌟",
      "Super star! ⭐",
      "You are amazing! 🎈",
      "Wow! Spot on! 🌈"
    ];
    messageText.textContent = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
    messageBanner.classList.remove('hidden');
    nextLevelBtn.classList.remove('hidden');
  } else {
    slotsTray.classList.add('incorrect');
    playSound('incorrect');
    
    if (currentDifficulty === 'normal') {
      messageText.textContent = "Oops! Try another card. 💡";
    } else {
      messageText.textContent = "Oops! Try arranging the cards again. 💡";
    }
    messageBanner.classList.remove('hidden');
  }
}

// Event Listeners
speakPhraseBtn.addEventListener('click', () => {
  playSound('click');
  const currentLevel = levels[currentLevelIndex];
  speak(currentLevel.statement);
});

listenReplayBtn.addEventListener('click', () => {
  playSound('click');
  const currentLevel = levels[currentLevelIndex];
  speak(currentLevel.targetWord);
});

function handleNextLevel() {
  playSound('click');
  currentLevelIndex++;
  
  if (currentLevelIndex < levels.length) {
    initLevel();
  } else {
    // Completed all levels! Show Victory Modal
    progressFill.style.width = '100%';
    playSound('victory');
    startConfetti();
    victoryModal.classList.remove('hidden');
  }
}

nextLevelBtn.addEventListener('click', handleNextLevel);
listenNextLevelBtn.addEventListener('click', handleNextLevel);

// Sound Volume Mute Control
soundToggle.addEventListener('click', () => {
  soundMuted = !soundMuted;
  if (soundMuted) {
    soundOnIcon.classList.add('hidden');
    soundOffIcon.classList.remove('hidden');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } else {
    soundOnIcon.classList.remove('hidden');
    soundOffIcon.classList.add('hidden');
    playSound('click');
  }
});

// Landing Page & Level Selector Transitions
episodeCard1.addEventListener('click', () => {
  playSound('click');
  episodeScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  renderLevelGrid();
});

backToEpisodesBtn.addEventListener('click', () => {
  playSound('click');
  startScreen.classList.add('hidden');
  episodeScreen.classList.remove('hidden');
});

// Navigation Back to Menu Click Bindings
menuBtn.addEventListener('click', () => {
  playSound('click');
  gameContainer.classList.add('hidden');
  startScreen.classList.remove('hidden');
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});

victoryMenuBtn.addEventListener('click', () => {
  playSound('click');
  victoryModal.classList.add('hidden');
  gameContainer.classList.add('hidden');
  episodeScreen.classList.remove('hidden'); // Victory Menu returns to Episode Selection landing page
});

// Reset Game
function resetGame() {
  currentLevelIndex = 0;
  score = 0;
  victoryModal.classList.add('hidden');
  initLevel();
  
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
}

playAgainBtn.addEventListener('click', () => {
  playSound('click');
  resetGame();
});

// Difficulty Tab Switcher
function initDifficultySelector() {
  const tabs = document.querySelectorAll('.diff-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playSound('click');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentDifficulty = tab.dataset.diff;
    });
  });
}

// Bootstrap game initialization
window.addEventListener('load', () => {
  initDifficultySelector();
  scoreValue.textContent = score;
});

// Image load error handler
function handleImageError() {
  const currentLevel = levels[currentLevelIndex];
  const imageFallback = document.getElementById('imageFallback');
  const fallbackEmoji = document.getElementById('fallbackEmoji');
  
  vocabImage.classList.add('hidden');
  imageFallback.classList.remove('hidden');
  fallbackEmoji.textContent = currentLevel.emoji;
}
