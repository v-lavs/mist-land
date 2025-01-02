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
    function smoothScrollToAnchor(selector) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', function (event) {
                const anchor = this.getAttribute('href');

                if (anchor.startsWith('#') && anchor !== '#') {
                    event.preventDefault();

                    const targetElement = document.querySelector(anchor);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    smoothScrollToAnchor('.menu__item a');

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
    const btnSpin = document.getElementById('spinButton');
    btnSpin.addEventListener('click', () => {
        const wheel = document.getElementById('wheel');
        const textStart = document.querySelector('.text-start');
        const textEnd = document.querySelector('.text-end');
        const btnDiscount = document.querySelector('.btn_discount')

        const targetSectorAngle = 0;

        const randomSpins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = randomSpins * 360 + targetSectorAngle;

        wheel.style.transform = `rotate(${totalRotation}deg)`;
        textStart.style.display = 'none';
        btnSpin.style.display = 'none';

        setTimeout(() => {
            textEnd.style.display = 'block';
            btnDiscount.style.display = 'inline-flex';
        }, 3000);
    });

//MOVING ELEMENT

        // const sections = document.querySelectorAll('.move-el');
        //
        // sections.forEach((section, index) => {
        //     const block = section.querySelector('.moving-element');
        //     if (!block) {
        //         console.warn(`У секції #${index + 1} блок .moving-element не знайдено`);
        //         return;
        //     }
        //
        //     console.log(`Секція #${index + 1} знайдена, запускаємо анімацію для блоку`);
        //
        //     const sectionWidth = section.offsetWidth;
        //     const sectionHeight = section.offsetHeight;
        //     const blockWidth = block.offsetWidth;
        //     const blockHeight = block.offsetHeight;
        //
        //     let currentX = Math.random() * (sectionWidth - blockWidth);
        //     let currentY = Math.random() * (sectionHeight - blockHeight);
        //     let targetX = Math.random() * (sectionWidth - blockWidth);
        //     let targetY = Math.random() * (sectionHeight - blockHeight);
        //     const speed = 0.5; // Швидкість руху
        //
        //     function animate() {
        //         // Плавне наближення до цільових координат
        //         currentX += (targetX - currentX) * speed;
        //         currentY += (targetY - currentY) * speed;
        //
        //         block.style.transform = `translate(${currentX}px, ${currentY}px)`;
        //
        //         // Якщо елемент майже досягнув цілі, змінюємо ціль
        //         if (Math.abs(targetX - currentX) < 5 && Math.abs(targetY - currentY) < 5) {
        //             targetX = Math.random() * (sectionWidth - blockWidth);
        //             targetY = Math.random() * (sectionHeight - blockHeight);
        //         }
        //
        //         // Рекурсивний виклик для наступного кадру
        //         requestAnimationFrame(animate);
        //     }
        //
        //     // Запускаємо анімацію
        //     animate();
        // });
// Функція для перевірки розміру екрану та запуску анімації
    function startAnimationForLargeScreens() {
        if (window.innerWidth < 768) {
            console.log('Анімація не запускається для екранів менше 768px');
            return; // Вихід, якщо ширина вікна менше 768px
        }

        const sections = document.querySelectorAll('.move-el');

        sections.forEach((section, index) => {
            const block = section.querySelector('.moving-element');
            if (!block) {
                console.warn(`У секції #${index + 1} блок .moving-element не знайдено`);
                return;
            }

            console.log(`Секція #${index + 1} знайдена, запускаємо анімацію для блоку`);

            const sectionWidth = section.offsetWidth;
            const sectionHeight = section.offsetHeight;
            const blockWidth = block.offsetWidth;
            const blockHeight = block.offsetHeight;

            let currentX = Math.random() * (sectionWidth - blockWidth);
            let currentY = Math.random() * (sectionHeight - blockHeight);
            let targetX = Math.random() * (sectionWidth - blockWidth);
            let targetY = Math.random() * (sectionHeight - blockHeight);
            const speed = 0.5; // Швидкість руху

            function animate() {
                // Плавне наближення до цільових координат
                currentX += (targetX - currentX) * speed;
                currentY += (targetY - currentY) * speed;

                block.style.transform = `translate(${currentX}px, ${currentY}px)`;

                // Якщо елемент майже досягнув цілі, змінюємо ціль
                if (Math.abs(targetX - currentX) < 5 && Math.abs(targetY - currentY) < 5) {
                    targetX = Math.random() * (sectionWidth - blockWidth);
                    targetY = Math.random() * (sectionHeight - blockHeight);
                }

                // Рекурсивний виклик для наступного кадру
                requestAnimationFrame(animate);
            }

            // Запускаємо анімацію
            animate();
        });
    }

// Виклик функції при завантаженні сторінки
    startAnimationForLargeScreens();

// Перевірка розміру екрану при зміні розміру вікна
    window.addEventListener('resize', () => {
        startAnimationForLargeScreens();
    });



//    GSAP ANIMATION
//     gsap.registerPlugin(ScrollTrigger);
//     console.log(ScrollTrigger);
//
//         const symptoms = document.querySelectorAll(".symptom");
//         const images = document.querySelectorAll(".image");
//         const iconsContainer = document.querySelector(".icons");
//         const messageBlock = document.querySelector(".section-manifestation .message-block");
//
//         // Функція визначення, яка картинка відповідає поточному симптому
//         const getImageIndexForSymptom = (symptomIndex) => {
//             if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
//             if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
//             if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
//             if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
//             return -1; // Без картинки
//         };
//
//         // Функція оновлення іконок та картинок
//         const updateState = (index) => {
//             // Оновлення картинки
//             const newImageIndex = getImageIndexForSymptom(index);
//             images.forEach((image, imgIndex) => {
//                 if (imgIndex === newImageIndex) {
//                     gsap.to(image, { opacity: 1, scale: 1, duration: 0.5 });
//                 } else {
//                     gsap.to(image, { opacity: 0, scale: 0.95, duration: 0.5 });
//                 }
//             });
//
//             // Оновлення іконки
//             const iconSrc = symptoms[index].dataset.icon; // Іконка прив’язана через data-icon
//             if (iconSrc) {
//                 iconsContainer.innerHTML = ""; // Очищуємо попередні іконки
//                 const iconElement = document.createElement("img");
//                 iconElement.src = iconSrc;
//                 iconElement.classList.add("icon");
//                 iconsContainer.appendChild(iconElement);
//                 gsap.fromTo(iconElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
//             }
//         };
//
//         // Анімація симптомів
//         symptoms.forEach((symptom, index) => {
//             gsap.fromTo(
//                 symptom,
//                 { opacity: 0, y: 50 },
//                 {
//                     opacity: 1,
//                     y: 0,
//                     duration: 0.8,
//                     scrollTrigger: {
//                         trigger: symptom,
//                         start: "top 90%",
//                         toggleActions: "play none none reverse",
//                         onEnter: () => updateState(index), // Оновлення стану для кожного симптому
//                     },
//                 }
//             );
//         });
//
//         // Анімація появи блоку з повідомленням
//         gsap.fromTo(messageBlock, { y: 100, opacity: 0 }, {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             scrollTrigger: {
//                 trigger: messageBlock,
//                 start: "top 100%",
//                 toggleActions: "play none none none",
//             },
//         });


// // ANIM BLOCK WITH GIRL
    const symptoms = document.querySelectorAll(".manifestation");
    const symptomList = document.querySelector(".manifestation-list ul");
    const images = document.querySelectorAll(".image");
    const iconsContainer = document.querySelector(".icons");
    const animationSection = document.querySelector(".section-manifestation");
    const stickyTrigger = document.querySelector(".sticky-trigger"); // Секція зі стікі ефектом

    let currentSymptomIndex = -1; // Індекс поточного активного симптому
    let isLastAnimation = false; // Флаг, чи виконується остання анімація
    const delayAfterLastAnimation = 1000; // Затримка перед зняттям стікі (мс)

    const sectionTop = animationSection.offsetTop;
    const sectionHeight = animationSection.offsetHeight;
    const symptomStep = sectionHeight / symptoms.length; // Висота секції для кожного текстового пункту

// Функція для визначення, яка картинка відповідає поточному симптому
    const getImageIndexForSymptom = (symptomIndex) => {
        if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
        if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
        if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
        if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
        return -1; // Без картинки
    };

// Функція для оновлення стану елементів
    const updateState = (index) => {
        // Робимо всі симптоми розмитими
        symptoms.forEach((s, i) => {
            if (i === index) {
                s.classList.add("visible"); // Активний
            } else {
                s.classList.remove("visible"); // Інші залишаються розмитими
            }
        });
        if (window.innerWidth < 768) {
            // Динамічно обчислюємо зсув `ul` на ширину попередніх елементів
            let shiftWidth = 0;
            for (let i = 0; i < index; i++) {
                shiftWidth += symptoms[i].offsetWidth + 8; // Додаємо ширину елементів та gap (8px)
            }
            symptomList.style.transform = `translateX(-${shiftWidth}px)`;
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
        const iconSrc = symptoms[index].dataset.icon;
        if (iconSrc) {
            iconsContainer.innerHTML = ""; // Очищаємо попередні іконки
            const iconElement = document.createElement("img");
            iconElement.src = iconSrc;
            iconElement.classList.add("icon", "visible");
            iconsContainer.appendChild(iconElement);
        }
    };

// Оновлюємо анімацію на основі скролу
    const updateAnimationOnScroll = () => {
        const scrollPosition = window.scrollY - sectionTop;

        if (!isLastAnimation) {
            symptoms.forEach((symptom, index) => {
                const start = index * symptomStep;
                const end = start + symptomStep;

                if (scrollPosition >= start && scrollPosition < end) {
                    if (currentSymptomIndex !== index) {
                        currentSymptomIndex = index;
                        updateState(index);
                    }
                }
            });
        }

        // Перевіряємо, чи дійшли до останньої анімації
        if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
            isLastAnimation = true;

            stickyTrigger.style.height = "auto";
            // Додаємо затримку, після якої знімаємо "стики"
            setTimeout(() => {
                stickyTrigger.style.position = "relative"; // Стіки більше не активний
                stickyTrigger.style.top = "auto"; // Знімаємо прив'язку до верху
                stickyTrigger.style.scroll = "auto"; // Знімаємо прив'язку до верху
                updateState(currentSymptomIndex); // Фіксуємо останній стан
            }, delayAfterLastAnimation);
        }
    };

// Прив'язка функції до події скролу
    window.addEventListener("scroll", updateAnimationOnScroll);
//


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
            start: "top center", // When to start (e.g., when the top of the section reaches the top of the viewport)
            onEnter: () => {
                // Add the class when the timeline starts
                document.getElementById("about").classList.add("timeline-started");
            },
            markers: true,        // Remove in production; helpful for debugging
        },
    });

    timeline
        .to(".pill-anim__components", {
            scale: 0,
            opacity: 1,
            rotation: 360,
            duration: 2,
            ease: "linear",
        }, "+=3")
        .from(".pill-anim__images", {
            opacity: 1,
            scale: 0,
            duration: 2,
            ease: "linear",
        }, "+=0.5")
        .from(".pill-anim__logo", {
            opacity: 0,
            xPercent: -150,
            duration: 1,
        }, "+=0.6");

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgLy8gZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG5cclxuLy9BQ0NPUkRJT05cclxuICAgIGNvbnN0IGFjY29yZGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKTtcclxuXHJcbiAgICBhY2NvcmRpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4gICAgbGV0IHNsaWRlckFib3V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXIoKSB7XHJcbiAgICAgICAgaWYgKHNsaWRlckFib3V0KSBzbGlkZXJBYm91dC5kZXN0cm95KHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzbGlkZXJBYm91dC5yZWFsSW5kZXg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbmF2QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpO1xyXG5cclxuICAgICAgICBuYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlckFib3V0LnNsaWRlVG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuXHJcbi8vQlROLVVQXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA8IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBiYWNrVG9Ub3AoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgLTgwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYmFja1RvVG9wLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwJyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XHJcbiAgICAgICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9Ub3ApO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4vLyBQT1BVUFNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTsgLy8g0JrQvdC+0L/QutC4INC00LvRjyDQstGW0LTQutGA0LjRgtGC0Y8g0L/QtdGA0YjQuNGFINC00LLQvtGFINC/0L7Qv9Cw0L/RltCyXHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpOyAvLyDQn9C10YDRiNC40Lkv0JTRgNGD0LPQuNC5INCf0L7Qv9Cw0L9cclxuICAgIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbEhlYWRlcicpO1xyXG4gICAgY29uc3QgY2xvc2VQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAocG9wdXBFbGVtZW50KSB7XHJcbiAgICAgICAgcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAuc2hvdycpKSB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmFwcGVuZENoaWxkKHRlbXBsYXRlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpcmRQb3B1cEJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy50cmlnZ2VyLXBsYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcHVwKHRoaXJkUG9wdXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXApKTtcclxuICAgIGNsb3NlVGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAodGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgY2xvc2VQb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgIH0pO1xyXG5cclxuLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICAgICAgY29uc3QgYnRuRGlzY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50JylcclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RvdGFsUm90YXRpb259ZGVnKWA7XHJcbiAgICAgICAgdGV4dFN0YXJ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbi8vTU9WSU5HIEVMRU1FTlRcclxuXHJcbiAgICAgICAgLy8gY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW92ZS1lbCcpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc3QgYmxvY2sgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctZWxlbWVudCcpO1xyXG4gICAgICAgIC8vICAgICBpZiAoIWJsb2NrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLndhcm4oYNCjINGB0LXQutGG0ZbRlyAjJHtpbmRleCArIDF9INCx0LvQvtC6IC5tb3ZpbmctZWxlbWVudCDQvdC1INC30L3QsNC50LTQtdC90L5gKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGDQodC10LrRhtGW0Y8gIyR7aW5kZXggKyAxfSDQt9C90LDQudC00LXQvdCwLCDQt9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC00LvRjyDQsdC70L7QutGDYCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgY29uc3Qgc2VjdGlvbldpZHRoID0gc2VjdGlvbi5vZmZzZXRXaWR0aDtcclxuICAgICAgICAvLyAgICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IHNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIC8vICAgICBjb25zdCBibG9ja1dpZHRoID0gYmxvY2sub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGJsb2NrSGVpZ2h0ID0gYmxvY2sub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGxldCBjdXJyZW50WCA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbldpZHRoIC0gYmxvY2tXaWR0aCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBjdXJyZW50WSA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbkhlaWdodCAtIGJsb2NrSGVpZ2h0KTtcclxuICAgICAgICAvLyAgICAgbGV0IHRhcmdldFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgICAgIC8vICAgICBsZXQgdGFyZ2V0WSA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbkhlaWdodCAtIGJsb2NrSGVpZ2h0KTtcclxuICAgICAgICAvLyAgICAgY29uc3Qgc3BlZWQgPSAwLjU7IC8vINCo0LLQuNC00LrRltGB0YLRjCDRgNGD0YXRg1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyDQn9C70LDQstC90LUg0L3QsNCx0LvQuNC20LXQvdC90Y8g0LTQviDRhtGW0LvRjNC+0LLQuNGFINC60L7QvtGA0LTQuNC90LDRglxyXG4gICAgICAgIC8vICAgICAgICAgY3VycmVudFggKz0gKHRhcmdldFggLSBjdXJyZW50WCkgKiBzcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGN1cnJlbnRZICs9ICh0YXJnZXRZIC0gY3VycmVudFkpICogc3BlZWQ7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgICAgIGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjdXJyZW50WH1weCwgJHtjdXJyZW50WX1weClgO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICAvLyDQr9C60YnQviDQtdC70LXQvNC10L3RgiDQvNCw0LnQttC1INC00L7RgdGP0LPQvdGD0LIg0YbRltC70ZYsINC30LzRltC90Y7RlNC80L4g0YbRltC70YxcclxuICAgICAgICAvLyAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXRYIC0gY3VycmVudFgpIDwgNSAmJiBNYXRoLmFicyh0YXJnZXRZIC0gY3VycmVudFkpIDwgNSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRhcmdldFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRhcmdldFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgICAgIC8vINCg0LXQutGD0YDRgdC40LLQvdC40Lkg0LLQuNC60LvQuNC6INC00LvRjyDQvdCw0YHRgtGD0L/QvdC+0LPQviDQutCw0LTRgNGDXHJcbiAgICAgICAgLy8gICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAvLyDQl9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOXHJcbiAgICAgICAgLy8gICAgIGFuaW1hdGUoKTtcclxuICAgICAgICAvLyB9KTtcclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC/0LXRgNC10LLRltGA0LrQuCDRgNC+0LfQvNGW0YDRgyDQtdC60YDQsNC90YMg0YLQsCDQt9Cw0L/Rg9GB0LrRgyDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICBmdW5jdGlvbiBzdGFydEFuaW1hdGlvbkZvckxhcmdlU2NyZWVucygpIHtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ9CQ0L3RltC80LDRhtGW0Y8g0L3QtSDQt9Cw0L/Rg9GB0LrQsNGU0YLRjNGB0Y8g0LTQu9GPINC10LrRgNCw0L3RltCyINC80LXQvdGI0LUgNzY4cHgnKTtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyDQktC40YXRltC0LCDRj9C60YnQviDRiNC40YDQuNC90LAg0LLRltC60L3QsCDQvNC10L3RiNC1IDc2OHB4XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3ZlLWVsJyk7XHJcblxyXG4gICAgICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgaWYgKCFibG9jaykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGDQoyDRgdC10LrRhtGW0ZcgIyR7aW5kZXggKyAxfSDQsdC70L7QuiAubW92aW5nLWVsZW1lbnQg0L3QtSDQt9C90LDQudC00LXQvdC+YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDQodC10LrRhtGW0Y8gIyR7aW5kZXggKyAxfSDQt9C90LDQudC00LXQvdCwLCDQt9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC00LvRjyDQsdC70L7QutGDYCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uV2lkdGggPSBzZWN0aW9uLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrV2lkdGggPSBibG9jay5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgY29uc3QgYmxvY2tIZWlnaHQgPSBibG9jay5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRYID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uV2lkdGggLSBibG9ja1dpZHRoKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC41OyAvLyDQqNCy0LjQtNC60ZbRgdGC0Ywg0YDRg9GF0YNcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQn9C70LDQstC90LUg0L3QsNCx0LvQuNC20LXQvdC90Y8g0LTQviDRhtGW0LvRjNC+0LLQuNGFINC60L7QvtGA0LTQuNC90LDRglxyXG4gICAgICAgICAgICAgICAgY3VycmVudFggKz0gKHRhcmdldFggLSBjdXJyZW50WCkgKiBzcGVlZDtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRZICs9ICh0YXJnZXRZIC0gY3VycmVudFkpICogc3BlZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYmxvY2suc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2N1cnJlbnRYfXB4LCAke2N1cnJlbnRZfXB4KWA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0LXQu9C10LzQtdC90YIg0LzQsNC50LbQtSDQtNC+0YHRj9Cz0L3Rg9CyINGG0ZbQu9GWLCDQt9C80ZbQvdGO0ZTQvNC+INGG0ZbQu9GMXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2V0WCAtIGN1cnJlbnRYKSA8IDUgJiYgTWF0aC5hYnModGFyZ2V0WSAtIGN1cnJlbnRZKSA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRYID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uV2lkdGggLSBibG9ja1dpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRZID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uSGVpZ2h0IC0gYmxvY2tIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vINCg0LXQutGD0YDRgdC40LLQvdC40Lkg0LLQuNC60LvQuNC6INC00LvRjyDQvdCw0YHRgtGD0L/QvdC+0LPQviDQutCw0LTRgNGDXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINCX0LDQv9GD0YHQutCw0ZTQvNC+INCw0L3RltC80LDRhtGW0Y5cclxuICAgICAgICAgICAgYW5pbWF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8g0JLQuNC60LvQuNC6INGE0YPQvdC60YbRltGXINC/0YDQuCDQt9Cw0LLQsNC90YLQsNC20LXQvdC90ZYg0YHRgtC+0YDRltC90LrQuFxyXG4gICAgc3RhcnRBbmltYXRpb25Gb3JMYXJnZVNjcmVlbnMoKTtcclxuXHJcbi8vINCf0LXRgNC10LLRltGA0LrQsCDRgNC+0LfQvNGW0YDRgyDQtdC60YDQsNC90YMg0L/RgNC4INC30LzRltC90ZYg0YDQvtC30LzRltGA0YMg0LLRltC60L3QsFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBzdGFydEFuaW1hdGlvbkZvckxhcmdlU2NyZWVucygpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbi8vICAgIEdTQVAgQU5JTUFUSU9OXHJcbi8vICAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG4vLyAgICAgY29uc29sZS5sb2coU2Nyb2xsVHJpZ2dlcik7XHJcbi8vXHJcbi8vICAgICAgICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN5bXB0b21cIik7XHJcbi8vICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbi8vICAgICAgICAgY29uc3QgbWVzc2FnZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb24gLm1lc3NhZ2UtYmxvY2tcIik7XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbi8vICAgICAgICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbi8vICAgICAgICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuLy8gICAgICAgICB9O1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINC+0L3QvtCy0LvQtdC90L3RjyDRltC60L7QvdC+0Log0YLQsCDQutCw0YDRgtC40L3QvtC6XHJcbi8vICAgICAgICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINC60LDRgNGC0LjQvdC60LhcclxuLy8gICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZ3NhcC50byhpbWFnZSwgeyBvcGFjaXR5OiAxLCBzY2FsZTogMSwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZ3NhcC50byhpbWFnZSwgeyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDRltC60L7QvdC60LhcclxuLy8gICAgICAgICAgICAgY29uc3QgaWNvblNyYyA9IHN5bXB0b21zW2luZGV4XS5kYXRhc2V0Lmljb247IC8vINCG0LrQvtC90LrQsCDQv9GA0LjQsuKAmdGP0LfQsNC90LAg0YfQtdGA0LXQtyBkYXRhLWljb25cclxuLy8gICAgICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuLy8gICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0YPRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuLy8gICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICAgICAgZ3NhcC5mcm9tVG8oaWNvbkVsZW1lbnQsIHsgb3BhY2l0eTogMCwgeTogLTIwIH0sIHsgb3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0JDQvdGW0LzQsNGG0ZbRjyDRgdC40LzQv9GC0L7QvNGW0LJcclxuLy8gICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBnc2FwLmZyb21UbyhcclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20sXHJcbi8vICAgICAgICAgICAgICAgICB7IG9wYWNpdHk6IDAsIHk6IDUwIH0sXHJcbi8vICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuLy8gICAgICAgICAgICAgICAgICAgICB5OiAwLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjgsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzeW1wdG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgOTAlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgcmV2ZXJzZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB1cGRhdGVTdGF0ZShpbmRleCksIC8vINCe0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDINC00LvRjyDQutC+0LbQvdC+0LPQviDRgdC40LzQv9GC0L7QvNGDXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQkNC90ZbQvNCw0YbRltGPINC/0L7Rj9Cy0Lgg0LHQu9C+0LrRgyDQtyDQv9C+0LLRltC00L7QvNC70LXQvdC90Y/QvFxyXG4vLyAgICAgICAgIGdzYXAuZnJvbVRvKG1lc3NhZ2VCbG9jaywgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSwge1xyXG4vLyAgICAgICAgICAgICB5OiAwLFxyXG4vLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICBkdXJhdGlvbjogMSxcclxuLy8gICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgdHJpZ2dlcjogbWVzc2FnZUJsb2NrLFxyXG4vLyAgICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDEwMCVcIixcclxuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgbm9uZVwiLFxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgIH0pO1xyXG5cclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7IC8vINCh0LXQutGG0ZbRjyDQt9GWINGB0YLRltC60ZYg0LXRhNC10LrRgtC+0LxcclxuXHJcbiAgICBsZXQgY3VycmVudFN5bXB0b21JbmRleCA9IC0xOyAvLyDQhtC90LTQtdC60YEg0L/QvtGC0L7Rh9C90L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7IC8vINCk0LvQsNCzLCDRh9C4INCy0LjQutC+0L3Rg9GU0YLRjNGB0Y8g0L7RgdGC0LDQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRj1xyXG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSAxMDAwOyAvLyDQl9Cw0YLRgNC40LzQutCwINC/0LXRgNC10LQg0LfQvdGP0YLRgtGP0Lwg0YHRgtGW0LrRliAo0LzRgSlcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7IC8vINCS0LjRgdC+0YLQsCDRgdC10LrRhtGW0Zcg0LTQu9GPINC60L7QttC90L7Qs9C+INGC0LXQutGB0YLQvtCy0L7Qs9C+INC/0YPQvdC60YLRg1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICAvLyDQoNC+0LHQuNC80L4g0LLRgdGWINGB0LjQvNC/0YLQvtC80Lgg0YDQvtC30LzQuNGC0LjQvNC4XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgocywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHMuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7IC8vINCQ0LrRgtC40LLQvdC40LlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7IC8vINCG0L3RiNGWINC30LDQu9C40YjQsNGO0YLRjNGB0Y8g0YDQvtC30LzQuNGC0LjQvNC4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcclxuICAgICAgICAgICAgLy8g0JTQuNC90LDQvNGW0YfQvdC+INC+0LHRh9C40YHQu9GO0ZTQvNC+INC30YHRg9CyIGB1bGAg0L3QsCDRiNC40YDQuNC90YMg0L/QvtC/0LXRgNC10LTQvdGW0YUg0LXQu9C10LzQtdC90YLRltCyXHJcbiAgICAgICAgICAgIGxldCBzaGlmdFdpZHRoID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODsgLy8g0JTQvtC00LDRlNC80L4g0YjQuNGA0LjQvdGDINC10LvQtdC80LXQvdGC0ZbQsiDRgtCwIGdhcCAoOHB4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b21MaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3NoaWZ0V2lkdGh9cHgpYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjtcclxuICAgICAgICBpZiAoaWNvblNyYykge1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidCw0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INCw0L3RltC80LDRhtGW0Y4g0L3QsCDQvtGB0L3QvtCy0ZYg0YHQutGA0L7Qu9GDXHJcbiAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZIC0gc2VjdGlvblRvcDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC00ZbQudGI0LvQuCDQtNC+INC+0YHRgtCw0L3QvdGM0L7RlyDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggPT09IHN5bXB0b21zLmxlbmd0aCAtIDEgJiYgIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBpc0xhc3RBbmltYXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0LfQsNGC0YDQuNC80LrRgywg0L/RltGB0LvRjyDRj9C60L7RlyDQt9C90ZbQvNCw0ZTQvNC+IFwi0YHRgtC40LrQuFwiXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjsgLy8g0KHRgtGW0LrQuCDQsdGW0LvRjNGI0LUg0L3QtSDQsNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnRvcCA9IFwiYXV0b1wiOyAvLyDQl9C90ZbQvNCw0ZTQvNC+INC/0YDQuNCyJ9GP0LfQutGDINC00L4g0LLQtdGA0YXRg1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5zY3JvbGwgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGN1cnJlbnRTeW1wdG9tSW5kZXgpOyAvLyDQpNGW0LrRgdGD0ZTQvNC+INC+0YHRgtCw0L3QvdGW0Lkg0YHRgtCw0L1cclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQn9GA0LjQsifRj9C30LrQsCDRhNGD0L3QutGG0ZbRlyDQtNC+INC/0L7QtNGW0Zcg0YHQutGA0L7Qu9GDXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCk7XHJcbi8vXHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIGFuaW1hdGlvbiBmb3IgZWFjaCBjb21wb25lbnQuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGltZWxpbmUgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IFwiI2Fib3V0XCIsIC8vIFNlY3Rpb24gdG8gb2JzZXJ2ZSBmb3Igc2Nyb2xsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCBjZW50ZXJcIiwgLy8gV2hlbiB0byBzdGFydCAoZS5nLiwgd2hlbiB0aGUgdG9wIG9mIHRoZSBzZWN0aW9uIHJlYWNoZXMgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQpXHJcbiAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgY2xhc3Mgd2hlbiB0aGUgdGltZWxpbmUgc3RhcnRzXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYXJrZXJzOiB0cnVlLCAgICAgICAgLy8gUmVtb3ZlIGluIHByb2R1Y3Rpb247IGhlbHBmdWwgZm9yIGRlYnVnZ2luZ1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aW1lbGluZVxyXG4gICAgICAgIC50byhcIi5waWxsLWFuaW1fX2NvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgfSwgXCIrPTNcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2ltYWdlc1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgZWFzZTogXCJsaW5lYXJcIixcclxuICAgICAgICB9LCBcIis9MC41XCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgeFBlcmNlbnQ6IC0xNTAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgIH0sIFwiKz0wLjZcIik7XHJcblxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
