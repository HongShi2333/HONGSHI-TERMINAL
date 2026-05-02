/**
 * 检测用户操作系统和浏览器
 * 通过解析 UserAgent 获取系统及浏览器信息
 */

export function detectDevice(): string {
  const ua = navigator.userAgent

  // Detect OS
  let os = 'Unknown OS'
  if (ua.includes('Win')) {
    if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11'
    else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1'
    else if (ua.includes('Windows NT 6.2')) os = 'Windows 8'
    else if (ua.includes('Windows NT 6.1')) os = 'Windows 7'
    else os = 'Windows'
  } else if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X ([\d_]+)/)
    const ver = match ? match[1].replace(/_/g, '.') : ''
    os = 'macOS' + (ver ? ' ' + ver : '')
  } else if (ua.includes('Android')) {
    const match = ua.match(/Android ([\d.]+)/)
    os = 'Android' + (match ? ' ' + match[1] : '')
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    const match = ua.match(/OS ([\d_]+)/)
    const ver = match ? match[1].replace(/_/g, '.') : ''
    os = 'iOS' + (ver ? ' ' + ver : '')
  } else if (ua.includes('Linux')) {
    os = 'Linux'
  } else if (ua.includes('CrOS')) {
    os = 'ChromeOS'
  }

  // Detect Browser
  let browser = 'Unknown'
  if (ua.includes('Edg/')) {
    const match = ua.match(/Edg\/([\d.]+)/)
    browser = 'Edge' + (match ? ' ' + match[1].split('.').slice(0, 2).join('.') : '')
  } else if (ua.includes('OPR/') || ua.includes('Opera')) {
    const match = ua.match(/OPR\/([\d.]+)/)
    browser = 'Opera' + (match ? ' ' + match[1].split('.').slice(0, 2).join('.') : '')
  } else if (ua.includes('Vivaldi')) {
    browser = 'Vivaldi'
  } else if (ua.includes('Firefox/')) {
    const match = ua.match(/Firefox\/([\d.]+)/)
    browser = 'Firefox' + (match ? ' ' + match[1].split('.').slice(0, 2).join('.') : '')
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    const match = ua.match(/Version\/([\d.]+)/)
    browser = 'Safari' + (match ? ' ' + match[1].split('.').slice(0, 2).join('.') : '')
  } else if (ua.includes('Chrome/')) {
    const match = ua.match(/Chrome\/([\d.]+)/)
    browser = 'Chrome' + (match ? ' ' + match[1].split('.').slice(0, 2).join('.') : '')
  }

  return os + ' / ' + browser
}
