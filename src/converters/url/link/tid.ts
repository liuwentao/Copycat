export function convertUrlToLinkTid(url: string, text?: string): string {
  if (text) {
    return `[[${ text }|${ url }]]`
  }
  return `[[${ url }]]`
}

export default convertUrlToLinkTid
