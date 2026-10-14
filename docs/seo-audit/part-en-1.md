# On-page SEO 审计（EN 第 1 部分）：`/`、`/tier-list/`、`/best-pokemon/`

审计日期：2026-10-14。依据：`docs/content-spec.md`（以下简称"spec"）、`src/content/pages/en/*.md`、`src/data/tiers.ts`、`src/components/*.astro`，以及构建产物 `dist/<route>/index.html`。字数为 `<main>` 内可见文本粗略词数（含导航外的按钮文字）。

全站共性问题（各页不再重复）：
- `astro.config.mjs` 中 `SITE = 'https://pokesurvivor.example.com'` 为占位域名，canonical、hreflang、og:url、sitemap、robots.txt 中的 Sitemap 全部指向 example.com。上线前必须替换。
- 三页均无任何 `<img>`；OG 图三页共用 `/og-default.png`（1200×630，尺寸合格），无 `og:image:alt`、`og:image:width/height`，无页面专属分享图。
- hreflang 输出 `zh-Hans`、`og:locale:alternate` 为 `zh_CN`，而 spec 第 8 节建议 `zh-Hant`（关键词为繁体）。实现选择了简体中文（`tiers.ts` 中文名为简体，语言切换显示"简体中文"）。两者需统一：要么改 spec，要么改实现。hreflang 双向、自引用、`x-default`=EN，均正确。
- Twitter 只输出 `twitter:card=summary_large_image`，其余依赖 OG 回退，可接受。
- 页脚免责声明（`src/i18n` `disclaimer`）与 spec 第 6 节不一致：缺少 "Creatures Inc."、开发者名 "jpter78"，以及 "The game is played on its official site, pokesurvivor.com"。页脚没有官网和 itch.io 链接。
- spec 全局规则"每页链接官网和 itch.io"：`/tier-list/` 与 `/best-pokemon/` 没有 itch.io 链接（只有首页正文有）。
- FAQPage：可见 FAQ（`Faq.astro` 的 `<details>`）与 JSON-LD 文本一致，结构正确。但 Google 自 2023 年 8 月起只对权威政府、医疗站点展示 FAQ 富结果，本站基本不会获得 FAQ 富摘要。保留无害，但不要把它当作流量来源。
- Article JSON-LD（`JsonLd.astro`）缺少 `author`、`image`、`datePublished`；`publisher` 没有 `logo`。

---

## 1. 首页 `/`（en/home.md → HomePage.astro）

目标关键词（spec §7）：poke survivor、pokesurvivor、pokesurvivor game、play pokesurvivor online、pokemon survivor。

| 维度 | 分数 | 要点 |
|---|---|---|
| 1 搜索意图与关键词 | 8 | 意图（"直接玩"）匹配：H1 下方即 iframe。"Poke Survivor"/"PokeSurvivor" 出现在 title、H1、H2 中。"pokemon survivor" 只出现在 FAQ 问题里 |
| 2 Title | 9 | 57 字符，品牌词前置，含 Online/Free/No Download |
| 3 Meta description | 7 | 146 字符，含关键词；没有明确的行动号召 |
| 4 标题层级 | 9 | 单一 H1，5 个 H2 加 FAQ，结构与 spec 一致 |
| 5 内容质量 | 7 | 约 534 词，适合落地页；事实与 spec 一致；首段没有出现品牌词；没有截图或"我们实测"信号 |
| 6 链接 | 8 | 链接到全部 6 个指南和 /zh/；有官网、itch.io、官方 guide 链接；FAQ 中 "/mobile/" 是纯文本，不是链接 |
| 7 媒体 | 6 | iframe 有 `title`，有 `aspect-ratio`（桌面 16/9、窄屏 4/3），避免 CLS；首屏为 eager 加载，合理；没有任何截图；"Open game in a new tab" 渲染两次（移动和桌面各一个，由 CSS 控制显示），可接受 |
| 8 结构化数据 | 6 | WebSite 加 FAQPage 正确；FAQ 富结果基本不可得；WebSite 没有 `publisher`、`alternateName`（如 "Poke Survivor"） |
| 9 Canonical/hreflang/OG | 7 | 自引用 canonical；en/zh-Hans/x-default；og:type=website；域名是占位符 |
| 10 SERP 机会 | 6 | 操作表格可争取表格摘要；"How to start" 步骤列表缺失 |

证据与问题：
- 首屏 100 词：`Play Poke Survivor Online / A free, fan-made Pokémon survivors-like you can play right here...`。H1 之后首段没有出现 "PokeSurvivor"，品牌词在 "What is PokeSurvivor?" 才第一次出现在正文中（home.md 第 19 行）。
- "pokemon survivor" 变体只在 FAQ 第 2 问（home.md 第 9 行）出现。这是 spec 列出的关键词，而且是需要澄清的同名游戏查询。
- FAQ "Does it work on my phone?" 的答案 "See /mobile/ for setup"（第 14 行）在可见 FAQ 中是纯文本路径，不是链接，用户体验和内链价值都受损。
- 事实核对：966 只、9 地区、四种敌人性格、18 个裂隙竞技场、最多 4 人合作、离线 zip 仅单人，均与 spec §2 一致。iframe 附近的 "If login or co-op doesn't work inside this frame..." 符合 spec §1 要求。
- iframe `title="PokeSurvivor game"`，spec 示例为 "Play PokeSurvivor"，两者都可以。

---

## 2. `/tier-list/`（en/tier-list.md + tiers.ts + TierTable.astro）

目标关键词：pokesurvivor tier list。

| 维度 | 分数 | 要点 |
|---|---|---|
| 1 搜索意图与关键词 | 6 | 关键词出现在 title、H1、URL、首句；但用户想要的"等级表"放在页面最底部 |
| 2 Title | 8 | 51 字符，关键词前置；"Best Partners" 与 /best-pokemon/ 意图重叠 |
| 3 Meta description | 8 | 147 字符，含关键词、方法和日期；没有 CTA |
| 4 标题层级 | 6 | 单一 H1；H2 "Full table" 描述性差，而且排在 "Changelog" 之后 |
| 5 内容质量 | 6 | 约 1005 词，方法透明；但 spec 要求"tested in N runs"，页面没有任何实测；部分数值超出 spec 已核实范围；首段"29"与实际排名的 25 只自相矛盾 |
| 6 链接 | 7 | 链接到 /best-pokemon/、/rifts/、/how-to-play/、/co-op/、官方 moves 页；没有 itch.io |
| 7 媒体 | 4 | 没有图片或精灵图；表格靠 `title` 悬停显示信息，移动端和读屏用户看不到 |
| 8 结构化数据 | 7 | Article、FAQPage、BreadcrumbList 正确；Article 缺 author/image/datePublished |
| 9 Canonical/hreflang/OG | 8 | 正确（占位域名除外）；og:type=article |
| 10 SERP 机会 | 6 | 进化表适合表格摘要；等级表在底部，削弱了"tier list"类精选摘要的机会 |

证据与问题：
- **主表位置（P0）**：渲染顺序为 How we rank → Early → Mid → Late → Move evolutions → Changelog → **Full table**（dist 第 179 行的 H2）。搜索 "tier list" 的用户要的是首屏的 S/A/B/C 表。"Last updated" 也渲染了两次（dist 第 82 行和第 182 行）。
- **数量矛盾**：首段 "This is our PokeSurvivor tier list for the 29 starter partners"（tier-list.md 第 19 行），但 changelog 写的是 "25 of 29 starters ranked"（第 67 行），`tiers.ts` 实际 25 行。
- **E-E-A-T 与 spec 不符**：spec §7 要求 "tested in N runs"，以及 §3 的 5 项标准（另含 type coverage 和 co-op fit）。页面只有 3 项标准，并明确写 "starting stats and moves ... plus our own assessment"，没有实战测试。spec §3 要求"Tier list must be our own tested ranking"。这会削弱"可信排名"的定位。
- **超出 spec 已核实范围的数值**：spec 只核实了 Ember→Fire Blast（×1.8，+2 projectiles，+2 pierce）和 Bubble→Surf（Sprint）、Water Gun→Scald（Power）、Vine Whip→Power Whip（Power）的卡牌对应。页面还声明了 Scald ×1.8/+2/+2、Power Whip ×1.9 与 360°、Surf +6 projectiles ×1.6、Razor Leaf→Leaf Storm（Reflexes）×1.8、Confusion→Psyshock（Reflexes）（第 42–61 行），以及 "Ember targets the nearest enemy one fireball at a time"。这些可能来自官方 moves 页，但 spec 中没有记录。需要补进 spec 并注明来源和日期，否则视同未核实。
- spec 标为 UNVERIFIED 的内容处理正确：shiny 是否影响属性（FAQ 写 "Not confirmed"）、Squirtle/Psyduck/Piplup/Chespin 未排名、"无社区共识"均已如实说明。
- H1 只有 "PokeSurvivor Tier List"；spec 要求附带最后更新和版本/新闻日期。Title 和 H1 中都没有时效信号（如 "Oct 2026"）。
- 与 /best-pokemon/ 的关键词蚕食：两页都只覆盖同样的 29 只初始宝可梦，title 中都有 "Best ..."。
- 表格可访问性：`<li title=...>` 的提示（TierTable.astro 第 37 行）在触屏设备上不可见，正文 "On desktop, hover a name..." 也承认了这一点。各阶段文字列表（Early 小节）已经覆盖了部分信息，但 Mid/Late 小节没有逐只列出等级。
- 文字与表格一致性已核对：Early S（Mudkip、Sobble）、A、B 列表与 `tiers.ts` 一致；Late 中 Froakie 升到 S、Slowpoke 为 C 也一致。

---

## 3. `/best-pokemon/`（en/best-pokemon.md）

目标关键词：pokesurvivor best pokemon、pokesurvivor best starter。

| 维度 | 分数 | 要点 |
|---|---|---|
| 1 搜索意图与关键词 | 4 | "best pokemon" 只出现在 URL slug 和导航锚文本中；title、H1、描述、正文都没有。"best starter" 只在 title 和 FAQ 中出现 |
| 2 Title | 7 | 54 字符，与 spec 一致；"Best Starter" 前置；缺 "Pokémon" |
| 3 Meta description | 5 | 134 字符；没有 "best starter" 或 "best Pokémon"；没有 CTA |
| 4 标题层级 | 7 | 单一 H1，4 个 H2 加 FAQ，逻辑清晰；H1 和 H2 都不含目标词 |
| 5 内容质量 | 7 | 约 659 词，范围克制（不重复排名，链接到 tier list），起始招式表有独特价值；推荐只基于纸面数据；有一处笔误 |
| 6 链接 | 7 | 链接到 /tier-list/、/rifts/、/how-to-play/、官方 moves 页；FAQ 提到合作，但没有链接 /co-op/；没有 itch.io |
| 7 媒体 | 4 | 没有图片；起始宝可梦很适合配自制截图 |
| 8 结构化数据 | 7 | Article、FAQPage、BreadcrumbList 正确；Article headline 与 H1 一致 |
| 9 Canonical/hreflang/OG | 8 | 正确（占位域名除外） |
| 10 SERP 机会 | 7 | "Pick by starting move" 表和编号推荐列表适合精选摘要；FAQ "What is the best starter for beginners?" 适合"People also ask" |

证据与问题：
- 关键词统计（main 文本）："best pokemon" 0 次，"best starter" 2 次（都在 FAQ 中）。H1 为 "Best First Partner in PokeSurvivor"（spec 原文如此），但"partner"不是用户搜索用词。首 100 词 "This page covers one decision: which partner to take on your first runs..." 没有目标词。
- 描述 "Which partner to pick first in PokeSurvivor: how the personality quiz works, the 29 starter pool, and our beginner picks by playstyle." 没有目标词，也没有行动号召。
- 笔误："since it's the one attack you'll have from second one"（第 23 行），应为 "from the first second"。
- 事实核对：29 只（27 + Psyduck + Slowpoke）、各起始招式分组、Scorbunny 1.09、Froakie 108、Fuecoco 100 HP、Slowpoke 110/84，均与 spec §3 一致。Squirtle 等 4 只按 UNVERIFIED 如实排除。Leaf Storm/Psyshock 需要 Reflexes 的说法同样不在 spec 中（见 tier list 页）。
- "Can I change my partner later?" 依据 spec [GH]，没问题。
- 推荐段 "These are our recommendations, not a community consensus" 的披露是好的，但没有实测，E-E-A-T 偏弱。

---

## 优先级修复清单

### P0
1. **替换占位域名**（`astro.config.mjs` 的 `SITE`）。否则 canonical、hreflang、sitemap 全部失效。
2. **/tier-list/：把等级总表移到首段之后**（H1 → 更新日期 → 1 段说明 → 表格 → 方法 → 阶段详解 → 进化表 → Changelog → FAQ），并删除重复的 "Last updated"。H2 "Full table" 改为 "PokeSurvivor Tier List: All Starters at a Glance"。
3. **/best-pokemon/：补齐目标关键词**：
   - Title：`Best Starter in PokeSurvivor: Which Pokémon to Pick First`（57 字符）
   - Meta：`Best starter in PokeSurvivor: compare the 29 first partners by starting move, see our 3 beginner picks and the fast or tanky options. Pick yours in 2 minutes.`（158 字符）
   - H1：`PokeSurvivor Best Starter: Best First Pokémon to Pick`
   - 首句：`The best starter in PokeSurvivor for most new players is a Water Gun user such as Mudkip or Sobble. This page covers one decision: ...`
   - H2 "Our picks for a first run" 改为 "Best Starter Pokémon for Beginners: Our 3 Picks"。
4. **/tier-list/ 数量矛盾**：首段改为 `This is our PokeSurvivor tier list for 25 of the 29 starter partners (4 are left out because their starting move isn't confirmed).`

### P1
5. **/tier-list/ 加入时效信号并区分意图**：
   - Title：`PokeSurvivor Tier List (Oct 2026): Starters by Game Phase`（57 字符）
   - Meta：`Our PokeSurvivor tier list ranks 25 starters for early, mid and late game by starting move, evolution and speed. Not official; updated 2026-10-14. See the table.`（161 字符，可删去 "See the table." 降到 147）
   - H1：`PokeSurvivor Tier List (Updated 2026-10-14)`
6. **补实测（E-E-A-T）**：在两页的方法段加入 "Tested in N runs on version/news date X"，以及每个 S 级的一句实战观察；补上 spec 的另外两项标准（type coverage、co-op fit），或在 spec 中删除它们。
7. **把超出 spec 的数值补进 spec 并标注来源**（Scald、Power Whip、Surf、Leaf Storm、Psyshock 的倍率和所需卡牌，Ember 的目标方式），并加上"last checked"日期；核实前不要以确定语气陈述。
8. **全站页脚**：按 spec §6 改写免责声明（加入 Creatures Inc.、jpter78、"played on its official site, pokesurvivor.com"），并在页脚放官网和 itch.io 链接，这样每页都能满足"链接官网和 itch.io"。
9. **首页**：
   - Meta：`Play Poke Survivor free in your browser, no download. A fan-made Pokémon survivors-like: you move, your partner attacks. Start a run now or read our guides.`（156 字符）
   - 首段以品牌词开头：`PokeSurvivor (also written Poke Survivor) is a free, fan-made Pokémon survivors-like you can play right here.`
   - 正文加一句 "pokemon survivor" 变体澄清，例如在 "What is PokeSurvivor?" 末尾：`Searching for "Pokemon Survivor"? This is the PokeSurvivor by jpter78 at pokesurvivor.com.`
   - Title 保持不变（57 字符，符合要求）。
10. **hreflang 语言标签与 spec 统一**（`zh-Hans` 对 `zh-Hant`），并同步 og:locale。
11. **TierTable 可访问性**：把 `title` 中的备注改为可见内容（如表格下方逐只说明，或用 `<details>`），让移动端和读屏用户也能看到。

### P2
12. 添加自制截图（游戏画面、等级表、起始宝可梦选择界面），带描述性 alt，例如 `alt="PokeSurvivor starter picker showing the 29 first partners"`；为 tier list 和 best-pokemon 制作专属 OG 图，并补充 `og:image:alt`。
13. Article JSON-LD 补充 `author`（Organization 或个人）、`datePublished`、`image`、`publisher.logo`；WebSite 补充 `alternateName: ["Poke Survivor", "PokeSurvivor game"]`。
14. 首页 FAQ 的 "/mobile/" 改为真实链接（同时更新 JSON-LD 文本，保持一致）；/best-pokemon/ 的合作 FAQ 链接到 /co-op/。
15. 修正 /best-pokemon/ 笔误 "from second one" → "from the first second"。
16. 首页可加一个 3 步 "How to start"（打开游戏 → 完成性格测验选伙伴 → 用 WASD 移动、自动攻击），争取列表摘要，并链接到 /how-to-play/。
17. 不要指望 FAQPage 带来富结果；保留即可，但不要为此堆砌 FAQ。
