
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
            end: '+=250%',
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
        const containers = document.querySelectorAll('.container-parallax');

        containers.forEach(container => {
            let rect = container.getBoundingClientRect();
            const mouse = {x: 0, y: 0, moved: false};

            container.addEventListener('mousemove', (e) => {
                mouse.moved = true;
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            gsap.ticker.add(() => {
                if (mouse.moved) {
                    parallaxIt(container.querySelector('.img-parallax'), 10);
                    parallaxIt(container.querySelector('.back-wave-parallax'), -20);
                }
                mouse.moved = false;
            });

            function parallaxIt(target, movement) {
                if (!target) return;
                gsap.to(target, {
                    duration: 0.5,
                    x: (mouse.x - rect.width / 2) / rect.width * movement,
                    y: (mouse.y - rect.height / 2) / rect.height * movement
                });
            }

            window.addEventListener('resize', updateRect);
            window.addEventListener('scroll', updateRect);

            function updateRect() {
                rect = container.getBoundingClientRect();
            }
        });
    }


//ANIM TITLE
    const sections2 = gsap.utils.toArray('.section-anim');

    sections2.forEach((section) => {
        const elements = gsap.utils.toArray('.anim-title, .anim-subtitle', section);

        elements.forEach((el) => {
            const isTitle = el.classList.contains('anim-title');
            const delay = isTitle ? 0.4 : 0.2;

            const anim = gsap.fromTo(
                el,
                {opacity: 0, y: -100},
                {duration: 1, opacity: 1, y: 0}
            );

            ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                animation: anim,
                stagger: delay,
                onLeaveBack: (self) => self.disable(),
            });
        });
    });

// ANIM ELEMENTS SECTION
    const sections = gsap.utils.toArray('.anim-container');
    sections.forEach((section) => {
        const items = gsap.utils.toArray('.anim-item', section);
        gsap.fromTo(
            items,
            {opacity: 0, y: 100},
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKlxyXG4qIHRvIGluY2x1ZGUganMgZmlsZSB3cml0ZTogYC8vPSBpbmNsdWRlIC4vcGF0aC10by1maWxlYFxyXG4qICovXHJcblxyXG4vLyBDVVNUT00gU0NSSVBUU1xyXG5nc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbi8vIE1PQklMRSBNRU5VXHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9LCAyNTApO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFtidG5DbG9zZSwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcblxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJykuZm9yRWFjaChhbmNob3IgPT4ge1xyXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyDQktC40LzQuNC60LDRlNC80L4g0YHRgtCw0L3QtNCw0YDRgtC90YMg0L/QvtCy0LXQtNGW0L3QutGDINCx0YDQsNGD0LfQtdGA0LBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnN1YnN0cmluZygxKTsgLy8g0J7RgtGA0LjQvNGD0ZTQvNC+IElEINGG0ZbQu9GM0L7QstC+0Zcg0YHQtdC60YbRltGXXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7IC8vINCo0YPQutCw0ZTQvNC+INC10LvQtdC80LXQvdGCINC/0L4gSURcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHdpbmRvdywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvOiB0YXJnZXRFbGVtZW50LCAvLyDQn9GA0L7QutGA0YPRh9GD0ZTQvNC+INC00L4g0LXQu9C10LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsIC8vINCi0YDQuNCy0LDQu9GW0YHRgtGMINCw0L3RltC80LDRhtGW0ZcgKNCyINGB0LXQutGD0L3QtNCw0YUpXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsLy8g0JXRhNC10LrRgiDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQn9C10YDQtdC30LDQv9GD0YHQutCw0ZTQvNC+INCy0YHRliBTY3JvbGxUcmlnZ2VyINC/0ZbRgdC70Y8g0L/RgNC+0LrRgNGD0YLQutC4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vQUNDT1JESU9OXHJcbiAgICBjb25zdCBhY2NvcmRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2l0ZW1cIik7XHJcbiAgICBhY2NvcmRpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4gICAgbGV0IHNsaWRlckFib3V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXIoKSB7XHJcbiAgICAgICAgaWYgKHNsaWRlckFib3V0KSBzbGlkZXJBYm91dC5kZXN0cm95KHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzbGlkZXJBYm91dC5yZWFsSW5kZXg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbmF2QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpO1xyXG5cclxuICAgICAgICBuYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlckFib3V0LnNsaWRlVG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuLy9CVE4tVVBcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyYWNrU2Nyb2xsKCkge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gY29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkIDwgY29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJhY2tUb1RvcCgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCAtODApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChiYWNrVG9Ub3AsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBnb1RvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXAnKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU2Nyb2xsKTtcclxuICAgICAgICBnb1RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tUb1RvcCk7XHJcbiAgICB9KSgpO1xyXG5cclxuLy8gUE9QVVBTXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpOyAvLyDQotGA0LXRgtGW0Lkg0J/QvtC/0LDQv1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cChwb3B1cEVsZW1lbnQpIHtcclxuICAgICAgICBwb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNsb3NlUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwKSk7XHJcbiAgICBjbG9zZVRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHRoaXJkUG9wdXApKTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgIGNsb3NlUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbi8vINCh0L/RltC70YzQvdCwINGE0YPQvdC60YbRltGPINC30LDQv9GD0YHQutGDINCx0LDRgNCw0LHQsNC90LBcclxuICAgIGZ1bmN0aW9uIHNwaW5XaGVlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRTZWN0b3JBbmdsZSA9IDMwMDtcclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWxEYXRhLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xyXG4gICAgICAgIHRleHRTdGFydC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJ0blNwaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRFbmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuLy8g0JTQvtC00LDRlNC80L4g0YHQu9GD0YXQsNGH0ZYg0L/QvtC00ZbQuVxyXG4gICAgd2hlZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzcGluV2hlZWwpO1xyXG4gICAgYnRuU3Bpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0lSTFxyXG4gICAgY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS10cmlnZ2VyJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgZW5kOiAnKz0yNTAlJyxcclxuICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGluV2hlZWw6IHRydWUsXHJcbiAgICAgICAgICAgIHBpblNwYWNpbmc6IHRydWUsXHJcbiAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSByZXZlcnNlJyxcclxuICAgICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4gdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwoc2VsZi5wcm9ncmVzcyksXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3ltcHRvbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hbmlmZXN0YXRpb24tbGlzdCB1bFwiKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbiAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICBjb25zdCBhbmltYXRpb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzdGlja3lUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja3ktdHJpZ2dlclwiKTtcclxuXHJcbiAgICBsZXQgY3VycmVudFN5bXB0b21JbmRleCA9IC0xO1xyXG4gICAgbGV0IGlzTGFzdEFuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSA1MDA7XHJcblxyXG4gICAgY29uc3Qgc2VjdGlvblRvcCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3ltcHRvbVN0ZXAgPSBzZWN0aW9uSGVpZ2h0IC8gc3ltcHRvbXMubGVuZ3RoO1xyXG5cclxuLy8g0J/QtdGA0LXQstGW0YDQutCwLCDRh9C4INGG0LUg0LzQvtCx0ZbQu9GM0L3QuNC5INC10LrRgNCw0L1cclxuICAgIGNvbnN0IGlzTW9iaWxlID0gKCkgPT4gd2luZG93LmlubmVyV2lkdGggPCA3Njg7XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQtNC10YHQutGC0L7Qv9GWICjQvdCw0LrQvtC/0LjRh9GD0LLQsNC70YzQvdC+KVxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBNYXRoLmFicyhpIC0gY3VycmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAwLjYgLSBmYWN0b3IgKiAoMC42IC0gMC4yKSAvIHN5bXB0b21zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsdXIgPSBmYWN0b3IgKiAoNCAvIHN5bXB0b21zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gYGJsdXIoJHtibHVyfXB4KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQvNC+0LHRltC70YzQvdC40YUgKNC/0L7RgdGC0YPQv9C+0LLQvilcclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcbiAgICAgICAgICAgICAgICAvLyBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKDRweClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7IC8vINCk0ZbQutGB0L7QstCw0L3QuNC5INGA0L7Qt9C80ZbRgCDRiNGA0LjRhNGC0YNcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODsgLy8g0KjQuNGA0LjQvdCwINC10LvQtdC80LXQvdGC0ZbQsiArIGdhcCAoOHB4KVxyXG4gICAgICAgIH1cclxuICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRofXB4KWA7XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQt9Cw0LvQtdC20L3QviDQstGW0LQg0YDQvtC30LzRltGA0YMg0LXQutGA0LDQvdCwXHJcbiAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUoaW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0/LmRhdGFzZXQuaWNvbjtcclxuICAgICAgICBpZiAoaWNvblNyYykge1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidCw0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8g0J7QvdC+0LLQu9C10L3QvdGPINCw0L3RltC80LDRhtGW0Zcg0L3QsCDQvtGB0L3QvtCy0ZYg0YHQutGA0L7Qu9GDXHJcbiAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9IChwcm9ncmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gcHJvZ3Jlc3MgKiBzZWN0aW9uSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCAqIHN5bXB0b21TdGVwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBzeW1wdG9tU3RlcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShpbmRleCk7IC8vINCe0L3QvtCy0LvRjtGU0LzQviDRgdGC0LDQvSDQvdCwINC+0YHQvdC+0LLRliDRltC90LTQtdC60YHRg1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQm9C+0LPRltC60LAg0LTQu9GPINC30LDQstC10YDRiNC10L3QvdGPINCw0L3RltC80LDRhtGW0ZcgKNC30LDQu9C40YjQsNGU0LzQviDQvdC10LfQvNGW0L3QvdC+0Y4pXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggPT09IHN5bXB0b21zLmxlbmd0aCAtIDEgJiYgIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAvLyBpc0xhc3RBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnRvcCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5zY3JvbGwgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG4gICAgY29uc3QgZ2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG4gICAgY29uc3QgZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IDIgKyBNYXRoLnJhbmRvbSgpO1xyXG4gICAgY29uc3QgZ2V0Um90YXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uIGZvciBlYWNoIGNvbXBvbmVudC5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGlsbC1hbmltX19jb21wb25lbnRcIikuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKHtyZXBlYXQ6IC0xLCB5b3lvOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIHRsLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIiwgLy8gU2VjdGlvbiB0byBvYnNlcnZlIGZvciBzY3JvbGxcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLFxyXG4gICAgICAgICAgICAvLyBXaGVuIHRvIHN0YXJ0IChlLmcuLCB3aGVuIHRoZSB0b3Agb2YgdGhlIHNlY3Rpb24gcmVhY2hlcyB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydClcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzcyB3aGVuIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuY2xhc3NMaXN0LmFkZChcInRpbWVsaW5lLXN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG1hcmtlcnM6IHRydWUsICAgICAgICAvLyBSZW1vdmUgaW4gcHJvZHVjdGlvbjsgaGVscGZ1bCBmb3IgZGVidWdnaW5nXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdGltZWxpbmVcclxuICAgICAgICAudG8oXCIucGlsbC1hbmltX19jb21wb25lbnRzXCIsIHtcclxuICAgICAgICAgICAgc2NhbGU6IDAuMixcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSwgLy8g0KHQutC+0YDQvtGH0LXQvdC+INGC0YDQuNCy0LDQu9GW0YHRgtGMXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxyXG4gICAgICAgIH0sIFwiKz0wLjVcIikgLy8g0KHQutC+0YDQvtGH0LXQvdC+INC30LDRgtGA0LjQvNC60YNcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2ltYWdlc1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LCAvLyDQodC60L7RgNC+0YfQtdC90L4g0YLRgNC40LLQsNC70ZbRgdGC0YxcclxuICAgICAgICAgICAgLy8gZWFzZTogXCJsaW5lYXJcIixcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEub3V0XCJcclxuICAgICAgICB9LCBcIi09MVwiKSAvLyDQnNGW0L3RltC80LDQu9GM0L3QsCDQt9Cw0YLRgNC40LzQutCwXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgeFBlcmNlbnQ6IC0xNTAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsIC8vINCc0LXQvdGI0LAg0YLRgNC40LLQsNC70ZbRgdGC0YxcclxuICAgICAgICB9LCBcIi09MC4xXCIpOyAvLyDQnNGW0L3RltC80LDQu9GM0L3QsCDQt9Cw0YLRgNC40LzQutCwXHJcblxyXG5cclxuLy8gQU5JTSBTRUNUSU9OIFNUSUNLWVxyXG4gICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKHtcclxuICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRsMiA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICdjZW50ZXIgdG9wJywgLy8g0KbQtSDQt9C90LDRh9C10L3QvdGPINC80L7QttC1INCx0YPRgtC4INC90LXQutC+0YDQtdC60YLQvdC40LwsINC00LjQsi4g0L/QvtGP0YHQvdC10L3QvdGPINC90LjQttGH0LVcclxuICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYW50aWNpcGF0ZVBpbjogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vL0hPVkVSIFBBUkFMTEFYXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyLXBhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbW91c2UgPSB7eDogMCwgeTogMCwgbW92ZWQ6IGZhbHNlfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbW91c2UueCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnc2FwLnRpY2tlci5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlLm1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmltZy1wYXJhbGxheCcpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhY2std2F2ZS1wYXJhbGxheCcpLCAtMjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJhbGxheEl0KHRhcmdldCwgbW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHRhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogKG1vdXNlLnggLSByZWN0LndpZHRoIC8gMikgLyByZWN0LndpZHRoICogbW92ZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKG1vdXNlLnkgLSByZWN0LmhlaWdodCAvIDIpIC8gcmVjdC5oZWlnaHQgKiBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVJlY3QpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4vL0FOSU0gVElUTEVcclxuICAgIGNvbnN0IHNlY3Rpb25zMiA9IGdzYXAudXRpbHMudG9BcnJheSgnLnNlY3Rpb24tYW5pbScpO1xyXG5cclxuICAgIHNlY3Rpb25zMi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLXRpdGxlLCAuYW5pbS1zdWJ0aXRsZScsIHNlY3Rpb24pO1xyXG5cclxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc1RpdGxlID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXNUaXRsZSA/IDAuNCA6IDAuMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW0gPSBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IC0xMDB9LFxyXG4gICAgICAgICAgICAgICAge2R1cmF0aW9uOiAxLCBvcGFjaXR5OiAxLCB5OiAwfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZWwsXHJcbiAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltLFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogZGVsYXksXHJcbiAgICAgICAgICAgICAgICBvbkxlYXZlQmFjazogKHNlbGYpID0+IHNlbGYuZGlzYWJsZSgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gQU5JTSBFTEVNRU5UUyBTRUNUSU9OXHJcbiAgICBjb25zdCBzZWN0aW9ucyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0tY29udGFpbmVyJyk7XHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWl0ZW0nLCBzZWN0aW9uKTtcclxuICAgICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAxMDB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiAwLjIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pblwiLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHNlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgNzUlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiAncGxheSBub25lIG5vbmUgbm9uZScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG59KVxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
