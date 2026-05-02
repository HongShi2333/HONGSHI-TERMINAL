---
Task ID: 1
Agent: Main
Task: Vue 3 重构 + 开源整理 + README 编写

Work Log:
- 阅读了所有 Next.js 源代码（9个配置文件、8个组件、工具函数、上下文、全局样式）
- 移除了旧 Next.js 项目文件（src/app, src/components, src/config, node_modules 等）
- 创建 Vue 3 + Vite + TypeScript 项目架构
- 重写9个配置文件（site, i18n, cursor, wallpaper, meting, music, nav, projects, social）
- 创建2个 composable（useLang, useGeo）和1个工具函数（device.ts）
- 重写9个 Vue SFC 组件（BootSequence, CustomCursor, WallpaperSlideshow, ScanLines, TerminalHome, MusicPlayer, UserInfo, GlassCard, TypingText）
- 创建 App.vue 和 main.ts 入口文件，全局样式 style.css
- 添加开源文件：.gitignore, MIT LICENSE, .github/workflows/deploy.yml
- 编写详细 README.md（功能介绍、项目结构、9个配置说明、5种部署方式、FAQ）
- npm install 安装依赖，vue-tsc 类型检查通过，vite build 构建成功
- 清理项目根目录，添加 .gitkeep 保持空目录

Stage Summary:
- 项目从 Next.js/React 完整迁移到 Vue 3 + Vite
- 构建产物 dist/ 约 163KB（gzip ~51KB），纯静态可部署
- 所有功能保留：自定义光标吸附、Meting+本地音乐、壁纸轮换、i18n、用户信息
- 开源就绪：清晰文件结构、MIT 许可、GitHub Actions 自动部署、详细 README
