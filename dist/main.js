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
    const openButtons = document.querySelectorAll('.open-popup'); // Кнопки для відкриття перших двох попапів
    const popup = document.getElementById('modal'); // Перший/Другий Попап
    const popupText = document.getElementById('modalHeader');
    const closePopupButton = document.getElementById('closePopup');
    // const overlay = document.querySelector('.overlay');
    const thirdPopup = document.getElementById('playDiscount'); // Третій Попап
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
    window.addEventListener('resize', () => {
        if (windowW !== window.innerWidth) {
            windowW = window.innerWidth;
            ScrollTrigger.refresh();
        }
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
                    toggleActions: 'play none none reverse',
                    once: true,
                },
            }
        );
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19uYXYnKTtcclxuICAgIGNvbnN0IG5hdk9wZW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2J1cmdlcicpO1xyXG4gICAgY29uc3QgYnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZU1lbnUgPSAoaXNPcGVuKSA9PiB7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJywgIWlzT3Blbik7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlLXNjcm9sbCcsIGlzT3Blbik7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpc09wZW4pO1xyXG4gICAgICAgIGJ0bkNsb3NlLnN0eWxlLmRpc3BsYXkgPSBpc09wZW4gPyAnZmxleCcgOiAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRvZ2dsZU1lbnUodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBbYnRuQ2xvc2UsIC4uLm1lbnVMaW5rc10uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVNZW51KGZhbHNlKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIZWFkZXIgU2Nyb2xsIEFuaW1hdGlvblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbiAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzY3JvbGxUb3AgPiBsYXN0U2Nyb2xsVG9wID8gJ3VwJyA6ICdkb3duJztcclxuXHJcbiAgICAgICAgZ3NhcC50byhoZWFkZXIsIHtcclxuICAgICAgICAgICAgeTogc2Nyb2xsVG9wID09PSAwID8gMCA6IGRpcmVjdGlvbiA9PT0gJ3VwJyA/ICctMTAwJScgOiAnMCUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC41LFxyXG4gICAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBzY3JvbGxUb3AgPCBsYXN0U2Nyb2xsVG9wIHx8IHNjcm9sbFRvcCA9PT0gMCk7XHJcbiAgICAgICAgbGFzdFNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNjcm9sbCB0byBBbmNob3JcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJykuZm9yRWFjaCgoYW5jaG9yKSA9PiB7XHJcbiAgICAgICAgYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW5jaG9yLmdldEF0dHJpYnV0ZSgnaHJlZicpLnN1YnN0cmluZygxKSk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHdpbmRvdywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvOiB0YXJnZXRFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFjY29yZGlvblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9faXRlbScpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dpcGVyIEluaXRpYWxpemF0aW9uXHJcbiAgICBsZXQgc2xpZGVyQWJvdXQ7XHJcbiAgICBjb25zdCBpbml0U3dpcGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzbGlkZXJBYm91dCkgc2xpZGVyQWJvdXQuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBzbGlkZXJBYm91dENvbmZpZyA9IHdpbmRvdy5pbm5lcldpZHRoID49IDEwMjRcclxuICAgICAgICAgICAgPyB7ZWZmZWN0OiAnZmFkZScsIHNwZWVkOiAxMDAwfVxyXG4gICAgICAgICAgICA6IHtzcGFjZUJldHdlZW46IDEwLCBzbGlkZXNQZXJWaWV3OiAnYXV0bycsIGJyZWFrcG9pbnRzOiB7NzY4OiB7c3BhY2VCZXR3ZWVuOiAyMH19fTtcclxuXHJcbiAgICAgICAgc2xpZGVyQWJvdXQgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWFib3V0Jywge1xyXG4gICAgICAgICAgICAuLi5zbGlkZXJBYm91dENvbmZpZyxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge2VsOiAnLnNsaWRlci1hYm91dCAuc3dpcGVyLXBhZ2luYXRpb24nLCBjbGlja2FibGU6IHRydWV9LFxyXG4gICAgICAgICAgICBvbjoge3NsaWRlQ2hhbmdlOiB1cGRhdGVDdXN0b21OYXZpZ2F0aW9ufSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0dXBDdXN0b21OYXZpZ2F0aW9uKHNsaWRlckFib3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbiA9IChzbGlkZXJBYm91dCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hYm91dC1uYXZfX2J0bicpLmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIGluZGV4ID09PSBzbGlkZXJBYm91dC5yZWFsSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR1cEN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBYm91dC5zbGlkZVRvKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdFN3aXBlcik7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5pdFN3aXBlcik7XHJcblxyXG4gICAgLy8gQmFjay10by1Ub3AgQnV0dG9uXHJcbiAgICBjb25zdCBnb1RvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXAnKTtcclxuICAgIGNvbnN0IHRyYWNrU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnLCB3aW5kb3cuc2Nyb2xsWSA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnb1RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnc2FwLnRvKHdpbmRvdywge3Njcm9sbFRvOiAwLCBkdXJhdGlvbjogMSwgZWFzZTogJ3Bvd2VyMi5vdXQnfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG5cclxuICAgIC8vIFBvcHVwIExvZ2ljXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7IC8vINCa0L3QvtC/0LrQuCDQtNC70Y8g0LLRltC00LrRgNC40YLRgtGPINC/0LXRgNGI0LjRhSDQtNCy0L7RhSDQv9C+0L/QsNC/0ZbQslxyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTsgLy8g0J/QtdGA0YjQuNC5L9CU0YDRg9Cz0LjQuSDQn9C+0L/QsNC/XHJcbiAgICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxIZWFkZXInKTtcclxuICAgIGNvbnN0IGNsb3NlUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VQb3B1cCcpO1xyXG4gICAgLy8gY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCB0aGlyZFBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlEaXNjb3VudCcpOyAvLyDQotGA0LXRgtGW0Lkg0J/QvtC/0LDQv1xyXG4gICAgY29uc3QgY2xvc2VUaGlyZFBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcGVuUG9wdXAgPSAocG9wdXApID0+IHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKHBvcHVwKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLnNob3cnKSkge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcG9wdXBzID0ge1xyXG4gICAgICAgIG1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKSxcclxuICAgICAgICB0aGlyZFBvcHVwOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50JylcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcG9wdXAnKS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gcG9wdXBzLm1vZGFsO1xyXG4gICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVJZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUtaWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQuYXBwZW5kQ2hpbGQodGVtcGxhdGVDb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlyZFBvcHVwQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnRyaWdnZXItcGxheScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcmRQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKHBvcHVwKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wdXAodGhpcmRQb3B1cCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy5tb2RhbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMudGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBPYmplY3QudmFsdWVzKHBvcHVwcykuZm9yRWFjaChjbG9zZVBvcHVwKSk7XHJcblxyXG4gICAgLyogQW5pbWF0aW9ucyBmb3Igc2VjdGlvbnMgKi9cclxuICAgIC8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0Jyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzcGluV2hlZWwoKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VjdG9yQW5nbGUgPSAzMDA7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tU3BpbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDU7XHJcbiAgICAgICAgY29uc3QgdG90YWxSb3RhdGlvbiA9IHJhbmRvbVNwaW5zICogMzYwICsgdGFyZ2V0U2VjdG9yQW5nbGU7XHJcblxyXG4gICAgICAgIHdoZWVsRGF0YS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dG90YWxSb3RhdGlvbn1kZWcpYDtcclxuICAgICAgICB0ZXh0U3RhcnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBidG5TcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXh0RW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBidG5EaXNjb3VudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1mbGV4JztcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB3aGVlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNwaW5XaGVlbCk7XHJcbiAgICBidG5TcGluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuXHJcbi8vIC8vIEFOSU0gQkxPQ0sgV0lUSCBHSVJMXHJcblxyXG4gICAgY29uc3QgdGwxID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnLnN0aWNreS10cmlnZ2VyJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgZW5kOiAnKz0yNTAlJyxcclxuICAgICAgICAgICAgcGluOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGluV2hlZWw6IHRydWUsXHJcbiAgICAgICAgICAgIHBpblNwYWNpbmc6IHRydWUsXHJcbiAgICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6ICdwbGF5IG5vbmUgbm9uZSByZXZlcnNlJyxcclxuICAgICAgICAgICAgb25VcGRhdGU6IHNlbGYgPT4gdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwoc2VsZi5wcm9ncmVzcyksXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc3ltcHRvbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hbmlmZXN0YXRpb25cIik7XHJcbiAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFuaWZlc3RhdGlvbi1saXN0IHVsXCIpO1xyXG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbWFnZVwiKTtcclxuICAgIGNvbnN0IGljb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pY29uc1wiKTtcclxuICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN0aWNreVRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0aWNreS10cmlnZ2VyXCIpO1xyXG5cclxuICAgIGxldCBjdXJyZW50U3ltcHRvbUluZGV4ID0gLTE7XHJcbiAgICBsZXQgaXNMYXN0QW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICBjb25zdCBkZWxheUFmdGVyTGFzdEFuaW1hdGlvbiA9IDUwMDtcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC00LXRgdC60YLQvtC/0ZZcclxuXHJcbiAgICBjb25zdCB1cGRhdGVTeW1wdG9tc1N0eWxlc0Rlc2t0b3AgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGguYWJzKGkgLSBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3BhY2l0eSA9IDAuNiAtIGZhY3RvciAqICgwLjYgLSAwLjIpIC8gc3ltcHRvbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmx1ciA9IGZhY3RvciAqICg0IC8gc3ltcHRvbXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eS50b0ZpeGVkKDIpO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSBgYmx1cigke2JsdXJ9cHgpYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtC40LvRltCyINGB0LjQvNC/0YLQvtC80ZbQsiDQvdCwINC80L7QsdGW0LvRjNC90LjRhVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzTW9iaWxlID0gKGN1cnJlbnRJbmRleCkgPT4ge1xyXG4gICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gY3VycmVudEluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SW5kZXg7IGkrKykge1xyXG4gICAgICAgICAgICBzaGlmdFdpZHRoICs9IHN5bXB0b21zW2ldLm9mZnNldFdpZHRoICsgODtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ltcHRvbUxpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2hpZnRXaWR0aH1weClgO1xyXG4gICAgfTtcclxuXHJcbi8vINCk0YPQvdC60YbRltGPINC00LvRjyDQvtC90L7QstC70LXQvdC90Y8g0YHRgtCw0L3Rg1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVN0YXRlID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUoaW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9C+0LrQsNC30YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0LrQsNGA0YLQuNC90LrRg1xyXG4gICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWdJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1nSW5kZXggPT09IG5ld0ltYWdlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGW0LrQvtC90LrQuFxyXG4gICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tc1tpbmRleF0/LmRhdGFzZXQuaWNvbjtcclxuICAgICAgICBpZiAoaWNvblNyYykge1xyXG4gICAgICAgICAgICBpY29uc0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNyYyA9IGljb25TcmM7XHJcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgaWNvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQntC90L7QstC70LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRlyDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgIGNvbnN0IHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsID0gKHByb2dyZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBwcm9ncmVzcyAqIHNlY3Rpb25IZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmICghaXNMYXN0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHN5bXB0b21zLmZvckVhY2goKHN5bXB0b20sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4ICogc3ltcHRvbVN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArIHN5bXB0b21TdGVwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzdGFydCAmJiBzY3JvbGxQb3NpdGlvbiA8IGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ltcHRvbUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKGluZGV4KTsgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INGB0YLQsNC9INC90LAg0L7RgdC90L7QstGWINGW0L3QtNC10LrRgdGDXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINCb0L7Qs9GW0LrQsCDQtNC70Y8g0LfQsNCy0LXRgNGI0LXQvdC90Y8g0LDQvdGW0LzQsNGG0ZbRl1xyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5VHJpZ2dlci5zdHlsZS50b3AgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIHN0aWNreVRyaWdnZXIuc3R5bGUuc2Nyb2xsID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lUcmlnZ2VyLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoY3VycmVudFN5bXB0b21JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDAgJiYgc3ltcHRvbUluZGV4IDw9IDIpIHJldHVybiAwOyAvLyDQmtCw0YDRgtC40L3QutCwIDEgKNGB0LjQvNC/0YLQvtC80LggMeKAkzMpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gNiAmJiBzeW1wdG9tSW5kZXggPD0gNykgcmV0dXJuIDI7IC8vINCa0LDRgNGC0LjQvdC60LAgMyAo0YHQuNC80L/RgtC+0LzQuCA34oCTOClcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID09PSA4KSByZXR1cm4gMzsgLy8g0JrQsNGA0YLQuNC90LrQsCA0ICjRgdC40LzQv9GC0L7QvCA5KVxyXG4gICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgIH07XHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGltZWxpbmUgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6IFwiI2Fib3V0XCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCAzNSVcIixcclxuICAgICAgICAgICAgb25FbnRlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhYm91dFwiKS5jbGFzc0xpc3QuYWRkKFwidGltZWxpbmUtc3RhcnRlZFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICB0aW1lbGluZVxyXG4gICAgICAgIC50byhcIi5waWxsLWFuaW1fX2NvbXBvbmVudHNcIiwge1xyXG4gICAgICAgICAgICBzY2FsZTogMC4yLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pblwiLFxyXG4gICAgICAgIH0sIFwiKz0wLjhcIilcclxuICAgICAgICAuZnJvbShcIi5waWxsLWFuaW1fX2ltYWdlc1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIHNjYWxlOiAwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMS41LFxyXG4gICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5vdXRcIlxyXG4gICAgICAgIH0sIFwiLT0xXCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19sb2dvXCIsIHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgeFBlcmNlbnQ6IC0xNTAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXHJcbiAgICAgICAgfSwgXCItPTAuMVwiKTtcclxuXHJcblxyXG4vLyBBTklNIFNFQ1RJT04gU1RJQ0tZXHJcbiAgICBTY3JvbGxUcmlnZ2VyLm1hdGNoTWVkaWEoe1xyXG4gICAgICAgIFwiKG1pbi13aWR0aDogNzY4cHgpXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGwyID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogJy5zdGlja3ktZ3JpZF9faW1nLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogJ2NlbnRlciB0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwaW5TcGFjaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhbnRpY2lwYXRlUGluOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBpZiAod2luZG93VyAhPT0gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4vL0hPVkVSIFBBUkFMTEFYXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFpbmVyLXBhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgbW91c2UgPSB7eDogMCwgeTogMCwgbW92ZWQ6IGZhbHNlfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbW91c2UueCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgICAgICAgICAgICAgIG1vdXNlLnkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnc2FwLnRpY2tlci5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlLm1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmltZy1wYXJhbGxheCcpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJdChjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhY2std2F2ZS1wYXJhbGxheCcpLCAtMjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW91c2UubW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJhbGxheEl0KHRhcmdldCwgbW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBnc2FwLnRvKHRhcmdldCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogKG1vdXNlLnggLSByZWN0LndpZHRoIC8gMikgLyByZWN0LndpZHRoICogbW92ZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKG1vdXNlLnkgLSByZWN0LmhlaWdodCAvIDIpIC8gcmVjdC5oZWlnaHQgKiBtb3ZlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pbk91dFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVJlY3QpO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlUmVjdCk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVSZWN0KCkge1xyXG4gICAgICAgICAgICAgICAgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFOSU0gVElUTEVcclxuICAgIGNvbnN0IHNlY3Rpb25zMiA9IGdzYXAudXRpbHMudG9BcnJheSgnLnNlY3Rpb24tYW5pbScpO1xyXG5cclxuICAgIHNlY3Rpb25zMi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLXRpdGxlLCAuYW5pbS1zdWJ0aXRsZScsIHNlY3Rpb24pO1xyXG5cclxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc1RpdGxlID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gaXNUaXRsZSA/IDAuNCA6IDAuMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW0gPSBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHk6IC0xMDB9LFxyXG4gICAgICAgICAgICAgICAge2R1cmF0aW9uOiAxLCBvcGFjaXR5OiAxLCB5OiAwLCBlYXNlOiBcInBvd2VyMS5pbk91dFwifVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZWwsXHJcbiAgICAgICAgICAgICAgICBzdGFydDogJ3RvcCBjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltLFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogZGVsYXksXHJcbiAgICAgICAgICAgICAgICBvbkxlYXZlQmFjazogKHNlbGYpID0+IHNlbGYuZGlzYWJsZSgpLFxyXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBTklNIEVMRU1FTlRTIFNFQ1RJT05cclxuXHJcbiAgICBjb25zdCBzZWN0aW9ucyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmFuaW0tY29udGFpbmVyJyk7XHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWl0ZW0nLCBzZWN0aW9uKTtcclxuICAgICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAxMDB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiAwLjIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IHNlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgNzUlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVBY3Rpb25zOiAncGxheSBub25lIG5vbmUgcmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
