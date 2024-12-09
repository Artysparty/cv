import { FormValidator } from './formValidation.js';
import { TELEGRAM_CONFIG } from '../config/telegram.js';
import { RateLimiter } from '../utils/rateLimiter.js';
import { AlertManager } from './alerts.js';

export class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.validator = new FormValidator(this.form);
        this.alertManager = new AlertManager();
        this.rateLimiter = new RateLimiter(TELEGRAM_CONFIG.RATE_LIMIT_MS);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validator.validateForm()) {
                this.alertManager.show('Пожалуйста, исправьте ошибки в форме', 'error');
                return;
            }

            if (!this.rateLimiter.canMakeRequest()) {
                const waitTime = Math.ceil(this.rateLimiter.getTimeToWait() / 1000);
                this.alertManager.show(`Пожалуйста, подождите ${waitTime} секунд перед следующей отправкой`, 'error');
                return;
            }

            if (this.rateLimiter.getMessageCount() >= TELEGRAM_CONFIG.MAX_MESSAGES_PER_SESSION) {
                this.alertManager.show('Превышен лимит отправки сообщений. Попробуйте позже.', 'error');
                return;
            }

            await this.handleSubmit();
        });
    }

    async handleSubmit() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            const formData = this.getFormData();
            const message = this.formatMessage(formData);

            const response = await this.sendToTelegram(message);
            const result = await response.json();

            if (result.ok) {
                this.rateLimiter.recordRequest();
                this.alertManager.show('Сообщение успешно отправлено!', 'success');
                this.form.reset();
            } else {
                throw new Error(result.description || 'Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            this.alertManager.show('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить в Telegram';
        }
    }

    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    }

    formatMessage(formData) {
        return `
🔔 Новое сообщение с сайта

👤 Имя: ${this.sanitizeInput(formData.name)}
📧 Email: ${this.sanitizeInput(formData.email)}
📝 Тема: ${this.sanitizeInput(formData.subject)}
💬 Сообщение: ${this.sanitizeInput(formData.message)}
        `.trim();
    }

    sanitizeInput(input) {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    async sendToTelegram(message) {
        return fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
    }
} 