# PokeSurvivor 粉丝站 On-page SEO 审计总报告

审计日期：2026-10-14。本报告合并了四份分报告：`part-en-1.md`（`/`、`/tier-list/`、`/best-pokemon/`）、`part-en-2.md`（`/how-to-play/`、`/co-op/`、`/rifts/`、`/mobile/`）、`part-zh.md`（7 个 `/zh/` 页面）、`part-sitewide.md`（全站技术）。依据为 `docs/content-spec.md`（下称"规范"）、`src/` 源码和 `npm run build` 生成的 `dist/`。未部署，未做线上抓取或 Lighthouse。重复问题只记一次，细节见附录中的分报告。

## 1. 执行摘要

### 1.1 总体结论

内容基础扎实：事实与规范基本一致，UNVERIFIED 项大多如实披露，14 页 title/description 无重复，每页单一 H1，JSON-LD 全部可解析，hreflang 双向互指且自引用，无孤儿页。

阻断上线的问题集中在部署配置：占位域名和 `*.workers.dev` 副本。其余主要扣分来自：两个 EN 页面缺核心关键词，强度榜主表的位置和可见性，全站 0 张图片，EN/ZH 事实冲突，ZH 繁简混写，以及缺少信任页。

总体评分：**7.2 / 10**（14 页平均分的算术平均 7.15；EN 7 页平均 6.9，ZH 7 页平均 7.4）。

### 1.2 分页评分

评分口径说明：EN 两份分报告按 10 个维度打分（含"媒体"维度，EN 页面该项普遍只有 3–6 分），下表 EN 平均分是本报告对分报告各维度分数做的算术平均；ZH 分报告按 8 个维度打分（不含媒体，另含"重复/蚕食"），平均分直接取自 `part-zh.md`。两套口径不完全可比，ZH 分数偏高的一部分原因是没有媒体维度。

| 页面 | 来源 | 维度数 | 平均分 | 最低维度 |
|---|---|---|---|---|
| `/` | part-en-1 | 10 | 7.3 | 媒体 6、结构化 6、SERP 6 |
| `/tier-list/` | part-en-1 | 10 | 6.6 | 媒体 4 |
| `/best-pokemon/` | part-en-1 | 10 | 6.3 | 关键词 4、媒体 4 |
| `/how-to-play/` | part-en-2 | 10 | 7.3 | 媒体 3 |
| `/co-op/` | part-en-2 | 10 | 6.8 | 媒体 3 |
| `/rifts/` | part-en-2 | 10 | 7.1 | 媒体 3 |
| `/mobile/` | part-en-2 | 10 | 7.0 | 媒体 3 |
| `/zh/` | part-zh | 8 | 7.5 | 内容与本地化 6、hreflang 6 |
| `/zh/tier-list/` | part-zh | 8 | 6.6 | 标题层级 5、内容 5 |
| `/zh/best-pokemon/` | part-zh | 8 | 6.9 | 关键词 5 |
| `/zh/how-to-play/` | part-zh | 8 | 7.6 | hreflang 6、蚕食 6 |
| `/zh/co-op/` | part-zh | 8 | 7.9 | hreflang 6 |
| `/zh/rifts/` | part-zh | 8 | 7.8 | hreflang 6 |
| `/zh/mobile/` | part-zh | 8 | 7.4 | 内容与本地化 5 |

ZH 各页"hreflang/locale"均为 6 分，扣分理由是与规范的 `zh-Hant` 不一致。按本报告第 2.3 节的结论（实现正确、规范过时），这一项的扣分属于规范问题，不需要改代码。

### 1.3 最重要的 5 个问题

1. **占位域名**（P0）：`astro.config.mjs:6` 的 `SITE = 'https://pokesurvivor.example.com'`，canonical、hreflang、og:url、og:image、JSON-LD、sitemap、robots.txt 全部指向错误主机。
2. **workers.dev 副本**（P0）：`wrangler.jsonc` 既没设 `workers_dev` 也没设 `preview_urls`，上线后会多出一个可抓取的整站副本。
3. **强度榜主表难以触达**（P0/P1）：EN 主表 H2 "Full table" 排在 Changelog 之后；ZH 主表没有自己的标题；逐只理由只放在 `title` 属性里（每个 tier 页 75 条），触屏和读屏用户看不到。
4. **EN 核心关键词缺口**（P0）：`en/best-pokemon.md` 中 "best pokemon" 出现 0 次；`en/co-op.md` 中 "multiplayer" 出现 0 次，而它是规范列出的同等目标词。
5. **EN/ZH 事实冲突**（P0）：新手推荐顺序相反（EN：水跃鱼/泪眼蜥 → 藤鞭系 → 炎兔儿；ZH：炎兔儿 → 水跃鱼/泪眼蜥 → 呆火鳄）；ZH 强度榜 FAQ 称"各档的简评写在表格里"，而表格里只有名字，这句话还进入了 FAQPage JSON-LD。

## 2. 全站 / 技术问题（已去重）

### 2.1 占位域名（P0）

`astro.config.mjs:5-6` 为占位域名并带 TODO。受影响：14 页 canonical（BaseLayout.astro:23, 40）、hreflang 与 x-default（:42, 44）、og:url/og:image（:53-54）、JSON-LD 中的 WebSite.url、Article.mainEntityOfPage、publisher.url、BreadcrumbList.item（JsonLd.astro:16, 22, 31, 33, 53）、`dist/sitemap-*.xml`、`dist/robots.txt`。修复：改为正式域名（或 `process.env.SITE_URL`），并加构建守卫，生产构建时如果 SITE 含 `example.com` 就报错（代码见 part-sitewide §1）。

### 2.2 workers.dev 副本（P0）

`wrangler.jsonc` 既没有设置 `workers_dev`，也没有设置 `preview_urls`，默认的 `<name>.<subdomain>.workers.dev` 会公开可访问。修复：`"workers_dev": false`、`"preview_urls": false`，用 `routes` 绑定自定义域名，并在 Cloudflare 规则里把 www 与 apex 二选一做 301。实际可访问性未在线验证。

### 2.3 Canonical / hreflang / sitemap

- Canonical：14 页全部自引用、带尾斜杠，与 `trailingSlash: 'always'`、`build.format: 'directory'` 和 wrangler `html_handling: "auto-trailing-slash"` 一致；站内链接没有无斜杠或 `index.html` 形式。404 不输出 canonical，正确；但它输出了 og:url `/404/`，建议 noindex 时不输出 og:url（P2）。
- hreflang：7 对页面全部输出 `en`、`zh-Hans`、`x-default(=EN)`，双向互指且自引用；`/mobile/` ↔ `/zh/mobile/` 已配对，规范中"/zh/mobile 无 EN 对应页"的说法已过时。
- **zh-Hans 还是 zh-Hant（最终结论）：ZH 正文是简体，hreflang 应描述页面实际文字，因此保留 `zh-Hans` 和 `og:locale=zh_CN` 是正确的，过时的是规范第 8 节，应更新规范而不是改代码；如需覆盖港台用户，以后另建一套繁体页（`/zh-hant/`，标 `zh-Hant` / `zh_TW`）。** 不要只把标签改成 `zh-Hant` 而正文不变。part-en-1 / part-en-2 中"需要二选一决定"的说法以此为准。
- sitemap（P2）：alternates 有 `en`、`zh-Hans` 两条且互惠，但缺 `x-default` 和 `<lastmod>`。lastmod 应取内容的 `updated`，不要用构建时间（`serialize` 示例见 part-sitewide §12）。
- 尾斜杠重定向：`astro.config.mjs:12` 注释称是 307。实际状态码未验证（见第 7 节）。

### 2.4 标题模板

`BaseLayout.astro:30` 的正则 `/poke\s?survivor/i` 判断正确。但 14 个可索引页的 title 都已包含游戏名，所以 `| PokeSurvivor` 后缀只在 404 生效，站点品牌 "PokeSurvivor Wiki" 从未出现在标题里。标题保持现状即可；可选的是给 WebSite JSON-LD 加 `alternateName`（P2）。EN title 50–57 字符、description 134–147 字符，都在安全区；ZH title 28–31 字符，处在截断边缘。

### 2.5 Open Graph / Twitter（P2）

- 14 页共用 `/og-default.png`（1200×630，3.6 KB，画面内容未确认）。
- 缺 `og:image:width/height/alt/type`，缺 `article:modified_time`（数据里已经有 `updated`）。
- 只有 `twitter:card`，缺 `twitter:title/description/image`。X 会回退读 og:*，可以用，但显式声明更稳。替换代码见 part-sitewide §5。
- 中期：每页一张自截图的 OG 图（规范 §6 禁止使用官方宝可梦美术）。

### 2.6 JSON-LD

全部 40 个 `ld+json` 块都能用 JSON.parse 解析；首页为 WebSite + FAQPage，12 个内页为 Article + FAQPage（head）+ BreadcrumbList（body）。

- **转义无效（P1，安全）：`JsonLd.astro:59` 的 `.replace(/</g, '\u003c')` 是空操作，因为 JS 字面量 `'\u003c'` 就等于 `"<"`；正确写法是把替换字符串改为 `'\\u003c'`。** 目前内容里没有 `</script>`，所以 dist 现在没有问题，但注释承诺的保护并不存在。
- Article（P1）：缺 `author`、`image`、`datePublished`；`publisher` 缺 `logo`。在 `content.config.ts` 增加 `published` 字段（代码见 part-sitewide §6）。
- WebSite（P2）：`/` 与 `/zh/` 的 `url` 不同，Google 站点名称功能只读根 URL，建议都用 `site.href` 并加 `alternateName`；首页 `updated` 没有输出。ZH 分报告另建议加 `VideoGame`（P2）。
- **FAQPage：Google 自 2023 年起只为权威的政府和医疗网站展示 FAQ 富结果，本站基本拿不到。保留 FAQPage 标记没有坏处（可见文本一致，有助于其他搜索引擎和 AI 摘要理解），但不把它算作 SERP 收益，也不为它堆砌 FAQ。** HowTo 富结果同样已停用，不建议添加。

### 2.7 内部链接与导航文案

- 每页 header 链接本语言全部 7 页，都在首页 1 次点击内，无孤儿页。页脚 0 个链接。
- 正文入链最弱：`/mobile/`、`/zh/mobile/`（只来自首页和 how-to-play）。缺失的正文链接：rifts/mobile → tier-list；co-op/rifts → mobile；`/best-pokemon/` → `/co-op/`；`/zh/best-pokemon/` → rifts、co-op、首页术语表；`/zh/co-op/` → best-pokemon、mobile、how-to-play；`/co-op/` → how-to-play、mobile（矩阵见 part-sitewide §7）。
- 导航文案与页面意图不符：EN "Best Pokémon"（`src/i18n.ts:44`）和 ZH "最强宝可梦"（:71）都指向"第一只伙伴怎么选"，ZH 还和强度榜争夺"最强"意图。改为 "Best Starter" / "开局选择"。
- 弱锚文本：GameLinkCard "Play on this site" / "在本站游玩" 可改为 "Play PokeSurvivor online"（`playOnHome`）；面包屑第 2 级用的是完整 H1，太长，改用短名（P2）。
- 首页 FAQ "See /mobile/ for setup"（`en/home.md:14`）是纯文本，没有做成链接。

### 2.8 TierTable 的 title 属性（P1）

逐只理由只写在 `<li title="Water Gun; atk multiplier 1.08">`（`TierTable.astro:37`），EN、ZH tier 页各 75 条。`title` 在触屏上不显示，读屏器行为不一致，搜索引擎基本不当作正文，而这恰恰是强度榜最有价值的"为什么"。EN 正文自己也承认 "On desktop, hover a name..."。修复：改为可见的 `<span class="tier-note">`，或在表格下方输出 `<dl>`；同时传入 `<caption>`（`tier-list.astro:7` 目前没传）。

### 2.9 首页 iframe 与性能（P1）

`GameEmbed.astro:30` 在 `eager` 时不输出 loading 属性，`HomePage.astro:35` 传入了 `eager`，所以 `/` 和 `/zh/` 一打开就加载整个游戏（体积未测）。手机上 CTA 在 iframe 上方，游戏只能横屏，大多数手机用户不会在框内玩，却照样下载整个游戏。建议：点击加载（facade），至少窄屏不加载，并 `preconnect` 到 pokesurvivor.com。其他方面情况良好：CSS 只有 5.7 KB，使用系统字体，`.game-frame` 有 aspect-ratio 防 CLS。剩余小风险是桌面端脚本把 `details` 展开导致的轻微位移，以及可选的 `inlineStylesheets: 'always'`。

### 2.10 缺失资源（P2）

`public/` 只有 `favicon.svg` 和 `og-default.png`。缺 `favicon.ico`（请求会命中 404 页）、`apple-touch-icon.png`（180×180）、manifest（可选）。全站 `<img>` 数量为 0，见 2.11 的 E-E-A-T。

### 2.11 信任页与页脚免责声明（P1）

| 规范 §6 要求 | 现状 | 位置 |
|---|---|---|
| 声明含 Nintendo、Creatures Inc.、GAME FREAK、The Pokémon Company、开发者 jpter78 | 缺 Creatures；开发者只写 "the developer of PokeSurvivor" | `src/i18n.ts:63-64`（EN）、`:90-91`（ZH） |
| 结尾写明 "The game is played on its official site, pokesurvivor.com." | 缺 | 同上 |
| 可变事实显示 last checked 日期 | 内页都有 "Last updated"；EN 首页有 "Facts last checked"（`home.md:61`），ZH 首页没有 | `LastUpdated.astro` |
| 用自截图 | 全站 0 张图片 | — |

- 没有 About、Contact、Privacy 页。首页嵌入了第三方 iframe（Firebase、Google 登录、P2P 可能暴露 IP），却没有隐私说明。About（作者、测试方法、和官方的关系、数据来源）和 Privacy 为 P1，Contact 为 P2。
- ZH 声明用简体，与页面一致，保留。EN/ZH 改写后的声明文本和 Footer 代码见 part-sitewide §11。

### 2.12 itch.io 链接（P1）

规范要求"每页链接官网和 itch.io"。官网 14 页都有（GameLinkCard / GameEmbed）；itch.io 只有 `/`、`/co-op/`、`/mobile/`、`/zh/`、`/zh/mobile/` 5 页有，其余 9 页没有。最省事的修法是在页脚统一加上官网和 `https://jpter78.itch.io/pokesurvivor`，同时满足 2.11 的要求。

## 3. 分页问题

字符数说明：标注"分报告"的数字取自对应分报告；标注"本报告计数"的是合并时按 Python `len()` 补测的（ZH 按字符计，不是全角宽度）。

### 3.1 `/`（EN 首页）

评分 7.3（part-en-1）。目标词：poke survivor、pokesurvivor、pokesurvivor game、play pokesurvivor online、pokemon survivor。

- H1 后的首段没有出现品牌词，"PokeSurvivor" 第一次出现在正文是 "What is PokeSurvivor?" 一节（`en/home.md:19`）。
- "pokemon survivor" 只在 FAQ 第 2 问出现（`home.md:9`），而这是需要澄清的同名查询。
- FAQ 中的 "/mobile/" 是纯文本（`home.md:14`）。
- 缺 "How to start" 3 步列表；WebSite schema 缺 `alternateName`。

改写建议：
- Title：保持 `Poke Survivor: Play PokeSurvivor Online Free, No Download`（57 字符，分报告）。
- Meta：`Play Poke Survivor free in your browser, no download. A fan-made Pokémon survivors-like: you move, your partner attacks. Start a run now or read our guides.`（156 字符，分报告）
- H1：保持 `Play Poke Survivor Online`。首段改为 `PokeSurvivor (also written Poke Survivor) is a free, fan-made Pokémon survivors-like you can play right here.`，并在 "What is PokeSurvivor?" 末尾加一句 "pokemon survivor" 澄清。

### 3.2 `/tier-list/`

评分 6.6（part-en-1）。目标词：pokesurvivor tier list。

- 主表位置：渲染顺序是 How we rank → Early → Mid → Late → Move evolutions → Changelog → **Full table**（dist 第 179 行的 H2）；"Last updated" 渲染了两次（dist 第 82、182 行）。
- **数量措辞：页面在 Changelog 中已经披露 "25 of 29 starters ranked"（`en/tier-list.md:67`），所以不是事实错误；问题在于首段（第 19 行）和 FAQ（第 10 行）都写 "29 starter partners"，没有说明其中 4 只未排名，会让读者以为表里有 29 只，属于措辞和预期问题。** 在首段注明 4 只未排名及原因即可。
- E-E-A-T：规范 §7 要求 "tested in N runs"、§3 要求 5 项标准；页面只有 3 项，并写明依据是 "starting stats and moves ... plus our own assessment"，没有实战测试。
- 数值超出规范已核实的范围（Scald、Power Whip、Surf 的倍率，Leaf Storm / Psyshock 需要 Reflexes，第 42–61 行），见第 4 节。
- 理由只在 `title` 属性里（见 2.8）；title 和 H1 都没有时效信号。

改写建议（part-en-1 P1-5）：
- Title：`PokeSurvivor Tier List (Oct 2026): Starters by Game Phase`（57 字符）
- Meta：`Our PokeSurvivor tier list ranks 25 starters for early, mid and late game by starting move, evolution and speed. Not official; updated 2026-10-14. See the table.`（161 字符；删去 "See the table." 后为 147）
- H1：`PokeSurvivor Tier List (Updated 2026-10-14)`（43 字符，本报告计数）
- 结构：H1 → 更新日期 → 1 段说明 → 表格 → 方法 → 阶段详解 → 进化表 → Changelog → FAQ；H2 "Full table" 改为 "PokeSurvivor Tier List: All Starters at a Glance"。

### 3.3 `/best-pokemon/`

评分 6.3（part-en-1，全站最低）。目标词：pokesurvivor best pokemon、pokesurvivor best starter。

- `en/best-pokemon.md` 中 "best pokemon" 出现 0 次，只在 slug 和导航锚文本里有；"best starter" 只在 title 和 FAQ 中出现（2 次）。
- H1 "Best First Partner in PokeSurvivor" 用的是 "partner"，不是用户的搜索用词；首 100 词和 description 都没有目标词，也没有 CTA。
- 笔误："from second one"（第 23 行）应为 "from the first second"。
- FAQ 讲到了合作，却没有链接 `/co-op/`；没有 itch.io；没有实测。

改写建议（part-en-1 P0-3）：
- Title：`Best Starter in PokeSurvivor: Which Pokémon to Pick First`（57 字符）
- Meta：`Best starter in PokeSurvivor: compare the 29 first partners by starting move, see our 3 beginner picks and the fast or tanky options. Pick yours in 2 minutes.`（158 字符）
- H1：`PokeSurvivor Best Starter: Best First Pokémon to Pick`（53 字符，本报告计数）
- 首句以 "The best starter in PokeSurvivor for most new players is a Water Gun user such as Mudkip or Sobble." 开头；H2 "Our picks for a first run" 改为 "Best Starter Pokémon for Beginners: Our 3 Picks"。

### 3.4 `/how-to-play/`

评分 7.3（part-en-2）。目标词：how to play pokesurvivor。

- 首段（md 第 19 行）没有完整的目标短语。
- 进化表里 "Razor Leaf → Leaf Storm (Reflexes)" 和 "Confusion → Psyshock (Reflexes)"（第 56–57 行）不在规范已核实的例子里。
- 缺规范大纲中的 "Meowth with coins"；缺 itch.io；没有截图；/co-op/ 正文没有链到本页。
- 可选：把小节内的 "Our tips" 升级为 H3；"Max level and evolution" 改为 "How move evolution works (level 5 + upgrade card)"。

改写建议：
- Title：保持 `How to Play PokeSurvivor: First 10-Minute Run Guide`（51 字符，分报告）。
- Meta：`How to play PokeSurvivor: your first 10-minute run, level-up card picks, move evolutions and the four enemy types. Start your first run here.`（分报告估约 150 字符，本报告计数 141）
- H1：保持 `How to Play PokeSurvivor: Your First 10-Minute Run`（50 字符，本报告计数）。首段前加一句快速答案："How to play PokeSurvivor in one sentence: you only move, your partner Pokémon attacks on its own."

### 3.5 `/co-op/`

评分 6.8（part-en-2）。目标词：pokesurvivor co-op / multiplayer。

- `en/co-op.md` 中 "multiplayer" 出现 0 次，而规范把它列为同等目标词；"Is PokeSurvivor multiplayer?" 这个 PAA 问题也没有。
- 正文约 326 词，偏薄；缺故障排查和有依据的组队建议（应链到 /tier-list/）。
- "Everyone levels together"（第 36 行）是从"XP 共享"推出来的，规范没有确认，应改为 "XP is shared"。
- 没有链到 /how-to-play/、/mobile/；H2 "Requirements" 不够具体。

改写建议（part-en-2）：
- Title：`PokeSurvivor Co-op & Multiplayer: Play with up to 4 Friends`（58 字符）
- Meta：`PokeSurvivor multiplayer explained: play online co-op with up to 4 friends. Add friends by nickname, join the host's room, share XP and revive teammates.`（分报告估约 155，本报告计数 153）
- H1：`PokeSurvivor Co-op: How to Play Multiplayer with up to 4 Friends`（64 字符，本报告计数）
- 新增 FAQ "Is PokeSurvivor multiplayer?"；"no PvP" 一句需要先核实，未核实就不写。

### 3.6 `/rifts/`

评分 7.1（part-en-2）。目标词：pokesurvivor rifts / legendaries。

- "legendaries" 不在 title 和 H1 里，只在正文中自然出现（约 16 次）。
- "Bosses use four telegraphed attacks and enrage at half health"（第 75 行）来自 news 2026-10-10 中关于 Boss 的描述，套用到裂隙传说是推断，需要注明。
- 场地表只有 Type / Arena 两列，规范要求的地形、示例传说、克制属性、技巧几列都没有。
- 缺 itch.io，也没有链到 /tier-list/；18 个场地适合配截图，目前 0 张。

改写建议（part-en-2）：
- Title：`PokeSurvivor Rifts & Legendaries: All 18 Arenas, How to Win`（59 字符）
- Meta：`PokeSurvivor rifts explained: when they appear (every 2.5 min), how to enter, ×10 ticket and bond rewards, all 18 type arenas and how to beat each legendary.`（分报告估约 158，本报告计数 157）
- H1：`PokeSurvivor Mysterious Rifts: Legendaries and All 18 Type Arenas`（65 字符，本报告计数）
- 表格扩成 Type | Arena | Terrain (our notes) | Example legendaries | Bring。示例传说只用规范里已有的配对（Kyogre、Groudon、Regice、Darkrai、Rayquaza），其他格子写 "—"。

### 3.7 `/mobile/`

评分 7.0（part-en-2）。目标词：pokesurvivor mobile / iphone / android / app。

- title 和 H1 都缺 iPhone、Android、app；H1 "PokeSurvivor on Mobile" 太短。
- "iPhone / iPad (Safari)" 和 "Android (Chrome)" 用的是粗体，应改为 H3。
- "Is there a PokeSurvivor app?" 只在 FAQ 里回答，应升为 H2，同时承接 "app / apk" 查询（措辞保持"据我们所知"）。
- 正文入链最少（见 2.7）；没有横屏界面和"加到主屏幕"的截图；卡顿 FAQ 要先核实设置项再写。

改写建议（part-en-2）：
- Title：`PokeSurvivor Mobile: Play on iPhone & Android (No App)`（55 字符）
- Meta：基本保留现有的 145 字符版本，可以加 CTA，但要控制在 160 字符以内。
- H1：`PokeSurvivor Mobile: Play on iPhone and Android in Your Browser`（63 字符，本报告计数）

### 3.8 `/zh/`（中文首页）

评分 7.5（part-zh）。

- title「寶可夢倖存者中文玩法与操作」繁简混用（见第 4.3 节）。
- 首段没有 PokeSurvivor 或任何中文名；"poke survivor 中文"全页不存在；"宝可梦幸存者"只在 description 中出现一次。
- 没有"操作方式"H2；首页和 how-to-play 都用"攻略"，存在蚕食。
- "本站和官方站…"一节称"宝可梦和招式名都用官方中文译名"，而 rifts 的场地名是本站意译；又称与英文站"共用同一份强度榜数据"，但 zh 强度榜缺少逐档理由。

改写建议（part-zh，字符数为本报告计数）：
- Title：`PokeSurvivor 中文攻略｜宝可梦幸存者免下载在线玩法与操作`（34 字符，约 27.5 全角）
- Meta：`PokeSurvivor（宝可梦幸存者）中文攻略：免下载在线玩，只需走位，伙伴自动攻击。附英文界面中文对照表、开局教学、强度榜和手机玩法。`（69 字符）
- H1：`PokeSurvivor 中文攻略：宝可梦幸存者（寶可夢倖存者）在线玩`（35 字符）
- 新增 H2 `PokeSurvivor 操作方式（电脑与手机）`。

### 3.9 `/zh/tier-list/`

评分 6.6（part-zh）。

- 主表（TierTable）没有自己的标题，DOM 中挂在「招式进化参考」H2 之下。
- 前/中/后期 H2 只有泛泛的思路，没有名单和逐档理由；FAQ「各档的简评写在表格里」与页面事实不符，并且进入了 FAQPage JSON-LD。
- 缺 Leaf Storm / Psyshock 两条和进化数值；缺更新记录和 4 只未评级伙伴（杰尼龟、可达鸭、波加曼、哈力栗）的说明。
- 「（本站版）」占用了标题空间；缺"排行""T0""最强"等常用说法。

改写建议：
- Title：`PokeSurvivor 强度榜｜宝可梦幸存者前中后期伙伴 Tier 排行`（37 字符，约 27.5 全角）
- Meta：`PokeSurvivor 强度榜：本站实测的伙伴评级，按前期、中期、后期分 S/A/B/C 四档，附每档理由、招式进化路线和更新记录。非官方排名。`（73 字符）。注意："本站实测"目前不成立（EN 页面也没有实测），在补上实测之前改为"本站评估"。
- H1：`PokeSurvivor 强度榜（Tier List）：前中后期最强伙伴排行`（38 字符）
- 在「怎么看这张表」后插入 `## 完整强度榜（2026-10-14 更新）`。

### 3.10 `/zh/best-pokemon/`

评分 6.9（part-zh）。

- title 和 H1 里没有"宝可梦""御三家""开局"；导航叫"最强宝可梦"，页面里却没有这个词。
- 推荐顺序与 EN 和 zh 强度榜冲突（见第 4.2 节）。
- 飞叶快刀、念力的进化标为"本站尚未确认"，而 EN 已经写明；缺 EN 表格的"招式效果"列。
- 只链到 tier-list 和 how-to-play。

改写建议：
- Title：`PokeSurvivor 开局选哪只？新手御三家伙伴推荐与培养`（31 字符，约 24.5 全角）
- Meta：`PokeSurvivor 开局选哪只伙伴？性格测验怎么用、29 只可选伙伴的初始招式对比、本站推荐的 3 只新手伙伴，以及金币该投给谁。`（68 字符）
- H1：`PokeSurvivor 开局选哪只：新手御三家与第一只伙伴推荐`（32 字符）

### 3.11 `/zh/how-to-play/`

评分 7.6（part-zh）。

- H1 用"新手攻略"，与首页撞词；缺"教程 / 入门"的说法（只有 description 里有）。
- 缺"喵喵掉金币"；进化表缺 Razor Leaf / Confusion 两条。
- 可以链到首页术语表和 co-op。

改写建议：
- Title：`PokeSurvivor 怎么玩｜新手入门教程：第一局前 10 分钟`（34 字符，约 25.5 全角）
- Meta：`PokeSurvivor 新手教程：游客与账号的区别、前几分钟怎么走位、升级三选一卡片怎么挑、招式满级进化、四类特殊敌人和地图机关。`（66 字符）
- H1：`PokeSurvivor 怎么玩：新手教程，第一局前 10 分钟`（32 字符）

### 3.12 `/zh/co-op/`

评分 7.9（part-zh，ZH 最高）。

- "联机"不在 H1 里；"双人 / 组队 / 怎么加好友"只出现在正文；标题还有约 10 个全角的余量。
- 只链到 rifts 和 tier-list，缺 best-pokemon、mobile、how-to-play。
- 回答了"本地同屏"，这是加分项；组队思路比 EN 略少。

改写建议：
- Title：`PokeSurvivor 联机教程｜多人合作最多 4 人，怎么加好友`（34 字符，约 26 全角）
- Meta：`PokeSurvivor 怎么和朋友联机：最多 4 人，仅在线版支持。登录、加好友、邀请进房间的步骤，以及共享经验、复活队友和隐私提醒。`（68 字符）
- H1：`PokeSurvivor 联机教程：最多 4 人多人合作`（28 字符）

### 3.13 `/zh/rifts/`

评分 7.8（part-zh）。

- 全页没有"神兽"，title 只写"传说"而不是"传说宝可梦"。
- description 82 字符，全站最长，建议压到 75 字符左右。
- 缺 EN 的「Strategy by arena group」和「Rifts in co-op」，按场地给的克制建议明显更薄；对照表没有"推荐属性"列。
- 18 个场地中英对照并标注"本站意译"，是原创价值点。

改写建议：
- Title：`PokeSurvivor 神秘裂隙攻略｜18 个场地与传说宝可梦打法`（34 字符，约 26 全角）
- Meta：`PokeSurvivor 神秘裂隙（Mysterious Rift）怎么进、打赢拿什么、18 个属性场地中英对照，以及单挑传说宝可梦（神兽）的打法。`（74 字符）
- H1：`PokeSurvivor 神秘裂隙攻略：18 个属性场地与传说宝可梦`（34 字符）

### 3.14 `/zh/mobile/`

评分 7.4（part-zh）。

- title「中文手機版怎么玩」和正文首句「手機上用浏览器打开」繁简混写。
- 品牌写法不统一：title 用 "Poke Survivor"，H1 和描述用 "PokeSurvivor"。
- 缺规范要求的 FAQ「手机卡顿怎么办（自动画质）」，需要先核实设置项名称。
- 内容本身质量高（iOS / 安卓步骤、iPhone 修复日期、假冒 App 警告）；这是繁体关键词最集中的页面，最适合作为 `/zh-hant/` 的第一批页面。

改写建议：
- Title：`PokeSurvivor 手机版怎么玩｜Poke Survivor 中文手机教学`（40 字符，约 26.5 全角）
- Meta：`PokeSurvivor 手机怎么玩：手机浏览器直接打开、横屏、拖动移动、点击切换招式，iPhone 和安卓添加到主屏幕的步骤。没有官方 App。`（73 字符）
- H1：`PokeSurvivor 手机版怎么玩（iPhone / 安卓）`（32 字符）

## 4. 内容准确性与一致性

### 4.1 规范中未核实的招式数值

规范 §2 / §3 只核实了 Ember → Fire Blast（×1.8，+2 projectiles，+2 pierce），以及 Bubble → Surf（Sprint）、Water Gun → Scald（Power）、Vine Whip → Power Whip（Power）对应的卡牌，外加 Tackle。页面上还写了下面这些内容，可能来自官方 /en/moves/，但规范里没有记录：

| 内容 | 出现位置 |
|---|---|
| Scald ×1.8 / +2 / +2；Power Whip ×1.9 与 360°；Surf +6 projectiles ×1.6 | `en/tier-list.md:42-61` |
| Razor Leaf → Leaf Storm（Reflexes）×1.8；Confusion → Psyshock（Reflexes） | `en/tier-list.md`、`en/how-to-play.md:56-57`、`en/best-pokemon.md` |
| "Ember targets the nearest enemy one fireball at a time" | `en/tier-list.md` |
| Boss 四招预警、半血狂暴套用到裂隙传说 | `en/rifts.md:75` |
| co-op "Everyone levels together" | `en/co-op.md:36` |

处理方法：对照官方 moves 页核实后补进规范，并写上来源和"last checked"日期；核实之前改成不确定的措辞，或者删掉。ZH 三页目前写的是"本站尚未确认"，核实后再和 EN 同步。

### 4.2 EN / ZH 冲突

| 主题 | EN | ZH | 统一方向 |
|---|---|---|---|
| 新手推荐顺序 | Mudkip / Sobble（水枪）→ 藤鞭系 → Scorbunny | 炎兔儿 → 水跃鱼 / 泪眼蜥 → 呆火鳄（没提藤鞭系） | 以 EN 和强度榜为准：水跃鱼 / 泪眼蜥 → 藤鞭系（妙蛙种子、菊草叶、草苗龟、敲音猴）→ 炎兔儿；呆火鳄放进"想要更肉"。ZH 强度榜前期 S 档也是水跃鱼和泪眼蜥，所以 zh best-pokemon 与 zh 强度榜之间同样矛盾 |
| Leaf Storm / Psyshock | 写明需要 Reflexes | "本站尚未确认" | 先按 4.1 核实，再让两边一致 |
| 强度榜理由 | 前/中/后期 H2 里有逐档名单 | 只说"简评写在表格里"（不成立） | ZH 补名单和理由，或把理由做成表格中的可见文本（2.8） |
| 强度榜更新记录 | 有 Changelog，说明 25/29 | 没有 | ZH 加「更新记录」 |
| 实测披露 | 只有纸面数据 | 描述建议写"本站实测" | 两边都只写"评估"，直到真正做了实测（part-en-1 P1-6） |

### 4.3 繁简混写

ZH 正文是简体，每个文件只有 1–4 处繁体，都是"寶可夢倖存者"这类关键词。真正的问题是简体句子里夹着繁体字：

- `/zh/` title：「寶可夢倖存者中文玩法**与**操作」
- `/zh/mobile/` title：「中文**手機**版**怎么**玩」；正文：「**手機**上用浏览器打开」

规则：繁体名只以括号别名形式出现一次，例如「宝可梦幸存者（寶可夢倖存者）」。Google 对繁简有一定的同义映射，硬塞繁体的收益很小，可读性损失明显。繁体用户的需求留给以后的 `/zh-hant/` 版本（见 2.3）。

## 5. 关键词蚕食

| 页面对 | 争夺的词 | 风险 | 处理方法 |
|---|---|---|---|
| `/` ↔ `/mobile/` | phone / mobile、加到主屏幕 | 中 | 首页只保留一句，用锚文本 "PokeSurvivor on mobile" 链到 /mobile/，不在首页展开步骤 |
| `/` ↔ `/how-to-play/` | how to play pokesurvivor、操作 | 中 | 首页 Controls 末尾加 "Full walkthrough: how to play PokeSurvivor"；首页不用含 "how to play" 精确短语的 H2 |
| `/` ↔ `/co-op/` | co-op | 低 | 现状（首页摘要 + 链接）是正确的枢纽结构，保持 |
| `/tier-list/` ↔ `/best-pokemon/` | best / starter | 中 | tier-list 拥有 "tier list / ranking"（title 去掉 "Best Partners"，见 3.2）；best-pokemon 拥有 "best starter / best pokemon"；导航改为 "Best Starter" |
| `/how-to-play/` ↔ `/tier-list/` | move evolution | 低–中 | 完整进化表放在 how-to-play，tier-list 只引用 2–3 条并链过去 |
| `/how-to-play/` ↔ `/rifts/` | rifts | 低 | how-to-play 保持摘要和链接，不放场地表 |
| `/co-op/` ↔ `/best-pokemon/` ↔ `/tier-list/` | co-op team | 低 | co-op 扩写组队建议时链到 tier-list，不自己做排名 |
| `/rifts/` ↔ 官方 /en/legendaries/ | legendaries | 外部 | 不复制 87 只传说的列表，定位为"场地 + 打法" |
| `/zh/` ↔ `/zh/how-to-play/` | pokesurvivor 攻略 | 中 | 首页拥有"中文攻略 / 在线玩"；how-to-play 拥有"怎么玩 / 新手教程"，H1 去掉"攻略" |
| `/zh/tier-list/` ↔ `/zh/best-pokemon/` | 最强 / 推荐 | 中 | 强度榜拥有"强度榜 / 排行 / 最强"；best-pokemon 拥有"开局 / 御三家 / 新手推荐"；导航"最强宝可梦"改为"开局选择" |
| `/zh/` ↔ `/zh/mobile/` | 手机 | 低 | 首页篇幅短并且已链过去，保持 |
| EN ↔ ZH 同名页 | — | 无 | 不同语言 + hreflang 双向互指 + 各自 canonical |

## 6. 合并优先级清单

### P0（上线前必须完成）

| ID | 文件 | 改动 | 预期效果 |
|---|---|---|---|
| P0-1 | `astro.config.mjs:6` | 改为正式域名，加构建守卫拒绝 `example.com`；重建后抽查 robots.txt、sitemap-0.xml 和 canonical | canonical、hreflang、sitemap、OG 生效，页面能被正确收录 |
| P0-2 | `wrangler.jsonc` | `"workers_dev": false`、`"preview_urls": false`，绑定自定义域名，www/apex 二选一 301 | 消除整站重复副本 |
| P0-3 | `src/content/pages/en/best-pokemon.md` | 按 3.3 改 title、meta、H1、首句和 H2，补上 "best starter / best Pokémon"；修正笔误 "from second one" | 填补核心词缺口（目前 0 次） |
| P0-4 | `src/content/pages/en/co-op.md` | 按 3.5 在 title、H1、meta 和新 FAQ 中加入 "multiplayer" | 覆盖规范指定的同等目标词 |
| P0-5 | `src/pages/tier-list.astro`、`src/pages/zh/tier-list.astro`、`en/tier-list.md` | EN/ZH 都把主表移到首段之后；EN 的 H2 改为 "PokeSurvivor Tier List: All Starters at a Glance"，ZH 加 `## 完整强度榜（2026-10-14 更新）`；删除重复的 "Last updated"；EN 首段注明 "25 of the 29 ... (4 are left out because their starting move isn't confirmed)" | 匹配 "tier list" 意图，有机会拿到精选摘要，预期更清楚 |
| P0-6 | `zh/best-pokemon.md` | 推荐顺序改为水跃鱼 / 泪眼蜥 → 藤鞭系 → 炎兔儿 | 消除 EN/ZH、ZH 页面之间的事实冲突 |
| P0-7 | `zh/tier-list.md` | 修正 FAQ「简评写在表格里」（补逐档理由，或在 P1-3 后让表格真的有简评） | 去掉 JSON-LD 中与页面不符的陈述 |
| P0-8 | `zh/home.md`、`zh/mobile.md` | 清除简体句子中的繁体字，繁体名只以括号别名形式出现 | 本地化质量，标题可读性 |

### P1（上线后 1–2 周）

| ID | 文件 | 改动 | 预期效果 |
|---|---|---|---|
| P1-1 | `src/components/JsonLd.astro:59` | `.replace(/</g, '\\u003c')` | 让 `</script>` 注入防护真正生效 |
| P1-2 | `src/i18n.ts:63-64, 90-91`、`src/components/Footer.astro` | 按规范 §6 改写声明（Creatures Inc.、jpter78、官方站说明）；页脚加官网、itch.io、About、Privacy 链接 | 满足规范 §6，14 页都链到 itch.io（目前只有 5 页），提升信任度 |
| P1-3 | `src/components/TierTable.astro:37`、tier-list 页 | 理由改为可见文本，传入 `<caption>` | 75 条理由可被看到和索引，移动端可用 |
| P1-4 | `GameEmbed.astro:24-33`、`HomePage.astro:35` | iframe 改为点击加载，至少窄屏不加载；首页 preconnect | 减少首屏带宽争抢，降低 INP/TBT 风险 |
| P1-5 | `src/pages/`（新增）、`i18n.ts` ROUTES | 新增 /about/、/privacy/ 及 /zh/ 对应页，放在页脚 | E-E-A-T，iframe 隐私说明 |
| P1-6 | `JsonLd.astro:24-35`、`content.config.ts` | Article 加 author、image、datePublished、publisher.logo；增加 `published` 字段 | 满足 Article 推荐属性 |
| P1-7 | `en/tier-list.md`、`en/best-pokemon.md`、`en/how-to-play.md`、`en/rifts.md`、`en/co-op.md`、`docs/content-spec.md` | 按 4.1 核实未核实数值，补进规范并标注日期；rifts 第 75 行注明推断；co-op 第 36 行改为 "XP is shared" | 准确性，E-E-A-T |
| P1-8 | `en/tier-list.md`、`en/best-pokemon.md` | 补实测（"Tested in N runs"、S 档的实战观察），或在规范中去掉这一要求；补 type coverage / co-op fit 两项标准 | 符合规范 §3、§7 |
| P1-9 | `en/tier-list.md`、`en/rifts.md`、`en/mobile.md`、`en/home.md` | 按 3.1、3.2、3.6、3.7 改 title/meta/H1；rifts 场地表扩为 5 列；mobile 平台小标题改为 H3、新增 app H2 | 时效信号，覆盖 legendaries / iPhone / Android / app |
| P1-10 | `zh/*.md`（7 页） | 按 3.8–3.14 改 title/meta/H1；补 Leaf Storm / Psyshock、rifts「各场地克制建议」、best-pokemon 招式效果列、tier-list 更新记录和 4 只未评级说明；加入"神兽""御三家""开局""操作方式"H2 | ZH 内容追平 EN，覆盖推断出的查询 |
| P1-11 | `src/i18n.ts:44, 71` | 导航 "Best Pokémon" / "最强宝可梦" 改为 "Best Starter" / "开局选择"；zh how-to-play 的 H1 去掉"攻略" | 消除蚕食（第 5 节） |
| P1-12 | 各页正文 | 每页 2–3 张自截图，写描述性 alt | E-E-A-T、图片搜索、Article 配图 |
| P1-13 | `docs/content-spec.md` §8 | 写明 hreflang 用 `zh-Hans`（与简体正文一致），/mobile/ 已有 EN 页 | 消除规范与实现的冲突 |

### P2（有余力再做）

| ID | 文件 | 改动 | 预期效果 |
|---|---|---|---|
| P2-1 | `BaseLayout.astro:49-59` | og:image 宽高和 alt、twitter:title/description/image、article:modified_time；noindex 页不输出 og:url；以后每页一张 OG 图 | 分享卡片更稳 |
| P2-2 | `astro.config.mjs:22-28` | sitemap 加 lastmod（取 `updated`）和 x-default | sitemap 与 HTML 信号一致 |
| P2-3 | `JsonLd.astro` | WebSite 统一 `url: site.href`，加 alternateName；首页加 VideoGame；首页显示 last updated | 站点名称与品牌识别 |
| P2-4 | 正文链接 | 补 2.7 中缺失的内链；"Play on this site" 改为含关键词的锚文本；首页 FAQ 的 /mobile/ 做成链接（同步 JSON-LD）；面包屑用短名 | 内链权重分配，mobile 页入链 |
| P2-5 | `public/`、`BaseLayout.astro:46` | 加 favicon.ico、apple-touch-icon | 减少 404 请求，iOS 主屏图标 |
| P2-6 | `zh/rifts.md`、`zh/tier-list.md` | rifts 描述压到 75 字符以内；去掉"（本站版）" | 减少截断 |
| P2-7 | `en/how-to-play.md`、`zh/how-to-play.md`、`*/mobile.md` | 补 Meowth 金币、快速答案段、手机卡顿 FAQ（先核实） | 补齐规范大纲，争取精选摘要 |
| P2-8 | `BaseLayout.astro:63`、`Header.astro` | skip-link 改用 `UI[locale].skip`；导航 aria-label 改为 "Main/主导航"；可选 `inlineStylesheets`，宽屏导航 SSR 时展开 | 可访问性，轻微 CLS |
| P2-9 | 新增 `/zh-hant/` | 先做首页和 mobile，台湾用语，`hreflang="zh-Hant"`、`og:locale=zh_TW`，三方互指；需要改 `i18n.ts` 的 Locale/LANG_TAG/ROUTES/LOCALE_LABEL 和 `BaseLayout.astro` 写死的 ogLocale | 覆盖港台繁体用户（part-zh 推荐方向，按资源决定） |

## 7. 未验证事项 / 需要线上检查

- **Cloudflare 尾斜杠重定向**：`astro.config.mjs:12` 注释称 307。上线后用 `curl -I https://<域名>/tier-list` 确认是 307 还是 301；如果是 307，影响很小（有 canonical 兜底），但最好改成 301。
- **404 状态码**：wrangler `not_found_handling: "404-page"` 应以 404 状态返回 `dist/404.html`，需要线上确认不是 200（软 404）。同时确认 workers.dev 是否已经关闭。
- **iframe 体积与 LCP/INP**：游戏 JS、精灵图、音频、Firebase 的实际传输量没有测过，需要用 Lighthouse 或真机（移动端）测量 P1-4 改动前后的差异。
- **ZH 关键词**：第 3.8–3.14 节的目标查询都是推断出来的，没有搜索量数据。上线后用 Search Console 的"查询"维度验证，按实际展示量调整标题。
- **OG 图内容**：`og-default.png` 只确认了 1200×630、3.6 KB，体积小，可能是纯色图，需要肉眼确认画面，并确认没有使用官方宝可梦美术。
- **FAQ 富结果**：按 2023 年政策推断不会展示，未实测。
- **像素宽度**：标题是否截断只按字符数估算，没有用 SERP 预览工具做像素测量。

## 附录：分报告

- [part-en-1.md](./part-en-1.md)：`/`、`/tier-list/`、`/best-pokemon/` 的逐维度评分和证据
- [part-en-2.md](./part-en-2.md)：`/how-to-play/`、`/co-op/`、`/rifts/`、`/mobile/` 的逐维度评分、EN 蚕食表
- [part-zh.md](./part-zh.md)：7 个 ZH 页面的评分、hreflang 方案、繁体版改写稿、ZH 改写汇总表
- [part-sitewide.md](./part-sitewide.md)：全站技术审计，含修复代码（构建守卫、OG/Twitter、JSON-LD、页脚、sitemap serialize）和内链矩阵
