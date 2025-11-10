import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  title: "Ricardo的奇妙屋",
  description: "",
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    logo: "/logo.png",
    author: "ricardo",
    authorAvatar: "/head.png",
    home: '/home.html',
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/home.html" },
      { text: "分类", link: "/categories/AI/1.html" },
      { text: "标签", link: "/tags/java/1.html" },
      {
        text: "文档",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
      { text: "关于我", link: "/blogs/other/about.html" }
    ],
    bulletin: {
      body: [
        {
          type: "text",
          content: `🎉🎉🎉 2025年11月10 个人博客终于完整上线啦！！！！我还把CSDN的博客也迁过来了！！！！。`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "欢迎打赏",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>
            <img src="https://yuanchen.space/wechat.png" alt="wechat" title="wechat">
            </li>     
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "感谢开源社区",
        },
        {
          type: "text",
          content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next">博客主题官方<a/>（这个博客主题兼顾了我喜爱的blog和docs的特性）</li>
            <li><a href="https://www.ruanyifeng.com/blog">阮一峰的网络日志<a/>(我第一次认识到的博客大佬)</li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "buttongroup",
          children: [
            {
              text: "打赏",
              link: "##",
            },
          ],
        },
      ],
    },
    commentConfig: {
      type: 'valine',
      // options 与 1.x 的 valineConfig 配置一致
      options: {
        appId: 'yMHzjLvXJlDObvbeq5tScJla-MdYXbMMI',
        appKey: '5FkDrutnkxw0iIMrFaMr3Jd3',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        verify: false, // 验证码服务
        notify: true,
        recordIP: true,
        hideComments: false // 隐藏评论
      },
    },
  }),
  // debug: true,
});
