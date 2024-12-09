export class FormValidator {
    constructor(form) {
        this.form = form;
        this.isValid = false;
        this.submitButton = form.querySelector('button[type="submit"]');
        this.validators = {
            name: {
                validate: value => value.length >= 2,
                message: 'Имя должно содержать минимум 2 символа'
            },
            email: {
                validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                message: 'Введите корректный email адрес'
            },
            subject: {
                validate: value => value.length >= 5,
                message: 'Тема должна содержать минимум 5 символов'
            },
            message: {
                validate: value => value.length >= 10,
                message: 'Сообщение должно содержать минимум 10 символов'
            }
        };

        this.init();
    }

    init() {
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });

        this.form.addEventListener('input', () => this.validateForm());
    }

    validateField(field) {
        const validator = this.validators[field.id];
        const errorElement = this.getErrorElement(field);
        
        if (validator && !validator.validate(field.value)) {
            this.showError(field, errorElement, validator.message);
            return false;
        } else {
            this.hideError(field, errorElement);
            return true;
        }
    }

    validateForm() {
        const isValid = Array.from(this.form.querySelectorAll('input, textarea'))
            .every(field => this.validateField(field));
        
        this.submitButton.disabled = !isValid;
        this.isValid = isValid;
        return isValid;
    }

    getErrorElement(field) {
        let errorElement = field.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }
        
        return errorElement;
    }

    showError(field, errorElement, message) {
        field.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    hideError(field, errorElement) {
        field.classList.remove('invalid');
        errorElement.classList.remove('show');
    }
} 