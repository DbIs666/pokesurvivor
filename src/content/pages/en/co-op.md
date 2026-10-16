---
title: "PokeSurvivor Co-op & Multiplayer: Play with up to 4 Friends"
description: "PokeSurvivor multiplayer explained: play online co-op with up to 4 friends. Add friends by nickname, join the host's room, share XP and revive teammates."
heading: "PokeSurvivor Co-op: How to Play Multiplayer with up to 4 Friends"
updated: 2026-10-14
faq:
  - q: "Is PokeSurvivor multiplayer?"
    a: "Yes. The online version has co-op multiplayer for up to 4 players. You add friends by nickname, the host invites them to a room, and XP is shared. The official pages only describe co-op; we found no PvP mode mentioned."
  - q: "How many players can play PokeSurvivor co-op?"
    a: "Up to 4 players in one room."
  - q: "Does co-op work in the offline download?"
    a: "No. The itch.io offline zip is single-player only. Co-op, cloud saves and leaderboards need the online version at pokesurvivor.com."
  - q: "Can PC and mobile players play together?"
    a: "Yes. PC and phone players use the same web version at pokesurvivor.com, so they can share a room. We've confirmed a PC browser and a phone browser playing together."
  - q: "Does co-op work inside the game embed on this site?"
    a: "Use a new tab instead. Browsers keep an embedded game's storage separate from the official site, so a login inside our embed doesn't carry over to pokesurvivor.com, and Google sign-in opens a popup that may be blocked. We haven't tested co-op in the embed, so open pokesurvivor.com/en/ in its own tab."
  - q: "Can I play PokeSurvivor with 2 players?"
    a: "Yes, and 2 is the minimum. The host's Start game button stays off until at least one friend is in the room (the game says 'You need at least one friend in the room'). Solo runs are the normal game, not a co-op room."
  - q: "Do I need an account to play with friends?"
    a: "Yes, in practice. Friends are added by nickname, so each player needs a logged-in account (name and password, or Google). Guests have no nickname for others to find."
  - q: "Is there PvP in PokeSurvivor?"
    a: "The official pages only describe co-op, where up to 4 players fight the horde together. Leaderboards exist, but we found no player-versus-player mode mentioned."
  - q: "What happens if the host switches tabs or leaves?"
    a: "If the host switches tabs, the run pauses for everyone until the host comes back. If the host leaves the run, it ends for everyone."
  - q: "Why can't my friend connect to the room?"
    a: "Co-op connects your browsers directly, with a backup relay server for networks that block that. If neither works, the room says a friend's network doesn't allow group play. Try another Wi-Fi or mobile data; the game retries on its own."
  - q: "Is there a PokeSurvivor app for co-op?"
    a: "There's no App Store or Google Play app as far as we know. The 'install as an app' option in the official guide is Add to Home Screen for pokesurvivor.com. It's the same online version, so it uses the same account, friends list and rooms."
---

Yes, PokeSurvivor is multiplayer: the online version has co-op for up to 4 players, built around your friends list. This page covers how to set it up, what changes when you play together and what to check if it doesn't work. Rules here come from the [official guide](https://pokesurvivor.com/en/guide/), the [developer's news page](https://pokesurvivor.com/en/news/) and the game's [public source code](https://github.com/JPTER78/pokesurvivor), checked on 2026-10-14. The game updates almost daily, so numbers can change.

## What you need to play co-op

- **The online version.** Play at [pokesurvivor.com/en/](https://pokesurvivor.com/en/). The offline zip on [itch.io](https://jpter78.itch.io/pokesurvivor) is single-player only, and so are its saves.
- **An account with a nickname.** Friends find you by nickname, so log in (name and password, or Google) rather than playing as a guest. An account also gives you a cloud save.
- **At least one friend.** A co-op room needs 2 to 4 players.
- **PC or phone, either works.** PC and phone players can share a room, since both use the same web version. On a phone, play in landscape.
- **Open the game in a new tab.** Browsers keep an embedded game's login separate from the official site, and Google sign-in uses a popup. Log in and play co-op at pokesurvivor.com in its own tab, not inside the embed on our home page.

## How to start a co-op run

<figure>
  <img src="/images/co-op/friends-list.webp" width="1200" height="617" loading="lazy" decoding="async"
    alt="PokeSurvivor Friends screen with your nickname, a friend's nickname box and the Add friend button">
  <figcaption>The Friends screen: give your nickname to friends, or type theirs and press Add friend.</figcaption>
</figure>

1. Every player opens the game at pokesurvivor.com and logs in. Pick a nickname (3 to 16 letters, numbers or _) if the game asks.
2. Open **Friends**, type your friend's exact nickname and press **Add friend**. They accept the request on their side.
3. The host presses **Invite** next to a friend in the Friends list. The first invite creates the room and opens it. The Invite button only shows for friends who are online and not already in a run. Only the host can invite, and an invite expires after 3 minutes.
4. Friends accept the invite. Once 2 to 4 players are in, the host presses **Start game** (it shows the count, such as 3/4) and everyone starts at the same time.

<figure>
  <img src="/images/co-op/room-invite.webp" width="1200" height="609" loading="lazy" decoding="async"
    alt="PokeSurvivor Room screen seen by a guest: the host with Scorbunny, the guest with Quaxly and two Free slots">
  <figcaption>A 2-player room from the guest's side. The host is marked Host, empty slots show Free, and the run starts when the host presses Start game.</figcaption>
</figure>

New to the game? Each player can learn the basics first in [How to Play PokeSurvivor](/how-to-play/), since controls and level-up cards work the same in co-op.

## Co-op rules: shared XP, revives and rifts

<figure>
  <img src="/images/co-op/2-player-run.webp" width="1200" height="630" loading="lazy" decoding="async"
    alt="Two players in a PokeSurvivor co-op run, Scorbunny firing Ember next to a teammate's Quaxly, with the teammate's health bar in the top left">
  <figcaption>A 2-player run: each player has their own partner, and your teammate's name and health bar show under yours in the top left.</figcaption>
</figure>

- **Shared XP.** XP is shared between teammates, so you don't all need to chase every gem.
- **Revive.** If a teammate falls, stand next to them to bring them back.
- **Rifts.** When the group enters a rift, everyone goes in together. See the [rifts and legendaries guide](/rifts/).
- **Host tab.** If the host switches browser tabs, the run pauses for everyone. The host should keep the game tab in front.
- **Host leaving.** If the host quits the run, it ends for everyone. If a guest leaves, the others keep playing.

### Enemies scale with your group

More players means more and tougher enemies. These multipliers come from the game's source code on 2026-10-14:

| Players | Enemy spawn rate | Enemy HP |
|---|---|---|
| 1 (solo) | ×1 | ×1 |
| 2 | ×1.75 | ×1.3 |
| 3 | ×2.5 | ×1.6 |
| 4 | ×3.25 | ×1.9 |

Bosses also get an extra ×1.4 HP in any group run. A full team faces more than three times as many enemies as a solo player, so spread out and keep everyone attacking.

## Co-op troubleshooting

These steps follow from the rules above; the developer hasn't published a troubleshooting list.

- **Can't find a friend:** check the nickname spelling, and make sure they are logged in. Guests have no account for you to add.
- **"There's no player with that nickname":** nicknames must match exactly. Ask your friend to copy theirs from the Friends screen.
- **"Can't connect to one of your friends: their network (or yours) doesn't allow group play. Try another Wi-Fi or mobile data; it retries automatically."** This is the full in-game message. Switch one of you to another Wi-Fi or to mobile data and wait; the game retries on its own.
- **"The invite has expired":** invites last 3 minutes. Ask the host to send a new one.
- **"That room's game has already started":** you can't join a run in progress. Wait for the next one.
- **"The room is full":** a room holds 4 players at most.
- **Login or invite fails on this site:** open [pokesurvivor.com/en/](https://pokesurvivor.com/en/) in its own tab and try again there. If Google sign-in does nothing, allow popups for the site.
- **No "Create account" option:** the game caps new accounts each month, and sign-up pauses until the next month once the cap is reached.
- **Run keeps pausing:** the host is probably switching tabs or apps. Keep the host's game in the foreground.
- **Friend is on the offline version:** the itch.io zip can't join rooms. Everyone needs the online game.
- **Playing on a phone:** use Safari or Chrome in landscape, not the browser inside Discord, WeChat or Instagram, which can block Google sign-in. Setup is in the [mobile guide](/mobile/).

## Online co-op vs offline: what changes

| | Online version (pokesurvivor.com) | Offline zip (itch.io) |
|---|---|---|
| Players | 2 to 4 in one room | 1 (solo only) |
| PC and phone together | Yes | No |
| Friends list and rooms | Yes | No |
| Shared XP and revives | Yes | No |
| Saves | Cloud save with an account | Browser only |
| Leaderboards | Yes | No |

## Is co-op multiplayer safe? Privacy note

Co-op connects your browsers directly, like a video call, so the game's privacy text notes that teammates may see each other's IP address. When a direct link isn't possible, the connection goes through a relay server. The in-game text names Firebase for this; since 2026-10-12 the source code uses a Cloudflare relay instead. Either way, play co-op with people you know.

## Best team setup for 4-player co-op

These are our suggestions from move descriptions and base stats, not tested team data. XP is shared, so the team can split jobs instead of everyone chasing gems.

| Role | What it does | Partner ideas | Why |
|---|---|---|---|
| Damage | Clears the horde at range | Mudkip, Sobble | Water Gun is "a piercing jet, reliable at any range", and these two have the highest attack multiplier among Water Gun users (1.08) |
| Crowd control | Covers a wide angle | Bulbasaur, Chikorita, Turtwig, Grookey | Vine Whip hits a wide arc at long range |
| Slow and support | Slows what gets close | Popplio | Bubble slows what it touches |
| Reviver | Reaches fallen teammates first | Froakie | Highest base speed among starters (108) |

- Mix attack shapes. A piercing jet and a wide arc cover different angles, so a mixed team leaves fewer gaps around the group.
- Spread out a little. One player can collect while others hold the horde.
- In rifts, spread out so one telegraphed attack can't catch the whole team. Rift arenas and which moves cover them are on the [rifts page](/rifts/).

For how partners compare in each phase, see the [PokeSurvivor tier list](/tier-list/). For a first partner, see the [best starter guide](/best-pokemon/).
