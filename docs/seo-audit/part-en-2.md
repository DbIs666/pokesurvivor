# On-page SEO 审计（EN 第 2 部分）：/how-to-play/ · /co-op/ · /rifts/ · /mobile/

审计日期：2026-10-14。依据：`docs/content-spec.md`（下称"规范"）、`src/content/pages/en/*.md`、构建产物 `dist/<route>/index.html`。未修改任何源文件。

## 0. 全站共性问题（四页都适用，下文不再重复）

- **站点域名仍是占位符**：`astro.config.mjs` 中 `SITE = 'https://pokesurvivor.example.com'`，canonical、hreflang、og:url、og:image、JSON-LD 里的 URL 都受影响。上线前必须替换（P0，只记一次）。
- **页脚免责声明与规范 §6 不一致**：渲染文本为 "...not affiliated with ... Nintendo, Game Freak, The Pokémon Company, or the developer of PokeSurvivor..."。缺少 Creatures Inc.、开发者名 jpter78，以及 "The game is played on its official site, pokesurvivor.com."（P1）
- **itch.io 链接没有做到每页都有**：规范 §6 要求"每页链接官网和 itch.io"。页脚和游戏卡片里只有官网（`https://pokesurvivor.com/en/`），没有 itch.io。正文里只有 /co-op/、/mobile/ 链了 itch.io，**/how-to-play/ 和 /rifts/ 没有**。建议在页脚或游戏卡片里统一加上（P1）。
- **没有任何图片**：四页的 `<img>` 数量都是 0。og:image 全站共用 `/og-default.png`（1200×630，尺寸合规）。规范 §6 要求用自截图。缺图片会削弱 E-E-A-T（"亲自测试过"的证据），也拿不到图片搜索流量和 Article 富结果的配图（P1）。
- **Twitter 卡片字段不全**：只有 `twitter:card=summary_large_image`。X 会回退读取 og:*，所以能用，但可以补上 `twitter:title`/`twitter:description`/`twitter:image`（P2）。
- **Article JSON-LD 字段不全**：有 headline、description、inLanguage、mainEntityOfPage、dateModified、publisher；缺 `image`（Google 建议）、`datePublished`、`author`（建议填 Organization 或具体作者），publisher 也缺 `logo`。Article 富结果资格受影响（P1）。
- **FAQPage**：JSON-LD 与页面上可见的 `<details>` FAQ 逐字一致，结构正确。但 Google 从 2023 年起只给权威政府/医疗网站展示 FAQ 富结果，本站基本拿不到星级式的 FAQ 展开。保留它没有坏处（对 AI 摘要和"People also ask"有帮助），只是不要指望它带来 SERP 外观。
- **HowTo**：Google 已在 2023 年停用 HowTo 富结果，**不建议**为 /co-op/ 或 /mobile/ 的步骤加 HowTo 标记。用有序列表争取精选摘要即可。
- **hreflang**：每页都输出 `en`、`zh-Hans`、`x-default(=EN)`，并且自引用、双向配对（zh 页面 `lang="zh-Hans"`，语言切换写的是"简体中文"）。规范 §8 写的是 `zh-Hant`（繁体关键词），但站点实际做的是简体页面，所以 `zh-Hans` 和内容是一致的。建议**更新规范**，不要改代码；同时检查 zh 页面是否覆盖了规范里的繁体关键词（寶可夢倖存者）。og:locale:alternate=`zh_CN` 和这一点一致。
- **面包屑**：可见面包屑和 BreadcrumbList JSON-LD 一致（Home > 页面），但第 2 级名称直接用了完整 H1（例如 "How to Play PokeSurvivor: Your First 10-Minute Run"），太长。建议改用短名（"How to Play"）（P2）。
- **游戏卡片**：每页 H1 下方都有 `aside.game-card`："Play on this site" 指向 `/`，"Open game in a new tab" 指向官网（`target="_blank" rel="noopener"`），符合规范 §1。它出现在正文之前，不影响前 100 词的判断。

---

## 1. /how-to-play/

规范关键词：**how to play pokesurvivor**。规范 H1："How to Play PokeSurvivor: Your First 10-Minute Run"。

| 维度 | 分数 | 依据 |
|---|---|---|
| 1 搜索意图与关键词 | 9 | 精确词出现在 title、H1、description 开头（"How to play PokeSurvivor: a first-run walkthrough…"）和 slug `/how-to-play/`。首段（md 第 19 行）没有完整短语，只有 "This guide walks through a first run…"。H2 都没有出现品牌词，不过这是指南页，可以接受。没有堆砌（全文 "pokesurvivor" 只出现 2 次）。 |
| 2 Title | 9 | "How to Play PokeSurvivor: First 10-Minute Run Guide"，51 字符，约 470px。关键词在最前，"10-Minute" 有具体卖点，全站唯一。 |
| 3 Meta description | 8 | 144 字符，含关键词，和内容匹配。没有 CTA（例如 "Start your first run…"）。 |
| 4 标题层级 | 9 | 单个 H1；8 个 H2（Before you start / Minutes 0–2 / Level-up cards / Max level and evolution / The four enemy personalities / Map objects, weather and types / Your first rift / FAQ），逻辑顺序清楚。没有 H3，小节内的"Our tips"可以升级为 H3。"Max level and evolution" 可以写得更具描述性。 |
| 5 内容质量 | 7 | 正文约 704 词（不含 FAQ），深度匹配新手意图。有自己的经验法则（第 40–44 行）和对敌人性格的应对，而且如实标注了 "our own reading of the names, not confirmed mechanics"（第 64 行）。"Why can't I move?" 也按 UNVERIFIED 处理了（"The cause isn't confirmed"）。**问题**：①进化表里的 "Razor Leaf → Leaf Storm (Reflexes)" 和 "Confusion → Psyshock (Reflexes)"（第 56–57 行）**不在规范已核实的例子里**（规范 §2 只列了 Ember/Water Gun/Bubble/Vine Whip/Tackle），需要对照官方 /en/moves/ 复核；②规范大纲要求的"Meowth with coins"缺失；③缺少规范 "Value-add" 里说的时间线截图；④"64 moves, 59 can evolve" 这类会变的数字没有单独的"last checked"，只有页面级的更新日期。 |
| 6 内外链 | 7 | 出链：/best-pokemon/、/mobile/、/rifts/、/tier-list/，官方 guide 和 moves。**缺 itch.io**。入链：导航 + home、best-pokemon、tier-list、mobile、rifts 正文，没有孤页风险。/co-op/ 正文没有链到本页。锚文本偏泛（"Mobile"、"Rifts"）。 |
| 7 媒体 | 3 | 没有图片和截图；OG 用默认图；游戏卡片正常。 |
| 8 结构化数据 | 6 | Article + FAQPage + BreadcrumbList 都正确，FAQ 与可见文本一致。Article 缺 image/author/datePublished。 |
| 9 Canonical/hreflang/OG | 8 | 自引用 canonical，hreflang en/zh-Hans/x-default 齐全，og:type=article，og:title 与 title 相同。扣分在占位域名和 Twitter 字段（见 §0）。 |
| 10 SERP 机会 | 7 | 进化表可以争取表格型精选摘要；"Level-up cards" 的有序列表可以争取列表摘要；FAQ 有机会进入 PAA。可以加一个 "Quick answer" 段，40–50 词概括玩法。 |

**修复建议**
- P1：给进化表的 Razor Leaf / Confusion 两行补来源，或删掉这两行只保留规范已核实的 5 条。在表格下方写 "Moves list checked 2026-10-14"。
- P1：正文或卡片里加 itch.io 链接，例如在 "Before you start" 末尾加："Want to play offline? The [itch.io download](https://jpter78.itch.io/pokesurvivor) is solo only."
- P1：加 2–3 张自截图（升级卡片界面、金色进化卡、地面红色标记），alt 例如 "PokeSurvivor level-up screen with three move cards"。
- P2：首段改为 "How to play PokeSurvivor in one sentence: you only move, your partner Pokémon attacks on its own. This guide walks through your first 10-minute run…"，让精确关键词出现在前 100 词里，同时充当快速答案。
- P2：description 加 CTA："How to play PokeSurvivor: your first 10-minute run, level-up card picks, move evolutions and the four enemy types. Start your first run here."（约 150 字符）
- P2：补一个 "Map objects" 小节，写 Meowth 掉落金币。把 "Max level and evolution" 改为 "How move evolution works (level 5 + upgrade card)"。

---

## 2. /co-op/

规范关键词：**pokesurvivor co-op / multiplayer**。规范 H1："PokeSurvivor Co-op: Play with up to 4 Friends"。

| 维度 | 分数 | 依据 |
|---|---|---|
| 1 搜索意图与关键词 | 6 | "PokeSurvivor Co-op" 出现在 title、H1、description、首段（"PokeSurvivor has online co-op for up to 4 players"）和 slug。**"multiplayer" 在全页出现 0 次**，规范明确把它列为同等目标词。H2 也没有出现 "co-op"。 |
| 2 Title | 8 | "PokeSurvivor Co-op: Play Online with up to 4 Friends"，52 字符，约 480px，关键词在前，"4 Friends" 是具体数字。缺 multiplayer。 |
| 3 Meta description | 8 | 140 字符，覆盖了要点（4 人、昵称加好友、房间、共享 XP、复活），和内容匹配。没有 CTA，也没有 multiplayer。 |
| 4 标题层级 | 8 | 单个 H1，6 个 H2（Requirements / How to start a co-op run / Shared rules / Privacy note / Team tips / FAQ），逻辑合理。"Requirements" 可以写得更具体。 |
| 5 内容质量 | 6 | 正文约 326 词，**偏薄**。事实基本符合规范：4 人、昵称加好友、邀请进房、共享 XP、站在旁边复活、一起进裂隙、房主切标签页全员暂停、P2P 可能暴露 IP、Firebase 中继。UNVERIFIED 的处理很好：跨平台（FAQ "Not confirmed… we haven't tested it"）和嵌入框内能否联机（第 25 行 "We haven't confirmed either way"）。**小问题**：①"Everyone levels together, so nobody falls behind"（第 36 行）是从"XP 共享"推出来的，规范没有确认"一起升级"，建议改成"XP is shared"；②"Team tips" 自己也承认 "not tested team data"，价值有限；③缺少规范要求的 Team composition → /tier-list/ 的实际搭配建议；④没有截图，没有讲找不到好友、邀请失败时怎么排查。 |
| 6 内外链 | 8 | 出链：官方 guide、news、官网、itch.io（都有），站内 /rifts/、/tier-list/、/best-pokemon/。入链：导航、home（2 处）、rifts、mobile、tier-list。没有链到 /how-to-play/ 和 /mobile/。 |
| 7 媒体 | 3 | 没有图片（好友列表、房间界面截图都适合放）。OG 用默认图。 |
| 8 结构化数据 | 6 | Article + FAQPage + Breadcrumb 正确，FAQ 与可见文本一致。缺字段同 §0。不建议加 HowTo。 |
| 9 Canonical/hreflang/OG | 8 | 同 §0。 |
| 10 SERP 机会 | 7 | "How to start a co-op run" 的 4 步有序列表适合争取列表型精选摘要。"Is PokeSurvivor multiplayer?" 是很自然的 PAA 问题，但目前缺失。 |

**修复建议**
- P0（关键词缺口）：在 title、H2、FAQ 里补上 multiplayer。
  - Title："PokeSurvivor Co-op & Multiplayer: Play with up to 4 Friends"（58 字符）
  - H1："PokeSurvivor Co-op: How to Play Multiplayer with up to 4 Friends"
  - Description："PokeSurvivor multiplayer explained: play online co-op with up to 4 friends. Add friends by nickname, join the host's room, share XP and revive teammates."（约 155 字符）
  - 新增 FAQ："Is PokeSurvivor multiplayer?" → "Yes, online co-op for up to 4 players. There is no PvP mode that we know of."（"no PvP" 需要先核实，未核实就不写这一句）
- P1：内容扩到 600 词以上：加一节 "Co-op troubleshooting"（不能登录或邀请时在新标签页打开、房主别切标签页、访客无法被找到），以及一节有实际依据的组队建议，链到 /tier-list/。
- P1：第 36 行改为 "XP is shared, so everyone gets the same experience from gems."，删掉推断出来的"levels together"。
- P2：H2 "Requirements" 改为 "What you need for co-op"；正文加 /how-to-play/、/mobile/ 链接，锚文本用 "how to play PokeSurvivor" 和 "co-op on mobile"。

---

## 3. /rifts/

规范关键词：**pokesurvivor rifts / legendaries**。规范 H1："PokeSurvivor Mysterious Rifts: All 18 Type Arenas"。

| 维度 | 分数 | 依据 |
|---|---|---|
| 1 搜索意图与关键词 | 7 | "PokeSurvivor Rifts" 出现在 title、H1（"PokeSurvivor Mysterious Rifts"）、description、slug `/rifts/` 和首段（"Mysterious Rifts are short side fights against a legendary Pokémon"）。**"legendaries" 不在 title 和 H1 里**，只在正文和 FAQ 中出现（legendary/legendaries 合计约 16 次，属于自然密度）。H2 "Which legendary you meet" 覆盖了这个变体。 |
| 2 Title | 8 | "PokeSurvivor Rifts: All 18 Type Arenas and How to Win"，53 字符，约 500px，有数字（18）和收益点（How to Win）。缺 legendaries。 |
| 3 Meta description | 8 | 136 字符，内容匹配，但没有 CTA。 |
| 4 标题层级 | 9 | 单个 H1，8 个 H2，顺序为 出现→奖励→遇到谁→18 场地表→分组策略→打法→合作→FAQ，非常清晰。 |
| 5 内容质量 | 7 | 正文约 693 词。事实和规范一致：至少每 2.5 分钟一次（news 2026-10-12）、×10 券、羁绊最多 4、87 只传说、没有固定的"一场地一传说"、双属性随机、缺的传说更常出现、具体概率未公开，18 个场地名称全部正确。**问题**：①"Bosses use four telegraphed attacks and enrage at half health"（第 75 行）在规范里来源是"Bosses"（news 2026-10-10），套用到裂隙传说身上是推断，建议注明 "assumed to apply to rift legendaries"；②场地地形（"Fire: expect lava"、"Water and Ice: slowing water and slippery ice"）原文已声明 "our guidance"，处理得当；③属性克制假设沿用标准宝可梦属性表，游戏属性表是否与之一致**未核实**，原文已写 "assumes the standard Pokémon type matchups"，可以接受；④规范要求场地表包含"地形危害 / 示例传说 / 推荐克制属性 / 技巧"几列，目前只有 Type 和 Arena 两列，信息分散在下面的分组列表里，表格的独特价值偏低。 |
| 6 内外链 | 7 | 出链：官方 legendaries（2 处）、news，站内 /how-to-play/、/co-op/。**缺 itch.io**，也没链 /tier-list/（规范说裂隙和中期强度相关）。入链：导航、home（2 处）、how-to-play、co-op、best-pokemon、tier-list，入链最充分。 |
| 7 媒体 | 3 | 18 个场地非常适合放截图，目前一张都没有。 |
| 8 结构化数据 | 6 | Article + FAQPage + Breadcrumb 正确，FAQ 与可见文本一致。可以考虑给 18 个场地做 ItemList，收益不大，P2。 |
| 9 Canonical/hreflang/OG | 8 | 同 §0。 |
| 10 SERP 机会 | 8 | "All 18 arenas" 表格很容易拿到表格型精选摘要；"Which legendary will I get" 适合进 PAA；目前没有竞品专门做这个话题，抢占机会大。 |

**修复建议**
- P1：标题里加上 legendaries。
  - Title："PokeSurvivor Rifts & Legendaries: All 18 Arenas, How to Win"（59 字符）
  - H1："PokeSurvivor Mysterious Rifts: Legendaries and All 18 Type Arenas"
  - Description："PokeSurvivor rifts explained: when they appear (every 2.5 min), how to enter, ×10 ticket and bond rewards, all 18 type arenas and how to beat each legendary."（约 158 字符）
- P1：把场地表扩成 5 列：Type | Arena | Terrain (our notes) | Example legendaries | Bring。示例传说只用规范已有的配对（Kyogre、Groudon、Regice、Darkrai、Rayquaza），其余格子留空或写 "—"，不要编造。
- P1：第 75 行改为 "Bosses use four telegraphed attacks and enrage at half health (news, 2026-10-10); we assume rift legendaries follow the same pattern."
- P1：加 itch.io 链接；加一句链到 /tier-list/（"Partners that handle mid-game rifts well: see the [tier list](/tier-list/)"）。
- P2：给 18 个场地加截图（alt 格式 "Igneous Volcano rift arena in PokeSurvivor"）；考虑加 ItemList 结构化数据。

---

## 4. /mobile/

规范没有给 EN /mobile 的大纲（§8 只是"recommended"），关键词参考 §4 和 zh 版：**pokesurvivor mobile / pokesurvivor iphone / android / app**。

| 维度 | 分数 | 依据 |
|---|---|---|
| 1 搜索意图与关键词 | 7 | "PokeSurvivor on Mobile" 出现在 title、H1、首段（"PokeSurvivor runs in the browser on phones and tablets"）和 slug `/mobile/`。"iPhone"、"Android" 出现在 description 和 H2 下的正文里，但不在 title/H1 中。"app" 出现约 7 次，覆盖了 "pokesurvivor app" 这一高频导航意图。 |
| 2 Title | 7 | "PokeSurvivor on Mobile: Play in Your Phone Browser"，50 字符，约 470px。"Phone Browser" 和 description 重复，缺 iPhone/Android 和 "app" 这些高搜索量变体。 |
| 3 Meta description | 9 | 145 字符，涵盖 iPhone/Android、横屏、拖动操作、加到主屏幕、没有 App，和正文高度匹配。 |
| 4 标题层级 | 7 | H1 "PokeSurvivor on Mobile" 太短、描述性不足。7 个 H2 逻辑清楚。"Add it to your home screen" 下的 "iPhone / iPad (Safari)" 和 "Android (Chrome)" 用的是 `**粗体**`，**应该改成 H3**。 |
| 5 内容质量 | 7 | 正文约 366 词，对这个意图来说够用。事实与规范 §4 一致：横屏、"Rotate your phone" 提示、任意处拖动出摇杆、右上角暂停、manifest 全屏横屏、2026-10-12 的 iPhone 修复、离线 zip 只能单人、手机能否用**未确认**（如实写了 "isn't confirmed"）、没有 App 商店版（写成 "We found no official app… as far as we know"，符合规范的措辞要求）、没有官方加密币。可以补充的内容：卡顿怎么办（设置里的自动画质，zh 规范提到过，EN 可以复用，但要先核实）、平板的说明。 |
| 6 内外链 | 8 | 出链：官方 guide、news、官网、itch.io（都有），站内 /how-to-play/、/co-op/。入链：导航、home（2 处）、how-to-play。zh 版 /zh/mobile/ 和 EN 版双向配对了 hreflang（规范 §8 的建议已落实）。 |
| 7 媒体 | 3 | 没有截图。这一页最需要图：横屏界面、"Add to Home Screen" 菜单。 |
| 8 结构化数据 | 6 | Article + FAQPage + Breadcrumb 正确，FAQ 与可见文本一致。不建议加 HowTo（富结果已停用）。 |
| 9 Canonical/hreflang/OG | 8 | 同 §0；en ↔ zh-Hans 双向自引用。 |
| 10 SERP 机会 | 8 | "Is there a PokeSurvivor app?" 是高潜力的 PAA 和导航查询（用户很可能搜 "pokesurvivor app" 或 "apk"），目前只在 FAQ 里回答。加主屏幕的步骤列表适合争取列表摘要。 |

**修复建议**
- P1：Title/H1 覆盖设备词和 app 词。
  - Title："PokeSurvivor Mobile: Play on iPhone & Android (No App)"（55 字符）
  - H1："PokeSurvivor Mobile: Play on iPhone and Android in Your Browser"
  - Description 基本保留，可以加 CTA："…and why there's no app-store app. Open it on your phone now."（注意控制在 160 字符以内）
- P1：把 "iPhone / iPad (Safari)" 和 "Android (Chrome)" 改为 H3。
- P1：H2 "No app-store app" 改为 "Is there a PokeSurvivor app? (No app-store version)"，同时承接 "pokesurvivor app / apk" 这类查询；可以加一句 "We haven't found an official APK either"（属于 UNVERIFIED，措辞要保持"据我们所知"）。
- P2：加横屏界面和"加到主屏幕"的截图；补一节"Lag or low FPS on phone"（核实设置项后再写）。

---

## 5. 关键词蚕食（Cannibalization）

| 页面对 | 风险 | 说明与建议 |
|---|---|---|
| / ↔ /mobile/ | 中 | home 有 FAQ "Does it work on my phone?" 和 H2 "No download needed"（提到加主屏幕、离线 zip），和 /mobile/ 主题重叠。home 的 title 侧重 "play online / no download"，意图不同。建议 home 只保留一句话，加上锚文本 "PokeSurvivor on mobile" 链到 /mobile/，不要在 home 展开步骤。 |
| / ↔ /co-op/ | 低 | home 的 "Play with friends" 是一段摘要并链到 /co-op/，属于正确的枢纽结构。title 里 "co-op for up to 4" 只出现在 home 的 description 中，可以接受。 |
| / ↔ /how-to-play/ | 中 | home 的 H2 "Controls" 和 how-to-play 的 FAQ "How do I attack?/How do I switch moves?" 都在回答操作问题；"how to play pokesurvivor" 也可能被 home 抢走。建议 home 的 Controls 节末尾加 "Full walkthrough: [how to play PokeSurvivor](/how-to-play/)"，并避免 home 出现 "how to play" 精确短语的 H2。 |
| /how-to-play/ ↔ /rifts/ | 低 | how-to-play 的 "Your first rift" 只是摘要，有链接到 /rifts/，合理。保持精简，不要在 how-to-play 里加场地表。 |
| /how-to-play/ ↔ /tier-list/ | 低–中 | 规范要求 tier-list 有 "Move evolutions that carry a tier"，how-to-play 有进化表，可能在 "pokesurvivor move evolution" 这个词上冲突。建议把完整进化表放在 how-to-play（作为主页面），tier-list 只引用 2–3 条并链过来。 |
| /co-op/ ↔ /best-pokemon/ ↔ /tier-list/ | 低 | best-pokemon 有 FAQ "best starter for co-op"，co-op 有 "Team tips"。目前 co-op 不做排名，没有冲突，但扩写组队建议时要链到 tier-list，不要自己做排名。 |
| /rifts/ ↔ /tier-list/ | 低 | 意图不同（机制 vs 排名）。 |
| /rifts/ ↔ 官方 /en/legendaries/ | 外部 | 规范要求不复制 87 只传说的完整列表。本页定位为"场地 + 打法"是正确的差异化。 |

## 6. 优先级汇总

- **P0**：替换占位域名（全站）；/co-op/ 补上 "multiplayer"（title/H1/description/FAQ）。
- **P1**：全站加 itch.io 链接（/how-to-play/、/rifts/ 目前没有）并修正页脚免责声明；四页都加自截图并写 alt；Article JSON-LD 补 image/author/datePublished；核实 how-to-play 进化表里规范没有的两行；/rifts/ title/H1 加 legendaries，扩充场地表，把"Boss 四招"注明为推断；/mobile/ 的 title/H1 加 iPhone/Android/App，平台小标题改为 H3；/co-op/ 扩写到 600 词以上并删掉"levels together"这一推断。
- **P2**：面包屑用短名；补 Twitter 字段；how-to-play 加快速答案段、Meowth 金币和 CTA；rifts 加 ItemList；更新规范里的 hreflang（zh-Hant → zh-Hans）以和实现保持一致。
