(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{370:function(n,s,a){"use strict";a.r(s);var e=a(43),t=Object(e.a)({},(function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"lerna-init"}},[a("code",[n._v("@lerna/init")])]),n._v(" "),a("blockquote",[a("p",[n._v("创建一个新的 Lerna 仓库或将现有的仓库升级到 Lerna 的当前版本")])]),n._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/lerna/lerna/blob/master/commands/init#readme",target:"_blank",rel:"noopener noreferrer"}},[n._v("英文原地址"),a("OutboundLink")],1)]),n._v(" "),a("p",[n._v("安装 lerna 以访问"),a("code",[n._v("lerna")]),n._v(" CLI。")]),n._v(" "),a("h2",{attrs:{id:"使用"}},[n._v("使用")]),n._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[n._v("lerna init\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("创建一个新的 Lerna 仓库或将现有的仓库升级到 Lerna 的当前版本。")]),n._v(" "),a("blockquote",[a("p",[n._v("Lerna 假设该仓库已经用"),a("code",[n._v("git init")]),n._v("进行了初始化。")])]),n._v(" "),a("p",[n._v("在运行时，该仓库将会：")]),n._v(" "),a("ol",[a("li",[n._v("如果其尚未存在于"),a("code",[n._v("package.json")]),n._v("的"),a("code",[n._v("devDependency")]),n._v("，则将"),a("code",[n._v("lerna")]),n._v("添加进去。")]),n._v(" "),a("li",[n._v("创建"),a("code",[n._v("lerna.json")]),n._v("配置文件已储存"),a("code",[n._v("version")]),n._v("号。")])]),n._v(" "),a("p",[n._v("示例：")]),n._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[n._v("lerna init\nlerna info version v2.0.0\nlerna info Updating package.json\nlerna info Creating lerna.json\nlerna success Initialized Lerna files\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br")])]),a("h2",{attrs:{id:"配置项"}},[n._v("配置项")]),n._v(" "),a("h3",{attrs:{id:"independent"}},[a("code",[n._v("--independent")])]),n._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[n._v("lerna init --independent\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("该参数是告诉 Lerna 使用独立的版本控制模式。")]),n._v(" "),a("h3",{attrs:{id:"exact"}},[a("code",[n._v("--exact")])]),n._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[n._v("lerna init --exact\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br")])]),a("p",[n._v("默认情况下，当添加或更新lerna的本地版本时，"),a("code",[n._v("lerna init")]),n._v("将使用插入符号范围，如"),a("code",[n._v("npm install --save-dev lerna")]),n._v("。")]),n._v(" "),a("p",[n._v("为了保留 lerna 1.x 的“精确”比较行为，可以传递该参数。您也可以在"),a("code",[n._v("lerna.json")]),n._v("中配置以强制后续所有都执行精确匹配：")]),n._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"command"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v(":")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"init"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v(":")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"exact"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v(":")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[n._v("true")]),n._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v(",\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"version"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[n._v(":")]),n._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[n._v('"0.0.0"')]),n._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br"),a("span",{staticClass:"line-number"},[n._v("6")]),a("br"),a("span",{staticClass:"line-number"},[n._v("7")]),a("br"),a("span",{staticClass:"line-number"},[n._v("8")]),a("br")])])])}),[],!1,null,null,null);s.default=t.exports}}]);