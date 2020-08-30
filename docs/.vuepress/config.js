module.exports= {
    title: 'Lerna',
    description: "用于管理带有多个包的 JavaScript 项目的工具。",
    base: '/lerna-docs-zh-cn/',
    markdown: {
        lineNumbers: true,
        anchor: {
            permalink: false
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        displayAllHeaders: false,
        nav: [
            // {
            //     text: "主站",
            //     link: "https://febeacon.com"
            // },
            {
                text: "文档首页",
                link: "/"
            }
        ],
        sidebar: [
            {
                title: '关于',
                path: '/routes/about',
                sidebarDepth: 2
            },
            {
                title: '开始',
                path: '/routes/start',
                sidebarDepth: 2
            },
            {
                title: '如何工作的？',
                path: '/routes/how_it_works',
                sidebarDepth: 2
            },
            {
                title: '排忧解难',
                path: '/routes/troubleshooting',
                sidebarDepth: 2
            },
            {
                title: '常见问题',
                path: '/routes/FAQ',
                sidebarDepth: 2
            },
            {
                title: '概念',
                path: '/routes/concepts',
                sidebarDepth: 2
            }
        ]
    },
    head: [
        ["link", {
            rel: "icon", href: "/images/lerna_favicon.ico"
        }]
    ]
}