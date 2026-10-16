---
title: "How to Play PokeSurvivor: First 10-Minute Run Guide"
description: "How to play PokeSurvivor: controls, a minute-by-minute first run, level-up card picks, move evolutions, enemy types and beginner mistakes to avoid."
heading: "How to Play PokeSurvivor: Your First 10-Minute Run"
updated: 2026-10-14
# TODO: uncomment once the 1200x630 screenshot crop is in public/images/how-to-play/
# ogImage: "/images/how-to-play/og-how-to-play.png"
# ogImageAlt: "PokeSurvivor gameplay: partner Pokémon fighting a horde with the level-up cards on screen"
faq:
  - q: "How do I attack?"
    a: "You don't. Your partner attacks automatically with the active move. You only move: WASD or arrow keys on PC, or drag anywhere on a touch screen."
  - q: "How do I switch moves?"
    a: "On PC press 1–4 or Q/E, or click the move icon. On mobile, tap the move icon."
  - q: "Why can't I move?"
    a: "A player on itch.io reported this, and no fix has been posted. The game only reads keys while its page has focus, so click inside the game first. If you play in an embed (here or on itch.io), open the game in a new tab so keys go straight to it."
  - q: "What happens at minute 30?"
    a: "Arceus appears with \"Judgment of Arceus\", an invincible chase. You can't beat it by damage, so keep moving."
  - q: "Is my progress saved as a guest?"
    a: "Not outside your browser. Create an account (name and password, or Google) for a cloud save."
---

How to play PokeSurvivor in one sentence: you only move, and your partner Pokémon attacks on its own. This guide walks through your first 10-minute run minute by minute and adds our own tips on top of the [official guide](https://pokesurvivor.com/en/guide/), which is the source for the rules described here. Need a partner first? See our [best starter guide](/best-pokemon/).

## Before you start

- **Guest or account:** a guest saves nothing outside the browser. An account (name and password, or Google) gives you a cloud save.
- **Language:** the first time you play, the game shows Spanish if your browser is set to Spanish and English otherwise. You can switch in Settings > Graphics > Language; the game reloads and remembers your choice.
- **Partner:** new players take a short personality quiz that suggests a partner. You can accept it or choose another.

## PokeSurvivor controls

| Action | PC | Phone or tablet (landscape) |
| --- | --- | --- |
| Move | WASD or arrow keys | Drag anywhere (a joystick appears where you touch) |
| Attack | Automatic | Automatic |
| Switch active move | 1–4 or Q/E, or click the move icon | Tap the move icon |
| Reroll level-up cards | R ("change options") | Tap "change options" |
| Pause | Esc | Top-right button |

On a phone the game only runs in landscape. Setup and home-screen install are in [PokeSurvivor on mobile](/mobile/).

## Minutes 0–2: move and collect

You only move; your partner attacks on its own with the active move. Enemies drop XP, so you need to get close enough to pick it up without getting surrounded.

### Movement tips

- Move in wide circles instead of back and forth. The horde follows you in a line, which keeps them in front of your attack.
- Don't stop to pick up every gem. Loop back for them once the area is thinner.

<!-- IMAGE PLACEHOLDER 1: screenshot of an early run, partner kiting a horde in a wide circle with XP gems on the ground.
     Suggested file: /images/how-to-play/first-minutes.webp
     Suggested alt: "PokeSurvivor first minutes: partner Pokémon circling a horde while collecting XP gems" -->

## Level-up cards

Each level offers three cards: a new move, an upgrade to a move you own, or a boost for your Pokémon. If none fit, you can reroll ("change options", key R). In the current game code you get one free reroll per run; a permanent upgrade bought with coins adds up to 5 more.

<!-- IMAGE PLACEHOLDER 2: screenshot of the level-up screen with three cards.
     Suggested file: /images/how-to-play/level-up-cards.webp
     Suggested alt: "PokeSurvivor level-up screen offering three cards: new move, move upgrade and boost" -->

### Card-pick priorities for a first run

1. Push your starting move toward level 5 first. One maxed, evolved move beats four weak ones.
2. Take a second attack move early so you aren't relying on one direction.
3. Take the upgrade card your main move needs to evolve (see below) when you see it.
4. Reroll when all three cards are off-plan, instead of taking a move you won't level. With only one free reroll, save it for that moment.

### What each boost card does

These values come from the game's public [source code on GitHub](https://github.com/JPTER78/pokesurvivor) (`js/systems/levelup.js`), checked 2026-10-14. The developer updates the game often, so treat them as a snapshot.

| Card | Effect per pick | Max picks |
|---|---|---|
| Vigor | +20 max HP (and heals it) | No cap |
| Power | +10% damage with every move | 40 |
| Sprint | +7% movement speed | 8 |
| Reflexes | −8% cooldown on every move | 10 |
| Armor | +6% damage reduction (total capped at 70%) | 12 |
| Synthesis | +0.9 HP regenerated per second | No cap |
| Magnet | +30% XP pickup radius | 6 |
| Learning | +12% XP gained | 8 |
| Sitrus Berry | Restores 45% of your HP right now | No cap |

Effects multiply, so two Power picks give ×1.21 damage, not +20%. Several of these cards (Power, Vigor, Reflexes, Sprint, Armor, Synthesis, Magnet) also double as the requirement for evolving a move, which is a good reason to pick the one your main move needs.

## Minutes 2–5: build around one move

This stretch is where the run takes shape. Our approach (our advice, not an official rule):

- Keep feeding level-ups into your starting move, plus one second attack move.
- Start looking for the upgrade card your main move needs to evolve, so you have it ready at level 5.
- Map objects start to matter here: clear the enemies around a locked chest, then stand next to it to open it. Save healing springs for when you are actually low.
- If a Meowth runs past, chase it: it flees and escapes after 15 seconds, but drops 100 coins (details below).
- Watch for the first special enemies (healers, shielders, exploders, summoners) and switch targets when one shows up. Counters are below.

## Minutes 5–10: first evolution and first rift

- **Evolve your main move.** Once it is level 5 and you hold its upgrade card, a golden evolution card appears. Take it.
- **Expect a rift.** A Mysterious Rift opens at most 2.5 minutes apart, so you will likely see one before minute 10. If your build feels strong, step in; if you are struggling, it is fine to skip it for now.
- **Keep moving.** The horde grows, and standing still to finish a fight is how most early runs end. Players on the [itch.io community board](https://jpter78.itch.io/pokesurvivor/community) have said the difficulty ramps up fast and enemies get tanky early, so an evolved main move by this point matters.

What comes later: rifts and bosses fill the middle of a run, and at minute 30 Arceus starts an invincible chase (see the FAQ below).

## How move evolution works (level 5 + upgrade card)

Moves upgrade up to level 5. At max level, if you also have the upgrade card that move asks for (Power, Vigor, Reflexes, Sprint and so on), a golden evolution card appears. Of 64 moves, 59 can evolve; the five that don't are buff moves (Swords Dance, Agility, Harden, Aqua Ring, Dragon Dance). Examples from the [official moves list](https://pokesurvivor.com/en/moves/), checked 2026-10-14:

| Move | Evolves into | Card needed | Change at evolution |
|---|---|---|---|
| Ember | Fire Blast | Power | ×1.8 damage, +2 projectiles, +2 pierce, bigger |
| Water Gun | Scald | Power | ×1.8 damage, +2 projectiles, +2 pierce, bigger |
| Vine Whip | Power Whip | Power | ×1.9 damage, more range, hits in 360° |
| Bubble | Surf | Sprint | +6 projectiles, ×1.6 damage, +1 pierce |
| Razor Leaf | Leaf Storm | Reflexes | ×1.8 damage, +1 boomerang, more range |
| Confusion | Psyshock | Reflexes | ×1.8 damage, +2 projectiles, +2 pierce, bigger |
| Tackle | Take Down | Vigor | ×1.9 damage, more range, hits in 360° |

Check the moves list for your main move's card before the run, so you know what to look for. What each card does on its own is in the [boost card table](#what-each-boost-card-does) above.

<!-- IMAGE PLACEHOLDER 3: screenshot of the golden evolution card on the level-up screen.
     Suggested file: /images/how-to-play/golden-evolution-card.webp
     Suggested alt: "PokeSurvivor golden evolution card shown after a move reaches level 5" -->

## The four enemy personalities

Some enemies come with one of four personalities: healers, shielders, exploders and summoners. The official sources name them but don't describe each in detail, so the counters below are our own reading of the names, not confirmed mechanics.

- **Healers:** the developer's news notes they heal more the harder you hit, with a cap. Kill them first so the pack doesn't recover.
- **Shielders:** treat them as a priority target, or pull the rest of the pack away from them.
- **Exploders:** keep moving and let your auto-attack hit them before they reach you.
- **Summoners:** kill them early before extra enemies pile up.

Some enemies also fire beams that show a marker on the ground first. Step out of the marker.

<!-- IMAGE PLACEHOLDER 4: screenshot of a telegraphed beam marker on the ground.
     Suggested file: /images/how-to-play/ground-marker.webp
     Suggested alt: "PokeSurvivor enemy beam warning marker on the ground before the attack" -->

## Map objects and items

- **Power altars, healing springs and traps** are spread around the map. Use springs when you are low.
- **Locked chests** open when you stand next to them, so clear the area first.
- **Held items** such as Leftovers, Choice Band or Life Orb: you carry only one.
- **Meowth loaded with coins:** a Meowth that runs away from you. Per the game code, the first one shows up between minutes 2 and 4 and a second one 4–6 minutes later (at most two per run, never inside a rift). It deals no damage, zigzags away and escapes after 15 seconds. Defeat it in time and it drops 20 coins worth 5 each (100 coins). About 1 in 4 times a Gholdengo appears instead, dropping fewer coins plus a ×10 gacha ticket.

## Mid-run events

Every 4–5 minutes the game runs one of three events (never the same one twice in a row), according to the code in `js/systems/events.js`:

- **Horde:** a 30-second burst of enemies of one type. A good moment to switch to a move that is super-effective against it.
- **Golden hour:** for 30 seconds, enemies on screen turn golden and give double XP.
- **Lost Pokémon:** escort it to a marker within 2 minutes and keep enemies off it. You heal half your HP and get coins and a gacha ticket, and there's a 20% chance it joins your collection.

## Weather and the type chart

The official [type chart page](https://pokesurvivor.com/en/types/) gives the multipliers: super effective ×1.6, not very effective ×0.6, immune ×0.3. Against dual-type targets the two multiply, capped at ×2.4. The same numbers apply when enemies hit you.

Weather starts from minute 2 (roughly one in six minutes) and lasts about a minute. The boost values below come from the game code (`js/systems/weather.js`), checked 2026-10-14:

| Weather | Boosted | Weakened or other effect |
|---|---|---|
| Rain | Water ×1.5, Electric ×1.2 | Fire ×0.5 |
| Harsh sunlight | Fire ×1.5 | Water ×0.5 |
| Sandstorm | Rock, Ground, Steel ×1.3 | Other types slowly lose HP |
| Snowfall | Ice ×1.5 | Other types slowly lose HP and move up to 10% slower |
| Fog | Ghost, Fairy, Psychic ×1.3 | None |

Sand and snow chip damage never knocks you out by itself. Practical rule: when the weather favours one of your moves, make it the active one.

## Common beginner mistakes

1. **Standing still to collect XP.** Keep circling and grab gems on the next loop.
2. **Spreading levels across four moves.** Get one move to level 5 and evolve it first.
3. **Skipping the upgrade card your main move needs.** Without it, the golden evolution card never appears.
4. **Ignoring ground markers.** A marker means a beam is coming; step out.
5. **Leaving healers alive.** Hitting the pack harder just feeds their healing.
6. **Playing long sessions as a guest.** Guest progress lives only in your browser. Make an account for a cloud save.

## Your first rift

A Mysterious Rift opens on the map at most 2.5 minutes apart. Step in to fight a legendary in an arena of its type. Win for a ×10 gacha ticket and a bond that links moves to one slot; lose and you return to the map with no reward. Details are in the [rifts and legendaries guide](/rifts/).

<!-- IMAGE PLACEHOLDER 5: screenshot of a Mysterious Rift on the map.
     Suggested file: /images/how-to-play/mysterious-rift.webp
     Suggested alt: "PokeSurvivor Mysterious Rift portal opening on the map" -->

## Next steps

- Compare partners for later in a run in the [PokeSurvivor tier list](/tier-list/).
- Play with friends: the [co-op guide](/co-op/) covers multiplayer setup.
- On a phone: [PokeSurvivor on mobile](/mobile/).
