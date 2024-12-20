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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2Jyk7XHJcbiAgICBjb25zdCBuYXZPcGVuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9idXJnZXInKTtcclxuICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbiAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgbmF2T3BlbkhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZS1zY3JvbGwnKTtcclxuICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBidG5DbG9zZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH0sIDI1MCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgW2J0bkNsb3NlLCBiYWNrZHJvcCwgLi4ubWVudUxpbmtzXS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYnRuQ2xvc2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlLXNjcm9sbCcpO1xyXG4gICAgICAgICAgICBuYXZPcGVuSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQU5JTSBCTE9DSyBXSVRIIEdFUkxcclxuICAgICAgICBjb25zdCBzeW1wdG9tcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3ltcHRvbVwiKTtcclxuICAgICAgICBjb25zdCBzeW1wdG9tTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ltcHRvbS1saXN0IHVsXCIpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW1hZ2VcIik7XHJcbiAgICAgICAgY29uc3QgaWNvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25zXCIpO1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tbWFuaWZlc3RhdGlvblwiKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRTeW1wdG9tSW5kZXggPSAwOyAvLyDQhtC90LTQtdC60YEg0L/QvtGC0L7Rh9C90L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICAgICAgY29uc3Qgc2VjdGlvblRvcCA9IGFuaW1hdGlvblNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25IZWlnaHQgPSBhbmltYXRpb25TZWN0aW9uLm9mZnNldEhlaWdodDtcclxuICAgICAgICBjb25zdCBzeW1wdG9tU3RlcCA9IHNlY3Rpb25IZWlnaHQgLyBzeW1wdG9tcy5sZW5ndGg7IC8vINCS0LjRgdC+0YLQsCDRgdC10LrRhtGW0Zcg0LTQu9GPINC60L7QttC90L7Qs9C+INGC0LXQutGB0YLQvtCy0L7Qs9C+INC/0YPQvdC60YLRg1xyXG5cclxuICAgICAgICAvLyDQpNGD0L3QutGG0ZbRjyDQtNC70Y8g0LLQuNC30L3QsNGH0LXQvdC90Y8sINGP0LrQsCDQutCw0YDRgtC40L3QutCwINCy0ZbQtNC/0L7QstGW0LTQsNGUINC/0L7RgtC+0YfQvdC+0LzRgyDRgdC40LzQv9GC0L7QvNGDXHJcbiAgICAgICAgY29uc3QgZ2V0SW1hZ2VJbmRleEZvclN5bXB0b20gPSAoc3ltcHRvbUluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPj0gMCAmJiBzeW1wdG9tSW5kZXggPD0gMikgcmV0dXJuIDA7IC8vINCa0LDRgNGC0LjQvdC60LAgMSAo0YHQuNC80L/RgtC+0LzQuCAx4oCTMylcclxuICAgICAgICAgICAgaWYgKHN5bXB0b21JbmRleCA+PSAzICYmIHN5bXB0b21JbmRleCA8PSA1KSByZXR1cm4gMTsgLy8g0JrQsNGA0YLQuNC90LrQsCAyICjRgdC40LzQv9GC0L7QvNC4IDTigJM2KVxyXG4gICAgICAgICAgICBpZiAoc3ltcHRvbUluZGV4ID49IDYgJiYgc3ltcHRvbUluZGV4IDw9IDcpIHJldHVybiAyOyAvLyDQmtCw0YDRgtC40L3QutCwIDMgKNGB0LjQvNC/0YLQvtC80LggN+KAkzgpXHJcbiAgICAgICAgICAgIGlmIChzeW1wdG9tSW5kZXggPT09IDgpIHJldHVybiAzOyAvLyDQmtCw0YDRgtC40L3QutCwIDQgKNGB0LjQvNC/0YLQvtC8IDkpXHJcbiAgICAgICAgICAgIHJldHVybiAtMTsgLy8g0JHQtdC3INC60LDRgNGC0LjQvdC60LhcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LDQvdGW0LzQsNGG0ZbRjiDQvdCwINC+0YHQvdC+0LLRliDRgdC60YDQvtC70YNcclxuICAgICAgICBjb25zdCB1cGRhdGVBbmltYXRpb25PblNjcm9sbCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSAtIHNlY3Rpb25Ub3A7XHJcblxyXG4gICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzeW1wdG9tLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCAqIHN5bXB0b21TdGVwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBzeW1wdG9tU3RlcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gc3RhcnQgJiYgc2Nyb2xsUG9zaXRpb24gPCBlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN5bXB0b21JbmRleCAhPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5bXB0b21JbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0KDQvtCx0LjQvNC+INCy0YHRliDRgdC40LzQv9GC0L7QvNC4INGA0L7Qt9C80LjRgtC40LzQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1wdG9tcy5mb3JFYWNoKChzLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpOyAvLyDQkNC60YLQuNCy0L3QuNC5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7IC8vINCG0L3RiNGWINC30LDQu9C40YjQsNGO0YLRjNGB0Y8g0YDQvtC30LzQuNGC0LjQvNC4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JfRgdGD0LLQsNGU0LzQviBgdWxgINCy0LvRltCy0L4g0L3QsCDRiNC40YDQuNC90YMg0L/QvtC/0LXRgNC10LTQvdGM0L7Qs9C+INC/0YPQvdC60YLRg1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpZnRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTeW1wdG9tID0gc3ltcHRvbXNbaW5kZXggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaWZ0V2lkdGggPSBwcmV2U3ltcHRvbS5vZmZzZXRXaWR0aCArIDIwOyAvLyDQktGA0LDRhdC+0LLRg9GU0LzQviBnYXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1wdG9tTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzaGlmdFdpZHRoICogaW5kZXh9cHgpYDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCf0L7QutCw0LfRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDQutCw0YDRgtC40L3QutGDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlSW5kZXggPSBnZXRJbWFnZUluZGV4Rm9yU3ltcHRvbShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSwgaW1nSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdJbmRleCA9PT0gbmV3SW1hZ2VJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0ZbQutC+0L3QutC4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGljb25TcmMgPSBzeW1wdG9tLmRhdGFzZXQuaWNvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGljb25TcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7IC8vINCe0YfQuNGJ0LDRlNC80L4g0L/QvtC/0LXRgNC10LTQvdGWINGW0LrQvtC90LrQuFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gaWNvblNyYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uXCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g0J/RgNC40LIn0Y/Qt9C60LAg0YTRg9C90LrRhtGW0Zcg0LTQviDQv9C+0LTRltGXINGB0LrRgNC+0LvRg1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZUFuaW1hdGlvbk9uU2Nyb2xsKTtcclxuXHJcbi8vIC8vIFNDUk9MTCBUTyBBTkNIT1JcclxuLy8gICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbFRvQW5jaG9yKHNlbGVjdG9yKSB7XHJcbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4vLyAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCBhbmNob3IgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0RWxlbWVudC5vZmZzZXRUb3AsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcubWVudV9faXRlbSBhJyk7XHJcbi8vICAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnN1Yi1tZW51X19pdGVtIGEnKTtcclxuLy8gICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuY2FyZC1wcm9kdWN0X19saW5rLXdyYXAgYScpO1xyXG4vLyAgICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5zZWN0aW9uLWJhbm5lciAuYnRuX3N0cm9rZScpO1xyXG4vL1xyXG4vL1xyXG4vLyAvLyBIRUFERVIgQU5EIERJU0NMQUlNRVIgU0NST0xMXHJcbi8vXHJcbi8vICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbi8vICAgICBjb25zdCBiYW5uZXJIZWlnaHQgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWJhbm5lcicpLm9mZnNldEhlaWdodDtcclxuLy8gICAgIGNvbnN0IGZpeGVkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzY2xhaW1lcl9tYWluJyk7XHJcbi8vXHJcbi8vICAgICBjb25zdCB0YXJnZXRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY3Rpb25Ib3RCZycpO1xyXG4vL1xyXG4vLyAgICAgY29uc3QgZG9jdW1lbnRIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG4vLyAgICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbi8vXHJcbi8vICAgICBjb25zdCB0YXJnZXRTZWN0aW9uT2Zmc2V0VG9wID0gdGFyZ2V0U2VjdGlvbiA/IHRhcmdldFNlY3Rpb24ub2Zmc2V0VG9wIDogMDtcclxuLy8gICAgIGNvbnN0IHRhcmdldFNlY3Rpb25IZWlnaHQgPSB0YXJnZXRTZWN0aW9uID8gdGFyZ2V0U2VjdGlvbi5vZmZzZXRIZWlnaHQgOiAwO1xyXG4vL1xyXG4vLyAgICAgbGV0IGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcbi8vICAgICBsZXQgaXNIZWFkZXJIaWRkZW4gPSBmYWxzZTtcclxuLy9cclxuLy8gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcclxuLy9cclxuLy8gICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPiBsYXN0U2Nyb2xsWSAmJiAhaXNIZWFkZXJIaWRkZW4pIHtcclxuLy8gICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4vLyAgICAgICAgICAgICBpc0hlYWRlckhpZGRlbiA9IHRydWU7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxQb3NpdGlvbiA8IGxhc3RTY3JvbGxZICYmIGlzSGVhZGVySGlkZGVuKSB7XHJcbi8vICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuLy8gICAgICAgICAgICAgaXNIZWFkZXJIaWRkZW4gPSBmYWxzZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gKGJhbm5lckhlaWdodCAtIDQ4KSkge1xyXG4vLyAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJyk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbCcpO1xyXG4vLyAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICBpZiAoc2Nyb2xsUG9zaXRpb24gPj0gdGFyZ2V0U2VjdGlvbk9mZnNldFRvcCAmJiBzY3JvbGxQb3NpdGlvbiA8IHRhcmdldFNlY3Rpb25PZmZzZXRUb3AgKyB0YXJnZXRTZWN0aW9uSGVpZ2h0KSB7XHJcbi8vICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKTtcclxuLy8gICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbFBvc2l0aW9uID49IGJhbm5lckhlaWdodCAtIDQ4KSB7XHJcbi8vICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgICAgaWYgKGZpeGVkQmxvY2spIHtcclxuLy8gICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gKGJhbm5lckhlaWdodCAtIDQ4KSkge1xyXG4vLyAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QuYWRkKCdzY3JvbGwnKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZICsgdmlld3BvcnRIZWlnaHQgPj0gZG9jdW1lbnRIZWlnaHQpIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgbGFzdFNjcm9sbFkgPSBzY3JvbGxQb3NpdGlvbjtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAvLyBDSEFOR0VEIEJHIENBUkQgQlROIEhPVkVSXHJcbi8vICAgICBjb25zdCBiZ0NoYW5nZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmctY2hhbmdlJyk7XHJcbi8vICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJnLWNoYW5nZScpKSB7XHJcbi8vICAgICAgICAgYmdDaGFuZ2VCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuLy8gICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4vLyAgICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdiZy1zaG93Jyk7XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBidXR0b24uY2xvc2VzdCgnLmNhcmQtcHJvZHVjdCcpO1xyXG4vLyAgICAgICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1zaG93Jyk7XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyAvL0NBUkQtSE9UIEhJREVcclxuLy8gICAgIGNvbnN0IGNwSG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKTtcclxuLy8gICAgIGNvbnN0IGJ0blNjU2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1ob3QnKTtcclxuLy8gICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG4vLyAgICAgY29uc3QgcHJvZHVjdExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1wcm9kdWN0X19saW5rJyk7XHJcbi8vXHJcbi8vICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtcHJvZHVjdF9ob3QnKSkge1xyXG4vLyAgICAgICAgIGJ0blNjU2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgICAgICAgICBjcEhvdC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbi8vICAgICAgICAgICAgIGJ0blNjU2Nyb2xsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuLy8gICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAgY3BIb3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4vLyAgICAgICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbi8vICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIHByb2R1Y3RMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuLy8gICAgICAgICAgICAgY3BIb3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4vLyAgICAgICAgICAgICBidG5TY1Njcm9sbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbi8vICAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyAvL1NMSURFUiBGRUFUVVJFU1xyXG4vLyAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZmVhdHVyZXMnKSkge1xyXG4vLyAgICAgICAgIGNvbnN0IHNsaWRlckZlYXR1cmVzID0gbmV3IFN3aXBlcignLnNsaWRlci1mZWF0dXJlcyAnLCB7XHJcbi8vICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbi8vXHJcbi8vICAgICAgICAgICAgIHNwZWVkOiAxNTAwLFxyXG4vLyAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbi8vICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuLy8gICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4vLyAgICAgICAgICAgICAgICAgbmV4dEVsOiAnLnNsaWRlci1mZWF0dXJlcyAuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuLy8gICAgICAgICAgICAgICAgIHByZXZFbDogJy5zbGlkZXItZmVhdHVyZXMgLnN3aXBlci1idXR0b24tcHJldicsXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbi8vICAgICAgICAgICAgICAgICA1Njg6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH1cclxuLy8gLy9TTElERVJTXHJcbi8vICAgICBsZXQgc2xpZGVyUHJvZHVjdHM7XHJcbi8vICAgICBsZXQgc2xpZGVyUHVycG9zZTtcclxuLy8gICAgIGxldCBjYXJkTGlzdFNsaWRlcjtcclxuLy8gICAgIGxldCBhcHBTbGlkZXI7XHJcbi8vXHJcbi8vICAgICBjb25zdCBpZGVudGljYWxTd2lwZXJJZHMgPSBbJyNzbGlkZXJEb3NhZ2UxJywgJyNzbGlkZXJEb3NhZ2UyJywgJyNzbGlkZXJEb3NhZ2UzJ107XHJcbi8vICAgICBsZXQgaWRlbnRpY2FsU3dpcGVycyA9IFtdO1xyXG4vL1xyXG4vLyAgICAgZnVuY3Rpb24gaW5pdFN3aXBlcnMoKSB7XHJcbi8vICAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuLy9cclxuLy8gICAgICAgICBpZiAoc2NyZWVuV2lkdGggPD0gMTAyMykge1xyXG4vLyAgICAgICAgICAgICBpZiAoIXNsaWRlclByb2R1Y3RzKSB7XHJcbi8vICAgICAgICAgICAgICAgICBzbGlkZXJQcm9kdWN0cyA9IG5ldyBTd2lwZXIoJy5zbGlkZXItcHJvZHVjdHMnLCB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAxMDIzOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci1wcm9kdWN0cyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmICghY2FyZExpc3RTbGlkZXIpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmQtc2xpZGVyJywge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5jYXJkLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICA1Njg6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmICghc2xpZGVyUHVycG9zZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgc2xpZGVyUHVycG9zZSA9IG5ldyBTd2lwZXIoJy5zbGlkZXItcHVycG9zZScsIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItcHVycG9zZSAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmICghYXBwU2xpZGVyKSB7XHJcbi8vICAgICAgICAgICAgICAgICBhcHBTbGlkZXIgPSBuZXcgU3dpcGVyKCcuYXBwLXNsaWRlcicsIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIDU2ODoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAnLmFwcC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgIGlmIChzbGlkZXJQcm9kdWN0cykge1xyXG4vLyAgICAgICAgICAgICAgICAgc2xpZGVyUHJvZHVjdHMuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuLy8gICAgICAgICAgICAgICAgIHNsaWRlclByb2R1Y3RzID0gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoY2FyZExpc3RTbGlkZXIpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNhcmRMaXN0U2xpZGVyLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XHJcbi8vICAgICAgICAgICAgICAgICBjYXJkTGlzdFNsaWRlciA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKHNsaWRlclB1cnBvc2UpIHtcclxuLy8gICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UuZGVzdHJveSh0cnVlLCB0cnVlKTtcclxuLy8gICAgICAgICAgICAgICAgIHNsaWRlclB1cnBvc2UgPSBudWxsO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChhcHBTbGlkZXIpIHtcclxuLy8gICAgICAgICAgICAgICAgIGFwcFNsaWRlci5kZXN0cm95KHRydWUsIHRydWUpO1xyXG4vLyAgICAgICAgICAgICAgICAgYXBwU2xpZGVyID0gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICBpZiAoc2NyZWVuV2lkdGggPD0gNTY3KSB7XHJcbi8vICAgICAgICAgICAgIGlmIChpZGVudGljYWxTd2lwZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWRlbnRpY2FsU3dpcGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoaWQsIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWw6IGAke2lkfSAuc3dpcGVyLXBhZ2luYXRpb25gLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMucHVzaChzd2lwZXIpO1xyXG4vLyAgICAgICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICBpZGVudGljYWxTd2lwZXJzLmZvckVhY2goc3dpcGVyID0+IHN3aXBlciAmJiBzd2lwZXIuZGVzdHJveSh0cnVlLCB0cnVlKSk7XHJcbi8vICAgICAgICAgICAgIGlkZW50aWNhbFN3aXBlcnMgPSBbXTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vICAgICBpbml0U3dpcGVycygpO1xyXG4vLyAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluaXRTd2lwZXJzKTtcclxuLy9cclxuLy9cclxuLy8gLy9ISURFLVNIT1cgVEVYVFxyXG4vLyAgICAgY29uc3QgYnRuc1NlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VlLW1vcmUnKTtcclxuLy9cclxuLy8gICAgIGJ0bnNTZWVNb3JlLmZvckVhY2goKGJ0bikgPT4ge1xyXG4vLyAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgaGlkZVRleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtdGV4dCcpO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBpZiAoaGlkZVRleHQpIHtcclxuLy8gICAgICAgICAgICAgICAgIGhpZGVUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGhpZGVUZXh0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi10ZXh0JykgPyBcItCX0LPQvtGA0L3Rg9GC0Lgg0ZbQvdGE0L7RgNC80LDRhtGW0Y5cIiA6IFwi0JHRltC70YzRiNC1INGW0L3RhNC+0YDQvNCw0YbRltGXXCI7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAvL0hJREUtU0hPVyBURVhUIFBBR0UgSE9UXHJcbi8vICAgICBjb25zdCBidG5zTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wb3NpdGlvbl9fY2FyZCAubW9yZS1idG4nKTtcclxuLy8gICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBvc2l0aW9uX19jYXJkJyk7XHJcbi8vICAgICBidG5zTW9yZS5mb3JFYWNoKChidG4pID0+IHtcclxuLy8gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIGNvbnN0IGhpZGVDYXJkVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcgLmhpZGUtdGV4dCcpO1xyXG4vLyAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDI0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaGlkZUNhcmRUZXh0KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaGlkZUNhcmRUZXh0LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4tdGV4dCcpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBoaWRlQ2FyZFRleHQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuLXRleHQnKSA/IFwi0JfQs9C+0YDQvdGD0YLQuCDRltC90YTQvtGA0LzQsNGG0ZbRjlwiIDogXCLQlNC10YLQsNC70YzQvdCwINGW0L3RhNC+0YDQvNCw0YbRltGPXCI7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjdC50b3AgPj0gMCAmJiByZWN0LnRvcCA8IHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRzLmZvckVhY2goKG90aGVyQ2FyZCwgb3RoZXJJbmRleCkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckluZGV4ICE9PSBpbmRleCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlclRleHQgPSBvdGhlckNhcmQucXVlcnlTZWxlY3RvcignLmhpZGUtdGV4dCcpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJUZXh0ICYmIG90aGVyVGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4tdGV4dCcpKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlclRleHQuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbi10ZXh0Jyk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckJ0biA9IG90aGVyQ2FyZC5xdWVyeVNlbGVjdG9yKCcubW9yZS1idG4nKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckJ0bikgb3RoZXJCdG4udGV4dENvbnRlbnQgPSBcItCU0LXRgtCw0LvRjNC90LAg0ZbQvdGE0L7RgNC80LDRhtGW0Y9cIjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vIC8vU0xJREVSLUFDQ09SRElPTlxyXG4vLyAgICAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlLXB1cnBvc2UnKTtcclxuLy9cclxuLy8gICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4ge1xyXG4vLyAgICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gMTAyNCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZXhwYW5kKHNsaWRlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vICAgICBmdW5jdGlvbiBleHBhbmQodGFyZ2V0KSB7XHJcbi8vICAgICAgICAgZm9yIChsZXQgc2xpZGUgb2YgdGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW4pIHtcclxuLy8gICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kZWQnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vIC8vIEFOSU1BVElPTiBCTE9DS1MgU0VDVElPTiBBQ1RJT05cclxuLy8gICAgIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3Rpb25fX2l0ZW0nKTtcclxuLy9cclxuLy8gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbi8vICAgICAgICAgbGV0IGNsb3Nlc3RCbG9jayA9IG51bGw7XHJcbi8vICAgICAgICAgbGV0IGNsb3Nlc3REaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuLy8gICAgICAgICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcclxuLy8gICAgICAgICAgICAgY29uc3QgcmVjdCA9IGJsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4vLyAgICAgICAgICAgICBjb25zdCBtaWRkbGVPZlNjcmVlbiA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbi8vICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlVG9NaWRkbGUgPSBNYXRoLmFicyhyZWN0LnRvcCAtIG1pZGRsZU9mU2NyZWVuKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgaWYgKGRpc3RhbmNlVG9NaWRkbGUgPCBjbG9zZXN0RGlzdGFuY2UgJiYgcmVjdC50b3AgPCBtaWRkbGVPZlNjcmVlbikge1xyXG4vLyAgICAgICAgICAgICAgICAgY2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2VUb01pZGRsZTtcclxuLy8gICAgICAgICAgICAgICAgIGNsb3Nlc3RCbG9jayA9IGJsb2NrO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAgICAgYmxvY2tzLmZvckVhY2goYiA9PiBiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSk7XHJcbi8vICAgICAgICAgaWYgKGNsb3Nlc3RCbG9jaykge1xyXG4vLyAgICAgICAgICAgICBjbG9zZXN0QmxvY2suY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vL1xyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
