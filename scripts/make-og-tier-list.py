"""Build public/og-tier-list.png (1200x630) from the tier data sprites."""
import re, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(sys.argv[1])
src = (root / 'src/data/tiers.ts').read_text(encoding='utf8')
rows = re.findall(r"\['(\w+)', '[\w-]+', '[^']+', '[^']+', '(\w)', '(\w)', '(\w)'", src)
# group by mid-game tier (the phase that decides most runs)
groups = {t: [r[0] for r in rows if r[2] == t] for t in 'SABC'}

W, H = 1200, 630
img = Image.new('RGB', (W, H), (20, 22, 30))
d = ImageDraw.Draw(img)
def font(size):
    for f in ('arialbd.ttf', 'C:/Windows/Fonts/arialbd.ttf', 'DejaVuSans-Bold.ttf'):
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default()
d.text((48, 36), 'PokeSurvivor Tier List', font=font(60), fill=(255, 255, 255))
d.text((50, 108), 'Starters ranked S to C  |  Mid game  |  Oct 2026', font=font(28), fill=(170, 176, 190))
colors = {'S': (255, 107, 107), 'A': (255, 179, 71), 'B': (255, 230, 109), 'C': (140, 233, 154)}
y, size, gap = 170, 72, 6
for t in 'SABC':
    ids = groups[t]
    if not ids: continue
    per_row = (W - 48 - 130) // (size + gap)
    lines = max(1, -(-len(ids) // per_row))
    h = lines * (size + gap) + 8
    d.rounded_rectangle((48, y, 148, y + h - 8), 10, fill=colors[t])
    d.text((98, y + (h - 8) / 2), t, font=font(52), fill=(20, 20, 20), anchor='mm')
    for i, pid in enumerate(ids):
        sp = Image.open(root / f'public/sprites/{pid}.png').convert('RGBA').resize((size, size), Image.NEAREST)
        x = 164 + (i % per_row) * (size + gap)
        yy = y + (i // per_row) * (size + gap)
        img.paste(sp, (x, yy), sp)
    y += h + 6
d.text((W - 48, H - 24), 'Sprites: PMD SpriteCollab (CC BY-NC 4.0)', font=font(18), fill=(120, 126, 140), anchor='rs')
img.save(root / 'public/og-tier-list.png', optimize=True)
print(groups, y)
