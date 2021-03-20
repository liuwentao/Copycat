export function convertUrlToImageTid(url: string): string {
  return `[img[${url}]]`
}

export default convertUrlToImageTid
