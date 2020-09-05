function getBasicSideBar() {
    return [
        'about',
        'start',
        'how_it_works',
        'troubleshooting',
        'FAQ',
        'concepts'
    ]
}

function getCommandsSideBar() {
    return [
        '',
        'publish',
        'version',
        'bootstrap',
        'list',
        'changed'
    ]
}

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
            },
            {
                text: "英文文档",
                link: "https://github.com/lerna/lerna"
            },
            {
                text: "Lerna 指令",
                link: "/routes/commands/"
            }
        ],
        sidebar: {
            '/routes/basic/': getBasicSideBar(),
            '/routes/commands/': getCommandsSideBar()
        }
    },
    head: [
        ["link", {
            rel: "icon", href: "/images/lerna_favicon.ico"
        }]
    ]
}