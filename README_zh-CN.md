# vuepress-reco
一款简洁的 vuepress 博客 & 文档 主题。

vuepress-theme-reco 2.0 继续坚持简洁的风格，所有功能开箱即用，首页模块化组装，使用 tailwindcss 书写样式，将 Vite 作为默认编译器。你只需要负责内容创作，其他请交给我。

## 部署
部署到 EdgeOne Pages。

[![EdgeOne Pages deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?template=vitepress-template)

## 特性

- 📚 结构良好的文档组织
- 🎨 自定义主题和样式
- 📱 响应式设计
- 🔍 全文搜索
- 📦 易于部署
- 🚀 快速轻量

## 目录结构

```
.
├── .vitepress/          # VitePress 配置
│   ├── config.ts       # 站点配置
│   └── theme/           # 自定义主题文件
│       └── style.css    # 自定义样式
├── docs/              # 文档页面
│   ├── home.md        # 首页

├── public/               # 构建输出目录
├── package.json        # 项目依赖
├── edgeone.json        # 项目部署参数
└── .gitignore         # Git 忽略规则
```

## 快速开始

1. **安装**

```bash
# 克隆仓库
git clone [your-repo-url]

# 安装依赖
npm install
```

2. **开发**

```bash
# 启动本地开发服务器
npm run dev
```

3. **构建**

```bash
# 构建生产版本
npm run build
```

4. **预览**

```bash
# 预览生产构建
npm run preview
```

## 文档结构

- **快速开始**: 基础设置和配置指南
- **进阶**: 深入主题和自定义设置
- **示例**: Markdown 和 API 使用示例
- **部署**: 各种平台的部署指南

## 贡献

欢迎贡献！请随时提交 Pull Request。

![多邻国图标](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOUlEQVQ4jXWSTUhUURiGn3Pm3mlGR7l6Q6EI+yH6wRJTENpEK2sRFIKLdi2SFlGgUuqiXFS4GJBq46YfsIWb3NTCDAwSVEJmIwYThe6CYuw6k87PvfecFsPUnat9u/Oe9335vu/9BKG6u8BVIXiJYNKLcyvZxlaYEywRBoaXmBGCbiFB+axpxQNfMh+J4AufM2j6tGRsrIs5ACNsoOGwbYOMgFIcyud5ViqU30YMXBeKJeagbCAHltkbNDBNEtaeg1yu/8g5O0ltLTTY0NzYQHtzL5ZlIhS/K3xpunwbWmR1aIEro6tEpcQ+XXeD6RefWH/fQiKyD4Cz8jnpyS7a6q+jBT8A+pYxJVAHnEQwXciyqXyiWW+NeDzOkWMH0J7Dcdcmk8mQTqdRWiGgcXiJiUaXnLgzz4o0aA2OYVmSU3YvGXeVE19W6IzZvLViJJp6WPw+QTZXqlDXDZXnDTFapfnPwHEUC7kptAZ+QUtNhhUNuc0nZayycMUrATAwQ0qYtBs1oDWIQLjaK4ctItVpqSLrboEOCVC3RKcuMVfcANcJHYpRLfaL4OX46Xv0jl9go+qQBma5rQqMmxYiONLfbjS4WT5LwflkdzmJHZfYP0MKn/Zow85fbwsnkWf/6CW2K5gMG0QMRpQPxQ3w86BK4Beg5IBWTAXFu3YA0D/LU1XgJoGNG1FSyYt0hLm7GgAMvqM14TK4bRCTmtfXUjyWgp6jIyz+T1NVH0Yx0g9x0o+4B/D1Pk278f4AXMfQ4j216q4AAAAASUVORK5CYII=)