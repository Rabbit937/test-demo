import { defineConfig } from 'unocss'

export default defineConfig({
    rules: [
        // flex
        ['align-content-center', { 'align-content': 'center' }],
        ['align-items-center', { 'align-items': 'center' }],
        // border
        ['border-[#e8eaec]', { border: '1px solid #e8eaec' }],
        ['border-bottom-[#e8eaec]', { 'border-bottom': '1px solid #e8eaec' }],
        ['border-top-[#e8eaec]', { 'border-top': '1px solid #e8eaec' }],
        ['border-right-[#e8eaec]', { 'border-right': '1px solid #e8eaec' }],
        ['border-left-[#e8eaec]', { 'border-left': '1px solid #e8eaec' }],

        ['border-radius-6px', { 'border-radius': '6px' }],
        ['border-radius-3px', { 'border-radius': '3px' }],
        // text
        ['ellipsis', {
            overflow: 'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
        }],
        ['multiline-ellipsis', {
            display: '-webkit-box',
            overflow: 'hidden',
            '-webkit-box-orient': 'vertical',
            'text-overflow': 'ellipsis',
            '-webkit-line-clamp': '3',
        }],


        ["hover-box-shadow", { "box-shadow": "0 0 6px 0 hsla(0, 0 %, 47.5 %,.5)" }]
    ]
})      