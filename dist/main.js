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

   const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + title[index] + '</span>';
            },
        },
    });

//    GSAP ANIMATION
    gsap.registerPlugin(ScrollTrigger);
    console.log(ScrollTrigger);
    document.addEventListener("DOMContentLoaded", () => {
        const symptoms = document.querySelectorAll(".symptom");
        const images = document.querySelectorAll(".image");
        const iconsContainer = document.querySelector(".icons");
        const messageBlock = document.querySelector(".section-manifestation .message-block");

        // Функція визначення, яка картинка відповідає поточному симптому
        const getImageIndexForSymptom = (symptomIndex) => {
            if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
            if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
            if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
            if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
            return -1; // Без картинки
        };

        // Функція оновлення іконок та картинок
        const updateState = (index) => {
            // Оновлення картинки
            const newImageIndex = getImageIndexForSymptom(index);
            images.forEach((image, imgIndex) => {
                if (imgIndex === newImageIndex) {
                    gsap.to(image, { opacity: 1, scale: 1, duration: 0.5 });
                } else {
                    gsap.to(image, { opacity: 0, scale: 0.95, duration: 0.5 });
                }
            });

            // Оновлення іконки
            const iconSrc = symptoms[index].dataset.icon; // Іконка прив’язана через data-icon
            if (iconSrc) {
                iconsContainer.innerHTML = ""; // Очищуємо попередні іконки
                const iconElement = document.createElement("img");
                iconElement.src = iconSrc;
                iconElement.classList.add("icon");
                iconsContainer.appendChild(iconElement);
                gsap.fromTo(iconElement, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
            }
        };

        // Анімація симптомів
        symptoms.forEach((symptom, index) => {
            gsap.fromTo(
                symptom,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: symptom,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        onEnter: () => updateState(index), // Оновлення стану для кожного симптому
                    },
                }
            );
        });

        // Анімація появи блоку з повідомленням
        gsap.fromTo(messageBlock, { y: 100, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: messageBlock,
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });
    });



// // ANIM BLOCK WITH GERL
//         const symptoms = document.querySelectorAll(".symptom");
//         const symptomList = document.querySelector(".symptom-list ul");
//         const images = document.querySelectorAll(".image");
//         const iconsContainer = document.querySelector(".icons");
//         const animationSection = document.querySelector(".section-manifestation");
//         const stickyTrigger = document.querySelector(".sticky-trigger"); // Секція зі стікі ефектом
//
//         let currentSymptomIndex = -1; // Індекс поточного активного симптому
//         let isLastAnimation = false; // Флаг, чи виконується остання анімація
//         const delayAfterLastAnimation = 1000; // Затримка перед зняттям стікі (мс)
//
//         const sectionTop = animationSection.offsetTop;
//         const sectionHeight = animationSection.offsetHeight;
//         const symptomStep = sectionHeight / symptoms.length; // Висота секції для кожного текстового пункту
//
//         // Функція для визначення, яка картинка відповідає поточному симптому
//         const getImageIndexForSymptom = (symptomIndex) => {
//             if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
//             if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
//             if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
//             if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
//             return -1; // Без картинки
//         };
//
//         // Функція для оновлення стану елементів
//         const updateState = (index) => {
//             // Робимо всі симптоми розмитими
//             symptoms.forEach((s, i) => {
//                 if (i === index) {
//                     s.classList.add("visible"); // Активний
//                 } else {
//                     s.classList.remove("visible"); // Інші залишаються розмитими
//                 }
//             });
//
//             // Динамічно обчислюємо зсув `ul` на ширину попередніх елементів
//             let shiftWidth = 0;
//             for (let i = 0; i < index; i++) {
//                 shiftWidth += symptoms[i].offsetWidth + 8; // Додаємо ширину елементів та gap (8px)
//             }
//             symptomList.style.transform = `translateX(-${shiftWidth}px)`;
//
//             // Показуємо відповідну картинку
//             const newImageIndex = getImageIndexForSymptom(index);
//             images.forEach((image, imgIndex) => {
//                 if (imgIndex === newImageIndex) {
//                     image.classList.add("visible");
//                 } else {
//                     image.classList.remove("visible");
//                 }
//             });
//
//             // Оновлюємо іконки
//             const iconSrc = symptoms[index].dataset.icon;
//             if (iconSrc) {
//                 iconsContainer.innerHTML = ""; // Очищаємо попередні іконки
//                 const iconElement = document.createElement("img");
//                 iconElement.src = iconSrc;
//                 iconElement.classList.add("icon", "visible");
//                 iconsContainer.appendChild(iconElement);
//             }
//         };
//
//         // Оновлюємо анімацію на основі скролу
//         const updateAnimationOnScroll = () => {
//             const scrollPosition = window.scrollY - sectionTop;
//
//             if (!isLastAnimation) {
//                 symptoms.forEach((symptom, index) => {
//                     const start = index * symptomStep;
//                     const end = start + symptomStep;
//
//                     if (scrollPosition >= start && scrollPosition < end) {
//                         if (currentSymptomIndex !== index) {
//                             currentSymptomIndex = index;
//                             updateState(index);
//                         }
//                     }
//                 });
//             }
//
//             // Перевіряємо, чи дійшли до останньої анімації
//             if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
//                 isLastAnimation = true;
//
//
//                 // Додаємо затримку, після якої знімаємо "стики"
//                 setTimeout(() => {
//                     stickyTrigger.style.position = "relative"; // Стіки більше не активний
//                     stickyTrigger.style.top = "auto"; // Знімаємо прив'язку до верху
//                     stickyTrigger.style.height = "auto"; // Знімаємо прив'язку до верху
//                     updateState(currentSymptomIndex); // Фіксуємо останній стан
//                 }, delayAfterLastAnimation);
//             }
//         };
//
//         // Прив'язка функції до події скролу
//         window.addEventListener("scroll", updateAnimationOnScroll);
// //


//    ANIMATION PILL

    // This function scales the container to fit the screen.
    function scaleContainer () {
        const container = document.getElementById("animation-container");
        const scale = Math.min(window.innerWidth / 1200, window.innerHeight / 1005);
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0RWxlbWVudC5vZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLm1lbnVfX2l0ZW0gYScpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItY29udGFpbmVyIC5zd2lwZXItc2xpZGUnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gW107XHJcbiAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdGl0bGUucHVzaChlbGVtZW50LmRhdGFzZXQudGl0bGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIj4nICsgdGl0bGVbaW5kZXhdICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbi8vICAgIEdTQVAgQU5JTUFUSU9OXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG4gICAgY29uc29sZS5sb2coU2Nyb2xsVHJpZ2dlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN5bXB0b21cIik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgICAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb24gLm1lc3NhZ2UtYmxvY2tcIik7XHJcblxyXG4gICAgICAgIC8vINCk0YPQvdC60YbRltGPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0L7QvdC+0LLQu9C10L3QvdGPINGW0LrQvtC90L7QuiDRgtCwINC60LDRgNGC0LjQvdC+0LpcclxuICAgICAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDQntC90L7QstC70LXQvdC90Y8g0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCBkdXJhdGlvbjogMC41IH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKGltYWdlLCB7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCBkdXJhdGlvbjogMC41IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDRltC60L7QvdC60LhcclxuICAgICAgICAgICAgY29uc3QgaWNvblNyYyA9IHN5bXB0b21zW2luZGV4XS5kYXRhc2V0Lmljb247IC8vINCG0LrQvtC90LrQsCDQv9GA0LjQsuKAmdGP0LfQsNC90LAg0YfQtdGA0LXQtyBkYXRhLWljb25cclxuICAgICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0YPRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgZ3NhcC5mcm9tVG8oaWNvbkVsZW1lbnQsIHsgb3BhY2l0eTogMCwgeTogLTIwIH0sIHsgb3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IDAuNSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0YHQuNC80L/RgtC+0LzRltCyXHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLFxyXG4gICAgICAgICAgICAgICAgeyBvcGFjaXR5OiAwLCB5OiA1MCB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC44LFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc3ltcHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDkwJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIHJldmVyc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRlcjogKCkgPT4gdXBkYXRlU3RhdGUoaW5kZXgpLCAvLyDQntC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3RgyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCQ0L3RltC80LDRhtGW0Y8g0L/QvtGP0LLQuCDQsdC70L7QutGDINC3INC/0L7QstGW0LTQvtC80LvQtdC90L3Rj9C8XHJcbiAgICAgICAgZ3NhcC5mcm9tVG8obWVzc2FnZUJsb2NrLCB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LCB7XHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBtZXNzYWdlQmxvY2ssXHJcbiAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgOTAlXCIsXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiBcInBsYXkgbm9uZSBub25lIG5vbmVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0VSTFxyXG4vLyAgICAgICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zeW1wdG9tXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1wdG9tLWxpc3QgdWxcIik7XHJcbi8vICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbi8vICAgICAgICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4vLyAgICAgICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpOyAvLyDQodC10LrRhtGW0Y8g0LfRliDRgdGC0ZbQutGWINC10YTQtdC60YLQvtC8XHJcbi8vXHJcbi8vICAgICAgICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTsgLy8g0IbQvdC00LXQutGBINC/0L7RgtC+0YfQvdC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTsgLy8g0KTQu9Cw0LMsINGH0Lgg0LLQuNC60L7QvdGD0ZTRgtGM0YHRjyDQvtGB0YLQsNC90L3RjyDQsNC90ZbQvNCw0YbRltGPXHJcbi8vICAgICAgICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSAxMDAwOyAvLyDQl9Cw0YLRgNC40LzQutCwINC/0LXRgNC10LQg0LfQvdGP0YLRgtGP0Lwg0YHRgtGW0LrRliAo0LzRgSlcclxuLy9cclxuLy8gICAgICAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbi8vICAgICAgICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4vLyAgICAgICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDsgLy8g0JLQuNGB0L7RgtCwINGB0LXQutGG0ZbRlyDQtNC70Y8g0LrQvtC20L3QvtCz0L4g0YLQtdC60YHRgtC+0LLQvtCz0L4g0L/Rg9C90LrRgtGDXHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LXQu9C10LzQtdC90YLRltCyXHJcbi8vICAgICAgICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgLy8g0KDQvtCx0LjQvNC+INCy0YHRliDRgdC40LzQv9GC0L7QvNC4INGA0L7Qt9C80LjRgtC40LzQuFxyXG4vLyAgICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzLCBpKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpOyAvLyDQkNC60YLQuNCy0L3QuNC5XHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7IC8vINCG0L3RiNGWINC30LDQu9C40YjQsNGO0YLRjNGB0Y8g0YDQvtC30LzQuNGC0LjQvNC4XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAvLyDQlNC40L3QsNC80ZbRh9C90L4g0L7QsdGH0LjRgdC70Y7RlNC80L4g0LfRgdGD0LIgYHVsYCDQvdCwINGI0LjRgNC40L3RgyDQv9C+0L/QtdGA0LXQtNC90ZbRhSDQtdC70LXQvNC10L3RgtGW0LJcclxuLy8gICAgICAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcclxuLy8gICAgICAgICAgICAgICAgIHNoaWZ0V2lkdGggKz0gc3ltcHRvbXNbaV0ub2Zmc2V0V2lkdGggKyA4OyAvLyDQlNC+0LTQsNGU0LzQviDRiNC40YDQuNC90YMg0LXQu9C10LzQtdC90YLRltCyINGC0LAgZ2FwICg4cHgpXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4vLyAgICAgICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4vLyAgICAgICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0uZGF0YXNldC5pY29uO1xyXG4vLyAgICAgICAgICAgICBpZiAoaWNvblNyYykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjsgLy8g0J7Rh9C40YnQsNGU0LzQviDQv9C+0L/QtdGA0LXQtNC90ZYg0ZbQutC+0L3QutC4XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbi8vICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIiwgXCJ2aXNpYmxlXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuLy8gICAgICAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSAtIHNlY3Rpb25Ub3A7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgICAgIC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0LTRltC50YjQu9C4INC00L4g0L7RgdGC0LDQvdC90YzQvtGXINCw0L3RltC80LDRhtGW0ZdcclxuLy8gICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggPT09IHN5bXB0b21zLmxlbmd0aCAtIDEgJiYgIWlzTGFzdEFuaW1hdGlvbikge1xyXG4vLyAgICAgICAgICAgICAgICAgaXNMYXN0QW5pbWF0aW9uID0gdHJ1ZTtcclxuLy9cclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC30LDRgtGA0LjQvNC60YMsINC/0ZbRgdC70Y8g0Y/QutC+0Zcg0LfQvdGW0LzQsNGU0LzQviBcItGB0YLQuNC60LhcIlxyXG4vLyAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjsgLy8g0KHRgtGW0LrQuCDQsdGW0LvRjNGI0LUg0L3QtSDQsNC60YLQuNCy0L3QuNC5XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuLy8gICAgICAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiOyAvLyDQl9C90ZbQvNCw0ZTQvNC+INC/0YDQuNCyJ9GP0LfQutGDINC00L4g0LLQtdGA0YXRg1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGN1cnJlbnRTeW1wdG9tSW5kZXgpOyAvLyDQpNGW0LrRgdGD0ZTQvNC+INC+0YHRgtCw0L3QvdGW0Lkg0YHRgtCw0L1cclxuLy8gICAgICAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0J/RgNC40LIn0Y/Qt9C60LAg0YTRg9C90LrRhtGW0Zcg0LTQviDQv9C+0LTRltGXINGB0LrRgNC+0LvRg1xyXG4vLyAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKTtcclxuLy8gLy9cclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gc2NhbGVzIHRoZSBjb250YWluZXIgdG8gZml0IHRoZSBzY3JlZW4uXHJcbiAgICBmdW5jdGlvbiBzY2FsZUNvbnRhaW5lciAoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbmltYXRpb24tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5taW4od2luZG93LmlubmVyV2lkdGggLyAxMjAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDA1KTtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGV9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2NhbGVDb250YWluZXIpO1xyXG4gICAgc2NhbGVDb250YWluZXIoKTtcclxuXHJcbi8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uLlxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgICAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24gZm9yIGVhY2ggY29tcG9uZW50LlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoeyByZXBlYXQ6IC0xLCB5b3lvOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBnc2FwLnRpbWVsaW5lKClcclxuICAgICAgICAgICAgLnRvKFwiLmNvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4gICAgICAgICAgICB9LCBcIis9NVwiKVxyXG4gICAgICAgICAgICAuZnJvbShcIi5pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIH0sIFwiKz0yXCIpXHJcbiAgICAgICAgICAgIC5mcm9tKFwiLmxvZ29cIiwge1xyXG4gICAgICAgICAgICAgICAgeDogLTQwMCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgICB9LCBcIis9MC42XCIpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
