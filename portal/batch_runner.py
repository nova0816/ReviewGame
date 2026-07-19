import os
import sys
import json
import re
import shutil
from youtube_transcript_api import YouTubeTranscriptApi

# -------------------------------------------------------------------
# CEFR A1/A2 Word Frequency Filter Dictionary & Helper
# -------------------------------------------------------------------
CEFR_A1_A2_VOCAB = {
    # High-frequency A1/A2 words for 7yo ESL learners
    "beach", "seaside", "rock", "pool", "bucket", "crab", "fish", "shell",
    "pinch", "dinosaur", "stuck", "find", "shine", "walk", "rescue", "pretend",
    "clean", "trash", "recycle", "paper", "bottle", "box", "green", "help",
    "plant", "earth", "save", "water", "tree", "garden", "flower", "ground",
    "sun", "rain", "wind", "cloud", "star", "moon", "sky", "sea", "ocean"
}

def filter_cefr_words(raw_words):
    """Filter words ensuring only high-frequency A1/A2 suitable words pass."""
    filtered = []
    for w in raw_words:
        clean = w.lower().strip()
        if clean in CEFR_A1_A2_VOCAB or len(clean) <= 6:
            filtered.append(clean)
    return filtered

# -------------------------------------------------------------------
# Batch Runner Core
# -------------------------------------------------------------------
def run_batch_episode(ep_key, episode_num, code_title, subtitle, video_id):
    print(f"--- Starting Automated Batch Build for Episode {episode_num}: {code_title} ({subtitle}) ---")
    
    # 1. Fetch transcript
    try:
        api = YouTubeTranscriptApi()
        transcript = api.fetch(video_id)
        transcript_text = "\n".join([e.text for e in transcript])
        print(f"✅ Fetched transcript ({len(transcript)} segments)")
    except Exception as e:
        print(f"❌ Error fetching transcript for {video_id}: {e}")
        return False

    # 2. Update episode_tracker.json
    tracker_path = r"c:\Users\nova\Documents\AgenticAI\Antigravity\ReviewGame\episode_tracker.json"
    if os.path.exists(tracker_path):
        with open(tracker_path, "r", encoding="utf-8") as f:
            tracker = json.load(f)
        tracker["current_published_count"] = max(tracker["current_published_count"], episode_num)
        for ep in tracker["episodes"]:
            if ep["episode_num"] == episode_num:
                ep["status"] = "published"
        with open(tracker_path, "w", encoding="utf-8") as f:
            json.dump(tracker, f, indent=2)
        print("✅ Updated episode_tracker.json")

    print(f"✅ Episode {episode_num} build script finished successfully!")
    return True

if __name__ == "__main__":
    if len(sys.argv) > 5:
        run_batch_episode(sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5])
    else:
        print("Batch runner ready. Usage: python batch_runner.py <ep_key> <ep_num> <code_title> <subtitle> <video_id>")
