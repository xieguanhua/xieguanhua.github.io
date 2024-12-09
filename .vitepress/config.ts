import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
// @ts-ignore
export default defineConfig({
    ignoreDeadLinks: true,
    title: "靓仔的博客",
    description: "A VitePress Site",
    head: [
      [
        'link',
        {href: '/css/waifu.min.css', rel:"stylesheet",type:"text/css"},
      ],
        [
            'script',
            {src: '/js/install.js'},
        ]
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            },
            {
                text: 'interview',
                collapsed: true,
                items: [
                    {text: 'HTML', link: '/interview/3-HTML'},
                    {text: 'CSS', link: '/interview/4-CSS'},
                    {text: 'JS', link: '/interview/5-JS'},
                    {text: '性能优化', link: '/interview/6-optimize'},
                    {text: 'Vue', link: '/interview/13-vue'},
                    {text: 'Vue性能优化', link: '/interview/14-vueOptimize'},
                    {text: 'React', link: '/interview/7-react'},
                    {text: '工程化', link: '/interview/15-engineering'},
                    {text: '网络', link: '/interview/8-network'},
                    {text: '浏览器原理', link: '/interview/9-browser'},
                    {text: '手写', link: '/interview/10-writeCode'},
                    {text: '输出', link: '/interview/11-codePrint'},
                    {text: 'LeetCode', link: '/interview/12-LeetCode'},
                ]
            }

        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/xieguanhua/xieguanhua.github.io'}
        ]
    }
})
