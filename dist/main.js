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

    const sliderAbout = new Swiper('.slider-about', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        pagination: {
            el: '.slider-about .swiper-pagination',
            clickable: true,
            // renderBullet: function (index, className) {
            //     return '<span class="' + className + '">' + title[index] + '</span>';
            // },
        },
    });

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
    const symptoms = document.querySelectorAll(".symptom");
    const symptomList = document.querySelector(".symptom-list ul");
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

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdTQVA6XCIsIGdzYXApO1xyXG4gICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyLCBTY3JvbGxUb1BsdWdpbik7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0RWxlbWVudC5vZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5idG5fdXAnKTtcclxuXHJcblxyXG4vL0FDQ09SRElPTlxyXG4gICAgY29uc3QgYWNjb3JkaW9uTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWNjb3JkaW9uX19pdGVtXCIpO1xyXG5cclxuICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0YbQtdC5INC10LvQtdC80LXQvdGCINCy0LbQtSDQsNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4g0LrQu9Cw0YEgXCJhY3RpdmVcIiDQtyDRg9GB0ZbRhSDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0LrQu9Cw0YEgXCJhY3RpdmVcIiDRgtGW0LvRjNC60Lgg0LTQviDQvdCw0YLQuNGB0L3Rg9GC0L7Qs9C+INC10LvQtdC80LXQvdGC0LAsINGP0LrRidC+INCy0ZbQvSDQvdC1INCx0YPQsiDQsNC60YLQuNCy0L3QuNC8XHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gU0xJREVSIC0gVEFCU1xyXG4vLyAgICAgY29uc3QgdGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1jb250YWluZXIgLnN3aXBlci1zbGlkZScpO1xyXG4vLyAgICAgY29uc3QgdGl0bGUgPSBbXTtcclxuLy8gICAgIHRpdGxlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbi8vICAgICAgICAgdGl0bGUucHVzaChlbGVtZW50LmRhdGFzZXQudGl0bGUpO1xyXG4vLyAgICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gcmVuZGVyQnVsbGV0OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCI+JyArIHRpdGxlW2luZGV4XSArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4vL0JUTi1VUFxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuLy8gUE9QVVBTXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG5cclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7IC8vINCi0YDQtdGC0ZbQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUtaWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuYXBwZW5kQ2hpbGQodGVtcGxhdGVDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlyZFBvcHVwQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnRyaWdnZXItcGxheScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjbG9zZVBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cCkpO1xyXG4gICAgY2xvc2VUaGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cCh0aGlyZFBvcHVwKSk7XHJcblxyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgY2xvc2VQb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgIH0pO1xyXG5cclxuLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbmNvbnN0IGJ0bkRpc2NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9kaXNjb3VudCcpXHJcblxyXG4gICAgICAgIC8vINCa0YPRgiDRgdC10LrRgtC+0YDRgywg0L3QsCDRj9C60L7QvNGDINC30YPQv9C40L3Rj9GU0YLRjNGB0Y8gKNC90LDQv9GA0LjQutC70LDQtCwgXCIxNSVcIilcclxuICAgICAgICBjb25zdCB0YXJnZXRTZWN0b3JBbmdsZSA9IDA7IC8vINCd0LDQv9GA0LjQutC70LDQtCwg0YHQtdC60YLQvtGAIDE1JSDQvdCwIDYwwrBcclxuXHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7IC8vINCS0LjQv9Cw0LTQutC+0LLRliDQvtCx0LXRgNGC0LggKDUtMTApXHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0YfQtdGA0LXQtyBDU1NcclxuICAgICAgICB3aGVlbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dG90YWxSb3RhdGlvbn1kZWcpYDtcclxuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBidG5TcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgIC8vINCf0L7QstGW0LTQvtC80LvQtdC90L3RjyDQv9GW0YHQu9GPINC30LDQstC10YDRiNC10L3QvdGPXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRFbmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gICAgR1NBUCBBTklNQVRJT05cclxuLy8gICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlcik7XHJcbi8vICAgICBjb25zb2xlLmxvZyhTY3JvbGxUcmlnZ2VyKTtcclxuLy9cclxuLy8gICAgICAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ltcHRvbVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuLy8gICAgICAgICBjb25zdCBtZXNzYWdlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvbiAubWVzc2FnZS1ibG9ja1wiKTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0L7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90L7QuiDRgtCwINC60LDRgNGC0LjQvdC+0LpcclxuLy8gICAgICAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4vLyAgICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjsgLy8g0IbQutC+0L3QutCwINC/0YDQuNCy4oCZ0Y/Qt9Cw0L3QsCDRh9C10YDQtdC3IGRhdGEtaWNvblxyXG4vLyAgICAgICAgICAgICBpZiAoaWNvblNyYykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnRg9GU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgICAgICBnc2FwLmZyb21UbyhpY29uRWxlbWVudCwgeyBvcGFjaXR5OiAwLCB5OiAtMjAgfSwgeyBvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQkNC90ZbQvNCw0YbRltGPINGB0LjQvNC/0YLQvtC80ZbQslxyXG4vLyAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGdzYXAuZnJvbVRvKFxyXG4vLyAgICAgICAgICAgICAgICAgc3ltcHRvbSxcclxuLy8gICAgICAgICAgICAgICAgIHsgb3BhY2l0eTogMCwgeTogNTAgfSxcclxuLy8gICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuOCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHN5bXB0b20sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA5MCVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSByZXZlcnNlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHVwZGF0ZVN0YXRlKGluZGV4KSwgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LTQu9GPINC60L7QttC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0L/QvtGP0LLQuCDQsdC70L7QutGDINC3INC/0L7QstGW0LTQvtC80LvQtdC90L3Rj9C8XHJcbi8vICAgICAgICAgZ3NhcC5mcm9tVG8obWVzc2FnZUJsb2NrLCB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LCB7XHJcbi8vICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4vLyAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBtZXNzYWdlQmxvY2ssXHJcbi8vICAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgMTAwJVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSBub25lXCIsXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG5cclxuLy8gLy8gQU5JTSBCTE9DSyBXSVRIIEdJUkxcclxuICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zeW1wdG9tXCIpO1xyXG4gICAgY29uc3Qgc3ltcHRvbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN5bXB0b20tbGlzdCB1bFwiKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbiAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICBjb25zdCBhbmltYXRpb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzdGlja3lUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja3ktdHJpZ2dlclwiKTsgLy8g0KHQtdC60YbRltGPINC30ZYg0YHRgtGW0LrRliDQtdGE0LXQutGC0L7QvFxyXG5cclxuICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7IC8vINCG0L3QtNC10LrRgSDQv9C+0YLQvtGH0L3QvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTsgLy8g0KTQu9Cw0LMsINGH0Lgg0LLQuNC60L7QvdGD0ZTRgtGM0YHRjyDQvtGB0YLQsNC90L3RjyDQsNC90ZbQvNCw0YbRltGPXHJcbiAgICBjb25zdCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbiA9IDEwMDA7IC8vINCX0LDRgtGA0LjQvNC60LAg0L/QtdGA0LXQtCDQt9C90Y/RgtGC0Y/QvCDRgdGC0ZbQutGWICjQvNGBKVxyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDsgLy8g0JLQuNGB0L7RgtCwINGB0LXQutGG0ZbRlyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YLQtdC60YHRgtC+0LLQvtCz0L4g0L/Rg9C90LrRgtGDXHJcblxyXG4gICAgLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbiAgICB9O1xyXG5cclxuICAgIC8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgLy8g0KDQvtCx0LjQvNC+INCy0YHRliDRgdC40LzQv9GC0L7QvNC4INGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHMsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpOyAvLyDQkNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpOyAvLyDQhtC90YjRliDQt9Cw0LvQuNGI0LDRjtGC0YzRgdGPINGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCU0LjQvdCw0LzRltGH0L3QviDQvtCx0YfQuNGB0LvRjtGU0LzQviDQt9GB0YPQsiBgdWxgINC90LAg0YjQuNGA0LjQvdGDINC/0L7Qv9C10YDQtdC00L3RltGFINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgIGxldCBzaGlmdFdpZHRoID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7IC8vINCU0L7QtNCw0ZTQvNC+INGI0LjRgNC40L3RgyDQtdC70LXQvNC10L3RgtGW0LIg0YLQsCBnYXAgKDhweClcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uO1xyXG4gICAgICAgIGlmIChpY29uU3JjKSB7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INCw0L3RltC80LDRhtGW0Y4g0L3QsCDQvtGB0L3QvtCy0ZYg0YHQutGA0L7Qu9GDXHJcbiAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZIC0gc2VjdGlvblRvcDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC00ZbQudGI0LvQuCDQtNC+INC+0YHRgtCw0L3QvdGM0L7RlyDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggPT09IHN5bXB0b21zLmxlbmd0aCAtIDEgJiYgIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBpc0xhc3RBbmltYXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0LfQsNGC0YDQuNC80LrRgywg0L/RltGB0LvRjyDRj9C60L7RlyDQt9C90ZbQvNCw0ZTQvNC+IFwi0YHRgtC40LrQuFwiXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjsgLy8g0KHRgtGW0LrQuCDQsdGW0LvRjNGI0LUg0L3QtSDQsNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnRvcCA9IFwiYXV0b1wiOyAvLyDQl9C90ZbQvNCw0ZTQvNC+INC/0YDQuNCyJ9GP0LfQutGDINC00L4g0LLQtdGA0YXRg1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5zY3JvbGwgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGN1cnJlbnRTeW1wdG9tSW5kZXgpOyAvLyDQpNGW0LrRgdGD0ZTQvNC+INC+0YHRgtCw0L3QvdGW0Lkg0YHRgtCw0L1cclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g0J/RgNC40LIn0Y/Qt9C60LAg0YTRg9C90LrRhtGW0Zcg0LTQviDQv9C+0LTRltGXINGB0LrRgNC+0LvRg1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwpO1xyXG4vL1xyXG5cclxuXHJcbi8vICAgIEFOSU1BVElPTiBQSUxMXHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBzY2FsZXMgdGhlIGNvbnRhaW5lciB0byBmaXQgdGhlIHNjcmVlbi5cclxuICAgIC8vIGZ1bmN0aW9uIHNjYWxlQ29udGFpbmVyKCkge1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5pbWF0aW9uLWNvbnRhaW5lclwiKTtcclxuICAgIC8vICAgICBjb25zdCBzY2FsZSA9IE1hdGgubWluKGNvbnRhaW5lci5pbm5lcldpZHRoIC8gMTIwMCwgY29udGFpbmVyLmlubmVySGVpZ2h0IC8gMTAwNSk7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3NjYWxlfSlgO1xyXG4gICAgLy8gfVxyXG4gICAgLy9cclxuICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNjYWxlQ29udGFpbmVyKTtcclxuICAgIC8vIHNjYWxlQ29udGFpbmVyKCk7XHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdGhlIGFuaW1hdGlvbi5cclxuXHJcbiAgICAvLyBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcbiAgICAvLyBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgLy8gY29uc3QgZ2V0Um90YXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG4gICAgLy9cclxuICAgIC8vIC8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uIGZvciBlYWNoIGNvbXBvbmVudC5cclxuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG4gICAgLy9cclxuICAgIC8vICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgIC8vICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgIC8vICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgIC8vICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAvLyAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAvLyAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgIC8vICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAvLyAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgLy8gICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAvLyAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgLy8gICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgIC8vICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAvLyAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgLy8gICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAvLyAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgLy8gICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gfSk7XHJcbiAgICAvL1xyXG4gICAgLy8gZ3NhcC50aW1lbGluZSgpXHJcbiAgICAvLyAgICAgLnRvKFwiLmNvbXBvbmVudHNcIiwge1xyXG4gICAgLy8gICAgICAgICBzY2FsZTogMCxcclxuICAgIC8vICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgIC8vICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAvLyAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAvLyAgICAgfSwgXCIrPTVcIilcclxuICAgIC8vICAgICAuZnJvbShcIi5pbWFnZXNcIiwge1xyXG4gICAgLy8gICAgICAgICBzY2FsZTogMCxcclxuICAgIC8vICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAvLyAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAvLyAgICAgfSwgXCIrPTJcIilcclxuICAgIC8vICAgICAuZnJvbShcIi5sb2dvXCIsIHtcclxuICAgIC8vICAgICAgICAgeDogLTQwMCxcclxuICAgIC8vICAgICAgICAgZHVyYXRpb246IDEsXHJcbiAgICAvLyAgICAgfSwgXCIrPTAuNlwiKTtcclxuXHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
