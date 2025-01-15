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
            start: "top 40%",
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

                // Listen for resize events to toggle parallax based on viewport width
                handleParallaxElementResize();
            }
        }, 100); // Adjust the delay as needed
    });


//HOVER PARALLAX
    let containers = [];
    let mouse = {x: 0, y: 0, moved: false};
    let parallaxlisteners = [];

    function initParallax() {
        containers = document.querySelectorAll('.container-parallax');

        containers.forEach(container => {
            let rect = container.getBoundingClientRect();

            function handleMouseMove(e) {
                mouse.moved = true;
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }

            container.addEventListener('mousemove', handleMouseMove);
            parallaxlisteners.push(handleMouseMove);
        });

        gsap.ticker.add(updateParallax);
    }

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

    function updateParallax() {
        containers.forEach(container => {
            let rect = container.getBoundingClientRect();

            if (mouse.moved && window.innerWidth >= 1024) {
                parallaxIt(container.querySelector('.img-parallax'), 10, rect);
                parallaxIt(container.querySelector('.back-wave-parallax'), -20, rect);
            }
            mouse.moved = false;
        });
    }

    function parallaxIt(target, movement, rect) {
        if (!target) return;
        gsap.to(target, {
            duration: 0.5,
            x: (mouse.x - rect.left - rect.width / 2) / rect.width * movement,
            y: (mouse.y - rect.top - rect.height / 2) / rect.height * movement,
            ease: "power1.inOut",
        });
    }

    function handleParallaxElementResize() {
        if (window.innerWidth < 1024) {
            removeParallaxListeners();
        } else {
            initParallax();
        }
    }

    // Initial setup based on viewport width
    if (window.innerWidth >= 1024) {
        initParallax();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoaXNPcGVuKSA9PiB7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJywgIWlzT3Blbik7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlLXNjcm9sbCcsIGlzT3Blbik7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc09wZW4pO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBpc09wZW4gPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRvZ2dsZU1lbnUodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNZW51KGZhbHNlKSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIEhlYWRlciBTY3JvbGwgQW5pbWF0aW9uXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNjcm9sbFRvcCA+IGxhc3RTY3JvbGxUb3AgPyAndXAnIDogJ2Rvd24nO1xyXG5cclxuICAgICAgICBnc2FwLnRvKGhlYWRlciwge1xyXG4gICAgICAgICAgICB5OiBzY3JvbGxUb3AgPT09IDAgPyAwIDogZGlyZWN0aW9uID09PSAndXAnID8gJy0xMDAlJyA6ICcwJScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgc2Nyb2xsVG9wIDwgbGFzdFNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IDApO1xyXG4gICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gQW5jaG9yXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpLmZvckVhY2goKGFuY2hvcikgPT4ge1xyXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbzogdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFjY29yZGlvblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dpcGVyIEluaXRpYWxpemF0aW9uXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcbiAgICBjb25zdCBpbml0U3dpcGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBzbGlkZXJBYm91dENvbmZpZyA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjRcclxuICAgICAgICAgICAgPyB7ZWZmZWN0OiAnZmFkZScsIHNwZWVkOiAxMDAwfVxyXG4gICAgICAgICAgICA6IHtzcGFjZUJldHdlZW46IDEwLCBzbGlkZXNQZXJWaWV3OiAnYXV0bycsIGJyZWFrcG9pbnRzOiB7NzY4OiB7c3BhY2VCZXR3ZWVuOiAyMH19fTtcclxuXHJcbiAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAuLi5zbGlkZXJBYm91dENvbmZpZyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge2VsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLCBjbGlja2FibGU6IHRydWV9LFxyXG4gICAgICAgICAgICBvbjoge3NsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9ufSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKHNsaWRlckFib3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbiA9IChzbGlkZXJBYm91dCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIGluZGV4ID09PSBzbGlkZXJBYm91dC5yZWFsSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR1cEN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBYm91dC5zbGlkZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWFib3V0IC5zZWUtbW9yZScpO1xyXG4gICAgICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaWRlVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1hYm91dF9faGlkZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChoaWRlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG5cclxuXHJcbiAgICAvLyBCYWNrLXRvLVRvcCBCdXR0b25cclxuICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl91cCcpO1xyXG4gICAgY29uc3QgdHJhY2tTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgZ29Ub3BCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycsIHdpbmRvdy5zY3JvbGxZID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdvVG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdzYXAudG8od2luZG93LCB7c2Nyb2xsVG86IDAsIGR1cmF0aW9uOiAxLCBlYXNlOiAncG93ZXIyLm91dCd9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1Njcm9sbCk7XHJcblxyXG4gICAgLy8gUG9wdXAgTG9naWNcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgY29uc3QgdGhpcmRQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5RGlzY291bnQnKTtcclxuICAgIGNvbnN0IGNsb3NlVGhpcmRQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVRoaXJkUG9wdXAnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3BlblBvcHVwID0gKHBvcHVwKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xvc2VQb3B1cCA9IChwb3B1cCkgPT4ge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC5zaG93JykpIHtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHBvcHVwcyA9IHtcclxuICAgICAgICBtb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyksXHJcbiAgICAgICAgdGhpcmRQb3B1cDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpXHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cCA9IHBvcHVwcy5tb2RhbDtcclxuICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9wZW5CdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlLWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcG9wdXBUZXh0LmFwcGVuZENoaWxkKHRlbXBsYXRlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpcmRQb3B1cEJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy50cmlnZ2VyLXBsYXknKTtcclxuICAgICAgICAgICAgICAgIHRoaXJkUG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcHVwKHRoaXJkUG9wdXApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMubW9kYWwpKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVRoaXJkUG9wdXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlUG9wdXAocG9wdXBzLnRoaXJkUG9wdXApKTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gT2JqZWN0LnZhbHVlcyhwb3B1cHMpLmZvckVhY2goY2xvc2VQb3B1cCkpO1xyXG5cclxuICAgIC8qIEFuaW1hdGlvbnMgZm9yIHNlY3Rpb25zICovXHJcbiAgICAvLyBTUElOIFJPVUxFVFRFXHJcbiAgICBjb25zdCB3aGVlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aGVlbCcpO1xyXG4gICAgY29uc3Qgd2hlZWxEYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsRGF0YScpO1xyXG4gICAgY29uc3QgYnRuU3BpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XHJcbiAgICBjb25zdCB0ZXh0U3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1zdGFydCcpO1xyXG4gICAgY29uc3QgdGV4dEVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWVuZCcpO1xyXG4gICAgY29uc3QgYnRuRGlzY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3BpbldoZWVsKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFNlY3RvckFuZ2xlID0gMzAwO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVNwaW5zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkgKyA1O1xyXG4gICAgICAgIGNvbnN0IHRvdGFsUm90YXRpb24gPSByYW5kb21TcGlucyAqIDM2MCArIHRhcmdldFNlY3RvckFuZ2xlO1xyXG5cclxuICAgICAgICB3aGVlbERhdGEuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RvdGFsUm90YXRpb259ZGVnKWA7XHJcbiAgICAgICAgdGV4dFN0YXJ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgYnRuU3Bpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGV4dEVuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2hlZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzcGluV2hlZWwpO1xyXG4gICAgYnRuU3Bpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcblxyXG4vLyAvLyBBTklNIEJMT0NLIFdJVEggR0lSTFxyXG5cclxuICAgIGNvbnN0IHRsMSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogJy5zdGlja3ktdHJpZ2dlcicsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAndG9wIHRvcCcsXHJcbiAgICAgICAgICAgIGVuZDogJys9MzI1JScsXHJcbiAgICAgICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICAgICAgc3BpbldoZWVsOiB0cnVlLFxyXG4gICAgICAgICAgICBwaW5TcGFjaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiAncGxheSBub25lIG5vbmUgcmV2ZXJzZScsXHJcbiAgICAgICAgICAgIG9uVXBkYXRlOiBzZWxmID0+IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKHNlbGYucHJvZ3Jlc3MpLFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHN5bXB0b21zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3Qgc3ltcHRvbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hbmlmZXN0YXRpb24tbGlzdCB1bFwiKTtcclxuICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbiAgICBjb25zdCBpY29uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbnNcIik7XHJcbiAgICBjb25zdCBhbmltYXRpb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLW1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBtb2JpbGVJY29ucyA9IGljb25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaWNvblwiKTtcclxuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpO1xyXG5cclxuICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7XHJcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICBjb25zdCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbiA9IDI1O1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldFRvcDtcclxuICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN5bXB0b21TdGVwID0gc2VjdGlvbkhlaWdodCAvIHN5bXB0b21zLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBpc01vYmlsZSA9ICgpID0+IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LTQtdGB0LrRgtC+0L/RllxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcCA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yID0gTWF0aC5hYnMoaSAtIGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGFjaXR5ID0gMC42IC0gZmFjdG9yICogKDAuNiAtIDAuMikgLyBzeW1wdG9tcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibHVyID0gZmFjdG9yICogKDQgLyBzeW1wdG9tcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5LnRvRml4ZWQoMik7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LjQu9GW0LIg0YHQuNC80L/RgtC+0LzRltCyINC90LAg0LzQvtCx0ZbQu9GM0L3QuNGFXHJcblxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzaGlmdFdpZHRoID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNoaWZ0V2lkdGggKz0gc3ltcHRvbXNbaV0ub2Zmc2V0V2lkdGggKyA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRofXB4KWA7XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0L3QvtCy0LvQtdC90L3RjyDRgdGC0LDQvdGDXHJcblxyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZShpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wKGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0LfRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDQutCw0YDRgtC40L3QutGDXHJcbiAgICAgICAgY29uc3QgbmV3SW1hZ2VJbmRleCA9IGdldEltYWdlSW5kZXhGb3JTeW1wdG9tKGluZGV4KTtcclxuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGltZ0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XHJcbiAgICAgICAgaWYgKG1vYmlsZUljb25zLmxlbmd0aCA+IGN1cnJlbnRTeW1wdG9tSW5kZXgpIHtcclxuICAgICAgICAgICAgbW9iaWxlSWNvbnMuZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGN1cnJlbnRTeW1wdG9tSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8g0J7QvdC+0LLQu9C10L3QvdGPINCw0L3RltC80LDRhtGW0Zcg0L3QsCDQvtGB0L3QvtCy0ZYg0YHQutGA0L7Qu9GDXHJcbiAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9IChwcm9ncmVzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gcHJvZ3Jlc3MgKiBzZWN0aW9uSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoIWlzTGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCAqIHN5bXB0b21TdGVwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBzeW1wdG9tU3RlcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShpbmRleCk7IC8vINCe0L3QvtCy0LvRjtGU0LzQviDRgdGC0LDQvSDQvdCwINC+0YHQvdC+0LLRliDRltC90LTQtdC60YHRg1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQm9C+0LPRltC60LAg0LTQu9GPINC30LDQstC10YDRiNC10L3QvdGPINCw0L3RltC80LDRhtGW0ZdcclxuICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCA9PT0gc3ltcHRvbXMubGVuZ3RoIC0gMSAmJiAhaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoY3VycmVudFN5bXB0b21JbmRleCk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8g0KTRg9C90LrRhtGW0Y8g0LTQu9GPINCy0LjQt9C90LDRh9C10L3QvdGPLCDRj9C60LAg0LrQsNGA0YLQuNC90LrQsCDQstGW0LTQv9C+0LLRltC00LDRlCDQv9C+0YLQvtGH0L3QvtC80YMg0YHQuNC80L/RgtC+0LzRg1xyXG4gICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAyKSByZXR1cm4gMDsgLy8g0JrQsNGA0YLQuNC90LrQsCAxICjRgdC40LzQv9GC0L7QvNC4IDHigJMzKVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMyAmJiBzeW1wdG9tSW5kZXggPD0gNSkgcmV0dXJuIDE7IC8vINCa0LDRgNGC0LjQvdC60LAgMiAo0YHQuNC80L/RgtC+0LzQuCA04oCTNilcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA9PT0gOCkgcmV0dXJuIDM7IC8vINCa0LDRgNGC0LjQvdC60LAgNCAo0YHQuNC80L/RgtC+0LwgOSlcclxuICAgICAgICByZXR1cm4gLTE7IC8vINCR0LXQtyDQutCw0YDRgtC40L3QutC4XHJcbiAgICB9O1xyXG5cclxuXHJcbi8vICAgIEFOSU1BVElPTiBQSUxMXHJcbiAgICBjb25zdCBnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcbiAgICBjb25zdCBnZXREdXJhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gMiArIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBnZXRSb3RhdGlvblJhbmRvbVZhbHVlID0gKCkgPT4gTWF0aC5yYW5kb20oKSAqIDIwIC0gMTA7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5waWxsLWFuaW1fX2NvbXBvbmVudFwiKS5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICBjb25zdCB0bCA9IGdzYXAudGltZWxpbmUoe3JlcGVhdDogLTEsIHlveW86IHRydWV9KTtcclxuXHJcbiAgICAgICAgdGwudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKGNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHg6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvbjogYCs9JHtnZXRSb3RhdGlvblJhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInNpbmUuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIGZvcmNlM0Q6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGltZWxpbmUgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IFwiI2Fib3V0XCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA0MCVcIixcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dFwiKS5jbGFzc0xpc3QuYWRkKFwidGltZWxpbmUtc3RhcnRlZFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICB0aW1lbGluZVxyXG4gICAgICAgIC50byhcIi5waWxsLWFuaW1fX2NvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICBzY2FsZTogMC4yLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pblwiLFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgICAgICBsYXp5OiB0cnVlXHJcbiAgICAgICAgfSwgXCIrPTAuNFwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9faW1hZ2VzXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgc2NhbGU6IDAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLm91dFwiLFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgIH0sIFwiLT0wLjhcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2xvZ29cIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB4UGVyY2VudDogLTE1MCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDAuNixcclxuICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICB9LCBcIi09MC4xXCIpO1xyXG5cclxuXHJcbi8vIEFOSU0gU0VDVElPTiBTVElDS1lcclxuICAgIFNjcm9sbFRyaWdnZXIubWF0Y2hNZWRpYSh7XHJcbiAgICAgICAgXCIobWluLXdpZHRoOiA3NjhweClcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0bDIgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS1ncmlkX19pbWctYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIHRvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAnY2VudGVyIHRvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFudGljaXBhdGVQaW46IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5PdXRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBsZXQgcmVzaXplVGltZW91dDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIENsZWFyIHRoZSBwcmV2aW91cyB0aW1lb3V0XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVvdXQpO1xyXG5cclxuICAgICAgICAvLyBTZXQgYSBuZXcgZGVib3VuY2UgdGltZW91dFxyXG4gICAgICAgIHJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvd1cgIT09IHdpbmRvdy5pbm5lcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlaW5pdGlhbGl6ZSB0aGUgc3dpcGVyIGNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgICAgIGluaXRTd2lwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlc2l6ZSBldmVudHMgdG8gdG9nZ2xlIHBhcmFsbGF4IGJhc2VkIG9uIHZpZXdwb3J0IHdpZHRoXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVQYXJhbGxheEVsZW1lbnRSZXNpemUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7IC8vIEFkanVzdCB0aGUgZGVsYXkgYXMgbmVlZGVkXHJcbiAgICB9KTtcclxuXHJcblxyXG4vL0hPVkVSIFBBUkFMTEFYXHJcbiAgICBsZXQgY29udGFpbmVycyA9IFtdO1xyXG4gICAgbGV0IG1vdXNlID0ge3g6IDAsIHk6IDAsIG1vdmVkOiBmYWxzZX07XHJcbiAgICBsZXQgcGFyYWxsYXhsaXN0ZW5lcnMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0UGFyYWxsYXgoKSB7XHJcbiAgICAgICAgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXItcGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGUpIHtcclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICBwYXJhbGxheGxpc3RlbmVycy5wdXNoKGhhbmRsZU1vdXNlTW92ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGdzYXAudGlja2VyLmFkZCh1cGRhdGVQYXJhbGxheCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlUGFyYWxsYXhMaXN0ZW5lcnMoKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbGxheEVsZW1lbnRzID0gW2NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW1nLXBhcmFsbGF4JyksIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmFjay13YXZlLXBhcmFsbGF4JyldXHJcbiAgICAgICAgICAgIHBhcmFsbGF4RWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZ3NhcCBzdHlsZXMgYWZ0ZXIgcmVzaXplXHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gcGFyYWxsYXhsaXN0ZW5lcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoIWhhbmRsZU1vdXNlTW92ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBwYXJhbGxheGxpc3RlbmVycy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbGxheGxpc3RlbmVycyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ3NhcC50aWNrZXIucmVtb3ZlKHVwZGF0ZVBhcmFsbGF4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobW91c2UubW92ZWQgJiYgd2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmltZy1wYXJhbGxheCcpLCAxMCwgcmVjdCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmFjay13YXZlLXBhcmFsbGF4JyksIC0yMCwgcmVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW91c2UubW92ZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJhbGxheEl0KHRhcmdldCwgbW92ZW1lbnQsIHJlY3QpIHtcclxuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgICAgIGdzYXAudG8odGFyZ2V0LCB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgIHg6IChtb3VzZS54IC0gcmVjdC5sZWZ0IC0gcmVjdC53aWR0aCAvIDIpIC8gcmVjdC53aWR0aCAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgICB5OiAobW91c2UueSAtIHJlY3QudG9wIC0gcmVjdC5oZWlnaHQgLyAyKSAvIHJlY3QuaGVpZ2h0ICogbW92ZW1lbnQsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUGFyYWxsYXhFbGVtZW50UmVzaXplKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEwMjQpIHtcclxuICAgICAgICAgICAgcmVtb3ZlUGFyYWxsYXhMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbml0UGFyYWxsYXgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbCBzZXR1cCBiYXNlZCBvbiB2aWV3cG9ydCB3aWR0aFxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICBpbml0UGFyYWxsYXgoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gQU5JTSBUSVRMRVxyXG4gICAgY29uc3Qgc2VjdGlvbnMyID0gZ3NhcC51dGlscy50b0FycmF5KCcuc2VjdGlvbi1hbmltJyk7XHJcblxyXG4gICAgc2VjdGlvbnMyLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0tdGl0bGUsIC5hbmltLXN1YnRpdGxlJywgc2VjdGlvbik7XHJcblxyXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVGl0bGUgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW0tdGl0bGUnKTtcclxuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSBpc1RpdGxlID8gMC40IDogMC4yO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYW5pbSA9IGdzYXAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgZWwsXHJcbiAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogLTEwMH0sXHJcbiAgICAgICAgICAgICAgICB7ZHVyYXRpb246IDEsIG9wYWNpdHk6IDEsIHk6IDAsIGVhc2U6IFwicG93ZXIxLmluT3V0XCJ9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBlbCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIGNlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IGFuaW0sXHJcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiBkZWxheSxcclxuICAgICAgICAgICAgICAgIG9uTGVhdmVCYWNrOiAoc2VsZikgPT4gc2VsZi5kaXNhYmxlKCksXHJcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFOSU0gRUxFTUVOVFMgU0VDVElPTlxyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1jb250YWluZXInKTtcclxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0taXRlbScsIHNlY3Rpb24pO1xyXG4gICAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgICAgICBpdGVtcyxcclxuICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IDEwMH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNixcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IDAuMixcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogc2VjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCA3NSUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSBub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
