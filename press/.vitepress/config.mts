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
      { text: '技术笔记', link: '/ai-tech-notes/' },
      { text: '创意笔记', link: '/ai-creative-notes/' },
    ],
    sidebar: [
      {
        text: '导航',
        collapsed: false,
        items: [
          { text: '内容总览', link: '/list' },
          { text: '关于博客', link: '/about' },
        ]
      },
      {
        text: 'ai-tech-notes',
        collapsed: false,
        items: [
          { text: '📚 技术笔记首页', link: '/ai-tech-notes/' },
          { text: '浏览器语音输入功能实现方法', link: '/ai-tech-notes/浏览器语音输入功能实现方法' },
          { text: '嵌套 Git 仓库管理的最佳实践', link: '/ai-tech-notes/嵌套 Git 仓库管理的最佳实践' },
          { text: 'husky 防御机制分析', link: '/ai-tech-notes/如果某个高权限的团队成员把本地的 husky 卸载了，并且强制push了代码，远程仓库里的 husky 能防御吗？' },
          { text: 'IndexedDB 和 Service Worker 动态加载', link: '/ai-tech-notes/使用 IndexedDB 和 Service Worker 动态加载前端代码' },
          { text: '为什么MongoDB的用户评价不好', link: '/ai-tech-notes/为什么MongoDB的用户评价不好' },
          { text: 'GitHub仓库清除历史提交记录方法', link: '/ai-tech-notes/GitHub仓库清除历史提交记录方法' },
          { text: 'JavaScript-TypeScript 批处理流程管理包推荐', link: '/ai-tech-notes/JavaScript-TypeScript-批处理流程管理包推荐' },
          { text: 'Nginx上游连接错误日志分析', link: '/ai-tech-notes/Nginx上游连接错误日志分析' },
          { text: 'npm包依赖管理最佳实践', link: '/ai-tech-notes/npm包依赖管理最佳实践' },
          { text: 'pnpm workspace新建package规范流程', link: '/ai-tech-notes/pnpm workspace新建package规范流程' },
          { text: 'PrimeVue 构建系统说明文档', link: '/ai-tech-notes/PrimeVue 构建系统说明文档' },
          { text: 'PrimeVue 构建系统完整指南', link: '/ai-tech-notes/PrimeVue 构建系统完整指南' },
          { text: 'PrimeVue Package.json 配置详解', link: '/ai-tech-notes/PrimeVue Package.json 配置详解' },
          { text: 'TypeScript中type和interface的区别', link: '/ai-tech-notes/TypeScript中type和interface的至关重要的区别' },
          { text: 'TypeScript自动化测试方案建议（2025）', link: '/ai-tech-notes/TypeScript自动化测试方案建议（2025）' },
        ]
      },
      {
        text: 'ai-creative-notes',
        collapsed: false,
        items: [
          { text: '🎨 创意笔记首页', link: '/ai-creative-notes/' },
          { text: '韩剧《富豪入赘我们村》剧本大纲', link: '/ai-creative-notes/韩剧《富豪入赘我们村》剧本大纲' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lufbduk/tech' },
    ]
  }
})
