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

        const sections = document.querySelectorAll('.section');

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
                if (Math.abs(targetX - currentX) < 1 && Math.abs(targetY - currentY) < 1) {
                    targetX = Math.random() * (sectionWidth - blockWidth);
                    targetY = Math.random() * (sectionHeight - blockHeight);
                }

                // Рекурсивний виклик для наступного кадру
                requestAnimationFrame(animate);
            }

            // Запускаємо анімацію
            animate();
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgLy8gZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSwgMjUwKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG5cclxuLy9BQ0NPUkRJT05cclxuICAgIGNvbnN0IGFjY29yZGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKTtcclxuXHJcbiAgICBhY2NvcmRpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4gICAgbGV0IHNsaWRlckFib3V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRTd2lwZXIoKSB7XHJcbiAgICAgICAgaWYgKHNsaWRlckFib3V0KSBzbGlkZXJBYm91dC5kZXN0cm95KHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzbGlkZXJBYm91dC5yZWFsSW5kZXg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEN1c3RvbU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbmF2QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpO1xyXG5cclxuICAgICAgICBuYXZCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlckFib3V0LnNsaWRlVG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuXHJcbi8vQlROLVVQXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA8IGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBiYWNrVG9Ub3AoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgLTgwKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYmFja1RvVG9wLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwJyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XHJcbiAgICAgICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9Ub3ApO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4vLyBQT1BVUFNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTsgLy8g0JrQvdC+0L/QutC4INC00LvRjyDQstGW0LTQutGA0LjRgtGC0Y8g0L/QtdGA0YjQuNGFINC00LLQvtGFINC/0L7Qv9Cw0L/RltCyXHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpOyAvLyDQn9C10YDRiNC40Lkv0JTRgNGD0LPQuNC5INCf0L7Qv9Cw0L9cclxuICAgIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbEhlYWRlcicpO1xyXG4gICAgY29uc3QgY2xvc2VQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAocG9wdXBFbGVtZW50KSB7XHJcbiAgICAgICAgcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAuc2hvdycpKSB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmFwcGVuZENoaWxkKHRlbXBsYXRlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpcmRQb3B1cEJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy50cmlnZ2VyLXBsYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcHVwKHRoaXJkUG9wdXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xvc2VQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXApKTtcclxuICAgIGNsb3NlVGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAodGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgY2xvc2VQb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgIH0pO1xyXG5cclxuLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICAgICAgY29uc3QgYnRuRGlzY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50JylcclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAwO1xyXG5cclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RvdGFsUm90YXRpb259ZGVnKWA7XHJcbiAgICAgICAgdGV4dFN0YXJ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcbi8vTU9WSU5HIEVMRU1FTlRcclxuXHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpO1xyXG5cclxuICAgICAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBibG9jayA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignLm1vdmluZy1lbGVtZW50Jyk7XHJcbiAgICAgICAgICAgIGlmICghYmxvY2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg0KMg0YHQtdC60YbRltGXICMke2luZGV4ICsgMX0g0LHQu9C+0LogLm1vdmluZy1lbGVtZW50INC90LUg0LfQvdCw0LnQtNC10L3QvmApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg0KHQtdC60YbRltGPICMke2luZGV4ICsgMX0g0LfQvdCw0LnQtNC10L3QsCwg0LfQsNC/0YPRgdC60LDRlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQtNC70Y8g0LHQu9C+0LrRg2ApO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbldpZHRoID0gc2VjdGlvbi5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IHNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCBibG9ja1dpZHRoID0gYmxvY2sub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrSGVpZ2h0ID0gYmxvY2sub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRYID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uV2lkdGggLSBibG9ja1dpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRZID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uSGVpZ2h0IC0gYmxvY2tIZWlnaHQpO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0WCA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbldpZHRoIC0gYmxvY2tXaWR0aCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRZID0gTWF0aC5yYW5kb20oKSAqIChzZWN0aW9uSGVpZ2h0IC0gYmxvY2tIZWlnaHQpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuNTsgLy8g0KjQstC40LTQutGW0YHRgtGMINGA0YPRhdGDXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0J/Qu9Cw0LLQvdC1INC90LDQsdC70LjQttC10L3QvdGPINC00L4g0YbRltC70YzQvtCy0LjRhSDQutC+0L7RgNC00LjQvdCw0YJcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRYICs9ICh0YXJnZXRYIC0gY3VycmVudFgpICogc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WSArPSAodGFyZ2V0WSAtIGN1cnJlbnRZKSAqIHNwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsb2NrLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjdXJyZW50WH1weCwgJHtjdXJyZW50WX1weClgO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINCv0LrRidC+INC10LvQtdC80LXQvdGCINC80LDQudC20LUg0LTQvtGB0Y/Qs9C90YPQsiDRhtGW0LvRliwg0LfQvNGW0L3RjtGU0LzQviDRhtGW0LvRjFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRhcmdldFggLSBjdXJyZW50WCkgPCAxICYmIE1hdGguYWJzKHRhcmdldFkgLSBjdXJyZW50WSkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WCA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbldpZHRoIC0gYmxvY2tXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WSA9IE1hdGgucmFuZG9tKCkgKiAoc2VjdGlvbkhlaWdodCAtIGJsb2NrSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQoNC10LrRg9GA0YHQuNCy0L3QuNC5INCy0LjQutC70LjQuiDQtNC70Y8g0L3QsNGB0YLRg9C/0L3QvtCz0L4g0LrQsNC00YDRg1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDQl9Cw0L/Rg9GB0LrQsNGU0LzQviDQsNC90ZbQvNCw0YbRltGOXHJcbiAgICAgICAgICAgIGFuaW1hdGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICAgR1NBUCBBTklNQVRJT05cclxuLy8gICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlcik7XHJcbi8vICAgICBjb25zb2xlLmxvZyhTY3JvbGxUcmlnZ2VyKTtcclxuLy9cclxuLy8gICAgICAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ltcHRvbVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuLy8gICAgICAgICBjb25zdCBtZXNzYWdlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvbiAubWVzc2FnZS1ibG9ja1wiKTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0L7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90L7QuiDRgtCwINC60LDRgNGC0LjQvdC+0LpcclxuLy8gICAgICAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4vLyAgICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjsgLy8g0IbQutC+0L3QutCwINC/0YDQuNCy4oCZ0Y/Qt9Cw0L3QsCDRh9C10YDQtdC3IGRhdGEtaWNvblxyXG4vLyAgICAgICAgICAgICBpZiAoaWNvblNyYykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnRg9GU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgICAgICBnc2FwLmZyb21UbyhpY29uRWxlbWVudCwgeyBvcGFjaXR5OiAwLCB5OiAtMjAgfSwgeyBvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQkNC90ZbQvNCw0YbRltGPINGB0LjQvNC/0YLQvtC80ZbQslxyXG4vLyAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGdzYXAuZnJvbVRvKFxyXG4vLyAgICAgICAgICAgICAgICAgc3ltcHRvbSxcclxuLy8gICAgICAgICAgICAgICAgIHsgb3BhY2l0eTogMCwgeTogNTAgfSxcclxuLy8gICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuOCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHN5bXB0b20sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA5MCVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSByZXZlcnNlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHVwZGF0ZVN0YXRlKGluZGV4KSwgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LTQu9GPINC60L7QttC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0L/QvtGP0LLQuCDQsdC70L7QutGDINC3INC/0L7QstGW0LTQvtC80LvQtdC90L3Rj9C8XHJcbi8vICAgICAgICAgZ3NhcC5mcm9tVG8obWVzc2FnZUJsb2NrLCB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LCB7XHJcbi8vICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4vLyAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBtZXNzYWdlQmxvY2ssXHJcbi8vICAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgMTAwJVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSBub25lXCIsXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG5cclxuLy8gLy8gQU5JTSBCTE9DSyBXSVRIIEdJUkxcclxuICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3ltcHRvbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hbmlmZXN0YXRpb24tbGlzdCB1bFwiKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbiAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICBjb25zdCBhbmltYXRpb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzdGlja3lUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja3ktdHJpZ2dlclwiKTsgLy8g0KHQtdC60YbRltGPINC30ZYg0YHRgtGW0LrRliDQtdGE0LXQutGC0L7QvFxyXG5cclxuICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7IC8vINCG0L3QtNC10LrRgSDQv9C+0YLQvtGH0L3QvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTsgLy8g0KTQu9Cw0LMsINGH0Lgg0LLQuNC60L7QvdGD0ZTRgtGM0YHRjyDQvtGB0YLQsNC90L3RjyDQsNC90ZbQvNCw0YbRltGPXHJcbiAgICBjb25zdCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbiA9IDEwMDA7IC8vINCX0LDRgtGA0LjQvNC60LAg0L/QtdGA0LXQtCDQt9C90Y/RgtGC0Y/QvCDRgdGC0ZbQutGWICjQvNGBKVxyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDsgLy8g0JLQuNGB0L7RgtCwINGB0LXQutGG0ZbRlyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YLQtdC60YHRgtC+0LLQvtCz0L4g0L/Rg9C90LrRgtGDXHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LXQu9C10LzQtdC90YLRltCyXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vINCg0L7QsdC40LzQviDQstGB0ZYg0YHQuNC80L/RgtC+0LzQuCDRgNC+0LfQvNC40YLQuNC80LhcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcy5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTsgLy8g0JDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcy5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTsgLy8g0IbQvdGI0ZYg0LfQsNC70LjRiNCw0Y7RgtGM0YHRjyDRgNC+0LfQvNC40YLQuNC80LhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xyXG4gICAgICAgICAgICAvLyDQlNC40L3QsNC80ZbRh9C90L4g0L7QsdGH0LjRgdC70Y7RlNC80L4g0LfRgdGD0LIgYHVsYCDQvdCwINGI0LjRgNC40L3RgyDQv9C+0L/QtdGA0LXQtNC90ZbRhSDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgICAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNoaWZ0V2lkdGggKz0gc3ltcHRvbXNbaV0ub2Zmc2V0V2lkdGggKyA4OyAvLyDQlNC+0LTQsNGU0LzQviDRiNC40YDQuNC90YMg0LXQu9C10LzQtdC90YLRltCyINGC0LAgZ2FwICg4cHgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uO1xyXG4gICAgICAgIGlmIChpY29uU3JjKSB7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQntC90L7QstC70Y7RlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgLSBzZWN0aW9uVG9wO1xyXG5cclxuICAgICAgICBpZiAoIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCAqIHN5bXB0b21TdGVwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBzeW1wdG9tU3RlcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0LTRltC50YjQu9C4INC00L4g0L7RgdGC0LDQvdC90YzQvtGXINCw0L3RltC80LDRhtGW0ZdcclxuICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlzTGFzdEFuaW1hdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviDQt9Cw0YLRgNC40LzQutGDLCDQv9GW0YHQu9GPINGP0LrQvtGXINC30L3RltC80LDRlNC80L4gXCLRgdGC0LjQutC4XCJcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiOyAvLyDQodGC0ZbQutC4INCx0ZbQu9GM0YjQtSDQvdC1INCw0LrRgtC40LLQvdC40LlcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7IC8vINCX0L3RltC80LDRlNC80L4g0L/RgNC40LIn0Y/Qt9C60YMg0LTQviDQstC10YDRhdGDXHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnNjcm9sbCA9IFwiYXV0b1wiOyAvLyDQl9C90ZbQvNCw0ZTQvNC+INC/0YDQuNCyJ9GP0LfQutGDINC00L4g0LLQtdGA0YXRg1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoY3VycmVudFN5bXB0b21JbmRleCk7IC8vINCk0ZbQutGB0YPRlNC80L4g0L7RgdGC0LDQvdC90ZbQuSDRgdGC0LDQvVxyXG4gICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCf0YDQuNCyJ9GP0LfQutCwINGE0YPQvdC60YbRltGXINC00L4g0L/QvtC00ZbRlyDRgdC60YDQvtC70YNcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKTtcclxuLy9cclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG4gICAgY29uc3QgZ2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG4gICAgY29uc3QgZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IDIgKyBNYXRoLnJhbmRvbSgpO1xyXG4gICAgY29uc3QgZ2V0Um90YXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uIGZvciBlYWNoIGNvbXBvbmVudC5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGlsbC1hbmltX19jb21wb25lbnRcIikuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKHtyZXBlYXQ6IC0xLCB5b3lvOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIHRsLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIiwgLy8gU2VjdGlvbiB0byBvYnNlcnZlIGZvciBzY3JvbGxcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLCAvLyBXaGVuIHRvIHN0YXJ0IChlLmcuLCB3aGVuIHRoZSB0b3Agb2YgdGhlIHNlY3Rpb24gcmVhY2hlcyB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydClcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzcyB3aGVuIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuY2xhc3NMaXN0LmFkZChcInRpbWVsaW5lLXN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hcmtlcnM6IHRydWUsICAgICAgICAvLyBSZW1vdmUgaW4gcHJvZHVjdGlvbjsgaGVscGZ1bCBmb3IgZGVidWdnaW5nXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRpbWVsaW5lXHJcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgZWFzZTogXCJsaW5lYXJcIixcclxuICAgICAgICB9LCBcIis9M1wiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9faW1hZ2VzXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4gICAgICAgIH0sIFwiKz0wLjVcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2xvZ29cIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB4UGVyY2VudDogLTE1MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEsXHJcbiAgICAgICAgfSwgXCIrPTAuNlwiKTtcclxuXHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
