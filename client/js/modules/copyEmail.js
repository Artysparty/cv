export class CopyEmail {
    constructor() {
        this.init();
    }

    init() {
        const copyButton = document.querySelector('.copy-button');
        if (!copyButton) return;

        copyButton.addEventListener('click', async () => {
            const email = document.querySelector('.email-container p').textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                copyButton.classList.add('copied');
                
                // Убираем класс через 2 секунды
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Ошибка при копировании:', err);
            }
        });
    }
} 