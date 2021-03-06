function getBasicSideBar() {
    return [
        'about',
        'start',
        'how_it_works',
        'troubleshooting',
        'FAQ',
        'concepts',
        'global_options',
        'filter_options',
        'hoisting'
    ]
}

function getCommandsSideBar() {
    return [
        '',
        'publish',
        'version',
        'bootstrap',
        'list',
        'changed',
        'diff',
        'exec',
        'run',
        'init',
        'add',
        'clean',
        'import',
        'link',
        'create',
        'info'
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
        logo: "/images/logo.png",
        nav: [
			{
                text: "大笑文档",
                link: "http://www.febeacon.com"
            },
            {
                text: "文档首页",
                link: "/"
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