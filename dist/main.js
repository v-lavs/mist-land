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
            y: scrollTop === 0 ? 0 : direction === 'up' ? '-100%' : '0%',
            duration: 0.5,
            ease: 'power2.out',
        });
        header.classList.toggle('active', scrollTop < lastScrollTop && scrollTop !== 0);
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
                    onComplete: () => ScrollTrigger.update(),
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
    let sliderAbout;
    const initSwiper = () => {
        if (sliderAbout) sliderAbout.destroy(true, true);
        const sliderAboutConfig = window.innerWidth >= 1024
            ? {effect: 'fade', speed: 1000}
            : {spaceBetween: 10, slidesPerView: 'auto', breakpoints: {768: {spaceBetween: 20}}};

        sliderAbout = new Swiper('.slider-about', {
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
    if (window.innerWidth < 768) {
        const btnsSeeMore = document.querySelectorAll('.slider-about .see-more');
        btnsSeeMore.forEach((btn) => {
            btn.addEventListener('click', function () {
                const hideText = this.parentElement.querySelector('.card-about__hide-content');
                btn.classList.toggle('toggle-open');
                if (hideText) {
                    hideText.classList.toggle('open-text');

                }
            });
        });
    }
    window.addEventListener('load', initSwiper);


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
    const openButtons = document.querySelectorAll('.open-popup');
    const popup = document.getElementById('modal');
    const popupText = document.getElementById('modalHeader');
    const closePopupButton = document.getElementById('closePopup');
    const thirdPopup = document.getElementById('playDiscount');
    const closeThirdPopupButton = document.getElementById('closeThirdPopup');
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

    const popups = {
        modal: document.getElementById('modal'),
        thirdPopup: document.getElementById('playDiscount')
    };

    document.querySelectorAll('.open-popup').forEach((button) => {
        button.addEventListener('click', () => {
            const popup = popups.modal;
            openPopup(popup);
        });
    });

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
    document.getElementById('btnBuy').addEventListener('click', () => closePopup(popups.modal));
    document.getElementById('closePopup').addEventListener('click', () => closePopup(popups.modal));
    document.getElementById('closeThirdPopup').addEventListener('click', () => closePopup(popups.thirdPopup));

    overlay.addEventListener('click', () => Object.values(popups).forEach(closePopup));

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

    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.sticky-trigger',
            start: 'top top',
            end: '+=325%',
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
    const mobileIcons = iconsContainer.querySelectorAll(".icon");
    const stickyTrigger = document.querySelector(".sticky-trigger");

    let currentSymptomIndex = -1;
    let isLastAnimation = false;
    const delayAfterLastAnimation = 25;

    const sectionTop = animationSection.offsetTop;
    const sectionHeight = animationSection.offsetHeight;
    const symptomStep = sectionHeight / symptoms.length;

    const isMobile = () => window.innerWidth < 768;

// Функція для оновлення стилів симптомів на десктопі

    const updateSymptomsStylesDesktop = (currentIndex) => {
        symptoms.forEach((symptom, i) => {
            if (i <= currentIndex) {
                symptom.style.fontSize = '22px';
                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {
                symptom.style.opacity = '0';
                symptom.style.fontSize = '0';
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
            symptom.style.fontSize = '18px';
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
        if (mobileIcons.length > currentSymptomIndex) {
            mobileIcons.forEach((icon, i) => {
                if (i === currentSymptomIndex) {
                    icon.classList.add("visible");
                } else {
                    icon.classList.remove("visible");
                }
            });
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
                updateState(currentSymptomIndex);
            }, delayAfterLastAnimation);
        }
    };

// Функція для визначення, яка картинка відповідає поточному симптому
    const getImageIndexForSymptom = (symptomIndex) => {
        // if (symptomIndex >= 0 && symptomIndex <= 2) return 0; // Картинка 1 (симптоми 1–3)
        // if (symptomIndex >= 3 && symptomIndex <= 5) return 1; // Картинка 2 (симптоми 4–6)
        // if (symptomIndex >= 6 && symptomIndex <= 7) return 2; // Картинка 3 (симптоми 7–8)
        // if (symptomIndex === 8) return 3; // Картинка 4 (симптом 9)

        if (symptomIndex >= 0 && symptomIndex <= 1) return 0; // Картинка 1 (симптоми 1–2)
        if (symptomIndex >= 2 && symptomIndex <= 4) return 1; // Картинка 2 (симптоми 3–5)
        if (symptomIndex >= 5 && symptomIndex <= 6) return 2; // Картинка 3 (симптоми 5–6)
        if (symptomIndex >= 7 && symptomIndex <= 8) return 3; // Картинка 4 (симптом 9)

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
            force3D: true,
        })
            .to(component, {
                y: `+=${getCoordinatesRandomValue()}`,
                x: `+=${getCoordinatesRandomValue()}`,
                rotation: `+=${getRotationRandomValue()}`,
                duration: getDurationRandomValue(),
                ease: "sine.inOut",
                force3D: true,
            })
            .to(component, {
                y: `+=${getCoordinatesRandomValue()}`,
                x: `+=${getCoordinatesRandomValue()}`,
                rotation: `+=${getRotationRandomValue()}`,
                duration: getDurationRandomValue(),
                ease: "sine.inOut",
                force3D: true,
            });
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 30%",
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
            force3D: true,
            lazy: true
        }, "+=0.4")
        .from(".pill-anim__images", {
            opacity: 1,
            scale: 0,
            duration: 1.5,
            ease: "power1.out",
            force3D: true,
        }, "-=0.8")
        .from(".pill-anim__logo", {
            opacity: 0,
            xPercent: -150,
            duration: 0.6,
            force3D: true,
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
                    anticipatePin: 1,
                    ease: "power1.inOut"
                }
            });
        }
    });
    let windowW = window.innerWidth;
    let resizeTimeout;

    window.addEventListener('resize', () => {
        // Clear the previous timeout
        clearTimeout(resizeTimeout);

        // Set a new debounce timeout
        resizeTimeout = setTimeout(() => {
            if (windowW !== window.innerWidth) {
                windowW = window.innerWidth;
                ScrollTrigger.update();

                // Reinitialize the swiper configuration
                initSwiper();

                // // Listen for resize events to toggle parallax based on viewport width
                // handleParallaxElementResize();
            }
        }, 100); // Adjust the delay as needed
    });


//HOVER PARALLAX

    function removeParallaxListeners() {

        containers.forEach((container, index) => {
            const parallaxElements = [container.querySelector('.img-parallax'), container.querySelector('.back-wave-parallax')]
            parallaxElements.forEach(el => {
                if (el) {
                    // remove gsap styles after resize
                    el.style.removeProperty('transform');
                }
            });
            const handleMouseMove = parallaxlisteners[index];
            if (!handleMouseMove) return;
            container.removeEventListener('mousemove', handleMouseMove);
            if (index === parallaxlisteners.length - 1) {
                parallaxlisteners = [];
            }
        });
        gsap.ticker.remove(updateParallax);
    }

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
                    y: (mouse.y - rect.height / 2) / rect.height * movement,
                    ease: "power1.inOut",
                    lazy: true
                });
            }

            window.addEventListener('resize', updateRect);
            window.addEventListener('scroll', updateRect);

            function updateRect() {
                rect = container.getBoundingClientRect();
            }
        });
    }

    // ANIM TITLE
    const sections2 = gsap.utils.toArray('.section-anim');

    sections2.forEach((section) => {
        const elements = gsap.utils.toArray('.anim-title, .anim-subtitle', section);

        elements.forEach((el) => {
            const isTitle = el.classList.contains('anim-title');
            const delay = isTitle ? 0.4 : 0.2;

            const anim = gsap.fromTo(
                el,
                {opacity: 0, y: -100},
                {duration: 1, opacity: 1, y: 0, ease: "power1.inOut"}
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
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                    once: true,
                }
            }
        );
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoaXNPcGVuKSA9PiB7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJywgIWlzT3Blbik7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlLXNjcm9sbCcsIGlzT3Blbik7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc09wZW4pO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBpc09wZW4gPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRvZ2dsZU1lbnUodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNZW51KGZhbHNlKSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIEhlYWRlciBTY3JvbGwgQW5pbWF0aW9uXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNjcm9sbFRvcCA+IGxhc3RTY3JvbGxUb3AgPyAndXAnIDogJ2Rvd24nO1xyXG5cclxuICAgICAgICBnc2FwLnRvKGhlYWRlciwge1xyXG4gICAgICAgICAgICB5OiBzY3JvbGxUb3AgPT09IDAgPyAwIDogZGlyZWN0aW9uID09PSAndXAnID8gJy0xMDAlJyA6ICcwJScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgc2Nyb2xsVG9wIDwgbGFzdFNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IDApO1xyXG4gICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gQW5jaG9yXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpLmZvckVhY2goKGFuY2hvcikgPT4ge1xyXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbzogdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFjY29yZGlvblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dpcGVyIEluaXRpYWxpemF0aW9uXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcbiAgICBjb25zdCBpbml0U3dpcGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBzbGlkZXJBYm91dENvbmZpZyA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjRcclxuICAgICAgICAgICAgPyB7ZWZmZWN0OiAnZmFkZScsIHNwZWVkOiAxMDAwfVxyXG4gICAgICAgICAgICA6IHtzcGFjZUJldHdlZW46IDEwLCBzbGlkZXNQZXJWaWV3OiAnYXV0bycsIGJyZWFrcG9pbnRzOiB7NzY4OiB7c3BhY2VCZXR3ZWVuOiAyMH19fTtcclxuXHJcbiAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAuLi5zbGlkZXJBYm91dENvbmZpZyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge2VsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLCBjbGlja2FibGU6IHRydWV9LFxyXG4gICAgICAgICAgICBvbjoge3NsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9ufSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKHNsaWRlckFib3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbiA9IChzbGlkZXJBYm91dCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIGluZGV4ID09PSBzbGlkZXJBYm91dC5yZWFsSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR1cEN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBYm91dC5zbGlkZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWFib3V0IC5zZWUtbW9yZScpO1xyXG4gICAgICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaWRlVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1hYm91dF9faGlkZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChoaWRlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG5cclxuXHJcbiAgICAvLyBCYWNrLXRvLVRvcCBCdXR0b25cclxuICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG4gICAgY29uc3QgdHJhY2tTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycsIHdpbmRvdy5zY3JvbGxZID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdzYXAudG8od2luZG93LCB7c2Nyb2xsVG86IDAsIGR1cmF0aW9uOiAxLCBlYXNlOiAncG93ZXIyLm91dCd9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XHJcblxyXG4gICAgLy8gUG9wdXAgTG9naWNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3QgdGhpcmRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5RGlzY291bnQnKTtcclxuICAgIGNvbnN0IGNsb3NlVGhpcmRQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVRoaXJkUG9wdXAnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3BlblBvcHVwID0gKHBvcHVwKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IChwb3B1cCkgPT4ge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC5zaG93JykpIHtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBvcHVwcyA9IHtcclxuICAgICAgICBtb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyksXHJcbiAgICAgICAgdGhpcmRQb3B1cDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpXHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cCA9IHBvcHVwcy5tb2RhbDtcclxuICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmFwcGVuZENoaWxkKHRlbXBsYXRlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpcmRQb3B1cEJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy50cmlnZ2VyLXBsYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcHVwKHRoaXJkUG9wdXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQnV5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy5tb2RhbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlUG9wdXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXBzLm1vZGFsKSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy50aGlyZFBvcHVwKSk7XHJcblxyXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IE9iamVjdC52YWx1ZXMocG9wdXBzKS5mb3JFYWNoKGNsb3NlUG9wdXApKTtcclxuXHJcbiAgICAvKiBBbmltYXRpb25zIGZvciBzZWN0aW9ucyAqL1xyXG4gICAgLy8gU1BJTiBST1VMRVRURVxyXG4gICAgY29uc3Qgd2hlZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWwnKTtcclxuICAgIGNvbnN0IHdoZWVsRGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aGVlbERhdGEnKTtcclxuICAgIGNvbnN0IGJ0blNwaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpbkJ1dHRvbicpO1xyXG4gICAgY29uc3QgdGV4dFN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQnKTtcclxuICAgIGNvbnN0IHRleHRFbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1lbmQnKTtcclxuICAgIGNvbnN0IGJ0bkRpc2NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9kaXNjb3VudCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNwaW5XaGVlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRTZWN0b3JBbmdsZSA9IDMwMDtcclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWxEYXRhLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xyXG4gICAgICAgIHRleHRTdGFydC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJ0blNwaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRFbmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHdoZWVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuICAgIGJ0blNwaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzcGluV2hlZWwpO1xyXG5cclxuLy8gLy8gQU5JTSBCTE9DSyBXSVRIIEdJUkxcclxuXHJcbiAgICBjb25zdCB0bDEgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxyXG4gICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICBlbmQ6ICcrPTMyNSUnLFxyXG4gICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgIHNwaW5XaGVlbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB1cGRhdGVBbmltYXRpb25PblNjcm9sbChzZWxmLnByb2dyZXNzKSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlSWNvbnMgPSBpY29uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmljb25cIik7XHJcbiAgICBjb25zdCBzdGlja3lUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja3ktdHJpZ2dlclwiKTtcclxuXHJcbiAgICBsZXQgY3VycmVudFN5bXB0b21JbmRleCA9IC0xO1xyXG4gICAgbGV0IGlzTGFzdEFuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSAyNTtcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC00LXRgdC60YLQvtC/0ZZcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMjJweCc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQvNC+0LHRltC70YzQvdC40YVcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZSA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMThweCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bXB0b21MaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3NoaWZ0V2lkdGh9cHgpYDtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YNcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlKGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuICAgICAgICBpZiAobW9iaWxlSWNvbnMubGVuZ3RoID4gY3VycmVudFN5bXB0b21JbmRleCkge1xyXG4gICAgICAgICAgICBtb2JpbGVJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gY3VycmVudFN5bXB0b21JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQntC90L7QstC70LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRlyDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKHByb2dyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBwcm9ncmVzcyAqIHNlY3Rpb25IZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTsgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGB0YLQsNC9INC90LAg0L7RgdC90L7QstGWINGW0L3QtNC10LrRgdGDXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQtNC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuICAgICAgICAvLyBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgLy8gaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgIC8vIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuICAgICAgICAvLyBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG5cclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDEpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzIpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAyICYmIHN5bXB0b21JbmRleCA8PSA0KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDPigJM1KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNSAmJiBzeW1wdG9tSW5kZXggPD0gNikgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA14oCTNilcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDcgJiYgc3ltcHRvbUluZGV4IDw9IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcblxyXG4gICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgIH07XHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDMwJVwiLFxyXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRpbWVsaW5lXHJcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwLjIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluXCIsXHJcbiAgICAgICAgICAgIGZvcmNlM0Q6IHRydWUsXHJcbiAgICAgICAgICAgIGxhenk6IHRydWVcclxuICAgICAgICB9LCBcIis9MC40XCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEub3V0XCIsXHJcbiAgICAgICAgICAgIGZvcmNlM0Q6IHRydWUsXHJcbiAgICAgICAgfSwgXCItPTAuOFwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9fbG9nb1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHhQZXJjZW50OiAtMTUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgIH0sIFwiLT0wLjFcIik7XHJcblxyXG5cclxuLy8gQU5JTSBTRUNUSU9OIFNUSUNLWVxyXG4gICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKHtcclxuICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRsMiA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICdjZW50ZXIgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYW50aWNpcGF0ZVBpbjogMSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pbk91dFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGxldCByZXNpemVUaW1lb3V0O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIHByZXZpb3VzIHRpbWVvdXRcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZW91dCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBhIG5ldyBkZWJvdW5jZSB0aW1lb3V0XHJcbiAgICAgICAgcmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93VyAhPT0gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVpbml0aWFsaXplIHRoZSBzd2lwZXIgY29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICAgICAgaW5pdFN3aXBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIC8vIExpc3RlbiBmb3IgcmVzaXplIGV2ZW50cyB0byB0b2dnbGUgcGFyYWxsYXggYmFzZWQgb24gdmlld3BvcnQgd2lkdGhcclxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZVBhcmFsbGF4RWxlbWVudFJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTsgLy8gQWRqdXN0IHRoZSBkZWxheSBhcyBuZWVkZWRcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vSE9WRVIgUEFSQUxMQVhcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQYXJhbGxheExpc3RlbmVycygpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFsbGF4RWxlbWVudHMgPSBbY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctcGFyYWxsYXgnKSwgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLXdhdmUtcGFyYWxsYXgnKV1cclxuICAgICAgICAgICAgcGFyYWxsYXhFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBnc2FwIHN0eWxlcyBhZnRlciByZXNpemVcclxuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSBwYXJhbGxheGxpc3RlbmVyc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlTW91c2VNb3ZlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmFsbGF4bGlzdGVuZXJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFsbGF4bGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBnc2FwLnRpY2tlci5yZW1vdmUodXBkYXRlUGFyYWxsYXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXItcGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3VzZSA9IHt4OiAwLCB5OiAwLCBtb3ZlZDogZmFsc2V9O1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgbW91c2UueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdzYXAudGlja2VyLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW91c2UubW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW1nLXBhcmFsbGF4JyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmFjay13YXZlLXBhcmFsbGF4JyksIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhcmFsbGF4SXQodGFyZ2V0LCBtb3ZlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB4OiAobW91c2UueCAtIHJlY3Qud2lkdGggLyAyKSAvIHJlY3Qud2lkdGggKiBtb3ZlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAobW91c2UueSAtIHJlY3QuaGVpZ2h0IC8gMikgLyByZWN0LmhlaWdodCAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF6eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVJlY3QpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBTklNIFRJVExFXHJcbiAgICBjb25zdCBzZWN0aW9uczIgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5zZWN0aW9uLWFuaW0nKTtcclxuXHJcbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS10aXRsZSwgLmFuaW0tc3VidGl0bGUnLCBzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltID0gZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSxcclxuICAgICAgICAgICAgICAgIHtkdXJhdGlvbjogMSwgb3BhY2l0eTogMSwgeTogMCwgZWFzZTogXCJwb3dlcjEuaW5PdXRcIn1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGVsLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbSxcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IGRlbGF5LFxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZUJhY2s6IChzZWxmKSA9PiBzZWxmLmRpc2FibGUoKSxcclxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQU5JTSBFTEVNRU5UUyBTRUNUSU9OXHJcblxyXG4gICAgY29uc3Qgc2VjdGlvbnMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWNvbnRhaW5lcicpO1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7XHJcbiAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogMC4yLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIDc1JScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIG5vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
