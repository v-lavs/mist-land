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
            const speed = 0.5;

            function animate() {
                currentX += (targetX - currentX) * speed;
                currentY += (targetY - currentY) * speed;

                block.style.transform = `translate(${currentX}px, ${currentY}px)`;

                if (Math.abs(targetX - currentX) < 5 && Math.abs(targetY - currentY) < 5) {
                    targetX = Math.random() * (sectionWidth - blockWidth);
                    targetY = Math.random() * (sectionHeight - blockHeight);
                }

                requestAnimationFrame(animate);
            }

            animate();
        });
    }

    startAnimationForLargeScreens();

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
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.sticky-trigger',
            start: 'top top',
            end: 'bottom bottom', // Це значення може бути некоректним, див. пояснення нижче
            pin: true,
            pinSpacing: true,
            // anticipatePin: 1,
        }
    });

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

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgLy8gZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuXHJcbi8vQUNDT1JESU9OXHJcbiAgICBjb25zdCBhY2NvcmRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2l0ZW1cIik7XHJcblxyXG4gICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBhY2NvcmRpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vIFNMSURFUiAtIFRBQlNcclxuICAgIGxldCBzbGlkZXJBYm91dDtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0U3dpcGVyKCkge1xyXG4gICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnZmFkZScsXHJcbiAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb246IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZTogdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXR1cEN1c3RvbU5hdmlnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gc2xpZGVyQWJvdXQucmVhbEluZGV4O1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBDdXN0b21OYXZpZ2F0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IG5hdkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKTtcclxuXHJcbiAgICAgICAgbmF2QnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBYm91dC5zbGlkZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0U3dpcGVyKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbml0U3dpcGVyKTtcclxuXHJcblxyXG4vL0JUTi1VUFxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuLy8gUE9QVVBTXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpOyAvLyDQotGA0LXRgtGW0Lkg0J/QvtC/0LDQv1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cChwb3B1cEVsZW1lbnQpIHtcclxuICAgICAgICBwb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNsb3NlUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwKSk7XHJcbiAgICBjbG9zZVRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHRoaXJkUG9wdXApKTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgIGNsb3NlUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IGJ0blNwaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpbkJ1dHRvbicpO1xyXG4gICAgYnRuU3Bpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb25zdCB3aGVlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aGVlbCcpO1xyXG4gICAgICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICAgICAgY29uc3QgdGV4dEVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWVuZCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkRpc2NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9kaXNjb3VudCcpXHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldFNlY3RvckFuZ2xlID0gMDtcclxuXHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7XHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIHdoZWVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xyXG4gICAgICAgIHRleHRTdGFydC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJ0blNwaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRFbmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG4vL01PVklORyBFTEVNRU5UXHJcblxyXG4gICAgLy8gY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW92ZS1lbCcpO1xyXG4gICAgLy9cclxuICAgIC8vIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24sIGluZGV4KSA9PiB7XHJcbiAgICAvLyAgICAgY29uc3QgYmxvY2sgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctZWxlbWVudCcpO1xyXG4gICAgLy8gICAgIGlmICghYmxvY2spIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS53YXJuKGDQoyDRgdC10LrRhtGW0ZcgIyR7aW5kZXggKyAxfSDQsdC70L7QuiAubW92aW5nLWVsZW1lbnQg0L3QtSDQt9C90LDQudC00LXQvdC+YCk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGDQodC10LrRhtGW0Y8gIyR7aW5kZXggKyAxfSDQt9C90LDQudC00LXQvdCwLCDQt9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC00LvRjyDQsdC70L7QutGDYCk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIGNvbnN0IHNlY3Rpb25XaWR0aCA9IHNlY3Rpb24ub2Zmc2V0V2lkdGg7XHJcbiAgICAvLyAgICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IHNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgLy8gICAgIGNvbnN0IGJsb2NrV2lkdGggPSBibG9jay5vZmZzZXRXaWR0aDtcclxuICAgIC8vICAgICBjb25zdCBibG9ja0hlaWdodCA9IGJsb2NrLm9mZnNldEhlaWdodDtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgbGV0IGN1cnJlbnRYID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uV2lkdGggLSBibG9ja1dpZHRoKTtcclxuICAgIC8vICAgICBsZXQgY3VycmVudFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAvLyAgICAgbGV0IHRhcmdldFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgLy8gICAgIGxldCB0YXJnZXRZID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uSGVpZ2h0IC0gYmxvY2tIZWlnaHQpO1xyXG4gICAgLy8gICAgIGNvbnN0IHNwZWVkID0gMC41OyAvLyDQqNCy0LjQtNC60ZbRgdGC0Ywg0YDRg9GF0YNcclxuICAgIC8vXHJcbiAgICAvLyAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcclxuICAgIC8vICAgICAgICAgLy8g0J/Qu9Cw0LLQvdC1INC90LDQsdC70LjQttC10L3QvdGPINC00L4g0YbRltC70YzQvtCy0LjRhSDQutC+0L7RgNC00LjQvdCw0YJcclxuICAgIC8vICAgICAgICAgY3VycmVudFggKz0gKHRhcmdldFggLSBjdXJyZW50WCkgKiBzcGVlZDtcclxuICAgIC8vICAgICAgICAgY3VycmVudFkgKz0gKHRhcmdldFkgLSBjdXJyZW50WSkgKiBzcGVlZDtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgICAgIGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjdXJyZW50WH1weCwgJHtjdXJyZW50WX1weClgO1xyXG4gICAgLy9cclxuICAgIC8vICAgICAgICAgLy8g0K/QutGJ0L4g0LXQu9C10LzQtdC90YIg0LzQsNC50LbQtSDQtNC+0YHRj9Cz0L3Rg9CyINGG0ZbQu9GWLCDQt9C80ZbQvdGO0ZTQvNC+INGG0ZbQu9GMXHJcbiAgICAvLyAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXRYIC0gY3VycmVudFgpIDwgNSAmJiBNYXRoLmFicyh0YXJnZXRZIC0gY3VycmVudFkpIDwgNSkge1xyXG4gICAgLy8gICAgICAgICAgICAgdGFyZ2V0WCA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbldpZHRoIC0gYmxvY2tXaWR0aCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0YXJnZXRZID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uSGVpZ2h0IC0gYmxvY2tIZWlnaHQpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgICAvLyDQoNC10LrRg9GA0YHQuNCy0L3QuNC5INCy0LjQutC70LjQuiDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0LrQsNC00YDRg1xyXG4gICAgLy8gICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy9cclxuICAgIC8vICAgICAvLyDQl9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOXHJcbiAgICAvLyAgICAgYW5pbWF0ZSgpO1xyXG4gICAgLy8gfSk7XHJcbiAgICBmdW5jdGlvbiBzdGFydEFuaW1hdGlvbkZvckxhcmdlU2NyZWVucygpIHtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ9CQ0L3RltC80LDRhtGW0Y8g0L3QtSDQt9Cw0L/Rg9GB0LrQsNGU0YLRjNGB0Y8g0LTQu9GPINC10LrRgNCw0L3RltCyINC80LXQvdGI0LUgNzY4cHgnKTtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyDQktC40YXRltC0LCDRj9C60YnQviDRiNC40YDQuNC90LAg0LLRltC60L3QsCDQvNC10L3RiNC1IDc2OHB4XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3ZlLWVsJyk7XHJcblxyXG4gICAgICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgaWYgKCFibG9jaykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGDQoyDRgdC10LrRhtGW0ZcgIyR7aW5kZXggKyAxfSDQsdC70L7QuiAubW92aW5nLWVsZW1lbnQg0L3QtSDQt9C90LDQudC00LXQvdC+YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDQodC10LrRhtGW0Y8gIyR7aW5kZXggKyAxfSDQt9C90LDQudC00LXQvdCwLCDQt9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC00LvRjyDQsdC70L7QutGDYCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uV2lkdGggPSBzZWN0aW9uLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrV2lkdGggPSBibG9jay5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgY29uc3QgYmxvY2tIZWlnaHQgPSBibG9jay5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRYID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uV2lkdGggLSBibG9ja1dpZHRoKTtcclxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC41O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYICs9ICh0YXJnZXRYIC0gY3VycmVudFgpICogc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WSArPSAodGFyZ2V0WSAtIGN1cnJlbnRZKSAqIHNwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjdXJyZW50WH1weCwgJHtjdXJyZW50WX1weClgO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXRYIC0gY3VycmVudFgpIDwgNSAmJiBNYXRoLmFicyh0YXJnZXRZIC0gY3VycmVudFkpIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFggPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25XaWR0aCAtIGJsb2NrV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFkgPSBNYXRoLnJhbmRvbSgpICogKHNlY3Rpb25IZWlnaHQgLSBibG9ja0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbmltYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBbmltYXRpb25Gb3JMYXJnZVNjcmVlbnMoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIHN0YXJ0QW5pbWF0aW9uRm9yTGFyZ2VTY3JlZW5zKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyAgICBHU0FQIEFOSU1BVElPTlxyXG4vLyAgICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFNjcm9sbFRyaWdnZXIpO1xyXG4vL1xyXG4vLyAgICAgICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zeW1wdG9tXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbi8vICAgICAgICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IG1lc3NhZ2VCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uIC5tZXNzYWdlLWJsb2NrXCIpO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQvtC90L7QstC70LXQvdC90Y8g0ZbQutC+0L3QvtC6INGC0LAg0LrQsNGA0YLQuNC90L7QulxyXG4vLyAgICAgICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbi8vICAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGdzYXAudG8oaW1hZ2UsIHsgb3BhY2l0eTogMSwgc2NhbGU6IDEsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGdzYXAudG8oaW1hZ2UsIHsgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uOyAvLyDQhtC60L7QvdC60LAg0L/RgNC40LLigJnRj9C30LDQvdCwINGH0LXRgNC10LcgZGF0YS1pY29uXHJcbi8vICAgICAgICAgICAgIGlmIChpY29uU3JjKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidGD0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuLy8gICAgICAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcclxuLy8gICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuLy8gICAgICAgICAgICAgICAgIGdzYXAuZnJvbVRvKGljb25FbGVtZW50LCB7IG9wYWNpdHk6IDAsIHk6IC0yMCB9LCB7IG9wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9O1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0YHQuNC80L/RgtC+0LzRltCyXHJcbi8vICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgeyBvcGFjaXR5OiAwLCB5OiA1MCB9LFxyXG4vLyAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgeTogMCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC44LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc3ltcHRvbSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDkwJVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIHJldmVyc2VcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRlcjogKCkgPT4gdXBkYXRlU3RhdGUoaW5kZXgpLCAvLyDQntC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0JDQvdGW0LzQsNGG0ZbRjyDQv9C+0Y/QstC4INCx0LvQvtC60YMg0Lcg0L/QvtCy0ZbQtNC+0LzQu9C10L3QvdGP0LxcclxuLy8gICAgICAgICBnc2FwLmZyb21UbyhtZXNzYWdlQmxvY2ssIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sIHtcclxuLy8gICAgICAgICAgICAgeTogMCxcclxuLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuLy8gICAgICAgICAgICAgZHVyYXRpb246IDEsXHJcbi8vICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuLy8gICAgICAgICAgICAgICAgIHRyaWdnZXI6IG1lc3NhZ2VCbG9jayxcclxuLy8gICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCAxMDAlXCIsXHJcbi8vICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIG5vbmVcIixcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICB9KTtcclxuXHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0lSTFxyXG5cclxuXHJcblxyXG4gICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFuaWZlc3RhdGlvbi1saXN0IHVsXCIpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpOyAvLyDQodC10LrRhtGW0Y8g0LfRliDRgdGC0ZbQutGWINC10YTQtdC60YLQvtC8XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTsgLy8g0IbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgbGV0IGlzTGFzdEFuaW1hdGlvbiA9IGZhbHNlOyAvLyDQpNC70LDQsywg0YfQuCDQstC40LrQvtC90YPRlNGC0YzRgdGPINC+0YHRgtCw0L3QvdGPINCw0L3RltC80LDRhtGW0Y9cclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gMTAwMDsgLy8g0JfQsNGC0YDQuNC80LrQsCDQv9C10YDQtdC0INC30L3Rj9GC0YLRj9C8INGB0YLRltC60ZYgKNC80YEpXHJcblxyXG4gICAgY29uc3Qgc2VjdGlvblRvcCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3ltcHRvbVN0ZXAgPSBzZWN0aW9uSGVpZ2h0IC8gc3ltcHRvbXMubGVuZ3RoOyAvLyDQktC40YHQvtGC0LAg0YHQtdC60YbRltGXINC00LvRjyDQutC+0LbQvdC+0LPQviDRgtC10LrRgdGC0L7QstC+0LPQviDQv9GD0L3QutGC0YNcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgLy8g0KDQvtCx0LjQvNC+INCy0YHRliDRgdC40LzQv9GC0L7QvNC4INGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHMsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpOyAvLyDQkNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpOyAvLyDQhtC90YjRliDQt9Cw0LvQuNGI0LDRjtGC0YzRgdGPINGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgICAgIC8vINCU0LjQvdCw0LzRltGH0L3QviDQvtCx0YfQuNGB0LvRjtGU0LzQviDQt9GB0YPQsiBgdWxgINC90LAg0YjQuNGA0LjQvdGDINC/0L7Qv9C10YDQtdC00L3RltGFINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7IC8vINCU0L7QtNCw0ZTQvNC+INGI0LjRgNC40L3RgyDQtdC70LXQvNC10L3RgtGW0LIg0YLQsCBnYXAgKDhweClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRofXB4KWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINCf0L7QutCw0LfRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDQutCw0YDRgtC40L3QutGDXHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XHJcbiAgICAgICAgY29uc3QgaWNvblNyYyA9IHN5bXB0b21zW2luZGV4XS5kYXRhc2V0Lmljb247XHJcbiAgICAgICAgaWYgKGljb25TcmMpIHtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnQsNGU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIiwgXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCe0L3QvtCy0LvRjtGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSAtIHNlY3Rpb25Ub3A7XHJcblxyXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDQtNGW0LnRiNC70Lgg0LTQviDQvtGB0YLQsNC90L3RjNC+0Zcg0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgaXNMYXN0QW5pbWF0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC30LDRgtGA0LjQvNC60YMsINC/0ZbRgdC70Y8g0Y/QutC+0Zcg0LfQvdGW0LzQsNGU0LzQviBcItGB0YLQuNC60LhcIlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7IC8vINCh0YLRltC60Lgg0LHRltC70YzRiNC1INC90LUg0LDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7IC8vINCX0L3RltC80LDRlNC80L4g0L/RgNC40LIn0Y/Qt9C60YMg0LTQviDQstC10YDRhdGDXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTsgLy8g0KTRltC60YHRg9GU0LzQviDQvtGB0YLQsNC90L3RltC5INGB0YLQsNC9XHJcbiAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8g0J/RgNC40LIn0Y/Qt9C60LAg0YTRg9C90LrRhtGW0Zcg0LTQviDQv9C+0LTRltGXINGB0LrRgNC+0LvRg1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwpO1xyXG4vL1xyXG4gICAgY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS10cmlnZ2VyJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgZW5kOiAnYm90dG9tIGJvdHRvbScsIC8vINCm0LUg0LfQvdCw0YfQtdC90L3RjyDQvNC+0LbQtSDQsdGD0YLQuCDQvdC10LrQvtGA0LXQutGC0L3QuNC8LCDQtNC40LIuINC/0L7Rj9GB0L3QtdC90L3RjyDQvdC40LbRh9C1XHJcbiAgICAgICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gYW50aWNpcGF0ZVBpbjogMSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vICAgIEFOSU1BVElPTiBQSUxMXHJcbiAgICBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcbiAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBnZXRSb3RhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24gZm9yIGVhY2ggY29tcG9uZW50LlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waWxsLWFuaW1fX2NvbXBvbmVudFwiKS5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoe3JlcGVhdDogLTEsIHlveW86IHRydWV9KTtcclxuXHJcbiAgICAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRpbWVsaW5lID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiBcIiNhYm91dFwiLCAvLyBTZWN0aW9uIHRvIG9ic2VydmUgZm9yIHNjcm9sbFxyXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgY2VudGVyXCIsIC8vIFdoZW4gdG8gc3RhcnQgKGUuZy4sIHdoZW4gdGhlIHRvcCBvZiB0aGUgc2VjdGlvbiByZWFjaGVzIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0KVxyXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGNsYXNzIHdoZW4gdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dFwiKS5jbGFzc0xpc3QuYWRkKFwidGltZWxpbmUtc3RhcnRlZFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFya2VyczogdHJ1ZSwgICAgICAgIC8vIFJlbW92ZSBpbiBwcm9kdWN0aW9uOyBoZWxwZnVsIGZvciBkZWJ1Z2dpbmdcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGltZWxpbmVcclxuICAgICAgICAudG8oXCIucGlsbC1hbmltX19jb21wb25lbnRzXCIsIHtcclxuICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4gICAgICAgIH0sIFwiKz0zXCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgfSwgXCIrPTAuNVwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9fbG9nb1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHhQZXJjZW50OiAtMTUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMSxcclxuICAgICAgICB9LCBcIis9MC42XCIpO1xyXG5cclxuXHJcbi8vIEFOSU0gU0VDVElPTiBTVElDS1lcclxuICAgIFNjcm9sbFRyaWdnZXIubWF0Y2hNZWRpYSh7XHJcblxyXG4gICAgICAgIFwiKG1pbi13aWR0aDogNzY4cHgpXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGwyID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogJy5zdGlja3ktZ3JpZF9faW1nLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogJ2NlbnRlciB0b3AnLCAvLyDQptC1INC30L3QsNGH0LXQvdC90Y8g0LzQvtC20LUg0LHRg9GC0Lgg0L3QtdC60L7RgNC10LrRgtC90LjQvCwg0LTQuNCyLiDQv9C+0Y/RgdC90LXQvdC90Y8g0L3QuNC20YfQtVxyXG4gICAgICAgICAgICAgICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhbnRpY2lwYXRlUGluOiAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
