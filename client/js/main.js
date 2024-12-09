import { ScrollManager } from './modules/scrolling.js';
import { AnimationManager } from './modules/animations.js';
import { DigitalRain } from './modules/digitalRain.js';
import { FormHandler } from './modules/formHandler.js';

// Дождёмся полной загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
    // Инициализируем все модули
    const scrollManager = new ScrollManager();
    const animationManager = new AnimationManager();
    const digitalRain = new DigitalRain();
    const formHandler = new FormHandler();

    // Запускаем необходимые инициализации
    animationManager.init();
    digitalRain.init();
}); 