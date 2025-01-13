/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.ticker.lagSmoothing(1000, 33);
gsap.ticker.fps(60);

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

// SCROLL HEADER
//     let lastScrollY = 0;
//
//     const header = document.querySelector(".header");
//
//     ScrollTrigger.create({
//         onUpdate: (self) => {
//             const currentScrollY = self.scroll();
//
//             if (currentScrollY > lastScrollY && currentScrollY > 100) {
//                 header.classList.add("hidden");
//             }
//             else {
//                 header.classList.remove("hidden");
//             }
//             if (currentScrollY > 0) {
//                 header.classList.add("active");
//             } else {
//                 header.classList.remove("active");
//             }
//             lastScrollY = currentScrollY;
//         }
//     });
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;

        if (scrollTop > lastScrollTop) {
            // Скролимо вниз
            gsap.to(header, {y: "-100%", duration: 0.5, ease: "power2.out"});
            header.classList.remove("active"); // Прибираємо клас
        } else {
            // Скролимо вверх
            gsap.to(header, {y: "0%", duration: 0.5, ease: "power2.out"});
            header.classList.add("active"); // Додаємо клас
        }

        lastScrollTop = scrollTop;
        if (scrollTop === 0){
            header.classList.remove("active"); // Прибираємо клас
        }
    });

// SCROLL TO ANCHOR
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                gsap.to(window, {
                    scrollTo: targetElement,
                    duration: 1.5,
                    ease: "power2.out",
                    onComplete: () => {
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
    const openButtons = document.querySelectorAll('.open-popup');
    const popup = document.getElementById('modal');
    const popupText = document.getElementById('modalHeader');
    const closePopupButton = document.getElementById('closePopup');
    const overlay = document.querySelector('.overlay');
    const thirdPopup = document.getElementById('playDiscount');
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

    const isMobile = () => window.innerWidth < 768;

// Функція для оновлення стилів симптомів на десктопі
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

// Функція для оновлення стилів симптомів на мобільних
    const updateSymptomsStylesMobile = (currentIndex) => {
        symptoms.forEach((symptom, i) => {
            if (i <= currentIndex) {

                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {

                symptom.style.opacity = '0.3';
            }
            symptom.style.fontSize = '16px';
        });
        let shiftWidth = 0;
        for (let i = 0; i < currentIndex; i++) {
            shiftWidth += symptoms[i].offsetWidth + 8;
        }
        symptomList.style.transform = `translateX(-${shiftWidth}px)`;
    };

// Функція для оновлення стану
    const updateState = (index) => {
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
            iconsContainer.innerHTML = "";
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

        // Логіка для завершення анімації
        if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
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
            // ease: "linear",
            ease: "power1.out"
        }, "-=1")
        .from(".pill-anim__logo", {
            opacity: 0,
            xPercent: -150,
            duration: 0.6,
        }, "-=0.1");


// ANIM SECTION STICKY
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sticky-grid__img-block',
                    start: 'top top',
                    end: 'center top',
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
                once: true,
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
                    once: true,
                },
            }
        );
    });
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlciwgU2Nyb2xsVG9QbHVnaW4pO1xyXG5nc2FwLnRpY2tlci5sYWdTbW9vdGhpbmcoMTAwMCwgMzMpO1xyXG5nc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gTU9CSUxFIE1FTlVcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdicpO1xyXG4gICAgY29uc3QgbmF2T3BlbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGJ0bkJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCAuLi5tZW51TGlua3NdLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNDUk9MTCBIRUFERVJcclxuLy8gICAgIGxldCBsYXN0U2Nyb2xsWSA9IDA7XHJcbi8vXHJcbi8vICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKTtcclxuLy9cclxuLy8gICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuLy8gICAgICAgICBvblVwZGF0ZTogKHNlbGYpID0+IHtcclxuLy8gICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFkgPSBzZWxmLnNjcm9sbCgpO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBpZiAoY3VycmVudFNjcm9sbFkgPiBsYXN0U2Nyb2xsWSAmJiBjdXJyZW50U2Nyb2xsWSA+IDEwMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoY3VycmVudFNjcm9sbFkgPiAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGxhc3RTY3JvbGxZID0gY3VycmVudFNjcm9sbFk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbiAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+IGxhc3RTY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgLy8g0KHQutGA0L7Qu9C40LzQviDQstC90LjQt1xyXG4gICAgICAgICAgICBnc2FwLnRvKGhlYWRlciwge3k6IFwiLTEwMCVcIiwgZHVyYXRpb246IDAuNSwgZWFzZTogXCJwb3dlcjIub3V0XCJ9KTtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7IC8vINCf0YDQuNCx0LjRgNCw0ZTQvNC+INC60LvQsNGBXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g0KHQutGA0L7Qu9C40LzQviDQstCy0LXRgNGFXHJcbiAgICAgICAgICAgIGdzYXAudG8oaGVhZGVyLCB7eTogXCIwJVwiLCBkdXJhdGlvbjogMC41LCBlYXNlOiBcInBvd2VyMi5vdXRcIn0pO1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTsgLy8g0JTQvtC00LDRlNC80L4g0LrQu9Cw0YFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA9PT0gMCl7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpOyAvLyDQn9GA0LjQsdC40YDQsNGU0LzQviDQutC70LDRgVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKS5mb3JFYWNoKGFuY2hvciA9PiB7XHJcbiAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbzogdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9BQ0NPUkRJT05cclxuICAgIGNvbnN0IGFjY29yZGlvbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKTtcclxuICAgIGFjY29yZGlvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgYWNjb3JkaW9uTGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBTTElERVIgLSBUQUJTXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFN3aXBlcigpIHtcclxuICAgICAgICBpZiAoc2xpZGVyQWJvdXQpIHNsaWRlckFib3V0LmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgIHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLWFib3V0IC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2U6IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzbGlkZXJBYm91dCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItYWJvdXQnLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb246IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZTogdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHNsaWRlckFib3V0LnJlYWxJbmRleDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwQ3VzdG9tTmF2aWdhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBuYXZCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJyk7XHJcblxyXG4gICAgICAgIG5hdkJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyQWJvdXQuc2xpZGVUbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdFN3aXBlcik7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcik7XHJcblxyXG4vL0JUTi1VUFxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPCBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG4gICAgICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmFja1RvVG9wKTtcclxuICAgIH0pKCk7XHJcblxyXG4vLyBQT1BVUFNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpO1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cChwb3B1cEVsZW1lbnQpIHtcclxuICAgICAgICBwb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKHBvcHVwRWxlbWVudCkge1xyXG4gICAgICAgIHBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNsb3NlUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwKSk7XHJcbiAgICBjbG9zZVRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHRoaXJkUG9wdXApKTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgIGNsb3NlUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICB9KTtcclxuXHJcbi8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzcGluV2hlZWwoKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAzMDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7XHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIHdoZWVsRGF0YS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dG90YWxSb3RhdGlvbn1kZWcpYDtcclxuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBidG5TcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0RW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBidG5EaXNjb3VudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1mbGV4JztcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcbiAgICBjb25zdCB0bDEgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxyXG4gICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICBlbmQ6ICcrPTI1MCUnLFxyXG4gICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgIHNwaW5XaGVlbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB1cGRhdGVBbmltYXRpb25PblNjcm9sbChzZWxmLnByb2dyZXNzKSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTtcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTtcclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gNTAwO1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBpc01vYmlsZSA9ICgpID0+IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LTQtdGB0LrRgtC+0L/RllxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBNYXRoLmFicyhpIC0gY3VycmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAwLjYgLSBmYWN0b3IgKiAoMC42IC0gMC4yKSAvIHN5bXB0b21zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsdXIgPSBmYWN0b3IgKiAoNCAvIHN5bXB0b21zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gYGJsdXIoJHtibHVyfXB4KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQvNC+0LHRltC70YzQvdC40YVcclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3Rg1xyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZShpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wKGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0LfRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDQutCw0YDRgtC40L3QutGDXHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XHJcbiAgICAgICAgY29uc3QgaWNvblNyYyA9IHN5bXB0b21zW2luZGV4XT8uZGF0YXNldC5pY29uO1xyXG4gICAgICAgIGlmIChpY29uU3JjKSB7XHJcbiAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImljb25cIiwgXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCe0L3QvtCy0LvQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXINC90LAg0L7RgdC90L7QstGWINGB0LrRgNC+0LvRg1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHByb2dyZXNzICogc2VjdGlvbkhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyDQntC90L7QstC70Y7RlNC80L4g0YHRgtCw0L0g0L3QsCDQvtGB0L3QvtCy0ZYg0ZbQvdC00LXQutGB0YNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0JvQvtCz0ZbQutCwINC00LvRjyDQt9Cw0LLQtdGA0YjQtdC90L3RjyDQsNC90ZbQvNCw0YbRltGXXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggPT09IHN5bXB0b21zLmxlbmd0aCAtIDEgJiYgIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnRvcCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS5zY3JvbGwgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9LCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQstC40LfQvdCw0YfQtdC90L3Rjywg0Y/QutCwINC60LDRgNGC0LjQvdC60LAg0LLRltC00L/QvtCy0ZbQtNCw0ZQg0L/QvtGC0L7Rh9C90L7QvNGDINGB0LjQvNC/0YLQvtC80YNcclxuICAgIGNvbnN0IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tID0gKHN5bXB0b21JbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDMgJiYgc3ltcHRvbUluZGV4IDw9IDUpIHJldHVybiAxOyAvLyDQmtCw0YDRgtC40L3QutCwIDIgKNGB0LjQvNC/0YLQvtC80LggNOKAkzYpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSA2ICYmIHN5bXB0b21JbmRleCA8PSA3KSByZXR1cm4gMjsgLy8g0JrQsNGA0YLQuNC90LrQsCAzICjRgdC40LzQv9GC0L7QvNC4IDfigJM4KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgcmV0dXJuIC0xOyAvLyDQkdC10Lcg0LrQsNGA0YLQuNC90LrQuFxyXG4gICAgfTtcclxuXHJcblxyXG4vLyAgICBBTklNQVRJT04gUElMTFxyXG4gICAgY29uc3QgZ2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG4gICAgY29uc3QgZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IDIgKyBNYXRoLnJhbmRvbSgpO1xyXG4gICAgY29uc3QgZ2V0Um90YXRpb25SYW5kb21WYWx1ZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAyMCAtIDEwO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGlsbC1hbmltX19jb21wb25lbnRcIikuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGwgPSBnc2FwLnRpbWVsaW5lKHtyZXBlYXQ6IC0xLCB5b3lvOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIHRsLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDM1JVwiLFxyXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRpbWVsaW5lXHJcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwLjIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluXCIsXHJcbiAgICAgICAgfSwgXCIrPTAuOFwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9faW1hZ2VzXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgIC8vIGVhc2U6IFwibGluZWFyXCIsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLm91dFwiXHJcbiAgICAgICAgfSwgXCItPTFcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2xvZ29cIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB4UGVyY2VudDogLTE1MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDAuNixcclxuICAgICAgICB9LCBcIi09MC4xXCIpO1xyXG5cclxuXHJcbi8vIEFOSU0gU0VDVElPTiBTVElDS1lcclxuICAgIFNjcm9sbFRyaWdnZXIubWF0Y2hNZWRpYSh7XHJcbiAgICAgICAgXCIobWluLXdpZHRoOiA3NjhweClcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0bDIgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS1ncmlkX19pbWctYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIHRvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAnY2VudGVyIHRvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFudGljaXBhdGVQaW46IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy9IT1ZFUiBQQVJBTExBWFxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lci1wYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlID0ge3g6IDAsIHk6IDAsIG1vdmVkOiBmYWxzZX07XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3NhcC50aWNrZXIuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb3VzZS5tb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctcGFyYWxsYXgnKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLXdhdmUtcGFyYWxsYXgnKSwgLTIwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcGFyYWxsYXhJdCh0YXJnZXQsIG1vdmVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IChtb3VzZS54IC0gcmVjdC53aWR0aCAvIDIpIC8gcmVjdC53aWR0aCAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChtb3VzZS55IC0gcmVjdC5oZWlnaHQgLyAyKSAvIHJlY3QuaGVpZ2h0ICogbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUmVjdCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVSZWN0KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJlY3QoKSB7XHJcbiAgICAgICAgICAgICAgICByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuLy9BTklNIFRJVExFXHJcbiAgICBjb25zdCBzZWN0aW9uczIgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5zZWN0aW9uLWFuaW0nKTtcclxuXHJcbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS10aXRsZSwgLmFuaW0tc3VidGl0bGUnLCBzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltID0gZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSxcclxuICAgICAgICAgICAgICAgIHtkdXJhdGlvbjogMSwgb3BhY2l0eTogMSwgeTogMH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGVsLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbSxcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IGRlbGF5LFxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZUJhY2s6IChzZWxmKSA9PiBzZWxmLmRpc2FibGUoKSxcclxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vLyBBTklNIEVMRU1FTlRTIFNFQ1RJT05cclxuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1jb250YWluZXInKTtcclxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0taXRlbScsIHNlY3Rpb24pO1xyXG4gICAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgICAgICBpdGVtcyxcclxuICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IDEwMH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNixcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IDAuMixcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluXCIsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc2VjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCA3NSUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSBub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxufSlcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
