class FishCursor {
    constructor() {
        this.fish = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.angle = 0;
        this.targetAngle = 0;
        this.tailAngle = 0;
        this.tailSpeed = 0.15;
        this.isMoving = false;
        this.bubbleInterval = null;
        
        this.init();
    }
    
    init() {
        this.createFish();
        this.bindEvents();
        this.animate();
    }
    
    createFish() {
        this.fish = document.createElement('div');
        this.fish.className = 'fish-cursor';
        this.fish.innerHTML = `
            <div class="fish-body">
                <div class="fish-tail"></div>
                <div class="fish-fin-top"></div>
                <div class="fish-fin-bottom"></div>
                <div class="fish-eye"></div>
                <div class="fish-mouth"></div>
                <div class="fish-scales"></div>
            </div>
            <div class="bubbles-container"></div>
        `;
        document.body.appendChild(this.fish);
        
        this.currentX = window.innerWidth / 2;
        this.currentY = window.innerHeight / 2;
        this.fish.style.left = this.currentX + 'px';
        this.fish.style.top = this.currentY + 'px';
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMoving = true;
            
            clearTimeout(this.moveTimeout);
            this.moveTimeout = setTimeout(() => {
                this.isMoving = false;
            }, 100);
        });
        
        document.addEventListener('mouseenter', () => {
            if (this.fish) {
                this.fish.style.opacity = '1';
            }
        });
        
        document.addEventListener('mouseleave', () => {
            if (this.fish) {
                this.fish.style.opacity = '0';
            }
        });
    }
    
    animate() {
        const dx = this.mouseX - this.currentX;
        const dy = this.mouseY - this.currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            const ease = this.isMoving ? 0.08 : 0.03;
            this.currentX += dx * ease;
            this.currentY += dy * ease;
            
            this.targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            let angleDiff = this.targetAngle - this.angle;
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;
            this.angle += angleDiff * 0.1;
            
            this.tailSpeed = Math.min(0.3, distance * 0.002 + 0.05);
        } else {
            this.tailSpeed *= 0.95;
            if (this.tailSpeed < 0.02) this.tailSpeed = 0.02;
        }
        
        this.tailAngle += this.tailSpeed;
        
        if (this.fish) {
            this.fish.style.left = this.currentX + 'px';
            this.fish.style.top = this.currentY + 'px';
            this.fish.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;
            
            const tail = this.fish.querySelector('.fish-tail');
            if (tail) {
                tail.style.transform = `rotate(${Math.sin(this.tailAngle) * 25}deg)`;
            }
            
            const finTop = this.fish.querySelector('.fish-fin-top');
            if (finTop) {
                finTop.style.transform = `rotate(${Math.sin(this.tailAngle * 0.8) * 15}deg)`;
            }
            
            const finBottom = this.fish.querySelector('.fish-fin-bottom');
            if (finBottom) {
                finBottom.style.transform = `rotate(${Math.sin(this.tailAngle * 0.8 + 1) * -15}deg)`;
            }
            
            if (this.isMoving && Math.random() < 0.03 && distance > 30) {
                this.createBubble();
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    createBubble() {
        const container = this.fish.querySelector('.bubbles-container');
        if (!container) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(100,200,255,0.4));
            border-radius: 50%;
            right: -10px;
            top: ${Math.random() * 20 - 10}px;
            opacity: 0.7;
            pointer-events: none;
        `;
        
        container.appendChild(bubble);
        
        let posX = 0;
        let posY = 0;
        let opacity = 0.7;
        
        const animateBubble = () => {
            posX += 2;
            posY += (Math.random() - 0.5) * 2;
            opacity -= 0.02;
            
            bubble.style.transform = `translate(${posX}px, ${posY}px)`;
            bubble.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateBubble);
            } else {
                bubble.remove();
            }
        };
        
        requestAnimationFrame(animateBubble);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FishCursor());
} else {
    new FishCursor();
}