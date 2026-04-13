# VStory 项目文档

## 项目概览

VStory 是 VisActor 体系下的数据叙事研发框架，仓库采用 Rush 管理的 monorepo 结构。核心源码位于 `packages/`，文档站点位于 `docs/`，通用工程配置位于 `share/` 和 `common/`。

## 开发环境

- Node.js 版本要求：`>=20.10.0 <25.0.0`
- Rush 版本：`5.148.0`
- pnpm 版本：`10.7.0`
- 首次进入仓库后先执行：`rush update`

如本机未安装 Rush，可先执行：

```bash
npm i --global @microsoft/rush
```

## 仓库结构

- `packages/vstory`: 主包，VStory 编辑器与主入口
- `packages/vstory-core`: 核心能力与基础运行逻辑
- `packages/vstory-animate`: 动画相关能力
- `packages/vstory-player`: 播放器能力
- `packages/vstory-editor`: 编辑器相关实现
- `packages/vstory-templates`: 模板相关能力
- `packages/vstory-external`: 外部集成能力
- `docs`: 文档站点源码
- `share/eslint-config`: 共享 ESLint 配置
- `share/jest-config`: 共享 Jest 配置
- `share/ts-config`: 共享 TypeScript 配置
- `tools/bundler`: 内部打包工具
- `common/config/rush`: Rush 命令与版本管理配置

## 常用命令

在仓库根目录执行：

```bash
# 安装依赖
rush update

# 启动主项目开发环境
rush start

# 启动文档站点
rush docs

# 全量构建
rush build

# 类型检查
rush compile

# 代码检查
rush eslint

# 运行测试
rush test
```

按包执行脚本：

```bash
# 通用格式
rush run -p <package-name> -s <script>

# 示例：运行 vstory-core 单测
rush run -p @visactor/vstory-core -s test

# 示例：启动 vstory 包 demo
rush run -p @visactor/vstory -s start
```

## 测试与验证

- 大多数业务包使用 Jest，常见脚本为 `test`
- `tools/bundler` 使用 Vitest
- 修改代码后，优先执行受影响包的测试，再根据改动范围决定是否补跑 `rush compile`、`rush eslint` 或 `rush test`
- 若修改共享配置、公共类型、构建逻辑，默认补跑更大范围验证

## 开发约定

- 这是一个 Rush monorepo，优先使用 `rush` 和 `rush run`，不要绕过仓库约定直接手工维护锁文件
- 共享配置在 `share/`，修改前先确认是否会影响多个包
- 单个包通常都提供 `build`、`dev`、`start`、`test` 脚本，可先查看对应 `package.json`
- 文档、示例、站点代码集中在 `docs/`

## Commit 规范

提交 commit 时，必须遵循 `@commitlint/config-conventional`，并满足仓库当前附加规则：

- 使用 Conventional Commits 格式：`type(scope): subject`
- `header` 最少 16 个字符
- `header` 最长 200 个字符
- commit message 只允许英文字符、数字、空格和常见符号
- 不要在 commit message 中使用中文

推荐类型：

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `build`
- `ci`
- `chore`

推荐示例：

```text
docs(repo): add chinese project guide
fix(vstory-core): repair jest module mapping
test(vstory-player): cover timeline edge cases
```

不推荐示例：

```text
修复问题
fix: 修复测试
docs: update
```

其中：

- `修复问题` 不符合 Conventional Commits
- `fix: 修复测试` 含中文，无法通过仓库自定义校验
- `docs: update` 虽然格式接近正确，但 header 过短，无法通过最小长度限制

## 变更建议

- 改动前先确认影响范围是单包、共享配置还是文档站点
- 优先做最小修复，避免在同一提交中混入无关重构
- 若需要提交，先自行检查 commit message 是否满足上述规范
