/**
 * 数据加载器 - 从配置文件读取网站内容
 * 支持商品上下架管理、价格显示等功能
 */

class DataLoader {
    constructor() {
        this.config = null;
        this.products = [];
        this.categories = [];
        this.initialized = false;
    }

    /**
     * 初始化数据加载器
     */
    async init() {
        try {
            if (typeof SITE_CONFIG !== 'undefined') {
                this.config = SITE_CONFIG;
                this.products = this.config.products || [];
                this.categories = this.config.categories || [];
                this.initialized = true;
                console.log('✅ 数据加载成功');
                return true;
            } else {
                console.error('❌ 配置文件未找到，请确保 data/config.js 已正确引入');
                return false;
            }
        } catch (error) {
            console.error('❌ 数据加载失败:', error);
            return false;
        }
    }

    /**
     * 获取公司信息
     */
    getCompanyInfo() {
        if (!this.initialized) return {};
        return this.config.company || {};
    }

    /**
     * 获取公司联系方式
     */
    getContactInfo() {
        const company = this.getCompanyInfo();
        return company.contact || {};
    }

    /**
     * 获取社交媒体信息
     */
    getSocialInfo() {
        const company = this.getCompanyInfo();
        return company.social || {};
    }

    /**
     * 获取统计数据
     */
    getStats() {
        const company = this.getCompanyInfo();
        return company.stats || {};
    }

    /**
     * 获取所有分类
     */
    getCategories() {
        return this.categories;
    }

    /**
     * 根据ID获取分类信息
     */
    getCategoryById(categoryId) {
        return this.categories.find(cat => cat.id === categoryId) || {};
    }

    /**
     * 获取所有上架商品（status: on）
     */
    getActiveProducts() {
        return this.products.filter(product => product.status === 'on');
    }

    /**
     * 获取所有下架商品（status: off）
     */
    getInactiveProducts() {
        return this.products.filter(product => product.status === 'off');
    }

    /**
     * 获取所有草稿商品（status: draft）
     */
    getDraftProducts() {
        return this.products.filter(product => product.status === 'draft');
    }

    /**
     * 根据分类获取上架商品
     */
    getProductsByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.getActiveProducts();
        }
        return this.getActiveProducts().filter(product => product.category === categoryId);
    }

    /**
     * 根据商品ID获取商品详情
     */
    getProductById(productId) {
        return this.products.find(product => product.id === productId) || {};
    }

    /**
     * 格式化价格显示
     */
    formatPrice(price, originalPrice = 0) {
        if (price === 0 || price === null || price === undefined) {
            return { current: '咨询报价', original: '', discount: '' };
        }
        
        const formattedCurrent = `¥${price.toLocaleString()}`;
        let formattedOriginal = '';
        let discountText = '';
        
        if (originalPrice && originalPrice > price && this.config.settings.show_original_price) {
            formattedOriginal = `¥${originalPrice.toLocaleString()}`;
            const discount = Math.round((1 - price / originalPrice) * 100);
            discountText = `${discount}折`;
        }
        
        return {
            current: formattedCurrent,
            original: formattedOriginal,
            discount: discountText
        };
    }

    /**
     * 获取商品图片完整路径
     */
    getProductImageUrl(imagePath) {
        if (!imagePath) return 'images/products/placeholder.jpg';
        return `images/products/${imagePath}`;
    }

    /**
     * 检查商品是否有库存/可购买
     */
    isProductAvailable(product) {
        return product && product.status === 'on';
    }

    /**
     * 获取商品标签HTML
     */
    getProductBadge(badge) {
        if (!badge) return '';
        
        const badgeClass = badge === '热销' ? 'hot' : 
                          badge === '新品' ? 'new' : 
                          badge === '限时' ? 'limited' : '';
        
        return `<span class="product-badge ${badgeClass}">${badge}</span>`;
    }

    /**
     * 生成商品卡片HTML
     */
    generateProductCard(product) {
        if (!product) return '';
        
        const category = this.getCategoryById(product.category);
        const priceInfo = this.formatPrice(product.price, product.original_price);
        const imageUrl = this.getProductImageUrl(product.image_path);
        const badgeHtml = this.getProductBadge(product.badge);
        const salesText = this.config.settings.show_sales && product.sales > 0 
                         ? `已售 ${product.sales.toLocaleString()}件` 
                         : (product.price === 0 ? '定制服务' : '');
        
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.src='images/products/placeholder.jpg'">
                    ${badgeHtml}
                    <div class="product-overlay">
                        <a href="#" class="product-link" onclick="showProductDetail('${product.id}')">查看详情</a>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-subtitle">${product.subtitle}</p>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-meta">
                        <div class="price-info">
                            <span class="product-price">${priceInfo.current}</span>
                            ${priceInfo.original ? `<span class="product-original">${priceInfo.original}</span>` : ''}
                            ${priceInfo.discount ? `<span class="product-discount">${priceInfo.discount}</span>` : ''}
                        </div>
                        ${salesText ? `<span class="product-sales">${salesText}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染商品列表到容器
     */
    renderProducts(containerId, categoryId = 'all', limit = 0) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`❌ 找不到容器: ${containerId}`);
            return;
        }
        
        let products = this.getProductsByCategory(categoryId);
        
        if (limit > 0) {
            products = products.slice(0, limit);
        }
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <div class="no-products-icon">📦</div>
                    <p>暂无商品</p>
                    <p class="no-products-hint">该分类下暂无上架商品，敬请期待</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = products.map(product => this.generateProductCard(product)).join('');
        
        // 添加动画效果
        container.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * 渲染筛选按钮
     */
    renderFilterButtons(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const allCategory = { id: 'all', name: '全部产品', icon: '📦' };
        const categories = [allCategory, ...this.categories];
        
        container.innerHTML = categories.map(cat => `
            <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" 
                    data-filter="${cat.id}"
                    onclick="filterProducts('${cat.id}')">
                ${cat.icon || ''} ${cat.name}
            </button>
        `).join('');
    }

    /**
     * 更新页面中的公司信息
     */
    updateCompanyInfo() {
        const company = this.getCompanyInfo();
        const contact = this.getContactInfo();
        const social = this.getSocialInfo();
        const stats = this.getStats();
        
        // 更新公司名称
        document.querySelectorAll('.company-name').forEach(el => {
            el.textContent = company.name;
        });
        
        // 更新标语
        document.querySelectorAll('.company-slogan').forEach(el => {
            el.textContent = company.slogan;
        });
        
        // 更新描述
        document.querySelectorAll('.company-description').forEach(el => {
            el.textContent = company.description;
        });
        
        // 更新联系信息
        if (contact.address) {
            document.querySelectorAll('.contact-address').forEach(el => {
                el.innerHTML = contact.address.replace(/ /g, '<br>');
            });
        }
        
        if (contact.phone) {
            document.querySelectorAll('.contact-phone').forEach(el => {
                el.textContent = contact.phone;
            });
        }
        
        if (contact.mobile) {
            document.querySelectorAll('.contact-mobile').forEach(el => {
                el.textContent = contact.mobile;
            });
        }
        
        if (contact.email_business) {
            document.querySelectorAll('.email-business').forEach(el => {
                el.textContent = contact.email_business;
                el.href = `mailto:${contact.email_business}`;
            });
        }
        
        if (contact.work_time) {
            document.querySelectorAll('.work-time').forEach(el => {
                el.innerHTML = contact.work_time.replace(/ /g, '<br>');
            });
        }
        
        // 更新统计数据
        if (stats.experience_years) {
            document.querySelectorAll('.stat-years').forEach(el => {
                el.setAttribute('data-target', stats.experience_years);
            });
        }
        
        if (stats.satisfied_customers) {
            document.querySelectorAll('.stat-customers').forEach(el => {
                el.setAttribute('data-target', stats.satisfied_customers);
            });
        }
        
        if (stats.product_categories) {
            document.querySelectorAll('.stat-categories').forEach(el => {
                el.setAttribute('data-target', stats.product_categories);
            });
        }
        
        // 更新备案号
        if (this.config.settings.icp) {
            document.querySelectorAll('.icp-code').forEach(el => {
                el.textContent = this.config.settings.icp;
            });
        }
        
        console.log('✅ 公司信息已更新');
    }

    /**
     * 显示商品详情弹窗
     */
    showProductDetail(productId) {
        const product = this.getProductById(productId);
        if (!product || !this.isProductAvailable(product)) {
            alert('该商品暂不可用或已下架');
            return;
        }
        
        const category = this.getCategoryById(product.category);
        const priceInfo = this.formatPrice(product.price, product.original_price);
        const imageUrl = this.getProductImageUrl(product.image_path);
        
        const modalHtml = `
            <div class="product-modal" id="productModal">
                <div class="modal-content">
                    <button class="modal-close" onclick="closeProductModal()">&times;</button>
                    <div class="modal-body">
                        <div class="modal-image">
                            <img src="${imageUrl}" alt="${product.name}">
                        </div>
                        <div class="modal-info">
                            <span class="modal-category">${category.icon} ${category.name}</span>
                            <h2>${product.name}</h2>
                            <p class="modal-subtitle">${product.subtitle}</p>
                            
                            <div class="modal-price">
                                <span class="current-price">${priceInfo.current}</span>
                                ${priceInfo.original ? `<span class="original-price">${priceInfo.original}</span>` : ''}
                                ${priceInfo.discount ? `<span class="discount-badge">${priceInfo.discount}</span>` : ''}
                            </div>
                            
                            <div class="modal-description">
                                <p>${product.description}</p>
                            </div>
                            
                            ${product.features ? `
                            <div class="modal-features">
                                <h4>产品特点</h4>
                                <ul>
                                    ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                                </ul>
                            </div>
                            ` : ''}
                            
                            ${product.specs ? `
                            <div class="modal-specs">
                                <h4>规格参数</h4>
                                <dl>
                                    ${Object.entries(product.specs).map(([key, value]) => `
                                        <dt>${this.formatSpecKey(key)}</dt>
                                        <dd>${value}</dd>
                                    `).join('')}
                                </dl>
                            </div>
                            ` : ''}
                            
                            <div class="modal-actions">
                                <a href="contact.html" class="btn btn-primary">立即咨询</a>
                                <a href="tel:${contact.mobile}" class="btn btn-secondary">电话咨询</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.getElementById('productModal').classList.add('show');
        }, 10);
    }

    /**
     * 规格键名格式化
     */
    formatSpecKey(key) {
        const keyMap = {
            material: '材质',
            craft: '工艺',
            size: '尺寸',
            height: '高度',
            capacity: '容量',
            pieces: '配件',
            panels: '扇数',
            power: '电源',
            temperature: '温控',
            moq: '起订量',
            lead_time: '交期',
            customization: '定制项',
            contents: '包含',
            packaging: '包装',
            weight: '重量',
            includes: '内含'
        };
        return keyMap[key] || key;
    }

    /**
     * 获取设置
     */
    getSettings() {
        return this.config.settings || {};
    }
}

// 创建全局实例
const dataLoader = new DataLoader();

// 全局函数：筛选商品
function filterProducts(categoryId) {
    dataLoader.renderProducts('productsGrid', categoryId);
    
    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === categoryId) {
            btn.classList.add('active');
        }
    });
}

// 全局函数：显示商品详情
function showProductDetail(productId) {
    dataLoader.showProductDetail(productId);
}

// 全局函数：关闭商品详情弹窗
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// 点击遮罩层关闭弹窗
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-modal')) {
        closeProductModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});