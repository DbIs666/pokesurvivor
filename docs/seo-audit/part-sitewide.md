# 全站技术 / On-page SEO 审计（sitewide）

审计日期：2026-10-14。方法：阅读源码 + `npm run build` 刷新 dist/ 后用脚本解析全部 15 个 HTML（14 个可索引页 + 404）、sitemap-index.xml、sitemap-0.xml、robots.txt。未部署，未跑 Lighthouse，未做线上抓取。行号以当前工作区文件为准。

## 0. 结论速览

| 优先级 | 问题 | 位置 |
|---|---|---|
| P0 | `site` 仍是占位域名 `pokesurvivor.example.com`，canonical / hreflang / og:url / og:image / JSON-LD / sitemap / robots 全部指向错误域名 | astro.config.mjs:6 |
| P0 | 未关闭 `*.workers.dev` 访问，正式域名上线后会出现第二个可抓取副本 | wrangler.jsonc |
| P1 | JSON-LD 的 `<` 转义无效（`'<'` 在 JS 中就是 `<`），是潜在的 `</script>` 注入点 | src/components/JsonLd.astro:59 |
| P1 | 页脚免责声明缺 Creatures、jpter78、官方站说明，且页脚 0 链接（规范要求每页链官方站和 itch.io） | src/i18n.ts:63-64, 90-91；src/components/Footer.astro |
| P1 | 无 About / Contact / Privacy 页；嵌入第三方 iframe（会设 cookie / P2P）却无隐私说明 | src/pages/ |
| P1 | 首页 iframe 立即加载整个游戏，抢占首屏带宽，手机端还被 CTA 挤到下方仍照常加载 | src/components/GameEmbed.astro:30；HomePage.astro:35 |
| P1 | Tier 表的理由只在 `title` 属性里（每个 tier 页 75 条），不可见、触屏不可读、基本不计入正文 | src/components/TierTable.astro:37 |
| P1 | Article 缺 author / image / datePublished；首页 `updated` 未输出到页面或 schema | JsonLd.astro:24-35；HomePage.astro |
| P2 | sitemap 无 lastmod、无 x-default | astro.config.mjs:22-28 |
| P2 | og:image 无宽高 / alt；无 twitter:title/description/image（有 og 兜底）；全站共用一张 OG 图 | BaseLayout.astro:54-59 |
| P2 | FAQPage 自 2023-08 起对普通站点不再出富结果；保留无害但不要指望 | PageLayout.astro:26；HomePage.astro:29 |
| P2 | TITLE_SUFFIX 实际只作用于 404（所有页标题都含 PokeSurvivor），品牌名 "PokeSurvivor Wiki" 从不出现在标题 | BaseLayout.astro:30 |
| P2 | 缺 apple-touch-icon、manifest、favicon.ico；404 的 og:url 指向 /404/ | BaseLayout.astro:46；public/ |
| P2 | zh 导航文案 "最强宝可梦" 与页面意图（第一只伙伴）不符；EN "Best Pokémon" 同理 | src/i18n.ts:72 附近 UI.zh.nav |

## 1. 占位站点 URL

证据：astro.config.mjs:5-6 `const SITE = 'https://pokesurvivor.example.com';`（带 TODO）。dist 中所有绝对 URL 都来自它：

- canonical：14 页全部为 `https://pokesurvivor.example.com/...`（BaseLayout.astro:23, 40）
- hreflang 与 x-default：同上（BaseLayout.astro:42, 44）
- og:url、og:image（BaseLayout.astro:53-54）
- JSON-LD：WebSite.url、Article.mainEntityOfPage、publisher.url、BreadcrumbList.item（JsonLd.astro:16, 22, 31, 33, 53）
- dist/sitemap-index.xml、dist/sitemap-0.xml 的 `<loc>` 和 `xhtml:link`
- dist/robots.txt：`Sitemap: https://pokesurvivor.example.com/sitemap-index.xml`

影响：若带着占位域名上线，Google 会把每页的 canonical 视为指向另一个（不存在的）主机，canonical 与 hreflang 都会被忽略或导致页面不被收录；社交分享卡片的图片 404；robots 中的 sitemap 无法抓取。这是唯一的阻断性问题。

修复（P0）：
```js
// astro.config.mjs
const SITE = process.env.SITE_URL ?? 'https://<正式域名>'; // 不带路径，https，无 www 或统一 www
```
再加一道构建守卫，防止忘改：
```js
if (process.env.NODE_ENV === 'production' && SITE.includes('example.com')) {
  throw new Error('astro.config.mjs: set the real production SITE before building');
}
```
（`astro build` 下 NODE_ENV 为 production；如不确定，可改为在 `npm run deploy` 前加 `node -e` 检查。）

同时（P0）：wrangler.jsonc 未设置 `workers_dev` / `preview_urls`，默认 `<name>.<subdomain>.workers.dev` 可公开访问，会形成整站副本（canonical 虽能部分消解，但仍浪费抓取并可能被误选为规范页）。建议：
```jsonc
{
  "workers_dev": false,
  "preview_urls": false,
  "routes": [{ "pattern": "<正式域名>", "custom_domain": true }]
}
```
并在 Cloudflare 规则中把 www 与 apex 二选一 301。上述行为未在线验证。

## 2. Canonical 与尾斜杠

- 生成方式：`new URL(Astro.url.pathname, site).href`（BaseLayout.astro:23）。dist 中 14 页 canonical 全部自引用、以 `/` 结尾，与 `trailingSlash: 'always'` + `build.format: 'directory'`（astro.config.mjs:14-15）一致；与 wrangler `html_handling: "auto-trailing-slash"`（wrangler.jsonc）一致：`/tier-list/index.html` 以 `/tier-list/` 提供，`/tier-list` 被重定向到带斜杠版本。
- 所有内部链接（nav、面包屑、正文）都带尾斜杠，没有发现指向无斜杠或 `index.html` 的链接，因此不会触发站内重定向链。
- 注意：astro.config.mjs:12 注释称重定向为 307（临时）。Cloudflare 的实际状态码未在线验证；若确为 307，对外部无斜杠反链的权重传递弱于 301，但 canonical 会兜底，影响很小。
- noindex 页（404）不输出 canonical（BaseLayout.astro:40），做法正确。小问题：404 的 og:url 为 `.../404/`（该 URL 并不存在）。建议 noindex 时不输出 og:url。

## 3. hreflang

dist 实测（所有 7 组）：
- 双向互链：EN 与 ZH 每页都输出 `en`、`zh-Hans`、`x-default` 三条，且互指，含自引用。7 对全部互惠，无缺失。
- x-default = EN 版（BaseLayout.astro:27），符合规范。
- `/mobile/` 已存在，`/zh/mobile/` 已正确配对（content-spec 中"/zh/mobile 无 EN 对应页"的说明已过时）。
- 404 无 routeKey，不输出 hreflang，正确。
- 语言切换器 `<a hreflang="zh-Hans" lang="zh-Hans">`（Header.astro:35）正确。

zh-Hans 还是 zh-Hant：content-spec 第 8 节建议用 `zh-Hant`，但实际 ZH 正文是简体（src/content/pages/zh/*.md 每个文件只有 1-4 处繁体，仅为关键词"寶可夢倖存者"等）。hreflang 应该描述页面实际文字，所以当前的 `zh-Hans` 是对的，应更新 spec 而不是改代码。可选：如果想覆盖港台用户，在不新增繁体页的前提下没有正确的 hreflang 可加；只能靠正文中保留繁体关键词（现状已如此）。

问题（P2）：
- 标题/正文简繁混用：`/zh/` 标题"寶可夢倖存者中文玩法与操作"、`/zh/mobile/` 标题"中文手機版怎么玩"，同一短语里"手機"（繁）+"怎么"（简）。建议标题中繁体只保留在括号关键词里，例如"PokeSurvivor 手机版怎么玩（手機版）"。
- sitemap 的 alternates（astro.config.mjs:22-28）有 `en`、`zh-Hans` 两条且互惠，但没有 `x-default`，也没有 `<lastmod>`。HTML 中已有 x-default，所以不算错误，但两处信号不一致。修复见第 12 节。

## 4. 标题模板与 Title / Description 清单

逻辑（BaseLayout.astro:30）：`/poke\s?survivor/i.test(title) ? title : title + ' | PokeSurvivor'`。正则能匹配 "PokeSurvivor"、"Poke Survivor"、任意大小写，没有误判。但 14 个可索引页的 title 全都已含游戏名，所以后缀只在 404 生效（"Page not found | PokeSurvivor"）。结果是站点品牌 "PokeSurvivor Wiki" 从未出现在任何标题中，搜索结果里与官方站 pokesurvivor.com 难以区分。这对粉丝站有一定好处（不冒充）也有坏处（无品牌识别）。可选（P2）：在 og:site_name 已有的基础上，给 WebSite JSON-LD 加 `alternateName`，让 Google 显示站点名；标题保持现状即可。

长度按字符计（中文 1 字符约等于 2 个英文字符宽度；Google 中文标题约 30 字、描述约 80-100 字开始截断）：

| 页面 | Title | 长度 | Description 长度 |
|---|---|---|---|
| / | Poke Survivor: Play PokeSurvivor Online Free, No Download | 57 | 146 |
| /tier-list/ | PokeSurvivor Tier List: Best Partners by Game Phase | 51 | 147 |
| /best-pokemon/ | PokeSurvivor Best Starter: Which Partner to Pick First | 54 | 134 |
| /how-to-play/ | How to Play PokeSurvivor: First 10-Minute Run Guide | 51 | 144 |
| /co-op/ | PokeSurvivor Co-op: Play Online with up to 4 Friends | 52 | 140 |
| /rifts/ | PokeSurvivor Rifts: All 18 Type Arenas and How to Win | 53 | 136 |
| /mobile/ | PokeSurvivor on Mobile: Play in Your Phone Browser | 50 | 145 |
| /zh/ | PokeSurvivor 攻略｜寶可夢倖存者中文玩法与操作 | 29 | 71 |
| /zh/tier-list/ | PokeSurvivor 强度榜｜前中后期伙伴评级（本站版） | 30 | 76 |
| /zh/best-pokemon/ | PokeSurvivor 第一只伙伴怎么选｜新手开局推荐 | 28 | 74 |
| /zh/how-to-play/ | PokeSurvivor 怎么玩｜新手前 10 分钟玩法攻略 | 30 | 73 |
| /zh/co-op/ | PokeSurvivor 多人合作｜最多 4 人联机教程 | 28 | 73 |
| /zh/rifts/ | PokeSurvivor 神秘裂隙攻略｜18 个属性场地与传说 | 31 | 82 |
| /zh/mobile/ | Poke Survivor 中文手機版怎么玩｜手机浏览器教学 | 30 | 80 |
| /404.html（noindex） | Page not found \| PokeSurvivor | 29 | 44 |

- 重复：无重复 title，无重复 description；每页 H1 唯一且与 title 不完全相同（合理）。
- EN 全部 50-57 字符，description 134-147 字符，均在安全区。ZH 标题 28-31 字，处于截断边缘；/zh/rifts/ 的"与传说"、/zh/tier-list/ 的"（本站版）"最可能被截，可以删。
- 词义问题：/best-pokemon/ 的 title 用 "Best Starter"，导航文字却是 "Best Pokémon"（src/i18n.ts:44），ZH 导航是"最强宝可梦"（src/i18n.ts:71），而页面意图是"第一只伙伴怎么选"。导航锚文本与页面主题不一致，建议改为 'Best Starter' / '开局伙伴'。

## 5. Open Graph / Twitter

dist/index.html 实际输出：og:site_name、og:type、og:title、og:description、og:url、og:image、og:locale、og:locale:alternate、twitter:card。

- 全站 14 页共用 `/og-default.png`（public/，1200×630 PNG，3.6 KB；体积这么小，说明大概率是纯色或简单图形，未肉眼确认）。分享时所有页卡片相同。
- 缺 `og:image:width` / `og:image:height` / `og:image:alt` / `og:image:type`：首次分享时部分平台（Facebook）会因未知尺寸而不显示大图。
- 缺 `twitter:title` / `twitter:description` / `twitter:image`：X 会回退读 og:*，功能上可用，但显式声明更稳妥，并可加 `twitter:image:alt`。
- inner 页 og:type 为 article，但没有 `article:modified_time`（数据已有，`updated`）。
- 404 输出 og:url `.../404/`，不存在的 URL。

修复（P2，BaseLayout.astro:53-59 替换）：
```astro
{!noindex && <meta property="og:url" content={canonical} />}
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={ogImageAlt ?? SITE_NAME} />
{ogType === 'article' && updated && <meta property="article:modified_time" content={updated.toISOString()} />}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
```
其中 `const ogImageUrl = new URL(ogImage, site).href;`，并给 Props 增加 `ogImageAlt?` 和 `updated?`（由 PageLayout 透传）。中期：每个页面一张自己截图做的 OG 图（内容 schema 增加 `ogImage` 字段），注意规范第 6 节"不得使用官方宝可梦美术"。

## 6. JSON-LD

全部 40 个 `application/ld+json` 块用 JSON.parse 解析均成功。分布：

| 页面类型 | head 中 | body 中 |
|---|---|---|
| / 与 /zh/ | WebSite、FAQPage（5 问） | 无 |
| 12 个内页 | Article、FAQPage（EN 4-5 问，ZH 4 问） | BreadcrumbList（2 级） |

没有同一页重复的同类型块。

问题：
1. 转义无效（P1，安全）：JsonLd.astro:59 `JSON.stringify(data).replace(/</g, '<')`。在 JS/TS 源码中 `'<'` 字面量就是 `<`，所以这行是空操作（已用 node 验证：`'a</script>'.replace(/</g,'<')` 仍输出 `a</script>`）。只要某条 FAQ 答案或描述里出现 `</script>`，就会截断 script 标签并让后续内容按 HTML 解析。目前内容中无此串，所以 dist 现在是好的，但注释承诺的保护并不存在。修复：`.replace(/</g, '\\u003c')`。
2. Article 缺字段（P1）：没有 `author`、`image`、`datePublished`。Google 的 Article 文档把这些列为推荐属性；缺 `image` 会降低在 Discover / 热门故事中的可用性，缺 `author` 削弱 E-E-A-T。`publisher` 只有 name + url，没有 `logo`。建议（JsonLd.astro:24-35）：
   ```ts
   author: { '@type': 'Organization', name: SITE_NAME, url: site.href },
   image: new URL(props.image ?? DEFAULT_OG_IMAGE, site).href,
   datePublished: (props.published ?? props.updated)?.toISOString().slice(0, 10),
   publisher: { '@type': 'Organization', name: SITE_NAME, url: site.href,
     logo: { '@type': 'ImageObject', url: new URL('/logo-512.png', site).href } },
   ```
   并在 content.config.ts 增加 `published: z.coerce.date().optional()`。若有真人作者，用 `Person` + 指向 About 页的 url 更好。
3. WebSite（P2）：/ 与 /zh/ 各输出一个 WebSite，`url` 分别为根和 `/zh/`。Google 的站点名称功能只读首页根 URL 上的 WebSite。建议两页都用 `url: site.href`，并加 `alternateName: ['PokeSurvivor 攻略']`；不需要 SearchAction（站内无搜索）。首页 `updated: 2026-10-14`（home.md:5）在 schema 和页面上都没输出。
4. BreadcrumbList 在 body 中（Breadcrumb.astro:21）：Google 接受任意位置的 JSON-LD，不是问题，保持即可。首页无 BreadcrumbList，正确。
5. FAQPage（P2）：自 2023-08 Google 只为"知名的权威政府和医疗网站"显示 FAQ 富结果，本站不会获得该展示。保留不报错，也帮助其他搜索引擎/AI 摘要理解问答；但不要为了 schema 堆 FAQ。可见内容与 schema 一致（FAQ 文本都在 `<details>` 中可见），满足"标记内容必须在页面上可见"的要求。

## 7. 内部链接图

统计口径：dist HTML 中 `<main>` 内的站内链接（正文 + 面包屑 + GameLinkCard），header 导航另计；页脚 0 个链接。

导航：每个页面 header 链接到本语言全部 7 页 + 品牌链接到本语言首页 + 语言切换链接到对应页。因此 14 页中每页都从同语言 7 个页面获得导航入链，全部距首页 1 次点击，无孤儿页，也无深层页面。

正文链接矩阵（行 = 来源，列 = 目标；不含指向首页的面包屑和"在本站游玩"按钮）：

| 来源 \ 目标 | tier | best | how | co-op | rifts | mobile | 跨语言 |
|---|---|---|---|---|---|---|---|
| / | 1 | 1 | 1 | 2 | 2 | 2 | /zh/ |
| /tier-list/ | - | 1 | 1 | 1 | 1 | 0 | |
| /best-pokemon/ | 1 | - | 1 | 0 | 1 | 0 | |
| /how-to-play/ | 1 | 1 | - | 0 | 1 | 1 | |
| /co-op/ | 1 | 1 | 0 | - | 1 | 0 | |
| /rifts/ | 0 | 0 | 1 | 1 | - | 0 | |
| /mobile/ | 0 | 0 | 1 | 1 | 0 | - | |
| /zh/ | 2 | 2 | 2 | 2 | 2 | 2 | /（"英文站"） |
| /zh/tier-list/ | - | 1 | 1 | 1 | 1 | 0 | |
| /zh/best-pokemon/ | 1 | - | 1 | 0 | 0 | 0 | |
| /zh/how-to-play/ | 1 | 1 | - | 0 | 1 | 1 | |
| /zh/co-op/ | 1 | 0 | 0 | - | 1 | 0 | |
| /zh/rifts/ | 1 | 0 | 1 | 1 | - | 0 | |
| /zh/mobile/ | 0 | 0 | 1 | 1 | 0 | - | |

观察：
- /mobile/ 与 /zh/mobile/ 的正文入链最少（只来自首页和 how-to-play）。co-op（"合作在手机上能玩吗"）和 rifts 都可以自然链接 mobile。
- /rifts/ 与 /mobile/ 都不链 tier-list；/zh/best-pokemon/ 不链 rifts、co-op。
- 跨语言正文链接只有两个首页互链；内页之间靠 header 语言切换，足够。
- 锚文本分布：指向首页的锚文本为 "Home"/"首页"（面包屑）和 "Play on this site"/"在本站游玩"（每个内页各 1 次），两者都不含关键词；可把 GameLinkCard 按钮文案改为 "Play PokeSurvivor online"（i18n.ts `playOnHome`）。其他目标的锚文本基本是导航同名短词（"Rifts"、"强度榜"），偶有 "rifts page"、"首页的中英对照" 这类弱锚文本。EN /tier-list/ 只有一次用到含关键词的 "PokeSurvivor Tier List"。
- 页脚完全没有链接（Footer.astro），失去了放官方站、itch.io、About/Privacy 的位置，见第 11 节。

## 8. 语义 HTML 与可访问性（与 SEO 相关部分）

- `<html lang>`：EN 页 `en`，ZH 页 `zh-Hans`，与 hreflang 一致。404 为 `en`，其中中文段落带 `lang="zh-Hans"`（404.astro:11），正确。
- 跳转链接：`.skip-link` → `#main`，`<main id="main" tabindex="-1">`（BaseLayout.astro:63-65），正确。小问题：文案硬编码（BaseLayout.astro:63），没有用已有的 `UI[locale].skip`（i18n.ts:47, 74）。
- 导航：主导航 `<nav aria-label="Menu">` 包在 `<details class="nav-toggle">` 里（Header.astro:18-32）。导航链接在 HTML 中始终存在，Google 能抓取；但 aria-label 用"Menu/菜单"不够具体，可改为"Main/主导航"。窄屏下 JS 未执行时导航收起，不影响抓取。
- 面包屑：`<nav aria-label>` + `<ol>` + `aria-current="page"`，规范。
- iframe：有 `title`（"PokeSurvivor game" / "PokeSurvivor 游戏"），满足要求。可改为更具描述性的 "Play PokeSurvivor in your browser"（与 spec 第 1 节示例一致）。
- 标题层级：每页 1 个 H1，H2 5-9 个，FAQ 用 H2 + `<details>`。
- TierTable（P1）：理由只写在 `<li title="Water Gun; atk multiplier 1.08">`（TierTable.astro:37），EN、ZH tier 页各 75 条。`title` 属性在触屏设备上无法显示、读屏器行为不一致，搜索引擎基本不把它当正文。这恰恰是 tier list 最有价值的"为什么"信息。建议改为可见文本：
  ```astro
  <li>
    <span class="tier-name">{e.name[locale]}</span>
    {e.note && <span class="tier-note">{e.note[locale]}</span>}
  </li>
  ```
  或在表格下方输出一个按宝可梦排列的 `<dl>` 说明列表。同时表格缺 `<caption>`（tier-list.astro:7 未传 caption），屏幕阅读器和 Google 都失去表格主题，建议传入 `caption="PokeSurvivor partner tiers by game phase"`。
- `<details>` FAQ：答案在初始 HTML 中（只是折叠），Google 会抓取并索引折叠内容，移动优先索引下不降权。无需改动。

## 9. 性能 / 页面体验

基于 HTML/CSS 检查，未实测：

- CSS：每页一个外链样式表 `/_astro/BaseLayout.*.css`（5.7 KB），渲染阻塞但体积很小、同源、可长期缓存（带 hash）。可选：在 astro.config.mjs 加 `build: { format: 'directory', inlineStylesheets: 'always' }` 直接内联，省一次往返。
- 字体：只用系统字体栈（global.css:1, 13），无 webfont，无 FOIT/FOUT。
- 图片：全站 0 个 `<img>`，没有尺寸缺失问题。（但也意味着正文没有截图，见第 11 节 E-E-A-T。）
- JS：每页 1 段内联模块脚本（导航展开），首页多 1 段（全屏按钮），都很小。
- 首页 iframe（P1）：GameEmbed.astro:30 在 `eager` 时不输出 loading 属性，HomePage.astro:35 传入 `eager`，所以 / 与 /zh/ 一打开就加载完整游戏（pokesurvivor.com 的 JS、精灵图、音频、Firebase 等，体积未测）。这会和本站资源争带宽，拖慢 LCP（LCP 元素通常是 H1 文本，所以影响有限），并大幅增加 TBT/INP 风险（跨源 iframe 的主线程工作在同进程站点隔离不完整的移动设备上会互相影响）。在手机上 CTA 放在 iframe 上方、游戏只能横屏，绝大多数手机用户不会在 iframe 中玩，却照样下载整个游戏。建议：
  1. 改为点击加载（facade）：先渲染一个 16:9 占位块和"Play"按钮，点击后再插入 iframe `src`。对 SEO 无损（iframe 内容本来不计入本站）。
  2. 至少在窄屏不加载：`<iframe data-src={src}>`，脚本中 `if (matchMedia('(min-width: 48rem)').matches) frame.src = frame.dataset.src`。
  3. 加 `<link rel="preconnect" href="https://pokesurvivor.com">`（仅首页）。
- CLS：`.game-frame` 有 `aspect-ratio: 16/9`（窄屏 4/3）且 iframe 绝对定位填满（global.css:95-101），容器尺寸在 CSS 加载时就确定，iframe 自身不会引起位移。剩余风险：`.game-mobile-cta` 与 `.game-newtab-desktop` 靠媒体查询切换，纯 CSS，无位移；Header 脚本在桌面端把 `details` 设为 open 时，若脚本晚于首次绘制执行，导航会从收起变展开，产生小幅位移。可用 CSS 在宽屏下强制显示（`@media (min-width:48rem){ .nav-toggle:not([open]) > nav { display:block } }`，具体需配合 `details` 内容渲染行为测试），或在 SSR 时直接输出 `<details open>`、在窄屏用脚本收起。
- 全屏按钮在不支持 Fullscreen API 时隐藏（GameEmbed.astro:43），无影响。

## 10. 缺失资源与 404

public/ 只有 favicon.svg 和 og-default.png。

- 缺 `favicon.ico`（P2）：部分爬虫和老浏览器会请求 /favicon.ico，目前命中 404 页（返回 404 状态且发送整页 HTML）。Google 搜索结果的站点图标支持 SVG，问题不大；建议加一个 48×48 的 ico。
- 缺 `apple-touch-icon`（P2）：iOS 加到主屏幕时没有图标。加 `public/apple-touch-icon.png`（180×180）和 `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`。
- 缺 `manifest.webmanifest`：对 SEO 无直接影响，可选。
- `<link rel="sitemap" href="/sitemap-index.xml">`（BaseLayout.astro:47）不是标准关系，无害；真正生效的是 robots.txt 中的 Sitemap 行。
- 404：wrangler `not_found_handling: "404-page"` 会以 404 状态返回 dist/404.html（行为未在线验证）。页面带 `noindex`、无 canonical、无 hreflang，不在 sitemap 中（astro.config.mjs:23 的 filter），处理正确。双语正文（EN + 带 lang 的 ZH），但 header/footer/title 都是英文，中文用户访问 /zh/xxx 的死链看到的是英文导航。可接受；如要改进，可在 404 中用一小段脚本按 `location.pathname.startsWith('/zh/')` 切换显示。404 输出了 og:url `/404/`，见第 5 节。
- robots.txt：`User-agent: * / Allow: /` + Sitemap 行，没有屏蔽任何资源，正确（域名问题见第 1 节）。

## 11. 页脚声明与信任页（E-E-A-T）

对照 docs/content-spec.md 第 6 节"Global rules"：

| 规范要求 | 现状 | 证据 |
|---|---|---|
| 页脚声明含 Nintendo、Creatures Inc.、GAME FREAK、The Pokémon Company、开发者 jpter78 | 缺 Creatures；开发者写作 "the developer of PokeSurvivor"，没写 jpter78 | src/i18n.ts:63-64（EN）、90-91（ZH） |
| 声明末尾"The game is played on its official site, pokesurvivor.com." | 缺 | 同上 |
| 每页链接官方站和 itch.io | 官方站：14 页全部有（GameLinkCard / GameEmbed）。itch.io：只有 /、/co-op/、/mobile/、/zh/、/zh/mobile/ 5 页有，其余 9 页没有 | dist 外链统计 |
| 可变事实显示 last checked 日期 | 内页都有 "Last updated 2026-10-14"（LastUpdated.astro），tier 页另有表格日期；首页没有可见日期，EN 首页正文有一句 "Facts last checked 2026-10-14"（home.md:61），ZH 首页没有 | dist `<time>` 统计 |
| ZH 声明 | spec 给的是繁体文本；现用简体，和页面一致，这一点保留现状更合理 | |

信任页：没有 About、Contact、Privacy 页（src/pages/ 下只有 7 个内容路由 + 404 + robots）。对一个以第三方游戏名做关键词的粉丝站，这几项对 E-E-A-T 和"非官方"定位都重要：
- About（P1）：谁在写、怎么测试的（tier list 依据、跑了多少局）、和官方的关系、数据来源（PokéAPI、客户端数据、官方指南），链接 jpter78 的 itch.io 和 GitHub。Article 的 author/publisher 可以指向它。
- Privacy（P1）：首页嵌入 pokesurvivor.com（Firebase、Google 登录、P2P 联机会暴露 IP，见 spec 第 2 节），本站等于在页面中加载第三方内容。若之后加统计或广告，更必须有。
- Contact（P2）：一个邮箱或 GitHub issue 链接即可，也满足 spec 第 1 节"考虑联系开发者"的需要。

页脚修复（P1，Footer.astro + i18n.ts）：
```ts
// src/i18n.ts UI.en
disclaimer: 'Unofficial fan site. Not affiliated with, endorsed by or sponsored by Nintendo, Creatures Inc., GAME FREAK, The Pokémon Company, or the PokeSurvivor developer (jpter78). Pokémon and related names are trademarks of their respective owners. The game is played on its official site, pokesurvivor.com.',
// src/i18n.ts UI.zh
disclaimer: '本站为非官方粉丝站，与任天堂、Creatures、GAME FREAK、The Pokémon Company 及 PokeSurvivor 开发者（jpter78）均无关联，也未获其认可或赞助。宝可梦及相关名称为其各自所有者的商标。游戏请在官方网站 pokesurvivor.com 游玩。',
```
```astro
<!-- src/components/Footer.astro -->
<nav aria-label={locale === 'zh' ? '页脚链接' : 'Footer'}>
  <ul class="footer-links">
    <li><a href="https://pokesurvivor.com/en/" rel="noopener">{locale === 'zh' ? '官方网站' : 'Official site'}</a></li>
    <li><a href="https://jpter78.itch.io/pokesurvivor" rel="noopener">itch.io</a></li>
    <li><a href={pathFor('about', locale)}>{t.about}</a></li>
    <li><a href={pathFor('privacy', locale)}>{t.privacy}</a></li>
  </ul>
</nav>
```
（需在 i18n.ts 的 RouteKey / ROUTES 中加 about、privacy，并决定是否加入 NAV；建议只放页脚。）

## 12. sitemap 补充修复（P2）

astro.config.mjs:22-28 的 sitemap 集成：
```js
sitemap({
  filter: (page) => !page.includes('/404'),
  i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
  serialize(item) {
    // 1) lastmod：按 URL 取对应 md 的 updated（构建前读取 frontmatter 建一个 Map）
    item.lastmod = LASTMOD.get(new URL(item.url).pathname) ?? undefined;
    // 2) x-default：指向 EN 版
    const en = item.links?.find((l) => l.lang === 'en');
    if (en) item.links.push({ lang: 'x-default', url: en.url });
    return item;
  },
}),
```
不要把 lastmod 设成构建时间（`new Date()`），每次构建都变会让 Google 不再信任该字段；应使用内容的 `updated`。`LASTMOD` 可在配置文件顶部用 `fs` 读取 src/content/pages/*/*.md 的 frontmatter 生成。

## 13. 修复清单（按优先级）

P0（上线前必须）
1. astro.config.mjs:6 改为正式域名，并加构建守卫拒绝 example.com。重新构建后抽查 dist/robots.txt、sitemap-0.xml、任一页 canonical。
2. wrangler.jsonc 加 `"workers_dev": false`、`"preview_urls": false`，绑定自定义域名，统一 www/apex 301。

P1
3. JsonLd.astro:59 改为 `.replace(/</g, '\\u003c')`。
4. 页脚声明补 Creatures、jpter78、官方站说明；页脚加官方站 + itch.io + About + Privacy 链接（i18n.ts:63-64, 90-91；Footer.astro）。
5. 新增 /about/、/privacy/（及 /zh/ 对应页），在 sitemap 中保留。
6. 首页 iframe 改为点击加载或至少窄屏不加载（GameEmbed.astro:24-33；HomePage.astro:35）。
7. TierTable 理由改为可见文本，传入 caption（TierTable.astro:37；tier-list.astro:7 及 zh 对应页）。
8. Article 加 author、image、datePublished、publisher.logo（JsonLd.astro:24-35；content.config.ts 加 published）。

P2
9. og:image 宽高/alt、twitter:title/description/image、article:modified_time；noindex 页不输出 og:url（BaseLayout.astro:49-59）。逐页 OG 图（自制截图）。
10. sitemap 加 lastmod（取内容 updated）和 x-default（astro.config.mjs:22-28）。
11. WebSite JSON-LD 统一 `url: site.href` 并加 alternateName；首页输出可见的 last updated（HomePage.astro）。
12. 导航文案 'Best Pokémon' / '最强宝可梦' 改为 'Best Starter' / '开局伙伴'（i18n.ts:44, 71）；GameLinkCard "Play on this site" 改为含关键词的锚文本。
13. 补正文链接：mobile ← co-op/rifts；tier-list ← rifts/mobile；/zh/best-pokemon/ → /zh/rifts/、/zh/co-op/。在所有内页正文或页脚链 itch.io。
14. 加 favicon.ico、apple-touch-icon（BaseLayout.astro:46 后加 link）。
15. 缩短 /zh/rifts/、/zh/tier-list/ 标题；理顺 /zh/、/zh/mobile/ 标题的简繁混排。
16. 跳转链接文案改用 `UI[locale].skip`（BaseLayout.astro:63）；主导航 aria-label 改为"Main/主导航"。
17. 更新 docs/content-spec.md：hreflang 使用 zh-Hans（与实际简体正文一致），/mobile/ 已存在。
18. 可选：`inlineStylesheets: 'always'`；首页 `preconnect` 到 pokesurvivor.com；宽屏导航 SSR 时直接展开避免轻微位移。

## 14. 未验证事项

- Cloudflare 上线后的实际状态码：无斜杠 URL 是 307 还是 301、404 页是否返回 404 状态、workers.dev 是否可访问。
- og-default.png 的画面内容（只确认了 1200×630、3.6 KB）。
- 首页 iframe 的实际传输体积和对 LCP/INP 的影响（需 Lighthouse 或真机测试）。
- Google 对本站 FAQ 富结果的展示：按 2023 年政策推断不会显示，未实测。

