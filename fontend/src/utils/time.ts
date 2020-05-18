export function parseTime(date: Date): string {
  const diff = (new Date().getTime() - date.getTime()) / 1000
  if (diff <= 30) {
    return `${Math.ceil(diff)}秒前`
  } else if (diff <= 3600) {
    return `${Math.ceil(diff / 60)}分前`
  } else if (diff <= 3600 * 24) {
    return `${Math.floor(diff / 3600)}小时前`
  } else if (diff > 3600 * 24 && diff < 3600 * 24 * 30) {
    return `${Math.floor(diff / (3600 * 24))}天前`
  } else {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const hour = date.getHours()
    // const min = date.getMinutes()
    // const seconds = date.getSeconds()
    return `${year}-${month}-${day}`
  }
}
