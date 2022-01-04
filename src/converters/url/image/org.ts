export function convertUrlToImageOrg(url: string): string {
  return `#+CAPTION: Caption\n\n[[${url}]]`
}

export default convertUrlToImageOrg
