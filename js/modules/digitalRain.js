export class DigitalRain {
    constructor() {
        this.canvas = document.querySelector('.digital-rain');
        if (!this.canvas) {
            console.error('Digital rain container not found');
            return;
        }
        this.chars = ['0', '1'];
        this.drops = [];
    }

    init() {
        if (!this.canvas) return;

        // Очищаем существующие капли
        this.canvas.innerHTML = '';
        
        // Создаем начальные капли
        for (let i = 0; i < 100; i++) {
            this.createDrop();
        }

        // Запускаем интервал для создания новых капель
        this.interval = setInterval(() => {
            if (Math.random() < 0.4) {
                this.createDrop();
            }
        }, 100);
    }

    createDrop() {
        if (!this.canvas) return;

        const char = document.createElement('div');
        char.className = 'digital-char';
        
        const size = 12 + Math.random() * 8;
        char.style.fontSize = `${size}px`;
        
        const opacity = 0.3 + Math.random() * 0.7;
        char.style.opacity = opacity;
        
        char.textContent = this.chars[Math.floor(Math.random() * this.chars.length)];
        
        const x = Math.random() * window.innerWidth;
        char.style.left = `${x}px`;
        
        this.canvas.appendChild(char);
        
        const duration = 2000 + Math.random() * 4000;
        
        try {
            const animation = char.animate([
                { 
                    opacity: 0,
                    transform: 'translateY(-20px)'
                },
                {
                    opacity: opacity,
                    transform: `translateY(${window.innerHeight * 0.3}px)`
                },
                {
                    opacity: 0,
                    transform: `translateY(${window.innerHeight}px)`
                }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            animation.onfinish = () => {
                if (char.parentNode === this.canvas) {
                    this.canvas.removeChild(char);
                }
            };
        } catch (error) {
            console.error('Animation error:', error);
            if (char.parentNode === this.canvas) {
                this.canvas.removeChild(char);
            }
        }
    }

    // Добавим метод для очистки
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.canvas) {
            this.canvas.innerHTML = '';
        }
    }
} 