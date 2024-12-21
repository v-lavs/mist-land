/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {
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

//ACCORDION
    const accordionList = document.querySelectorAll(".accordion__item");

    accordionList.forEach((event) =>
        event.addEventListener("click", () => {
            if (event.classList.contains("active")) {
                event.classList.remove("active");
            } else {
                accordionList.forEach((event2) => event2.classList.remove("active"));
                event.classList.add("active");
            }
        })
    );

// SLIDER - TABS
    const titles = document.querySelectorAll('.swiper-container .swiper-slide');
    const title = [];
    titles.forEach(function (element) {
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
    function scaleContainer() {
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuLy8gTU9CSUxFIE1FTlVcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xyXG4gICAgY29uc3QgbmF2T3BlbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGJ0bkJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UnKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9LCAyNTApO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIFtidG5DbG9zZSwgYmFja2Ryb3AsIC4uLm1lbnVMaW5rc10uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldEVsZW1lbnQub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5tZW51X19pdGVtIGEnKTtcclxuXHJcbi8vQUNDT1JESU9OXHJcbiAgICBjb25zdCBhY2NvcmRpb25MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY2NvcmRpb25fX2l0ZW1cIik7XHJcblxyXG4gICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChldmVudCkgPT5cclxuICAgICAgICBldmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChldmVudDIpID0+IGV2ZW50Mi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbi8vIFNMSURFUiAtIFRBQlNcclxuICAgIGNvbnN0IHRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItY29udGFpbmVyIC5zd2lwZXItc2xpZGUnKTtcclxuICAgIGNvbnN0IHRpdGxlID0gW107XHJcbiAgICB0aXRsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIHRpdGxlLnB1c2goZWxlbWVudC5kYXRhc2V0LnRpdGxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIj4nICsgdGl0bGVbaW5kZXhdICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbi8vICAgIEdTQVAgQU5JTUFUSU9OXHJcbi8vICAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG4vLyAgICAgY29uc29sZS5sb2coU2Nyb2xsVHJpZ2dlcik7XHJcbi8vXHJcbi8vICAgICAgICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN5bXB0b21cIik7XHJcbi8vICAgICAgICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuLy8gICAgICAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbi8vICAgICAgICAgY29uc3QgbWVzc2FnZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb24gLm1lc3NhZ2UtYmxvY2tcIik7XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0KTRg9C90LrRhtGW0Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbi8vICAgICAgICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuLy8gICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4vLyAgICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbi8vICAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbi8vICAgICAgICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuLy8gICAgICAgICB9O1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCk0YPQvdC60YbRltGPINC+0L3QvtCy0LvQtdC90L3RjyDRltC60L7QvdC+0Log0YLQsCDQutCw0YDRgtC40L3QvtC6XHJcbi8vICAgICAgICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuLy8gICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9C10L3QvdGPINC60LDRgNGC0LjQvdC60LhcclxuLy8gICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZ3NhcC50byhpbWFnZSwgeyBvcGFjaXR5OiAxLCBzY2FsZTogMSwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZ3NhcC50byhpbWFnZSwgeyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvQtdC90L3RjyDRltC60L7QvdC60LhcclxuLy8gICAgICAgICAgICAgY29uc3QgaWNvblNyYyA9IHN5bXB0b21zW2luZGV4XS5kYXRhc2V0Lmljb247IC8vINCG0LrQvtC90LrQsCDQv9GA0LjQsuKAmdGP0LfQsNC90LAg0YfQtdGA0LXQtyBkYXRhLWljb25cclxuLy8gICAgICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuLy8gICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0YPRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuLy8gICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4vLyAgICAgICAgICAgICAgICAgZ3NhcC5mcm9tVG8oaWNvbkVsZW1lbnQsIHsgb3BhY2l0eTogMCwgeTogLTIwIH0sIHsgb3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IDAuNSB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH07XHJcbi8vXHJcbi8vICAgICAgICAgLy8g0JDQvdGW0LzQsNGG0ZbRjyDRgdC40LzQv9GC0L7QvNGW0LJcclxuLy8gICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBnc2FwLmZyb21UbyhcclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20sXHJcbi8vICAgICAgICAgICAgICAgICB7IG9wYWNpdHk6IDAsIHk6IDUwIH0sXHJcbi8vICAgICAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuLy8gICAgICAgICAgICAgICAgICAgICB5OiAwLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjgsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzeW1wdG9tLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogXCJ0b3AgOTAlXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgcmV2ZXJzZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB1cGRhdGVTdGF0ZShpbmRleCksIC8vINCe0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDINC00LvRjyDQutC+0LbQvdC+0LPQviDRgdC40LzQv9GC0L7QvNGDXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgICAvLyDQkNC90ZbQvNCw0YbRltGPINC/0L7Rj9Cy0Lgg0LHQu9C+0LrRgyDQtyDQv9C+0LLRltC00L7QvNC70LXQvdC90Y/QvFxyXG4vLyAgICAgICAgIGdzYXAuZnJvbVRvKG1lc3NhZ2VCbG9jaywgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSwge1xyXG4vLyAgICAgICAgICAgICB5OiAwLFxyXG4vLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICBkdXJhdGlvbjogMSxcclxuLy8gICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgdHJpZ2dlcjogbWVzc2FnZUJsb2NrLFxyXG4vLyAgICAgICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDEwMCVcIixcclxuLy8gICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgbm9uZVwiLFxyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgIH0pO1xyXG5cclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ltcHRvbVwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zeW1wdG9tLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7IC8vINCh0LXQutGG0ZbRjyDQt9GWINGB0YLRltC60ZYg0LXRhNC10LrRgtC+0LxcclxuXHJcbiAgICBsZXQgY3VycmVudFN5bXB0b21JbmRleCA9IC0xOyAvLyDQhtC90LTQtdC60YEg0L/QvtGC0L7Rh9C90L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7IC8vINCk0LvQsNCzLCDRh9C4INCy0LjQutC+0L3Rg9GU0YLRjNGB0Y8g0L7RgdGC0LDQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRj1xyXG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSAxMDAwOyAvLyDQl9Cw0YLRgNC40LzQutCwINC/0LXRgNC10LQg0LfQvdGP0YLRgtGP0Lwg0YHRgtGW0LrRliAo0LzRgSlcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7IC8vINCS0LjRgdC+0YLQsCDRgdC10LrRhtGW0Zcg0LTQu9GPINC60L7QttC90L7Qs9C+INGC0LXQutGB0YLQvtCy0L7Qs9C+INC/0YPQvdC60YLRg1xyXG5cclxuICAgIC8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YMg0LXQu9C10LzQtdC90YLRltCyXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vINCg0L7QsdC40LzQviDQstGB0ZYg0YHQuNC80L/RgtC+0LzQuCDRgNC+0LfQvNC40YLQuNC80LhcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcy5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTsgLy8g0JDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcy5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTsgLy8g0IbQvdGI0ZYg0LfQsNC70LjRiNCw0Y7RgtGM0YHRjyDRgNC+0LfQvNC40YLQuNC80LhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQlNC40L3QsNC80ZbRh9C90L4g0L7QsdGH0LjRgdC70Y7RlNC80L4g0LfRgdGD0LIgYHVsYCDQvdCwINGI0LjRgNC40L3RgyDQv9C+0L/QtdGA0LXQtNC90ZbRhSDQtdC70LXQvNC10L3RgtGW0LJcclxuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNoaWZ0V2lkdGggKz0gc3ltcHRvbXNbaV0ub2Zmc2V0V2lkdGggKyA4OyAvLyDQlNC+0LTQsNGU0LzQviDRiNC40YDQuNC90YMg0LXQu9C10LzQtdC90YLRltCyINGC0LAgZ2FwICg4cHgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bXB0b21MaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3NoaWZ0V2lkdGh9cHgpYDtcclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdLmRhdGFzZXQuaWNvbjtcclxuICAgICAgICBpZiAoaWNvblNyYykge1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiOyAvLyDQntGH0LjRidCw0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RliDRltC60L7QvdC60LhcclxuICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQsNC90ZbQvNCw0YbRltGOINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSAtIHNlY3Rpb25Ub3A7XHJcblxyXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDQtNGW0LnRiNC70Lgg0LTQviDQvtGB0YLQsNC90L3RjNC+0Zcg0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgaXNMYXN0QW5pbWF0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC30LDRgtGA0LjQvNC60YMsINC/0ZbRgdC70Y8g0Y/QutC+0Zcg0LfQvdGW0LzQsNGU0LzQviBcItGB0YLQuNC60LhcIlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7IC8vINCh0YLRltC60Lgg0LHRltC70YzRiNC1INC90LUg0LDQutGC0LjQstC90LjQuVxyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjsgLy8g0JfQvdGW0LzQsNGU0LzQviDQv9GA0LjQsifRj9C30LrRgyDQtNC+INCy0LXRgNGF0YNcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7IC8vINCX0L3RltC80LDRlNC80L4g0L/RgNC40LIn0Y/Qt9C60YMg0LTQviDQstC10YDRhdGDXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTsgLy8g0KTRltC60YHRg9GU0LzQviDQvtGB0YLQsNC90L3RltC5INGB0YLQsNC9XHJcbiAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vINCf0YDQuNCyJ9GP0LfQutCwINGE0YPQvdC60YbRltGXINC00L4g0L/QvtC00ZbRlyDRgdC60YDQvtC70YNcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKTtcclxuLy9cclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gc2NhbGVzIHRoZSBjb250YWluZXIgdG8gZml0IHRoZSBzY3JlZW4uXHJcbiAgICBmdW5jdGlvbiBzY2FsZUNvbnRhaW5lcigpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuaW1hdGlvbi1jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJXaWR0aCAvIDY5MCwgd2luZG93LmlubmVySGVpZ2h0IC8gMzg0KTtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGV9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2NhbGVDb250YWluZXIpO1xyXG4gICAgc2NhbGVDb250YWluZXIoKTtcclxuXHJcbi8vIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgYW5pbWF0aW9uLlxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgICAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHRoZSBhbmltYXRpb24gZm9yIGVhY2ggY29tcG9uZW50LlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoe3JlcGVhdDogLTEsIHlveW86IHRydWV9KTtcclxuXHJcbiAgICAgICAgICAgIHRsLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ3NhcC50aW1lbGluZSgpXHJcbiAgICAgICAgICAgIC50byhcIi5jb21wb25lbnRzXCIsIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJsaW5lYXJcIixcclxuICAgICAgICAgICAgfSwgXCIrPTVcIilcclxuICAgICAgICAgICAgLmZyb20oXCIuaW1hZ2VzXCIsIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxyXG4gICAgICAgICAgICB9LCBcIis9MlwiKVxyXG4gICAgICAgICAgICAuZnJvbShcIi5sb2dvXCIsIHtcclxuICAgICAgICAgICAgICAgIHg6IC00MDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMSxcclxuICAgICAgICAgICAgfSwgXCIrPTAuNlwiKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
