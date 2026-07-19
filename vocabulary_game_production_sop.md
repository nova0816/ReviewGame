# 📚 Episode Vocabulary Game Production SOP & Blueprint (Consolidated Edition)

This Standard Operating Procedure (SOP) documents the complete, consolidated end-to-end workflow for batch producing interactive vocabulary games for 7-year-old ESL learners.

---

## 📋 Table of Contents
1. **Phase 1: Video Transcript & CEFR A1/A2 Word Selection Rule**
2. **Phase 2: Concreteness & Abstractness Classification Framework**
3. **Phase 3: 3D Pixar Cartoon & Multi-Panel Comic Generation**
4. **Phase 4: Human-in-the-Loop Abstract Review Mechanism**
5. **Phase 5: Game Architecture & Multi-Episode Engine**
6. **Phase 6: Rebranding & Copyright Compliance**
7. **Phase 7: Automated Batch Engine & GitHub Publishing SOP**

---

## 🔬 Phase 1: Video Transcript & CEFR A1/A2 Word Selection Rule

To ensure words are 100% authentic to the video episode while remaining age-appropriate for a 7-year-old ESL student:

1. **Transcript Fetching:** Download episode transcripts using `youtube-transcript-api` in Python.
2. **Strict A1/A2 Selection (No Word Replacements):**
   - Filter the transcript words to identify those belonging to **CEFR A1** (Top 1,000 words) and **CEFR A2** (Top 2,500 words).
   - **CRITICAL RULE:** **Do NOT modify, paraphrase, or replace words with outside synonyms.** Pick 15 target words **directly spoken in the episode** that pass the CEFR A1/A2 filter.
   - **Automatic Rejection:** Ignore any B1, B2, C1, C2 words spoken in the video episode during word selection.
3. **Curate 15 Target Vocabulary Items:**
   - Target Word (CEFR A1/A2 directly from show)
   - Full Sentence Statement (authentic to show)
   - Words Array + Distractor Words Array
   - Fill-in-the-Blank Sentence (for Normal mode)
   - Child-friendly emoji and pronunciation guide

---

## 🧠 Phase 2: Concreteness & Abstractness Classification Framework

Evaluate all 15 curated A1/A2 words using the **3-Tier Psycholinguistic Concreteness Scale**:

| Tier | Definition | Visual Strategy | Examples |
| :--- | :--- | :--- | :--- |
| **Level 1: Highly Concrete** | Direct physical objects, body actions, or sensory states. | **Single 3D Pixar Cartoon PNG** | *Rocket, Crab, Beach, Bucket, Fish, Shell* |
| **Level 2: Semi-Concrete** | Climate, posture, or relative physical properties with sensory cues. | **Single 3D Pixar Cartoon PNG** | *Shine, Walk, Stuck, Dig, Grow* |
| **Level 3: Abstract** | Cognitive mental states, preferences, measurements, compound idioms. | **Multi-Panel (2-3 Panel) Comic Strip + Dual-Coding** | *Future, Remember, Pretend, Rescue, Special* |

---

## 🎨 Phase 3: 3D Pixar Cartoon & Multi-Panel Comic Generation

**Quality Rule:** Use **100% 3D Pixar/Disney style PNG cartoon illustrations**. Do not use flat vector drawings.

1. **Concrete Words (Single 3D Pixar PNG):**
   - Prompt pattern: `"Charming 3D Pixar style cartoon illustration of [subject], warm lighting, cute character design, 3D render, highly detailed, no text."`
2. **Abstract Words (2-Panel Comic Strips):**
   - Prompt pattern: `"A 2-panel cartoon comic strip for kids. Left panel: [Setup/Trigger]. Right panel: [Abstract Resolution/Feeling]. Bright colorful vector art, comic panels, no text."`

---

## 🔍 Phase 4: Human-in-the-Loop Abstract Review Mechanism

Before revising game source code for an episode:
1. Generate the 4 multi-panel comic strips for Level 3 abstract words.
2. Render a review artifact (`epX_abstract_comics_review.md`) displaying the comic strips and story panel descriptions.
3. Pause for user/parent review and feedback.

---

## 💻 Phase 5: Game Architecture & Multi-Episode Engine

1. **Multi-Episode Database (`app.js`):**
   - Central `episodeData` object containing `ep1`, `ep2`, `ep3`, `ep4`, etc.
   - Dynamic episode selector function (`selectEpisode(epKey)`).
2. **Landing Page Episode Menu (`index.html`):**
   - Interactive Episode Grid with episode cards (`episodeCard1`, `episodeCard2`, `episodeCard3`).
   - Visual status badges (*Active 🟢* vs *Locked 🔴*).
3. **4 Interactive Difficulty Modes:**
   - **Easy Mode:** Sentence unscramble with voice guidance button.
   - **Listen Mode:** Tap matching picture card upon hearing spoken word.
   - **Normal Mode:** Fill-in-the-blank grammar review.
   - **Hard Mode:** Sentence unscramble without voice helpers.

---

## ⚖️ Phase 6: Rebranding & Copyright Compliance

- Use generic code titles (e.g. *PP S2 E8*, *PP S2 E9*, *PP S2 E10*).
- Replace trademarked subtitles with generic descriptive titles (*Autumn Wind, Time Treasure, Tide Pools, Eco Clean*).
- Ensure 0 occurrences of protected brand names exist in `.html`, `.js`, or `.css` files.

---

## 🚀 Phase 7: Automated Batch Engine ("Generate Next 2 Episodes")

When the user triggers **"generate next 2 episodes"**:

1. **Progress Tracker:** Read `episode_tracker.json` to identify the next 2 unbuilt episodes.
2. **Episode A (Immediate Batch):**
   - Extract transcript and select 15 CEFR A1/A2 words directly spoken in the episode (no word replacements).
   - Generate 3D Pixar PNGs and 2-panel abstract comics.
   - Unlock card on `index.html`, update `app.js`, and push live to GitHub.
3. **Episode B (Automated Schedule Batch):**
   - Set background timer via `schedule` tool for the 4-hour API quota reset mark (`CronExpression`).
   - Automatically execute Episode B generation, build files, and push to GitHub hands-free.
