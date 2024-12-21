/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

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

    const titles = document.querySelectorAll('.swiper-container .swiper-slide');
    const title = [];
    titles.forEach(function(element) {
        title.push(element.dataset.title);
    });

   const sliderAbout = new Swiper('.slider-about', {
       spaceBetween: 10,
       slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + title[index] + '</span>';
            },
        },
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
    function scaleContainer () {
        const container = document.getElementById("animation-container");
        const scale = Math.min(window.innerWidth / 690, window.innerHeight / 384);
        container.style.transform = `scale(${scale})`;
    }

    window.addEventListener("resize", scaleContainer);
    scaleContainer();

// This function creates the animation.
    document.addEventListener("DOMContentLoaded", () => {
        const getCoordinatesRandomValue = () => Math.random() * 20 - 10;
        const getDurationRandomValue = () => 2 + Math.random() * 1;
        const getRotationRandomValue = () => Math.random() * 20 - 10;

        // This function creates the animation for each component.
        document.querySelectorAll(".component").forEach((component) => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

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

        gsap.timeline()
            .to(".components", {
                scale: 0,
                rotation: 360,
                duration: 2,
                ease: "linear",
            }, "+=5")
            .from(".images", {
                scale: 0,
                duration: 2,
                ease: "linear",
            }, "+=2")
            .from(".logo", {
                x: -400,
                duration: 1,
            }, "+=0.6");
    });

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0RWxlbWVudC5vZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItY29udGFpbmVyIC5zd2lwZXItc2xpZGUnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gW107XHJcbiAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdGl0bGUucHVzaChlbGVtZW50LmRhdGFzZXQudGl0bGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICBjb25zdCBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHJlbmRlckJ1bGxldDogZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPicgKyB0aXRsZVtpbmRleF0gKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuLy8gICAgR1NBUCBBTklNQVRJT05cclxuLy8gICAgIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlcik7XHJcbi8vICAgICBjb25zb2xlLmxvZyhTY3JvbGxUcmlnZ2VyKTtcclxuLy9cclxuLy8gICAgICAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ltcHRvbVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuLy8gICAgICAgICBjb25zdCBtZXNzYWdlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvbiAubWVzc2FnZS1ibG9ja1wiKTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0L7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90L7QuiDRgtCwINC60LDRgNGC0LjQvdC+0LpcclxuLy8gICAgICAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0LrQsNGA0YLQuNC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4vLyAgICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90LrQuFxyXG4vLyAgICAgICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjsgLy8g0IbQutC+0L3QutCwINC/0YDQuNCy4oCZ0Y/Qt9Cw0L3QsCDRh9C10YDQtdC3IGRhdGEtaWNvblxyXG4vLyAgICAgICAgICAgICBpZiAoaWNvblNyYykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnRg9GU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbi8vICAgICAgICAgICAgICAgICBnc2FwLmZyb21UbyhpY29uRWxlbWVudCwgeyBvcGFjaXR5OiAwLCB5OiAtMjAgfSwgeyBvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogMC41IH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQkNC90ZbQvNCw0YbRltGPINGB0LjQvNC/0YLQvtC80ZbQslxyXG4vLyAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGdzYXAuZnJvbVRvKFxyXG4vLyAgICAgICAgICAgICAgICAgc3ltcHRvbSxcclxuLy8gICAgICAgICAgICAgICAgIHsgb3BhY2l0eTogMCwgeTogNTAgfSxcclxuLy8gICAgICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuOCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHN5bXB0b20sXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA5MCVcIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSByZXZlcnNlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHVwZGF0ZVN0YXRlKGluZGV4KSwgLy8g0J7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LTQu9GPINC60L7QttC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuLy8gICAgICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0L/QvtGP0LLQuCDQsdC70L7QutGDINC3INC/0L7QstGW0LTQvtC80LvQtdC90L3Rj9C8XHJcbi8vICAgICAgICAgZ3NhcC5mcm9tVG8obWVzc2FnZUJsb2NrLCB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LCB7XHJcbi8vICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbi8vICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4vLyAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbi8vICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBtZXNzYWdlQmxvY2ssXHJcbi8vICAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgMTAwJVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogXCJwbGF5IG5vbmUgbm9uZSBub25lXCIsXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0lSTFxyXG4gICAgICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zeW1wdG9tXCIpO1xyXG4gICAgICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1wdG9tLWxpc3QgdWxcIik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgICAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpOyAvLyDQodC10LrRhtGW0Y8g0LfRliDRgdGC0ZbQutGWINC10YTQtdC60YLQvtC8XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7IC8vINCG0L3QtNC10LrRgSDQv9C+0YLQvtGH0L3QvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGB0LjQvNC/0YLQvtC80YNcclxuICAgICAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7IC8vINCk0LvQsNCzLCDRh9C4INCy0LjQutC+0L3Rg9GU0YLRjNGB0Y8g0L7RgdGC0LDQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRj1xyXG4gICAgICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gMTAwMDsgLy8g0JfQsNGC0YDQuNC80LrQsCDQv9C10YDQtdC0INC30L3Rj9GC0YLRj9C8INGB0YLRltC60ZYgKNC80YEpXHJcblxyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgICAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgc3ltcHRvbVN0ZXAgPSBzZWN0aW9uSGVpZ2h0IC8gc3ltcHRvbXMubGVuZ3RoOyAvLyDQktC40YHQvtGC0LAg0YHQtdC60YbRltGXINC00LvRjyDQutC+0LbQvdC+0LPQviDRgtC10LrRgdGC0L7QstC+0LPQviDQv9GD0L3QutGC0YNcclxuXHJcbiAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vINCg0L7QsdC40LzQviDQstGB0ZYg0YHQuNC80L/RgtC+0LzQuCDRgNC+0LfQvNC40YLQuNC80LhcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgocywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTsgLy8g0JDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpOyAvLyDQhtC90YjRliDQt9Cw0LvQuNGI0LDRjtGC0YzRgdGPINGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINCU0LjQvdCw0LzRltGH0L3QviDQvtCx0YfQuNGB0LvRjtGU0LzQviDQt9GB0YPQsiBgdWxgINC90LAg0YjQuNGA0LjQvdGDINC/0L7Qv9C10YDQtdC00L3RltGFINC10LvQtdC80LXQvdGC0ZbQslxyXG4gICAgICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7IC8vINCU0L7QtNCw0ZTQvNC+INGI0LjRgNC40L3RgyDQtdC70LXQvNC10L3RgtGW0LIg0YLQsCBnYXAgKDhweClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRofXB4KWA7XHJcblxyXG4gICAgICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjtcclxuICAgICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZIC0gc2VjdGlvblRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDQtNGW0LnRiNC70Lgg0LTQviDQvtGB0YLQsNC90L3RjNC+0Zcg0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xhc3RBbmltYXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviDQt9Cw0YLRgNC40LzQutGDLCDQv9GW0YHQu9GPINGP0LrQvtGXINC30L3RltC80LDRlNC80L4gXCLRgdGC0LjQutC4XCJcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7IC8vINCh0YLRltC60Lgg0LHRltC70YzRiNC1INC90LUg0LDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7IC8vINCX0L3RltC80LDRlNC80L4g0L/RgNC40LIn0Y/Qt9C60YMg0LTQviDQstC10YDRhdGDXHJcbiAgICAgICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5zY3JvbGwgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTsgLy8g0KTRltC60YHRg9GU0LzQviDQvtGB0YLQsNC90L3RltC5INGB0YLQsNC9XHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDQn9GA0LjQsifRj9C30LrQsCDRhNGD0L3QutGG0ZbRlyDQtNC+INC/0L7QtNGW0Zcg0YHQutGA0L7Qu9GDXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwpO1xyXG4vL1xyXG5cclxuXHJcbi8vICAgIEFOSU1BVElPTiBQSUxMXHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBzY2FsZXMgdGhlIGNvbnRhaW5lciB0byBmaXQgdGhlIHNjcmVlbi5cclxuICAgIGZ1bmN0aW9uIHNjYWxlQ29udGFpbmVyICgpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuaW1hdGlvbi1jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJXaWR0aCAvIDY5MCwgd2luZG93LmlubmVySGVpZ2h0IC8gMzg0KTtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGV9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2NhbGVDb250YWluZXIpO1xyXG4gICAgc2NhbGVDb250YWluZXIoKTtcclxuXHJcbi8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uLlxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgICAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24gZm9yIGVhY2ggY29tcG9uZW50LlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoeyByZXBlYXQ6IC0xLCB5b3lvOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBnc2FwLnRpbWVsaW5lKClcclxuICAgICAgICAgICAgLnRvKFwiLmNvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4gICAgICAgICAgICB9LCBcIis9NVwiKVxyXG4gICAgICAgICAgICAuZnJvbShcIi5pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIH0sIFwiKz0yXCIpXHJcbiAgICAgICAgICAgIC5mcm9tKFwiLmxvZ29cIiwge1xyXG4gICAgICAgICAgICAgICAgeDogLTQwMCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgICB9LCBcIis9MC42XCIpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
