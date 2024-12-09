export class AlertManager {
    constructor() {
        this.alert = document.getElementById('customAlert');
        this.alertContent = this.alert.querySelector('.alert-content');
        this.messageEl = this.alert.querySelector('.alert-message');
    }

    show(message, type = 'success') {
        this.alertContent.className = `alert-content ${type}`;
        this.messageEl.textContent = message;
        this.alert.classList.add('show');

        setTimeout(() => {
            this.alert.classList.remove('show');
        }, 3000);
    }
} 