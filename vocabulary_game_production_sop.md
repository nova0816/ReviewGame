# 📚 Episode Vocabulary Game Production SOP & Blueprint (Consolidated Edition)

This Standard Operating Procedure (SOP) documents the complete, consolidated end-to-end workflow for batch producing interactive vocabulary games for 7-year-old ESL learners.

---

## 📋 Table of Contents
1. **Phase 1: Video Transcript & CEFR A1/A2 Word Selection Rule**
2. **Phase 2: Concreteness & Abstractness Classification Framework**
3. **Phase 3: 100% Unique 3D Pixar Cartoon & Multi-Panel Comic Rule (Zero Image Reuse)**
4. **Phase 4: Human-in-the-Loop Abstract Review Mechanism**
5. **Phase 5: Game Architecture & Multi-Episode Engine**
6. **Phase 6: Rebranding & Copyright Compliance**
7. **Phase 7: Automated Batch Engine & GitHub Publishing SOP**

---

## 🔬 Phase 1: Video Transcript & CEFR A1/A2 Word Selection Rule

### 🎯 Mandatory Triple Verification Criteria for Every Episode:
1. **Criterion 1 (Strict CEFR A1 / A2 Only):** Every selected target word MUST be classified as CEFR A1 Starter or A2 Elementary in the Cambridge English Vocabulary Profile for 7-year-old ESL learners. No high-level or obscure words allowed.
2. **Criterion 2 (100% Authentic Episode Transcript):** Every selected word MUST be directly spoken by characters in the video episode dialogue.
3. **Criterion 3 (100% Zero Duplicates Across Game):** Every selected word MUST be audited against `global_vocabulary_registry.md` to ensure zero duplicates across all episodes.


To ensure words are 100% authentic to the video episode while remaining age-appropriate for a 7-year-old ESL student:

1. **Transcript Fetching:** Download episode transcripts using `youtube-transcript-api` in Python.
2. **Strict A1/A2 Selection (No Word Replacements):**
   - Filter the transcript words to identify those belonging to **CEFR A1** (Top 1,000 words) and **CEFR A2** (Top 2,500 words).
   - **CRITICAL RULE:** Pick 15 target words **directly spoken in the episode** that pass the CEFR A1/A2 filter.
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
| **Level 1: Highly Concrete** | Direct physical objects, body actions, or sensory states. | **Single Dedicated 3D Pixar Cartoon PNG** | *Rocket, Crab, Beach, Bucket, Fish, Shell* |
| **Level 2: Semi-Concrete** | Climate, posture, or relative physical properties with sensory cues. | **Single Dedicated 3D Pixar Cartoon PNG** | *Shine, Walk, Stuck, Dig, Grow* |
| **Level 3: Abstract** | Cognitive mental states, preferences, measurements, compound idioms. | **Multi-Panel (2-3 Panel) Comic Strip + Dual-Coding** | *Future, Remember, Pretend, Rescue, Special* |

---

## 🎨 Phase 3: 100% Unique 3D Pixar Cartoon Rule (Zero Image Reuse)

**CRITICAL QUALITY MANDATE:**
1. **Zero Image Reuse:** **NEVER reuse an image across multiple levels or episodes.** Every single target word across every episode must have its OWN unique, 100% dedicated, highly accurate image. Saving API quota by reusing images is **STRICTLY PROHIBITED**.
2. **Visual Accuracy:** Every image prompt must accurately reflect the specific target word and sentence context.
3. **Format:** Use **100% 3D Pixar/Disney style PNG cartoon illustrations** or multi-panel comics for abstract concepts.

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
   - Interactive Episode Grid with episode cards (`episodeCard1`, `episodeCard2`, etc.).
   - Visual status badges (*Active 🟢* vs *Locked 🔴*).
3. **5 Interactive Difficulty Modes:**
   - **Easy 🟢:** Sentence unscramble with voice guidance button.
   - **Listen 🔵:** Tap matching picture card upon hearing spoken word.
   - **Match 🧩:** Tap matching word card for 3D picture (with 15-mistake reset rule).
   - **Normal 🟡:** Fill-in-the-blank grammar review.
   - **Hard 🔴:** Sentence unscramble without voice helpers.

---

## ⚖️ Phase 6: Rebranding & Copyright Compliance

1. **Copyright-Safe Episode Naming Mandate:**
   - **NEVER** use exact trademarked show episode titles (e.g. avoid titles like *"Peppa Pig"*, *"George Catches a Cold"*, *"Daddy Pig's Office"*).
   - Transform all episode titles and main menu cards into original, copyright-safe, descriptive titles (e.g., *"Catching a Cold Day"*, *"Fun at the Office"*, *"Pirate Island Voyage"*, *"Garden Tiny Friends"*, *"Indoor Pool Fun"*).
2. **Code Titles & Subtitles:**
   - Use generic code titles (e.g. *Episode 1*, *Episode 2*, *Episode 16*).
   - Replace trademarked subtitles with generic descriptive adventure titles (*Autumn Wind, Time Treasure, Tide Pools, Eco Clean*).
3. **Protected Brand Names Check:**
   - Ensure 0 occurrences of protected brand names exist in `.html`, `.js`, or `.css` files.


---

## 🚀 Phase 7: Automated Batch Engine ("Generate Next 2 Episodes")

When the user triggers **"generate next 2 episodes"**:

1. **Progress Tracker:** Read `episode_tracker.json` to identify the next 2 unbuilt episodes.
2. **Batch Build:**
   - Extract transcript and select 15 CEFR A1/A2 words directly spoken in the episode.
   - Generate **15 dedicated, 100% unique 3D Pixar PNGs** per episode (zero image reuse).
   - Unlock card on `index.html`, update `app.js`, sync `portal/`, and push live to both `main` and `gh-pages` branches on GitHub.


---

## ⏳ Phase 8: Image Quota Management & Automated Scheduling SOP

When generating images for an episode:
1. **Sequential Image Generation:** Generate dedicated 3D Pixar images sequentially using `generate_image`.
2. **Quota Exhaustion Handling:** If an API quota error occurs (`429 Too Many Requests` / `RESOURCE_EXHAUSTED`):
   - Extract the exact `quotaResetTimeStamp` or `quotaResetDelay` from the error response.
   - Immediately schedule a timer using the `schedule` tool for the exact quota reset duration.
   - Do **NOT** poll or loop. Wait for the background timer notification.
3. **Post-Reset Batch Completion:** Upon timer trigger, resume generating the remaining images, then execute python integration scripts, update `global_vocabulary_registry.md`, sync `portal/`, and push live to `main` & `gh-pages` together in a single consolidated step.
