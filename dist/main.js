/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {
    console.log("GSAP:", gsap);
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// MOBILE MENU
    const nav = document.querySelector('.header__nav');
    const navOpenHeader = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn_burger');
    const btnClose = document.querySelector('.btn_close');
    const backdrop = document.querySelector('.backdrop');
    const menuLinks = document.querySelectorAll('.menu__link');
    const body = document.querySelector('body');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        nav.classList.add('open');
        navOpenHeader.classList.remove('hidden')
        backdrop.style.display = 'block';
        body.classList.add('disable-scroll');
        navOpenHeader.classList.add('active');
        setTimeout(() => {
            btnClose.style.display = 'flex';
        }, 250);

    });

    [btnClose, backdrop, ...menuLinks].forEach(function (element) {
        element.addEventListener('click', function () {
            nav.classList.remove('open');
            backdrop.style.display = 'none';
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
    smoothScrollToAnchor('.btn_up');


//ACCORDION
    const accordionList = document.querySelectorAll(".accordion__item");

    accordionList.forEach((item) => {

        item.addEventListener("click", () => {
            // Перевіряємо, чи цей елемент вже активний
            const isActive = item.classList.contains("active");

            // Видаляємо клас "active" з усіх елементів
            accordionList.forEach((item) => item.classList.remove("active"));

            // Додаємо клас "active" тільки до натиснутого елемента, якщо він не був активним
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });


// SLIDER - TABS
//     const titles = document.querySelectorAll('.swiper-container .swiper-slide');
//     const title = [];
//     titles.forEach(function (element) {
//         title.push(element.dataset.title);
//     });
    let sliderAbout;

// Функція для створення Swiper з різними ефектами
    function initSwiper() {
        if (window.innerWidth >= 1024) {
            if (sliderAbout) sliderAbout.destroy(true, true); // Знищуємо старий Swiper
            sliderAbout = new Swiper('.slider-about', {
                effect: 'fade',
            });
        } else {
            if (sliderAbout) sliderAbout.destroy(true, true); // Знищуємо старий Swiper
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
                }
            );
        }
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

    const thirdPopup = document.getElementById('playDiscount'); // Третій Попап
    const closeThirdPopupButton = document.getElementById('closeThirdPopup');

    function openPopup(popupElement) {
        popupElement.classList.add('open');
        backdrop.classList.add('show');
        body.classList.add('disable-scroll');
    }

    function closePopup(popupElement) {
        popupElement.classList.remove('open');

        if (!document.querySelector('.popup.show')) {
            backdrop.classList.remove('show');
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

    backdrop.addEventListener('click', () => {
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

        // Кут сектору, на якому зупиняється (наприклад, "15%")
        const targetSectorAngle = 0; // Наприклад, сектор 15% на 60°

        const randomSpins = Math.floor(Math.random() * 5) + 5; // Випадкові оберти (5-10)
        const totalRotation = randomSpins * 360 + targetSectorAngle;

        // Анімація через CSS
        wheel.style.transform = `rotate(${totalRotation}deg)`;
        textStart.style.display = 'none';
        btnSpin.style.display = 'none';

        // Повідомлення після завершення
        setTimeout(() => {
            textEnd.style.display = 'block';
            btnDiscount.style.display = 'inline-flex';
        }, 3000);
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

        // Динамічно обчислюємо зсув `ul` на ширину попередніх елементів
        let shiftWidth = 0;
        for (let i = 0; i < index; i++) {
            shiftWidth += symptoms[i].offsetWidth + 8; // Додаємо ширину елементів та gap (8px)
        }
        symptomList.style.transform = `translateX(-${shiftWidth}px)`;

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

// This function scales the container to fit the screen.
// function scaleContainer() {
//     const container = document.getElementById("animation-container");
//     const scale = Math.min(container.innerWidth / 1200, container.innerHeight / 1005);
//     container.style.transform = `scale(${scale})`;
// }
//
// window.addEventListener("resize", scaleContainer);
// scaleContainer();

// This function creates the animation.

// const getCoordinatesRandomValue = () => Math.random() * 20 - 10;
// const getDurationRandomValue = () => 2 + Math.random() * 1;
// const getRotationRandomValue = () => Math.random() * 20 - 10;
//
// // This function creates the animation for each component.
// document.querySelectorAll(".component").forEach((component) => {
//     const tl = gsap.timeline({repeat: -1, yoyo: true});
//
//     tl.to(component, {
//         y: `+=${getCoordinatesRandomValue()}`,
//         x: `+=${getCoordinatesRandomValue()}`,
//         rotation: `+=${getRotationRandomValue()}`,
//         duration: getDurationRandomValue(),
//         ease: "sine.inOut",
//     })
//         .to(component, {
//             y: `+=${getCoordinatesRandomValue()}`,
//             x: `+=${getCoordinatesRandomValue()}`,
//             rotation: `+=${getRotationRandomValue()}`,
//             duration: getDurationRandomValue(),
//             ease: "sine.inOut",
//         })
//         .to(component, {
//             y: `+=${getCoordinatesRandomValue()}`,
//             x: `+=${getCoordinatesRandomValue()}`,
//             rotation: `+=${getRotationRandomValue()}`,
//             duration: getDurationRandomValue(),
//             ease: "sine.inOut",
//         });
// });
//
// gsap.timeline()
//     .to(".components", {
//         scale: 0,
//         rotation: 360,
//         duration: 2,
//         ease: "linear",
//     }, "+=5")
//     .from(".images", {
//         scale: 0,
//         duration: 2,
//         ease: "linear",
//     }, "+=2")
//     .from(".logo", {
//         x: -400,
//         duration: 1,
//     }, "+=0.6");

})
;


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0RWxlbWVudC5vZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5idG5fdXAnKTtcclxuXHJcblxyXG4vL0FDQ09SRElPTlxyXG4gICAgY29uc3QgYWNjb3JkaW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNjb3JkaW9uX19pdGVtXCIpO1xyXG5cclxuICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0YbQtdC5INC10LvQtdC80LXQvdGCINCy0LbQtSDQsNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4g0LrQu9Cw0YEgXCJhY3RpdmVcIiDQtyDRg9GB0ZbRhSDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0LrQu9Cw0YEgXCJhY3RpdmVcIiDRgtGW0LvRjNC60Lgg0LTQviDQvdCw0YLQuNGB0L3Rg9GC0L7Qs9C+INC10LvQtdC80LXQvdGC0LAsINGP0LrRidC+INCy0ZbQvSDQvdC1INCx0YPQsiDQsNC60YLQuNCy0L3QuNC8XHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4vLyAgICAgY29uc3QgdGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1jb250YWluZXIgLnN3aXBlci1zbGlkZScpO1xyXG4vLyAgICAgY29uc3QgdGl0bGUgPSBbXTtcclxuLy8gICAgIHRpdGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbi8vICAgICAgICAgdGl0bGUucHVzaChlbGVtZW50LmRhdGFzZXQudGl0bGUpO1xyXG4vLyAgICAgfSk7XHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0YHRgtCy0L7RgNC10L3QvdGPIFN3aXBlciDQtyDRgNGW0LfQvdC40LzQuCDQtdGE0LXQutGC0LDQvNC4XHJcbiAgICBmdW5jdGlvbiBpbml0U3dpcGVyKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTsgLy8g0JfQvdC40YnRg9GU0LzQviDRgdGC0LDRgNC40LkgU3dpcGVyXHJcbiAgICAgICAgICAgIHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVyQWJvdXQpIHNsaWRlckFib3V0LmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7IC8vINCX0L3QuNGJ0YPRlNC80L4g0YHRgtCw0YDQuNC5IFN3aXBlclxyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0U3dpcGVyKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbml0U3dpcGVyKTtcclxuXHJcblxyXG4vL0JUTi1VUFxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuLy8gUE9QVVBTXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG5cclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUtaWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuYXBwZW5kQ2hpbGQodGVtcGxhdGVDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlyZFBvcHVwQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnRyaWdnZXItcGxheScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjbG9zZVBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cCkpO1xyXG4gICAgY2xvc2VUaGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cCh0aGlyZFBvcHVwKSk7XHJcblxyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgY2xvc2VQb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgIH0pO1xyXG5cclxuLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICAgICAgY29uc3QgYnRuRGlzY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50JylcclxuXHJcbiAgICAgICAgLy8g0JrRg9GCINGB0LXQutGC0L7RgNGDLCDQvdCwINGP0LrQvtC80YMg0LfRg9C/0LjQvdGP0ZTRgtGM0YHRjyAo0L3QsNC/0YDQuNC60LvQsNC0LCBcIjE1JVwiKVxyXG4gICAgICAgIGNvbnN0IHRhcmdldFNlY3RvckFuZ2xlID0gMDsgLy8g0J3QsNC/0YDQuNC60LvQsNC0LCDRgdC10LrRgtC+0YAgMTUlINC90LAgNjDCsFxyXG5cclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTsgLy8g0JLQuNC/0LDQtNC60L7QstGWINC+0LHQtdGA0YLQuCAoNS0xMClcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgLy8g0JDQvdGW0LzQsNGG0ZbRjyDRh9C10YDQtdC3IENTU1xyXG4gICAgICAgIHdoZWVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xyXG4gICAgICAgIHRleHRTdGFydC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJ0blNwaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgLy8g0J/QvtCy0ZbQtNC+0LzQu9C10L3QvdGPINC/0ZbRgdC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y9cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyAgICBHU0FQIEFOSU1BVElPTlxyXG4vLyAgICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKFNjcm9sbFRyaWdnZXIpO1xyXG4vL1xyXG4vLyAgICAgICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zeW1wdG9tXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbi8vICAgICAgICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IG1lc3NhZ2VCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uIC5tZXNzYWdlLWJsb2NrXCIpO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQvtC90L7QstC70LXQvdC90Y8g0ZbQutC+0L3QvtC6INGC0LAg0LrQsNGA0YLQuNC90L7QulxyXG4vLyAgICAgICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbi8vICAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGdzYXAudG8oaW1hZ2UsIHsgb3BhY2l0eTogMSwgc2NhbGU6IDEsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGdzYXAudG8oaW1hZ2UsIHsgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uOyAvLyDQhtC60L7QvdC60LAg0L/RgNC40LLigJnRj9C30LDQvdCwINGH0LXRgNC10LcgZGF0YS1pY29uXHJcbi8vICAgICAgICAgICAgIGlmIChpY29uU3JjKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidGD0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuLy8gICAgICAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcclxuLy8gICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuLy8gICAgICAgICAgICAgICAgIGdzYXAuZnJvbVRvKGljb25FbGVtZW50LCB7IG9wYWNpdHk6IDAsIHk6IC0yMCB9LCB7IG9wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAwLjUgfSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9O1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0YHQuNC80L/RgtC+0LzRltCyXHJcbi8vICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgeyBvcGFjaXR5OiAwLCB5OiA1MCB9LFxyXG4vLyAgICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgeTogMCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC44LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc3ltcHRvbSxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDkwJVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIHJldmVyc2VcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRlcjogKCkgPT4gdXBkYXRlU3RhdGUoaW5kZXgpLCAvLyDQntC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0JDQvdGW0LzQsNGG0ZbRjyDQv9C+0Y/QstC4INCx0LvQvtC60YMg0Lcg0L/QvtCy0ZbQtNC+0LzQu9C10L3QvdGP0LxcclxuLy8gICAgICAgICBnc2FwLmZyb21UbyhtZXNzYWdlQmxvY2ssIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sIHtcclxuLy8gICAgICAgICAgICAgeTogMCxcclxuLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuLy8gICAgICAgICAgICAgZHVyYXRpb246IDEsXHJcbi8vICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuLy8gICAgICAgICAgICAgICAgIHRyaWdnZXI6IG1lc3NhZ2VCbG9jayxcclxuLy8gICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCAxMDAlXCIsXHJcbi8vICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIG5vbmVcIixcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICB9KTtcclxuXHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0lSTFxyXG4gICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFuaWZlc3RhdGlvbi1saXN0IHVsXCIpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpOyAvLyDQodC10LrRhtGW0Y8g0LfRliDRgdGC0ZbQutGWINC10YTQtdC60YLQvtC8XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTsgLy8g0IbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgbGV0IGlzTGFzdEFuaW1hdGlvbiA9IGZhbHNlOyAvLyDQpNC70LDQsywg0YfQuCDQstC40LrQvtC90YPRlNGC0YzRgdGPINC+0YHRgtCw0L3QvdGPINCw0L3RltC80LDRhtGW0Y9cclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gMTAwMDsgLy8g0JfQsNGC0YDQuNC80LrQsCDQv9C10YDQtdC0INC30L3Rj9GC0YLRj9C8INGB0YLRltC60ZYgKNC80YEpXHJcblxyXG4gICAgY29uc3Qgc2VjdGlvblRvcCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3ltcHRvbVN0ZXAgPSBzZWN0aW9uSGVpZ2h0IC8gc3ltcHRvbXMubGVuZ3RoOyAvLyDQktC40YHQvtGC0LAg0YHQtdC60YbRltGXINC00LvRjyDQutC+0LbQvdC+0LPQviDRgtC10LrRgdGC0L7QstC+0LPQviDQv9GD0L3QutGC0YNcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgLy8g0KDQvtCx0LjQvNC+INCy0YHRliDRgdC40LzQv9GC0L7QvNC4INGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHMsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpOyAvLyDQkNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpOyAvLyDQhtC90YjRliDQt9Cw0LvQuNGI0LDRjtGC0YzRgdGPINGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCU0LjQvdCw0LzRltGH0L3QviDQvtCx0YfQuNGB0LvRjtGU0LzQviDQt9GB0YPQsiBgdWxgINC90LAg0YjQuNGA0LjQvdGDINC/0L7Qv9C10YDQtdC00L3RltGFINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgIGxldCBzaGlmdFdpZHRoID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7IC8vINCU0L7QtNCw0ZTQvNC+INGI0LjRgNC40L3RgyDQtdC70LXQvNC10L3RgtGW0LIg0YLQsCBnYXAgKDhweClcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uO1xyXG4gICAgICAgIGlmIChpY29uU3JjKSB7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQntC90L7QstC70Y7RlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgLSBzZWN0aW9uVG9wO1xyXG5cclxuICAgICAgICBpZiAoIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCAqIHN5bXB0b21TdGVwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBzeW1wdG9tU3RlcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0LTRltC50YjQu9C4INC00L4g0L7RgdGC0LDQvdC90YzQvtGXINCw0L3RltC80LDRhtGW0ZdcclxuICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlzTGFzdEFuaW1hdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviDQt9Cw0YLRgNC40LzQutGDLCDQv9GW0YHQu9GPINGP0LrQvtGXINC30L3RltC80LDRlNC80L4gXCLRgdGC0LjQutC4XCJcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiOyAvLyDQodGC0ZbQutC4INCx0ZbQu9GM0YjQtSDQvdC1INCw0LrRgtC40LLQvdC40LlcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7IC8vINCX0L3RltC80LDRlNC80L4g0L/RgNC40LIn0Y/Qt9C60YMg0LTQviDQstC10YDRhdGDXHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnNjcm9sbCA9IFwiYXV0b1wiOyAvLyDQl9C90ZbQvNCw0ZTQvNC+INC/0YDQuNCyJ9GP0LfQutGDINC00L4g0LLQtdGA0YXRg1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoY3VycmVudFN5bXB0b21JbmRleCk7IC8vINCk0ZbQutGB0YPRlNC80L4g0L7RgdGC0LDQvdC90ZbQuSDRgdGC0LDQvVxyXG4gICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCf0YDQuNCyJ9GP0LfQutCwINGE0YPQvdC60YbRltGXINC00L4g0L/QvtC00ZbRlyDRgdC60YDQvtC70YNcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKTtcclxuLy9cclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiBzY2FsZXMgdGhlIGNvbnRhaW5lciB0byBmaXQgdGhlIHNjcmVlbi5cclxuLy8gZnVuY3Rpb24gc2NhbGVDb250YWluZXIoKSB7XHJcbi8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuaW1hdGlvbi1jb250YWluZXJcIik7XHJcbi8vICAgICBjb25zdCBzY2FsZSA9IE1hdGgubWluKGNvbnRhaW5lci5pbm5lcldpZHRoIC8gMTIwMCwgY29udGFpbmVyLmlubmVySGVpZ2h0IC8gMTAwNSk7XHJcbi8vICAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGV9KWA7XHJcbi8vIH1cclxuLy9cclxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2NhbGVDb250YWluZXIpO1xyXG4vLyBzY2FsZUNvbnRhaW5lcigpO1xyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24uXHJcblxyXG4vLyBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcbi8vIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKSAqIDE7XHJcbi8vIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuLy9cclxuLy8gLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24gZm9yIGVhY2ggY29tcG9uZW50LlxyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXBvbmVudFwiKS5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuLy8gICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG4vL1xyXG4vLyAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbi8vICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuLy8gICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4vLyAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4vLyAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbi8vICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbi8vICAgICB9KVxyXG4vLyAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuLy8gICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuLy8gICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuLy8gICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbi8vICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4vLyAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4vLyAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4vLyAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuLy8gICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuLy8gICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbi8vICAgICAgICAgfSk7XHJcbi8vIH0pO1xyXG4vL1xyXG4vLyBnc2FwLnRpbWVsaW5lKClcclxuLy8gICAgIC50byhcIi5jb21wb25lbnRzXCIsIHtcclxuLy8gICAgICAgICBzY2FsZTogMCxcclxuLy8gICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4vLyAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4vLyAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbi8vICAgICB9LCBcIis9NVwiKVxyXG4vLyAgICAgLmZyb20oXCIuaW1hZ2VzXCIsIHtcclxuLy8gICAgICAgICBzY2FsZTogMCxcclxuLy8gICAgICAgICBkdXJhdGlvbjogMixcclxuLy8gICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4vLyAgICAgfSwgXCIrPTJcIilcclxuLy8gICAgIC5mcm9tKFwiLmxvZ29cIiwge1xyXG4vLyAgICAgICAgIHg6IC00MDAsXHJcbi8vICAgICAgICAgZHVyYXRpb246IDEsXHJcbi8vICAgICB9LCBcIis9MC42XCIpO1xyXG5cclxufSlcclxuO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
