// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение стиля шапки при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Модальное окно для продуктов
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Данные о продуктах
const productData = {
    uno: {
        title: 'Arduino Uno',
        description: 'Arduino Uno - это самая популярная плата в семействе Arduino. Она основана на микроконтроллере ATmega328P и имеет 14 цифровых входов/выходов (6 из которых могут использоваться как ШИМ-выходы), 6 аналоговых входов, кварцевый резонатор 16 МГц, разъем USB, силовой разъем, разъем ICSP и кнопку сброса.',
        specs: [
            'Микроконтроллер: ATmega328P',
            'Рабочее напряжение: 5V',
            'Входное напряжение (рекомендуемое): 7-12V',
            'Цифровые входы/выходы: 14',
            'Аналоговые входы: 6',
            'Память: 32 КБ (0.5 КБ используется для загрузчика)',
            'Тактовая частота: 16 МГц'
        ]
    },
    nano: {
        title: 'Arduino Nano',
        description: 'Arduino Nano - это компактная, полная и удобная для макетирования плата, основанная на ATmega328P (Arduino Nano 3.x). Она имеет примерно ту же функциональность, что и Arduino Uno, но в другом форм-факторе.',
        specs: [
            'Микроконтроллер: ATmega328P',
            'Рабочее напряжение: 5V',
            'Входное напряжение (рекомендуемое): 7-12V',
            'Цифровые входы/выходы: 14',
            'Аналоговые входы: 8',
            'Память: 32 КБ (0.5 КБ используется для загрузчика)',
            'Тактовая частота: 16 МГц'
        ]
    },
    mega: {
        title: 'Arduino Mega',
        description: 'Arduino Mega 2560 - это плата на основе микроконтроллера ATmega2560. Она имеет 54 цифровых входов/выходов (15 из которых могут использоваться как ШИМ-выходы), 16 аналоговых входов, 4 UART (аппаратные последовательные порты), кварцевый резонатор 16 МГц, разъем USB, силовой разъем, разъем ICSP и кнопку сброса.',
        specs: [
            'Микроконтроллер: ATmega2560',
            'Рабочее напряжение: 5V',
            'Входное напряжение (рекомендуемое): 7-12V',
            'Цифровые входы/выходы: 54',
            'Аналоговые входы: 16',
            'Память: 256 КБ (8 КБ используется для загрузчика)',
            'Тактовая частота: 16 МГц'
        ]
    },
    due: {
        title: 'Arduino Due',
        description: 'Arduino Due - это плата на основе микроконтроллера Atmel SAM3X8E ARM Cortex-M3. Это первая плата Arduino на основе 32-битного микроконтроллера ARM. Она имеет 54 цифровых входов/выходов (12 из которых могут использоваться как ШИМ-выходы), 12 аналоговых входов, 4 UART (аппаратные последовательные порты), тактовую частоту 84 МГц, разъем USB OTG, 2 ЦАП (цифро-аналоговых преобразователя), 2 TWI, разъем питания, разъем SPI, разъем JTAG и кнопку сброса.',
        specs: [
            'Микроконтроллер: AT91SAM3X8E',
            'Рабочее напряжение: 3.3V',
            'Цифровые входы/выходы: 54',
            'Аналоговые входы: 12',
            'Память: 512 КБ (все доступно для скетчей)',
            'Тактовая частота: 84 МГц'
        ]
    }
};

// Обработчики для кнопок продуктов
document.querySelectorAll('.product-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        showProductModal(productId);
    });
});

// Функция показа модального окна
function showProductModal(productId) {
    const product = productData[productId];
    
    if (product) {
        modalTitle.textContent = product.title;
        
        let contentHTML = `
            <p>${product.description}</p>
            <h3>Технические характеристики:</h3>
            <ul>
        `;
        
        product.specs.forEach(spec => {
            contentHTML += `<li>${spec}</li>`;
        });
        
        contentHTML += '</ul>';
        
        modalContent.innerHTML = contentHTML;
        modal.style.display = 'block';
    }
}

// Закрытие модального окна
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за элементами, которые должны анимироваться
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .contact-card');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);