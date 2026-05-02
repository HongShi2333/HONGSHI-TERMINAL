/**
 * 壁纸轮换配置
 * 修改此文件来配置壁纸相关参数
 *
 * 使用方法: 将壁纸图片放入 public/wallpapers/ 目录下，
 * 然后在下方 wallpapers 数组中添加文件名即可
 */
const wallpaperConfig = {
  /** 壁纸切换间隔（毫秒） */
  interval: 15000,
  /** 壁纸切换过渡动画时长（毫秒） */
  transitionDuration: 500,
  /** 壁纸列表 - 从 public/wallpapers/ 目录加载 */
  wallpapers: [
    "/wallpapers/d-background1.jpg",
    "/wallpapers/d-background2.jpg",
    "/wallpapers/d-background3.jpg",
    "/wallpapers/d-background4.jpg",
    "/wallpapers/d-background5.jpg",
    "/wallpapers/d-background6.jpg",
    "/wallpapers/d-background7.jpg",
    "/wallpapers/d-background8.jpg",
    "/wallpapers/d-background9.jpg",
    "/wallpapers/d-background10.jpg",
    "/wallpapers/d-background11.jpg",
    "/wallpapers/d-background12.jpg",
    "/wallpapers/d-background13.jpg",
    "/wallpapers/d-background14.jpg",
    "/wallpapers/d-background15.jpg",
    "/wallpapers/d-background16.jpg",
    "/wallpapers/d-background17.jpg",
    "/wallpapers/d-background18.jpg",
  ],
  /** 壁纸模糊度 (0-20px) */
  blur: 2,
  /** 壁纸亮度 (0-1) */
  brightness: 0.7,
  /** 是否随机顺序播放 */
  random: true,
}

export default wallpaperConfig
