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

    // ANIM BLOCK WITH GERL
        const symptoms = document.querySelectorAll(".symptom");
        const symptomList = document.querySelector(".symptom-list ul");
        const images = document.querySelectorAll(".image");
        const iconsContainer = document.querySelector(".icons");
        const animationSection = document.querySelector(".section-manifestation");

        let currentSymptomIndex = 0; // Індекс поточного активного симптому
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

        // Оновлюємо анімацію на основі скролу
        const updateAnimationOnScroll = () => {
            const scrollPosition = window.scrollY - sectionTop;

            symptoms.forEach((symptom, index) => {
                const start = index * symptomStep;
                const end = start + symptomStep;

                if (scrollPosition >= start && scrollPosition < end) {
                    if (currentSymptomIndex !== index) {
                        currentSymptomIndex = index;

                        // Робимо всі симптоми розмитими
                        symptoms.forEach((s, i) => {
                            if (i === index) {
                                s.classList.add("visible"); // Активний
                            } else {
                                s.classList.remove("visible"); // Інші залишаються розмитими
                            }
                        });

                        // Зсуваємо `ul` вліво на ширину попереднього пункту
                        let shiftWidth = 0;
                        if (index > 0) {
                            const prevSymptom = symptoms[index - 1];
                            shiftWidth = prevSymptom.offsetWidth + 20; // Враховуємо gap
                        }
                        symptomList.style.transform = `translateX(-${shiftWidth * index}px)`;

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
                        const iconSrc = symptom.dataset.icon;
                        if (iconSrc) {
                            iconsContainer.innerHTML = ""; // Очищаємо попередні іконки
                            const iconElement = document.createElement("img");
                            iconElement.src = iconSrc;
                            iconElement.classList.add("icon", "visible");
                            iconsContainer.appendChild(iconElement);
                        }
                    }
                }
            });
        };

        // Прив'язка функції до події скролу
        window.addEventListener("scroll", updateAnimationOnScroll);

// // SCROLL TO ANCHOR
//     function smoothScrollToAnchor(selector) {
//         document.querySelectorAll(selector).forEach((element) => {
//             element.addEventListener('click', function (event) {
//                 const anchor = this.getAttribute('href');
//
//                 if (anchor.startsWith('#') && anchor !== '#') {
//                     event.preventDefault();
//
//                     const targetElement = document.querySelector(anchor);
//                     if (targetElement) {
//                         window.scrollTo({
//                             top: targetElement.offsetTop,
//                             behavior: 'smooth'
//                         });
//                     }
//                 }
//             });
//         });
//     }
//
//     smoothScrollToAnchor('.menu__item a');
//     smoothScrollToAnchor('.sub-menu__item a');
//     smoothScrollToAnchor('.card-product__link-wrap a');
//     smoothScrollToAnchor('.section-banner .btn_stroke');
//
//
// // HEADER AND DISCLAIMER SCROLL
//
//     const header = document.querySelector('.header');
//     const bannerHeight =document.querySelector('.section-banner').offsetHeight;
//     const fixedBlock = document.querySelector('.disclaimer_main');
//
//     const targetSection = document.querySelector('#sectionHotBg');
//
//     const documentHeight = document.documentElement.scrollHeight;
//     const viewportHeight = window.innerHeight;
//
//     const targetSectionOffsetTop = targetSection ? targetSection.offsetTop : 0;
//     const targetSectionHeight = targetSection ? targetSection.offsetHeight : 0;
//
//     let lastScrollY = window.scrollY;
//     let isHeaderHidden = false;
//
//     window.addEventListener('scroll', function () {
//         const scrollPosition = window.scrollY;
//
//         if (scrollPosition > lastScrollY && !isHeaderHidden) {
//             header.classList.add('hidden');
//             isHeaderHidden = true;
//         } else if (scrollPosition < lastScrollY && isHeaderHidden) {
//             header.classList.remove('hidden');
//             isHeaderHidden = false;
//         }
//         if (scrollPosition > (bannerHeight - 48)) {
//             header.classList.add('scroll');
//         } else {
//             header.classList.remove('scroll');
//         }
//
//         if (scrollPosition >= targetSectionOffsetTop && scrollPosition < targetSectionOffsetTop + targetSectionHeight) {
//             header.classList.remove('scroll');
//         } else if (scrollPosition >= bannerHeight - 48) {
//             header.classList.add('scroll');
//         }
//
//         if (fixedBlock) {
//             if (scrollPosition > (bannerHeight - 48)) {
//                 fixedBlock.classList.add('scroll');
//             } else {
//                 fixedBlock.classList.remove('scroll');
//             }
//
//             if (window.scrollY + viewportHeight >= documentHeight) {
//                 fixedBlock.classList.remove('scroll');
//             }
//         }
//         lastScrollY = scrollPosition;
//     });
//
// // CHANGED BG CARD BTN HOVER
//     const bgChangeButtons = document.querySelectorAll('.bg-change');
//     if (document.querySelector('.bg-change')) {
//         bgChangeButtons.forEach(button => {
//             button.addEventListener('mouseover', () => {
//                 const card = button.closest('.card-product');
//                 card.classList.add('bg-show');
//             });
//
//             button.addEventListener('mouseleave', () => {
//                 const card = button.closest('.card-product');
//                 card.classList.remove('bg-show');
//             });
//         });
//     }
//
// //CARD-HOT HIDE
//     const cpHot = document.querySelector('.card-product_hot');
//     const btnScScroll = document.querySelector('.btn-hot');
//     const overlay = document.querySelector('.overlay');
//     const productLink = document.querySelector('.card-product__link');
//
//     if (document.querySelector('.card-product_hot')) {
//         btnScScroll.addEventListener('click', function (e) {
//             e.preventDefault();
//             cpHot.classList.add('show');
//             btnScScroll.classList.add('show');
//             overlay.classList.add('show');
//         });
//         overlay.addEventListener('click', function (e) {
//             e.preventDefault();
//             cpHot.classList.remove('show');
//             btnScScroll.classList.remove('show');
//             overlay.classList.remove('show');
//         });
//         productLink.addEventListener('click', function (e) {
//             cpHot.classList.remove('show');
//             btnScScroll.classList.remove('show');
//             overlay.classList.remove('show');
//         });
//     }
//
// //SLIDER FEATURES
//     if (document.querySelector('.slider-features')) {
//         const sliderFeatures = new Swiper('.slider-features ', {
//             spaceBetween: 24,
//
//             speed: 1500,
//             pagination: {
//                 el: '.slider-features .swiper-pagination',
//                 clickable: true,
//             },
//             navigation: {
//                 nextEl: '.slider-features .swiper-button-next',
//                 prevEl: '.slider-features .swiper-button-prev',
//             },
//             breakpoints: {
//                 568: {
//                     slidesPerView: 'auto',
//                 }
//             }
//         });
//     }
// //SLIDERS
//     let sliderProducts;
//     let sliderPurpose;
//     let cardListSlider;
//     let appSlider;
//
//     const identicalSwiperIds = ['#sliderDosage1', '#sliderDosage2', '#sliderDosage3'];
//     let identicalSwipers = [];
//
//     function initSwipers() {
//         const screenWidth = window.innerWidth;
//
//         if (screenWidth <= 1023) {
//             if (!sliderProducts) {
//                 sliderProducts = new Swiper('.slider-products', {
//                     spaceBetween: 24,
//                     breakpoints: {
//                         1023: {
//                             slidesPerView: 2,
//                         }
//                     },
//                     pagination: {
//                         el: '.slider-products .swiper-pagination',
//                         clickable: true,
//                     },
//                 });
//             }
//             if (!cardListSlider) {
//                 cardListSlider = new Swiper('.card-slider', {
//                     spaceBetween: 24,
//                     pagination: {
//                         el: '.card-slider .swiper-pagination',
//                         clickable: true,
//                     },
//                     breakpoints: {
//                         568: {
//                             slidesPerView: 'auto',
//                         }
//                     }
//                 });
//             }
//             if (!sliderPurpose) {
//                 sliderPurpose = new Swiper('.slider-purpose', {
//                     slidesPerView: 1,
//                     spaceBetween: 24,
//                     pagination: {
//                         el: '.slider-purpose .swiper-pagination',
//                         clickable: true,
//                     },
//                 });
//             }
//             if (!appSlider) {
//                 appSlider = new Swiper('.app-slider', {
//                     spaceBetween: 24,
//                     breakpoints: {
//                         568: {
//                             slidesPerView: 'auto',
//                         }
//                     },
//                     pagination: {
//                         el: '.app-slider .swiper-pagination',
//                         clickable: true,
//                     },
//                 });
//             }
//         } else {
//             if (sliderProducts) {
//                 sliderProducts.destroy(true, true);
//                 sliderProducts = null;
//             }
//             if (cardListSlider) {
//                 cardListSlider.destroy(true, true);
//                 cardListSlider = null;
//             }
//             if (sliderPurpose) {
//                 sliderPurpose.destroy(true, true);
//                 sliderPurpose = null;
//             }
//             if (appSlider) {
//                 appSlider.destroy(true, true);
//                 appSlider = null;
//             }
//         }
//
//         if (screenWidth <= 567) {
//             if (identicalSwipers.length === 0) {
//                 identicalSwiperIds.forEach(id => {
//                     const swiper = new Swiper(id, {
//                         spaceBetween: 24,
//                         pagination: {
//                             el: `${id} .swiper-pagination`,
//                             clickable: true,
//                         },
//                     });
//                     identicalSwipers.push(swiper);
//                 });
//             }
//         } else {
//             identicalSwipers.forEach(swiper => swiper && swiper.destroy(true, true));
//             identicalSwipers = [];
//         }
//     }
//
//     initSwipers();
//     window.addEventListener('resize', initSwipers);
//
//
// //HIDE-SHOW TEXT
//     const btnsSeeMore = document.querySelectorAll('.see-more');
//
//     btnsSeeMore.forEach((btn) => {
//         btn.addEventListener('click', function () {
//             const hideText = this.parentElement.querySelector('.hide-text');
//
//             if (hideText) {
//                 hideText.classList.toggle('open-text');
//                 this.textContent = hideText.classList.contains('open-text') ? "Згорнути інформацію" : "Більше інформації";
//             }
//
//         });
//     });
//
// //HIDE-SHOW TEXT PAGE HOT
//     const btnsMore = document.querySelectorAll('.composition__card .more-btn');
//     const cards = document.querySelectorAll('.composition__card');
//     btnsMore.forEach((btn) => {
//         btn.addEventListener('click', function () {
//             const hideCardText = this.parentElement.querySelector(' .hide-text');
//             if (window.innerWidth < 1024) {
//                 if (hideCardText) {
//                     hideCardText.classList.toggle('open-text');
//                     this.textContent = hideCardText.classList.contains('open-text') ? "Згорнути інформацію" : "Детальна інформація";
//                 }
//                 window.addEventListener('scroll', () => {
//                     cards.forEach((card, index) => {
//                         const rect = card.getBoundingClientRect();
//                         if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
//                             cards.forEach((otherCard, otherIndex) => {
//                                 if (otherIndex !== index) {
//                                     const otherText = otherCard.querySelector('.hide-text');
//                                     if (otherText && otherText.classList.contains('open-text')) {
//                                         otherText.classList.remove('open-text');
//                                         const otherBtn = otherCard.querySelector('.more-btn');
//                                         if (otherBtn) otherBtn.textContent = "Детальна інформація";
//                                     }
//                                 }
//                             });
//                         }
//                     });
//                 });
//             }
//         });
//     });
//
// //SLIDER-ACCORDION
//     const slides = document.querySelectorAll('.slide-purpose');
//
//     slides.forEach((slide) => {
//         slide.addEventListener('click', function () {
//             if (window.innerWidth >= 1024) {
//                 expand(slide);
//             }
//         });
//     });
//
//     function expand(target) {
//         for (let slide of target.parentNode.children) {
//             slide.classList.remove('expanded');
//         }
//         target.classList.add('expanded');
//     }
//
// // ANIMATION BLOCKS SECTION ACTION
//     const blocks = document.querySelectorAll('.action__item');
//
//     window.addEventListener('scroll', () => {
//         let closestBlock = null;
//         let closestDistance = window.innerHeight;
//         blocks.forEach((block) => {
//             const rect = block.getBoundingClientRect();
//             const middleOfScreen = window.innerHeight / 2;
//             const distanceToMiddle = Math.abs(rect.top - middleOfScreen);
//
//             if (distanceToMiddle < closestDistance && rect.top < middleOfScreen) {
//                 closestDistance = distanceToMiddle;
//                 closestBlock = block;
//             }
//         });
//
//         blocks.forEach(b => b.classList.remove('show'));
//         if (closestBlock) {
//             closestBlock.classList.add('show');
//         }
//     });
//
});

