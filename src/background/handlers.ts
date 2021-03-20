import {
  getSelectionHTML
, getSelectionText
, getActiveElementContent
, getDocumentTitle
} from '../content-script/api'
import {
  convertUrlToVideoHTML
, convertUrlToAudioHTML
, convertUrlToLinkHTML
, convertUrlToLinkMarkdown
, convertUrlToLinkBBCode
, convertUrlToLinkPlain
, convertUrlToLinkTid
, convertUrlToImageHTML
, convertUrlToImageMarkdown
, convertUrlToImageTid
, convertUrlToImageBBCode
, convertUrlToImageDataURI
, convertUrlToFormattedURL
, convertHtmlToBeautifyHTML
, convertHtmlToBBCode
, convertHtmlToSafeHTML
, convertHtmlToFormattedLinkHTML
, convertHtmlToMarkdown
, convertHtmlToOnlyATagHTML
, convertHtmlToNoAttrHTML
, convertHtmlToTid
, convertHtmlToPlainText
, convertMarkdownToBeautifyMarkdown
, convertTextToRawString
, convertTextToTrimmedText
, convertTextToDecodeEntitiesText
} from '../converters'
import {
  TAB_URL_TO_PLAIN
, TAB_URL_TO_TID
, TAB_URL_TO_MARKDOWN
, TAB_URL_TO_HTML
, TAB_URL_TO_BBCODE
, FRAME_URL_TO_PLAIN
, FRAME_URL_TO_MARKDOWN
, FRAME_URL_TO_HTML
, FRAME_URL_TO_BBCODE
, FRAME_URL_TO_TID
, LINK_TO_MARKDOWN
, LINK_TO_HTML
, LINK_TO_BBCODE
, LINK_TO_TID
, SELECTION_TO_MARKDOWN
, SELECTION_TO_HTML
, SELECTION_TO_HTML_ONLY_A_TAG
, SELECTION_TO_HTML_NO_ATTR
, SELECTION_TO_BBCODE
, SELECTION_TO_PLAIN
, SELECTION_TO_PLAIN_TRIMMED
, SELECTION_TO_RAW_STRING
, SELECTION_TO_TID
, IMAGE_TO_MARKDOWN
, IMAGE_TO_MARKDOWN_DATA_URI_JPEG
, IMAGE_TO_MARKDOWN_DATA_URI_PNG
, IMAGE_TO_MARKDOWN_DATA_URI_WEBP
, IMAGE_TO_TID
, IMAGE_TO_HTML
, IMAGE_TO_HTML_DATA_URI_JPEG
, IMAGE_TO_HTML_DATA_URI_PNG
, IMAGE_TO_HTML_DATA_URI_WEBP
, IMAGE_TO_BBCODE
, IMAGE_TO_DATA_URI_RAW
, IMAGE_TO_DATA_URI_JPEG
, IMAGE_TO_DATA_URI_PNG
, IMAGE_TO_DATA_URI_WEBP
, AUDIO_TO_HTML
, VIDEO_TO_HTML
} from './symbols'

function log<T>(v: T) {
  console.log(v)
  return v
}

export type ContextMenusClickHandler = (info: browser.contextMenus.OnClickData, tab?: browser.tabs.Tab) =>
  string | void | Promise<string | void>

export type CommandComplicateHandler = (info: { [index: string]: any }, tab?: browser.tabs.Tab) =>
  string | void | Promise<string | void>

interface UniversalHandlers {
  [menuItemId: string]: ContextMenusClickHandler | CommandComplicateHandler
}

export default {
  [TAB_URL_TO_PLAIN]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkPlain(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
,  [TAB_URL_TO_TID]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkTid(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_MARKDOWN]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkMarkdown(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_HTML]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkHTML(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [TAB_URL_TO_BBCODE]: ((info, tab) => {
    if (tab && tab.url) {
      return convertUrlToLinkBBCode(tab.url, tab.title)
    }
  }) as CommandComplicateHandler
, [FRAME_URL_TO_PLAIN]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await getDocumentTitle(tab.id, info.frameId)
        return convertUrlToLinkPlain(url, title)
      } else {
        return convertUrlToLinkPlain(info.frameUrl)
      }
    }
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_TID]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await getDocumentTitle(tab.id, info.frameId)
        return convertUrlToLinkTid(url, title)
      } else {
        return convertUrlToLinkTid(info.frameUrl)
      }
    }
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_MARKDOWN]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await getDocumentTitle(tab.id, info.frameId)
        return convertUrlToLinkMarkdown(url, title)
      } else {
        return convertUrlToLinkMarkdown(info.frameUrl)
      }
    }
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_HTML]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await getDocumentTitle(tab.id, info.frameId)
        return convertUrlToLinkHTML(url, title)
      } else {
        return convertUrlToLinkHTML(info.frameUrl)
      }
    }
  }) as ContextMenusClickHandler
, [FRAME_URL_TO_BBCODE]: (async (info, tab) => {
    if (info.frameUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.frameUrl, tab.url)
        const title = await getDocumentTitle(tab.id, info.frameId)
        return convertUrlToLinkBBCode(url, title)
      } else {
        return convertUrlToLinkBBCode(info.frameUrl)
      }
    }
  }) as ContextMenusClickHandler
, [LINK_TO_MARKDOWN]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await getActiveElementContent(tab.id, info.frameId)
        const title =
        convertMarkdownToBeautifyMarkdown(
          convertHtmlToMarkdown(
            convertHtmlToBeautifyHTML(
              convertHtmlToSafeHTML(html)
            )
          )
        )
        return convertUrlToLinkMarkdown(url, title || info.linkText)
      } else {
        return convertUrlToLinkMarkdown(info.linkUrl, info.linkText)
      }
    }
  }) as ContextMenusClickHandler
, [LINK_TO_HTML]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await getActiveElementContent(tab.id, info.frameId)
        const title =
        convertHtmlToBeautifyHTML(
          convertHtmlToSafeHTML(html)
        )
        return convertUrlToLinkHTML(url, title || info.linkText)
      } else {
        return convertUrlToLinkHTML(info.linkUrl, info.linkText)
      }
    }
  }) as ContextMenusClickHandler
, [LINK_TO_BBCODE]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await getActiveElementContent(tab.id, info.frameId)
        const title =
        convertHtmlToBBCode(
          convertHtmlToBeautifyHTML(
            convertHtmlToSafeHTML(
              html
            )
          )
        )
        return convertUrlToLinkBBCode(url, title || info.linkText)
      } else {
        return convertUrlToLinkBBCode(info.linkUrl, info.linkText)
      }
    }
  }) as ContextMenusClickHandler
, [LINK_TO_TID]: (async (info, tab) => {
    if (info.linkUrl) {
      if (tab && tab.id && tab.url) {
        const url = convertUrlToFormattedURL(info.linkUrl, info.frameUrl || tab.url)
        const html = await getActiveElementContent(tab.id, info.frameId)
        const title =
        convertHtmlToBeautifyHTML(
          convertHtmlToSafeHTML(html)
        )
        return convertUrlToLinkTid(url, title || info.linkText)
      } else {
        return convertUrlToLinkTid(info.linkUrl, info.linkText)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN]: ((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageMarkdown(url)
      } else {
        return convertUrlToImageMarkdown(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_MARKDOWN_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageMarkdown(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_TID]: ((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageTid(url)
      } else {
        return convertUrlToImageTid(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageHTML(url)
      } else {
        return convertUrlToImageHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'jpeg')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'png')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_HTML_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return convertUrlToImageHTML(
        await convertUrlToImageDataURI(srcUrl, 'webp')
      )
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_BBCODE]: (async (info, tab) => {
    if (info.mediaType === 'image' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToImageBBCode(url)
      } else {
        return convertUrlToImageBBCode(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_RAW]: (async ({ mediaType, srcUrl }, tab) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl)
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_JPEG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'jpeg')
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_PNG]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'png')
    }
  }) as ContextMenusClickHandler
, [IMAGE_TO_DATA_URI_WEBP]: (async ({ mediaType, srcUrl }) => {
    if (mediaType === 'image' && srcUrl) {
      return await convertUrlToImageDataURI(srcUrl, 'webp')
    }
  }) as ContextMenusClickHandler
, [AUDIO_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'audio' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToAudioHTML(url)
      } else {
        return convertUrlToAudioHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [VIDEO_TO_HTML]: ((info, tab) => {
    if (info.mediaType === 'video' && info.srcUrl) {
      if (tab && tab.url) {
        const url = convertUrlToFormattedURL(info.srcUrl, info.frameUrl || tab.url)
        return convertUrlToVideoHTML(url)
      } else {
        return convertUrlToVideoHTML(info.srcUrl)
      }
    }
  }) as ContextMenusClickHandler
, [SELECTION_TO_MARKDOWN]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertMarkdownToBeautifyMarkdown(
          convertHtmlToMarkdown(
            convertHtmlToBeautifyHTML(
              convertHtmlToFormattedLinkHTML(
                convertHtmlToSafeHTML(html)
              , baseUrl
              )
            )
          )
        )
      )
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToFormattedLinkHTML(
            convertHtmlToSafeHTML(html)
          , baseUrl
          )
        )
      )
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML_ONLY_A_TAG]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToOnlyATagHTML(
            convertHtmlToFormattedLinkHTML(
              convertHtmlToSafeHTML(html)
            , baseUrl
            )
          )
        )
      )
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_HTML_NO_ATTR]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      return (
        convertHtmlToBeautifyHTML(
          convertHtmlToNoAttrHTML(
            convertHtmlToSafeHTML(html)
          )
        )
      )
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_BBCODE]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
        convertHtmlToBBCode(
          convertHtmlToBeautifyHTML(
            convertHtmlToFormattedLinkHTML(
              convertHtmlToSafeHTML(html)
            , baseUrl
            )
          )
        )
      )
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_PLAIN]: (async (info, tab) => {
    if (tab && tab.id) {
      return await getSelectionText(tab.id, info.frameId)
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_PLAIN_TRIMMED]: (async (info, tab) => {
    if (tab && tab.id) {
      const text = await getSelectionText(tab.id, info.frameId)
      return convertTextToTrimmedText(text)
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_RAW_STRING]: (async (info, tab) => {
    if (tab && tab.id) {
      const text = await getSelectionText(tab.id, info.frameId)
      return convertTextToRawString(text)
    }
  }) as CommandComplicateHandler
, [SELECTION_TO_TID]: (async (info, tab) => {
    if (tab && tab.id) {
      const html = await getSelectionHTML(tab.id, info.frameId)
      const baseUrl = info.frameUrl || info.pageUrl || tab.url
      return (
          convertHtmlToTid(
            convertHtmlToBeautifyHTML(
              convertHtmlToFormattedLinkHTML(
                convertHtmlToSafeHTML(html)
              , baseUrl
              )
            )
          )
      )
    }
  }) as CommandComplicateHandler
} as UniversalHandlers
