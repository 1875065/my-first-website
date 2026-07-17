#!/usr/bin/env node

/**
 * YAML 到 JavaScript 配置转换工具
 * 
 * 使用方法：
 * 1. 安装依赖：npm install js-yaml
 * 2. 运行转换：node tools/convert-yaml.js
 * 
 * 或者直接使用：
 * node tools/convert-yaml.js --watch   (监控模式，自动转换)
 */

const fs = require('fs');
const path = require('path');

// 尝试加载 js-yaml
let yaml;
try {
    yaml = require('js-yaml');
} catch (error) {
    console.error('❌ 请先安装依赖：npm install js-yaml');
    process.exit(1);
}

const YAML_FILE = path.join(__dirname, '..', 'data', 'config.yaml');
const JS_FILE = path.join(__dirname, '..', 'data', 'config.js');

function convertYamlToJs() {
    try {
        console.log('📖 正在读取 config.yaml...');
        
        // 读取 YAML 文件
        const yamlContent = fs.readFileSync(YAML_FILE, 'utf8');
        
        // 解析 YAML
        const data = yaml.load(yamlContent);
        
        // 转换为 JavaScript
        const jsContent = `/**
 * 安溪团山堡工艺品有限公司 - 网站配置数据
 * 
 * ⚠️ 此文件由 tools/convert-yaml.js 自动生成
 * ⏰ 生成时间：${new Date().toLocaleString('zh-CN')}
 * 
 * 如需修改网站内容，请编辑 data/config.yaml 文件
 * 然后重新运行此脚本更新此文件
 */

const SITE_CONFIG = ${JSON.stringify(data, null, 2)};

// 导出配置（支持模块化使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
`;
        
        // 写入 JS 文件
        fs.writeFileSync(JS_FILE, jsContent, 'utf8');
        
        // 统计信息
        const productCount = data.products ? data.products.length : 0;
        const activeCount = data.products ? data.products.filter(p => p.status === 'on').length : 0;
        const inactiveCount = data.products ? data.products.filter(p => p.status === 'off').length : 0;
        
        console.log('✅ 转换成功！');
        console.log(`   📄 输出文件: ${path.relative(process.cwd(), JS_FILE)}`);
        console.log(`   📦 总商品数: ${productCount}`);
        console.log(`   ✅ 上架商品: ${activeCount}`);
        console.log(`   ❌ 下架商品: ${inactiveCount}`);
        console.log(`   📝 草稿商品: ${productCount - activeCount - inactiveCount}`);
        console.log('');
        console.log('💡 提示: 刷新浏览器页面即可看到更新');
        
        return true;
        
    } catch (error) {
        console.error('❌ 转换失败:', error.message);
        
        if (error.mark) {
            console.error(`   位置: 第 ${error.line} 行，第 ${error.column} 列`);
            console.error(`   原因: ${error.reason}`);
        }
        
        return false;
    }
}

// 检查是否为监控模式
if (process.argv.includes('--watch')) {
    console.log('👀 启动监控模式...');
    console.log(`   监控文件: ${path.relative(process.cwd(), YAML_FILE)}`);
    console.log('   按 Ctrl+C 停止\n');
    
    // 初始转换
    convertYamlToJs();
    
    // 监控文件变化
    fs.watch(YAML_FILE, (eventType) => {
        if (eventType === 'change') {
            console.log('\n🔄 检测到文件变化，正在重新转换...');
            convertYamlToJs();
        }
    });
    
} else {
    // 单次转换
    convertYamlToJs();
}

// 导出函数供其他模块使用
module.exports = { convertYamlToJs };