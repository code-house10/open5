(function ($) {
    "use strict";

    /*----------- 07. Global Slider ----------*/
    $('.ot-slider').each(function () {
        let otSlider = $(this);
        let settings = $(this).data('slider-options');

        // Store references to the navigation Slider
        let prevArrow = otSlider.find('.slider-prev');
        let nextArrow = otSlider.find('.slider-next');
        let paginationElN = otSlider.find('.slider-pagination.pagi-number');

        // Get both pagination elements
        let paginationEl1 = otSlider.find('.slider-pagination').get(0);
        let paginationEl2 = otSlider.find('.slider-pagination2').get(0); // Second pagination element

        let paginationType = settings['paginationType'] ? settings['paginationType'] : 'bullets';

        let autoplayCondition = settings['autoplay'];

        let sliderDefault = {
            slidesPerView: 1,
            spaceBetween: settings['spaceBetween'] ? settings['spaceBetween'] : 24,
            loop: settings['loop'] == false ? false : true,
            speed: settings['speed'] ? settings['speed'] : 1000,
            autoplay: autoplayCondition ? autoplayCondition : { delay: 6000, disableOnInteraction: false },
            navigation: {
                nextEl: nextArrow.get(0),
                prevEl: prevArrow.get(0),
            },
            pagination: {
                el: paginationEl1,
                type: paginationType,
                clickable: true,
                renderBullet: function (index, className) {
                    let number = index + 1;
                    let formattedNumber = number < 10 ? '0' + number : number;
                    return '<span class="' + className + '" aria-label="Go to Slide ' + formattedNumber + '"></span>';
                },
            },
            on: {
                init: function () {
                    let totalSlides = this.slides.length;
                    $(paginationEl2).html('<span class="current-slide">01</span> <span class="total-slides">' + (totalSlides < 10 ? '0' + totalSlides : totalSlides) + '</span>');
                },
                slideChange: function () {
                    let activeIndex = this.activeIndex + 1; // +1 for 1-based index
                    let totalSlides = this.slides.length;
                    $(paginationEl2).html('<span class="current-slide">' + (activeIndex < 10 ? '0' + activeIndex : activeIndex) + '</span> <span class="total-slides">' + (totalSlides < 10 ? '0' + totalSlides : totalSlides) + '</span>');
                },
            }
        };

        let options = JSON.parse(otSlider.attr('data-slider-options'));
        options = $.extend({}, sliderDefault, options);
        let swiper = new Swiper(otSlider.get(0), options); // Assign the swiper variable

        if ($('.slider-area').length > 0) {
            $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
        }
    });

    //slider
    let sliderOne = new Swiper('.ot-slider-active', {
        slidesPerView: 1,
        loop: true,
        autoplay: false,
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        }
    });

    // service
    let Servicelider = new Swiper('.ot-service-active', {
        slidesPerView: 3,
        loop: true,
        autoplay: true,
        speed: 2000,
        effect: 'slide',
        spaceBetween: 30,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1400': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.prev',
            nextEl: '.next',
        },
        pagination: {
            el: '.ot-pagination-testi-style',
            clickable: true,
        }

    });

    // project
    let projectSlider = new Swiper('.ot-project-active', {
        slidesPerView: 4,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: 'slide',
        spaceBetween: 24,
        breakpoints: {
            1600: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        },

        // ✅ Add number pagination like "09 / 03"
        pagination: {
            el: '.ot-project-pagination',   // add this div in your HTML
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return (
                    '<span class="' + totalClass + '"></span>' +
                    ' / ' +
                    '<span class="' + currentClass + '"></span>'
                );
            },
            formatFractionCurrent: n => (n < 10 ? '0' + n : n),
            formatFractionTotal: n => (n < 10 ? '0' + n : n),
        },
    });

    // project-2
    let project2Slider = new Swiper('.ot-project-active2', {
        slidesPerView: 4,
        loop: true,
        autoplay: true,
        speed: 2000,
        effect: 'slide',
        spaceBetween: 24,
        breakpoints: {
            1600: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        }
    });


    //testimonial
    let testiSlider = new Swiper('.ot-testimonial-active', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: 'slide',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        },
        pagination: {
            el: '.ot-pagination-testi-style',
            clickable: true,
        }
    });

    // text-slider
    let TextSlide = new Swiper(".rolling-active", {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: true,
        }
    });

    //testi2

    // Thumbs Slider (Small images)
    let testiSliderThumb = new Swiper('.testi-thumb-active', {
        slidesPerView: 4,
        direction: 'vertical',
        centeredSlides: true,
        slideToClickedSlide: true,
        spaceBetween: 16,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        loop: false,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1600: { slidesPerView: 4 },
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 3 },
            0: { slidesPerView: 3 }
        },
    });

    // Main Testimonial Slider
    let testiSlider2 = new Swiper('.ot-testi-active2', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 24,
        effect: 'slide',
        speed: 1000,
        autoplay: false,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
        thumbs: {
            swiper: testiSliderThumb, // ← connect thumb slider
        },
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
    });

    //blog
    let testiSlider3 = new Swiper('.ot-testi-active3', {
        slidesPerView: 5,
        loop: true,
        autoplay: true,
        speed: 2000,
        effect: 'slide',
        spaceBetween: 30,
        centeredSlides: true,
        breakpoints: {
            '1600': {
                slidesPerView: 5,
            },
            '1400': {
                slidesPerView: 5,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.prev',
            nextEl: '.next',
        },
        pagination: {
            el: '.ot-pagination-testi-style',
            clickable: true,
        }

    });

    //blog
    let casestudySlider = new Swiper('.ot-casestudy-active', {
        slidesPerView: 5,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: 'slide',
        spaceBetween: 24,
        centeredSlides: true,
        breakpoints: {
            1600: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2.5,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        },

        // ✅ Add number pagination like "09 / 03"
        pagination: {
            el: '.ot-casestudy-pagination',   // add this div in your HTML
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return (
                    '<span class="' + totalClass + '"></span>' +
                    ' / ' +
                    '<span class="' + currentClass + '"></span>'
                );
            },
            formatFractionCurrent: n => (n < 10 ? '0' + n : n),
            formatFractionTotal: n => (n < 10 ? '0' + n : n),
        },

    });

    //blog
    let blogSlider = new Swiper('.ot-blog-active', {
        slidesPerView: 3,
        loop: true,
        autoplay: true,
        speed: 2000,
        effect: 'slide',
        spaceBetween: 24,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1400': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.prev',
            nextEl: '.next',
        }

    });

    //blog-3
    let blog3Slider = new Swiper('.ot-blog-active3', {
        slidesPerView: 3,
        loop: true,
        autoplay: true,
        speed: 2000,
        centeredSlides: true,
        effect: 'slide',
        spaceBetween: 24,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1400': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.prev',
            nextEl: '.next',
        }

    });

    // process
    let processSlider = new Swiper('.ot-process-active', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.ot-pagination-wrapper',
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                // Create dots
                let dots = '';
                for (let i = 0; i < total; i++) {
                    dots += `<span class="swiper-pagination-bullet ${i === current - 1 ? 'swiper-pagination-bullet-active' : ''
                        }" data-index="${i}"></span>`;
                }

                // Create fraction
                let fraction = `
                <span class="ot-current">${current < 10 ? '0' + current : current}</span>
                <span class="ot-total">${total < 10 ? '0' + total : total}</span>
            `;

                // Combine both
                return `
                <div class="ot-line-pagination">${fraction}</div>
                <div class="ot-dot-pagination">${dots}</div>
            `;
            },
        },
        on: {
            paginationRender: function (swiper) {
                // handle dot clicks
                setTimeout(() => {
                    const bullets = document.querySelectorAll('.ot-dot-pagination .swiper-pagination-bullet');
                    bullets.forEach((b, i) => {
                        b.addEventListener('click', () => swiper.slideToLoop(i));
                    });
                }, 0);
            },
            slideChange: function (swiper) {
                // Update active dot
                const bullets = document.querySelectorAll('.ot-dot-pagination .swiper-pagination-bullet');
                bullets.forEach((b, i) => {
                    b.classList.toggle('swiper-pagination-bullet-active', i === swiper.realIndex);
                });
            },
        },
    });

    //slider
    let postBox = new Swiper('.postbox-slider-active', {
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        speed: 1500,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1400': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        }

    });

    //slider
    let productSlide = new Swiper('.ot-product-active', {
        slidesPerView: 4,
        loop: true,
        autoplay: true,
        speed: 1500,
        spaceBetween: 30,
        effect: 'slide',
        fadeEffect: {
            crossFade: true,
        },
        breakpoints: {
            '1600': {
                slidesPerView: 4,
            },
            '1400': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 4,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        navigation: {
            prevEl: '.ot-prev',
            nextEl: '.ot-next',
        }

    });


})(jQuery);