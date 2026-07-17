/**
 * 安溪团山堡工艺品有限公司 - 网站配置数据
 * 
 * ⚠️ 重要提示：
 * 此文件由 config.yaml 自动生成或手动维护
 * 如需修改网站内容，请编辑 data/config.yaml 文件
 * 然后使用在线工具将 YAML 转换为 JSON 格式更新此文件
 * 
 * 推荐转换工具：https://www.json2yaml.com/ 或 https://yamlonline.com/
 */

const SITE_CONFIG = {
    // ==================== 公司基本信息 ====================
    company: {
        name: "安溪团山堡工艺品有限公司",
        name_short: "团山堡工艺",
        founded_year: 2006,
        slogan: "以匠心致初心，以精品铸传奇",
        description: "专注于高品质工艺品的设计与制作，融合传统文化与现代美学，为您呈现独一无二的艺术臻品",
        
        contact: {
            address: "福建省泉州市安溪县XX镇团山堡工业区88号",
            phone: "0595-XXXXXXX",
            mobile: "138-XXXX-XXXX",
            email_business: "business@tuanshanbao.com",
            email_service: "service@tuanshanbao.com",
            work_time: "周一至周六 8:30 - 18:00"
        },
        
        social: {
            wechat: "团山堡工艺",
            weibo: "@团山堡工艺品",
            douyin: "@团山堡工艺官方"
        },
        
        stats: {
            experience_years: 20,
            satisfied_customers: 10000,
            product_categories: 500
        }
    },

    // ==================== 商品分类 ====================
    categories: [
        { id: "tea", name: "茶具系列", icon: "🍵", description: "精选材质，手工制作，传承茶文化精髓" },
        { id: "wood", name: "木雕工艺", icon: "🪵", description: "精雕细琢，天人合一，自然之美" },
        { id: "ceramic", name: "陶瓷艺术", icon: "🏺", description: "窑火淬炼，釉色温润，艺术珍品" },
        { id: "gift", name: "礼品定制", icon: "🎁", description: "个性化定制，彰显品味与文化" }
    ],

    // ==================== 商品列表 ====================
    products: [
        // ========== 茶具系列 ==========
        {
            id: "P001",
            category: "tea",
            name: "功夫茶具套装 - 经典款",
            subtitle: "宜兴紫砂 · 传统手工",
            price: 1280,
            original_price: 1680,
            image_path: "tea/teaset-classic.jpg",
            badge: "热销",
            status: "on",
            sales: 2360,
            description: "精选宜兴紫砂材质，传统手工制作，造型典雅大方，适合商务馈赠和家庭使用。",
            features: ["正宗宜兴紫砂泥料", "传统手工成型工艺", "造型典雅大气", "适合商务及家用"],
            specs: { material: "紫砂", craft: "手工制作", pieces: "12件套" }
        },
        {
            id: "P002",
            category: "tea",
            name: "建盏茶杯 - 曜变天目",
            subtitle: "非遗传承 · 天然铁胎",
            price: 680,
            original_price: 880,
            image_path: "tea/jianzhan-cup.jpg",
            badge: "新品",
            status: "on",
            sales: 856,
            description: "非遗传承人亲制，天然铁胎釉色，每一只都独一无二，收藏价值极高。",
            features: ["非遗传承人亲制", "天然铁胎釉色", "每只独一无二", "收藏级品质"],
            specs: { material: "建阳原矿铁胎", craft: "古法烧制", capacity: "120ml" }
        },
        {
            id: "P003",
            category: "tea",
            name: "智能保温茶具套装",
            subtitle: "科技融合 · 智能控温",
            price: 2680,
            original_price: 3280,
            image_path: "tea/smart-teaset.jpg",
            badge: "",
            status: "on",
            sales: 423,
            description: "融合现代科技，恒温控制，手机APP远程操作，传统与智能的完美结合。",
            features: ["智能恒温控制", "手机APP远程操控", "长效保温6小时", "食品级安全材质"],
            specs: { material: "304不锈钢+陶瓷", power: "无线充电", temperature: "45-85℃可调" }
        },

        // ========== 木雕工艺 ==========
        {
            id: "P004",
            category: "wood",
            name: "红木雕刻摆件 - 龙凤呈祥",
            subtitle: "大红酸枝 · 吉祥寓意",
            price: 8800,
            original_price: 10800,
            image_path: "wood/dragon-phoenix.jpg",
            badge: "",
            status: "on",
            sales: 186,
            description: "采用进口大红酸枝，精雕细琢，龙凤呈祥图案寓意吉祥如意。",
            features: ["进口大红酸枝木料", "大师级精雕工艺", "龙凤呈祥吉祥寓意", "适合办公家居摆放"],
            specs: { material: "大红酸枝", size: "60×40×25cm", craft: "手工雕刻" }
        },
        {
            id: "P005",
            category: "wood",
            name: "根雕艺术品 - 自然天成",
            subtitle: "因材施艺 · 天人合一",
            price: 12800,
            original_price: 15800,
            image_path: "wood/root-carving.jpg",
            badge: "",
            status: "on",
            sales: 67,
            description: "因材施艺，天人合一，保留原木自然形态，每件作品都是孤品。",
            features: ["天然原木根材", "保留自然形态", "每件都是孤品", "独一无二的艺术品"],
            specs: { material: "天然根木", size: "依形而定", craft: "随形雕刻" }
        },
        {
            id: "P006",
            category: "wood",
            name: "实木屏风 - 梅兰竹菊",
            subtitle: "中式风格 · 双面雕刻",
            price: 18800,
            original_price: 22800,
            image_path: "wood/screen-divider.jpg",
            badge: "",
            status: "off",  // 已下架
            sales: 42,
            description: "中式风格，榫卯结构，双面雕刻梅兰竹菊四君子图案。",
            features: ["传统榫卯结构", "双面精美雕刻", "梅兰竹菊四君子", "实用与艺术兼备"],
            specs: { material: "榆木", size: "180×200cm", panels: "4扇" }
        },

        // ========== 陶瓷艺术 ==========
        {
            id: "P007",
            category: "ceramic",
            name: "青花瓷花瓶 - 富贵牡丹",
            subtitle: "景德镇官窑 · 釉色温润",
            price: 3680,
            original_price: 4680,
            image_path: "ceramic/blue-white-vase.jpg",
            badge: "",
            status: "on",
            sales: 295,
            description: "景德镇官窑工艺，釉色温润如玉，牡丹花纹饰精美绝伦。",
            features: ["景德镇官窑工艺", "釉色温润如玉", "手绘牡丹纹饰", "收藏级品质"],
            specs: { material: "高岭土瓷", height: "45cm", craft: "手工拉坯+手绘" }
        },
        {
            id: "P008",
            category: "ceramic",
            name: "粉彩瓷板画 - 山水意境",
            subtitle: "名家手绘 · 可挂可摆",
            price: 5800,
            original_price: 7280,
            image_path: "ceramic/famille-rose.jpg",
            badge: "",
            status: "on",
            sales: 128,
            description: "名家手绘，釉上彩工艺，山水画面生动逼真，极具观赏价值。",
            features: ["名家亲手绘制", "釉上彩工艺", "山水意境深远", "多种展示方式"],
            specs: { material: "瓷板", size: "60×90cm", craft: "粉彩手绘" }
        },
        {
            id: "P009",
            category: "ceramic",
            name: "汝窑开片茶具 - 天青色",
            subtitle: "仿宋汝窑 · 蟹爪纹开片",
            price: 2280,
            original_price: 2980,
            image_path: "ceramic/ru-kiln.jpg",
            badge: "",
            status: "on",
            sales: 567,
            description: "仿宋代汝窑，蟹爪纹开片效果，再现宋瓷之美。",
            features: ["仿宋代汝窑配方", "天然蟹爪纹开片", "天青色釉面", "再现宋瓷之美"],
            specs: { material: "仿汝釉", craft: "高温还原烧制", pieces: "一壶四杯" }
        },

        // ========== 礼品定制 ==========
        {
            id: "P010",
            category: "gift",
            name: "企业定制礼品套装",
            subtitle: "LOGO定制 · 批量优惠",
            price: 0,  // 0表示咨询报价
            original_price: 0,
            image_path: "gift/corporate-custom.jpg",
            badge: "",
            status: "on",
            sales: 0,
            description: "个性化定制服务，支持LOGO刻印、专属包装设计，彰显企业形象与文化。",
            features: ["支持LOGO定制", "专属包装设计", "多种产品可选", "批量价格优惠"],
            specs: { moq: "50套起订", lead_time: "15-20工作日", customization: "LOGO/包装/贺卡" }
        },
        {
            id: "P011",
            category: "gift",
            name: "婚庆礼品定制",
            subtitle: "见证幸福 · 定制纪念",
            price: 0,
            original_price: 0,
            image_path: "gift/wedding-gift.jpg",
            badge: "",
            status: "on",
            sales: 0,
            description: "新婚贺礼、伴手礼一站式定制服务，寓意美好，见证幸福时刻。",
            features: ["婚礼主题定制", "美好寓意祝福", "伴手礼套装", "新人姓名定制"],
            specs: { moq: "20套起订", lead_time: "10-15工作日", includes: "礼盒+贺卡+丝带" }
        },
        {
            id: "P012",
            category: "gift",
            name: "节庆礼品礼盒 - 春节特供",
            subtitle: "新春纳福 · 精美包装",
            price: 388,
            original_price: 488,
            image_path: "gift/festival-gift.jpg",
            badge: "限时",
            status: "on",
            sales: 1892,
            description: "春节主题礼品套装，精美红色礼盒包装，送礼有面子。",
            features: ["春节主题设计", "精美礼盒包装", "精选工艺品组合", "送礼体面过人"],
            specs: { contents: "茶具/摆件/饰品可选", packaging: "高档礼盒", weight: "约2kg" }
        }
    ],

    // ==================== 网站设置 ====================
    settings: {
        enable_filter: true,
        products_per_page: 12,
        show_original_price: true,
        show_sales: true,
        email_required: false,
        icp: "闽ICP备XXXXXXX号",
        analytics_code: ""
    }
};

// 导出配置（支持模块化使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}