# PokeSurvivor: glosario y guía de estilo en español (ES)

Research date: 2026-10-16. Every Spanish term below was read from a source fetched that day. Items not confirmed are marked **UNVERIFIED** and collected in section 5. The game updates almost daily; re-check UI labels before each publish.

Sources (short keys):
- [ES-HOME] https://pokesurvivor.com/ (official site, Spanish, x-default; title screen, menus, settings, privacy text in the HTML)
- [ES-GUIA] https://pokesurvivor.com/guia/
- [ES-MOV] https://pokesurvivor.com/movimientos/ (all 64 moves, class, evolution, card)
- [ES-LEG] https://pokesurvivor.com/legendarios/ (18 arenas, 87 legendaries with Spanish types)
- [ES-TIPOS] https://pokesurvivor.com/tipos/ (type chart, weather)
- [ES-OBJ] https://pokesurvivor.com/objetos/ (11 held items)
- [ES-NOV] https://pokesurvivor.com/novedades/ (news)
- [ES-SHINY] https://pokesurvivor.com/shinies/
- [ES-DEX] https://pokesurvivor.com/pokedex/ (966 Pokémon, Spanish names, regions, types)
- [CLIENT] https://pokesurvivor.com/js/app.min.js (ES→EN string table; ES is the source language of the game, EN is the translation)
- [README] https://raw.githubusercontent.com/JPTER78/pokesurvivor/main/README.md (Spanish README)
- [WD] WikiDex, https://www.wikidex.net/wiki/<Página> (gives Spain and Hispanoamérica names)
- [PKMN-ES] https://www.pokemon.com/es/pokedex/ (official Pokémon site, Spanish)
- [SUGG] Google Suggest, `suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=es|mx|ar|co`, run 2026-10-16

## 0. Key decisions (read first)

1. **The game uses Spain's official Pokémon localization.** Moves, items, types and regions in the game are the Spain names (Pistola Agua, Ascuas, Hoja Afilada, Placaje, Lucha, Teselia, Baya Zidra, Vidasfera). Latin America's official names differ for many of these (Chorro de Agua, Brasas, Hojas Navaja, Tacleada, Pelea, Unova, Baya Citrón, Vidaesfera) [WD]. **Rule: write the game's label.** Players see it on screen. Where the LatAm name differs, add it once per page in parentheses on first mention, e.g. «Pistola Agua (Chorro de Agua en Hispanoamérica)», because LatAm players may search with it. Never use the LatAm name alone.
2. **"Shiny" stays "shiny".** The game says shiny / shinies everywhere [ES-SHINY], [ES-HOME]. The official Pokémon names are «variocolor» (Spain) and «brillante» (LatAm) [WD]; do not use them in UI references. Plural: «shinies» (as the game does).
3. **"Tier list" stays in English.** Spanish Google suggestions use it as-is: «tier list pokemon survivor», «tier list pokemon legendarios», «pokémon survivor tier list» [SUGG]. Gloss it once: «tier list (clasificación por niveles)». Tiers stay S/A/B/C.
4. **"Run" is a game word.** The game uses «run» in Spanish («Abandonar run», «Haz más fuerte cada run», «Run terminada») alongside «partida» [CLIENT], [ES-HOME]. Use «partida» in prose; use «run» when quoting UI or where it reads naturally («cada run»). Plural «runs».
5. **Species names = English names**, with 14 exceptions in this game (section 3.6). Checked by diffing all 966 [ES-DEX] names against our src/data/dex.json.
6. **Brand:** the game writes **«PokéSurvivor»** (with é) in all Spanish titles and copy [ES-HOME], [ES-GUIA]. Our site brand is «PokeSurvivor» (EN pages, schema, domain-style). Recommendation: keep «PokeSurvivor» in our titles/H1 for consistency with the EN site and the exact-match query «pokesurvivor»; mention «PokéSurvivor» once in the home intro and in FAQ answers that quote the official site. Users type both: «pokesurvivor», «poké survivor tier list», «poké survivor mejor pokemon» [SUGG]. Google treats é/e as near-equivalent, so no stuffing needed.

## 1. Style guide

**Variety and register**
- Neutral international Spanish, **tú** form. Casual gaming register, close to how the game itself talks («Tu Pokémon ataca solo», «No te quedes quieto») [ES-GUIA].
- **No vosotros in our prose.** The game uses it («empezad la partida», «entráis todos juntos», «La grieta os ha expulsado…») [ES-GUIA], [ES-LEG], [CLIENT]. Don't use vosotros or ustedes in our own sentences. Reword with a group subject instead: «todo el grupo entra a la vez», «el equipo empieza la partida». Quote UI strings verbatim only when a player needs to recognise them.
- Avoid strong regionalisms: coger (use «conseguir», «recoger», «tomar»), ordenador / computadora (use «PC»), vale, guay, chévere, padre, pibe, celular-only or móvil-only phrasing (see keywords, section 4). Use «elegir», «conseguir», «pulsar» (keys) / «tocar» (touch screen), following the game [ES-HOME].
- Plain Spanish for meta words: «partida» (run, in prose), «oleada»/«horda» (wave/horde; the game says «hordas»), «esquivar», «subir de nivel». Keep the English word only where the game or the community does: shiny, tier list, gacha, run, ranking, build (the last one appears in Spanish searches, e.g. «poké survivor builds» [SUGG]; use sparingly).
- Game phases: «fase inicial (0–10 min)», «fase media (10–30 min)», «fase final (30+ min)». Don't use «early/mid/late game» in headings (**UNVERIFIED** whether the Spanish community prefers the English terms).

**Orthography and punctuation**
- Always use opening ¿ and ¡.
- Quotes: «comillas angulares» for quoted text and UI labels in prose, e.g. pulsa «Elegir otro». This matches the game («Añadir a pantalla de inicio» [ES-GUIA]) and the RAE's first preference. Use “” only inside «», and straight "" only in code/front matter.
- «solo» without an accent (RAE since 2010). The game writes «sólo»; keep that only inside verbatim quotes.
- Capitalisation: Spanish sentence case in titles and headings («Cómo jugar a PokeSurvivor», not «Cómo Jugar A»). Proper nouns from the game keep their capitals: move names (Pistola Agua), arenas (Volcán Ígneo), items (Cinta Elección), card names (Potencia). Types are capitalised like the game does in tables («tipo Agua», «el Fuego se debilita») [ES-TIPOS], [ES-GUIA].
- «Pokémon» keeps the é and doesn't change in the plural («los Pokémon»).

**Numbers, units, dates**
- Decimal comma, as the game does: «×1,8 daño», «cada 2,5 minutos», «×0,6» [ES-MOV], [ES-TIPOS], [ES-NOV]. Never ×1.8 in ES copy. Attack multipliers in our tables: 1,08, 1,09.
- Multiplier sign: «×10», «×1,6» (no space), as in the game.
- Percent: «45%» without a space, matching the game's UI («+10% de daño») [CLIENT]. (RAE prefers «45 %»; we follow the game for consistency with quoted labels.)
- Thousands: no separator for 4-digit numbers («1 entre 4096», as the game does [ES-SHINY]). For 5+ digits use a space («10 000»). Never use a comma for thousands.
- Ranges: en dash with no spaces, «0–10 min», «1–4».
- Dates in prose: «14 de octubre de 2026». The «Última actualización» field and changelogs may keep ISO «2026-10-14» (the game's news page uses ISO [ES-NOV]).
- Time: «minuto 30», «45 segundos» (or «45 s» in tables), «120 s».

**Brand and names**
- «PokeSurvivor» in our titles, H1 and meta. «PokéSurvivor» is the official spelling in the game's Spanish copy; mention it once on the home page («PokeSurvivor (PokéSurvivor en la web oficial)»). Also accept «Poke Survivor» once per page where it reads naturally (searched as such [SUGG]).
- Developer: «jpter78». Official site: «pokesurvivor.com» (link to https://pokesurvivor.com/, the Spanish version, from ES pages, not /en/).
- Iframe on ES pages: `https://pokesurvivor.com/` (Spanish version). Button: «Abrir el juego en otra pestaña».

**SEO length limits**
- `title` ≤ 60 characters, `description` ≤ 155 characters, counted with accents as 1 character. The proposals in section 4 were counted with a script (len() in Python).
- Put the main keyword at the start of the title; the brand «PokeSurvivor» goes in every title.

## 2. Glossary: game systems and UI

"Spanish to use" is the label the game shows (verbatim, keep capitals and punctuation when quoting). Quoted UI strings are from the ES→EN string table in [CLIENT] unless another source is given.

### 2.1 Core concepts

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| PokeSurvivor | PokeSurvivor (official: PokéSurvivor) | [ES-HOME] | See section 0.6 |
| partner (Pokémon) | compañero | [ES-HOME] «Tu compañero:», «Elige a tu compañero» | Not «pareja» or «socio» |
| starter / starters | inicial / los iniciales | [ES-HOME] «Los iniciales de todas las regiones, y dos amigos más.»; [ES-DEX] tag «Inicial» | Official Pokémon term too [WD Pokémon_inicial] |
| legendary / legendaries | legendario / legendarios | [ES-LEG] | Official term [WD Pokémon_legendario]. Tag in dex: «Legendario» |
| shiny / shinies | shiny / shinies | [ES-SHINY], [ES-HOME] «Pokémon y shinies» | Official: variocolor (ES), brillante (LatAm) [WD Shiny]. Don't use these |
| run | partida (prose); run (UI: «Abandonar run», «Run terminada») | [CLIENT], [ES-HOME] | Section 0.4 |
| survivors-like | juego de supervivencia con Pokémon / al estilo de Survivor.io o Vampire Survivors | [ES-GUIA] | Avoid «bullet heaven» in ES copy |
| horde / hordes | horda / hordas | [ES-HOME] «Sobrevive a las hordas…» | |
| boss / bosses | jefe / jefes | [CLIENT] «Jefes», «Derrota a un jefe» | |
| enraged (at half health) | se enfurece (a media vida) | [ES-NOV] 2026-10-10 «se enfurecen a media vida»; [CLIENT] «¡{x} se ha enfurecido!» | |
| telegraphed attacks | ataques avisados | [ES-NOV] «4 ataques avisados» | Ground markers: «avisos en el suelo» [ES-GUIA] |
| move / moves | movimiento / movimientos; ataque (casual) | [ES-MOV], [ES-HOME] «toca un ataque para cambiarlo» | Game uses both |
| active move | el movimiento activo | [ES-GUIA] | |
| switch move | cambiar de ataque | [ES-GUIA] | |
| level up | subir de nivel; «¡Nivel N!» | [ES-GUIA], [ES-HOME] | |
| level-up cards | cartas (al subir de nivel); «Elige una recompensa» | [ES-GUIA] «elige entre tres cartas»; [ES-HOME] | |
| reroll (button, key R) | «Cambiar opciones (1) · R» | [ES-HOME] | Permanent upgrade name: «Cambio de cartas» («+1 cambio de cartas de nivel por run») [CLIENT] |
| ban a move (upgrade) | «Bloquea 1 movimiento: no te sale en las cartas» | [CLIENT] | |
| upgrade card (required to evolve) | carta de mejora | [ES-MOV] «consigue la carta de mejora que indican» | |
| golden evolution card | carta dorada de evolución | [ES-MOV] | |
| move evolution / evolves into | evolución / «Evoluciona a» | [ES-MOV] column header | |
| max level (5) | nivel máximo (nivel 5) | [ES-MOV], [ES-GUIA] | |
| projectile(s), pierce, range, boomerang | proyectil(es), perforación, alcance, bumerán | [ES-MOV] «+2 proyectiles, +2 perforación», «+1 bumerán y más alcance» | |
| hits in 360° | golpea en 360° | [ES-MOV] | |
| damage | daño («×1,8 daño») | [ES-MOV] | Decimal comma |
| bond / bonds | vínculo / vínculos; «¡Vínculo!» | [ES-HOME], [ES-NOV] 2026-10-11 | «une dos movimientos para que se lancen a la vez y ocupen un solo hueco» |
| slot (move slot) | hueco | [ES-HOME] «ocupan un solo hueco» | |
| held item(s) | objeto(s) equipable(s); «¡Un objeto! Sólo puedes llevar uno» | [ES-OBJ], [ES-HOME] | |
| XP | experiencia | [ES-GUIA] «Recoge la experiencia» | XP gems: no Spanish label; write «experiencia», not «gemas», see section 5 |
| coins / PokéCoins | monedas / Pokémonedas | [CLIENT] «Pokémonedas ganadas», [ES-SHINY] | |
| permanent upgrades (per Pokémon) | mejoras (permanentes), «Mejoras» menu | [ES-GUIA], [ES-HOME] «Cada Pokémon tiene sus propias mejoras…» | |
| gacha / pull ×1 / ×10 | el gacha / «Tirar ×1», «Tirar ×10»; tirada(s) | [ES-HOME], [ES-SHINY] | Masculine: «el gacha». Slot-machine look: «tragaperras» [ES-GUIA] |
| ticket / ×10 ticket | ticket / ticket ×10 («¡Ticket ×10!») | [ES-LEG], [CLIENT] | |
| type chart | tabla de tipos | [ES-TIPOS] | |
| super effective / not very effective / immune | muy eficaz / poco eficaz / inmunidad | [ES-TIPOS] | Multipliers ×1,6 / ×0,6 / ×0,3, cap ×2,4 |
| weather | clima | [ES-TIPOS] «El clima también cuenta» | |
| terrain | terreno | [ES-LEG] | |
| collection | colección («Tu colección») | [ES-HOME] | |
| National Dex number | número de la Pokédex nacional; «#025» | [ES-DEX] | «la Pokédex» (feminine, as most Spanish sites use; WD allows both) |
| generation | generación («generación 1») | [ES-DEX] | |
| region | región; «9 regiones» | [ES-DEX], [ES-HOME] | |

### 2.2 Menus, screens and buttons

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Tap to start (title) | «Pulsa para empezar» | [ES-HOME] | |
| Play / main menu items | «Jugar», «Pokémon» (Tu colección), «Mejoras», «Gacha», «Misiones», «Amigos», «Ranking», «Ajustes», «Salir» | [ES-HOME] | Subtitle under the logo: «Mundo Misterioso» |
| Log in / Create account / Sign in with Google / Play as guest | «Entrar» / «Crear cuenta» / «Entrar con Google» / «Jugar como invitado» | [ES-HOME] | Guest: «invitado»; «Modo invitado: no se guarda» [CLIENT] |
| cloud save | la partida se guarda en la nube | [ES-GUIA], [CLIENT] | |
| Your personality is… | «Tu personalidad es…» | [ES-HOME] | Quiz: «un breve cuestionario» in our prose (the game shows no noun), see section 5 |
| Let's go together! / Choose another | «¡Vamos juntos!» / «Elegir otro» | [ES-HOME] | |
| Choose your partner (picker) | «Elige a tu compañero» | [ES-HOME] | Buttons «Volver», «Elegir» |
| Choose as partner (collection) | «Elegir de compañero» | [CLIENT] | |
| Pause / Continue / Quit run | «Pausa» / «Continuar» / «Abandonar run» | [ES-HOME], [CLIENT] | |
| You fell… / Back to menu | «Has caído…» / «Volver al menú» | [ES-HOME] | |
| Settings tabs | «Sonido», «Gráficos», «Controles», «Cuenta», «Acerca de» | [ES-HOME] | |
| graphics quality (High/Medium/Low) | «Calidad» («Alta», «Media», «Baja»); automatic mode: «calidad gráfica (con modo automático)» | [CLIENT], [README] | The exact label of the automatic option was not found, see section 5 |
| damage numbers | «Números de daño» | [CLIENT] | |
| reduced screen shake | «Menos sacudidas y destellos» | [CLIENT] | |
| FPS counter | «Mostrar FPS» | [CLIENT] | |
| Fullscreen | «Pantalla completa» | [CLIENT] | Also our UI button |
| Language | «Idioma» | [CLIENT] | |
| Place the buttons (mobile) | «Colocar los botones» (Ajustes > Controles) | [ES-NOV] 2026-10-14 | Fixed joystick: «joystick fijo» |
| Missions (daily / weekly) | «Misiones» («Diarias», «Semanales») | [ES-HOME], [CLIENT] | |
| Achievements / medals / titles / profile | «Logros» / «Medallas» / «Título» / «Perfil» | [CLIENT], [ES-NOV] | «127 logros con medallas y títulos» |
| Leaderboard | «Ranking» | [ES-HOME] | Keep «ranking»; not «clasificación» |
| News | «Novedades» | [ES-HOME] | |
| Legal notice & privacy | «Aviso legal y privacidad» | [ES-HOME] | |
| Rotate your phone | «Gira el móvil» · «PokéSurvivor se juega en horizontal.» | [ES-HOME] | |
| mobile controls hint | «Arrastra el dedo para moverte · toca un ataque para cambiarlo» | [ES-HOME] | |
| PC controls hint | «WASD moverse · 1–4 movimiento · Q/E ciclar · Esc pausa» | [ES-HOME] | |
| landscape / portrait | horizontal / vertical | [ES-GUIA] «en horizontal» | |
| Add to Home Screen / installable as an app | «Añadir a pantalla de inicio» / «instalable como app» | [ES-GUIA] | Exact iOS/Android menu labels: section 5 |

### 2.3 Co-op

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| co-op / online co-op | cooperativo / «cooperativo online hasta 4» | [ES-GUIA], [ES-NOV] | Also «partida en grupo» [ES-HOME]. «Multijugador» appears only once in game text, in a server list («Servidores (partidas, cuentas, ranking y multijugador)») [CLIENT]; use it in SEO copy too (section 4) |
| Friends / Add friend | «Amigos» / «Añadir amigo» | [ES-HOME] | |
| nickname | «apodo» («Elige tu apodo», «Guardar apodo», «Apodo de tu amigo») | [ES-HOME], [CLIENT] | Rule: «3-16 letras, números o _» |
| Invite / Invite friends | «Invitar» / «Invitar amigos» | [CLIENT], [ES-HOME] | |
| Room / Host / Free (slot) / You | «Sala» / «Anfitrión» / «Libre» / «Tú» | [CLIENT] | |
| Start game (3/4) | «Empezar partida» / «Empezar partida (3/4)» | [ES-HOME], [CLIENT] | |
| Leave the room | «Salir de la sala» | [ES-HOME] | |
| You need at least one friend in the room | «Necesitas al menos un amigo en la sala.» | [CLIENT] | |
| The invite has expired | «La invitación ha caducado.» | [CLIENT] | |
| The room is full | «La sala está llena.» | [CLIENT] | |
| That room's game has already started | «La partida de esa sala ya ha empezado.» | [CLIENT] | |
| There's no player with that nickname | «No hay ningún jugador con ese apodo.» | [CLIENT] | |
| Paused: waiting for X (host) | «Pausa: esperando a {x} (anfitrión)…» | [CLIENT] | |
| revive a teammate | revivir / levantar a un compañero caído | [ES-GUIA] «revivir a un compañero caído»; [CLIENT] «Has caído: un compañero puede levantarte» | «compañero» also means teammate here; write «compañero de equipo» when it could be confused with the partner Pokémon |
| shared XP | la experiencia se comparte | [ES-GUIA] | |
| "Can't connect to one of your friends" | no Spanish string found | | Section 5 |

### 2.4 Level-up boost cards

All titles from the card table in [CLIENT] (`'title':'Potencia'`, etc.) and its ES→EN map. Several also appear in [ES-MOV] as evolution requirements («con Potencia», «con Carrera»…).

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Vigor | Vigor | [CLIENT], [ES-MOV] | |
| Power | Potencia | [CLIENT] «+10% de daño con todos los movimientos.», [ES-MOV] | |
| Sprint | Carrera | [CLIENT] «+7% de velocidad de movimiento.», [ES-MOV] | |
| Reflexes | Reflejos | [CLIENT], [ES-MOV] | |
| Armor | Coraza | [CLIENT] «+6% de reducción de daño recibido.», [ES-MOV] | |
| Synthesis | Síntesis | [CLIENT], [ES-MOV] | |
| Magnet | Imán | [CLIENT], [ES-MOV] | |
| Learning | Aprendizaje | [CLIENT] «+12% de experiencia ganada.» | |
| Sitrus Berry | Baya Zidra | [CLIENT] | LatAm official: Baya Citrón [WD Baya_Zidra] |

### 2.5 Map, enemies and in-run events

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Shady Forest (starting map) | Bosque Umbrío | [CLIENT] map list (`'name':'Bosque Umbrío'`) | **Use «Shady Forest»** (fallback rule): the ES↔EN match is our inference, see section 5. Other maps: Cueva Cristal (Crystal Cave), Volcán Ceniza (Ash Volcano) |
| power altars | altares de poder | [README] | |
| healing springs | manantiales (que curan) | [README]; [CLIENT] «El manantial se ha secado (se recarga solo)» | |
| locked chests | cofres con candado | [README]; [CLIENT] «Abre un cofre con candado» | |
| traps | trampas | [README] | |
| enemy personalities | enemigos con personalidad | [ES-GUIA] | |
| healers | curanderos | [ES-NOV] 2026-10-12 «Los curanderos curan según lo fuerte que pegas, con tope» | Only noun the game uses |
| shielders | los que ponen escudos (game verb: «ponen escudos», «protegen») | [ES-GUIA], [ES-NOV] 2026-10-08 | No noun in the game. **Use *shielders*** (fallback rule), see section 5 |
| summoners | los que invocan ayuda («invocan», «llaman a su manada») | [ES-GUIA], [README] | No noun. **Use *summoners*** (fallback rule) |
| exploders | los que explotan | [ES-GUIA] | No noun. **Use *exploders*** (fallback rule) |
| beams with ground markers | «disparan rayos avisando en el suelo» | [ES-GUIA] | |
| Meowth loaded with coins | Meowth cargado de monedas; «¡Un {x} cargado de monedas! ¡Atrápalo antes de que huya!» | [ES-NOV] 2026-10-10, [CLIENT] | Gholdengo version: «¡Un {x} con un ticket ×10!» |
| mid-run events | eventos a mitad de partida | [ES-NOV] 2026-10-10 | |
| Horde (single type) | «¡Horda de tipo {x}!» / hordas de un tipo | [CLIENT], [ES-NOV] | |
| Golden hour | «¡Hora dorada! Doble de experiencia» / hora dorada | [CLIENT], [ES-NOV] | |
| Lost Pokémon | Pokémon perdidos; «¡Un {x} se ha perdido! Búscalo y llévalo a la marca» | [ES-NOV], [CLIENT] | marker = «marca» («marca verde») |
| Pokémon swarm | «¡Marea de Pokémon!» | [CLIENT] | |
| Judgment of Arceus (minute 30) | la Sentencia de Arceus | [ES-NOV] 2026-10-13, [CLIENT] «Llega a la Sentencia de Arceus (minuto 30).» | Run from Arceus: «¡Huye de Arceus! Es invencible» |
| Ruins of Judgment | Ruinas del Juicio | [ES-NOV] 2026-10-13, [CLIENT] | |

### 2.6 Rifts, arenas, terrain and weather

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Mysterious Rift(s) | grieta misteriosa / grietas | [ES-LEG], [ES-GUIA] | Not «brecha» or «portal» (the guide calls them «portales misteriosos» as a description only) |
| "A mysterious rift has opened!" | «¡Se ha abierto una grieta misteriosa!» | [CLIENT] | |
| purple arrow | «Sigue la flecha morada: dentro te espera un legendario» | [CLIENT] | |
| "The rift threw you out…" | «La grieta os ha expulsado…» | [CLIENT] | Vosotros, quote only |
| Time has run out | «El tiempo se ha agotado…» | [CLIENT] | |
| rift battle | pelea en una grieta | [CLIENT] «Gana una pelea en una grieta» | |
| Rift traveler (achievement) | Viajero de grietas | [CLIENT] «Gana en las 18 arenas (una por tipo).» | Also «Saltagrietas» (Rift jumper), «Cazalegendarios» (Legend hunter) |
| 18 arenas, one per type | 18 arenas, una por tipo | [ES-LEG] | |
| Eternal Meadow (Normal) | Pradera Eterna | [ES-LEG] | |
| Igneous Volcano (Fire) | Volcán Ígneo | [ES-LEG] | |
| Sea Grotto (Water) | Gruta Marina | [ES-LEG] | |
| Emerald Jungle (Grass) | Selva Esmeralda | [ES-LEG] | |
| Volt Plant (Electric) | Central Voltio | [ES-LEG] | |
| Eternal Glacier (Ice) | Glaciar Eterno | [ES-LEG] | |
| Ancient Dojo (Fighting) | Dojo Ancestral | [ES-LEG] | |
| Toxic Swamp (Poison) | Ciénaga Tóxica | [ES-LEG] | |
| Red Desert (Ground) | Desierto Rojo | [ES-LEG] | |
| Sky Peak (Flying) | Pico Celeste | [ES-LEG] | |
| Mind Temple (Psychic) | Templo Mental | [ES-LEG] | |
| Hive Forest (Bug) | Bosque Colmena | [ES-LEG] | |
| Ancient Quarry (Rock) | Cantera Antigua | [ES-LEG] | |
| Gloomy Graveyard (Ghost) | Cementerio Sombrío | [ES-LEG] | |
| Dragon Sanctuary (Dragon) | Santuario Dragón | [ES-LEG] | |
| Dark Alley (Dark) | Callejón Oscuro | [ES-LEG] | |
| Steel Fortress (Steel) | Fortaleza de Acero | [ES-LEG] | |
| Enchanted Forest (Fairy) | Bosque Encantado | [ES-LEG] | |
| terrain: lava / ice / water | lava (que quema) / hielo (que resbala) / agua (que frena) | [ES-LEG], [README] | |
| terrain: Poison | Poison (gloss: charcos de veneno) | [EN rifts.md] | No Spanish label; English name per fallback rule, section 5 |
| terrain: Sparks / Swamp / Pillars | Sparks / Swamp / Pillars (gloss: chispas / pantano / pilares) | [EN rifts.md] | No Spanish labels; English names per fallback rule, section 5 |
| Rain | Lluvia | [ES-TIPOS] | Official Pokémon term [WD Lluvia] |
| Harsh sunlight / Sun | Sol abrasador (short: sol) | [ES-TIPOS], [ES-GUIA] «sol» | Use «Sol abrasador» in tables |
| Sandstorm / Sand | Tormenta de arena (short: arena) | [ES-TIPOS], [ES-GUIA] | |
| Snowfall / Snow | Nevada (short: nieve) | [ES-TIPOS], [ES-GUIA] | Mainline games say «nieve» [WD Nieve]; game label wins |
| Fog | Niebla | [ES-TIPOS] | |

## 3. Glossary: Pokémon terminology

### 3.1 The 18 types

Game labels from [ES-LEG], [ES-TIPOS], [ES-DEX]. Official names from [WD Tipo] (https://www.wikidex.net/wiki/Tipo), which lists one name for each type except Fighting («Pelea / Lucha»). Pokemon.com/es also shows «Agua», «Planta», «Eléctrico» for Sobble and «Normal», «Lucha» for Código Cero [PKMN-ES].

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Normal | Normal | [ES-LEG], [WD] | |
| Fire | Fuego | [ES-LEG], [WD] | |
| Water | Agua | [ES-LEG], [WD], [PKMN-ES] | |
| Grass | Planta | [ES-LEG], [WD], [PKMN-ES] | Not «Hierba» |
| Electric | Eléctrico | [ES-LEG], [WD], [PKMN-ES] | |
| Ice | Hielo | [ES-LEG], [WD] | |
| Fighting | Lucha | [ES-LEG], [WD], [PKMN-ES] | LatAm official: Pelea [WD]. Gloss once: «Lucha (Pelea en Hispanoamérica)» |
| Poison | Veneno | [ES-LEG], [WD] | |
| Ground | Tierra | [ES-LEG], [WD] | |
| Flying | Volador | [ES-LEG], [WD] | |
| Psychic | Psíquico | [ES-LEG], [WD] | |
| Bug | Bicho | [ES-LEG], [WD] | |
| Rock | Roca | [ES-LEG], [WD] | |
| Ghost | Fantasma | [ES-LEG], [WD] | |
| Dragon | Dragón | [ES-LEG], [WD] | |
| Dark | Siniestro | [ES-LEG], [WD] | Not «Oscuro» |
| Steel | Acero | [ES-LEG], [WD] | |
| Fairy | Hada | [ES-LEG], [WD] | |

Grammar: «tipo Agua», «un Pokémon de tipo Fuego», «movimientos de tipo Planta». Dual type: «Planta/Veneno» (slash, no spaces, as [ES-DEX] tables imply). Filter label «Todos los tipos» (our UI; the game has no such string found).

### 3.2 The 9 regions

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Kanto | Kanto | [ES-DEX], [WD Kanto] | |
| Johto | Johto | [ES-DEX], [WD Johto] | |
| Hoenn | Hoenn | [ES-DEX], [WD Hoenn] | |
| Sinnoh | Sinnoh | [ES-DEX], [WD Sinnoh] | |
| Unova | Teselia | [ES-DEX], [CLIENT] «Teselia => Unova» | LatAm official: Unova [WD Teselia]. Gloss: «Teselia (Unova)» on first mention per page |
| Kalos | Kalos | [ES-DEX], [WD Kalos] | |
| Alola | Alola | [ES-DEX], [WD Alola] | |
| Galar | Galar | [ES-DEX], [WD Galar] | |
| Paldea | Paldea | [ES-DEX], [WD Paldea] | |

«de Kanto a Paldea», «las 9 regiones» [ES-GUIA].

### 3.3 Other Pokémon terms

| English | Spanish to use | Source | Notes |
|---|---|---|---|
| Pokémon (sing./pl.) | Pokémon | [ES-HOME] | Invariable |
| Pokédex | la Pokédex | [ES-DEX], [WD Pokédex] | |
| starter | inicial | [ES-HOME], [WD Pokémon_inicial] | «Pokémon inicial», «los iniciales». Avoid «starter» in ES copy |
| legendary | legendario | [ES-LEG], [WD Pokémon_legendario] | |
| shiny | shiny | section 0.2 | |
| wild Pokémon | Pokémon salvajes | [ES-GUIA], [ES-SHINY] | |
| HP | vida (game prose); PS (official stat) | [ES-OBJ] «1,5% de tu vida», [WD Restos] «PS» | Use «vida» in prose, «PS» only in stat tables (header «PS») |
| Speed / Attack (base stats) | Velocidad / Ataque | [CLIENT] «Velocidad», «Ataque» | Our «atk multiplier» = «multiplicador de ataque» |
| tier list | tier list | section 0.3, [SUGG] | |

### 3.4 Moves used in our content and src/data/tiers.ts

Game label from [ES-MOV] (table row + «Evoluciona a» column) and the ES→EN move map in [CLIENT]. Official names from WikiDex pages fetched 2026-10-16 (`https://www.wikidex.net/wiki/<name>`); each page opens with the Spain and Hispanoamérica names.

| English | Spanish to use (game = Spain official) | LatAm official | Source | Notes |
|---|---|---|---|---|
| Water Gun | Pistola Agua | Chorro de Agua | [ES-MOV], [WD Pistola_Agua] | Starting move. Description: «Chorro perforante. Fiable a cualquier distancia.» |
| Scald | Escaldar | Escaldar | [ES-MOV], [WD Escaldar] | Water Gun + Potencia |
| Ember | Ascuas | Brasas | [ES-MOV], [WD Ascuas] | «Bola de fuego al enemigo más cercano.» |
| Fire Blast | Llamarada | Llamarada | [ES-MOV], [WD Llamarada] | Ember + Potencia. Also named in [ES-GUIA] |
| Vine Whip | Látigo Cepa | Látigo Cepa | [ES-MOV], [WD Látigo_Cepa] | «Látigos de largo alcance en arco amplio.» |
| Power Whip | Latigazo | Latigazo | [ES-MOV], [WD Latigazo] | Vine Whip + Potencia |
| Bubble | Burbuja | Burbuja | [ES-MOV], [WD Burbuja] | «Burbujas en abanico que ralentizan a quien tocan.» |
| Surf | Surf | Surf | [ES-MOV], [WD Surf] | Bubble + Carrera |
| Razor Leaf | Hoja Afilada | Hojas Navaja | [ES-MOV], [WD Hoja_Afilada] | «Dos hojas que van y vuelven cortando a la ida y a la vuelta.» |
| Leaf Storm | Lluevehojas | Tormenta de Hojas | [ES-MOV], [WD Lluevehojas] | Razor Leaf + Reflejos |
| Confusion | Confusión | Confusión | [ES-MOV], [WD Confusión] | «Onda que persigue sola a su objetivo.» |
| Psyshock | Psicocarga | Choque Psíquico | [ES-MOV], [WD Psicocarga] | Confusion + Reflejos |
| Tackle | Placaje | Tacleada | [ES-MOV], [WD Placaje] | |
| Take Down | Derribo | Derribo | [ES-MOV], [WD Derribo] | Tackle + Vigor |
| Swords Dance | Danza Espada | Danza de Espadas | [ES-MOV], [WD Danza_Espada] | Buff move, doesn't evolve |
| Agility | Agilidad | Agilidad | [ES-MOV], [WD Agilidad] | Buff |
| Harden | Fortaleza | Fortaleza | [ES-MOV], [WD Fortaleza] | Buff. Don't confuse with the arena «Fortaleza de Acero» |
| Aqua Ring | Acua Aro | Acuaanillo | [ES-MOV], [WD Acua_Aro] | Buff |
| Dragon Dance | Danza Dragón | Danza de Dragón | [ES-MOV], [WD Danza_Dragón] | Buff |
| Hyper Voice | Vozarrón | Hipervoz | [ES-MOV], [WD Vozarrón] | In the home-page screenshot alt text |

Move classes (column «Clase» in [ES-MOV]): Proyectil, Cuerpo a cuerpo, Ráfaga, Abanico, Bumerán, Órbita, Aura, Rayo, Cadena, Meteoros, Minas, Torreta, Embestida, Rastro, Mejora (buff). Use these when describing attack shapes.

Move counts: «64 movimientos», «59 pueden evolucionar» [ES-MOV].

### 3.5 Held items

| English | Spanish to use | LatAm official | Source | Notes |
|---|---|---|---|---|
| Leftovers | Restos | Restos | [ES-OBJ], [WD Restos] | |
| Choice Band | Cinta Elección | Cinta Elección | [ES-OBJ], [WD Cinta_Elección] | |
| Life Orb | Vidasfera | Vidaesfera | [ES-OBJ], [WD Vidasfera] | |

The game has 11 items [ES-OBJ]; only these three appear in our EN content.

### 3.6 Species names

Pokémon species names in Spanish are the English names, with very few exceptions. Check done: all 966 names on [ES-DEX] compared with `name` in src/data/dex.json (script, 2026-10-16). 952 match exactly. The 14 that differ, all of them official Spanish names:

| # | English | Spanish to use | Source |
|---|---|---|---|
| 772 | Type: Null | Código Cero | [ES-DEX], [WD Código_Cero], [PKMN-ES] https://www.pokemon.com/es/pokedex/codigo-cero |
| 984 | Great Tusk | Colmilargo | [ES-DEX], [WD Colmilargo] |
| 985 | Scream Tail | Colagrito | [ES-DEX] |
| 987 | Flutter Mane | Melenaleteo | [ES-DEX] |
| 988 | Slither Wing | Reptalada | [ES-DEX] |
| 989 | Sandy Shocks | Pelarena | [ES-DEX] |
| 991 | Iron Bundle | Ferrosaco | [ES-DEX] |
| 992 | Iron Hands | Ferropalmas | [ES-DEX] |
| 994 | Iron Moth | Ferropolilla | [ES-DEX] |
| 995 | Iron Thorns | Ferropúas | [ES-DEX] |
| 1005 | Roaring Moon | Bramaluna | [ES-DEX], [WD Bramaluna] |
| 1006 | Iron Valiant | Ferropaladín | [ES-DEX], [WD Ferropaladín] |
| 1009 | Walking Wake | Ondulagua | [ES-DEX] |
| 1010 | Iron Leaves | Ferroverdor | [ES-DEX] |

Spelling to keep as on [ES-DEX]: Farfetch’d (typographic apostrophe), Mr. Mime, Ho-Oh, Nidoran♀ / Nidoran♂, Flabébé, Tapu Koko, Chi-Yu. Every starter and legendary in our content (Mudkip, Sobble, Scorbunny, Froakie, Kyogre, Rayquaza, Arceus, Meowth, Gholdengo…) keeps its English name. For the Spanish dex page, add a `name.es` only where it differs (these 14).

### 3.7 Our site UI strings (src/i18n.ts)

Proposed ES values for the chrome strings. Game terms follow the tables above; the rest is our own wording (no external source needed).

| Key | English | Spanish |
|---|---|---|
| nav.home / tier-list / pokedex | Home / Tier List / Pokédex | Inicio / Tier list / Pokédex |
| nav.best-pokemon / how-to-play | Best Starter / How to Play | Mejor inicial / Cómo jugar |
| nav.co-op / rifts / mobile | Co-op / Rifts / Mobile | Cooperativo / Grietas / Móvil |
| skip / menu / mainNav | Skip to content / Menu / Main | Saltar al contenido / Menú / Principal |
| breadcrumbHome / breadcrumbLabel | Home / Breadcrumb | Inicio / Ruta de navegación |
| langSwitch / lastUpdated / byline | Language / Last updated / By | Idioma / Última actualización / Por |
| fullscreen / openNewTab | Fullscreen / Open game in a new tab | Pantalla completa / Abrir el juego en otra pestaña |
| playNow / playGame / playOnHome | Play PokeSurvivor now / Play PokeSurvivor / Play PokeSurvivor online free | Juega a PokeSurvivor ahora / Jugar a PokeSurvivor / Juega gratis a PokeSurvivor online |
| playCardBody | Play the game in your browser… | Juega en el navegador desde la página de inicio o ábrelo en otra pestaña. |
| playCardBodyMobile | On a phone, open the official site… | En el móvil, abre la web oficial en otra pestaña y pon el teléfono en horizontal. |
| landscapeHint | On mobile, rotate your device to landscape to play. | En el móvil, gira el dispositivo y juega en horizontal. |
| gameTitle | PokeSurvivor game | Juego PokeSurvivor |
| tierCaption / moveCaption | partner tiers by game phase / starting move tiers | Tier list de compañeros de PokeSurvivor por fase / Tier list de movimientos iniciales de PokeSurvivor |
| footerLinks / footerGuides | Game links / Guides | Enlaces del juego / Guías |
| officialSite / itch | Official site (pokesurvivor.com) / PokeSurvivor on itch.io | Web oficial (pokesurvivor.com) / PokeSurvivor en itch.io |
| faq / tier / toc | FAQ / Tier / On this page | Preguntas frecuentes / Tier / En esta página |
| phases | Early / Mid / Late game | Fase inicial / Fase media / Fase final |
| unranked / unrankedNote | Not yet ranked / Starting move not confirmed | Aún sin clasificar / Movimiento inicial sin confirmar |
| moveCols | Starting move / Tier / Evolves into / Card needed / Used by | Movimiento inicial / Tier / Evoluciona a / Carta necesaria / Lo usan |
| dex.search / type / allTypes | Search by name or number / Type / All types | Busca por nombre o número / Tipo / Todos los tipos |
| dex.starter / legendary / gen / count | Starter / Legendary / Generation / Pokémon | Inicial / Legendario / Generación / Pokémon |
| dex.shown / none / top | shown / No Pokémon match these filters. / Back to regions | mostrados / Ningún Pokémon coincide con estos filtros. / Volver a las regiones |
| spriteCredit | Sprites: … portraits, licensed … | Sprites: retratos de …, con licencia … |
| notFound* / backHome | Page not found / … does not exist. / Back to home | Página no encontrada / La página que buscas no existe. / Volver al inicio |
| disclaimer | Unofficial fan site… | Sitio de fans no oficial. No está afiliado, patrocinado ni aprobado por Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company ni el desarrollador de PokeSurvivor (jpter78). PokeSurvivor es obra de jpter78. Pokémon y los nombres relacionados son marcas de sus respectivos propietarios. El juego se juega en su web oficial, pokesurvivor.com. (Wording modelled on the game's own notice «No está afiliado, patrocinado ni aprobado por…» [ES-HOME].) |

Route paths and `LANG_TAG` (`es`) are an implementation decision outside this glossary. Suggested hreflang: `es` (not `es-ES`), since the copy targets all Spanish-speaking countries.

## 4. Keyword map

### 4.1 What the data says

Evidence is Google Suggest for gl=es, mx, ar, co, hl=es [SUGG], 2026-10-16. The web_search tool returned no results for the Spanish queries tried, so SERP competition and search volumes are **UNVERIFIED**.
- Brand: «pokesurvivor» suggests «poké survivor tier list», «poke survivor meta», «poké survivor mejor pokemon», «poké survivor builds», «pokesurvivor guia», «poké survivor wiki», «poke survivor app», «pokesurvivor github» (mx, ar, co). Spaniards and Latin Americans already search the brand with English modifiers (tier list, meta, build, guide) and Spanish ones (mejor pokemon, guia).
- «pokemon survivor» suggests «pokemon survivor tier list», «pokemon survivor juego», «pokemon survivor jugar», «pokemon survivor mejor pokemon», «pokemon survivor guia» (es) and «tier list pokemon survivor» (es, mx). Watch out: «pokemon survivor burst» (android, mobile, ios, instalar, como jugar, donde jugar) is a **different game** and dominates the "mobile / how to play" suggestions. Don't target «burst». Add an FAQ line saying PokeSurvivor isn't Pokémon Survivor Burst.
- «tier list» stays in English: «pokemon tier list starters», «tier list pokemon legendarios» [SUGG].
- «mejor pokemon inicial» is a strong generic phrase («mejor pokemon inicial de todas las generaciones», «… de cada generacion»). Our best-pokemon page should use «mejor inicial» plus the brand.
- Móvil vs celular: both are suggested («juegos de pokémon para celular gratis», «… para móvil» in es and mx alike). Recommendation: write «móvil» in body copy (the game's own word: «Gira el móvil», «en PC y móvil» [ES-HOME]) and use «celular» once in the title or description and once in an H2/FAQ of the mobile page. Avoid repeating both everywhere.
- «juegos como vampire survivors» / «juegos tipo vampire survivors» (+ android, coop, pc) is a real head term. «juego de pokemon tipo vampire survivors» got no suggestion; use «juego de Pokémon estilo Vampire Survivors» in copy (the game says «al estilo de Survivor.io o Vampire Survivors» [ES-GUIA]).
- «juegos de pokemon gratis en linea / para pc» and «sin descargar» phrasing: use «gratis online», «en el navegador», «sin descargar».
- Multiplayer: «pokemon survivor multijugador» had no suggestions. Use «multijugador» and «cooperativo» together; the game uses «cooperativo online» [ES-GUIA].
- No suggestions for «pokemon survivor grietas / legendarios / pokedex». Those pages target long tail with game terms (grietas, legendarios, arenas, Pokédex).

### 4.2 Per page

Titles and descriptions below were counted with a script; all fit ≤60 / ≤155.

| Page | Primary | Secondary | Title proposal (chars) | Description proposal (chars) |
|---|---|---|---|---|
| home (/es/) | pokesurvivor | poke survivor, pokemon survivor juego, jugar pokesurvivor gratis online, juego de pokémon estilo vampire survivors, sin descargar | PokeSurvivor gratis: juego de Pokémon online sin descargar (58) | Juega gratis a PokeSurvivor en tu navegador, sin descargar nada. Un fan game de Pokémon estilo Vampire Survivors: tú te mueves y tu compañero ataca solo. (153) |
| tier-list | pokesurvivor tier list | tier list pokemon survivor, poké survivor meta, mejores iniciales pokesurvivor | Tier list de PokeSurvivor (octubre 2026): iniciales por fase (60) | Tier list de PokeSurvivor: los 25 iniciales de S a C para el inicio, la mitad y el final de la partida, más una tier list de movimientos iniciales. (147) |
| best-pokemon | mejor pokémon pokesurvivor | mejor inicial pokesurvivor, pokemon survivor mejor pokemon, qué inicial elegir | Mejor Pokémon inicial en PokeSurvivor: cuál elegir primero (58) | Mejor inicial en PokeSurvivor: compara los 29 compañeros por movimiento y estadísticas, con nuestras 3 recomendaciones para empezar. (132) |
| how-to-play | cómo jugar pokesurvivor | pokesurvivor guía, pokemon survivor guia, controles, evolución de movimientos | Cómo jugar a PokeSurvivor: guía de tu primera partida (53) | Cómo jugar a PokeSurvivor: controles, cartas de nivel, evolución de movimientos, enemigos y errores de principiante en tu primera run de 10 minutos. (148) |
| co-op | pokesurvivor multijugador | pokesurvivor cooperativo, jugar con amigos, cooperativo online hasta 4, juegos como vampire survivors coop | PokeSurvivor multijugador: cooperativo con hasta 4 amigos (57) | Juega a PokeSurvivor en cooperativo online con hasta 4 amigos: añade su apodo, únete a la sala del anfitrión, comparte experiencia y revive a tu equipo. (152) |
| rifts | pokesurvivor grietas | legendarios pokesurvivor, 18 arenas, vínculos, ticket ×10 | Grietas y legendarios de PokeSurvivor: las 18 arenas (52) | Grietas misteriosas de PokeSurvivor: cuándo aparecen, vínculos y ticket ×10, terreno y clima de las 18 arenas y cómo vencer a cada legendario. (142) |
| mobile | pokesurvivor móvil | pokesurvivor celular, poke survivor app, jugar en android / iphone, añadir a pantalla de inicio | PokeSurvivor en el móvil: juega en iPhone y Android sin app (59) | Juega a PokeSurvivor en el móvil o celular desde el navegador: en horizontal, controles táctiles, añadir a pantalla de inicio y soluciones a fallos. (148) |
| pokedex | pokédex pokesurvivor | pokesurvivor pokémon jugables, 966 pokémon, iniciales y legendarios | Pokédex de PokeSurvivor: los 966 Pokémon jugables (49) | Pokédex completa de PokeSurvivor: los 966 Pokémon jugables de las 9 regiones con sprites, tipos, 29 iniciales y 87 legendarios. Busca o filtra por tipo. (152) |

H1s: write in Spanish sentence case with the primary keyword, e.g. «Juega a PokeSurvivor online gratis», «Tier list de PokeSurvivor», «Mejor inicial en PokeSurvivor», «Cómo jugar a PokeSurvivor: tu primera partida de 10 minutos», «PokeSurvivor cooperativo: juega con hasta 4 amigos», «Grietas misteriosas de PokeSurvivor: legendarios y 18 arenas», «PokeSurvivor en el móvil», «Pokédex de PokeSurvivor: los 966 Pokémon jugables».

## 5. UNVERIFIED items

- **Shady Forest:** The client's map list starts with «Bosque Umbrío», but its English string is obfuscated, and "Shady Forest" doesn't appear as plain text. **Decision (2026-10-16, fallback rule):** use the English name «Shady Forest», as on our EN page, until the Spanish name is confirmed.
- **Enemy personality nouns.** The game only says «curanderos» (healers). For shielders, summoners and exploders it uses verbs («ponen escudos / protegen», «invocan ayuda / llaman a su manada», «explotan»). **Decision (2026-10-16, fallback rule):** «curanderos» is official ([ES-NOV], [CLIENT] «Movimientos psíquicos y curanderos más flojos.») and stays. The other three use the English nouns from our EN pages: *shielders*, *exploders*, *summoners*, in italics with a short Spanish gloss on first mention («*shielders* (que ponen escudos)»). Do not use «escuderos», «invocadores», «explosivos».
- **Rift terrain labels** for sparks, swamp, poison pools and pillars: no Spanish string found (only lava / hielo / agua in [ES-LEG], [README]). **Decision (2026-10-16, fallback rule):** use the English names from en/rifts.md: *Swamp*, *Sparks*, *Poison*, *Pillars*, in tables as-is and in prose in italics with a Spanish gloss («zonas de *Swamp* (pantano)»). Lava / hielo / agua stay Spanish (official).
- **XP gems:** no Spanish label found. **Decision (2026-10-16):** the official word is «experiencia» ([ES-GUIA] «Recoge la experiencia», [CLIENT] «radio de recogida de experiencia»). Write «experiencia»; don't write «gemas (de experiencia)».
- **Automatic graphics quality:** the exact label of the auto option in Ajustes > Gráficos wasn't found as plain text (README: «calidad gráfica (con modo automático)»).
- **Co-op connection errors** ("Can't connect to one of your friends", "a friend's network doesn't allow group play"): no Spanish string found in the plain-text table; it may be obfuscated. Paraphrase instead of quoting.
- **Personality quiz** has no noun label in the game. **Decision (2026-10-16):** drop «test de personalidad». Describe it with a plain common noun, «un breve cuestionario», and quote the game's official prompt «Tu personalidad es…» (the client also shows «Pregunta {x}»). Not a name, so no English fallback; switch to «personality quiz» if the user prefers a strict reading of the rule.
- **iOS / Android menu labels** («Compartir», «Añadir a pantalla de inicio», «Instalar aplicación», «Crear acceso directo») are taken from the game's guide or are common Spanish OS strings; we didn't check them on a device. The exact wording varies by OS version and region.
- **Search volume and competition** for every keyword in section 4. Google Suggest only shows that the queries exist; web_search returned no results for the Spanish queries.
- **Community usage of "early/mid/late game"** vs «fase inicial / media / final» in Spanish. We chose the Spanish terms; not checked against community sites.
- **Pokemon.com/es pages** only loaded through WebFetch (Sobble, Código Cero). The type list was otherwise checked on WikiDex and the game's own pages.
- **Game strings change** with updates (the client is rebuilt almost daily). Re-check section 2 before each publish.

