import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "lufbduk 的技术博客",
  description: "聚焦于Web 前端, LLM, AIGC, AI 原生游戏开发, AI 工具等相关技术",
  appearance: "dark",
  
  // SEO优化设置 - 由AI（GitHub Copilot）添加
  lang: 'zh-CN',
  lastUpdated: true,
  head: [
    ['meta', { name: 'author', content: 'lufbduk' }],
    ['meta', { name: 'keywords', content: 'Web前端,LLM,AIGC,AI原生游戏开发,AI工具,技术博客,JavaScript,TypeScript,人工智能' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'lufbduk 的技术博客' }],
    ['meta', { property: 'og:description', content: '聚焦于Web 前端, LLM, AIGC, AI 原生游戏开发, AI 工具等相关技术' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'lufbduk 的技术博客' }],
    ['meta', { name: 'twitter:description', content: '聚焦于Web 前端, LLM, AIGC, AI 原生游戏开发, AI 工具等相关技术' }],

    // ['meta', { property: 'og:image', content: 'https://github.com/lufbduk/tech/blob/main/logo.png' }],

    ['link', { rel: 'icon', href: '/tech/logo.webp' }],
    ['link', { rel: 'apple-touch-icon', href: '/tech/apple-touch-icon.png' }],
  ],

  base: '/tech/',
  outDir: '../docs',
  rewrites: {
    ':proj/readme.md': ':proj/index.md',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.avif',
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
      { text: '技术笔记', link: '/技术笔记 by AI/' },
      { text: '创意笔记', link: '/创意笔记 with AI/' },
    ],
    sidebar: [
      {
        text: '技术笔记 by AI',
        collapsed: false,
        items: [
          { text: '浏览器语音输入功能实现方法', link: '/技术笔记 by AI/浏览器语音输入功能实现方法' },
          { text: '嵌套 Git 仓库管理的最佳实践', link: '/技术笔记 by AI/嵌套 Git 仓库管理的最佳实践' },
          { text: 'husky 防御机制分析', link: '/技术笔记 by AI/如果某个高权限的团队成员把本地的 husky 卸载了，并且强制push了代码，远程仓库里的 husky 能防御吗？' },
          { text: 'IndexedDB 和 Service Worker 动态加载', link: '/技术笔记 by AI/使用 IndexedDB 和 Service Worker 动态加载前端代码' },
          { text: '为什么MongoDB的用户评价不好', link: '/技术笔记 by AI/为什么MongoDB的用户评价不好' },
          { text: 'GitHub仓库清除历史提交记录方法', link: '/技术笔记 by AI/GitHub仓库清除历史提交记录方法' },
          { text: 'JavaScript-TypeScript 批处理流程管理包推荐', link: '/技术笔记 by AI/JavaScript-TypeScript-批处理流程管理包推荐' },
          { text: 'Nginx上游连接错误日志分析', link: '/技术笔记 by AI/Nginx上游连接错误日志分析' },
          { text: 'npm包依赖管理最佳实践', link: '/技术笔记 by AI/npm包依赖管理最佳实践' },
          { text: 'pnpm workspace新建package规范流程', link: '/技术笔记 by AI/pnpm workspace新建package规范流程' },
          { text: 'PrimeVue 构建系统说明文档', link: '/技术笔记 by AI/PrimeVue 构建系统说明文档' },
          { text: 'PrimeVue 构建系统完整指南', link: '/技术笔记 by AI/PrimeVue 构建系统完整指南' },
          { text: 'PrimeVue Package.json 配置详解', link: '/技术笔记 by AI/PrimeVue Package.json 配置详解' },
          { text: 'TypeScript中type和interface的区别', link: '/技术笔记 by AI/TypeScript中type和interface的至关重要的区别' },
          { text: 'TypeScript自动化测试方案建议（2025）', link: '/技术笔记 by AI/TypeScript自动化测试方案建议（2025）' },
        ]
      },
      {
        text: '创意笔记 with AI',
        collapsed: false,
        items: [
          { text: '韩剧《富豪入赘我们村》剧本大纲', link: '/创意笔记 with AI/韩剧《富豪入赘我们村》剧本大纲..' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lufbduk/tech' },
    ]
  }
})
