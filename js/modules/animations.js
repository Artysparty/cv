export class AnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
    }

    init() {
        this.initScrollAnimations();
        this.handleScrollAnimations();
        window.addEventListener('scroll', () => this.handleScrollAnimations());
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.skill-category, .service-card, .profile, h1, h2, h3, p');
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-in');
        });
    }
} 