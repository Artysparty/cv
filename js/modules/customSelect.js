export class CustomSelect {
    constructor() {
        this.init();
    }

    init() {
        const customSelect = document.querySelector('.custom-select');
        const selected = customSelect.querySelector('.select-selected');
        const items = customSelect.querySelector('.select-items');
        const select = customSelect.querySelector('select');

        // Флаг для отслеживания состояния анимации
        let isAnimating = false;

        selected.addEventListener('click', () => {
            if (!isAnimating) {
                customSelect.classList.toggle('open');
            }
        });

        selected.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!isAnimating) {
                    customSelect.classList.toggle('open');
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target) && !isAnimating) {
                if (customSelect.classList.contains('open')) {
                    isAnimating = true;
                    customSelect.classList.remove('open');
                    // Ждем окончания анимации
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300); // 300ms - время анимации в CSS
                }
            }
        });

        const selectItems = customSelect.querySelectorAll('.select-item');
        selectItems.forEach(item => {
            item.addEventListener('click', () => {
                if (!isAnimating) {
                    const value = item.dataset.value;
                    select.value = value;
                    selected.textContent = item.textContent;
                    
                    isAnimating = true;
                    customSelect.classList.remove('open');
                    
                    // Убираем выделение со всех элементов
                    selectItems.forEach(i => i.classList.remove('selected'));
                    // Добавляем выделение выбранному элементу
                    item.classList.add('selected');
                    
                    // Вызываем событие change для валидации
                    select.dispatchEvent(new Event('change'));
                    
                    // Ждем окончания анимации
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }
            });
        });
    }
} 