/*
* to include js file write: `//= include ./path-to-file`
* */


document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    gsap.ticker.lagSmoothing(1000, 33);
    gsap.ticker.fps(60);

    // UTM
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];

    const urlParams = new URLSearchParams(window.location.search);

    const utms = utmKeys.map(key => urlParams.has(key) ? `${key}=${urlParams.get(key)}` : '').filter(Boolean);
    if (utms.length) {
        const utmGet = utms.join('&');
        document.querySelectorAll('a[href^="https://tabletki.ua"]').forEach(a => {
            let href = a.getAttribute('href');

            href += href.includes('?') ? `&${utmGet}` : `?${utmGet}`;

            a.setAttribute('href', href);
        });
    }
    //  end UTM

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
    const textStartTop = document.querySelector('.text-start-top');
    const textStartBottom = document.querySelector('.text-start-bottom');
    const textEnd = document.querySelector('.text-end');
    const btnDiscount1 = document.querySelector('.btn_discount-1');
    const btnDiscount2 = document.querySelector('.btn_discount-2');

    function spinWheel() {
        const targetSectorAngle = 300;
        const randomSpins = Math.floor(Math.random() * 5) + 5;
        const totalRotation = randomSpins * 360 + targetSectorAngle;

        wheelData.style.transform = `rotate(${totalRotation}deg)`;
        textStartTop.style.display = 'none';
        textStartBottom.style.display = 'none';
        btnSpin.style.display = 'none';

        setTimeout(() => {
            textEnd.style.display = 'block';
            btnDiscount1.style.display = 'inline-flex';
            btnDiscount2.style.display = 'inline-flex';
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

// Function to update symptom styles on the desktop

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

// Function to update symptom styles on the mobile

    const updateSymptomsStylesMobile = (currentIndex) => {
        symptoms.forEach((symptom, i) => {
            if (i <= currentIndex) {

                symptom.style.opacity = '1';
                symptom.style.filter = 'blur(0)';
            } else {
                const factor = Math.abs(i - currentIndex);  //
                const opacity = 0.6 - factor * (0.6 - 0.2) / symptoms.length;  //
                const blur = factor * (4 / symptoms.length); //
                symptom.style.opacity = '0.3';

                symptom.style.filter = 'blur(0)'; //
                symptom.style.opacity = opacity.toFixed(2); //
                symptom.style.filter = `blur(${blur}px)`; //
            }
            symptom.style.fontSize = '18px';
        });
        let shiftWidth = 0;
        for (let i = 0; i < currentIndex; i++) {
            shiftWidth += symptoms[i].offsetWidth + 8;
        }
        symptomList.style.transform = `translateX(-${shiftWidth}px)`;
    };

// Function to update the state

    const updateState = (index) => {
        if (isMobile()) {
            updateSymptomsStylesMobile(index);
        } else {
            updateSymptomsStylesDesktop(index);
        }

        // Show the corresponding image
        const newImageIndex = getImageIndexForSymptom(index);
        images.forEach((image, imgIndex) => {
            if (imgIndex === newImageIndex) {
                image.classList.add("visible");
            } else {
                image.classList.remove("visible");
            }
        });

        // Update the icons
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

// Update animation based on scrolling
    const updateAnimationOnScroll = (progress) => {
        const scrollPosition = progress * sectionHeight;

        if (!isLastAnimation) {
            symptoms.forEach((symptom, index) => {
                const start = index * symptomStep;
                const end = start + symptomStep;

                if (scrollPosition >= start && scrollPosition < end) {
                    if (currentSymptomIndex !== index) {
                        currentSymptomIndex = index;
                        updateState(index); // Update the state based on the index
                    }
                }
            });
        }

        // Logic to end the animation
        if (currentSymptomIndex === symptoms.length - 1 && !isLastAnimation) {
            setTimeout(() => {
                updateState(currentSymptomIndex);
            }, delayAfterLastAnimation);
        }
    };

// Function to determine which picture corresponds to the current symptom
    const getImageIndexForSymptom = (symptomIndex) => {

        if (symptomIndex >= 0 && symptomIndex <= 1) return 0; // Image 1 (symptoms 1–2)
        if (symptomIndex >= 2 && symptomIndex <= 4) return 1; // Image 2(symptoms 3–5)
        if (symptomIndex >= 5 && symptomIndex <= 6) return 2; // Image 3 (symptoms 5–6)
        if (symptomIndex >= 7 && symptomIndex <= 8) return 3; // Image 4 (symptom 9)

        return -1;// Without picture
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

    //BTN-PULSE
    const button = document.querySelector(".btn_pulse");

    ScrollTrigger.create({
        trigger: ".section-symptoms",
        start: "top center",
        onEnter: () => {
            gsap.to(button, {
                display: 'flex',
                autoAlpha: 1,
                duration: 0.5
            });
        },
        onLeaveBack: () => {
            gsap.to(button, {
                autoAlpha: 0,
                duration: 0.5,
                onComplete: () => button.style.display = 'none'
            });
        }
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gUmVnaXN0ZXIgR1NBUCBwbHVnaW5zXHJcbiAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIsIFNjcm9sbFRvUGx1Z2luKTtcclxuICAgIGdzYXAudGlja2VyLmxhZ1Ntb290aGluZygxMDAwLCAzMyk7XHJcbiAgICBnc2FwLnRpY2tlci5mcHMoNjApO1xyXG5cclxuICAgIC8vIFVUTVxyXG4gICAgY29uc3QgdXRtS2V5cyA9IFsndXRtX3NvdXJjZScsICd1dG1fbWVkaXVtJywgJ3V0bV9jYW1wYWlnbicsICd1dG1fdGVybScsICd1dG1fY29udGVudCcsICd1dG1faWQnXTtcclxuXHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgIGNvbnN0IHV0bXMgPSB1dG1LZXlzLm1hcChrZXkgPT4gdXJsUGFyYW1zLmhhcyhrZXkpID8gYCR7a2V5fT0ke3VybFBhcmFtcy5nZXQoa2V5KX1gIDogJycpLmZpbHRlcihCb29sZWFuKTtcclxuICAgIGlmICh1dG1zLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHV0bUdldCA9IHV0bXMuam9pbignJicpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCJodHRwczovL3RhYmxldGtpLnVhXCJdJykuZm9yRWFjaChhID0+IHtcclxuICAgICAgICAgICAgbGV0IGhyZWYgPSBhLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgaHJlZiArPSBocmVmLmluY2x1ZGVzKCc/JykgPyBgJiR7dXRtR2V0fWAgOiBgPyR7dXRtR2V0fWA7XHJcblxyXG4gICAgICAgICAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gIGVuZCBVVE1cclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAvLyBNb2JpbGUgTWVudVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2xpbmsnKTtcclxuXHJcbiAgICBjb25zdCB0b2dnbGVNZW51ID0gKGlzT3BlbikgPT4ge1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJywgaXNPcGVuKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicsICFpc09wZW4pO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZS1zY3JvbGwnLCBpc09wZW4pO1xyXG4gICAgICAgIG5hdk9wZW5IZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgaXNPcGVuKTtcclxuICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gaXNPcGVuID8gJ2ZsZXgnIDogJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0b2dnbGVNZW51KHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCAuLi5tZW51TGlua3NdLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlTWVudShmYWxzZSkpO1xyXG4gICAgfSk7XHJcblxyXG4vLyBIZWFkZXIgU2Nyb2xsIEFuaW1hdGlvblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbiAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBzY3JvbGxUb3AgPiBsYXN0U2Nyb2xsVG9wID8gJ3VwJyA6ICdkb3duJztcclxuXHJcbiAgICAgICAgZ3NhcC50byhoZWFkZXIsIHtcclxuICAgICAgICAgICAgeTogc2Nyb2xsVG9wID09PSAwID8gMCA6IGRpcmVjdGlvbiA9PT0gJ3VwJyA/ICctMTAwJScgOiAnMCUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC41LFxyXG4gICAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIHNjcm9sbFRvcCA8IGxhc3RTY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSAwKTtcclxuICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2Nyb2xsIHRvIEFuY2hvclxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKS5mb3JFYWNoKChhbmNob3IpID0+IHtcclxuICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJykuc3Vic3RyaW5nKDEpKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8od2luZG93LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG86IHRhcmdldEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4gU2Nyb2xsVHJpZ2dlci51cGRhdGUoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBY2NvcmRpb25cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0nKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25fX2l0ZW0nKS5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaWYgKCFpc0FjdGl2ZSkgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN3aXBlciBJbml0aWFsaXphdGlvblxyXG4gICAgbGV0IHNsaWRlckFib3V0O1xyXG4gICAgY29uc3QgaW5pdFN3aXBlciA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2xpZGVyQWJvdXQpIHNsaWRlckFib3V0LmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyQWJvdXRDb25maWcgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0XHJcbiAgICAgICAgICAgID8ge2VmZmVjdDogJ2ZhZGUnLCBzcGVlZDogMTAwMH1cclxuICAgICAgICAgICAgOiB7c3BhY2VCZXR3ZWVuOiAxMCwgc2xpZGVzUGVyVmlldzogJ2F1dG8nLCBicmVha3BvaW50czogezc2ODoge3NwYWNlQmV0d2VlbjogMjB9fX07XHJcblxyXG4gICAgICAgIHNsaWRlckFib3V0ID0gbmV3IFN3aXBlcignLnNsaWRlci1hYm91dCcsIHtcclxuICAgICAgICAgICAgLi4uc2xpZGVyQWJvdXRDb25maWcsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtlbDogJy5zbGlkZXItYWJvdXQgLnN3aXBlci1wYWdpbmF0aW9uJywgY2xpY2thYmxlOiB0cnVlfSxcclxuICAgICAgICAgICAgb246IHtzbGlkZUNoYW5nZTogdXBkYXRlQ3VzdG9tTmF2aWdhdGlvbn0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldHVwQ3VzdG9tTmF2aWdhdGlvbihzbGlkZXJBYm91dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUN1c3RvbU5hdmlnYXRpb24gPSAoc2xpZGVyQWJvdXQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWJvdXQtbmF2X19idG4nKS5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBpbmRleCA9PT0gc2xpZGVyQWJvdXQucmVhbEluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2V0dXBDdXN0b21OYXZpZ2F0aW9uID0gKHNsaWRlckFib3V0KSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0LW5hdl9fYnRuJykuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyQWJvdXQuc2xpZGVUbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xyXG4gICAgICAgIGNvbnN0IGJ0bnNTZWVNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1hYm91dCAuc2VlLW1vcmUnKTtcclxuICAgICAgICBidG5zU2VlTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGlkZVRleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtYWJvdXRfX2hpZGUtY29udGVudCcpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGlkZVRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlVGV4dC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0U3dpcGVyKTtcclxuXHJcblxyXG4gICAgLy8gQmFjay10by1Ub3AgQnV0dG9uXHJcbiAgICBjb25zdCBnb1RvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fdXAnKTtcclxuICAgIGNvbnN0IHRyYWNrU2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnLCB3aW5kb3cuc2Nyb2xsWSA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnb1RvcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnc2FwLnRvKHdpbmRvdywge3Njcm9sbFRvOiAwLCBkdXJhdGlvbjogMSwgZWFzZTogJ3Bvd2VyMi5vdXQnfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTY3JvbGwpO1xyXG5cclxuICAgIC8vIFBvcHVwIExvZ2ljXHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXBvcHVwJyk7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpO1xyXG4gICAgY29uc3QgcG9wdXBUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsSGVhZGVyJyk7XHJcbiAgICBjb25zdCBjbG9zZVBvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlUG9wdXAnKTtcclxuICAgIGNvbnN0IHRoaXJkUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheURpc2NvdW50Jyk7XHJcbiAgICBjb25zdCBjbG9zZVRoaXJkUG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VUaGlyZFBvcHVwJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICAgIGNvbnN0IG9wZW5Qb3B1cCA9IChwb3B1cCkgPT4ge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNsb3NlUG9wdXAgPSAocG9wdXApID0+IHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAuc2hvdycpKSB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGUtc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwb3B1cHMgPSB7XHJcbiAgICAgICAgbW9kYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpLFxyXG4gICAgICAgIHRoaXJkUG9wdXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5RGlzY291bnQnKVxyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1wb3B1cCcpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9wdXAgPSBwb3B1cHMubW9kYWw7XHJcbiAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZS1pZCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZUNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkUG9wdXBCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcudHJpZ2dlci1wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlyZFBvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAocG9wdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCh0aGlyZFBvcHVwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cChwb3B1cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkJ1eScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMubW9kYWwpKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVBvcHVwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjbG9zZVBvcHVwKHBvcHVwcy5tb2RhbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlVGhpcmRQb3B1cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VQb3B1cChwb3B1cHMudGhpcmRQb3B1cCkpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBPYmplY3QudmFsdWVzKHBvcHVwcykuZm9yRWFjaChjbG9zZVBvcHVwKSk7XHJcblxyXG4gICAgLyogQW5pbWF0aW9ucyBmb3Igc2VjdGlvbnMgKi9cclxuICAgIC8vIFNQSU4gUk9VTEVUVEVcclxuICAgIGNvbnN0IHdoZWVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3doZWVsJyk7XHJcbiAgICBjb25zdCB3aGVlbERhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2hlZWxEYXRhJyk7XHJcbiAgICBjb25zdCBidG5TcGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuICAgIGNvbnN0IHRleHRTdGFydFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LXN0YXJ0LXRvcCcpO1xyXG4gICAgY29uc3QgdGV4dFN0YXJ0Qm90dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtc3RhcnQtYm90dG9tJyk7XHJcbiAgICBjb25zdCB0ZXh0RW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZW5kJyk7XHJcbiAgICBjb25zdCBidG5EaXNjb3VudDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Rpc2NvdW50LTEnKTtcclxuICAgIGNvbnN0IGJ0bkRpc2NvdW50MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fZGlzY291bnQtMicpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNwaW5XaGVlbCgpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRTZWN0b3JBbmdsZSA9IDMwMDtcclxuICAgICAgICBjb25zdCByYW5kb21TcGlucyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgNTtcclxuICAgICAgICBjb25zdCB0b3RhbFJvdGF0aW9uID0gcmFuZG9tU3BpbnMgKiAzNjAgKyB0YXJnZXRTZWN0b3JBbmdsZTtcclxuXHJcbiAgICAgICAgd2hlZWxEYXRhLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0b3RhbFJvdGF0aW9ufWRlZylgO1xyXG4gICAgICAgIHRleHRTdGFydFRvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRleHRTdGFydEJvdHRvbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGJ0blNwaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRFbmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGJ0bkRpc2NvdW50MS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1mbGV4JztcclxuICAgICAgICAgICAgYnRuRGlzY291bnQyLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHdoZWVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3BpbldoZWVsKTtcclxuICAgIGJ0blNwaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzcGluV2hlZWwpO1xyXG5cclxuLy8gLy8gQU5JTSBCTE9DSyBXSVRIIEdJUkxcclxuXHJcbiAgICBjb25zdCB0bDEgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LXRyaWdnZXInLFxyXG4gICAgICAgICAgICBzdGFydDogJ3RvcCB0b3AnLFxyXG4gICAgICAgICAgICBlbmQ6ICcrPTMyNSUnLFxyXG4gICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgIHNwaW5XaGVlbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGluU3BhY2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIHJldmVyc2UnLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogc2VsZiA9PiB1cGRhdGVBbmltYXRpb25PblNjcm9sbChzZWxmLnByb2dyZXNzKSxcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFuaWZlc3RhdGlvblwiKTtcclxuICAgIGNvbnN0IHN5bXB0b21MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYW5pZmVzdGF0aW9uLWxpc3QgdWxcIik7XHJcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmltYWdlXCIpO1xyXG4gICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1tYW5pZmVzdGF0aW9uXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlSWNvbnMgPSBpY29uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmljb25cIik7XHJcbiAgICBjb25zdCBzdGlja3lUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGlja3ktdHJpZ2dlclwiKTtcclxuXHJcbiAgICBsZXQgY3VycmVudFN5bXB0b21JbmRleCA9IC0xO1xyXG4gICAgbGV0IGlzTGFzdEFuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgY29uc3QgZGVsYXlBZnRlckxhc3RBbmltYXRpb24gPSAyNTtcclxuXHJcbiAgICBjb25zdCBzZWN0aW9uVG9wID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gYW5pbWF0aW9uU2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgaXNNb2JpbGUgPSAoKSA9PiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2ODtcclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzeW1wdG9tIHN0eWxlcyBvbiB0aGUgZGVza3RvcFxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVN5bXB0b21zU3R5bGVzRGVza3RvcCA9IChjdXJyZW50SW5kZXgpID0+IHtcclxuICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpIDw9IGN1cnJlbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4JztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZmlsdGVyID0gJ2JsdXIoMCknO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5mb250U2l6ZSA9ICcwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzeW1wdG9tIHN0eWxlcyBvbiB0aGUgbW9iaWxlXHJcblxyXG4gICAgY29uc3QgdXBkYXRlU3ltcHRvbXNTdHlsZXNNb2JpbGUgPSAoY3VycmVudEluZGV4KSA9PiB7XHJcbiAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA8PSBjdXJyZW50SW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9ICdibHVyKDApJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGguYWJzKGkgLSBjdXJyZW50SW5kZXgpOyAgLy9cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wYWNpdHkgPSAwLjYgLSBmYWN0b3IgKiAoMC42IC0gMC4yKSAvIHN5bXB0b21zLmxlbmd0aDsgIC8vXHJcbiAgICAgICAgICAgICAgICBjb25zdCBibHVyID0gZmFjdG9yICogKDQgLyBzeW1wdG9tcy5sZW5ndGgpOyAvL1xyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XHJcblxyXG4gICAgICAgICAgICAgICAgc3ltcHRvbS5zdHlsZS5maWx0ZXIgPSAnYmx1cigwKSc7IC8vXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5LnRvRml4ZWQoMik7IC8vXHJcbiAgICAgICAgICAgICAgICBzeW1wdG9tLnN0eWxlLmZpbHRlciA9IGBibHVyKCR7Ymx1cn1weClgOyAvL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN5bXB0b20uc3R5bGUuZm9udFNpemUgPSAnMThweCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNoaWZ0V2lkdGggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgc2hpZnRXaWR0aCArPSBzeW1wdG9tc1tpXS5vZmZzZXRXaWR0aCArIDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5bXB0b21MaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3NoaWZ0V2lkdGh9cHgpYDtcclxuICAgIH07XHJcblxyXG4vLyBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXRlXHJcblxyXG4gICAgY29uc3QgdXBkYXRlU3RhdGUgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVTeW1wdG9tc1N0eWxlc01vYmlsZShpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXBkYXRlU3ltcHRvbXNTdHlsZXNEZXNrdG9wKGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNob3cgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2VcclxuICAgICAgICBjb25zdCBuZXdJbWFnZUluZGV4ID0gZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20oaW5kZXgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGltZ0luZGV4ID09PSBuZXdJbWFnZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgaWNvbnNcclxuICAgICAgICBpZiAobW9iaWxlSWNvbnMubGVuZ3RoID4gY3VycmVudFN5bXB0b21JbmRleCkge1xyXG4gICAgICAgICAgICBtb2JpbGVJY29ucy5mb3JFYWNoKChpY29uLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gY3VycmVudFN5bXB0b21JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyBVcGRhdGUgYW5pbWF0aW9uIGJhc2VkIG9uIHNjcm9sbGluZ1xyXG4gICAgY29uc3QgdXBkYXRlQW5pbWF0aW9uT25TY3JvbGwgPSAocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHByb2dyZXNzICogc2VjdGlvbkhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc3ltcHRvbXMuZm9yRWFjaCgoc3ltcHRvbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBzeW1wdG9tU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgc3ltcHRvbVN0ZXA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID49IHN0YXJ0ICYmIHNjcm9sbFBvc2l0aW9uIDwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTeW1wdG9tSW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeW1wdG9tSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoaW5kZXgpOyAvLyBVcGRhdGUgdGhlIHN0YXRlIGJhc2VkIG9uIHRoZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMb2dpYyB0byBlbmQgdGhlIGFuaW1hdGlvblxyXG4gICAgICAgIGlmIChjdXJyZW50U3ltcHRvbUluZGV4ID09PSBzeW1wdG9tcy5sZW5ndGggLSAxICYmICFpc0xhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShjdXJyZW50U3ltcHRvbUluZGV4KTtcclxuICAgICAgICAgICAgfSwgZGVsYXlBZnRlckxhc3RBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyBGdW5jdGlvbiB0byBkZXRlcm1pbmUgd2hpY2ggcGljdHVyZSBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBzeW1wdG9tXHJcbiAgICBjb25zdCBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbSA9IChzeW1wdG9tSW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAwICYmIHN5bXB0b21JbmRleCA8PSAxKSByZXR1cm4gMDsgLy8gSW1hZ2UgMSAoc3ltcHRvbXMgMeKAkzIpXHJcbiAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAyICYmIHN5bXB0b21JbmRleCA8PSA0KSByZXR1cm4gMTsgLy8gSW1hZ2UgMihzeW1wdG9tcyAz4oCTNSlcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDUgJiYgc3ltcHRvbUluZGV4IDw9IDYpIHJldHVybiAyOyAvLyBJbWFnZSAzIChzeW1wdG9tcyA14oCTNilcclxuICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDcgJiYgc3ltcHRvbUluZGV4IDw9IDgpIHJldHVybiAzOyAvLyBJbWFnZSA0IChzeW1wdG9tIDkpXHJcblxyXG4gICAgICAgIHJldHVybiAtMTsvLyBXaXRob3V0IHBpY3R1cmVcclxuICAgIH07XHJcblxyXG5cclxuLy8gICAgQU5JTUFUSU9OIFBJTExcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuICAgIGNvbnN0IGdldER1cmF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiAyICsgTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGdldFJvdGF0aW9uUmFuZG9tVmFsdWUgPSAoKSA9PiBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50XCIpLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7cmVwZWF0OiAtMSwgeW95bzogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB0bC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgeTogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBnZXREdXJhdGlvblJhbmRvbVZhbHVlKCksXHJcbiAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50byhjb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgIHk6IGArPSR7Z2V0Q29vcmRpbmF0ZXNSYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICB4OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb246IGArPSR7Z2V0Um90YXRpb25SYW5kb21WYWx1ZSgpfWAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZ2V0RHVyYXRpb25SYW5kb21WYWx1ZSgpLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJzaW5lLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oY29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICB5OiBgKz0ke2dldENvb3JkaW5hdGVzUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgeDogYCs9JHtnZXRDb29yZGluYXRlc1JhbmRvbVZhbHVlKCl9YCxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBgKz0ke2dldFJvdGF0aW9uUmFuZG9tVmFsdWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGdldER1cmF0aW9uUmFuZG9tVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFwic2luZS5pbk91dFwiLFxyXG4gICAgICAgICAgICAgICAgZm9yY2UzRDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogXCIjYWJvdXRcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDMwJVwiLFxyXG4gICAgICAgICAgICBvbkVudGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFib3V0XCIpLmNsYXNzTGlzdC5hZGQoXCJ0aW1lbGluZS1zdGFydGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRpbWVsaW5lXHJcbiAgICAgICAgLnRvKFwiLnBpbGwtYW5pbV9fY29tcG9uZW50c1wiLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwLjIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjUsXHJcbiAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluXCIsXHJcbiAgICAgICAgICAgIGZvcmNlM0Q6IHRydWUsXHJcbiAgICAgICAgICAgIGxhenk6IHRydWVcclxuICAgICAgICB9LCBcIis9MC40XCIpXHJcbiAgICAgICAgLmZyb20oXCIucGlsbC1hbmltX19pbWFnZXNcIiwge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBzY2FsZTogMCxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEuNSxcclxuICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEub3V0XCIsXHJcbiAgICAgICAgICAgIGZvcmNlM0Q6IHRydWUsXHJcbiAgICAgICAgfSwgXCItPTAuOFwiKVxyXG4gICAgICAgIC5mcm9tKFwiLnBpbGwtYW5pbV9fbG9nb1wiLCB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHhQZXJjZW50OiAtMTUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgICAgICBmb3JjZTNEOiB0cnVlLFxyXG4gICAgICAgIH0sIFwiLT0wLjFcIik7XHJcblxyXG5cclxuLy8gQU5JTSBTRUNUSU9OIFNUSUNLWVxyXG4gICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKHtcclxuICAgICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRsMiA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6ICcuc3RpY2t5LWdyaWRfX2ltZy1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICdjZW50ZXIgdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBwaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGluU3BhY2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYW50aWNpcGF0ZVBpbjogMSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBcInBvd2VyMS5pbk91dFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGxldCByZXNpemVUaW1lb3V0O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIHByZXZpb3VzIHRpbWVvdXRcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZW91dCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBhIG5ldyBkZWJvdW5jZSB0aW1lb3V0XHJcbiAgICAgICAgcmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93VyAhPT0gd2luZG93LmlubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVpbml0aWFsaXplIHRoZSBzd2lwZXIgY29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICAgICAgaW5pdFN3aXBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIC8vIExpc3RlbiBmb3IgcmVzaXplIGV2ZW50cyB0byB0b2dnbGUgcGFyYWxsYXggYmFzZWQgb24gdmlld3BvcnQgd2lkdGhcclxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZVBhcmFsbGF4RWxlbWVudFJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTsgLy8gQWRqdXN0IHRoZSBkZWxheSBhcyBuZWVkZWRcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vSE9WRVIgUEFSQUxMQVhcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQYXJhbGxheExpc3RlbmVycygpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFsbGF4RWxlbWVudHMgPSBbY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctcGFyYWxsYXgnKSwgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLXdhdmUtcGFyYWxsYXgnKV1cclxuICAgICAgICAgICAgcGFyYWxsYXhFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBnc2FwIHN0eWxlcyBhZnRlciByZXNpemVcclxuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSBwYXJhbGxheGxpc3RlbmVyc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlTW91c2VNb3ZlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhcmFsbGF4bGlzdGVuZXJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFsbGF4bGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBnc2FwLnRpY2tlci5yZW1vdmUodXBkYXRlUGFyYWxsYXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSAxMDI0KSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXItcGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3VzZSA9IHt4OiAwLCB5OiAwLCBtb3ZlZDogZmFsc2V9O1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgbW91c2UueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdzYXAudGlja2VyLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW91c2UubW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW1nLXBhcmFsbGF4JyksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEl0KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmFjay13YXZlLXBhcmFsbGF4JyksIC0yMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb3VzZS5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhcmFsbGF4SXQodGFyZ2V0LCBtb3ZlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICB4OiAobW91c2UueCAtIHJlY3Qud2lkdGggLyAyKSAvIHJlY3Qud2lkdGggKiBtb3ZlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAobW91c2UueSAtIHJlY3QuaGVpZ2h0IC8gMikgLyByZWN0LmhlaWdodCAqIG1vdmVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFwicG93ZXIxLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF6eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVSZWN0KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVJlY3QpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjdCgpIHtcclxuICAgICAgICAgICAgICAgIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBTklNIFRJVExFXHJcbiAgICBjb25zdCBzZWN0aW9uczIgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5zZWN0aW9uLWFuaW0nKTtcclxuXHJcbiAgICBzZWN0aW9uczIuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS10aXRsZSwgLmFuaW0tc3VidGl0bGUnLCBzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNUaXRsZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnYW5pbS10aXRsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IGlzVGl0bGUgPyAwLjQgOiAwLjI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltID0gZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB5OiAtMTAwfSxcclxuICAgICAgICAgICAgICAgIHtkdXJhdGlvbjogMSwgb3BhY2l0eTogMSwgeTogMCwgZWFzZTogXCJwb3dlcjEuaW5PdXRcIn1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGVsLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6ICd0b3AgY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbSxcclxuICAgICAgICAgICAgICAgIHN0YWdnZXI6IGRlbGF5LFxyXG4gICAgICAgICAgICAgICAgb25MZWF2ZUJhY2s6IChzZWxmKSA9PiBzZWxmLmRpc2FibGUoKSxcclxuICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQU5JTSBFTEVNRU5UUyBTRUNUSU9OXHJcblxyXG4gICAgY29uc3Qgc2VjdGlvbnMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5hbmltLWNvbnRhaW5lcicpO1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZ3NhcC51dGlscy50b0FycmF5KCcuYW5pbS1pdGVtJywgc2VjdGlvbik7XHJcbiAgICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICB7b3BhY2l0eTogMCwgeTogMTAwfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC42LFxyXG4gICAgICAgICAgICAgICAgc3RhZ2dlcjogMC4yLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjEuaW5PdXRcIixcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBzZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAndG9wIDc1JScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQWN0aW9uczogJ3BsYXkgbm9uZSBub25lIG5vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9CVE4tUFVMU0VcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX3B1bHNlXCIpO1xyXG5cclxuICAgIFNjcm9sbFRyaWdnZXIuY3JlYXRlKHtcclxuICAgICAgICB0cmlnZ2VyOiBcIi5zZWN0aW9uLXN5bXB0b21zXCIsXHJcbiAgICAgICAgc3RhcnQ6IFwidG9wIGNlbnRlclwiLFxyXG4gICAgICAgIG9uRW50ZXI6ICgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC50byhidXR0b24sIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgIGF1dG9BbHBoYTogMSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLjVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkxlYXZlQmFjazogKCkgPT4ge1xyXG4gICAgICAgICAgICBnc2FwLnRvKGJ1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgYXV0b0FscGhhOiAwLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==
