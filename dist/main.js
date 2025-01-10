/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {
    // console.log("GSAP:", gsap);
    // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    gsap.registerPlugin(ScrollToPlugin);


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
    const btnSpin = document.getElementById('spinButton');
    const textStart = document.querySelector('.text-start');
    const textEnd = document.querySelector('.text-end');
    const btnDiscount = document.querySelector('.btn_discount');

// Спільна функція запуску барабана
    function spinWheel() {
        const targetSectorAngle = 300;
        const randomSpins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = randomSpins * 360 + targetSectorAngle;

        wheel.style.transform = `rotate(${totalRotation}deg)`;
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
            end: 'bottom bottom',
            pin: true,
            markers: true,
            pinSpacing: false,
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
    const delayAfterLastAnimation = 1000;

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
            if (i === currentIndex) {

                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {

                symptom.style.opacity = '0.3';
                symptom.style.filter = `blur(4px)`;
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
        console.log(444, newImageIndex)
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
            console.log(2222)
            setTimeout(() => {
                stickyTrigger.style.position = "relative";
                stickyTrigger.style.top = "auto";
                stickyTrigger.style.scroll = "auto";
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
            markers: true,        // Remove in production; helpful for debugging
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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgLy8gZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUb1BsdWdpbik7XHJcblxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJykuZm9yRWFjaChhbmNob3IgPT4ge1xyXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQktC40LzQuNC60LDRlNC80L4g0YHRgtCw0L3QtNCw0YDRgtC90YMg0L/QvtCy0LXQtNGW0L3QutGDINCx0YDQsNGD0LfQtdGA0LBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnN1YnN0cmluZygxKTsgLy8g0J7RgtGA0LjQvNGD0ZTQvNC+IElEINGG0ZbQu9GM0L7QstC+0Zcg0YHQtdC60YbRltGXXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7IC8vINCo0YPQutCw0ZTQvNC+INC10LvQtdC80LXQvdGCINC/0L4gSURcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHdpbmRvdywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvOiB0YXJnZXRFbGVtZW50LCAvLyDQn9GA0L7QutGA0YPRh9GD0ZTQvNC+INC00L4g0LXQu9C10LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsIC8vINCi0YDQuNCy0LDQu9GW0YHRgtGMINCw0L3RltC80LDRhtGW0ZcgKNCyINGB0LXQutGD0L3QtNCw0YUpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsLy8g0JXRhNC10LrRgiDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQn9C10YDQtdC30LDQv9GD0YHQutCw0ZTQvNC+INCy0YHRliBTY3JvbGxUcmlnZ2VyINC/0ZbRgdC70Y8g0L/RgNC+0LrRgNGD0YLQutC4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vQUNDT1JESU9OXHJcbiAgICBjb25zdCBhY2NvcmRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2l0ZW1cIik7XHJcbiAgICBhY2NvcmRpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4gICAgbGV0IHNsaWRlckFib3V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXIoKSB7XHJcbiAgICAgICAgaWYgKHNsaWRlckFib3V0KSBzbGlkZXJBYm91dC5kZXN0cm95KHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzbGlkZXJBYm91dC5yZWFsSW5kZXg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbmF2QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpO1xyXG5cclxuICAgICAgICBuYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlckFib3V0LnNsaWRlVG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuLy9CVE4tVVBcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNrU2Nyb2xsKCkge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gY29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkIDwgY29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJhY2tUb1RvcCgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCAtODApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChiYWNrVG9Ub3AsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBnb1RvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXAnKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU2Nyb2xsKTtcclxuICAgICAgICBnb1RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tUb1RvcCk7XHJcbiAgICB9KSgpO1xyXG5cclxuLy8gUE9QVVBTXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpOyAvLyDQotGA0LXRgtGW0Lkg0J/QvtC/0LDQv1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cChwb3B1cEVsZW1lbnQpIHtcclxuICAgICAgICBwb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNsb3NlUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwKSk7XHJcbiAgICBjbG9zZVRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHRoaXJkUG9wdXApKTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgIGNsb3NlUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbi8vINCh0L/RltC70YzQvdCwINGE0YPQvdC60YbRltGPINC30LDQv9GD0YHQutGDINCx0LDRgNCw0LHQsNC90LBcclxuICAgIGZ1bmN0aW9uIHNwaW5XaGVlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRTZWN0b3JBbmdsZSA9IDMwMDtcclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RvdGFsUm90YXRpb259ZGVnKWA7XHJcbiAgICAgICAgdGV4dFN0YXJ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4vLyDQlNC+0LTQsNGU0LzQviDRgdC70YPRhdCw0YfRliDQv9C+0LTRltC5XHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcbiAgICBjb25zdCB0bDEgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxyXG4gICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICBlbmQ6ICdib3R0b20gYm90dG9tJyxcclxuICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICBtYXJrZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB1cGRhdGVBbmltYXRpb25PblNjcm9sbChzZWxmLnByb2dyZXNzKSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTtcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTtcclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gMTAwMDtcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7XHJcblxyXG4vLyDQn9C10YDQtdCy0ZbRgNC60LAsINGH0Lgg0YbQtSDQvNC+0LHRltC70YzQvdC40Lkg0LXQutGA0LDQvVxyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC00LXRgdC60YLQvtC/0ZYgKNC90LDQutC+0L/QuNGH0YPQstCw0LvRjNC90L4pXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGguYWJzKGkgLSBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDAuNiAtIGZhY3RvciAqICgwLjYgLSAwLjIpIC8gc3ltcHRvbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmx1ciA9IGZhY3RvciAqICg0IC8gc3ltcHRvbXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC80L7QsdGW0LvRjNC90LjRhSAo0L/QvtGB0YLRg9C/0L7QstC+KVxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gY3VycmVudEluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKDRweClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7IC8vINCk0ZbQutGB0L7QstCw0L3QuNC5INGA0L7Qt9C80ZbRgCDRiNGA0LjRhNGC0YNcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODsgLy8g0KjQuNGA0LjQvdCwINC10LvQtdC80LXQvdGC0ZbQsiArIGdhcCAoOHB4KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRofXB4KWA7XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQt9Cw0LvQtdC20L3QviDQstGW0LQg0YDQvtC30LzRltGA0YMg0LXQutGA0LDQvdCwXHJcbiAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUoaW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0/LmRhdGFzZXQuaWNvbjtcclxuICAgICAgICBpZiAoaWNvblNyYykge1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidCw0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coNDQ0LCBuZXdJbWFnZUluZGV4KVxyXG4gICAgfTtcclxuXHJcbi8vINCe0L3QvtCy0LvQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHByb2dyZXNzICogc2VjdGlvbkhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyDQntC90L7QstC70Y7RlNC80L4g0YHRgtCw0L0g0L3QsCDQvtGB0L3QvtCy0ZYg0ZbQvdC00LXQutGB0YNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0JvQvtCz0ZbQutCwINC00LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXICjQt9Cw0LvQuNGI0LDRlNC80L4g0L3QtdC30LzRltC90L3QvtGOKVxyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgLy8gaXNMYXN0QW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coMjIyMilcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG4gICAgY29uc3QgZ2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG4gICAgY29uc3QgZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IDIgKyBNYXRoLnJhbmRvbSgpO1xyXG4gICAgY29uc3QgZ2V0Um90YXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uIGZvciBlYWNoIGNvbXBvbmVudC5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGlsbC1hbmltX19jb21wb25lbnRcIikuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKHtyZXBlYXQ6IC0xLCB5b3lvOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIHRsLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIiwgLy8gU2VjdGlvbiB0byBvYnNlcnZlIGZvciBzY3JvbGxcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLFxyXG4gICAgICAgICAgICAvLyBXaGVuIHRvIHN0YXJ0IChlLmcuLCB3aGVuIHRoZSB0b3Agb2YgdGhlIHNlY3Rpb24gcmVhY2hlcyB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydClcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzcyB3aGVuIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuY2xhc3NMaXN0LmFkZChcInRpbWVsaW5lLXN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcmtlcnM6IHRydWUsICAgICAgICAvLyBSZW1vdmUgaW4gcHJvZHVjdGlvbjsgaGVscGZ1bCBmb3IgZGVidWdnaW5nXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdGltZWxpbmVcclxuICAgICAgICAudG8oXCIucGlsbC1hbmltX19jb21wb25lbnRzXCIsIHtcclxuICAgICAgICAgICAgc2NhbGU6IDAuMixcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSwgLy8g0KHQutC+0YDQvtGH0LXQvdC+INGC0YDQuNCy0LDQu9GW0YHRgtGMXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxyXG4gICAgICAgIH0sIFwiKz0wLjVcIikgLy8g0KHQutC+0YDQvtGH0LXQvdC+INC30LDRgtGA0LjQvNC60YNcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2ltYWdlc1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LCAvLyDQodC60L7RgNC+0YfQtdC90L4g0YLRgNC40LLQsNC70ZbRgdGC0YxcclxuICAgICAgICAgICAgLy8gZWFzZTogXCJsaW5lYXJcIixcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEub3V0XCJcclxuICAgICAgICB9LCBcIi09MVwiKSAvLyDQnNGW0L3RltC80LDQu9GM0L3QsCDQt9Cw0YLRgNC40LzQutCwXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgeFBlcmNlbnQ6IC0xNTAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsIC8vINCc0LXQvdGI0LAg0YLRgNC40LLQsNC70ZbRgdGC0YxcclxuICAgICAgICB9LCBcIi09MC4xXCIpOyAvLyDQnNGW0L3RltC80LDQu9GM0L3QsCDQt9Cw0YLRgNC40LzQutCwXHJcblxyXG5cclxuLy8gQU5JTSBTRUNUSU9OIFNUSUNLWVxyXG4gICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKHtcclxuICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRsMiA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICdjZW50ZXIgdG9wJywgLy8g0KbQtSDQt9C90LDRh9C10L3QvdGPINC80L7QttC1INCx0YPRgtC4INC90LXQutC+0YDQtdC60YLQvdC40LwsINC00LjQsi4g0L/QvtGP0YHQvdC10L3QvdGPINC90LjQttGH0LVcclxuICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYW50aWNpcGF0ZVBpbjogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vL0hPVkVSIFBBUkFMTEFYXHJcbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgdC10LrRhtGW0ZcsINGP0LrRliDQv9C+0LLQuNC90L3RliDQvNCw0YLQuCDQtdGE0LXQutGCINC/0LDRgNCw0LvQsNC60YHRg1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyLXBhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbW91c2UgPSB7eDogMCwgeTogMCwgbW92ZWQ6IGZhbHNlfTtcclxuXHJcbiAgICAgICAgICAgIC8vINCS0ZbQtNGB0YLQtdC20LXQvdC90Y8g0YDRg9GF0YMg0LzQuNGI0ZYg0LIg0LzQtdC20LDRhSDQutC+0LbQvdC+0LPQviDQutC+0L3RgtC10LnQvdC10YDQsFxyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gR1NBUCBUaWNrZXIg0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDQv9Cw0YDQsNC70LDQutGB0YNcclxuICAgICAgICAgICAgZ3NhcC50aWNrZXIuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb3VzZS5tb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctcGFyYWxsYXgnKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLXdhdmUtcGFyYWxsYXgnKSwgLTIwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0L/QsNGA0LDQu9Cw0LrRgdGDINC00LvRjyDQutC+0L3QutGA0LXRgtC90L7Qs9C+INC60L7QvdGC0LXQudC90LXRgNCwXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhcmFsbGF4SXQodGFyZ2V0LCBtb3ZlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjsgLy8g0J/QtdGA0LXQstGW0YDQutCwLCDRh9C4INC10LvQtdC80LXQvdGCINGW0YHQvdGD0ZRcclxuICAgICAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB4OiAobW91c2UueCAtIHJlY3Qud2lkdGggLyAyKSAvIHJlY3Qud2lkdGggKiBtb3ZlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAobW91c2UueSAtIHJlY3QuaGVpZ2h0IC8gMikgLyByZWN0LmhlaWdodCAqIG1vdmVtZW50XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINC60L7QvtGA0LTQuNC90LDRgiDQutC+0L3RgtC10LnQvdC10YDQsCDQv9GA0Lgg0LfQvNGW0L3RliDRgNC+0LfQvNGW0YDRgyDQsNCx0L4g0L/RgNC+0LrRgNGD0YLRhtGWXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVJlY3QpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4vL0FOSU0gVElUTEVcclxuICAgIGNvbnN0IHNlY3Rpb25zMiA9IGdzYXAudXRpbHMudG9BcnJheSgnLnNlY3Rpb24tYW5pbScpOyAvLyDQnNCw0YHQuNCyINGB0LXQutGG0ZbQuVxyXG5cclxuICAgIHNlY3Rpb25zMi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLXRpdGxlLCAuYW5pbS1zdWJ0aXRsZScsIHNlY3Rpb24pOyAvLyDQl9Cw0LPQvtC70L7QstC60Lgg0ZYg0L/RltC00LfQsNCz0L7Qu9C+0LLQutC4XHJcblxyXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVGl0bGUgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW0tdGl0bGUnKTsgLy8g0J/QtdGA0LXQstGW0YDQutCwLCDRh9C4INGG0LUg0LfQsNCz0L7Qu9C+0LLQvtC6XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXNUaXRsZSA/IDAuNCA6IDAuMjsgLy8g0JfQsNGC0YDQuNC80LrQsCDQtNC70Y8g0LfQsNCz0L7Qu9C+0LLQutGW0LIg0ZYg0L/RltC00LfQsNCz0L7Qu9C+0LLQutGW0LJcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW0gPSBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IC0xMDB9LCAvLyDQn9C+0YfQsNGC0LrQvtCy0ZYg0L/QsNGA0LDQvNC10YLRgNC4ICjQt9Cw0LPQsNC70YzQvdC40Lkg0LfRgdGD0LIpXHJcbiAgICAgICAgICAgICAgICB7ZHVyYXRpb246IDEsIG9wYWNpdHk6IDEsIHk6IDB9IC8vINCa0ZbQvdGG0LXQstGWINC/0LDRgNCw0LzQtdGC0YDQuFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZWwsXHJcbiAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltLFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogZGVsYXksIC8vINCS0ZbQtNC80ZbQvdC90ZbRgdGC0Ywg0YMg0LfQsNGC0YDQuNC80YbRllxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZUJhY2s6IChzZWxmKSA9PiBzZWxmLmRpc2FibGUoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIEFOSU0gRUxFTUVOVFMgU0VDVElPTlxyXG4gICAgY29uc3Qgc2VjdGlvbnMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWNvbnRhaW5lcicpOyAvLyDQktGB0ZYg0YHQtdC60YbRltGXINC90LAg0YHRgtC+0YDRltC90YbRllxyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7IC8vINCV0LvQtdC80LXQvdGC0LggKNC70LjRiNC1INCyINC80LXQttCw0YUg0YHQtdC60YbRltGXKVxyXG5cclxuICAgICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgaXRlbXMsIC8vINCc0LDRgdC40LIg0LXQu9C10LzQtdC90YLRltCyXHJcbiAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAxMDB9LCAvLyDQn9C+0YfQsNGC0LrQvtCy0LjQuSDRgdGC0LDQvSAo0L/RgNC+0LfQvtGA0ZbRgdGC0Ywg0ZYg0LfRgdGD0LIg0LLQvdC40LcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNiwgLy8g0KLRgNC40LLQsNC70ZbRgdGC0Ywg0LDQvdGW0LzQsNGG0ZbRlyDQutC+0LbQvdC+0LPQviDQtdC70LXQvNC10L3RgtGDXHJcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiAwLjEsIC8vINCG0L3RgtC10YDQstCw0Lsg0LzRltC2INC/0L7Rj9Cy0L7RjiDQvdCw0YHRgtGD0L/QvdC+0LPQviDQtdC70LXQvNC10L3RgtGDXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pblwiLCAvLyDQldGE0LXQutGCINCw0L3RltC80LDRhtGW0ZdcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLCAvLyDQotGA0LjQs9C10YAg4oCUINGB0LDQvNCwINGB0LXQutGG0ZbRj1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIDc1JScsIC8vINCQ0L3RltC80LDRhtGW0Y8g0L/QvtGH0LjQvdCw0ZTRgtGM0YHRjywg0LrQvtC70Lgg0YHQtdC60YbRltGPINCyIDc1JSDQstGW0LrQvdCwXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIG5vbmUnLCAvLyDQktGW0LTRgtCy0L7RgNC10L3QvdGPINC/0YDQuCDQstGF0L7QtNGWINGC0LAg0YHQutCw0YHRg9Cy0LDQvdC90Y8g0L/RgNC4INCy0LjRhdC+0LTRllxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxufSlcclxuXHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
