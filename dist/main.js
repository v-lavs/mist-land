/*
* to include js file write: `//= include ./path-to-file`
* */


document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.ticker.lagSmoothing(1000, 33);
    gsap.ticker.fps(60);

    const body = document.body;

    // Mobile Menu
    const nav = document.querySelector('.header__nav');
    const navOpenHeader = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn_burger');
    const btnClose = document.querySelector('.btn_close');
    const menuLinks = document.querySelectorAll('.menu__link');

    const toggleMenu = (isOpen) => {
        nav.classList.toggle('open', isOpen);
        navOpenHeader.classList.toggle('hidden', !isOpen);
        body.classList.toggle('disable-scroll', isOpen);
        navOpenHeader.classList.toggle('active', isOpen);
        btnClose.style.display = isOpen ? 'flex' : 'none';
    };

    btnBurger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(true);
    });

    [btnClose, ...menuLinks].forEach((element) => {
        element.addEventListener('click', () => toggleMenu(false));
    });

    // Header Scroll Animation
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const direction = scrollTop > lastScrollTop ? 'up' : 'down';

        gsap.to(header, {
            y: direction === 'up' ? '-100%' : '0%',
            duration: 0.5,
            ease: 'power2.out',
        });

        header.classList.toggle('active', scrollTop < lastScrollTop || scrollTop === 0);
        lastScrollTop = scrollTop;
    });

    // Scroll to Anchor
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(anchor.getAttribute('href').substring(1));
            if (targetElement) {
                gsap.to(window, {
                    scrollTo: targetElement,
                    duration: 1.5,
                    ease: 'power2.out',
                    onComplete: () => ScrollTrigger.refresh(),
                });
            }
        });
    });

    // Accordion
    document.querySelectorAll('.accordion__item').forEach((item) => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion__item').forEach((item) => item.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Swiper Initialization
    const initSwiper = () => {
        const sliderAboutConfig = window.innerWidth >= 1024
            ? {effect: 'fade', speed: 1000}
            : {spaceBetween: 10, slidesPerView: 'auto', breakpoints: {768: {spaceBetween: 20}}};

        const sliderAbout = new Swiper('.slider-about', {
            ...sliderAboutConfig,
            pagination: {el: '.slider-about .swiper-pagination', clickable: true},
            on: {slideChange: updateCustomNavigation},
        });

        setupCustomNavigation(sliderAbout);
    };

    const updateCustomNavigation = (sliderAbout) => {
        document.querySelectorAll('.about-nav__btn').forEach((btn, index) => {
            btn.classList.toggle('active', index === sliderAbout.realIndex);
        });
    };

    const setupCustomNavigation = (sliderAbout) => {
        document.querySelectorAll('.about-nav__btn').forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                sliderAbout.slideTo(index);
            });
        });
    };

    window.addEventListener('load', initSwiper);
    window.addEventListener('resize', initSwiper);

    // Back-to-Top Button
    const goTopBtn = document.querySelector('.btn_up');
    const trackScroll = () => {
        goTopBtn.classList.toggle('show', window.scrollY > document.documentElement.clientHeight);
    };

    goTopBtn.addEventListener('click', () => {
        gsap.to(window, {scrollTo: 0, duration: 1, ease: 'power2.out'});
    });

    window.addEventListener('scroll', trackScroll);

    // Popup Logic
    const overlay = document.querySelector('.overlay');
    const openPopup = (popup) => {
        popup.classList.add('open');
        overlay.classList.add('show');
        body.classList.add('disable-scroll');
    };

    const closePopup = (popup) => {
        popup.classList.remove('open');
        if (!document.querySelector('.popup.show')) {
            overlay.classList.remove('show');
            body.classList.remove('disable-scroll');
        }
    };

    const popups = {modal: document.getElementById('modal'), thirdPopup: document.getElementById('playDiscount')};
    document.querySelectorAll('.open-popup').forEach((button) => {
        button.addEventListener('click', () => {
            const popup = popups.modal;
            openPopup(popup);
        });
    });

    document.getElementById('closePopup').addEventListener('click', () => closePopup(popups.modal));
    document.getElementById('closeThirdPopup').addEventListener('click', () => closePopup(popups.thirdPopup));
    overlay.addEventListener('click', () => Object.values(popups).forEach(closePopup));
alert(222)
    /* Animations for sections */
    // SPIN ROULETTE
    const wheel = document.getElementById('wheel');
    const wheelData = document.getElementById('wheelData');
    const btnSpin = document.getElementById('spinButton');
    const textStart = document.querySelector('.text-start');
    const textEnd = document.querySelector('.text-end');
    const btnDiscount = document.querySelector('.btn_discount');

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

    wheel.addEventListener('click', spinWheel);
    btnSpin.addEventListener('click', spinWheel);

// // ANIM BLOCK WITH GIRL

    // const tl1 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.sticky-trigger',
    //         start: 'top top',
    //         end: '+=250%',
    //         pin: true,
    //         spinWheel: true,
    //         pinSpacing: true,
    //         toggleActions: 'play none none reverse',
    //         onUpdate: self => updateAnimationOnScroll(self.progress),
    //     }
    // });

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

    const isMobile = () => window.innerWidth < 768;

// Функція для оновлення стилів симптомів на десктопі

//     const updateSymptomsStylesDesktop = (currentIndex) => {
//         symptoms.forEach((symptom, i) => {
//             if (i <= currentIndex) {
//                 symptom.style.fontSize = '20px';
//                 symptom.style.opacity = '1';
//                 symptom.style.filter = 'blur(0)';
//             } else {
//                 const factor = Math.abs(i - currentIndex);
//                 const opacity = 0.6 - factor * (0.6 - 0.2) / symptoms.length;
//                 const blur = factor * (4 / symptoms.length);
//
//                 symptom.style.fontSize = '16px';
//                 symptom.style.opacity = opacity.toFixed(2);
//                 symptom.style.filter = `blur(${blur}px)`;
//             }
//         });
//     };

// Функція для оновлення стилів симптомів на мобільних

//     const updateSymptomsStylesMobile = (currentIndex) => {
//         symptoms.forEach((symptom, i) => {
//             if (i <= currentIndex) {
//
//                 symptom.style.opacity = '1';
//                 symptom.style.filter = 'blur(0)';
//             } else {
//
//                 symptom.style.opacity = '0.3';
//             }
//             symptom.style.fontSize = '16px';
//         });
//         let shiftWidth = 0;
//         for (let i = 0; i < currentIndex; i++) {
//             shiftWidth += symptoms[i].offsetWidth + 8;
//         }
//         symptomList.style.transform = `translateX(-${shiftWidth}px)`;
//     };

// Функція для оновлення стану

//     const updateState = (index) => {
//         if (isMobile()) {
//             updateSymptomsStylesMobile(index);
//         } else {
//             updateSymptomsStylesDesktop(index);
//         }
//
//         // Показуємо відповідну картинку
//         const newImageIndex = getImageIndexForSymptom(index);
//         images.forEach((image, imgIndex) => {
//             if (imgIndex === newImageIndex) {
//                 image.classList.add("visible");
//             } else {
//                 image.classList.remove("visible");
//             }
//         });
//
//         // Оновлюємо іконки
//         const iconSrc = symptoms[index]?.dataset.icon;
//         if (iconSrc) {
//             iconsContainer.innerHTML = "";
//             const iconElement = document.createElement("img");
//             iconElement.src = iconSrc;
//             iconElement.classList.add("icon", "visible");
//             iconsContainer.appendChild(iconElement);
//         }
//     };

// Оновлення анімації на основі скролу
//     const updateAnimationOnScroll = (progress) => {
//         const scrollPosition = progress * sectionHeight;
//
//         if (!isLastAnimation) {
//             symptoms.forEach((symptom, index) => {
//                 const start = index * symptomStep;
//                 const end = start + symptomStep;
//
//                 if (scrollPosition >= start && scrollPosition < end) {
//                     if (currentSymptomIndex !== index) {
//                         currentSymptomIndex = index;
//                         updateState(index); // Оновлюємо стан на основі індексу
//                     }
//                 }
//             });
//         }
//
//         // Логіка для завершення анімації
//         if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
//             setTimeout(() => {
//                 stickyTrigger.style.position = "relative";
//                 stickyTrigger.style.top = "auto";
//                 stickyTrigger.style.scroll = "auto";
//                 stickyTrigger.style.height = "auto";
//                 updateState(currentSymptomIndex);
//                 ScrollTrigger.refresh();
//             }, delayAfterLastAnimation);
//         }
//     };

// Функція для визначення, яка картинка відповідає поточному симптому
//     const getImageIndexForSymptom = (symptomIndex) => {
//         if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
//         if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
//         if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
//         if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)
//         return -1; // Без картинки
//     };


//    ANIMATION PILL
    const getCoordinatesRandomValue = () => Math.random() * 20 - 10;
    const getDurationRandomValue = () => 2 + Math.random();
    const getRotationRandomValue = () => Math.random() * 20 - 10;

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
            trigger: "#about",
            start: "top 35%",
            onEnter: () => {
                document.getElementById("about").classList.add("timeline-started");
            },
        },
    });
    timeline
        .to(".pill-anim__components", {
            scale: 0.2,
            opacity: 0,
            rotation: 360,
            duration: 1.5,
            ease: "power1.in",
        }, "+=0.8")
        .from(".pill-anim__images", {
            opacity: 1,
            scale: 0,
            duration: 1.5,
            ease: "power1.out"
        }, "-=1")
        .from(".pill-anim__logo", {
            opacity: 0,
            xPercent: -150,
            duration: 0.6,
        }, "-=0.1");


// ANIM SECTION STICKY
//     ScrollTrigger.matchMedia({
//         "(min-width: 768px)": function () {
//             const tl2 = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: '.sticky-grid__img-block',
//                     start: 'top top',
//                     end: 'center top',
//                     pin: true,
//                     pinSpacing: false,
//                     anticipatePin: 1
//                 }
//             });
//         }
//     });
//     window.addEventListener('resize', () => {
//         ScrollTrigger.refresh();
//     });


//HOVER PARALLAX
//     if (window.innerWidth >= 1024) {
//         const containers = document.querySelectorAll('.container-parallax');
//
//         containers.forEach(container => {
//             let rect = container.getBoundingClientRect();
//             const mouse = {x: 0, y: 0, moved: false};
//
//             container.addEventListener('mousemove', (e) => {
//                 mouse.moved = true;
//                 mouse.x = e.clientX - rect.left;
//                 mouse.y = e.clientY - rect.top;
//             });
//
//             gsap.ticker.add(() => {
//                 if (mouse.moved) {
//                     parallaxIt(container.querySelector('.img-parallax'), 10);
//                     parallaxIt(container.querySelector('.back-wave-parallax'), -20);
//                 }
//                 mouse.moved = false;
//             });
//
//             function parallaxIt(target, movement) {
//                 if (!target) return;
//                 gsap.to(target, {
//                     duration: 0.5,
//                     x: (mouse.x - rect.width / 2) / rect.width * movement,
//                     y: (mouse.y - rect.height / 2) / rect.height * movement
//                 });
//             }
//
//             window.addEventListener('resize', updateRect);
//             window.addEventListener('scroll', updateRect);
//
//             function updateRect() {
//                 rect = container.getBoundingClientRect();
//             }
//         });
//     }


//ANIM TITLE
//     const sections2 = gsap.utils.toArray('.section-anim');
//
//     sections2.forEach((section) => {
//         const elements = gsap.utils.toArray('.anim-title, .anim-subtitle', section);
//
//         elements.forEach((el) => {
//             const isTitle = el.classList.contains('anim-title');
//             const delay = isTitle ? 0.4 : 0.2;
//
//             const anim = gsap.fromTo(
//                 el,
//                 {opacity: 0, y: -100},
//                 {duration: 1, opacity: 1, y: 0}
//             );
//
//             ScrollTrigger.create({
//                 trigger: el,
//                 start: 'top center',
//                 animation: anim,
//                 stagger: delay,
//                 onLeaveBack: (self) => self.disable(),
//                 once: true,
//             });
//         });
//     });

// ANIM ELEMENTS SECTION

//     const sections = gsap.utils.toArray('.anim-container');
//     sections.forEach((section) => {
//         const items = gsap.utils.toArray('.anim-item', section);
//         gsap.fromTo(
//             items,
//             {opacity: 0, y: 100},
//             {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.6,
//                 stagger: 0.2,
//                 ease: "power1.in",
//                 scrollTrigger: {
//                     trigger: section,
//                     start: 'top 75%',
//                     toggleActions: 'play none none none',
//                     once: true,
//                 },
//             }
//         );
//     });
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoaXNPcGVuKSA9PiB7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJywgIWlzT3Blbik7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlLXNjcm9sbCcsIGlzT3Blbik7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc09wZW4pO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBpc09wZW4gPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRvZ2dsZU1lbnUodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNZW51KGZhbHNlKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIZWFkZXIgU2Nyb2xsIEFuaW1hdGlvblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbiAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzY3JvbGxUb3AgPiBsYXN0U2Nyb2xsVG9wID8gJ3VwJyA6ICdkb3duJztcclxuXHJcbiAgICAgICAgZ3NhcC50byhoZWFkZXIsIHtcclxuICAgICAgICAgICAgeTogZGlyZWN0aW9uID09PSAndXAnID8gJy0xMDAlJyA6ICcwJScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIHNjcm9sbFRvcCA8IGxhc3RTY3JvbGxUb3AgfHwgc2Nyb2xsVG9wID09PSAwKTtcclxuICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2Nyb2xsIHRvIEFuY2hvclxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKS5mb3JFYWNoKChhbmNob3IpID0+IHtcclxuICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJykuc3Vic3RyaW5nKDEpKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8od2luZG93LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG86IHRhcmdldEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4gU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWNjb3JkaW9uXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJykuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTd2lwZXIgSW5pdGlhbGl6YXRpb25cclxuICAgIGNvbnN0IGluaXRTd2lwZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyQWJvdXRDb25maWcgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0XHJcbiAgICAgICAgICAgID8ge2VmZmVjdDogJ2ZhZGUnLCBzcGVlZDogMTAwMH1cclxuICAgICAgICAgICAgOiB7c3BhY2VCZXR3ZWVuOiAxMCwgc2xpZGVzUGVyVmlldzogJ2F1dG8nLCBicmVha3BvaW50czogezc2ODoge3NwYWNlQmV0d2VlbjogMjB9fX07XHJcblxyXG4gICAgICAgIGNvbnN0IHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgLi4uc2xpZGVyQWJvdXRDb25maWcsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJywgY2xpY2thYmxlOiB0cnVlfSxcclxuICAgICAgICAgICAgb246IHtzbGlkZUNoYW5nZTogdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbn0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbihzbGlkZXJBYm91dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpbmRleCA9PT0gc2xpZGVyQWJvdXQucmVhbEluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2V0dXBDdXN0b21OYXZpZ2F0aW9uID0gKHNsaWRlckFib3V0KSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyQWJvdXQuc2xpZGVUbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuICAgIC8vIEJhY2stdG8tVG9wIEJ1dHRvblxyXG4gICAgY29uc3QgZ29Ub3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwJyk7XHJcbiAgICBjb25zdCB0cmFja1Njcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jywgd2luZG93LnNjcm9sbFkgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZ3NhcC50byh3aW5kb3csIHtzY3JvbGxUbzogMCwgZHVyYXRpb246IDEsIGVhc2U6ICdwb3dlcjIub3V0J30pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU2Nyb2xsKTtcclxuXHJcbiAgICAvLyBQb3B1cCBMb2dpY1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcGVuUG9wdXAgPSAocG9wdXApID0+IHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKHBvcHVwKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcG9wdXBzID0ge21vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKSwgdGhpcmRQb3B1cDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpfTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cCA9IHBvcHVwcy5tb2RhbDtcclxuICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy5tb2RhbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMudGhpcmRQb3B1cCkpO1xyXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IE9iamVjdC52YWx1ZXMocG9wdXBzKS5mb3JFYWNoKGNsb3NlUG9wdXApKTtcclxuYWxlcnQoMjIyKVxyXG4gICAgLyogQW5pbWF0aW9ucyBmb3Igc2VjdGlvbnMgKi9cclxuICAgIC8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzcGluV2hlZWwoKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAzMDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7XHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIHdoZWVsRGF0YS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dG90YWxSb3RhdGlvbn1kZWcpYDtcclxuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBidG5TcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0RW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBidG5EaXNjb3VudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1mbGV4JztcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcblxyXG4gICAgLy8gY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAvLyAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgLy8gICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS10cmlnZ2VyJyxcclxuICAgIC8vICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgIC8vICAgICAgICAgZW5kOiAnKz0yNTAlJyxcclxuICAgIC8vICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBzcGluV2hlZWw6IHRydWUsXHJcbiAgICAvLyAgICAgICAgIHBpblNwYWNpbmc6IHRydWUsXHJcbiAgICAvLyAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSByZXZlcnNlJyxcclxuICAgIC8vICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4gdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwoc2VsZi5wcm9ncmVzcyksXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFuaWZlc3RhdGlvbi1saXN0IHVsXCIpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpO1xyXG5cclxuICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7XHJcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICBjb25zdCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbiA9IDUwMDtcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC00LXRgdC60YLQvtC/0ZZcclxuXHJcbi8vICAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGguYWJzKGkgLSBjdXJyZW50SW5kZXgpO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDAuNiAtIGZhY3RvciAqICgwLjYgLSAwLjIpIC8gc3ltcHRvbXMubGVuZ3RoO1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgYmx1ciA9IGZhY3RvciAqICg0IC8gc3ltcHRvbXMubGVuZ3RoKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5LnRvRml4ZWQoMik7XHJcbi8vICAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LzQvtCx0ZbQu9GM0L3QuNGFXHJcblxyXG4vLyAgICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuLy8gICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SW5kZXg7IGkrKykge1xyXG4vLyAgICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4vLyAgICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3Rg1xyXG5cclxuLy8gICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuLy8gICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUoaW5kZXgpO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcChpbmRleCk7XHJcbi8vICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgIC8vINCf0L7QutCw0LfRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDQutCw0YDRgtC40L3QutGDXHJcbi8vICAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuLy8gICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuLy8gICAgICAgICBjb25zdCBpY29uU3JjID0gc3ltcHRvbXNbaW5kZXhdPy5kYXRhc2V0Lmljb247XHJcbi8vICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuLy8gICAgICAgICAgICAgaWNvbnNDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4vLyAgICAgICAgICAgICBpY29uRWxlbWVudC5zcmMgPSBpY29uU3JjO1xyXG4vLyAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaWNvblwiLCBcInZpc2libGVcIik7XHJcbi8vICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9O1xyXG5cclxuLy8g0J7QvdC+0LLQu9C10L3QvdGPINCw0L3RltC80LDRhtGW0Zcg0L3QsCDQvtGB0L3QvtCy0ZYg0YHQutGA0L7Qu9GDXHJcbi8vICAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9IChwcm9ncmVzcykgPT4ge1xyXG4vLyAgICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gcHJvZ3Jlc3MgKiBzZWN0aW9uSGVpZ2h0O1xyXG4vL1xyXG4vLyAgICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbi8vICAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyDQntC90L7QstC70Y7RlNC80L4g0YHRgtCw0L0g0L3QsCDQvtGB0L3QvtCy0ZYg0ZbQvdC00LXQutGB0YNcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICAvLyDQm9C+0LPRltC60LAg0LTQu9GPINC30LDQstC10YDRiNC10L3QvdGPINCw0L3RltC80LDRhtGW0ZdcclxuLy8gICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XHJcbi8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcclxuLy8gICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7XHJcbi8vICAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnNjcm9sbCA9IFwiYXV0b1wiO1xyXG4vLyAgICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuLy8gICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGN1cnJlbnRTeW1wdG9tSW5kZXgpO1xyXG4vLyAgICAgICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbi8vICAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4vLyAgICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4vLyAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuLy8gICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbi8vICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuLy8gICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbi8vICAgICB9O1xyXG5cclxuXHJcbi8vICAgIEFOSU1BVElPTiBQSUxMXHJcbiAgICBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcbiAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBnZXRSb3RhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waWxsLWFuaW1fX2NvbXBvbmVudFwiKS5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoe3JlcGVhdDogLTEsIHlveW86IHRydWV9KTtcclxuXHJcbiAgICAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRpbWVsaW5lID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiBcIiNhYm91dFwiLFxyXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgMzUlXCIsXHJcbiAgICAgICAgICAgIG9uRW50ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWJvdXRcIikuY2xhc3NMaXN0LmFkZChcInRpbWVsaW5lLXN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgdGltZWxpbmVcclxuICAgICAgICAudG8oXCIucGlsbC1hbmltX19jb21wb25lbnRzXCIsIHtcclxuICAgICAgICAgICAgc2NhbGU6IDAuMixcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5cIixcclxuICAgICAgICB9LCBcIis9MC44XCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEub3V0XCJcclxuICAgICAgICB9LCBcIi09MVwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9fbG9nb1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHhQZXJjZW50OiAtMTUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgIH0sIFwiLT0wLjFcIik7XHJcblxyXG5cclxuLy8gQU5JTSBTRUNUSU9OIFNUSUNLWVxyXG4vLyAgICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKHtcclxuLy8gICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIGNvbnN0IHRsMiA9IGdzYXAudGltZWxpbmUoe1xyXG4vLyAgICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICBlbmQ6ICdjZW50ZXIgdG9wJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgYW50aWNpcGF0ZVBpbjogMVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbi8vICAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vL0hPVkVSIFBBUkFMTEFYXHJcbi8vICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4vLyAgICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyLXBhcmFsbGF4Jyk7XHJcbi8vXHJcbi8vICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XHJcbi8vICAgICAgICAgICAgIGxldCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4vLyAgICAgICAgICAgICBjb25zdCBtb3VzZSA9IHt4OiAwLCB5OiAwLCBtb3ZlZDogZmFsc2V9O1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbi8vICAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBnc2FwLnRpY2tlci5hZGQoKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKG1vdXNlLm1vdmVkKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmltZy1wYXJhbGxheCcpLCAxMCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhY2std2F2ZS1wYXJhbGxheCcpLCAtMjApO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcmFsbGF4SXQodGFyZ2V0LCBtb3ZlbWVudCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuLy8gICAgICAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0LCB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuLy8gICAgICAgICAgICAgICAgICAgICB4OiAobW91c2UueCAtIHJlY3Qud2lkdGggLyAyKSAvIHJlY3Qud2lkdGggKiBtb3ZlbWVudCxcclxuLy8gICAgICAgICAgICAgICAgICAgICB5OiAobW91c2UueSAtIHJlY3QuaGVpZ2h0IC8gMikgLyByZWN0LmhlaWdodCAqIG1vdmVtZW50XHJcbi8vICAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUmVjdCk7XHJcbi8vICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVSZWN0KTtcclxuLy9cclxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH1cclxuXHJcblxyXG4vL0FOSU0gVElUTEVcclxuLy8gICAgIGNvbnN0IHNlY3Rpb25zMiA9IGdzYXAudXRpbHMudG9BcnJheSgnLnNlY3Rpb24tYW5pbScpO1xyXG4vL1xyXG4vLyAgICAgc2VjdGlvbnMyLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuLy8gICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0tdGl0bGUsIC5hbmltLXN1YnRpdGxlJywgc2VjdGlvbik7XHJcbi8vXHJcbi8vICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuLy8gICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpO1xyXG4vLyAgICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIGNvbnN0IGFuaW0gPSBnc2FwLmZyb21UbyhcclxuLy8gICAgICAgICAgICAgICAgIGVsLFxyXG4vLyAgICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IC0xMDB9LFxyXG4vLyAgICAgICAgICAgICAgICAge2R1cmF0aW9uOiAxLCBvcGFjaXR5OiAxLCB5OiAwfVxyXG4vLyAgICAgICAgICAgICApO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XHJcbi8vICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBlbCxcclxuLy8gICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIGNlbnRlcicsXHJcbi8vICAgICAgICAgICAgICAgICBhbmltYXRpb246IGFuaW0sXHJcbi8vICAgICAgICAgICAgICAgICBzdGFnZ2VyOiBkZWxheSxcclxuLy8gICAgICAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoc2VsZikgPT4gc2VsZi5kaXNhYmxlKCksXHJcbi8vICAgICAgICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gQU5JTSBFTEVNRU5UUyBTRUNUSU9OXHJcblxyXG4vLyAgICAgY29uc3Qgc2VjdGlvbnMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWNvbnRhaW5lcicpO1xyXG4vLyAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4vLyAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7XHJcbi8vICAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbi8vICAgICAgICAgICAgIGl0ZW1zLFxyXG4vLyAgICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSxcclxuLy8gICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuLy8gICAgICAgICAgICAgICAgIHk6IDAsXHJcbi8vICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4vLyAgICAgICAgICAgICAgICAgc3RhZ2dlcjogMC4yLFxyXG4vLyAgICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5cIixcclxuLy8gICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIDc1JScsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIG5vbmUnLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgKTtcclxuLy8gICAgIH0pO1xyXG59KVxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
