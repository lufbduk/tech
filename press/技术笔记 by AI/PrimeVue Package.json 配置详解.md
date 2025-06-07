# PrimeVue Package.json 配置详解

## 概述

这个 `package.json` 文件是 PrimeVue 核心包的配置文件，定义了包的基本信息、导出结构、构建配置和依赖关系。它展示了一个现代化 Vue 组件库的完整配置架构。

## 基本信息配置

### 包标识信息
```json
{
  "name": "primevue",
  "version": "4.3.4",
  "author": "PrimeTek Informatics",
  "description": "PrimeVue is an open source UI library for Vue...",
  "homepage": "https://primevue.org/",
  "license": "MIT"
}
```

**说明**：
- `name`: 包名，发布到 npm 时的唯一标识
- `version`: 语义化版本号，遵循 SemVer 规范
- `author`: 作者信息，会被构建脚本同步到子包
- `description`: 包描述，用于 npm 搜索和展示
- `homepage`: 官方网站地址
- `license`: 开源许可证类型

### 仓库和问题跟踪
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/primefaces/primevue.git",
    "directory": "packages/primevue"
  },
  "bugs": {
    "url": "https://github.com/primefaces/primevue/issues"
  }
}
```

**说明**：
- `repository.directory`: 指定在 monorepo 中的子包路径
- `bugs.url`: 问题反馈地址，用户可以在此报告 bug

## 入口点配置

### 开发时入口点
```json
{
  "main": "./src/index.js",           // CommonJS 入口
  "module": "./src/index.js",         // ES Module 入口
  "types": "./src/index.d.ts",        // TypeScript 类型定义
  "unpkg": "umd/primevue.min.js",     // unpkg CDN 入口
  "jsdelivr": "umd/primevue.min.js"   // jsDelivr CDN 入口
}
```

### 发布时入口点（publishConfig）
```json
{
  "publishConfig": {
    "main": "./index.mjs",
    "module": "./index.mjs",
    "types": "./index.d.ts",
    "exports": {
      ".": {
        "types": "./index.d.ts",
        "import": "./index.mjs",
        "default": "./index.mjs"
      },
      "./*": {
        "types": "./*/index.d.ts",
        "import": "./*/index.mjs",
        "default": "./*/index.mjs"
      }
    }
  }
}
```

**关键差异**：
- 开发时：指向 `src/` 目录的源文件
- 发布时：指向 `dist/` 目录的构建产物
- 发布时使用更现代的 `.mjs` 扩展名和 `exports` 字段

## IDE 智能提示配置

### 编辑器支持
```json
{
  "web-types": "./web-types.json",     // JetBrains IDE 支持
  "vetur": {
    "tags": "./vetur-tags.json",       // VS Code Vetur 标签
    "attributes": "./vetur-attributes.json"  // VS Code Vetur 属性
  }
}
```

**作用**：
- 为不同 IDE 提供 Vue 组件的智能提示
- 包含组件属性、事件、插槽等 API 信息
- 由 `build-api.js` 脚本自动生成

## 模块导出配置

### 开发时 exports（由 prebuild.mjs 生成）
```json
{
  "exports": {
    "./accordion": "./src/accordion/Accordion.vue",
    "./accordion/style": "./src/accordion/style/AccordionStyle.js",
    "./button": "./src/button/Button.vue",
    "./button/style": "./src/button/style/ButtonStyle.js",
    // ... 100+ 个组件导出
    "./*": "./*"
  }
}
```

**特点**：
- 支持按需导入：`import { Button } from 'primevue/button'`
- 样式分离：`import 'primevue/button/style'`
- 通配符导出：支持动态导入
- 自动生成：无需手动维护

### 发布时 exports（构建后）
```json
{
  "publishConfig": {
    "exports": {
      ".": {
        "types": "./index.d.ts",
        "import": "./index.mjs",
        "default": "./index.mjs"
      },
      "./*": {
        "types": "./*/index.d.ts",
        "import": "./*/index.mjs",
        "default": "./*/index.mjs"
      }
    }
  }
}
```

**优势**：
- 条件导出：支持不同环境的不同入口
- 类型安全：TypeScript 类型定义
- 现代化：使用 ES Modules

## 构建配置

### 环境变量和脚本
```json
{
  "scripts": {
    "build": "NODE_ENV=production INPUT_DIR=src/ OUTPUT_DIR=dist/ pnpm run build:package",
    "build:package": "pnpm run build:prebuild && pnpm run build:api && rollup -c && pnpm run build:postbuild",
    "build:api": "node ./scripts/build-api.js",
    "build:prebuild": "node ./scripts/prebuild.mjs",
    "build:postbuild": "node ./scripts/postbuild.mjs"
  }
}
```

**构建流程**：
1. **prebuild**: 环境准备和配置生成
2. **build:api**: 生成 IDE 智能提示文件
3. **rollup**: 执行主构建过程
4. **postbuild**: 构建后处理和清理

### Side Effects 配置
```json
{
  "sideEffects": ["*.vue"]
}
```

**作用**：
- 告诉打包工具哪些文件有副作用，不能被 tree-shaking
- Vue 单文件组件通常有副作用（样式、模板等）

## 依赖管理

### 核心依赖
```json
{
  "dependencies": {
    "@primeuix/styled": "catalog:",      // 样式系统
    "@primeuix/utils": "catalog:",       // 工具函数
    "@primeuix/styles": "catalog:",      // 基础样式
    "@primevue/core": "workspace:*",     // 核心逻辑
    "@primevue/icons": "workspace:*"     // 图标库
  }
}
```

**说明**：
- `catalog:`: 使用 workspace catalog 管理版本
- `workspace:*`: 引用同一 workspace 中的包
- 避免了重复的版本管理

### 开发依赖
```json
{
  "devDependencies": {
    "@vue/test-utils": "^2.0.0",        // Vue 测试工具
    "vitest": "^0.29.8"                 // 测试框架
  }
}
```

## 发布配置

### publishConfig 详解
```json
{
  "publishConfig": {
    "directory": "dist",               // 发布 dist 目录内容
    "linkDirectory": false,            // 不创建符号链接
    "access": "public"                 // 公开发布
  }
}
```

**工作机制**：
1. 构建时生成 `dist/` 目录
2. 发布时，npm 发布 `dist/` 目录的内容，而不是整个包
3. `dist/package.json` 已经被 `clearPackageJson` 清理过

## 版本兼容性

### Node.js 版本要求
```json
{
  "engines": {
    "node": ">=12.11.0"
  }
}
```

### Vue 版本支持
```json
{
  "keywords": [
    "vue2", "vue3"
  ]
}
```

## 配置最佳实践

### ✅ 推荐的配置模式

#### 1. 双重入口点配置
```json
{
  // 开发时配置
  "main": "./src/index.js",
  "module": "./src/index.js",
  "types": "./src/index.d.ts",
  
  // 发布时配置
  "publishConfig": {
    "main": "./index.mjs",
    "module": "./index.mjs",
    "types": "./index.d.ts"
  }
}
```

**优势**：
- 开发时直接使用源文件，便于调试
- 发布时使用构建产物，性能优化

#### 2. 现代化 exports 配置
```json
{
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "default": "./index.mjs"
    },
    "./*": {
      "types": "./*/index.d.ts",
      "import": "./*/index.mjs",
      "default": "./*/index.mjs"
    }
  }
}
```

**特点**：
- 支持条件导出
- TypeScript 类型安全
- 按需导入优化

#### 3. 智能提示配置
```json
{
  "web-types": "./web-types.json",
  "vetur": {
    "tags": "./vetur-tags.json",
    "attributes": "./vetur-attributes.json"
  }
}
```

**效果**：
- JetBrains IDE 完整支持
- VS Code Vue 扩展支持
- 提升开发体验

### ❌ 应避免的配置

#### 1. 硬编码路径
```json
// ❌ 不好的做法
{
  "main": "./dist/index.js",  // 开发时 dist 可能不存在
  "exports": {
    "./button": "./dist/button/index.js"  // 路径硬编码
  }
}

// ✅ 好的做法
{
  "main": "./src/index.js",   // 开发时使用源文件
  "publishConfig": {
    "main": "./index.js"      // 发布时通过构建脚本设置
  }
}
```

#### 2. 混乱的版本管理
```json
// ❌ 不好的做法
{
  "dependencies": {
    "@primevue/core": "4.3.4",     // 版本硬编码
    "@primevue/icons": "^4.0.0"    // 版本不一致
  }
}

// ✅ 好的做法
{
  "dependencies": {
    "@primevue/core": "workspace:*",   // 使用 workspace
    "@primevue/icons": "workspace:*"   // 版本自动同步
  }
}
```

## 开发工作流

### 开发模式
```bash
# 开发时使用源文件
npm run dev:link              # 创建本地链接
npm run test:unit:watch       # 监视模式测试
```

### 构建和发布
```bash
# 完整构建流程
npm run build                 # 执行完整构建

# 单独执行各阶段
npm run build:prebuild        # 构建前准备
npm run build:api            # 生成 API 文档
npm run build:postbuild      # 构建后处理
```

### 测试流程
```bash
npm run test:unit            # 单元测试
npm run test:coverage        # 覆盖率测试
```

## 故障排除

### 常见问题

#### Q: 导入组件时提示模块不存在？
**可能原因**：
- exports 配置错误
- 构建脚本未正确执行

**解决方案**：
```bash
# 重新生成 exports 配置
npm run build:prebuild

# 检查 package.json exports 字段
node -e "console.log(require('./package.json').exports)"
```

#### Q: IDE 没有智能提示？
**可能原因**：
- 智能提示文件缺失
- IDE 缓存问题

**解决方案**：
```bash
# 重新生成智能提示文件
npm run build:api

# 检查生成的文件
ls -la web-types.json vetur-*.json
```

#### Q: 发布包结构不正确？
**可能原因**：
- publishConfig 配置错误
- 构建后处理失败

**解决方案**：
```bash
# 检查 dist 目录结构
npm run build && ls -la dist/

# 验证发布配置
npm pack --dry-run
```

## 总结

这个 `package.json` 文件展示了现代化 Vue 组件库的完整配置模式：

- 🔄 **双重配置** - 开发时和发布时使用不同配置
- 📦 **现代化导出** - 使用 exports 字段支持按需导入
- 🧠 **智能提示** - 为主流 IDE 提供完整支持
- 🏗️ **自动化构建** - 通过脚本自动生成配置
- 📚 **类型安全** - 完整的 TypeScript 支持
- 🔗 **依赖管理** - 使用 workspace 统一版本

这种配置方式确保了开发体验和最终用户体验的最优化，是大型组件库项目的最佳实践参考。
