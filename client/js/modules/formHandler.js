import { AlertManager } from './alerts.js';
import { API_URL } from '../utils/constants.js';
import { FormValidator } from './formValidation.js';

export class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.alertManager = new AlertManager();
        this.validator = new FormValidator(this.form);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validator.validateForm()) {
                this.alertManager.show('Пожалуйста, исправьте ошибки в форме', 'error');
                return;
            }

            await this.handleSubmit(e);
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        try {
            await this.sendFormData(this.getFormData(), submitButton);
        } catch (error) {
            this.handleError(error);
        }
    }

    getFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
    }

    async sendFormData(formData, submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            const response = await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                this.alertManager.show('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.', 'success');
                this.form.reset();
            } else {
                throw new Error(result.message || 'Произошла ошибка при отправке');
            }
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить';
        }
    }

    handleError(error) {
        this.alertManager.show('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
        console.error('Ошибка:', error);
    }
} 