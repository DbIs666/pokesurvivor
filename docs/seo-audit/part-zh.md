# PokeSurvivor 中文页 On-page SEO 审计（/zh/）

审计日期：2026-10-14。依据：`docs/content-spec.md`、`src/content/pages/zh|en/*.md`、`src/i18n.ts`、`src/layouts/BaseLayout.astro` / `PageLayout.astro`，以及构建产物 `dist/zh/**/index.html`（标题、描述、标题层级、JSON-LD、链接均从构建 HTML 中提取）。未做的事：没有查询真实搜索量，下文"可能的搜索词"是推断，需用 Google Search Console / 关键词工具验证。

## 0. 全站结论（先看这里）

- 语言标记与规范不一致：规范要求繁体写作 + `hreflang="zh-Hant"`；实现是简体正文 + `lang="zh-Hans"`、`hreflang="zh-Hans"`、`og:locale=zh_CN`。好消息是：标签和正文是**一致的**（正文确实是简体），所以当前不是"错误标注"，而是"受众选择"问题。
- 繁简混写是本站最明显的本地化问题：首页标题「寶可夢倖存者中文玩法**与**操作」、手机页标题「中文**手機**版**怎么**玩」、手机页正文「**手機**上用浏览器打开」，这些都是在简体句子里硬塞繁体词，读起来像错别字，对繁体和简体用户都不自然。
- 标题和描述长度普遍合格：标题 28–31 字符（约 20–23.5 个全角宽度，低于 30 全角 / ~580px 上限，还有 6–8 个全角的余量可以补关键词）；描述 71–82 字符，全部落在 70–80 左右的目标区间。
- 结构化数据完整：每个内页有 Article + FAQPage + BreadcrumbList，`inLanguage` 均为 `zh-Hans`，面包屑名称为中文，FAQPage 与页面可见 FAQ 同源（同一份 frontmatter），内容一致。
- 内链全部指向 /zh/ 页面（唯一指向 EN 的是首页「英文站」一条，有意为之），锚文本是描述性中文。
- 与 EN 页面不存在重复内容风险（不同语言 + hreflang 双向互指 + 各自 canonical）。真正的风险是 **zh 站内蚕食**：首页 vs 玩法攻略（都抢「攻略 / 怎么玩」），以及导航「最强宝可梦」（指向 best-pokemon）vs 强度榜（应拥有「最强 / 排行」意图）。
- 事实一致性有 3 处冲突（详见各页）：zh 新手推荐顺序与 EN 相反；zh 写「飞叶快刀 / 念力的进化本站尚未确认」而 EN 强度榜已写明 Leaf Storm / Psyshock（Reflexes）；zh 强度榜正文没有逐档理由，内容明显比 EN 薄。

### hreflang / og:locale 推荐（明确结论）

1. 受众判断：游戏托管在 GitHub Pages，依赖 Google 登录和 Firebase，本站也主要靠 Google 获取流量。中国大陆用户访问 Google 和 Firebase 都不稳定，百度也不读 hreflang。所以能通过 Google 搜到本站并且真能玩的中文用户，主要在台湾、香港、新马和海外华人。这个判断与规范用繁体关键词的思路一致。
2. **P0（立即）**：只要正文还是简体，就**保持 `zh-Hans` + `og:locale=zh_CN`**。千万不要只把标签改成 `zh-Hant` / `zh-TW` 而不改正文，那样会把简体页标给繁体用户，比现状更差。同时清除简体句子里混入的繁体字，繁体名只作为别名出现一次（例如「宝可梦幸存者（寶可夢倖存者）」）。
3. **P1（推荐方向）**：新增繁体版（台湾用语）作为第二套中文页，路径用 `/zh-hant/...` 或 `/zh-tw/...`，标 `hreflang="zh-Hant"`、`og:locale=zh_TW`；现有 /zh/ 保留为 `zh-Hans`、`zh_CN`。两套页面与 EN 三方互指，`x-default` 仍指 EN。用 OpenCC（s2twp）转换后人工校对台湾用语（帳號、設定、分頁、下載、連線、夥伴、手機、影片），宝可梦和招式名换成官方繁中名（小火龍、傑尼龜、大字爆炎……）。
4. 如果资源只够维护一套中文：在**一个工作周期内**整体转成繁体（台湾用语），并同步把 `LANG_TAG.zh` 改为 `zh-Hant`、`ogLocale` 改为 `zh_TW`、`LOCALE_LABEL` 改为「繁體中文」。不要长期停留在"标 zh-Hans、标题却写繁体关键词"的中间态。
5. 不建议用 `zh-CN` / `zh-TW` 这类地区码代替文字码，除非确实做了地区化（用语、货币、示例）。文字码 `zh-Hans` / `zh-Hant` 能覆盖港澳台新马，范围更合适。

### 总分一览（0–10）

| 页面 | 关键词 | 标题/描述长度 | 标题层级 | 内容与本地化 | 内链 | 结构化数据 | hreflang/locale | 重复/蚕食 | 平均 |
|---|---|---|---|---|---|---|---|---|---|
| /zh/ 首页 | 7 | 9 | 8 | 6 | 9 | 8 | 6 | 7 | 7.5 |
| /zh/tier-list/ | 6 | 9 | 5 | 5 | 8 | 8 | 6 | 6 | 6.6 |
| /zh/best-pokemon/ | 5 | 9 | 8 | 6 | 7 | 8 | 6 | 6 | 6.9 |
| /zh/how-to-play/ | 7 | 9 | 9 | 8 | 8 | 8 | 6 | 6 | 7.6 |
| /zh/co-op/ | 7 | 9 | 9 | 8 | 7 | 8 | 6 | 9 | 7.9 |
| /zh/rifts/ | 8 | 8 | 8 | 7 | 8 | 8 | 6 | 9 | 7.8 |
| /zh/mobile/ | 6 | 9 | 9 | 5 | 8 | 8 | 6 | 8 | 7.4 |

## 1. /zh/ 首页

现状（构建 HTML）：
- title：`PokeSurvivor 攻略｜寶可夢倖存者中文玩法与操作`（29 字符，约 22.5 全角）
- description：71 字符，包含 寶可夢倖存者／宝可梦幸存者、免下载、手机玩法
- H1：`PokeSurvivor（寶可夢倖存者）中文攻略`
- H2：PokeSurvivor 是什么 / 免下载，最多 4 人在线合作 / 中文玩家怎么上手 / 英文界面常用词对照 / 本站和官方站、英文站有什么不同 / 延伸阅读 / 常见问题
- JSON-LD：WebSite（inLanguage zh-Hans）+ FAQPage（5 问）。首页没有 BreadcrumbList（首页不需要）。

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 7 | 「PokeSurvivor 攻略」在 title 开头，「中文攻略」在 H1，寶可夢倖存者在 title、H1 和 FAQ 中都有。缺口：首段完全没有 PokeSurvivor 或任何中文名（只写了「免费的宝可梦同人割草游戏」）；「poke survivor 中文」（带空格）全页不存在；「宝可梦幸存者」只在 description 出现一次，正文、H2 都没有；H2 里没有任何关键词变体。 |
| 标题/描述长度 | 9 | 标题约 22.5 全角，留有余量；描述 71 字符，合格。 |
| 标题层级 | 8 | 单一 H1，H2 平铺且逻辑清楚。规范建议的「操作方式」H2 被并进了「中文玩家怎么上手」的列表，导致「PokeSurvivor 操作」这个查询没有对应的 H2。 |
| 内容与本地化 | 6 | 原生撰写，不是 EN 首页的直译（有中英术语对照表，正是规范要的差异点）。问题：标题「寶可夢倖存者中文玩法**与**操作」繁简混用；「本站和官方站…」一节写「宝可梦和招式名都用官方中文译名」，但 rifts 页的场地名是本站意译，表述要收窄；该节还写英文站「共用同一份强度榜数据」，但 zh 强度榜正文缺少 EN 的逐档理由，承诺不完全兑现。规范要求的 FAQ「是官方游戏吗」「要下载吗」「能联机吗」「有中文版吗」都有。 |
| 内链 | 9 | 链到全部 6 个 zh 子页，并且在正文和「延伸阅读」里各出现一次，锚文本都是中文描述（多人合作、第一只伙伴怎么选、新手玩法……）。外链到官方站和 itch.io。只有一条指向 `/`（锚文本「英文站」），属于有意为之。 |
| 结构化数据 | 8 | WebSite `inLanguage: zh-Hans`，与 html lang 一致。FAQPage 5 问和可见 FAQ 一字不差。可以考虑加 `VideoGame`（name、alternateName：寶可夢倖存者 / 宝可梦幸存者、url：pokesurvivor.com、gamePlatform: Web browser、`isAccessibleForFree: true`）作为额外信号。注意：Google 已大幅收紧 FAQ 富结果的展示范围，FAQPage 主要用于语义，不要期待富摘要。 |
| hreflang/locale | 6 | `en` ↔ `zh-Hans` 双向互指，自引用，x-default=EN，技术上正确。扣分原因：与规范的 zh-Hant 不一致，而且标题核心关键词用的是繁体，但页面被声明为简体（见第 0 节）。 |
| 重复/蚕食 | 7 | 与 EN 首页无重复风险。站内：首页 title 用「攻略」，how-to-play 的 title、H1 也用「攻略」，两页会竞争「pokesurvivor 攻略」。首页应拥有「攻略 / 中文 / 在线玩」，how-to-play 应拥有「怎么玩 / 新手教程」。 |

建议目标查询（推断）：pokesurvivor 攻略、pokesurvivor 中文、poke survivor 中文、宝可梦幸存者 / 寶可夢倖存者、宝可梦幸存者 在线玩、pokesurvivor 在线玩 免下载、宝可梦 割草游戏 网页版、poke survivor 怎么玩。

推荐改写（简体版，保持 zh-Hans 的前提下）：
- title：`PokeSurvivor 中文攻略｜宝可梦幸存者免下载在线玩法与操作`（34 字符，约 27.5 全角）
- description：`PokeSurvivor（宝可梦幸存者）中文攻略：免下载在线玩，只需走位，伙伴自动攻击。附英文界面中文对照表、开局教学、强度榜和手机玩法。`（69 字符）
- H1：`PokeSurvivor 中文攻略：宝可梦幸存者（寶可夢倖存者）在线玩`
- 首段改为：`PokeSurvivor（Poke Survivor，宝可梦幸存者）是免费的宝可梦同人割草游戏，打开网页就能玩……`，让 Poke Survivor、PokeSurvivor、中文名在第一句里都出现一次。
- 新增 H2：`PokeSurvivor 操作方式（电脑与手机）`，把现在列表里的按键说明移进去，做成表格。
- H2「英文界面常用词对照」改为 `PokeSurvivor 英文界面中文对照表`。

繁体版（如果走 P1 的 zh-Hant 路线）：
- title：`PokeSurvivor 中文攻略｜寶可夢倖存者免下載線上玩法與操作`
- description：`PokeSurvivor（寶可夢倖存者）中文攻略：免下載線上玩，只要走位，夥伴自動攻擊。附英文介面中文對照表、開局教學、強度榜與手機玩法。`
- H1：`PokeSurvivor（寶可夢倖存者）中文攻略`

## 2. /zh/tier-list/ 强度榜

现状：
- title：`PokeSurvivor 强度榜｜前中后期伙伴评级（本站版）`（30 字符，约 23.5 全角）
- description：76 字符
- H1：`PokeSurvivor 强度榜`
- H2：评级标准 / 怎么看这张表 / 前期思路 / 中期思路 / 后期思路 / 招式进化参考 / 常见问题；之后是 TierTable 组件生成的表格（没有 H2，只有一个"最后更新"）。

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 6 | 规范没有给 zh 强度榜指定关键词。「强度榜」在 title、H1 中都有。缺口：中文玩家常用的「排行」「节奏榜」「T0」「tier」「最强」都没有；中文名「宝可梦幸存者」只在正文第一句以繁体「寶可夢倖存者」出现。「（本站版）」浪费了标题空间，对搜索没有价值（非官方的说明在描述和正文里已经有了）。 |
| 标题/描述长度 | 9 | 都在目标区间内。 |
| 标题层级 | 5 | 最核心的内容（S/A/B/C 表）**没有自己的标题**，在 DOM 里排在「常见问题」H2 之前、正文最后一个 H2「招式进化参考」下面，等于被归到了「招式进化参考」小节里。EN 页面有「## Full table」H2，以及 Early/Mid/Late 三个带逐档名单的 H2；zh 的「前期思路」等 H2 只有泛泛的思路，没有名单。 |
| 内容与本地化 | 5 | 表格数据和 EN 一致（同一份 `src/data/tiers.ts`）：前期 S 档 水跃鱼、泪眼蜥，后期 S 档 呱呱泡蛙，呆呆兽后期 C 档。但正文有 3 个问题：(1) 没有逐档理由，只说"各档的简评写在表格里"，可是表格里只有宝可梦名，没有简评，FAQ「为什么某只宝可梦评级不高」的回答因此与页面不符；(2) EN 有 Razor Leaf → Leaf Storm、Confusion → Psyshock（都需要 Reflexes）以及进化的具体数值，zh 的「招式进化参考」缺这两条，并且没有数值；(3) 没有 EN 的「Changelog」（25/29 只已评级，4 只未评级的说明也缺失），读者不知道杰尼龟、可达鸭、波加曼、哈力栗为什么不在表里。行文本身是自然的简体中文，不是直译。 |
| 内链 | 8 | 链到 best-pokemon、rifts、how-to-play、co-op，锚文本清楚。可以在表格的宝可梦名上链到 best-pokemon 的对应段落。 |
| 结构化数据 | 8 | Article / FAQPage / BreadcrumbList 齐全；面包屑为「首页 › PokeSurvivor 强度榜」，中文。FAQPage 与可见内容一致，但「各档的简评写在表格里」这句答案与页面事实不符，属于结构化数据里的不准确陈述，需要先修正文再保留。 |
| hreflang/locale | 6 | 与首页相同（`/tier-list/` ↔ `/zh/tier-list/`，正确；语言码选择问题见第 0 节）。 |
| 重复/蚕食 | 6 | 与 EN 无风险。站内：导航把 best-pokemon 叫「最强宝可梦」，与强度榜争夺「pokesurvivor 最强 / 最强宝可梦」意图；首页、best-pokemon 也都写了"S/A/B/C""前中后期"。 |

建议目标查询（推断）：pokesurvivor 强度榜、pokesurvivor tier list 中文、pokesurvivor 排行、宝可梦幸存者 强度榜 / 节奏榜、pokesurvivor 最强伙伴、pokesurvivor T0。

推荐改写：
- title：`PokeSurvivor 强度榜｜宝可梦幸存者前中后期伙伴 Tier 排行`（37 字符，约 27.5 全角）
- description：`PokeSurvivor 强度榜：本站实测的伙伴评级，按前期、中期、后期分 S/A/B/C 四档，附每档理由、招式进化路线和更新记录。非官方排名。`（73 字符）
- H1：`PokeSurvivor 强度榜（Tier List）：前中后期最强伙伴排行`
- 结构：在「怎么看这张表」后插入 `## 完整强度榜（2026-10-14 更新）`，把 TierTable 放到这里；三个「思路」H2 改为 `## 前期 S/A/B/C 档（0–10 分钟）` 等，并补上 EN 的逐档名单和理由；「招式进化参考」补 Leaf Storm / Psyshock 和数值；末尾加 `## 更新记录`。

## 3. /zh/best-pokemon/ 第一只伙伴

现状：
- title：`PokeSurvivor 第一只伙伴怎么选｜新手开局推荐`（28 字符，约 21.5 全角）
- description：74 字符
- H1：`PokeSurvivor 新手第一只伙伴怎么选`
- H2：第一只伙伴是怎么来的 / 按初始招式选 / 本站推荐的 3 只开局伙伴 / 选完之后怎么培养 / 常见问题

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 5 | 规范没给 zh 关键词。现在的「第一只伙伴怎么选」是自然表达，但搜索量大概率集中在「御三家选哪个」「开局选什么」「最强宝可梦」「初始宝可梦推荐」。「御三家」在正文里有，但 title、H1、H2 里都没有；「宝可梦」这个词完全不在 title 和 H1 中；导航叫「最强宝可梦」，页面本身却没有这个词。 |
| 标题/描述长度 | 9 | 合格，余量较大。 |
| 标题层级 | 8 | 层级清楚。推荐小节用的是有序列表，可以改成 H3（每只推荐伙伴一个 H3），更利于长尾匹配，例如「水跃鱼 / 泪眼蜥」。 |
| 内容与本地化 | 6 | 宝可梦名使用官方简中译名并附英文，本地化做得好。**事实冲突**：EN 推荐第 1 名是 Mudkip / Sobble（水枪，FAQ 也说"最适合新手"），第 2 名是藤鞭系，第 3 名是 Scorbunny；zh 推荐第 1 名是炎兔儿，第 2 名水跃鱼 / 泪眼蜥，第 3 名呆火鳄，完全没提藤鞭系。zh 强度榜前期 S 档是水跃鱼、泪眼蜥，所以 zh best-pokemon 和 zh 强度榜也互相矛盾。另外，表格中飞叶快刀、念力的进化写着「本站尚未确认」，但 EN 强度榜已经写明 Leaf Storm / Psyshock（Reflexes）。zh 缺少 EN 表格里"招式效果"这一列（穿透水柱、扇形范围等），而这正是选伙伴的核心依据。 |
| 内链 | 7 | 只链到 tier-list 和 how-to-play。缺 co-op（FAQ 讲了合作选什么）、rifts（属性克制）、首页术语表（Let's go together! / Choose another）。 |
| 结构化数据 | 8 | 三种 JSON-LD 齐全，中文面包屑，FAQ 一致。 |
| hreflang/locale | 6 | 同第 0 节。 |
| 重复/蚕食 | 6 | 与 tier-list 在「最强 / 推荐」意图上重叠，见 tier-list。建议：best-pokemon 拥有「开局 / 御三家 / 新手推荐」，tier-list 拥有「强度榜 / 排行 / 最强」；导航文字改为「开局选择」或「新手伙伴」。 |

建议目标查询（推断）：pokesurvivor 御三家选哪个、pokesurvivor 开局选什么、pokesurvivor 初始宝可梦、宝可梦幸存者 新手推荐、pokesurvivor best starter 中文。

推荐改写：
- title：`PokeSurvivor 开局选哪只？新手御三家伙伴推荐与培养`（31 字符，约 24.5 全角）
- description：`PokeSurvivor 开局选哪只伙伴？性格测验怎么用、29 只可选伙伴的初始招式对比、本站推荐的 3 只新手伙伴，以及金币该投给谁。`（68 字符）
- H1：`PokeSurvivor 开局选哪只：新手御三家与第一只伙伴推荐`
- 推荐顺序与 EN 和 tier-list 统一：1. 水跃鱼 / 泪眼蜥，2. 藤鞭系（妙蛙种子、菊草叶、草苗龟、敲音猴），3. 炎兔儿；呆火鳄放到「想要更肉」里。表格补上招式效果列和 Leaf Storm / Psyshock。

## 4. /zh/how-to-play/ 玩法攻略

现状：
- title：`PokeSurvivor 怎么玩｜新手前 10 分钟玩法攻略`（30 字符，约 21.5 全角）
- description：73 字符
- H1：`PokeSurvivor 新手攻略：你的第一局 10 分钟`
- H2：开局之前 / 第 0–2 分钟：先学会绕圈 / 升级卡片：三选一怎么挑 / 招式满级进化 / 四类特殊敌人 / 地图上的机关 / 携带道具、天气和属性 / 第一次遇到裂隙 / 常见问题

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 7 | 「PokeSurvivor 怎么玩」在 title 开头，H1 有「新手攻略」，首段有寶可夢倖存者。缺口：没有「教程 / 入门 / 新手教学」这类常见搜索说法（只有 description 有「新手教程」）；H1 用「攻略」又与首页撞词。 |
| 标题/描述长度 | 9 | 合格。 |
| 标题层级 | 9 | 层级最完整的一页，H2 按时间线排列，与 EN 结构对齐，还额外拆出了"地图机关"和"道具天气"。 |
| 内容与本地化 | 8 | 行文自然，不是直译；道具用官方中文名（吃剩的东西、讲究头带、生命宝珠），对照英文。和规范一致：Esc/P 暂停、64 招式 59 可进化、R 键刷新、治疗型"打得越狠回得越多（有上限）"、第 30 分钟阿尔宙斯。缺口：规范中的"Meowth 掉金币"这个地图元素没有写；进化表缺 Razor Leaf / Confusion 两条（同 tier-list）。规范要求的标题「第一局 10 分钟」保留得很好。 |
| 内链 | 8 | 链到 best-pokemon、mobile、rifts、tier-list，锚文本清楚。可以在「开局之前」里链到首页术语表，在游客/账号部分链到 co-op。 |
| 结构化数据 | 8 | 齐全，一致。内容是步骤式的，但不建议加 HowTo（Google 已停止展示 HowTo 富结果）。 |
| hreflang/locale | 6 | 同第 0 节。 |
| 重复/蚕食 | 6 | 与首页争夺「攻略」，见首页。改 H1 后可缓解。 |

建议目标查询（推断）：pokesurvivor 怎么玩、pokesurvivor 新手教程、pokesurvivor 玩法、宝可梦幸存者 怎么玩、pokesurvivor 招式进化、pokesurvivor 升级卡片怎么选。

推荐改写：
- title：`PokeSurvivor 怎么玩｜新手入门教程：第一局前 10 分钟`（34 字符，约 25.5 全角）
- description：`PokeSurvivor 新手教程：游客与账号的区别、前几分钟怎么走位、升级三选一卡片怎么挑、招式满级进化、四类特殊敌人和地图机关。`（66 字符，去掉了已与正文重复的"附中英文对照"可酌情保留）
- H1：`PokeSurvivor 怎么玩：新手教程，第一局前 10 分钟`
- H2「招式满级进化」改为 `招式满级进化（进化表）`，补全 6 条路线并加数值。

## 5. /zh/co-op/ 多人合作

现状：
- title：`PokeSurvivor 多人合作｜最多 4 人联机教程`（28 字符，约 20 全角，全站最短）
- description：73 字符
- H1：`PokeSurvivor 多人合作：最多 4 人一起玩`
- H2：联机前的准备 / 加好友、进房间 / 合作时的规则 / 隐私提醒 / 组队思路 / 常见问题

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 7 | 「多人合作」「联机教程」覆盖了中文玩家最常用的两个词。缺口：「联机」不在 H1；「双人 / 组队 / 怎么加好友」只在正文；标题还有约 10 个全角的空间没用。 |
| 标题/描述长度 | 9 | 合格。 |
| 标题层级 | 9 | 清楚，步骤用有序列表，合适。 |
| 内容与本地化 | 8 | 与规范、EN 一致（共享经验、站到身边复活、房主切标签页全员暂停、P2P 可能暴露 IP、Firebase 中转、跨平台未证实）。「本地同屏」这个中文玩家常问的点有回答，是加分项。「组队思路」比 EN 略少。 |
| 内链 | 7 | 只链到 rifts 和 tier-list。缺 best-pokemon（FAQ 讨论合作选哪只）、mobile（手机联机）、how-to-play（账号 vs 游客）。 |
| 结构化数据 | 8 | 齐全，一致。 |
| hreflang/locale | 6 | 同第 0 节。 |
| 重复/蚕食 | 9 | 主题独占，无风险。 |

建议目标查询（推断）：pokesurvivor 联机、pokesurvivor 多人、pokesurvivor 怎么和朋友玩、宝可梦幸存者 联机、pokesurvivor 加好友、pokesurvivor 双人。

推荐改写：
- title：`PokeSurvivor 联机教程｜多人合作最多 4 人，怎么加好友`（34 字符，约 26 全角）
- description：`PokeSurvivor 怎么和朋友联机：最多 4 人，仅在线版支持。登录、加好友、邀请进房间的步骤，以及共享经验、复活队友和隐私提醒。`（68 字符）
- H1：`PokeSurvivor 联机教程：最多 4 人多人合作`

## 6. /zh/rifts/ 神秘裂隙

现状：
- title：`PokeSurvivor 神秘裂隙攻略｜18 个属性场地与传说`（31 字符，约 23 全角）
- description：82 字符（全站最长，略超 80）
- H1：`PokeSurvivor 神秘裂隙攻略：18 个属性场地`
- H2：裂隙是什么，怎么进 / 奖励 / 18 个属性场地对照 / 怎么打赢传说 / 常见问题

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 8 | 「神秘裂隙」「传说」「18 个属性场地」都在 title / H1；描述里有英文原名 Mysterious Rift，便于对照英文界面搜索。缺口：中文玩家常把传说宝可梦叫「神兽」，全页没有这个词；「传说宝可梦」不在 title 里（只有「传说」）。 |
| 标题/描述长度 | 8 | 标题合格；描述 82 字符，在移动端很可能被截断，建议压到 75 左右。 |
| 标题层级 | 8 | 清楚。EN 有「Which legendary you meet」「Strategy by arena group」「Rifts in co-op」三个 H2，zh 把前者并进了第一节，后两者缺失或压成一个列表项。 |
| 内容与本地化 | 7 | 18 个场地中英对照表是原生的价值点，并且诚实标注了「本站意译」。传说名使用官方中文名（盖欧卡、固拉多……）。与规范一致：至少每 2.5 分钟、按属性随机、双属性随机选一。缺口：EN 有按场地分组的克制建议（例如火山用水系招式、龙 / 飞行用冰系），zh 只有一句"进场看场地名判断属性"，内容明显更薄。规范要求的"推荐克制属性、地形危险"列也没做进表格。 |
| 内链 | 8 | 链到 how-to-play、co-op、tier-list，外链到官方 Legendaries 页面。 |
| 结构化数据 | 8 | 齐全，一致。 |
| hreflang/locale | 6 | 同第 0 节。 |
| 重复/蚕食 | 9 | 主题独占。 |

建议目标查询（推断）：pokesurvivor 裂隙、pokesurvivor 神兽、pokesurvivor 传说宝可梦、宝可梦幸存者 神秘裂隙、pokesurvivor rift 中文、pokesurvivor 羁绊。

推荐改写：
- title：`PokeSurvivor 神秘裂隙攻略｜18 个场地与传说宝可梦打法`（34 字符，约 26 全角）
- description：`PokeSurvivor 神秘裂隙（Mysterious Rift）怎么进、打赢拿什么、18 个属性场地中英对照，以及单挑传说宝可梦（神兽）的打法。`（74 字符）
- H1：`PokeSurvivor 神秘裂隙攻略：18 个属性场地与传说宝可梦`
- 新增 H2：`各场地克制建议`（翻译并本地化 EN 的「Strategy by arena group」），并在对照表加「推荐属性」列。

## 7. /zh/mobile/ 手机版

现状：
- title：`Poke Survivor 中文手機版怎么玩｜手机浏览器教学`（30 字符，约 23 全角）
- description：80 字符
- H1：`PokeSurvivor 手机版怎么玩`
- H2：用手机浏览器直接玩 / 触控操作 / 添加到主屏幕 / 离线版只能单人 / 没有官方 App，小心同名假冒 / 常见问题

| 维度 | 分数 | 证据 |
|---|---|---|
| 关键词 | 6 | 规范关键词「poke survivor 中文 手機」被原样塞进标题，「pokesurvivor 手机」在 H1 和正文中有。问题：title 用的是「Poke Survivor」（带空格），H1 和描述用「PokeSurvivor」，品牌写法不统一；「手機」只出现在 title 和正文一处，属于为了命中关键词而硬塞。Google 对繁简有一定的同义映射，简体页用「手机」也能部分匹配「手機」查询，硬塞的收益很小，可读性损失却很明显。 |
| 标题/描述长度 | 9 | 合格（描述 80 字符，处在上限）。 |
| 标题层级 | 9 | 完全符合规范的大纲，层级清楚。 |
| 内容与本地化 | 5 | 内容本身质量高（iOS / 安卓步骤、Rotate your phone 提示、iPhone 修复日期、假冒 App 和代币警告，都与规范一致）。扣分主要来自繁简混写：title「中文**手機**版**怎么**玩」，正文第一句「没有单独的手机 App，**手機**上用浏览器打开」，这两处像错别字。另外规范要求的 FAQ「手机卡顿怎么办（设置里的自动画质）」缺失。操作步骤里的「安装应用」「添加到主屏幕」是大陆 Chrome 的叫法，如果做繁体版要改为「安裝應用程式」「加到主畫面」。 |
| 内链 | 8 | 链到首页术语表、how-to-play、co-op，外链到官方站、itch.io、GitHub。 |
| 结构化数据 | 8 | 齐全，一致。 |
| hreflang/locale | 6 | 有 EN 对应页 `/mobile/`，双向互指正确（规范当时说"没有 EN 对应页"，实现已补上 EN 页，这里以实现为准，没问题）。语言码问题同第 0 节；本页是繁体关键词最集中的页面，最适合作为 zh-Hant 版本的第一批页面。 |
| 重复/蚕食 | 8 | 首页 FAQ 和「中文玩家怎么上手」也讲了手机，但篇幅短并且链过来了，风险低。 |

建议目标查询（推断）：pokesurvivor 手机、poke survivor 手机版、宝可梦幸存者 手机版、pokesurvivor 手机怎么玩、pokesurvivor app、pokesurvivor iphone / 安卓；繁体：poke survivor 中文 手機、寶可夢倖存者 手機版。

推荐改写（简体版）：
- title：`PokeSurvivor 手机版怎么玩｜Poke Survivor 中文手机教学`（40 字符，约 26.5 全角；同时覆盖带空格和不带空格的写法）
- description：`PokeSurvivor 手机怎么玩：手机浏览器直接打开、横屏、拖动移动、点击切换招式，iPhone 和安卓添加到主屏幕的步骤。没有官方 App。`（73 字符）
- H1：`PokeSurvivor 手机版怎么玩（iPhone / 安卓）`
- 正文首句改为：`PokeSurvivor（宝可梦幸存者）没有手机 App，手机上用浏览器打开就能玩……`
- 补 FAQ：`手机上玩很卡怎么办？`（设置里的自动画质，先在手机上确认选项名称）。

繁体版（zh-Hant）：
- title：`PokeSurvivor 手機版怎麼玩｜Poke Survivor 中文手機教學`
- description：`PokeSurvivor 手機怎麼玩：用手機瀏覽器直接開、橫向遊玩、拖曳移動、點擊切換招式，iPhone 與 Android 加到主畫面的步驟。沒有官方 App。`
- H1：`PokeSurvivor 手機版怎麼玩（iPhone／Android）`

## 8. 优先级修复清单

### P0（发布前必须修）

1. 清除简体句子里的繁体混写：首页 title「与」前的「寶可夢倖存者中文玩法」改为简体，或整体改为下文推荐标题；mobile title「中文手機版怎么玩」和正文「手機上用浏览器打开」改为「手机」。繁体名只以括号别名形式出现，例如「宝可梦幸存者（寶可夢倖存者）」。文件：`src/content/pages/zh/home.md`、`zh/mobile.md`。
2. 统一新手推荐的事实：zh best-pokemon 的推荐顺序改为与 EN 和 zh 强度榜一致（水跃鱼 / 泪眼蜥 → 藤鞭系 → 炎兔儿）。文件：`zh/best-pokemon.md`。
3. 修正 zh 强度榜里与页面不符的陈述：FAQ「各档的简评写在表格里」不成立（表格只有宝可梦名），要么给表格加简评，要么在正文按档写理由（补上 EN 的 Early/Mid/Late 名单和理由）。这个答案同时进入了 FAQPage JSON-LD。文件：`zh/tier-list.md`。
4. 给强度榜表格加上自己的 H2（`## 完整强度榜（2026-10-14 更新）`），并放到正文前部，而不是挂在「招式进化参考」下面。文件：`src/pages/zh/tier-list.astro` / `ContentPage` 插槽顺序。
5. 语言标签：在正文仍为简体时**保持** `zh-Hans` / `zh_CN`，不要只改标签。把这条决定写回 `docs/content-spec.md` 第 8 节，消除规范与实现的冲突。

### P1（上线后 1–2 周）

1. 按第 1–7 节的推荐改写全部 7 页的 title、description、H1（汇总表见下）。
2. 补齐与 EN 的内容差距：飞叶快刀 → Leaf Storm、念力 → Psyshock（Reflexes）以及各进化数值（tier-list、best-pokemon、how-to-play 三页）；rifts 补「各场地克制建议」H2；best-pokemon 补招式效果列；tier-list 补「更新记录」和 4 只未评级伙伴的说明。
3. 关键词补位：首页首段加入 PokeSurvivor / Poke Survivor / 宝可梦幸存者；新增「PokeSurvivor 操作方式」H2；rifts 加入「神兽」；best-pokemon 的 title / H1 加入「御三家」「开局」。
4. 消除站内蚕食：首页拥有「中文攻略 / 在线玩」，how-to-play 拥有「怎么玩 / 新手教程」（H1 去掉「攻略」）；导航「最强宝可梦」改为「开局选择」，让强度榜独占「最强 / 排行」。文件：`src/i18n.ts` 的 `UI.zh.nav`。
5. 决定繁体方案：推荐新增 `/zh-hant/` 一套台湾用语的繁体页（`hreflang="zh-Hant"`、`og:locale=zh_TW`），先做首页和 mobile 两页（繁体关键词最集中），与 `/zh/`（zh-Hans）和 EN 三方互指，x-default = EN。需要改 `src/i18n.ts` 的 `Locale`、`LANG_TAG`、`ROUTES`、`LOCALE_LABEL`，以及 `BaseLayout.astro` 中写死的 `ogLocale` 判断（现在是 `locale === 'zh' ? 'zh_CN' : 'en_US'`，`og:locale:alternate` 也是同样写死的）。
6. 补内链：best-pokemon → co-op / rifts / 首页术语表；co-op → best-pokemon / mobile / how-to-play。

### P2（有余力再做）

1. 首页加 `VideoGame` JSON-LD（alternateName 写入 寶可夢倖存者、宝可梦幸存者、Poke Survivor）。
2. 页脚改为规范第 6 节的中文免责声明全文，并加上官方站和 itch.io 链接（规范要求每页都有，现在页脚里没有链接，只有正文顶部的「在新标签页打开游戏」）。
3. how-to-play 补「喵喵（Meowth）掉金币」地图元素；mobile 补「手机卡顿」FAQ。
4. rifts 描述压到 75 字符以内。
5. 上线后用 Search Console 按「查询」维度验证第 1–7 节里推断的搜索词，按实际展示量再调整标题。

### 标题 / 描述 / H1 改写汇总（简体，zh-Hans）

| 页面 | title | description | H1 |
|---|---|---|---|
| /zh/ | PokeSurvivor 中文攻略｜宝可梦幸存者免下载在线玩法与操作 | PokeSurvivor（宝可梦幸存者）中文攻略：免下载在线玩，只需走位，伙伴自动攻击。附英文界面中文对照表、开局教学、强度榜和手机玩法。 | PokeSurvivor 中文攻略：宝可梦幸存者（寶可夢倖存者）在线玩 |
| /zh/tier-list/ | PokeSurvivor 强度榜｜宝可梦幸存者前中后期伙伴 Tier 排行 | PokeSurvivor 强度榜：本站实测的伙伴评级，按前期、中期、后期分 S/A/B/C 四档，附每档理由、招式进化路线和更新记录。非官方排名。 | PokeSurvivor 强度榜（Tier List）：前中后期最强伙伴排行 |
| /zh/best-pokemon/ | PokeSurvivor 开局选哪只？新手御三家伙伴推荐与培养 | PokeSurvivor 开局选哪只伙伴？性格测验怎么用、29 只可选伙伴的初始招式对比、本站推荐的 3 只新手伙伴，以及金币该投给谁。 | PokeSurvivor 开局选哪只：新手御三家与第一只伙伴推荐 |
| /zh/how-to-play/ | PokeSurvivor 怎么玩｜新手入门教程：第一局前 10 分钟 | PokeSurvivor 新手教程：游客与账号的区别、前几分钟怎么走位、升级三选一卡片怎么挑、招式满级进化、四类特殊敌人和地图机关。 | PokeSurvivor 怎么玩：新手教程，第一局前 10 分钟 |
| /zh/co-op/ | PokeSurvivor 联机教程｜多人合作最多 4 人，怎么加好友 | PokeSurvivor 怎么和朋友联机：最多 4 人，仅在线版支持。登录、加好友、邀请进房间的步骤，以及共享经验、复活队友和隐私提醒。 | PokeSurvivor 联机教程：最多 4 人多人合作 |
| /zh/rifts/ | PokeSurvivor 神秘裂隙攻略｜18 个场地与传说宝可梦打法 | PokeSurvivor 神秘裂隙（Mysterious Rift）怎么进、打赢拿什么、18 个属性场地中英对照，以及单挑传说宝可梦（神兽）的打法。 | PokeSurvivor 神秘裂隙攻略：18 个属性场地与传说宝可梦 |
| /zh/mobile/ | PokeSurvivor 手机版怎么玩｜Poke Survivor 中文手机教学 | PokeSurvivor 手机怎么玩：手机浏览器直接打开、横屏、拖动移动、点击切换招式，iPhone 和安卓添加到主屏幕的步骤。没有官方 App。 | PokeSurvivor 手机版怎么玩（iPhone / 安卓） |

长度核对（Python `east_asian_width` 计算，全角 = 1，半角 = 0.5）：推荐 title 为 31–40 字符、约 24.5–27.5 全角，都在 30 全角以内；推荐 description 为 66–74 字符。注意：标题里含「PokeSurvivor」等英文，实际像素宽度要以 SERP 预览工具为准，本审计没有做像素测量。

