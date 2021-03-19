import {
  TAB_URL_TO_PLAIN
, TAB_URL_TO_TID
, TAB_URL_TO_MARKDOWN
, TAB_URL_TO_HTML
, TAB_URL_TO_BBCODE
, FRAME_URL_TO_PLAIN
, FRAME_URL_TO_TID
, LINK_TO_TID
, FRAME_URL_TO_MARKDOWN
, FRAME_URL_TO_HTML
, FRAME_URL_TO_BBCODE
, LINK_TO_MARKDOWN
, LINK_TO_HTML
, LINK_TO_BBCODE
, SELECTION_TO_MARKDOWN
, SELECTION_TO_HTML
, SELECTION_TO_HTML_ONLY_A_TAG
, SELECTION_TO_HTML_NO_ATTR
, SELECTION_TO_BBCODE
, SELECTION_TO_PLAIN
, SELECTION_TO_PLAIN_TRIMMED
, SELECTION_TO_RAW_STRING
, IMAGE_TO_MARKDOWN
, IMAGE_TO_MARKDOWN_DATA_URI_JPEG
, IMAGE_TO_MARKDOWN_DATA_URI_PNG
, IMAGE_TO_MARKDOWN_DATA_URI_WEBP
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

interface IMenuItem {
  id?: string
  type?: string
  contexts?: string[]
  title?: string
}

export default new Map<string[], IMenuItem[]>([
  [['page'], [
    { id: TAB_URL_TO_PLAIN }
  , { id: TAB_URL_TO_MARKDOWN }
  , { id: TAB_URL_TO_BBCODE }
  , { id: TAB_URL_TO_HTML }
  , { id: TAB_URL_TO_TID }
  ]]
, [['frame'], [
    { id: FRAME_URL_TO_PLAIN }
  , { id: FRAME_URL_TO_MARKDOWN }
  , { id: FRAME_URL_TO_BBCODE }
  , { id: FRAME_URL_TO_HTML }
  , { id: FRAME_URL_TO_TID }
  ]]
, [['link'], [
    { id: LINK_TO_MARKDOWN }
  , { id: LINK_TO_BBCODE }
  , { id: LINK_TO_HTML }
  , { id: LINK_TO_TID}
  ]]
, [['selection'], [
    { id: SELECTION_TO_MARKDOWN }
  , { id: SELECTION_TO_BBCODE }
  , { id: SELECTION_TO_HTML }
  , { id: SELECTION_TO_HTML_ONLY_A_TAG }
  , { id: SELECTION_TO_HTML_NO_ATTR }
  , { id: SELECTION_TO_PLAIN }
  , { id: SELECTION_TO_PLAIN_TRIMMED }
  , { id: SELECTION_TO_RAW_STRING }
  ]]
, [['image'], [
    { id: IMAGE_TO_MARKDOWN }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_JPEG }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_PNG }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_WEBP }
  , { id: IMAGE_TO_BBCODE }
  , { id: IMAGE_TO_HTML }
  , { id: IMAGE_TO_HTML_DATA_URI_JPEG }
  , { id: IMAGE_TO_HTML_DATA_URI_PNG }
  , { id: IMAGE_TO_HTML_DATA_URI_WEBP }
  , { id: IMAGE_TO_DATA_URI_RAW }
  , { id: IMAGE_TO_DATA_URI_JPEG }
  , { id: IMAGE_TO_DATA_URI_PNG }
  , { id: IMAGE_TO_DATA_URI_WEBP }
  ]]
, [['audio'], [
    { id: AUDIO_TO_HTML }
  ]]
, [['video'], [
    { id: VIDEO_TO_HTML }
  ]]
])
