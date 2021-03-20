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
    }).addRule('header1', {
        filter: ['h1', 'h2', 'h3', 'h4'],
        replacement(content, node) {
            const header = '!'
            const nodeName = node.nodeName
            return header.repeat(parseInt(nodeName.substring(1), 10)) + content
        }
    })
        .addRule('header1', {
            filter: ['em', 'i', 'strong', 'b'],
            replacement(content, node) {
                let split = '//'
                console.info(node.nodeName)
                if ('STRONG' === node.nodeName || 'B' === node.nodeName) {
                    split = '\'\''
                }
                if (!content.trim()) {
                    return ''
                }
                return `${split}${content}${split}`
            }
        })
        .addRule('url', {
            filter: ['a'],
            replacement(content, node) {
                const href = node.getAttribute('href')
                let title = cleanAttribute(node.getAttribute('title'))
                if (title) {
                    title = ' "' + title + '"'
                }
                return '[[' + content + '|' + href + title + ']]'
            }
        })
        .addRule('image', {
            filter: ['img'],
            replacement(content, node) {
                const src = node.getAttribute('src') || ''
                return `[img[${src}]]`
            }
        })
}
function cleanAttribute(attribute: string | null) {
    return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : ''
}
export function convertHtmlToTid(html: string): string {
    const turndownService = createTurndownService()
    return turndownService.turndown(html)
}
