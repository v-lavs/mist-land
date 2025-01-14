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
              }  else {
                  icon.classList.remove("visible");
              }
            });
        }
    };

// Оновлення анімації на основі скролу
    const updateAnimationOnScroll = (progress) => {
        const scrollPosition = progress * sectionHeight;
        console.log(progress)

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
            }
        }, 100); // Adjust the delay as needed
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
                    y: (mouse.y - rect.height / 2) / rect.height * movement,
                    ease: "power1.inOut"
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
                },
            }
        );
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoaXNPcGVuKSA9PiB7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJywgIWlzT3Blbik7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlLXNjcm9sbCcsIGlzT3Blbik7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc09wZW4pO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBpc09wZW4gPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRvZ2dsZU1lbnUodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNZW51KGZhbHNlKSk7XHJcbiAgICB9KTtcclxuXHJcbi8vIEhlYWRlciBTY3JvbGwgQW5pbWF0aW9uXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcclxuICAgIGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHNjcm9sbFRvcCA+IGxhc3RTY3JvbGxUb3AgPyAndXAnIDogJ2Rvd24nO1xyXG5cclxuICAgICAgICBnc2FwLnRvKGhlYWRlciwge1xyXG4gICAgICAgICAgICB5OiBzY3JvbGxUb3AgPT09IDAgPyAwIDogZGlyZWN0aW9uID09PSAndXAnID8gJy0xMDAlJyA6ICcwJScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgc2Nyb2xsVG9wIDwgbGFzdFNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IDApO1xyXG4gICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gQW5jaG9yXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpLmZvckVhY2goKGFuY2hvcikgPT4ge1xyXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh3aW5kb3csIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUbzogdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFjY29yZGlvblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dpcGVyIEluaXRpYWxpemF0aW9uXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcbiAgICBjb25zdCBpbml0U3dpcGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBzbGlkZXJBYm91dENvbmZpZyA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjRcclxuICAgICAgICAgICAgPyB7ZWZmZWN0OiAnZmFkZScsIHNwZWVkOiAxMDAwfVxyXG4gICAgICAgICAgICA6IHtzcGFjZUJldHdlZW46IDEwLCBzbGlkZXNQZXJWaWV3OiAnYXV0bycsIGJyZWFrcG9pbnRzOiB7NzY4OiB7c3BhY2VCZXR3ZWVuOiAyMH19fTtcclxuXHJcbiAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAuLi5zbGlkZXJBYm91dENvbmZpZyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge2VsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLCBjbGlja2FibGU6IHRydWV9LFxyXG4gICAgICAgICAgICBvbjoge3NsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9ufSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKHNsaWRlckFib3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbiA9IChzbGlkZXJBYm91dCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIGluZGV4ID09PSBzbGlkZXJBYm91dC5yZWFsSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR1cEN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBYm91dC5zbGlkZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XHJcbiAgICAgICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWFib3V0IC5zZWUtbW9yZScpO1xyXG4gICAgICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaWRlVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1hYm91dF9faGlkZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChoaWRlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXRTd2lwZXIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIEJhY2stdG8tVG9wIEJ1dHRvblxyXG4gICAgY29uc3QgZ29Ub3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3VwJyk7XHJcbiAgICBjb25zdCB0cmFja1Njcm9sbCA9ICgpID0+IHtcclxuICAgICAgICBnb1RvcEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jywgd2luZG93LnNjcm9sbFkgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZ3NhcC50byh3aW5kb3csIHtzY3JvbGxUbzogMCwgZHVyYXRpb246IDEsIGVhc2U6ICdwb3dlcjIub3V0J30pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU2Nyb2xsKTtcclxuXHJcbiAgICAvLyBQb3B1cCBMb2dpY1xyXG4gICAgY29uc3Qgb3BlbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1wb3B1cCcpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTtcclxuICAgIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbEhlYWRlcicpO1xyXG4gICAgY29uc3QgY2xvc2VQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpO1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcGVuUG9wdXAgPSAocG9wdXApID0+IHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKHBvcHVwKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcG9wdXBzID0ge1xyXG4gICAgICAgIG1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKSxcclxuICAgICAgICB0aGlyZFBvcHVwOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50JylcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gcG9wdXBzLm1vZGFsO1xyXG4gICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUtaWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuYXBwZW5kQ2hpbGQodGVtcGxhdGVDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlyZFBvcHVwQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnRyaWdnZXItcGxheScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy5tb2RhbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMudGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBPYmplY3QudmFsdWVzKHBvcHVwcykuZm9yRWFjaChjbG9zZVBvcHVwKSk7XHJcblxyXG4gICAgLyogQW5pbWF0aW9ucyBmb3Igc2VjdGlvbnMgKi9cclxuICAgIC8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzcGluV2hlZWwoKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAzMDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7XHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIHdoZWVsRGF0YS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dG90YWxSb3RhdGlvbn1kZWcpYDtcclxuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBidG5TcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0RW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBidG5EaXNjb3VudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1mbGV4JztcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcblxyXG4gICAgY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS10cmlnZ2VyJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgZW5kOiAnKz0yNTAlJyxcclxuICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGluV2hlZWw6IHRydWUsXHJcbiAgICAgICAgICAgIHBpblNwYWNpbmc6IHRydWUsXHJcbiAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSByZXZlcnNlJyxcclxuICAgICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4gdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwoc2VsZi5wcm9ncmVzcyksXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFuaWZlc3RhdGlvbi1saXN0IHVsXCIpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IG1vYmlsZUljb25zID0gaWNvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5pY29uXCIpO1xyXG4gICAgY29uc3Qgc3RpY2t5VHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RpY2t5LXRyaWdnZXJcIik7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAtMTtcclxuICAgIGxldCBpc0xhc3RBbmltYXRpb24gPSBmYWxzZTtcclxuICAgIGNvbnN0IGRlbGF5QWZ0ZXJMYXN0QW5pbWF0aW9uID0gMjU7XHJcblxyXG4gICAgY29uc3Qgc2VjdGlvblRvcCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgY29uc3Qgc2VjdGlvbkhlaWdodCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3ltcHRvbVN0ZXAgPSBzZWN0aW9uSGVpZ2h0IC8gc3ltcHRvbXMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGlzTW9iaWxlID0gKCkgPT4gd2luZG93LmlubmVyV2lkdGggPCA3Njg7XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQtNC10YHQutGC0L7Qv9GWXHJcblxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBNYXRoLmFicyhpIC0gY3VycmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAwLjYgLSBmYWN0b3IgKiAoMC42IC0gMC4yKSAvIHN5bXB0b21zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJsdXIgPSBmYWN0b3IgKiAoNCAvIHN5bXB0b21zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gYGJsdXIoJHtibHVyfXB4KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQuNC70ZbQsiDRgdC40LzQv9GC0L7QvNGW0LIg0L3QsCDQvNC+0LHRltC70YzQvdC40YVcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZSA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMThweCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bXB0b21MaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3NoaWZ0V2lkdGh9cHgpYDtcclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7QvdC+0LLQu9C10L3QvdGPINGB0YLQsNC90YNcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTdGF0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChpc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlKGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0J/QvtC60LDQt9GD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINC60LDRgNGC0LjQvdC60YNcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDRltC60L7QvdC60LhcclxuICAgICAgICBpZiAobW9iaWxlSWNvbnMubGVuZ3RoID4gY3VycmVudFN5bXB0b21JbmRleCkge1xyXG4gICAgICAgICAgICBtb2JpbGVJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGkgPT09IGN1cnJlbnRTeW1wdG9tSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQntC90L7QstC70LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRlyDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKHByb2dyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBwcm9ncmVzcyAqIHNlY3Rpb25IZWlnaHQ7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvZ3Jlc3MpXHJcblxyXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTsgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGB0YLQsNC9INC90LAg0L7RgdC90L7QstGWINGW0L3QtNC10LrRgdGDXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQtNC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgIH07XHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGltZWxpbmUgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IFwiI2Fib3V0XCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA0MCVcIixcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dFwiKS5jbGFzc0xpc3QuYWRkKFwidGltZWxpbmUtc3RhcnRlZFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICB0aW1lbGluZVxyXG4gICAgICAgIC50byhcIi5waWxsLWFuaW1fX2NvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICBzY2FsZTogMC4yLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pblwiLFxyXG4gICAgICAgIH0sIFwiKz0wLjhcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2ltYWdlc1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5vdXRcIlxyXG4gICAgICAgIH0sIFwiLT0xXCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgeFBlcmNlbnQ6IC0xNTAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXHJcbiAgICAgICAgfSwgXCItPTAuMVwiKTtcclxuXHJcblxyXG4vLyBBTklNIFNFQ1RJT04gU1RJQ0tZXHJcbiAgICBTY3JvbGxUcmlnZ2VyLm1hdGNoTWVkaWEoe1xyXG4gICAgICAgIFwiKG1pbi13aWR0aDogNzY4cHgpXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGwyID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogJy5zdGlja3ktZ3JpZF9faW1nLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogJ2NlbnRlciB0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhbnRpY2lwYXRlUGluOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgbGV0IHJlc2l6ZVRpbWVvdXQ7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAvLyBDbGVhciB0aGUgcHJldmlvdXMgdGltZW91dFxyXG4gICAgICAgIGNsZWFyVGltZW91dChyZXNpemVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGEgbmV3IGRlYm91bmNlIHRpbWVvdXRcclxuICAgICAgICByZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dXICE9PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7IC8vIEFkanVzdCB0aGUgZGVsYXkgYXMgbmVlZGVkXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuLy9IT1ZFUiBQQVJBTExBWFxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjQpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lci1wYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdXNlID0ge3g6IDAsIHk6IDAsIG1vdmVkOiBmYWxzZX07XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3NhcC50aWNrZXIuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb3VzZS5tb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctcGFyYWxsYXgnKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SXQoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLXdhdmUtcGFyYWxsYXgnKSwgLTIwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vdXNlLm1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcGFyYWxsYXhJdCh0YXJnZXQsIG1vdmVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZ3NhcC50byh0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IChtb3VzZS54IC0gcmVjdC53aWR0aCAvIDIpIC8gcmVjdC53aWR0aCAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChtb3VzZS55IC0gcmVjdC5oZWlnaHQgLyAyKSAvIHJlY3QuaGVpZ2h0ICogbW92ZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5PdXRcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVJlY3QpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBTklNIFRJVExFXHJcbiAgICBjb25zdCBzZWN0aW9uczIgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5zZWN0aW9uLWFuaW0nKTtcclxuXHJcbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS10aXRsZSwgLmFuaW0tc3VidGl0bGUnLCBzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltID0gZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSxcclxuICAgICAgICAgICAgICAgIHtkdXJhdGlvbjogMSwgb3BhY2l0eTogMSwgeTogMCwgZWFzZTogXCJwb3dlcjEuaW5PdXRcIn1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGVsLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbSxcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IGRlbGF5LFxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZUJhY2s6IChzZWxmKSA9PiBzZWxmLmRpc2FibGUoKSxcclxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQU5JTSBFTEVNRU5UUyBTRUNUSU9OXHJcblxyXG4gICAgY29uc3Qgc2VjdGlvbnMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWNvbnRhaW5lcicpO1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7XHJcbiAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogMC4yLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIDc1JScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIG5vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
