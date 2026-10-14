# PokeSurvivor fan site: content spec

Research date: 2026-10-14. Facts below were verified against the cited URL on that date. Anything not confirmed is marked **UNVERIFIED**. The game is updated almost daily (see the news page), so re-check numbers before each publish.

Sources (short keys used below):
- [OFF-EN] https://pokesurvivor.com/en/ (official game, EN entry)
- [GUIDE] https://pokesurvivor.com/en/guide/
- [LEG] https://pokesurvivor.com/en/legendaries/
- [MOVES] https://pokesurvivor.com/en/moves/
- [NEWS] https://pokesurvivor.com/en/news/
- [SITEMAP] https://pokesurvivor.com/sitemap.xml
- [ITCH] https://jpter78.itch.io/pokesurvivor
- [GH] https://github.com/JPTER78/pokesurvivor (README)
- [CLIENT] https://pokesurvivor.com/js/app.min.js (game client data, read on 2026-10-14; can change with any update)

## 1. URLs and embed decision

| Item | Value | Source |
|---|---|---|
| Official site | https://pokesurvivor.com/ (Spanish, x-default); English at https://pokesurvivor.com/en/ | [SITEMAP] |
| www | https://www.pokesurvivor.com/ 301 to apex | curl -I |
| itch.io | https://jpter78.itch.io/pokesurvivor (author jpter78, release 11/10/2026, HTML5) | [ITCH] |
| itch.io game frame | https://html-classic.itch.zone/html/19670081/index.html | [ITCH] page source |
| Source code | https://github.com/JPTER78/pokesurvivor | [ITCH], [GH] |
| Hosting | GitHub Pages behind Fastly (`Server: GitHub.com`) | curl -I |

Header check (curl -I, 2026-10-14):
- `https://pokesurvivor.com/` returns 200 with **no `X-Frame-Options` and no `Content-Security-Policy`** header, so no frame-ancestors restriction.
- A grep of the client JS for frame-busting (`top !==`, `frameElement`) found nothing.
- The itch.io frame (`html-classic.itch.zone/.../index.html`) is itself just a wrapper page that iframes `https://pokesurvivor.com/` with `allow="autoplay; fullscreen; gamepad; clipboard-write"`. The developer already embeds the live site in a third-party frame.
- `https://itch.io/embed-upload/19670081` returned HTTP 429 during testing; not needed.

**Decision:** embed the official site directly. Do not embed the itch.zone wrapper (double iframe, adds itch.io script, no benefit).

```html
<iframe src="https://pokesurvivor.com/en/" title="Play PokeSurvivor"
  allow="autoplay; fullscreen; gamepad; clipboard-write" allowfullscreen
  loading="lazy" style="width:100%;aspect-ratio:16/9;border:0"></iframe>
```
- EN pages: `https://pokesurvivor.com/en/`. ZH pages: same URL (no Chinese version exists; the game auto-picks EN/ES by browser language and can be switched in Settings [GUIDE]).
- Always show a fallback link-out button next to the frame: "Open PokeSurvivor in a new tab" -> `https://pokesurvivor.com/en/` (`target="_blank" rel="noopener"`). Use it as the primary CTA on mobile (the game is landscape/fullscreen-oriented, see section 4).
- Risks inside an iframe, **UNVERIFIED**: Google sign-in popup, Firebase cloud save and co-op login may be affected by third-party cookie / storage partitioning in Safari and Chrome. The itch.io embed suggests it works, but not tested by us. Copy near the iframe should say: "If login or co-op doesn't work here, open the game in a new tab."
- Embedding permission is technical only. No explicit written permission from the developer was found. **UNVERIFIED**: developer's stance on third-party embeds. Consider contacting via the GitHub repo.

## 2. Core facts (verified)

- Free, non-profit fan game, no ads, no purchases; voluntary donations only pay servers, give no advantage. [GUIDE]
- Survivors-like / bullet-heaven "in the style of Survivor.io and Vampire Survivors". [GUIDE]
- **Movement only**: "You only move: your partner Pokémon attacks automatically." [ITCH]
- Controls PC: WASD or arrow keys to move; 1–4, Q/E or click icon to switch active move; Esc pauses (also P per [GH]). [GUIDE], [GH]
- Controls mobile/tablet (landscape): drag anywhere to move (joystick appears where you touch), tap a move to switch, top-right button pauses. [GUIDE]
- Auto-attack with the active move. [GUIDE]
- **966 Pokémon** from all 9 regions (Kanto to Paldea), all playable as partner, with shiny forms. [GUIDE], [ITCH]
- Shinies: 1/4096 wild; 1 in 100 gacha pulls. [GUIDE], [GH]
- **Level-up**: collect XP, pick one of three cards (new move, upgrade an owned move, or a boost for your Pokémon). [GUIDE] A reroll ("change options", key R) exists in the level-up screen. [OFF-EN] UI text
- **Move evolution**: moves upgrade up to level 5; at max level, get the upgrade card it asks for (Power, Vigor, Reflexes, Sprint…) and a golden evolution card appears. 64 moves, 59 can evolve. Examples: Ember -> Fire Blast (with Power), Water Gun -> Scald (Power), Bubble -> Surf (Sprint), Vine Whip -> Power Whip (Power), Tackle -> Take Down (Vigor). [MOVES] The 5 non-evolving moves are the buff moves Swords Dance, Agility, Harden, Aqua Ring, Dragon Dance. [MOVES], last checked 2026-10-14
- **Starter move details** (description / evolution / card / change at evolution), [MOVES], last checked 2026-10-14:

| Move | Official description | Evolves into | Card | Change at evolution |
|---|---|---|---|---|
| Ember | "A fireball at the nearest enemy." | Fire Blast | Power | ×1.8 damage, +2 projectiles, +2 pierce and bigger |
| Water Gun | "A piercing jet. Reliable at any range." | Scald | Power | ×1.8 damage, +2 projectiles, +2 pierce and bigger |
| Vine Whip | "Long-range whips in a wide arc." | Power Whip | Power | ×1.9 damage, more range and hits in 360° |
| Bubble | "A fan of bubbles that slows whatever they touch." | Surf | Sprint | +6 projectiles, ×1.6 damage and +1 pierce |
| Razor Leaf | "Two leaves that fly out and back, cutting both ways." | Leaf Storm | Reflexes | ×1.8 damage, +1 boomerang and more range |
| Confusion | "A wave that homes in on its target." | Psyshock | Reflexes | ×1.8 damage, +2 projectiles, +2 pierce and bigger |
| Tackle | "Charges in an arc at everything in front of you." | Take Down | Vigor | ×1.9 damage, more range and hits in 360° |
- **Bonds**: each legendary defeated in a rift lets you link moves so they fire together from one slot, up to 4. [NEWS] 2026-10-11
- **Enemy personalities (the four)**: healers, shielders, exploders, summoners. [ITCH] The guide additionally mentions enemies that fire telegraphed beams (ground markers). [GUIDE] Healers heal more the harder you hit, with a cap. [NEWS] 2026-10-12
- Bosses: 4 telegraphed attacks, enrage at half health. [NEWS] 2026-10-10, verbatim: "Bosses and legendaries have 4 telegraphed attacks, close in or fight from range and get enraged at half health." The entry does not mention rifts, so applying it to rift legendaries is our assumption (pages must say so). Last checked 2026-10-14.
- Meowth: "Meowth running away loaded with coins." [NEWS] 2026-10-10. How the coins drop is not described (**UNVERIFIED**). Last checked 2026-10-14.
- Settings: sound, graphics quality (with automatic mode), damage numbers, reduced screen shake, FPS, account. [GH]; "New settings screen with automatic graphics quality, and fewer but stronger enemies on screen." [NEWS] 2026-10-09. Not tied to phones specifically; suggesting it for phone lag is our advice. Last checked 2026-10-14.
- PvP: no PvP or competitive mode is mentioned in [GUIDE], [NEWS] or [GH]; multiplayer is described as co-op only (leaderboards exist). Copy may say "the official pages only describe co-op", not "there is no PvP". Last checked 2026-10-14.
- Weather (rain, sun, sand, snow, fog) and type chart affect damage. [GUIDE]
- Held items, e.g. Leftovers, Choice Band, Life Orb; only one carried. [GUIDE], [OFF-EN] UI text
- Map objects: power altars, healing springs, locked chests (stand next to them), traps. [GH]
- At minute 30 Arceus appears ("Judgment of Arceus", invincible chase). [NEWS] 2026-10-13
- Gacha per region, tickets earned by playing, never sold for real money. [GUIDE], [ITCH]
- Missions (daily/weekly), 127 achievements, profile, leaderboards. [GUIDE]
- **Co-op**: online, up to 4 players, via friends list: add friends by nickname, invite to your room, start. XP is shared; revive a fallen teammate by standing next to them. [GUIDE] Peer-to-peer connection (teammates may see each other's IP), Firebase relay fallback. [OFF-EN] privacy text. If the host switches tabs the run pauses for everyone. [NEWS] 2026-10-12
- **Co-op details from source code** ([GH] js/net/social.js, coop.js, net.js, js/ui/social-ui.js, js/data/lang-en.js; checked 2026-10-14):
  - Room size 2-4: MAX_PLAYERS = 4; Start game disabled until at least 2 players ("You need at least one friend in the room"). Only the host can invite; invites expire after 3 minutes; can't join a run already started.
  - Host leaving ends the run for everyone; guest leaving doesn't.
  - Enemy scaling by player count n: spawn rate x(1 + 0.75(n-1)), enemy HP x(1 + 0.3(n-1)); bosses extra x1.4 HP in group runs.
  - Connection: WebRTC direct, then Cloudflare TURN (turn.pokesurvivor.com, account holders only). Firebase Realtime Database relay disabled since 2026-10-12 (ALLOW_RELAY = false); if neither works the room shows a "can't connect" error and retries every 15 s. In-game privacy text still mentions Firebase.
  - Google sign-in uses signInWithPopup (popup can be blocked; in an iframe the login storage is partitioned from the top-level site). Co-op inside a third-party embed: not tested.
  - Nicknames 3-16 letters, numbers or _. Monthly cap on new accounts.
- **PC + mobile in one room: VERIFIED** by the site owner (2026-10-14), same web client.
- **App**: no App Store / Google Play app found ([GUIDE], [ITCH], [GH] checked 2026-10-14); "installable as an app" = PWA Add to Home Screen (manifest.webmanifest).
- **Offline download** (itch.io zip): unzip, open index.html; "solo only and saves in your browser". Co-op, cloud saves, leaderboards need the online version. [ITCH]
- No download needed to play online. [GUIDE]
- Saves: account (name+password or Google) = cloud save; guest = nothing saved outside the browser. [GUIDE]
- Credits: sprites PMD SpriteCollab (CC BY-NC 4.0), data PokéAPI, font Pixelify Sans, original music. Developer discloses AI-assisted development. [ITCH]

### Mysterious Rifts
- A rift opens on the map now and then; step inside to fight a legendary in an arena of its type, with its own terrain and weather. Win: ×10 gacha ticket. Lose: back to the map, no reward. In a group, everyone enters together. [LEG]
- Rifts appear at least every 2.5 minutes; legendaries you're missing appear more often. [NEWS] 2026-10-12
- **18 arenas** (type: arena) [LEG]: Normal: Eternal Meadow · Fire: Igneous Volcano · Water: Sea Grotto · Grass: Emerald Jungle · Electric: Volt Plant · Ice: Eternal Glacier · Fighting: Ancient Dojo · Poison: Toxic Swamp · Ground: Red Desert · Flying: Sky Peak · Psychic: Mind Temple · Bug: Hive Forest · Rock: Ancient Quarry · Ghost: Gloomy Graveyard · Dragon: Dragon Sanctuary · Dark: Dark Alley · Steel: Steel Fortress · Fairy: Enchanted Forest.
- **Which legendary per rift**: there is no fixed one-legendary-per-arena mapping. 87 legendaries exist; the arena matches the legendary's type, and dual-type legendaries pick one of their types at random. Terrain: lava burns, ice is slippery, water slows. [LEG] (The itch.io blurb "each with its own legendary" is looser wording; follow [LEG].) Example pairings from types: Kyogre -> Sea Grotto, Groudon -> Red Desert, Regice -> Eternal Glacier, Darkrai -> Dark Alley, Rayquaza -> Dragon Sanctuary or Sky Peak.
- Which legendary spawns in a given rift (selection odds): **UNVERIFIED** beyond "missing ones more often".

## 3. Starters / early partners

- New players take a personality quiz ("Your personality is…") which suggests a partner; you can accept ("Let's go together!") or "Choose another". [OFF-EN] UI text, [GH]
- Picker text: "The starters from every region, plus two more friends." [CLIENT]
- 29 starter-flagged Pokémon in client data [CLIENT]: the 27 regional starters (Bulbasaur, Charmander, Squirtle, Chikorita, Cyndaquil, Totodile, Treecko, Torchic, Mudkip, Turtwig, Chimchar, Piplup, Snivy, Tepig, Oshawott, Chespin, Fennekin, Froakie, Rowlet, Litten, Popplio, Grookey, Scorbunny, Sobble, Sprigatito, Fuecoco, Quaxly) plus Psyduck and Slowpoke.
- Starting moves seen in client data: fire starters Ember; most water starters Water Gun (Popplio: Bubble); grass starters Vine Whip (Bulbasaur, Chikorita, Turtwig, Grookey) or Razor Leaf (Treecko, Snivy, Rowlet, Sprigatito); Slowpoke Confusion. [CLIENT] Not exposed for Squirtle, Psyduck, Piplup, Chespin (**UNVERIFIED**).
- Starting moves for the other four (decoded from obfuscated strings in [CLIENT], read 2026-10-14): Squirtle Water Gun, Psyduck Confusion, Piplup Bubble, Chespin Vine Whip. Base stats: Squirtle 90/96/0.97, Psyduck 92/101/1.06, Piplup 94/95/1.04, Chespin 95/94/1.04 (HP/speed/atk).
- Shiny (read [CLIENT] 2026-10-14): a shiny partner is a separate collection entry (`partnerShiny` flag); no stat change tied to it was found. Shiny wild enemies (`makeShiny`): HP ×2, XP ×5. Shiny partner stats: no evidence of a difference, not developer-confirmed.
- Base stats in client data are close (HP 88–110, speed 84–108, atk multiplier 0.95–1.09). Highest atk multiplier: Scorbunny 1.09, Torchic/Mudkip/Sobble 1.08; tankiest: Slowpoke HP 110 (slowest, speed 84), Fuecoco HP 100; fastest: Froakie 108. [CLIENT] These are internal numbers and may change; use as "on paper" notes only.
- Other partners come from the region gacha (tickets from regular drops; ×10 tickets from bosses and rift legendaries). Per-Pokémon permanent upgrades bought with coins. [GUIDE]
- **Community opinion**: web searches for reddit / forum tier lists and "best starter" returned no results (game released 2026-10-11). The itch.io community has feedback threads ("Difficulty needs to be lowered", "Some feedback!") but no tier discussion found. **UNVERIFIED / none exists yet.** Tier list must be our own ranking, labeled as such ("our assessment" until real playtesting exists; see criteria notes below).

Tier list criteria (to publish on /tier-list):
1. Auto-attack quality of the starting move (range, pierce, area, reliability while kiting).
2. Max-level evolution of that move and how easy its required upgrade card is (e.g. Ember -> Fire Blast: ×1.8 dmg, +2 projectiles, +2 pierce). [MOVES]
3. Survivability (HP, speed) from base stats.
4. Type coverage vs common hordes and rift arenas.
5. Co-op fit (optional).
How criteria 4–5 are applied without playtesting (decision 2026-10-14): type coverage = the starting move's type against the 18 rift arena types, using standard Pokémon type matchups (the game has a type chart [GUIDE]; exact multipliers not published, **UNVERIFIED**). It is not applied to "common hordes", since horde type mix is not documented. Co-op fit = attack shape only (range/arc/homing from [MOVES] descriptions), as a tiebreaker; no co-op test data.
Playtesting (decision 2026-10-14): "Tested in N runs" and per-tier in-run observations are **optional until real testing happens**. Never state or imply testing that wasn't done; until then pages say "our assessment" and cite client data and [MOVES].
Split by phase: early (0–10 min), mid (10–30 min, rifts/bosses), late (30+ min, Arceus event).

## 4. Mobile

- Plays in mobile browser on phones and tablets, landscape only ("Rotate your phone" prompt). [GUIDE], [OFF-EN]
- Touch: drag-anywhere floating joystick, tap move icon, top-right pause. [GUIDE]
- Add to Home Screen supported: web manifest with `display: fullscreen`, `orientation: landscape`, apple-mobile-web-app-capable meta. [GUIDE], https://pokesurvivor.com/manifest.webmanifest
- iPhone fixes shipped 2026-10-12. [NEWS]
- Offline package (itch.io zip) is single-player only; on phones, opening a zip's index.html is impractical, **UNVERIFIED** whether it works on mobile at all.
- No App Store / Google Play app: none mentioned on official site, itch.io or GitHub; developer only offers browser + PWA install. **UNVERIFIED** as an absolute (absence of evidence). Copy: "There is no official app; anything in an app store claiming to be PokeSurvivor isn't from the developer as far as we know." Also warn: official site says there is no official crypto/token. [GUIDE]

## 5. Languages

- Official site and game: **English and Spanish only**. Game picks by browser language, switchable in Settings. [GUIDE] Sitemap hreflang: `es` (/, x-default) and `en` (/en/). [SITEMAP]
- No Chinese version. Our /zh/ pages are the Chinese guide; the game itself shows in English for Chinese players.

## 6. Global rules

- Every page footer: "Unofficial fan site. Not affiliated with, endorsed by or sponsored by Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company, or the PokeSurvivor developer (jpter78). Pokémon and related names are trademarks of their respective owners. The game is played on its official site, pokesurvivor.com." ZH version: "本站為非官方粉絲站，與任天堂、Creatures、GAME FREAK、The Pokémon Company 及 PokeSurvivor 開發者均無關聯。"
- Link to the official site and itch.io from every page. Do not copy official guide text; summarize and add our own testing.
- Each fact that can change (counts, rift timing) shows a "last checked" date.
- Do not use official Pokémon artwork; use our own screenshots.

## 7. Page outlines (EN)

### / (home)
Keywords: poke survivor, pokesurvivor, pokesurvivor game, play pokesurvivor online, pokemon survivor.
- Title: "Poke Survivor – Play PokeSurvivor Online Free (No Download)"
- H1: Play Poke Survivor Online
- Above iframe (2–3 lines): free fan-made Pokémon survivors-like; you only move, your partner attacks automatically; WASD/arrows or touch drag.
- Iframe + "Open in new tab" button.
- H2 What is PokeSurvivor: 966 Pokémon from 9 regions, level-up move cards, moves evolve at max level, enemies that heal/shield/explode/summon, 18 rift arenas.
- H2 Controls: PC table + mobile line.
- H2 Play with friends: up to 4 online -> /co-op.
- H2 No download needed: browser on PC/phone; Add to Home Screen; offline zip is solo only.
- H2 Explore the guides: cards to /how-to-play, /best-pokemon, /tier-list, /rifts, /co-op, /zh/.
- FAQ: Is it free? Is "Pokemon Survivor" the same game? (clarify: PokeSurvivor by jpter78 at pokesurvivor.com; other itch.io games share the name, e.g. viniflores "Poke Survivor") Is it official? Does it work on phone? Is progress saved?
- Don't: tier list, partner rankings, long guides.

### /tier-list
Keyword: pokesurvivor tier list.
- Title: "PokeSurvivor Tier List: Best Partners for Early, Mid and Late Game"
- H1: PokeSurvivor Tier List (last updated YYYY-MM-DD, game version/news date)
- Intro: our ranking, not official; no community tier list exists yet; "tested in N runs" only once real testing exists (optional until then, see section 3).
- H2 How we rank: the 5 criteria from section 3.
- H2 Early game tiers (0–10 min) S/A/B/C table: Pokémon, starting move, why.
- H2 Mid game (10–30 min: rifts, bosses, bonds).
- H2 Late game (30+ min, Arceus Judgment).
- H2 Move evolutions that carry a tier (Ember -> Fire Blast, Water Gun -> Scald…) link /how-to-play.
- H2 Changelog of this list.
- FAQ: Why is X low? Does shiny change stats? (**UNVERIFIED**, test first) Do permanent upgrades matter more than the pick?
- Links: /best-pokemon (for first pick), /rifts, /co-op.

### /best-pokemon
Keywords: pokesurvivor best pokemon, pokesurvivor best starter.
- Title: "PokeSurvivor Best Starter: Which Partner to Pick First"
- H1: Best First Partner in PokeSurvivor
- Scope: only the first ~30 minutes / first pick. No S–C tiers (link to /tier-list).
- H2 How the first pick works: personality quiz, accept or "Choose another", 27 regional starters + Psyduck and Slowpoke.
- H2 Pick by starting move: Ember (fire) vs Water Gun (water) vs Vine Whip / Razor Leaf (grass) vs Confusion (Slowpoke); what each does and evolves into.
- H2 Our 3 recommendations for beginners, with reasoning + "if you want tanky / fast" alternatives.
- H2 After the first pick: gacha tickets, per-Pokémon upgrades (upgrades are per Pokémon, so pick one to invest in).
- FAQ: Can I change partner later? (yes, collection lets you choose partner, normal or shiny [GH]) Is the quiz result binding? Best for co-op?

### /how-to-play
Keyword: how to play pokesurvivor.
- H1: How to Play PokeSurvivor: Your First 10-Minute Run
- H2 Before you start: guest vs account (guest saves nothing), language setting.
- H2 Minute 0–2: movement, wide circles, collect XP.
- H2 Level-up cards: new move vs upgrade vs boost; reroll; our rule of thumb (max one projectile move first).
- H2 Max-level evolution: level 5 + required upgrade card -> golden card; table of 6–8 common evolutions.
- H2 The four enemy personalities: healer, shielder, exploder, summoner; how to spot and counter each (kill healers/shielders first; step out of ground markers).
- H2 Map objects: altars, springs, locked chests, traps, Meowth with coins.
- H2 Weather and type chart basics.
- H2 First rift and bonds -> /rifts.
- Value-add beyond official guide: timeline, card-pick priorities, personality counters, screenshots.
- FAQ: Why can't I move? (itch.io thread "can't move": click the game to focus, **UNVERIFIED** cause) How to switch moves? What kills me at minute 30?

### /co-op
Keyword: pokesurvivor co-op / multiplayer.
- H1: PokeSurvivor Co-op: Play with up to 4 Friends
- H2 Requirements: online version at pokesurvivor.com, account + nickname; offline download is single-player.
- H2 How to join: add friend by nickname -> host invites to room -> start. Step list.
- H2 Shared rules: shared XP, revive by standing next to teammate, rifts entered together, host tab-switch pauses all.
- H2 Privacy note: P2P connection may expose IP; play with people you know.
- H2 Team composition tips -> /tier-list.
- FAQ: Max players? Cross-platform PC/mobile (**UNVERIFIED**, likely yes since same web client)? Does co-op work inside the embed (**UNVERIFIED**, open in new tab if not)?

### /rifts
Keyword: pokesurvivor rifts / legendaries.
- H1: PokeSurvivor Mysterious Rifts: All 18 Type Arenas
- H2 What rifts are and how to enter (walk into the portal; at least every 2.5 min).
- H2 Rewards: ×10 ticket, bond per legendary.
- H2 Arena table: type, arena name, terrain hazard, example legendaries, recommended counter-type, tips.
- H2 How to beat a legendary: 4 telegraphed attacks, enrage at 50%, use terrain, bring super-effective move.
- H2 Co-op rifts.
- Don't: full list of 87 legendaries with stats (link to official /en/legendaries/ instead).
- FAQ: Which legendary will I get? Can I fail? Why do I see the same one?

## 8. Chinese pages

### /zh/
Keywords: pokesurvivor 攻略, pokesurvivor 中文, poke survivor 中文, 寶可夢倖存者.
Write natively in Traditional Chinese (keyword is Traditional); consider zh-Hans variants of key terms (宝可梦幸存者, 手机) in text for search. Not a translation of the EN home.
- Title: 「PokeSurvivor 攻略｜寶可夢倖存者中文玩法與操作教學」
- H1: PokeSurvivor（寶可夢倖存者）中文攻略
- 開頭：遊戲本身只有英文／西班牙文，本站提供中文說明。只需移動、自動攻擊。
- iframe + 「在新分頁開啟」按鈕。
- H2 操作方式：WASD／方向鍵、1–4／Q E 切換招式、Esc 暫停；手機橫向拖曳。
- H2 開局怎麼玩：性格測驗選夥伴、升級三選一卡片、招式滿級進化。
- H2 遊戲英文介面對照表：Level up, Rift, Bond, Gacha, Shiny 等常見英文詞與中文。（Chinese players' main pain point; differentiator.）
- H2 本站與英文版的差異：中文玩家重點（介面對照、手機遊玩），英文版有完整 tier list。
- H2 延伸閱讀：/zh/mobile、/zh/tier-list 等。
- FAQ：有中文版嗎？（沒有官方中文）要下載嗎？可以和朋友連線嗎？是官方遊戲嗎？

### /zh/mobile
Keywords: poke survivor 中文 手機, pokesurvivor 手机.
- H1: PokeSurvivor 手機版怎麼玩
- H2 用手機瀏覽器直接玩（橫向，Safari/Chrome）。
- H2 觸控操作：任意處拖曳出現搖桿、點招式切換、右上暫停。
- H2 加入主畫面（iOS Safari 分享 -> 加入主畫面；Android Chrome 選單 -> 安裝應用程式／加到主畫面）。
- H2 離線版只能單人，連線合作需線上版。
- H2 沒有 App Store／Google Play 官方 App，小心冒名 App 與代幣。
- FAQ：手機卡頓怎麼辦（設定裡的自動畫質）？存檔會同步嗎（需帳號）？

### ZH counterparts and hreflang
Create: /zh/tier-list, /zh/best-pokemon, /zh/how-to-play, /zh/co-op, /zh/rifts (each localized, not literal translation). The EN /mobile/ page exists (added 2026-10-14), so /mobile/ <-> /zh/mobile/ is a normal hreflang pair.

hreflang pairs (both directions, self-referencing, `x-default` = EN):
- / <-> /zh/
- /tier-list <-> /zh/tier-list
- /best-pokemon <-> /zh/best-pokemon
- /how-to-play <-> /zh/how-to-play
- /co-op <-> /zh/co-op
- /rifts <-> /zh/rifts
- /mobile <-> /zh/mobile
Implementation (2026-10-14): the /zh/ body text is Simplified Chinese, so hreflang and `<html lang>` use `zh-Hans` (`LANG_TAG` in src/i18n.ts). Traditional names appear only once as a bracketed alias, e.g. 宝可梦幸存者（寶可夢倖存者）. A separate Traditional set (`/zh-hant/`, `hreflang="zh-Hant"`) may be added later. (This replaces the earlier plan to tag the Chinese pages zh-Hant.)

## 9. UNVERIFIED list
- Iframe login/Google sign-in/co-op behaviour under third-party cookie limits.
- Developer's explicit permission for third-party embeds.
- Rift legendary selection odds; fixed legendary per arena (official: random by type).
- Any community tier list / best starter consensus (none found).
- Whether offline zip works on mobile.
- Absolute absence of app-store apps.
- Cross-platform co-op PC <-> mobile.
- Whether shiny partners differ in stats (client data shows no difference; not developer-confirmed).
- Cause of itch.io "can't move" reports.
- Which arena uses which terrain (lava/ice/water); [LEG] lists the hazards but not per arena.
- Whether the boss rule (4 telegraphed attacks, enrage at half health) applies inside rifts specifically.
- How Meowth's coins are dropped or collected.
- Exact type-chart multipliers used by the game.
- PvP: none described; not confirmed absent.
