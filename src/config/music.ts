/**
 * 本地音乐配置
 * 站长将MP3文件上传到 public/music/ 目录下
 * 然后在下方列表中添加曲目信息
 *
 * 封面图片放在 public/music/covers/ 目录下
 * 歌词文件(.lrc)放在 public/music/lyrics/ 目录下
 */
export interface LocalTrack {
  /** 歌曲名称 */
  name: string
  /** 艺术家 */
  artist: string
  /** MP3文件路径 (相对于public目录) */
  url: string
  /** 封面图片路径 (相对于public目录), 可选 */
  cover?: string
  /** 歌词文件路径 (相对于public目录), 可选 */
  lrc?: string
}

const musicConfig = {
  /** 本地音乐列表 */
  localTracks: [
    // 示例：添加你的本地音乐
    // {
    //   name: "夜曲",
    //   artist: "周杰伦",
    //   url: "/music/yequ.mp3",
    //   cover: "/music/covers/yequ.jpg",
    //   lrc: "/music/lyrics/yequ.lrc",
    // },
  ] as LocalTrack[],
}

export default musicConfig
