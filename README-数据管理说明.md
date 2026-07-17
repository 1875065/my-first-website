# 📦 安溪团山堡工艺品有限公司 - 数据管理系统

## 🎯 系统概述

本网站采用 **YAML + JavaScript** 的数据驱动架构，您只需编辑配置文件即可管理网站内容，**无需修改任何代码**！

## 📁 文件结构

```
/home/wzh/桌面/test/
├── data/
│   ├── config.yaml          # ⭐ 主配置文件（YAML格式，供人工编辑）
│   └── config.js            # 🔧 运行时配置（由YAML转换而来）
├── images/
│   └── products/             # 商品图片目录
│       ├── tea/             # 茶具系列图片
│       ├── wood/            # 木雕工艺图片
│       ├── ceramic/         # 陶瓷艺术图片
│       └── gift/            # 礼品定制图片
│           └── placeholder.jpg  # 默认占位图
├── css/style.css            # 样式文件
├── js/
│   ├── main.js              # 主要交互脚本
│   └── data-loader.js       # 数据加载器
├── index.html               # 首页
├── about.html               # 关于我们
├── products.html            # 产品展示
└── contact.html             # 联系我们
```

---

## ✏️ 如何管理商品信息

### 方法一：直接编辑 YAML 配置文件（推荐）

#### 1. 打开配置文件
```bash
# 使用文本编辑器打开
gedit /home/wzh/桌面/test/data/config.yaml
# 或
nano /home/wzh/桌面/test/data/config.yaml
```

#### 2. 修改商品信息

**📝 修改商品价格：**
```yaml
products:
  - id: P001
    name: "功夫茶具套装 - 经典款"
    price: 1280          # ← 修改这里改为新价格
    original_price: 1680 # ← 修改原价
```

**🖼️ 更换商品图片：**
```yaml
  - id: P001
    image_path: "tea/new-image.jpg"  # ← 修改为新的图片文件名
    # 图片需放置在 images/products/tea/ 目录下
```

**✅ 上架商品：**
```yaml
  - id: P006
    status: on    # ← 改为 on 即可上架显示
```

**❌ 下架商品：**
```yaml
  - id: P006
    status: off   # ← 改为 off 即可下架隐藏
```

**📝 设为草稿：**
```yaml
  - id: P013
    status: draft  # ← 草稿状态，前台不显示
```

**🏷️ 添加标签：**
```yaml
  - id: P001
    badge: "热销"   # 可选值："热销"、"新品"、"限时"、"限量"、""(空)
```

#### 3. 添加新商品

在 `products:` 列表末尾添加：

```yaml
  - id: P013                    # 唯一ID，递增编号
    category: tea               # 分类ID：tea/wood/ceramic/gift
    name: "新产品名称"           # 商品名称
    subtitle: "副标题描述"       # 简短描述
    price: 999                  # 价格（0表示咨询报价）
    original_price: 1299        # 原价（可选）
    image_path: "tea/new.jpg"   # 图片路径
    badge: "新品"               # 标签（可选）
    status: on                  # 状态：on/off/draft
    sales: 0                    # 销量
    description: "详细描述..."   # 商品详细描述
    features:                   # 产品特点列表
      - "特点1"
      - "特点2"
    specs:                      # 规格参数
      material: "材质"
      craft: "工艺"
```

#### 4. 转换为 JavaScript 格式

由于浏览器无法直接读取 YAML 文件，需要将 YAML 转换为 JS 格式：

**方式A：在线转换工具（简单）**
1. 访问 https://www.json2yaml.com/
2. 将 YAML 内容粘贴到左侧
3. 复制右侧的 JSON 结果
4. 替换 `data/config.js` 文件中的内容（保持 `const SITE_CONFIG = ` 开头）

**方式B：使用 Python 脚本（批量）**
```bash
# 安装依赖
pip install pyyaml

# 创建转换脚本 convert_yaml.py：
import yaml
import json

with open('data/config.yaml', 'r', encoding='utf-8') as f:
    data = yaml.safe_load(f)

with open('data/config.js', 'w', encoding='utf-8') as f:
    f.write('const SITE_CONFIG = ')
    f.write(json.dumps(data, ensure_ascii=False, indent=2))
    f.write(';\n\nif (typeof module !== \'undefined\' && module.exports) {\n')
    f.write('    module.exports = SITE_CONFIG;\n}')
    
print('✅ 转换完成！')

# 运行脚本
python convert_yaml.py
```

---

## 🖼️ 图片管理规范

### 目录结构
```
images/products/
├── tea/                    # 茶具系列
│   ├── teaset-classic.jpg
│   ├── jianzhan-cup.jpg
│   └── smart-teaset.jpg
├── wood/                   # 木雕工艺
│   ├── dragon-phoenix.jpg
│   ├── root-carving.jpg
│   └── screen-divider.jpg
├── ceramic/                # 陶瓷艺术
│   ├── blue-white-vase.jpg
│   ├── famille-rose.jpg
│   └── ru-kiln.jpg
├── gift/                   # 礼品定制
│   ├── corporate-custom.jpg
│   ├── wedding-gift.jpg
│   └── festival-gift.jpg
└── placeholder.jpg         # 默认占位图（必需）
```

### 图片要求
- **格式**：JPG、PNG、WebP、GIF
- **尺寸**：建议 800×600px 或以上
- **大小**：单张不超过 500KB（压缩后）
- **命名**：英文小写+连字符，如 `blue-white-vase.jpg`
- **路径**：相对于 `images/products/` 目录

### 添加新图片步骤
1. 准备好图片文件
2. 根据分类放入对应目录
3. 在 `config.yaml` 中设置 `image_path` 字段
4. 转换更新 `config.js`
5. 刷新网页查看效果

---

## 📊 可管理的字段说明

### 公司基本信息 (company)
| 字段 | 说明 | 示例 |
|------|------|------|
| name | 公司名称 | "安溪团山堡工艺品有限公司" |
| slogan | 企业标语 | "以匠心致初心..." |
| description | 公司简介 | "专注于高品质工艺品..." |
| founded_year | 成立年份 | 2006 |

### 联系信息 (contact)
| 字段 | 说明 | 示例 |
|------|------|------|
| address | 公司地址 | "福建省泉州市安溪县..." |
| phone | 座机号码 | "0595-XXXXXXX" |
| mobile | 手机号码 | "138-XXXX-XXXX" |
| email_business | 商务邮箱 | "business@..." |
| email_service | 客服邮箱 | "service@..." |
| work_time | 营业时间 | "周一至周六 8:30-18:00" |

### 统计数据 (stats)
| 字段 | 说明 | 示例 |
|------|------|------|
| experience_years | 行业经验年数 | 20 |
| satisfied_customers | 满意客户数 | 10000 |
| product_categories | 商品种类数 | 500 |

### 商品信息 (products)
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 唯一标识，如 "P001" |
| category | string | ✓ | 分类ID：tea/wood/ceramic/gift |
| name | string | ✓ | 商品名称 |
| subtitle | string | | 副标题/简短描述 |
| price | number | ✓ | 当前售价（0=咨询报价） |
| original_price | number | | 原价/划线价 |
| image_path | string | ✓ | 图片相对路径 |
| badge | string | | 标签："热销"/"新品"/"限时"/"" |
| status | string | ✓ | 状态："on"(上架)/"off"(下架)/"draft"(草稿) |
| sales | number | | 销量数字 |
| description | string | ✓ | 详细描述文字 |
| features | array | | 特点列表 |
| specs | object | | 规格参数键值对 |

### 网站设置 (settings)
| 字段 | 说明 | 默认值 |
|------|------|--------|
| enable_filter | 是否启用筛选 | true |
| products_per_page | 每页商品数 | 12 |
| show_original_price | 显示原价 | true |
| show_sales | 显示销量 | true |
| email_required | 邮箱必填 | false |
| icp | 备案号 | "" |
| analytics_code | 统计代码 | "" |

---

## 🔄 工作流程示例

### 场景1：上架一款新茶具

```yaml
# 1. 在 config.yaml 的 products: 列表末尾添加：
  - id: P013
    category: tea
    name: "紫砂壶 - 石瓢"
    subtitle: "经典器型 · 大师手作"
    price: 2680
    original_price: 3280
    image_path: "tea/shipiao-teapot.jpg"
    badge: "新品"
    status: on
    sales: 0
    description: "紫砂经典石瓢壶型，由资深工艺师全手工制作..."
    features:
      - "原矿紫砂泥料"
      - "大师级手工制作"
      - "经典石瓢造型"
      - "出水流畅爽利"
    specs:
      material: "紫砂"
      capacity: "320ml"
      craft: "全手工"

# 2. 将图片放入 images/products/tea/shipiao-teapot.jpg

# 3. 转换 YAML → JS（参考上文方法）

# 4. 刷新产品页面，新商品已显示！
```

### 场景2：某款商品暂时缺货，需要下架

```yaml
# 1. 找到该商品，修改状态：
  - id: P006
    ...
    status: off    # 从 on 改为 off

# 2. 转换更新 config.js

# 3. 刷新页面，该商品已隐藏
```

### 场景3：调整所有商品价格（促销活动）

```yaml
# 1. 批量修改 price 字段：
products:
  - id: P001
    price: 1024     # 原1280，打8折
    ...
  - id: P002
    price: 544      # 原680，打8折
    ...

# 2. 转换更新

# 3. 所有页面自动更新价格
```

### 场景4：更换公司联系方式

```yaml
company:
  contact:
    phone: "0595-23456789"    # 新电话
    mobile: "139-1234-5678"   # 新手机
    address: "福建省泉州市安溪县新地址XX号"

# 转换后，所有页面的联系信息同步更新
```

---

## 💡 高级技巧

### 1. 批量上下架
```bash
# 使用 sed 命令批量将所有 wood 分类商品下架
sed -i 's/category: wood$/category: wood\n    status: off/' data/config.yaml
```

### 2. 导入导出商品数据
可以将 `products:` 部分单独保存为文件，方便备份和迁移。

### 3. 版本控制
建议使用 Git 管理配置文件：
```bash
git add data/config.yaml data/config.js
git commit -m "更新商品价格和上新3款产品"
```

### 4. 多人协作
- 编辑 YAML 文件
- 使用转换脚本统一生成 JS
- 避免直接编辑 config.js

---

## ⚠️ 注意事项

1. **始终编辑 YAML 文件**，不要直接修改 config.js
2. **修改后必须转换**，否则网页不会更新
3. **图片路径要正确**，注意大小写和扩展名
4. **ID不能重复**，每个商品的 id 必须唯一
5. **价格类型是数字**，不要加引号或货币符号
6. **备份配置文件**，定期备份 config.yaml

---

## 🆘 常见问题

**Q: 修改了配置但网页没变化？**  
A: 检查是否执行了 YAML→JS 转换，并清除浏览器缓存（Ctrl+F5）

**Q: 图片显示不出来？**  
A: 确认图片路径正确，文件存在，且浏览器有读取权限

**Q: 如何批量修改价格？**  
A: 使用文本编辑器的查找替换功能，或编写脚本处理

**Q: 能否支持多语言？**  
A: 可以创建多个 YAML 文件（如 config-zh.yaml, config-en.yaml），按需加载

---

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台是否有错误（F12打开开发者工具）
2. config.js 文件语法是否正确
3. YAML 格式是否正确（注意缩进）

祝使用愉快！🎉