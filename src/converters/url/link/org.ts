export function convertUrlToLinkOrg(url: string, text?: string): string {
  if (text) {
    return `[[${ url }][${ text }]]`
  }
  return `[[${ url }]]`
}

export default convertUrlToLinkOrg
