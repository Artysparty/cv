export class ServiceCards {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const service = card.dataset.service;
                this.scrollToForm();
                this.selectService(service);
            });
        });
    }

    scrollToForm() {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    selectService(service) {
        const select = document.getElementById('subject');
        select.value = service;
        // Вызываем событие change для активации валидации
        select.dispatchEvent(new Event('change'));
    }
} 