import TurndownService = require('turndown/lib/turndown.cjs')


function createTurndownService(options: Turndown.TurndownServiceOptions = {}) {
    return new TurndownService({
        headingStyle: 'atx'
        , hr: '---'
        , bulletListMarker: '*'
        , codeBlockStyle: 'fenced'
        , fence: '```'
        , emDelimiter: '*'
        , strongDelimiter: '**'
        , linkStyle: 'inlined'
        , keepReplacement(content: string): string {
            return content
        }
    }).addRule('paragraph', {
        filter: 'p',
        replacement: function (content: string): string {
            return '\n\n' + content + '\n\n'
          }
    })
    .addRule('lineBreak', {
        filter: 'br',
        replacement: function (content: string, node: Node): string {
          return '\n'
        }
      })
        .addRule('heading', {
            filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            replacement: function (content: string, node: Node): string {
                if (content === '') { return '' }
                var hLevel = Number(node.nodeName.charAt(1))
                console.log('[DEBUG] <h>', content)
                return '\n\n' + repeat("*", hLevel) + ' ' + content + '\n\n'
              }
        })
        .addRule(  'blockquote', {
            filter: 'blockquote',
            replacement: function (content: string): string {
              return '\n\n#+begin_quote\n' +
              content +
              '\n#+end_quote\n\n'
            }
          })
        .addRule('list', {
            filter: ['ul', 'ol'],

            replacement: function (content: string, node: Node): string {
              var parent = node.parentNode
              if (!parent) { return 'ERROR' }
              if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
                return '\n' + content
              } else {
                return '\n\n' + content + '\n\n'
              }
            }
        }).addRule('listItem', {
            filter: 'li',

            replacement: function (content: string, node: Node): string {
              const indent = Array(2).fill(' ').join('')
              content = content
                .replace(/^\n+/, '') // remove leading newlines
                .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
                .replace(/\n/gm, '\n' + indent) // indent
              let prefix = '- '
              const parent = node.parentNode
              if (!parent) { return 'ERROR: Why does <li> has no parentNode?' }
              if (parent.nodeName === 'OL') {
                const parentEl: HTMLElement = parent as HTMLElement
                const start = parentEl.getAttribute('start')
                const index = Array.prototype.indexOf.call(parent.children, node)
                prefix = (start ? Number(start) + index : index + 1) + ' '
              }
              return (
                prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
              )
            }
        }).addRule('checkboxInList', {
            filter: function (node) {
                const el = node as unknown as HTMLInputElement
                return el.type === 'checkbox' && !!el.parentNode && el.parentNode.nodeName === 'LI'
              },
              replacement: function (content, node) {
                const el = node as unknown as HTMLInputElement
                return (el.checked ? '[X]' : '[ ]') + ' '
              }
        }).addRule('horizontalRule', {
            filter: 'hr',

            replacement: function (content: string, node: Node): string {
              return '\n\n-----\n\n'
            }
        }).addRule('italic', {
            filter: ['em', 'i'],

            replacement: function (content: string, node): string {
              return wrapInlineMarkWithSpace(content, node, '/')
            }
        }).addRule('bold', {
            filter: ['strong', 'b'],

            replacement: function (content: string, node): string {
              return wrapInlineMarkWithSpace(content, node, '*')
            }
        }).addRule('strike', {
            filter: ['strike', 's', 'del'],

            replacement: function (content: string, node): string {
              return wrapInlineMarkWithSpace(content, node, '+')
            }
        }).addRule('underline', {
            filter: 'u',

            replacement: function (content: string, node): string {
              return wrapInlineMarkWithSpace(content, node, '_')
            }
        }).addRule('sup', {
            filter: 'sub',

            replacement: function (content: string, node): string {
                return '_{' + content + '}'
              }
        }).addRule('code', {
            filter: function (node) {
                var hasSiblings = node.previousSibling || node.nextSibling
                var isInCodeBlock= false;
                if( node.parentNode!==null){
                    isInCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings
                }
                return (node.nodeName === 'CODE' || node.nodeName === 'KBD') && !isInCodeBlock
              },
          
              replacement: function (content, node, options): string {
                let ch = '='
                if (content.includes('=') && content.includes('~')) {
                  return `\n\n: ${content} \n\n`
                }
                else if (ch === '=' && content.includes('=')) { ch = '~' }
                else if (ch === '~' && content.includes('~')) { ch = '~' }
                if (node.closest('table')) {
                  ch = '~'
                  if (content.includes('~')) {
                    return content  // give up...
                  }
                }
                return wrapInlineMarkWithSpace(content, node, ch)
              }
        }).addRule('img', {
            filter: 'img',

            replacement: function (content: string, node, options) {
                var alt = cleanAttribute(node.getAttribute('alt') || '')
                var src = node.getAttribute('src') || ''
                if (options.decodeUri) {
                  src = safeDecodeURI(src)
                }
                var title = cleanAttribute(node.getAttribute('title') || '')
                return `#+CAPTION: ${ title }\n\n[[${src}]]`
              }
        }).addRule('inlineLink', {
            filter: function (node: HTMLElement): boolean {
                return (
                  node.nodeName === 'A' &&
                  node.hasAttribute('href')
                )
              },

              replacement: function (content: string, node) {

                if (content === '') { return '' } // For example, Github's H1/H2/H3... has invisible # link
                let href = node.getAttribute('href') || ''
                href = safeDecodeURI(href)
                let title = cleanAttribute(node.getAttribute('title') || '')
                if (title) {
                  title = ' "' + title + '"'
                }
                // When <a> contains exactly only one Node and it's <img>
                if (node.childNodes.length === 1) {
                  const child = node.firstChild!
                  if (child.nodeName === 'IMG') {
                    const img = child as HTMLImageElement
                    if (href === img.src) {
                      return `[[${href}]]`
                    }
                    const imgSrc = safeDecodeURI(img.src)
                    return `[[${href}][${imgSrc}]]`  // Org-mode's canonical syntax for Image + Link
                  }
                }
                return `[[${href}][${content}]]`
              }
        })


}
function safeDecodeURI(str: string): string {
    try {
      return decodeURI(str)
    } catch (e) {
      console.error('[ERROR] decodeURI error', e)
      return str
    }
  }
function repeat (character: string, count: number) {  // REFACTOR: use padLeft
    return Array(count + 1).join(character)
  }
function cleanAttribute(attribute: string | null) {
    return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : ''
}

function wrapInlineMarkWithSpace(textContent: string, node: Node, delimiterMark: string): string {
    // if (!supportMultipleLines) {
    //   textContent = textContent.replace(/\r?\n|\r/g, ' ')
    // }
    textContent = textContent.trim()
    if (textContent === '') { return '' }
    let lSpace = ''
    let rSpace = ''
    const previous = node.previousSibling
    if (previous && !previous.textContent!.endsWith(' ')) {
      lSpace = ' '
    }
    const next = node.nextSibling
    if (next && !next.textContent!.endsWith(' ')) {
      rSpace = ' '
    }
    const ch = delimiterMark
    return  lSpace + ch + textContent + ch + rSpace
  }
export function convertHtmlToOrg(html: string): string {
    const turndownService = createTurndownService()
    return turndownService.turndown(html)
}
