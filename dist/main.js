/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function () {
// MOBILE MENU
    const nav = document.querySelector('.header__nav');
    const navOpenHeader = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn_burger');
    const btnClose = document.querySelector('.btn_close');
    const menuLinks = document.querySelectorAll('.menu__link');
    const body = document.querySelector('body');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('open');
        navOpenHeader.classList.remove('hidden')
        body.classList.add('disable-scroll');
        navOpenHeader.classList.add('active');
        setTimeout(() => {
            btnClose.style.display = 'flex';
        }, 250);

    });

    [btnClose, ...menuLinks].forEach(function (element) {
        element.addEventListener('click', function () {
            nav.classList.remove('open');
            btnClose.style.display = 'none';
            body.classList.remove('disable-scroll');
            navOpenHeader.classList.remove('active');
        });
    });

// SCROLL TO ANCHOR


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Вимикаємо стандартну поведінку браузера

            const targetId = this.getAttribute("href").substring(1); // Отримуємо ID цільової секції
            const targetElement = document.getElementById(targetId); // Шукаємо елемент по ID

            if (targetElement) {
                gsap.to(window, {
                    scrollTo: targetElement, // Прокручуємо до елемента
                    duration: 1.5, // Тривалість анімації (в секундах)
                    ease: "power2.out",// Ефект анімації
                    onComplete: () => {
                        // Перезапускаємо всі ScrollTrigger після прокрутки
                        ScrollTrigger.refresh();
                    }
                });
            }
        });
    });

//ACCORDION
    const accordionList = document.querySelectorAll(".accordion__item");
    accordionList.forEach((item) => {
        item.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            accordionList.forEach((item) => item.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });


// SLIDER - TABS
    let sliderAbout;

    function initSwiper() {
        if (sliderAbout) sliderAbout.destroy(true, true);

        if (window.innerWidth >= 1024) {
            sliderAbout = new Swiper('.slider-about', {
                effect: 'fade',
                speed: 1000,
                pagination: {
                    el: '.slider-about .swiper-pagination',
                    clickable: true,
                },
                on: {
                    slideChange: updateCustomNavigation,
                },
            });
        } else {
            sliderAbout = new Swiper('.slider-about', {
                spaceBetween: 10,
                slidesPerView: 'auto',
                breakpoints: {
                    768: {
                        spaceBetween: 20,
                    },
                },
                pagination: {
                    el: '.slider-about .swiper-pagination',
                    clickable: true,
                },
                on: {
                    slideChange: updateCustomNavigation,
                },
            });
        }

        setupCustomNavigation();
    }

    function updateCustomNavigation() {
        const activeIndex = sliderAbout.realIndex;
        document.querySelectorAll('.about-nav__btn').forEach((btn, index) => {
            if (index === activeIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function setupCustomNavigation() {
        const navButtons = document.querySelectorAll('.about-nav__btn');

        navButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                sliderAbout.slideTo(index);
            });
        });
    }

    window.addEventListener('load', initSwiper);
    window.addEventListener('resize', initSwiper);

//BTN-UP
    (function () {

        function trackScroll() {
            let scrolled = window.pageYOffset;
            let coords = document.documentElement.clientHeight;

            if (scrolled > coords) {
                goTopBtn.classList.add('show');
            }
            if (scrolled < coords) {
                goTopBtn.classList.remove('show');
            }
        }

        function backToTop() {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -80);
                setTimeout(backToTop, 0);
            }
        }

        const goTopBtn = document.querySelector('.btn_up');

        window.addEventListener('scroll', trackScroll);
        goTopBtn.addEventListener('click', backToTop);
    })();

// POPUPS
    const openButtons = document.querySelectorAll('.open-popup'); // Кнопки для відкриття перших двох попапів
    const popup = document.getElementById('modal'); // Перший/Другий Попап
    const popupText = document.getElementById('modalHeader');
    const closePopupButton = document.getElementById('closePopup');
    const overlay = document.querySelector('.overlay');
    const thirdPopup = document.getElementById('playDiscount'); // Третій Попап
    const closeThirdPopupButton = document.getElementById('closeThirdPopup');

    function openPopup(popupElement) {
        popupElement.classList.add('open');
        overlay.classList.add('show');
        body.classList.add('disable-scroll');
    }

    function closePopup(popupElement) {
        popupElement.classList.remove('open');

        if (!document.querySelector('.popup.show')) {
            overlay.classList.remove('show');
            body.classList.remove('disable-scroll');
        }
    }

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const templateId = button.getAttribute('data-template-id');
            const template = document.getElementById(templateId);

            if (template) {
                const templateContent = template.content.cloneNode(true);
                popupText.innerHTML = '';
                popupText.appendChild(templateContent);

                const thirdPopupButton = popup.querySelector('.trigger-play');
                thirdPopupButton.addEventListener('click', () => {
                    closePopup(popup);
                    openPopup(thirdPopup);
                });

                openPopup(popup);
            }
        });
    });

    closePopupButton.addEventListener('click', () => closePopup(popup));
    closeThirdPopupButton.addEventListener('click', () => closePopup(thirdPopup));

    overlay.addEventListener('click', () => {
        closePopup(popup);
        closePopup(thirdPopup);
    });

// SPIN ROULETTE
    const wheel = document.getElementById('wheel');
    const wheelData = document.getElementById('wheelData');
    const btnSpin = document.getElementById('spinButton');
    const textStart = document.querySelector('.text-start');
    const textEnd = document.querySelector('.text-end');
    const btnDiscount = document.querySelector('.btn_discount');

// Спільна функція запуску барабана
    function spinWheel() {
        const targetSectorAngle = 300;
        const randomSpins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = randomSpins * 360 + targetSectorAngle;

        wheelData.style.transform = `rotate(${totalRotation}deg)`;
        textStart.style.display = 'none';
        btnSpin.style.display = 'none';

        setTimeout(() => {
            textEnd.style.display = 'block';
            btnDiscount.style.display = 'inline-flex';
        }, 3000);
    }

// Додаємо слухачі подій
    wheel.addEventListener('click', spinWheel);
    btnSpin.addEventListener('click', spinWheel);

// // ANIM BLOCK WITH GIRL
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.sticky-trigger',
            start: 'top top',
            end: '+=400%',
            pin: true,
            spinWheel: true,
            pinSpacing: true,
            toggleActions: 'play none none reverse',
            onUpdate: self => updateAnimationOnScroll(self.progress),
        }
    });

    const symptoms = document.querySelectorAll(".manifestation");
    const symptomList = document.querySelector(".manifestation-list ul");
    const images = document.querySelectorAll(".image");
    const iconsContainer = document.querySelector(".icons");
    const animationSection = document.querySelector(".section-manifestation");
    const stickyTrigger = document.querySelector(".sticky-trigger");

    let currentSymptomIndex = -1;
    let isLastAnimation = false;
    const delayAfterLastAnimation = 500;

    const sectionTop = animationSection.offsetTop;
    const sectionHeight = animationSection.offsetHeight;
    const symptomStep = sectionHeight / symptoms.length;

// Перевірка, чи це мобільний екран
    const isMobile = () => window.innerWidth < 768;

// Функція для оновлення стилів симптомів на десктопі (накопичувально)
    const updateSymptomsStylesDesktop = (currentIndex) => {
        symptoms.forEach((symptom, i) => {
            if (i <= currentIndex) {
                symptom.style.fontSize = '20px';
                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {
                const factor = Math.abs(i - currentIndex);
                const opacity = 0.6 - factor * (0.6 - 0.2) / symptoms.length;
                const blur = factor * (4 / symptoms.length);

                symptom.style.fontSize = '16px';
                symptom.style.opacity = opacity.toFixed(2);
                symptom.style.filter = `blur(${blur}px)`;
            }
        });
    };

// Функція для оновлення стилів симптомів на мобільних (поступово)
    const updateSymptomsStylesMobile = (currentIndex) => {
        symptoms.forEach((symptom, i) => {
            if (i <= currentIndex) {

                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {

                symptom.style.opacity = '0.3';
                // symptom.style.filter = `blur(4px)`;
            }
            symptom.style.fontSize = '16px'; // Фіксований розмір шрифту
        });
        let shiftWidth = 0;
        for (let i = 0; i < currentIndex; i++) {
            shiftWidth += symptoms[i].offsetWidth + 8; // Ширина елементів + gap (8px)
        }
        symptomList.style.transform = `translateX(-${shiftWidth}px)`;
    };

// Функція для оновлення стану
    const updateState = (index) => {
        // Логіка залежно від розміру екрана
        if (isMobile()) {
            updateSymptomsStylesMobile(index);
        } else {
            updateSymptomsStylesDesktop(index);
        }

        // Показуємо відповідну картинку
        const newImageIndex = getImageIndexForSymptom(index);
        images.forEach((image, imgIndex) => {
            if (imgIndex === newImageIndex) {
                image.classList.add("visible");
            } else {
                image.classList.remove("visible");
            }
        });

        // Оновлюємо іконки
        const iconSrc = symptoms[index]?.dataset.icon;
        if (iconSrc) {
            iconsContainer.innerHTML = ""; // Очищаємо попередні іконки
            const iconElement = document.createElement("img");
            iconElement.src = iconSrc;
            iconElement.classList.add("icon", "visible");
            iconsContainer.appendChild(iconElement);
        }
    };

// Оновлення анімації на основі скролу
    const updateAnimationOnScroll = (progress) => {
        const scrollPosition = progress * sectionHeight;

        if (!isLastAnimation) {
            symptoms.forEach((symptom, index) => {
                const start = index * symptomStep;
                const end = start + symptomStep;

                if (scrollPosition >= start && scrollPosition < end) {
                    if (currentSymptomIndex !== index) {
                        currentSymptomIndex = index;
                        updateState(index); // Оновлюємо стан на основі індексу
                    }
                }
            });
        }

        // Логіка для завершення анімації (залишаємо незмінною)
        if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
            // isLastAnimation = true;
            setTimeout(() => {
                stickyTrigger.style.position = "relative";
                stickyTrigger.style.top = "auto";
                stickyTrigger.style.scroll = "auto";
                stickyTrigger.style.height = "auto";
                updateState(currentSymptomIndex);
                ScrollTrigger.refresh();
            }, delayAfterLastAnimation);
        }
    };

// Функція для визначення, яка картинка відповідає поточному симптому
    const getImageIndexForSymptom = (symptomIndex) => {
        if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
        if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
        if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
        if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
        return -1; // Без картинки
    };


//    ANIMATION PILL
    const getCoordinatesRandomValue = () => Math.random() * 20 - 10;
    const getDurationRandomValue = () => 2 + Math.random();
    const getRotationRandomValue = () => Math.random() * 20 - 10;

    // This function creates the animation for each component.
    document.querySelectorAll(".pill-anim__component").forEach((component) => {
        const tl = gsap.timeline({repeat: -1, yoyo: true});

        tl.to(component, {
            y: `+=${getCoordinatesRandomValue()}`,
            x: `+=${getCoordinatesRandomValue()}`,
            rotation: `+=${getRotationRandomValue()}`,
            duration: getDurationRandomValue(),
            ease: "sine.inOut",
        })
            .to(component, {
                y: `+=${getCoordinatesRandomValue()}`,
                x: `+=${getCoordinatesRandomValue()}`,
                rotation: `+=${getRotationRandomValue()}`,
                duration: getDurationRandomValue(),
                ease: "sine.inOut",
            })
            .to(component, {
                y: `+=${getCoordinatesRandomValue()}`,
                x: `+=${getCoordinatesRandomValue()}`,
                rotation: `+=${getRotationRandomValue()}`,
                duration: getDurationRandomValue(),
                ease: "sine.inOut",
            });
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#about", // Section to observe for scroll
            start: "top center",
            // When to start (e.g., when the top of the section reaches the top of the viewport)
            onEnter: () => {
                // Add the class when the timeline starts
                document.getElementById("about").classList.add("timeline-started");
            },
            // markers: true,        // Remove in production; helpful for debugging
        },
    });
    timeline
        .to(".pill-anim__components", {
            scale: 0.2,
            opacity: 0,
            rotation: 360,
            duration: 1.5, // Скорочено тривалість
            ease: "power2.out",
        }, "+=0.5") // Скорочено затримку
        .from(".pill-anim__images", {
            opacity: 1,
            scale: 0,
            duration: 1.5, // Скорочено тривалість
            // ease: "linear",
            ease: "power1.out"
        }, "-=1") // Мінімальна затримка
        .from(".pill-anim__logo", {
            opacity: 0,
            xPercent: -150,
            duration: 0.6, // Менша тривалість
        }, "-=0.1"); // Мінімальна затримка


// ANIM SECTION STICKY
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sticky-grid__img-block',
                    start: 'top top',
                    end: 'center top', // Це значення може бути некоректним, див. пояснення нижче
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1
                }
            });
        }
    });
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });


//HOVER PARALLAX
if (window.innerWidth >= 1024) {
        // Знаходимо всі секції, які повинні мати ефект паралаксу
        const containers = document.querySelectorAll('.container-parallax');

        containers.forEach(container => {
            let rect = container.getBoundingClientRect();
            const mouse = {x: 0, y: 0, moved: false};

            // Відстеження руху миші в межах кожного контейнера
            container.addEventListener('mousemove', (e) => {
                mouse.moved = true;
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            // GSAP Ticker для оновлення паралаксу
            gsap.ticker.add(() => {
                if (mouse.moved) {
                    parallaxIt(container.querySelector('.img-parallax'), 10);
                    parallaxIt(container.querySelector('.back-wave-parallax'), -20);
                }
                mouse.moved = false;
            });

            // Функція паралаксу для конкретного контейнера
            function parallaxIt(target, movement) {
                if (!target) return; // Перевірка, чи елемент існує
                gsap.to(target, {
                    duration: 0.5,
                    x: (mouse.x - rect.width / 2) / rect.width * movement,
                    y: (mouse.y - rect.height / 2) / rect.height * movement
                });
            }

            // Оновлення координат контейнера при зміні розміру або прокрутці
            window.addEventListener('resize', updateRect);
            window.addEventListener('scroll', updateRect);

            function updateRect() {
                rect = container.getBoundingClientRect();
            }
        });
    }


//ANIM TITLE
    const sections2 = gsap.utils.toArray('.section-anim'); // Масив секцій

    sections2.forEach((section) => {
        const elements = gsap.utils.toArray('.anim-title, .anim-subtitle', section); // Заголовки і підзаголовки

        elements.forEach((el) => {
            const isTitle = el.classList.contains('anim-title'); // Перевірка, чи це заголовок
            const delay = isTitle ? 0.4 : 0.2; // Затримка для заголовків і підзаголовків

            const anim = gsap.fromTo(
                el,
                {opacity: 0, y: -100}, // Початкові параметри (загальний зсув)
                {duration: 1, opacity: 1, y: 0} // Кінцеві параметри
            );

            ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                animation: anim,
                stagger: delay, // Відмінність у затримці
                onLeaveBack: (self) => self.disable(),
            });
        });
    });

// ANIM ELEMENTS SECTION
    const sections = gsap.utils.toArray('.anim-container'); // Всі секції на сторінці
    sections.forEach((section) => {
        const items = gsap.utils.toArray('.anim-item', section); // Елементи (лише в межах секції)

        gsap.fromTo(
            items, // Масив елементів
            {opacity: 0, y: 100}, // Початковий стан (прозорість і зсув вниз)
            {
                opacity: 1,
                y: 0,
                duration: 0.6, // Тривалість анімації кожного елементу
                stagger: 0.1, // Інтервал між появою наступного елементу
                ease: "power1.in", // Ефект анімації
                scrollTrigger: {
                    trigger: section, // Тригер — сама секція
                    start: 'top 75%', // Анімація починається, коли секція в 75% вікна
                    toggleActions: 'play none none none', // Відтворення при вході та скасування при виході
                },
            }
        );
    });
})



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlciwgU2Nyb2xsVG9QbHVnaW4pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gTU9CSUxFIE1FTlVcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xyXG4gICAgY29uc3QgbmF2T3BlbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGJ0bkJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCAuLi5tZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNDUk9MTCBUTyBBTkNIT1JcclxuXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKS5mb3JFYWNoKGFuY2hvciA9PiB7XHJcbiAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vINCS0LjQvNC40LrQsNGU0LzQviDRgdGC0LDQvdC00LDRgNGC0L3RgyDQv9C+0LLQtdC00ZbQvdC60YMg0LHRgNCw0YPQt9C10YDQsFxyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikuc3Vic3RyaW5nKDEpOyAvLyDQntGC0YDQuNC80YPRlNC80L4gSUQg0YbRltC70YzQvtCy0L7RlyDRgdC10LrRhtGW0ZdcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTsgLy8g0KjRg9C60LDRlNC80L4g0LXQu9C10LzQtdC90YIg0L/QviBJRFxyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8od2luZG93LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG86IHRhcmdldEVsZW1lbnQsIC8vINCf0YDQvtC60YDRg9GH0YPRlNC80L4g0LTQviDQtdC70LXQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEuNSwgLy8g0KLRgNC40LLQsNC70ZbRgdGC0Ywg0LDQvdGW0LzQsNGG0ZbRlyAo0LIg0YHQtdC60YPQvdC00LDRhSlcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwvLyDQldGE0LXQutGCINCw0L3RltC80LDRhtGW0ZdcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCf0LXRgNC10LfQsNC/0YPRgdC60LDRlNC80L4g0LLRgdGWIFNjcm9sbFRyaWdnZXIg0L/RltGB0LvRjyDQv9GA0L7QutGA0YPRgtC60LhcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9BQ0NPUkRJT05cclxuICAgIGNvbnN0IGFjY29yZGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKTtcclxuICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBTTElERVIgLSBUQUJTXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFN3aXBlcigpIHtcclxuICAgICAgICBpZiAoc2xpZGVyQWJvdXQpIHNsaWRlckFib3V0LmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgIHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb246IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZTogdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHNsaWRlckFib3V0LnJlYWxJbmRleDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBuYXZCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJyk7XHJcblxyXG4gICAgICAgIG5hdkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyQWJvdXQuc2xpZGVUbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdFN3aXBlcik7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcik7XHJcblxyXG4vL0JUTi1VUFxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcclxuICAgIH0pKCk7XHJcblxyXG4vLyBQT1BVUFNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTsgLy8g0JrQvdC+0L/QutC4INC00LvRjyDQstGW0LTQutGA0LjRgtGC0Y8g0L/QtdGA0YjQuNGFINC00LLQvtGFINC/0L7Qv9Cw0L/RltCyXHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpOyAvLyDQn9C10YDRiNC40Lkv0JTRgNGD0LPQuNC5INCf0L7Qv9Cw0L9cclxuICAgIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbEhlYWRlcicpO1xyXG4gICAgY29uc3QgY2xvc2VQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAocG9wdXBFbGVtZW50KSB7XHJcbiAgICAgICAgcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAuc2hvdycpKSB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmFwcGVuZENoaWxkKHRlbXBsYXRlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpcmRQb3B1cEJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy50cmlnZ2VyLXBsYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcHVwKHRoaXJkUG9wdXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXApKTtcclxuICAgIGNsb3NlVGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAodGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgY2xvc2VQb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgIH0pO1xyXG5cclxuLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3Qgd2hlZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWwnKTtcclxuICAgIGNvbnN0IHdoZWVsRGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aGVlbERhdGEnKTtcclxuICAgIGNvbnN0IGJ0blNwaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpbkJ1dHRvbicpO1xyXG4gICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgIGNvbnN0IHRleHRFbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1lbmQnKTtcclxuICAgIGNvbnN0IGJ0bkRpc2NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9kaXNjb3VudCcpO1xyXG5cclxuLy8g0KHQv9GW0LvRjNC90LAg0YTRg9C90LrRhtGW0Y8g0LfQsNC/0YPRgdC60YMg0LHQsNGA0LDQsdCw0L3QsFxyXG4gICAgZnVuY3Rpb24gc3BpbldoZWVsKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFNlY3RvckFuZ2xlID0gMzAwO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVNwaW5zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkgKyA1O1xyXG4gICAgICAgIGNvbnN0IHRvdGFsUm90YXRpb24gPSByYW5kb21TcGlucyAqIDM2MCArIHRhcmdldFNlY3RvckFuZ2xlO1xyXG5cclxuICAgICAgICB3aGVlbERhdGEuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RvdGFsUm90YXRpb259ZGVnKWA7XHJcbiAgICAgICAgdGV4dFN0YXJ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4vLyDQlNC+0LTQsNGU0LzQviDRgdC70YPRhdCw0YfRliDQv9C+0LTRltC5XHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcbiAgICBjb25zdCB0bDEgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxyXG4gICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICBlbmQ6ICcrPTQwMCUnLFxyXG4gICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgIHNwaW5XaGVlbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB1cGRhdGVBbmltYXRpb25PblNjcm9sbChzZWxmLnByb2dyZXNzKSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTtcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTtcclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gNTAwO1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDtcclxuXHJcbi8vINCf0LXRgNC10LLRltGA0LrQsCwg0YfQuCDRhtC1INC80L7QsdGW0LvRjNC90LjQuSDQtdC60YDQsNC9XHJcbiAgICBjb25zdCBpc01vYmlsZSA9ICgpID0+IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LTQtdGB0LrRgtC+0L/RliAo0L3QsNC60L7Qv9C40YfRg9Cy0LDQu9GM0L3QvilcclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcCA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yID0gTWF0aC5hYnMoaSAtIGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGFjaXR5ID0gMC42IC0gZmFjdG9yICogKDAuNiAtIDAuMikgLyBzeW1wdG9tcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibHVyID0gZmFjdG9yICogKDQgLyBzeW1wdG9tcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5LnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LzQvtCx0ZbQu9GM0L3QuNGFICjQv9C+0YHRgtGD0L/QvtCy0L4pXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZSA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xyXG4gICAgICAgICAgICAgICAgLy8gc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSBgYmx1cig0cHgpYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnOyAvLyDQpNGW0LrRgdC+0LLQsNC90LjQuSDRgNC+0LfQvNGW0YAg0YjRgNC40YTRgtGDXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7IC8vINCo0LjRgNC40L3QsCDQtdC70LXQvNC10L3RgtGW0LIgKyBnYXAgKDhweClcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3Rg1xyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICAvLyDQm9C+0LPRltC60LAg0LfQsNC70LXQttC90L4g0LLRltC0INGA0L7Qt9C80ZbRgNGDINC10LrRgNCw0L3QsFxyXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlKGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdPy5kYXRhc2V0Lmljb247XHJcbiAgICAgICAgaWYgKGljb25TcmMpIHtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnQsNGU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIiwgXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCe0L3QvtCy0LvQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHByb2dyZXNzICogc2VjdGlvbkhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyDQntC90L7QstC70Y7RlNC80L4g0YHRgtCw0L0g0L3QsCDQvtGB0L3QvtCy0ZYg0ZbQvdC00LXQutGB0YNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0JvQvtCz0ZbQutCwINC00LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXICjQt9Cw0LvQuNGI0LDRlNC80L4g0L3QtdC30LzRltC90L3QvtGOKVxyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgLy8gaXNMYXN0QW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoY3VycmVudFN5bXB0b21JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgIH07XHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIGFuaW1hdGlvbiBmb3IgZWFjaCBjb21wb25lbnQuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGltZWxpbmUgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IFwiI2Fib3V0XCIsIC8vIFNlY3Rpb24gdG8gb2JzZXJ2ZSBmb3Igc2Nyb2xsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBjZW50ZXJcIixcclxuICAgICAgICAgICAgLy8gV2hlbiB0byBzdGFydCAoZS5nLiwgd2hlbiB0aGUgdG9wIG9mIHRoZSBzZWN0aW9uIHJlYWNoZXMgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQpXHJcbiAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgY2xhc3Mgd2hlbiB0aGUgdGltZWxpbmUgc3RhcnRzXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBtYXJrZXJzOiB0cnVlLCAgICAgICAgLy8gUmVtb3ZlIGluIHByb2R1Y3Rpb247IGhlbHBmdWwgZm9yIGRlYnVnZ2luZ1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRpbWVsaW5lXHJcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwLjIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsIC8vINCh0LrQvtGA0L7Rh9C10L3QviDRgtGA0LjQstCw0LvRltGB0YLRjFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcclxuICAgICAgICB9LCBcIis9MC41XCIpIC8vINCh0LrQvtGA0L7Rh9C10L3QviDQt9Cw0YLRgNC40LzQutGDXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSwgLy8g0KHQutC+0YDQvtGH0LXQvdC+INGC0YDQuNCy0LDQu9GW0YHRgtGMXHJcbiAgICAgICAgICAgIC8vIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLm91dFwiXHJcbiAgICAgICAgfSwgXCItPTFcIikgLy8g0JzRltC90ZbQvNCw0LvRjNC90LAg0LfQsNGC0YDQuNC80LrQsFxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9fbG9nb1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHhQZXJjZW50OiAtMTUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC42LCAvLyDQnNC10L3RiNCwINGC0YDQuNCy0LDQu9GW0YHRgtGMXHJcbiAgICAgICAgfSwgXCItPTAuMVwiKTsgLy8g0JzRltC90ZbQvNCw0LvRjNC90LAg0LfQsNGC0YDQuNC80LrQsFxyXG5cclxuXHJcbi8vIEFOSU0gU0VDVElPTiBTVElDS1lcclxuICAgIFNjcm9sbFRyaWdnZXIubWF0Y2hNZWRpYSh7XHJcbiAgICAgICAgXCIobWluLXdpZHRoOiA3NjhweClcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0bDIgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS1ncmlkX19pbWctYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIHRvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAnY2VudGVyIHRvcCcsIC8vINCm0LUg0LfQvdCw0YfQtdC90L3RjyDQvNC+0LbQtSDQsdGD0YLQuCDQvdC10LrQvtGA0LXQutGC0L3QuNC8LCDQtNC40LIuINC/0L7Rj9GB0L3QtdC90L3RjyDQvdC40LbRh9C1XHJcbiAgICAgICAgICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFudGljaXBhdGVQaW46IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy9IT1ZFUiBQQVJBTExBWFxyXG5pZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQstGB0ZYg0YHQtdC60YbRltGXLCDRj9C60ZYg0L/QvtCy0LjQvdC90ZYg0LzQsNGC0Lgg0LXRhNC10LrRgiDQv9Cw0YDQsNC70LDQutGB0YNcclxuICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lci1wYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlID0ge3g6IDAsIHk6IDAsIG1vdmVkOiBmYWxzZX07XHJcblxyXG4gICAgICAgICAgICAvLyDQktGW0LTRgdGC0LXQttC10L3QvdGPINGA0YPRhdGDINC80LjRiNGWINCyINC80LXQttCw0YUg0LrQvtC20L3QvtCz0L4g0LrQvtC90YLQtdC50L3QtdGA0LBcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgbW91c2UueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdTQVAgVGlja2VyINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0L/QsNGA0LDQu9Cw0LrRgdGDXHJcbiAgICAgICAgICAgIGdzYXAudGlja2VyLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW91c2UubW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW1nLXBhcmFsbGF4JyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmFjay13YXZlLXBhcmFsbGF4JyksIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINC/0LDRgNCw0LvQsNC60YHRgyDQtNC70Y8g0LrQvtC90LrRgNC10YLQvdC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJhbGxheEl0KHRhcmdldCwgbW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47IC8vINCf0LXRgNC10LLRltGA0LrQsCwg0YfQuCDQtdC70LXQvNC10L3RgiDRltGB0L3Rg9GUXHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHRhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogKG1vdXNlLnggLSByZWN0LndpZHRoIC8gMikgLyByZWN0LndpZHRoICogbW92ZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKG1vdXNlLnkgLSByZWN0LmhlaWdodCAvIDIpIC8gcmVjdC5oZWlnaHQgKiBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDQutC+0L7RgNC00LjQvdCw0YIg0LrQvtC90YLQtdC50L3QtdGA0LAg0L/RgNC4INC30LzRltC90ZYg0YDQvtC30LzRltGA0YMg0LDQsdC+INC/0YDQvtC60YDRg9GC0YbRllxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUmVjdCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlY3QoKSB7XHJcbiAgICAgICAgICAgICAgICByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuLy9BTklNIFRJVExFXHJcbiAgICBjb25zdCBzZWN0aW9uczIgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5zZWN0aW9uLWFuaW0nKTsgLy8g0JzQsNGB0LjQsiDRgdC10LrRhtGW0LlcclxuXHJcbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS10aXRsZSwgLmFuaW0tc3VidGl0bGUnLCBzZWN0aW9uKTsgLy8g0JfQsNCz0L7Qu9C+0LLQutC4INGWINC/0ZbQtNC30LDQs9C+0LvQvtCy0LrQuFxyXG5cclxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc1RpdGxlID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltLXRpdGxlJyk7IC8vINCf0LXRgNC10LLRltGA0LrQsCwg0YfQuCDRhtC1INC30LDQs9C+0LvQvtCy0L7QulxyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7IC8vINCX0LDRgtGA0LjQvNC60LAg0LTQu9GPINC30LDQs9C+0LvQvtCy0LrRltCyINGWINC/0ZbQtNC30LDQs9C+0LvQvtCy0LrRltCyXHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltID0gZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSwgLy8g0J/QvtGH0LDRgtC60L7QstGWINC/0LDRgNCw0LzQtdGC0YDQuCAo0LfQsNCz0LDQu9GM0L3QuNC5INC30YHRg9CyKVxyXG4gICAgICAgICAgICAgICAge2R1cmF0aW9uOiAxLCBvcGFjaXR5OiAxLCB5OiAwfSAvLyDQmtGW0L3RhtC10LLRliDQv9Cw0YDQsNC80LXRgtGA0LhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGVsLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbSxcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IGRlbGF5LCAvLyDQktGW0LTQvNGW0L3QvdGW0YHRgtGMINGDINC30LDRgtGA0LjQvNGG0ZZcclxuICAgICAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoc2VsZikgPT4gc2VsZi5kaXNhYmxlKCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBBTklNIEVMRU1FTlRTIFNFQ1RJT05cclxuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1jb250YWluZXInKTsgLy8g0JLRgdGWINGB0LXQutGG0ZbRlyDQvdCwINGB0YLQvtGA0ZbQvdGG0ZZcclxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0taXRlbScsIHNlY3Rpb24pOyAvLyDQldC70LXQvNC10L3RgtC4ICjQu9C40YjQtSDQsiDQvNC10LbQsNGFINGB0LXQutGG0ZbRlylcclxuXHJcbiAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgIGl0ZW1zLCAvLyDQnNCw0YHQuNCyINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSwgLy8g0J/QvtGH0LDRgtC60L7QstC40Lkg0YHRgtCw0L0gKNC/0YDQvtC30L7RgNGW0YHRgtGMINGWINC30YHRg9CyINCy0L3QuNC3KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsIC8vINCi0YDQuNCy0LDQu9GW0YHRgtGMINCw0L3RltC80LDRhtGW0Zcg0LrQvtC20L3QvtCz0L4g0LXQu9C10LzQtdC90YLRg1xyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogMC4xLCAvLyDQhtC90YLQtdGA0LLQsNC7INC80ZbQtiDQv9C+0Y/QstC+0Y4g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0LXQu9C10LzQtdC90YLRg1xyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5cIiwgLy8g0JXRhNC10LrRgiDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc2VjdGlvbiwgLy8g0KLRgNC40LPQtdGAIOKAlCDRgdCw0LzQsCDRgdC10LrRhtGW0Y9cclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCA3NSUnLCAvLyDQkNC90ZbQvNCw0YbRltGPINC/0L7Rh9C40L3QsNGU0YLRjNGB0Y8sINC60L7Qu9C4INGB0LXQutGG0ZbRjyDQsiA3NSUg0LLRltC60L3QsFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSBub25lJywgLy8g0JLRltC00YLQstC+0YDQtdC90L3RjyDQv9GA0Lgg0LLRhdC+0LTRliDRgtCwINGB0LrQsNGB0YPQstCw0L3QvdGPINC/0YDQuCDQstC40YXQvtC00ZZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbn0pXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
