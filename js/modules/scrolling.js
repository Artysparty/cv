import { ANIMATION_DURATION } from '../utils/constants.js';

export class ScrollManager {
    constructor() {
        this.isScrolling = false;
        this.sections = Array.from(document.querySelectorAll('section'));
        this.currentSectionIndex = 0;
        this.init();
    }

    init() {
        this.setupWheelHandler();
        this.setupNavigation();
        this.setupScrollHandler();
        this.updateActiveMenuItem();
    }

    setupWheelHandler() {
        window.addEventListener('wheel', (e) => {
            e.preventDefault();

            if (this.isScrolling) return;

            this.currentSectionIndex = this.getCurrentSection();
            if (this.currentSectionIndex === -1) this.currentSectionIndex = 0;

            if (e.deltaY > 0 && this.currentSectionIndex < this.sections.length - 1) {
                this.currentSectionIndex++;
            } else if (e.deltaY < 0 && this.currentSectionIndex > 0) {
                this.currentSectionIndex--;
            }

            this.isScrolling = true;
            this.sections[this.currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
            this.updateActiveMenuItem();

            setTimeout(() => {
                this.isScrolling = false;
            }, ANIMATION_DURATION);
        }, { passive: false });
    }

    setupNavigation() {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector(anchor.getAttribute('href'));
                this.currentSectionIndex = this.sections.indexOf(targetSection);
                targetSection.scrollIntoView({ behavior: 'smooth' });
                this.updateActiveMenuItem();
            });
        });
    }

    setupScrollHandler() {
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.currentSectionIndex = this.getCurrentSection();
                if (this.currentSectionIndex !== -1) {
                    this.updateActiveMenuItem();
                }
            }
        });
    }

    getCurrentSection() {
        const scrollPosition = window.scrollY;
        return this.sections.findIndex(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            return scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100;
        });
    }

    updateActiveMenuItem() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const sectionId = link.getAttribute('href').substring(1);
            if (sectionId === this.sections[this.currentSectionIndex].id) {
                link.classList.add('active');
            }
        });
    }
} 