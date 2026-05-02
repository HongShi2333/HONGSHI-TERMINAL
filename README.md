# HONGSHI TERMINAL

现代科幻风格个人主页，基于 Vue 3 + Vite + TypeScript + Tailwind CSS 构建。支持 Meting 音乐播放、自定义光标吸附、壁纸轮换、中英双语切换等功能，可部署至任意静态托管平台。

## 预览

![NEXUS TERMINAL](public/wallpapers/wallpaper-1.jpg)

## 功能特性

- **现代科幻 UI** — 霓虹绿配色、毛玻璃卡片、扫描线叠加、启动动画
- **自定义光标** — 四角圆角矩形框吸附交互元素，光标轨迹与点击涟漪
- **壁纸轮换** — 自动切换壁纸，支持模糊、亮度调节与随机顺序
- **音乐播放器** — 左侧悬浮面板，在线歌单 (Meting) + 本地 MP3 双标签页
- **用户信息** — 右下角显示访客 IP、归属地、运营商、坐标、设备信息
- **中英双语** — 中文默认，右上角一键切换
- **纯静态部署** — 无需服务器，构建产物为纯 HTML/CSS/JS，可部署至 GitHub Pages / Cloudflare Pages / Netlify / Vercel 等

## 技术栈

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架 (Composition API) |
| [Vite](https://vitejs.dev/) | 构建工具 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS 4](https://tailwindcss.com/) | 原子化 CSS |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9 (或 pnpm / yarn)

### 安装

```bash
# 克隆仓库
git clone https://github.com/hongshi2333/hongshi-terminal.git
cd nexus-terminal

# 安装依赖
npm install
```

### 开发

```bash
npm run dev
```

浏览器访问 `http://localhost:5173` 即可预览。

### 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到任意静态托管平台。

### 预览构建产物

```bash
npm run preview
```

## 项目结构

```
nexus-terminal/
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages 自动部署
├── public/
│   ├── logo.svg                # 站点图标
│   ├── wallpapers/             # 壁纸图片目录
│   │   ├── wallpaper-1.jpg
│   │   ├── wallpaper-2.jpg
│   │   └── wallpaper-3.jpg
│   └── music/                  # 本地音乐目录
│       ├── covers/             # 封面图片
│       └── lyrics/             # 歌词文件 (.lrc)
├── src/
│   ├── main.ts                 # 应用入口
│   ├── App.vue                 # 根组件
│   ├── style.css               # 全局样式
│   ├── config/                 # ⚙️ 配置文件（修改此处定制你的主页）
│   │   ├── site.ts             # 站点基础信息（名称、描述、作者）
│   │   ├── i18n.ts             # 国际化翻译
│   │   ├── cursor.ts           # 光标样式与行为
│   │   ├── wallpaper.ts        # 壁纸轮换参数
│   │   ├── meting.ts           # 在线音乐 (Meting API)
│   │   ├── music.ts            # 本地音乐列表
│   │   ├── nav.ts              # 导航栏链接
│   │   ├── projects.ts         # 项目展示
│   │   └── social.ts           # 社交链接
│   ├── composables/            # 组合式函数
│   │   ├── useLang.ts          # 语言切换与翻译
│   │   └── useGeo.ts           # 地理信息获取
│   ├── components/             # 组件
│   │   ├── BootSequence.vue    # 启动动画
│   │   ├── CustomCursor.vue    # 自定义光标
│   │   ├── WallpaperSlideshow.vue # 壁纸轮换
│   │   ├── ScanLines.vue       # 扫描线特效
│   │   ├── TerminalHome.vue    # 主界面内容
│   │   ├── MusicPlayer.vue     # 音乐播放器
│   │   ├── UserInfo.vue        # 用户信息面板
│   │   ├── GlassCard.vue       # 毛玻璃卡片
│   │   └── TypingText.vue      # 打字机效果
│   └── utils/
│       └── device.ts           # 设备检测 (OS/浏览器)
├── index.html                  # HTML 入口
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
├── package.json
├── LICENSE                     # MIT License
└── README.md                   # 本文件
```

## 配置说明

所有可定制内容均在 `src/config/` 目录下，修改对应文件即可。

### 站点信息 — `src/config/site.ts`

```ts
const siteConfig = {
  name: "HONGSHI TERMINAL",      // 站点名称
  subtitle: "个人指挥中心",      // 副标题
  description: "现代科幻风格个人终端界面",
  url: "https://home.hongshi.cc.cd",
  icon: "/logo.svg",           // 图标路径 (public 目录下)
  author: "CYBERNAUT",
  bio: "数字世界的探索者...",    // 个人简介
  version: "v2.077",
  lang: "zh-CN",               // 默认语言
}
```

### 导航栏 — `src/config/nav.ts`

```ts
const navConfig = {
  items: [
    { label: "HOME", href: "#home", icon: "terminal" },
    { label: "ABOUT", href: "#about", icon: "user" },
    // 添加更多导航项...
  ],
}
```

### 社交链接 — `src/config/social.ts`

```ts
const socialConfig = {
  links: [
    { name: "GitHub", url: "https://github.com/your-username", icon: "github" },
    { name: "Twitter", url: "https://twitter.com/your-handle", icon: "twitter" },
    // 支持图标: github, twitter, mail, book-open
  ],
}
```

### 项目展示 — `src/config/projects.ts`

```ts
const projectsConfig = {
  items: [
    {
      name: "PROJECT::NAME",
      description: "项目描述",
      tech: ["Vue", "TypeScript"],  // 技术标签
      url: "https://github.com/...",
      status: "ACTIVE",              // ACTIVE | BETA | ARCHIVED | WIP
    },
  ],
}
```

### 在线音乐 (Meting) — `src/config/meting.ts`

通过 [MetingJS](https://github.com/metowolf/MetingJS) 接入在线音乐平台歌单。

```ts
const metingConfig = {
  enabled: true,
  api: "https://meting.qjqq.cn",   // Meting API 地址
  server: "netease",                // 平台: netease | tencent | kugou | xiami | baidu
  type: "playlist",                 // 类型: song | playlist | album | search | artist
  id: "7354947782",                 // 歌单/歌曲 ID
  autoplay: false,
  theme: "#00ff41",
  mode: "random",                   // 播放模式: random | single | circulation | order
  volume: 0.4,
}
```

**获取歌单 ID：** 打开网易云音乐网页版，找到歌单页面 URL 中的数字即为 ID。例如 `https://music.163.com/#/playlist?id=7354947782` 中的 `7354947782`。

### 本地音乐 — `src/config/music.ts`

站长可将 MP3 文件上传到 `public/music/` 目录，然后在配置中添加曲目信息。

```ts
const musicConfig = {
  localTracks: [
    {
      name: "夜曲",
      artist: "周杰伦",
      url: "/music/yequ.mp3",           // MP3 文件路径
      cover: "/music/covers/yequ.jpg",   // 封面 (可选)
      lrc: "/music/lyrics/yequ.lrc",     // 歌词 (可选)
    },
  ] as LocalTrack[],
}
```

**文件存放规则：**

| 文件类型 | 目录 | 示例路径 |
|---------|------|---------|
| MP3 音频 | `public/music/` | `public/music/yequ.mp3` |
| 封面图片 | `public/music/covers/` | `public/music/covers/yequ.jpg` |
| LRC 歌词 | `public/music/lyrics/` | `public/music/lyrics/yequ.lrc` |

### 壁纸 — `src/config/wallpaper.ts`

```ts
const wallpaperConfig = {
  interval: 15000,             // 切换间隔 (毫秒)
  transitionDuration: 1500,    // 过渡动画时长 (毫秒)
  wallpapers: [
    "/wallpapers/wallpaper-1.jpg",
    "/wallpapers/wallpaper-2.jpg",
    // 将图片放入 public/wallpapers/ 然后在此添加路径
  ],
  blur: 2,                     // 模糊度 (0-20px)
  brightness: 0.3,             // 亮度 (0-1)
  random: true,                // 是否随机顺序
}
```

### 光标 — `src/config/cursor.ts`

```ts
const cursorConfig = {
  enabled: true,               // 是否启用自定义光标
  color: "#00ff41",            // 光标颜色
  dotSize: 6,                  // 光标点大小 (px)
  snapRange: 50,               // 吸附触发距离 (px)
  snapPadding: 8,              // 吸附框内边距 (px)
  cornerLength: 14,            // 四角线段长度 (px)
  cornerWidth: 2,              // 四角线段宽度 (px)
  cornerRadius: 8,             // 四角圆角半径 (px)
  followDelay: 0.12,           // 跟随延迟 (0-1)
  trailEnabled: true,          // 是否显示轨迹
  trailLength: 5,              // 轨迹长度
  rippleEnabled: true,         // 点击涟漪效果
}
```

### 国际化 — `src/config/i18n.ts`

支持中英双语，可扩展更多语言。修改 `translations` 对象即可添加新语言：

```ts
const i18nConfig = {
  defaultLang: "zh",
  supportedLangs: ["zh", "en"],  // 添加新语言代码到此处
  langLabels: { zh: "中文", en: "EN" },
}
```

## 部署

项目构建产物为纯静态文件（HTML/CSS/JS），可部署到任意静态托管平台。

### GitHub Pages

项目已内置 GitHub Actions 自动部署工作流 (`.github/workflows/deploy.yml`)，只需：

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages → Source 选择 "GitHub Actions"
3. 推送到 `main` 分支即可自动构建部署

### Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 创建新项目，连接 GitHub 仓库
3. 构建配置：
   - **构建命令**: `npm run build`
   - **输出目录**: `dist`
4. 部署

### Netlify

1. 登录 [Netlify](https://www.netlify.com/)
2. 从 Git 导入项目
3. 构建配置：
   - **构建命令**: `npm run build`
   - **发布目录**: `dist`
4. 部署

### Vercel

1. 登录 [Vercel](https://vercel.com/)
2. 导入 Git 仓库
3. Framework Preset 选择 "Vite"
4. 部署

### 手动部署

```bash
# 构建
npm run build

# dist/ 目录即为可部署的静态文件
# 将 dist/ 目录下的所有文件上传到你的服务器/CDN 即可
```

## 自定义开发

### 修改主题色

主要颜色定义在 `src/style.css` 的 `@theme inline` 块中：

```css
@theme inline {
  --color-neon: #00ff41;         /* 主色调 (霓虹绿) */
  --color-neon-dim: #00cc33;     /* 暗色调 */
  --color-neon-glow: rgba(0, 255, 65, 0.4);
  --color-amber: #ffb000;        /* 次色调 (琥珀色) */
  --color-cyan: #00ffff;         /* 第三色 (青色) */
  --color-glass-bg: rgba(2, 12, 6, 0.65);   /* 玻璃卡片背景 */
  --color-glass-border: rgba(0, 255, 65, 0.12);
}
```

### 添加新页面/分区

在 `src/components/TerminalHome.vue` 中添加新的 `v-else-if` 分区即可。

### 扩展语言

在 `src/config/i18n.ts` 的 `supportedLangs` 和 `translations` 中添加新语言条目。

## 常见问题

**Q: 音乐播放器不显示？**
A: 确保 `src/config/meting.ts` 中 `enabled` 为 `true`，且 `id` 为有效的歌单 ID。Meting API 需要网络访问。

**Q: 自定义光标在某些浏览器不工作？**
A: 自定义光标依赖鼠标事件，触屏设备上会自动隐藏。桌面浏览器需确保未禁用 JavaScript。

**Q: 壁纸不显示？**
A: 确保壁纸图片已放入 `public/wallpapers/` 目录，且路径在 `src/config/wallpaper.ts` 中正确配置。

**Q: 如何关闭自定义光标？**
A: 在 `src/config/cursor.ts` 中将 `enabled` 设为 `false`。

**Q: 部署后页面空白？**
A: 检查 `vite.config.ts` 中的 `base` 配置。如果部署在子路径下（如 `https://example.com/blog/`），需将 `base` 改为 `'/blog/'`。

## License

[MIT](LICENSE)
