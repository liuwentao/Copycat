import { convertHtmlToTid } from '../../../src/converters/html/tiddly'

test('convertHtmlHeaderToTid', () => {
    expect(convertHtmlToTid('<h1>Hello World</h1>'))
        .toBe('!Hello World')
    expect(convertHtmlToTid('<h2>Hello World</h2>'))
        .toBe('!!Hello World')
    expect(convertHtmlToTid('<h3>Hello World</h3>'))
        .toBe('!!!Hello World')
    expect(convertHtmlToTid('<h4>Hello World</h4>'))
        .toBe('!!!!Hello World')
    expect(convertHtmlToTid('<a href="https://www.baidu.com">Test</a>'))
        .toBe('[[Test|https://www.baidu.com]]')
    expect(convertHtmlToTid('<em>Test<em>'))
        .toBe('//Test//')
    expect(convertHtmlToTid('<strong>Test<strong>'))
        .toBe("''Test''")
    expect(convertHtmlToTid('<img src="https://hello.world" />'))
        .toBe('[img[https://hello.world]]')
})

