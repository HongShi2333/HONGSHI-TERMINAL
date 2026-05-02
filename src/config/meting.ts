/**
 * Meting 音乐播放器配置
 * 修改此文件来配置音乐播放源和参数
 *
 * 支持的平台: netease(网易云), tencent(QQ音乐), kugou(酷狗), xiami(虾米), baidu(百度)
 */
const metingConfig = {
  /** 是否启用音乐播放器 */
  enabled: true,
  /** Meting API 服务器地址 */
  api: "https://api.qijieya.cn/meting",
  /** 音乐平台: netease | tencent | kugou | xiami | baidu */
  server: "netease" as const,
  /** 播放类型: song | playlist | album | search | artist */
  type: "playlist" as const,
  /** 歌曲/歌单ID */
  id: "9182006753",
  /** 是否自动播放 */
  autoplay: false,
  /** 播放器主题色 (CSS颜色值) */
  theme: "#00ff41",
  /** 播放器模式: random | single | circulation | order */
  mode: "random" as const,
  /** 初始音量 (0-1) */
  volume: 0.4,
}

export default metingConfig
