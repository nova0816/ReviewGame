# 📚 Episode Vocabulary Game Production SOP & Blueprint

This Standard Operating Procedure (SOP) documents the complete, step-by-step workflow for extracting vocabulary from video episodes, classifying words by concreteness, reviewing abstract comic illustrations with a human-in-the-loop approval mechanism, building the game codebase, and deploying to GitHub.

---

## 📋 Table of Contents
1. **Phase 1: Video Transcript & Vocabulary Extraction**
2. **Phase 2: Concreteness & Abstractness Classification Framework**
3. **Phase 3: Visual Concept Generation & Human Approval Mechanism (Abstract Words)**
4. **Phase 4: Game Architecture & Code Construction**
5. **Phase 5: Rebranding & Copyright Compliance**
6. **Phase 6: Deployment & GitHub Publishing SOP**

---

## 🎬 Phase 1: Video Transcript & Vocabulary Extraction
1. **Fetch Transcript:** Use `youtube-transcript-api` in Python with the video ID (e.g. `b6KvEcCy2IQ`).
   ```python
   from youtube_transcript_api import YouTubeTranscriptApi
   api = YouTubeTranscriptApi()
   transcript = api.fetch("VIDEO_ID")
   ```
2. **Curate 15 Target Words:**
   - Target Age: 7-year-old ESL student.
   - Mix of Word Types: Nouns, Verbs, Adjectives, Expressions.
   - For each word, define:
     - Target Word
     - Full Statement (for Easy/Hard unscramble mode)
     - Words array + Distractor words array
     - Fill-in-the-Blank Sentence (for Normal mode)
     - Simplified Child-Friendly Definition & Pronunciation

---

## 🧠 Phase 2: Concreteness & Abstractness Classification Framework

Before creating visual illustrations, evaluate all 15 words using the **3-Tier Psycholinguistic Concreteness Scale**:

| Tier | Definition | Visual Strategy | Examples |
| :--- | :--- | :--- | :--- |
| **Level 1: Highly Concrete** | Direct physical objects, body actions, or sensory states. | **Single Vector Photo/Illustration** | *Scarf, Pond, Muddy, Shake* |
| **Level 2: Semi-Concrete** | Environmental climate, posture, or relative physical properties. | **Single Vector Photo** (with comparative/sensory cues) | *Autumn, Windy, Freezing, Heating, Thin, Heavy, Lean* |
| **Level 3: Abstract** | Cognitive mental states, subjective preferences, measurements, compound idioms. | **Multi-Panel (2-3 Panel) Comic Strip + Dual-Coding** | *Suppose, Favorite, Weight, Stroke of luck* |

---

## 🎨 Phase 3: Abstract Words Reviewing Mechanism (Human-in-the-Loop)

To ensure abstract concepts are accurately depicted for a 7-year-old before writing code:

1. **Design 2-Panel Comic Prompts:**
   - **Panel 1 (Setup/Context):** Show the initial situation or trigger (e.g. falling into leaves, looking at multiple toys, a thin branch holding a bird, wind blowing a hat).
   - **Panel 2 (Abstract Concept / Outcome):** Show the abstract resolution (e.g. realizing it's funny, picking the teddy bear with glowing hearts, an elephant bending the branch under heavy weight, hat landing safely in a net with a clover).
2. **Generate Images via AI:**
   - Use image generation tool with prompt structured as: `"A 2-panel cartoon comic strip for kids. Left panel: [Setup]. Right panel: [Outcome]. Bright colorful vector art, comic panels, no text."`
3. **Create Review Artifact (`abstract_comics_review.md`):**
   - Embed all generated comic images.
   - Outline the story concept for each panel.
   - **CRITICAL STEP:** **STOP and wait for user/parent approval** before revising game source code.

---

## 💻 Phase 4: Game Architecture & Code Construction

1. **Landing Page Menu (Multi-Episode Support):**
   - Top-level `episodeScreen`: Grid of Episode Cards (e.g., Active Card: *PP S2 E8 - Autumn Wind*, Locked Cards: *Coming Soon!*).
   - Smooth navigation: Landing Page ➔ Stage/Level Selector ➔ Gameplay Interface.
2. **Four Educational Game Modes:**
   - **Easy Mode:** Unscramble the full sentence with voice button support.
   - **Listen Mode:** Tap the matching picture card from 3 choices upon hearing the spoken word.
   - **Normal Mode (Fill-in-the-Blank):** Real grammar review where the child chooses the target word to complete a sentence (e.g., *"I _______ it is funny."*).
   - **Hard Mode:** Unscramble sentence without audio guides.
3. **Audio & Audio-Visual Feedback:**
   - Web Audio API oscillators for click, correct, error, and victory sounds.
   - Web Speech Synthesis (`SpeechSynthesisUtterance`) for voice pronunciation.
   - Confetti animation canvas on level/stage completion.

---

## ⚖️ Phase 5: Rebranding & Copyright Compliance Checklist

Before publishing to the internet:
- [x] Rename episode titles to generic names or abbreviated codes (e.g. *"PP S2 E8"* instead of full branded show names).
- [x] Replace episode title subtitles with generic descriptions (e.g., *"Autumn Wind"* instead of official episode titles).
- [x] Ensure all character names in level statements are replaced with generic terms (*"child"*, *"dad"*, *"tree"*).
- [x] Run automated script search to confirm **0 occurrences** of protected brand names in the repository.

---

## 🚀 Phase 6: Deployment & GitHub Publishing SOP

1. **Git Initialization:**
   ```bash
   git init
   ```
2. **Add `.gitignore`:** Ignore `.agents/`, `*.log`, `.system_generated/`, `/scratch/`.
3. **Commit & Set Remote:**
   ```bash
   git add .
   git commit -m "Initial commit of Episode Game"
   git branch -M main
   git remote add origin https://<PAT_TOKEN>@github.com/<USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
4. **Enable GitHub Pages:**
   - GitHub ➔ Settings ➔ Pages ➔ Source: `Deploy from a branch` ➔ Branch: `main` (`/root`) ➔ Save.
   - Live URL: `https://<USERNAME>.github.io/<REPO_NAME>/`
