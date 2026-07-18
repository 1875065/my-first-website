class MobileDetect {
    constructor() {
        this.isMobile = this.checkMobile();
        this.isTablet = this.checkTablet();
        this.isDesktop = !this.isMobile && !this.isTablet;
        this.deviceType = this.getDeviceType();
        this.screenSize = this.getScreenSize();
        
        this.init();
    }
    
    checkMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }
    
    checkTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent) || 
               (window.innerWidth > 768 && window.innerWidth <= 1024);
    }
    
    getDeviceType() {
        if (this.isMobile) return 'mobile';
        if (this.isTablet) return 'tablet';
        return 'desktop';
    }
    
    getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            isPortrait: window.innerHeight > window.innerWidth,
            isLandscape: window.innerWidth > window.innerHeight
        };
    }
    
    init() {
        document.documentElement.classList.add(`device-${this.deviceType}`);
        document.documentElement.setAttribute('data-device', this.deviceType);
        
        if (this.isMobile || this.isTablet) {
            this.setupMobileOptimizations();
        }
        
        this.bindEvents();
        this.optimizeForDevice();
    }
    
    setupMobileOptimizations() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
        }
        
        document.body.classList.add('mobile-device');
        
        this.addTouchOptimizations();
    }
    
    addTouchOptimizations() {
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
            }
            
            a, button, input, textarea, select {
                -webkit-tap-highlight-color: rgba(0,0,0,0.05);
            }
            
            body {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            
            img {
                max-width: 100%;
                height: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    bindEvents() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.screenSize = this.getScreenSize();
                this.handleOrientationChange();
                this.optimizeForDevice();
            }, 250);
        });
        
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.screenSize = this.getScreenSize();
                this.handleOrientationChange();
            }, 100);
        });
    }
    
    handleOrientationChange() {
        document.documentElement.classList.remove('portrait', 'landscape');
        document.documentElement.classList.add(this.screenSize.isPortrait ? 'portrait' : 'landscape');
        
        if (this.isMobile) {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    const hamburger = document.getElementById('hamburger');
                    if (hamburger) hamburger.click();
                }
            }
        }
    }
    
    optimizeForDevice() {
        if (this.isMobile) {
            this.optimizeForMobile();
        } else if (this.isTablet) {
            this.optimizeForTablet();
        } else {
            this.optimizeForDesktop();
        }
    }
    
    optimizeForMobile() {
        this.adjustSpacing();
        this.adjustTypography();
        this.improveNavigation();
        this.optimizeImages();
        this.enlargeTouchTargets();
    }
    
    optimizeForTablet() {
        this.adjustSpacing(0.8);
        this.adjustTypography(0.9);
    }
    
    optimizeForDesktop() {
        document.body.style.zoom = '';
    }
    
    adjustSpacing(scale = 1) {
        const root = document.documentElement;
        const baseSpacing = Math.max(10, 16 * scale);
        root.style.setProperty('--mobile-spacing', `${baseSpacing}px`);
    }
    
    adjustTypography(scale = 1) {
        const baseFontSize = Math.max(14, 16 * scale);
        document.documentElement.style.fontSize = `${baseFontSize}px`;
    }
    
    improveNavigation() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        navbar.classList.add('mobile-nav');
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        const hamburger = document.getElementById('hamburger');
                        if (hamburger) hamburger.click();
                    }, 150);
                }
            });
        });
        
        document.addEventListener('scroll', () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                const hamburger = document.getElementById('hamburger');
                if (hamburger) hamburger.click();
            }
        });
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.getAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }
    
    enlargeTouchTargets() {
        const minTouchSize = 44;
        
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, [role="button"], .btn, .filter-btn'
        );
        
        interactiveElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const width = parseFloat(computedStyle.width) || el.offsetWidth;
            const height = parseFloat(computedStyle.height) || el.offsetHeight;
            
            if (width < minTouchSize || height < minTouchSize) {
                el.style.minWidth = `${Math.max(width, minTouchSize)}px`;
                el.style.minHeight = `${Math.max(height, minTouchSize)}px`;
                
                if (!el.style.padding) {
                    el.style.padding = '12px';
                }
            }
        });
    }
    
    static getInstance() {
        if (!window._mobileDetectInstance) {
            window._mobileDetectInstance = new MobileDetect();
        }
        return window._mobileDetectInstance;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MobileDetect());
} else {
    new MobileDetect();
}

window.MobileDetect = MobileDetect;