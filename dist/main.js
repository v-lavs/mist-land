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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4qIHRvIGluY2x1ZGUganMgZmlsZSB3cml0ZTogYC8vPSBpbmNsdWRlIC4vcGF0aC10by1maWxlYFxuKiAqL1xuXG4vLyBDVVNUT00gU0NSSVBUU1xuZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4vLyBNT0JJTEUgTUVOVVxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcbiAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UnKTtcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH0sIDI1MCk7XG5cbiAgICB9KTtcblxuICAgIFtidG5DbG9zZSwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcbiAgICAgICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJykuZm9yRWFjaChhbmNob3IgPT4ge1xuICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vINCS0LjQvNC40LrQsNGU0LzQviDRgdGC0LDQvdC00LDRgNGC0L3RgyDQv9C+0LLQtdC00ZbQvdC60YMg0LHRgNCw0YPQt9C10YDQsFxuXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5zdWJzdHJpbmcoMSk7IC8vINCe0YLRgNC40LzRg9GU0LzQviBJRCDRhtGW0LvRjNC+0LLQvtGXINGB0LXQutGG0ZbRl1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTsgLy8g0KjRg9C60LDRlNC80L4g0LXQu9C10LzQtdC90YIg0L/QviBJRFxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGdzYXAudG8od2luZG93LCB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvOiB0YXJnZXRFbGVtZW50LCAvLyDQn9GA0L7QutGA0YPRh9GD0ZTQvNC+INC00L4g0LXQu9C10LzQtdC90YLQsFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMS41LCAvLyDQotGA0LjQstCw0LvRltGB0YLRjCDQsNC90ZbQvNCw0YbRltGXICjQsiDRgdC10LrRg9C90LTQsNGFKVxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIiwvLyDQldGE0LXQutGCINCw0L3RltC80LDRhtGW0ZdcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0J/QtdGA0LXQt9Cw0L/Rg9GB0LrQsNGU0LzQviDQstGB0ZYgU2Nyb2xsVHJpZ2dlciDQv9GW0YHQu9GPINC/0YDQvtC60YDRg9GC0LrQuFxuICAgICAgICAgICAgICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbi8vQUNDT1JESU9OXG4gICAgY29uc3QgYWNjb3JkaW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNjb3JkaW9uX19pdGVtXCIpO1xuICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4vLyBTTElERVIgLSBUQUJTXG4gICAgbGV0IHNsaWRlckFib3V0O1xuXG4gICAgZnVuY3Rpb24gaW5pdFN3aXBlcigpIHtcbiAgICAgICAgaWYgKHNsaWRlckFib3V0KSBzbGlkZXJBYm91dC5kZXN0cm95KHRydWUsIHRydWUpO1xuXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnZmFkZScsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gc2xpZGVyQWJvdXQucmVhbEluZGV4O1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpIHtcbiAgICAgICAgY29uc3QgbmF2QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpO1xuXG4gICAgICAgIG5hdkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2xpZGVyQWJvdXQuc2xpZGVUbyhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0U3dpcGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcik7XG5cbi8vQlROLVVQXG4gICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBiYWNrVG9Ub3AoKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCAtODApO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYmFja1RvVG9wLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcbiAgICB9KSgpO1xuXG4vLyBQT1BVUFNcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7IC8vINCf0LXRgNGI0LjQuS/QlNGA0YPQs9C40Lkg0J/QvtC/0LDQv1xuICAgIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbEhlYWRlcicpO1xuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xuXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xuICAgICAgICBwb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAocG9wdXBFbGVtZW50KSB7XG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAuc2hvdycpKSB7XG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuYXBwZW5kQ2hpbGQodGVtcGxhdGVDb250ZW50KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY2xvc2VQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXApKTtcbiAgICBjbG9zZVRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHRoaXJkUG9wdXApKTtcblxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xuICAgICAgICBjbG9zZVBvcHVwKHRoaXJkUG9wdXApO1xuICAgIH0pO1xuXG4vLyBTUElOIFJPVUxFVFRFXG4gICAgY29uc3Qgd2hlZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWwnKTtcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG4gICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XG4gICAgY29uc3QgYnRuRGlzY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50Jyk7XG5cbi8vINCh0L/RltC70YzQvdCwINGE0YPQvdC60YbRltGPINC30LDQv9GD0YHQutGDINCx0LDRgNCw0LHQsNC90LBcbiAgICBmdW5jdGlvbiBzcGluV2hlZWwoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldFNlY3RvckFuZ2xlID0gMzAwO1xuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XG5cbiAgICAgICAgd2hlZWxEYXRhLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9XG5cbi8vINCU0L7QtNCw0ZTQvNC+INGB0LvRg9GF0LDRh9GWINC/0L7QtNGW0LlcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XG4gICAgYnRuU3Bpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XG5cbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXG4gICAgY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxuICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcbiAgICAgICAgICAgIGVuZDogJys9NDAwJScsXG4gICAgICAgICAgICBwaW46IHRydWUsXG4gICAgICAgICAgICBzcGluV2hlZWw6IHRydWUsXG4gICAgICAgICAgICBwaW5TcGFjaW5nOiB0cnVlLFxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxuICAgICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4gdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwoc2VsZi5wcm9ncmVzcyksXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYW5pZmVzdGF0aW9uXCIpO1xuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcbiAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpO1xuXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTtcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7XG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSA1MDA7XG5cbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XG4gICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDtcblxuLy8g0J/QtdGA0LXQstGW0YDQutCwLCDRh9C4INGG0LUg0LzQvtCx0ZbQu9GM0L3QuNC5INC10LrRgNCw0L1cbiAgICBjb25zdCBpc01vYmlsZSA9ICgpID0+IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xuXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQtNC10YHQutGC0L7Qv9GWICjQvdCw0LrQvtC/0LjRh9GD0LLQsNC70YzQvdC+KVxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcCA9IChjdXJyZW50SW5kZXgpID0+IHtcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGguYWJzKGkgLSBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAwLjYgLSBmYWN0b3IgKiAoMC42IC0gMC4yKSAvIHN5bXB0b21zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBibHVyID0gZmFjdG9yICogKDQgLyBzeW1wdG9tcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5LnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LzQvtCx0ZbQu9GM0L3QuNGFICjQv9C+0YHRgtGD0L/QvtCy0L4pXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUgPSAoY3VycmVudEluZGV4KSA9PiB7XG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xuXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgICAgICAgICAgICAgIC8vIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gYGJsdXIoNHB4KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnOyAvLyDQpNGW0LrRgdC+0LLQsNC90LjQuSDRgNC+0LfQvNGW0YAg0YjRgNC40YTRgtGDXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHNoaWZ0V2lkdGggKz0gc3ltcHRvbXNbaV0ub2Zmc2V0V2lkdGggKyA4OyAvLyDQqNC40YDQuNC90LAg0LXQu9C10LzQtdC90YLRltCyICsgZ2FwICg4cHgpXG4gICAgICAgIH1cbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xuICAgIH07XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3Rg1xuICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQt9Cw0LvQtdC20L3QviDQstGW0LQg0YDQvtC30LzRltGA0YMg0LXQutGA0LDQvdCwXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZShpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AoaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0/LmRhdGFzZXQuaWNvbjtcbiAgICAgICAgaWYgKGljb25TcmMpIHtcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH07XG5cbi8vINCe0L3QvtCy0LvQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKHByb2dyZXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gcHJvZ3Jlc3MgKiBzZWN0aW9uSGVpZ2h0O1xuXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyDQntC90L7QstC70Y7RlNC80L4g0YHRgtCw0L0g0L3QsCDQvtGB0L3QvtCy0ZYg0ZbQvdC00LXQutGB0YNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JvQvtCz0ZbQutCwINC00LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXICjQt9Cw0LvQuNGI0LDRlNC80L4g0L3QtdC30LzRltC90L3QvtGOKVxuICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAvLyBpc0xhc3RBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnRvcCA9IFwiYXV0b1wiO1xuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7XG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcbiAgICAgICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxuICAgIH07XG5cblxuLy8gICAgQU5JTUFUSU9OIFBJTExcbiAgICBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XG4gICAgY29uc3QgZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IDIgKyBNYXRoLnJhbmRvbSgpO1xuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uIGZvciBlYWNoIGNvbXBvbmVudC5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoe3JlcGVhdDogLTEsIHlveW86IHRydWV9KTtcblxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcbiAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXG4gICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXG4gICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxuICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICB0cmlnZ2VyOiBcIiNhYm91dFwiLCAvLyBTZWN0aW9uIHRvIG9ic2VydmUgZm9yIHNjcm9sbFxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLFxuICAgICAgICAgICAgLy8gV2hlbiB0byBzdGFydCAoZS5nLiwgd2hlbiB0aGUgdG9wIG9mIHRoZSBzZWN0aW9uIHJlYWNoZXMgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQpXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzcyB3aGVuIHRoZSB0aW1lbGluZSBzdGFydHNcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1hcmtlcnM6IHRydWUsICAgICAgICAvLyBSZW1vdmUgaW4gcHJvZHVjdGlvbjsgaGVscGZ1bCBmb3IgZGVidWdnaW5nXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgdGltZWxpbmVcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XG4gICAgICAgICAgICBzY2FsZTogMC4yLFxuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LCAvLyDQodC60L7RgNC+0YfQtdC90L4g0YLRgNC40LLQsNC70ZbRgdGC0YxcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICB9LCBcIis9MC41XCIpIC8vINCh0LrQvtGA0L7Rh9C10L3QviDQt9Cw0YLRgNC40LzQutGDXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9faW1hZ2VzXCIsIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBzY2FsZTogMCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsIC8vINCh0LrQvtGA0L7Rh9C10L3QviDRgtGA0LjQstCw0LvRltGB0YLRjFxuICAgICAgICAgICAgLy8gZWFzZTogXCJsaW5lYXJcIixcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLm91dFwiXG4gICAgICAgIH0sIFwiLT0xXCIpIC8vINCc0ZbQvdGW0LzQsNC70YzQvdCwINC30LDRgtGA0LjQvNC60LBcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB4UGVyY2VudDogLTE1MCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsIC8vINCc0LXQvdGI0LAg0YLRgNC40LLQsNC70ZbRgdGC0YxcbiAgICAgICAgfSwgXCItPTAuMVwiKTsgLy8g0JzRltC90ZbQvNCw0LvRjNC90LAg0LfQsNGC0YDQuNC80LrQsFxuXG5cbi8vIEFOSU0gU0VDVElPTiBTVElDS1lcbiAgICBTY3JvbGxUcmlnZ2VyLm1hdGNoTWVkaWEoe1xuICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB0bDIgPSBnc2FwLnRpbWVsaW5lKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIHRvcCcsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogJ2NlbnRlciB0b3AnLCAvLyDQptC1INC30L3QsNGH0LXQvdC90Y8g0LzQvtC20LUg0LHRg9GC0Lgg0L3QtdC60L7RgNC10LrRgtC90LjQvCwg0LTQuNCyLiDQv9C+0Y/RgdC90LXQvdC90Y8g0L3QuNC20YfQtVxuICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbnRpY2lwYXRlUGluOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcbiAgICB9KTtcblxuXG4vL0hPVkVSIFBBUkFMTEFYXG5pZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINGB0LXQutGG0ZbRlywg0Y/QutGWINC/0L7QstC40L3QvdGWINC80LDRgtC4INC10YTQtdC60YIg0L/QsNGA0LDQu9Cw0LrRgdGDXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyLXBhcmFsbGF4Jyk7XG5cbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlID0ge3g6IDAsIHk6IDAsIG1vdmVkOiBmYWxzZX07XG5cbiAgICAgICAgICAgIC8vINCS0ZbQtNGB0YLQtdC20LXQvdC90Y8g0YDRg9GF0YMg0LzQuNGI0ZYg0LIg0LzQtdC20LDRhSDQutC+0LbQvdC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxuICAgICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgbW91c2UueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEdTQVAgVGlja2VyINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0L/QsNGA0LDQu9Cw0LrRgdGDXG4gICAgICAgICAgICBnc2FwLnRpY2tlci5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb3VzZS5tb3ZlZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW1nLXBhcmFsbGF4JyksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhY2std2F2ZS1wYXJhbGxheCcpLCAtMjApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINC/0LDRgNCw0LvQsNC60YHRgyDQtNC70Y8g0LrQvtC90LrRgNC10YLQvdC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxuICAgICAgICAgICAgZnVuY3Rpb24gcGFyYWxsYXhJdCh0YXJnZXQsIG1vdmVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjsgLy8g0J/QtdGA0LXQstGW0YDQutCwLCDRh9C4INC10LvQtdC80LXQvdGCINGW0YHQvdGD0ZRcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHRhcmdldCwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC41LFxuICAgICAgICAgICAgICAgICAgICB4OiAobW91c2UueCAtIHJlY3Qud2lkdGggLyAyKSAvIHJlY3Qud2lkdGggKiBtb3ZlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgeTogKG1vdXNlLnkgLSByZWN0LmhlaWdodCAvIDIpIC8gcmVjdC5oZWlnaHQgKiBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0LrQvtC+0YDQtNC40L3QsNGCINC60L7QvdGC0LXQudC90LXRgNCwINC/0YDQuCDQt9C80ZbQvdGWINGA0L7Qt9C80ZbRgNGDINCw0LHQviDQv9GA0L7QutGA0YPRgtGG0ZZcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVSZWN0KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcbiAgICAgICAgICAgICAgICByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuLy9BTklNIFRJVExFXG4gICAgY29uc3Qgc2VjdGlvbnMyID0gZ3NhcC51dGlscy50b0FycmF5KCcuc2VjdGlvbi1hbmltJyk7IC8vINCc0LDRgdC40LIg0YHQtdC60YbRltC5XG5cbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0tdGl0bGUsIC5hbmltLXN1YnRpdGxlJywgc2VjdGlvbik7IC8vINCX0LDQs9C+0LvQvtCy0LrQuCDRliDQv9GW0LTQt9Cw0LPQvtC70L7QstC60LhcblxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpOyAvLyDQn9C10YDQtdCy0ZbRgNC60LAsINGH0Lgg0YbQtSDQt9Cw0LPQvtC70L7QstC+0LpcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXNUaXRsZSA/IDAuNCA6IDAuMjsgLy8g0JfQsNGC0YDQuNC80LrQsCDQtNC70Y8g0LfQsNCz0L7Qu9C+0LLQutGW0LIg0ZYg0L/RltC00LfQsNCz0L7Qu9C+0LLQutGW0LJcblxuICAgICAgICAgICAgY29uc3QgYW5pbSA9IGdzYXAuZnJvbVRvKFxuICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSwgLy8g0J/QvtGH0LDRgtC60L7QstGWINC/0LDRgNCw0LzQtdGC0YDQuCAo0LfQsNCz0LDQu9GM0L3QuNC5INC30YHRg9CyKVxuICAgICAgICAgICAgICAgIHtkdXJhdGlvbjogMSwgb3BhY2l0eTogMSwgeTogMH0gLy8g0JrRltC90YbQtdCy0ZYg0L/QsNGA0LDQvNC10YLRgNC4XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZWwsXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IGFuaW0sXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogZGVsYXksIC8vINCS0ZbQtNC80ZbQvdC90ZbRgdGC0Ywg0YMg0LfQsNGC0YDQuNC80YbRllxuICAgICAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoc2VsZikgPT4gc2VsZi5kaXNhYmxlKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbi8vIEFOSU0gRUxFTUVOVFMgU0VDVElPTlxuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1jb250YWluZXInKTsgLy8g0JLRgdGWINGB0LXQutGG0ZbRlyDQvdCwINGB0YLQvtGA0ZbQvdGG0ZZcbiAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7IC8vINCV0LvQtdC80LXQvdGC0LggKNC70LjRiNC1INCyINC80LXQttCw0YUg0YHQtdC60YbRltGXKVxuXG4gICAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICAgICAgaXRlbXMsIC8vINCc0LDRgdC40LIg0LXQu9C10LzQtdC90YLRltCyXG4gICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSwgLy8g0J/QvtGH0LDRgtC60L7QstC40Lkg0YHRgtCw0L0gKNC/0YDQvtC30L7RgNGW0YHRgtGMINGWINC30YHRg9CyINCy0L3QuNC3KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LCAvLyDQotGA0LjQstCw0LvRltGB0YLRjCDQsNC90ZbQvNCw0YbRltGXINC60L7QttC90L7Qs9C+INC10LvQtdC80LXQvdGC0YNcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiAwLjEsIC8vINCG0L3RgtC10YDQstCw0Lsg0LzRltC2INC/0L7Rj9Cy0L7RjiDQvdCw0YHRgtGD0L/QvdC+0LPQviDQtdC70LXQvNC10L3RgtGDXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5cIiwgLy8g0JXRhNC10LrRgiDQsNC90ZbQvNCw0YbRltGXXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLCAvLyDQotGA0LjQs9C10YAg4oCUINGB0LDQvNCwINGB0LXQutGG0ZbRj1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCA3NSUnLCAvLyDQkNC90ZbQvNCw0YbRltGPINC/0L7Rh9C40L3QsNGU0YLRjNGB0Y8sINC60L7Qu9C4INGB0LXQutGG0ZbRjyDQsiA3NSUg0LLRltC60L3QsFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiAncGxheSBub25lIG5vbmUgbm9uZScsIC8vINCS0ZbQtNGC0LLQvtGA0LXQvdC90Y8g0L/RgNC4INCy0YXQvtC00ZYg0YLQsCDRgdC60LDRgdGD0LLQsNC90L3RjyDQv9GA0Lgg0LLQuNGF0L7QtNGWXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9KTtcbn0pXG5cblxuIl0sImZpbGUiOiJtYWluLmpzIn0=
