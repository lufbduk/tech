---
title: pnpm workspace新建package规范流程
description: 详细介绍在 pnpm workspace 的 TypeScript monorepo 中新建 package 的规范流程和最佳实践
date: 2025-01-22
tags:
  - pnpm
  - workspace
  - monorepo
  - TypeScript
  - 包管理
  - 前端工程化
keywords: pnpm workspace,monorepo,TypeScript,包管理,前端工程化,pnpm新建package
author: lufbduk
category: 技术笔记
head:
  - - meta
    - name: keywords
      content: pnpm workspace,monorepo,TypeScript,包管理,前端工程化,pnpm新建package,工作区管理
  - - meta
    - property: og:title
      content: pnpm workspace新建package规范流程 - TypeScript monorepo 最佳实践
  - - meta
    - property: og:description
      content: 详细介绍在 pnpm workspace 的 TypeScript monorepo 中新建 package 的规范流程和最佳实践
---

# pnpm workspace 新建 package 规范流程

> **摘要**：本文详细介绍在 pnpm workspace 的 TypeScript monorepo 环境中新建 package 的标准流程，包括目录结构创建、配置文件设置、依赖管理等最佳实践，帮助开发者规范化 monorepo 管理。

在 pnpm workspace 的 TypeScript monorepo 中，新建一个 package 的规范做法通常遵循以下流程（结合手动创建和工具命令）：

### 标准操作步骤（推荐）
1. **创建目录结构**
   ```bash
   # 在 packages 目录下创建新包（以 package-name 为例）
   mkdir -p packages/package-name/src
   ```

2. **初始化 package.json**
   ```bash
   cd packages/package-name
   pnpm init  # 生成基础 package.json
   ```

3. **配置 package.json**
   手动编辑生成的 `package.json`，添加必要字段：
   ```json
   {
     "name": "@your-scope/package-name",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "test": "vitest run"
     },
     "dependencies": {},
     "devDependencies": {}
   }
   ```

4. **添加 TypeScript 配置**
   ```bash
   touch tsconfig.json
   ```
   内容示例（继承根配置）：
   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src"]
   }
   ```

5. **创建入口文件**
   ```bash
   echo "export const myPackage = () => 'Hello world';" > src/index.ts
   ```

6. **注册到工作区**
   确保根目录的 `pnpm-workspace.yaml` 包含新目录：
   ```yaml
   packages:
     - 'packages/*'
     # 若使用 apps 目录: - 'apps/*'
   ```

---

### 高级优化方案（推荐）
使用 **脚手架工具** 自动化流程（更规范）：
1. 在根目录添加生成脚本：
   ```bash
   mkdir -p tools/scripts && touch tools/scripts/create-package.js
   ```

2. 脚本示例（Node.js）：
   ```javascript
   // tools/scripts/create-package.js
   const fs = require('fs');
   const path = require('path');
   const { execSync } = require('child_process');

   const packageName = process.argv[2];
   if (!packageName) throw new Error('Missing package name');

   const packagePath = path.join(__dirname, '../../packages', packageName);

   // 创建目录结构
   fs.mkdirSync(packagePath);
   fs.mkdirSync(path.join(packagePath, 'src'));

   // 初始化 package.json
   execSync('pnpm init', { cwd: packagePath, stdio: 'inherit' });

   // 更新 package.json
   const pkgJsonPath = path.join(packagePath, 'package.json');
   const pkg = require(pkgJsonPath);
   pkg.name = `@your-scope/${packageName}`;
   pkg.scripts = { build: 'tsc', test: 'vitest run' };
   pkg.main = 'dist/index.js';
   pkg.types = 'dist/index.d.ts';
   fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));

   // 创建基础文件
   fs.writeFileSync(path.join(packagePath, 'src/index.ts'), '// Your code here');
   fs.writeFileSync(
     path.join(packagePath, 'tsconfig.json'),
     JSON.stringify({
       extends: "../../tsconfig.base.json",
       compilerOptions: { outDir: "dist", rootDir: "src" },
       include: ["src"]
     }, null, 2)
   );

   console.log(`✅ Package ${packageName} created!`);
   ```

3. 添加到根目录 `package.json`：
   ```json
   {
     "scripts": {
       "create-package": "node tools/scripts/create-package.js"
     }
   }
   ```

4. 使用命令创建：
   ```bash
   pnpm create-package new-package-name
   ```

---

### 关键注意事项
1. **命名规范**
   - 使用 `@scope/package-name` 格式
   - 保持与工作区其他包命名一致

2. **依赖管理**
   - 添加工作区内依赖：
     ```bash
     pnpm add @your-scope/shared --filter @your-scope/package-name
     ```
   - 添加外部依赖：
     ```bash
     pnpm add lodash --filter @your-scope/package-name
     ```

3. **构建配置**
   - 确保根目录有 `tsconfig.base.json`
   - 每个包的 `tsconfig.json` 应继承基础配置

4. **版本管理**
   - 推荐使用 [changesets](https://github.com/changesets/changesets) 管理版本：
     ```bash
     pnpm add -Dw @changesets/cli
     pnpm changeset init
     ```

---

### 目录结构示例
```
monorepo/
├── packages/
│   ├── shared/         # 现有包
│   └── new-package/    # 新建包
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

**总结**：推荐结合手动创建基础结构 + 自动化脚本生成标准化模板，既保持灵活性又确保规范统一。对于大型项目，可集成类似 [Nx](https://nx.dev/) 或 [Turborepo](https://turbo.build/repo) 的 monorepo 工具链进一步优化。
