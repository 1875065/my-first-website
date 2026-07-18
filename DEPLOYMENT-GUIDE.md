# 🌐 网站部署完整指南

## 📌 部署前准备

### ✅ 你的网站已具备：
- ✅ 完整的HTML页面（首页、关于、产品、联系）
- ✅ 响应式设计（支持手机、平板、电脑）
- ✅ 动态小鱼跟随鼠标特效
- ✅ SEO优化的meta标签
- ✅ CNAME文件（已配置自定义域名）

---

## 🚀 方案一：GitHub Pages（免费推荐 ⭐）

### 为什么选择 GitHub Pages？
- **完全免费** - 无需支付服务器费用
- **全球CDN** - 访问速度快
- **自动HTTPS** - 安全访问
- **支持自定义域名**
- **简单易用** - 适合新手

### 步骤 1：初始化 Git 仓库

```bash
# 进入网站目录
cd /home/wzh/桌面/网站/my-first-website

# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "添加动态小鱼特效和网站优化"
```

### 步骤 2：推送到 GitHub

#### 2.1 创建 GitHub 账号（如果没有）
1. 访问 https://github.com/signup
2. 注册账号并登录

#### 2.2 创建新仓库
1. 点击右上角 "+" → "New repository"
2. 仓库名称：`tuanshanbao-crafts`
3. 设置为 **Public**（公开）
4. **不要勾选** README、.gitignore等选项
5. 点击 "Create repository"

#### 2.3 推送代码到 GitHub

```bash
# 添加远程仓库地址（替换成你的用户名）
git remote add origin https://github.com/你的用户名/tuanshanbao-crafts.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 打开你刚创建的仓库页面
2. 点击 **Settings** 标签页
3. 左侧菜单找到 **Pages**
4. 在 "Source" 下拉框选择：
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**

### 步骤 4：获取网站地址

等待几分钟后，在 Pages 页面会显示：

> 🎉 **Your site is ready to be published at:**  
> `https://你的用户名.github.io/tuanshanbao-crafts/`

这就是你的网站地址！任何人都可以通过这个链接访问。

---

## 🔧 方案二：使用自定义域名（更专业）

### 步骤 1：购买域名

推荐域名注册商：
- 阿里云（万网）：https://wanwang.aliyun.com/
- 腾讯云：https://cloud.tencent.com/domain
- Cloudflare：https://www.cloudflare.com/products/domain/

建议域名示例：
- `tuanshanbao.com`
- `团山堡工艺.cn`
- `tsb-crafts.com`

### 步骤 2：配置 DNS 解析

以阿里云为例：

1. 登录阿里云控制台 → 域名管理
2. 找到你的域名 → 点击"解析"
3. 添加记录：

| 类型 | 主机记录 | 记录值 | TTL |
|------|---------|--------|-----|
| CNAME | @ | `你的用户名.github.io.` | 10分钟 |
| CNAME | www | `你的用户名.github.io.` | 10分钟 |

### 步骤 3：在 GitHub Pages 绑定域名

1. 回到 GitHub 仓库 Settings → Pages
2. 在 "Custom domain" 输入框填入：`tuanshanbao.com`
3. 勾选 "Enforce HTTPS"
4. 点击 Save

### 步骤 4：验证 CNAME 文件

你的项目中已有 [CNAME](CNAME) 文件，确认内容是你的域名即可。

---

## 💰 方案三：云服务器部署（企业级）

### 推荐云服务商

| 服务商 | 入门价格 | 特点 |
|--------|----------|------|
| 阿里云 ECS | ¥50-100/月 | 国内访问快，中文支持好 |
| 腾讯云 CVM | ¥50-100/月 | 有学生优惠 |
| 华为云 ECS | ¥50-100/月 | 企业级服务 |
| Vercel | 免费 | 自动部署，适合前端 |

### 使用 Vercel 部署（推荐 ⭐⭐⭐）

**为什么推荐 Vercel？**
- 免费额度充足
- 全球 CDN 加速
- 自动 HTTPS
- 一键部署
- 支持自定义域名

#### 部署步骤：

1. 访问 https://vercel.com 并用 GitHub 账号登录
2. 点击 "New Project"
3. 选择你的 `tuanshanbao-crafts` 仓库
4. 配置如下：
   - Framework Preset: Other
   - Build Command: 留空
   - Output Directory: `.`
5. 点击 "Deploy"

几分钟后就能获得一个类似 `https://tuanshanbao-crafts.vercel.app` 的地址！

---

## 🔍 SEO 优化 - 让搜索引擎找到你

### 已完成的 SEO 优化 ✅

你的网站已经包含：
- ✅ 完整的 meta title 和 description
- ✅ 关键词标签（工艺品, 安溪, 团山堡...）
- ✅ 语义化 HTML 结构
- ✅ 响应式设计（移动端友好）

### 进一步优化建议

#### 1. 提交搜索引擎

**百度提交：**
1. 访问 https://ziyuan.baidu.com/
2. 注册/登录百度账号
3. 添加网站并验证所有权
4. 提交 sitemap

**Google 提交：**
1. 访问 https://search.google.com/search-console
2. 添加资源并验证
3. 提交 sitemap

#### 2. 创建 Sitemap

创建 `sitemap.xml` 文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://tuanshanbao.com/</loc>
        <lastmod>2026-07-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://tuanshanbao.com/about.html</loc>
        <lastmod>2026-07-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://tuanshanbao.com/products.html</loc>
        <lastmod>2026-07-18</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://tuanshanbao.com/contact.html</loc>
        <lastmod>2026-07-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
```

#### 3. 创建 robots.txt

创建 `robots.txt` 文件：

```
User-agent: *
Allow: /
Sitemap: https://tuanshanbao.com/sitemap.xml
```

#### 4. 社交媒体分享优化

添加 Open Graph 标签（已部分实现）：

```html
<meta property="og:title" content="安溪团山堡工艺品有限公司">
<meta property="og:description" content="专注高品质工艺品设计与制作">
<meta property="og:image" content="https://tuanshanbao.com/images/og-image.jpg">
<meta property="og:url" content="https://tuanshanbao.com/">
<meta property="og:type" content="website">
```

---

## 📊 性能优化建议

### 1. 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 使用懒加载

### 2. 代码压缩
- 压缩 CSS 和 JavaScript
- 启用 Gzip/Brotli 压缩

### 3. 缓存策略
- 设置合理的缓存头
- 使用 CDN 加速

---

## 🛡️ 安全加固

### 1. HTTPS
- 所有方案都自动提供 HTTPS
- 强制使用安全连接

### 2. 内容安全策略
添加 CSP 头防止 XSS 攻击

### 3. 定期备份
- Git 仓库自动版本控制
- 定期导出数据库（如果有）

---

## 📈 监控和分析

### 推荐工具

1. **Google Analytics** - 流量分析
2. **百度统计** - 中国用户分析
3. **Google Search Console** - 搜索表现
4. **百度搜索资源平台** - 中文SEO监控

---

## 🎯 快速部署清单

- [ ] 选择部署方案（推荐 GitHub Pages 或 Vercel）
- [ ] 准备 Git 仓库并推送代码
- [ ] 配置部署平台
- [ ] （可选）购买并绑定自定义域名
- [ ] 测试网站可访问性
- [ ] 提交搜索引擎（百度 + Google）
- [ ] 配置分析工具
- [ ] 分享给朋友测试

---

## ❓ 常见问题

### Q: 部署后多久能被搜索到？
A: 通常需要几天到几周时间。主动提交可以加快速度。

### Q: 如何更新网站？
A: 修改本地代码后，执行：
```bash
git add .
git commit -m "更新说明"
git push
```
GitHub Pages 会自动重新部署。

### Q: 网站访问速度慢怎么办？
A: 
- 使用 CDN（Vercel/GitHub Pages自带）
- 优化图片大小
- 减少HTTP请求

### Q: 手机上显示效果不好？
A: 你的网站已经是响应式设计，应该正常。如果有问题，检查浏览器兼容性。

---

## 🎉 下一步行动

1. **立即开始**：选择 GitHub Pages（最简单免费）
2. **一周内**：提交搜索引擎
3. **一个月内**：考虑购买自定义域名
4. **持续优化**：根据访问数据改进内容

祝你的工艺品网站成功上线！🚀✨

---

**需要我帮你执行具体的部署操作吗？我可以协助你：**
- 初始化 Git 仓库
- 创建 sitemap.xml 和 robots.txt
- 配置 Open Graph 标签
- 或者其他任何部署相关的任务！