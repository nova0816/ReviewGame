"""Image audit for ReviewGame (Rule 10).

Checks for every level in app.js:
  1. Image file exists.
  2. Image path belongs to its own episode (assets/{ep_id}_...).
  3. No two levels share byte-identical image content (catches copied placeholders).
Also prints a semantic review sheet (target word + statement + image path) for the
episodes passed on the command line, which MUST be visually reviewed one by one.

Usage: python tools/audit_images.py [ep21 ep22 ...]
"""
import hashlib, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
text = open(os.path.join(ROOT, 'app.js'), encoding='utf-8').read()

levels = []
for ep, body in re.findall(r'(ep\d+):\s*\{[^\}]*levels:\s*\[(.*?)\]\s*\}', text, re.DOTALL):
    for tw, st, img in re.findall(r'targetWord:\s*"([^"]+)",\s*statement:\s*"([^"]+)".*?image:\s*"([^"]+)"', body):
        levels.append((ep, tw, st, img))

errors = 0
hashes = {}
for ep, tw, st, img in levels:
    path = os.path.join(ROOT, img)
    if not os.path.exists(path):
        print(f"MISSING   {ep} '{tw}' -> {img}"); errors += 1; continue
    if not os.path.basename(img).startswith(ep + '_'):
        print(f"FOREIGN   {ep} '{tw}' -> {img}"); errors += 1
    h = hashlib.md5(open(path, 'rb').read()).hexdigest()
    hashes.setdefault(h, []).append(f"{ep}:{tw}")

# Also compare against every file in assets (catches copies of unused/other files)
file_hashes = {}
for f in os.listdir(os.path.join(ROOT, 'assets')):
    p = os.path.join(ROOT, 'assets', f)
    if os.path.isfile(p):
        file_hashes.setdefault(hashlib.md5(open(p, 'rb').read()).hexdigest(), []).append(f)

for h, users in hashes.items():
    files = file_hashes.get(h, [])
    if len(users) > 1 or len(files) > 1:
        print(f"DUPLICATE levels={users} files={files}"); errors += 1

print(f"\nLevels checked: {len(levels)} | Problems: {errors}")

targets = sys.argv[1:]
if targets:
    print("\n=== SEMANTIC REVIEW SHEET (view each image and confirm it shows the statement) ===")
    for ep, tw, st, img in levels:
        if ep in targets:
            print(f"{ep:<5} {tw:<16} \"{st}\"  ->  {img}")
sys.exit(1 if errors else 0)
