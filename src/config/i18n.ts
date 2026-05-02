/**
 * 国际化配置
 * 修改此文件来更改界面语言文字
 */
const i18nConfig = {
  /** 默认语言 */
  defaultLang: "zh" as const,
  /** 支持的语言列表 */
  supportedLangs: ["zh", "en"] as const,
  /** 语言标签显示 */
  langLabels: {
    zh: "中文",
    en: "EN",
  } as Record<string, string>,
}

export type Lang = (typeof i18nConfig.supportedLangs)[number]

export const translations: Record<Lang, Record<string, string>> = {
  zh: {
    // 导航
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.links": "链接",
    // 首页
    "home.profile": "个人档案",
    "home.userinfo": "用户信息",
    "home.links": "快速链接",
    "home.online": "在线",
    "home.uptime": "运行时间",
    // 关于
    "about.title": "关于我",
    "about.skills": "技能",
    // 项目
    "projects.title": "项目展示",
    // 链接
    "links.title": "社交网络",
    // 音乐
    "music.title": "音乐",
    "music.online": "在线",
    "music.local": "本地",
    "music.noOnline": "在线音乐未启用",
    "music.noLocal": "暂无本地音乐",
    "music.nowPlaying": "正在播放",
    "music.lyrics": "歌词",
    "music.playlist": "播放列表",
    // 用户信息
    "userinfo.ip": "IP地址",
    "userinfo.location": "归属地",
    "userinfo.isp": "运营商",
    "userinfo.region": "地区",
    "userinfo.device": "系统环境",
    "userinfo.loading": "获取中...",
    "userinfo.country": "国家",
    "userinfo.addr": "地址段",
    "userinfo.coordinates": "坐标",
    "userinfo.registered_country": "注册国家",
    "userinfo.asn": "AS编号",
    "userinfo.as_info": "AS信息",
    // 状态
    "status.connected": "已连接",
    "status.cpu": "处理器",
    "status.mem": "内存",
    "status.net": "网络",
    // 页脚
    "footer.copyright": "版权所有",
    // 启动
    "boot.welcome": "欢迎来到",
    "boot.allSystems": "所有系统就绪",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.links": "Links",
    "home.profile": "Profile",
    "home.userinfo": "User Info",
    "home.links": "Quick Links",
    "home.online": "Online",
    "home.uptime": "Uptime",
    "about.title": "About Me",
    "about.skills": "Skills",
    "projects.title": "Projects",
    "links.title": "Social",
    "music.title": "Music",
    "music.online": "Online",
    "music.local": "Local",
    "music.noOnline": "Online music is disabled",
    "music.noLocal": "No local tracks",
    "music.nowPlaying": "Now Playing",
    "music.lyrics": "Lyrics",
    "music.playlist": "Playlist",
    "userinfo.ip": "IP Address",
    "userinfo.location": "Location",
    "userinfo.isp": "ISP",
    "userinfo.region": "Region",
    "userinfo.device": "System",
    "userinfo.loading": "Loading...",
    "userinfo.country": "Country",
    "userinfo.addr": "Addr Block",
    "userinfo.coordinates": "Coordinates",
    "userinfo.registered_country": "Reg. Country",
    "userinfo.asn": "AS Number",
    "userinfo.as_info": "AS Info",
    "status.connected": "Connected",
    "status.cpu": "CPU",
    "status.mem": "MEM",
    "status.net": "NET",
    "footer.copyright": "Copyright",
    "boot.welcome": "Welcome to",
    "boot.allSystems": "All systems nominal",
  },
}

export default i18nConfig
