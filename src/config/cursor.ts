/**
 * 自定义光标配置
 * 修改此文件来更改光标样式和行为
 */
const cursorConfig = {
  /** 是否启用自定义光标 */
  enabled: true,
  /** 光标颜色 (CSS颜色值) */
  color: "#00ff41",
  /** 光标点大小 (px) */
  dotSize: 6,
  /** 吸附范围 (px) - 光标在此范围内会触发框选效果 */
  snapRange: 50,
  /** 框选元素时的内边距 (px) */
  snapPadding: 8,
  /** 框选角标长度 (px) */
  cornerLength: 14,
  /** 框选角标线宽 (px) */
  cornerWidth: 2,
  /** 框选圆角半径 (px) */
  cornerRadius: 8,
  /** 光标跟随延迟 (0-1) - 越小越灵敏 */
  followDelay: 0.12,
  /** 框选过渡动画时长 (ms) */
  snapTransitionDuration: 200,
  /** 是否显示光标轨迹 */
  trailEnabled: true,
  /** 轨迹长度 */
  trailLength: 5,
  /** 点击涟漪效果 */
  rippleEnabled: true,
  /** 涟漪颜色 */
  rippleColor: "#00ff41",
}

export default cursorConfig
