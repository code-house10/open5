(function ($) {
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Common Js
    03. Mobile Menu Js
    04. Counter
    05. MagnificPopup img view
    06. MagnificPopup video view
    07. Scroll To Top
    08. Sticky Header Js
    09. Offcanvas Js
    10. Nice Select Js
    11. Faq-class-active
    12. Title-animation
    13. eCommerce
    14. Pricing-switch & Tab
    15. Skill js
    16. ScrollCue
    17. Search Box Popup
    18. Smooth Scroll
    19. Team Active Class
    20. Price filter active
    21. lettering js
    22. Custom Service Slider
    23. Scroll rotate
    */
    /*=================================
        JS Index End
    ==================================*/
    /*

  /*---------- 01. On Load Function ----------*/
    let windowOn = $(window);
    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader').addClass('preloader-deactivate');
        }, 450);
    });

    /*----------- 02. Common Js ----------*/
    $("[data-background]").each(function () {
        $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
    });

    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
            let mask = $(this).attr('data-mask-src');
            $(this).css({
                'mask-image': 'url(' + mask + ')',
                '-webkit-mask-image': 'url(' + mask + ')'
            });
            $(this).addClass('bg-mask');
            $(this).removeAttr('data-mask-src');
        });
    };

    $("[data-width]").each(function () {
        $(this).css("width", $(this).attr("data-width"));
    });

    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });

    $("[data-text-color]").each(function () {
        $(this).css("color", $(this).attr("data-text-color"));
    });

    /*-----------  03. Mobile Menu Js ----------*/
    let atMenuWrap = $('.ot-mobile-menu-active > ul').clone();
    let atSideMenu = $('.ot-offcanvas-menu nav');
    atSideMenu.append(atMenuWrap);
    if ($(atSideMenu).find('.ot-submenu, .ot-mega-menu').length != 0) {
        $(atSideMenu).find('.ot-submenu, .ot-mega-menu').parent().append
            ('<button class="ot-menu-close"><i class="fa-solid fa-chevron-right"></i></button>');
    }
    let sideMenuList =
        $('.ot-offcanvas-menu nav > ul > li button.ot-menu-close, .ot-offcanvas-menu nav > ul li.has-dropdown > a');
    $(sideMenuList).on('click', function (e) {
        e.preventDefault();
        if (!($(this).parent().hasClass('active'))) {
            $(this).parent().addClass('active');
            $(this).siblings('.ot-submenu, .ot-mega-menu').slideDown();
        } else {
            $(this).siblings('.ot-submenu, .ot-mega-menu').slideUp();
            $(this).parent().removeClass('active');
        }
    });

    /*---------- 04. Counter --------- */
    new PureCounter();
    new PureCounter({
        filesizing: true,
        selector: ".filesizecount",
        pulse: 2,
    });

    /*---------- 05. MagnificPopup img view  --------*/
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*---------- 06. MagnificPopup video view  ----------*/
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /*---------- 07. Scroll To Top ----------*/
    $(document).ready(function () {
        const $scrollTopBtn = $('.scroll-top');
        const $progressPath = $('.scroll-top path');

        if ($scrollTopBtn.length && $progressPath.length) {
            const scrollTopBtn = $scrollTopBtn[0];
            const progressPath = $progressPath[0];
            const pathLength = progressPath.getTotalLength();

            // Set up the progress path stroke
            progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect(); // Force reflow
            progressPath.style.transition = 'stroke-dashoffset 10ms linear';

            // Update progress on scroll
            const updateProgress = () => {
                const scroll = $(window).scrollTop();
                const height = $(document).height() - $(window).height();
                const progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            };

            // Initial update
            updateProgress();

            // Bind scroll event
            $(window).on('scroll', () => {
                updateProgress();

                // Toggle visibility of scroll-to-top button
                if ($(window).scrollTop() > 40) {
                    $scrollTopBtn.addClass('show');
                } else {
                    $scrollTopBtn.removeClass('show');
                }
            });

            // Scroll to top on click
            $scrollTopBtn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 750);
            });
        }
    });

    /*----------- 08. Sticky Header Js -----------*/
    windowOn.on('scroll', function () {
        let scroll = windowOn.scrollTop();
        if (scroll < 500) {
            $("#header-sticky").removeClass("header-sticky");
        } else {
            $("#header-sticky").addClass("header-sticky");
        }
    });

    /*----------- 09. Offcanvas Js ---------------*/
    $(".ot-offcanvas-toogle").on('click', function () {
        $(".ot-offcanvas").addClass("opend");
        $(".body-overlay").addClass("opend");
    });

    $(".ot-offcanvas-close-toggle,.body-overlay").on('click', function () {
        $(".ot-offcanvas").removeClass("opend");
        $(".body-overlay").removeClass("opend");
    });

    /*------------ 10. Nice Select Js ---------------*/
    $('select').niceSelect();

    /*------------- 11. Faq-class-active -----------------*/
    $('.ot-faq .accordion-items').on("click", function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    /*------------- 12. Title-animation ----------------*/
    if ($(".ot-text-anime-1").length) {
        let e = 0.05,
            t = 0.5;
        document.querySelectorAll(".ot-text-anime-1").forEach((a) => {
            let i = new SplitText(a, { type: "chars, words" });
            gsap.from(i.words, { duration: 1, delay: t, x: 20, autoAlpha: 0, stagger: e, scrollTrigger: { trigger: a, start: "top 85%" } });
        });
    }
    if ($(".ot-text-anime-2").length) {
        let e = 0.03,
            t = 20,
            a = 0.1,
            i = "power2.out";
        document.querySelectorAll(".ot-text-anime-2").forEach((n) => {
            let o = new SplitText(n, { type: "chars, words" });
            gsap.from(o.chars, { duration: 2, delay: a, x: t, autoAlpha: 0, stagger: e, ease: i, scrollTrigger: { trigger: n, start: "top 85%" } });
        });
    }
    if ($(".ot-text-anime-3").length) {
        document.querySelectorAll(".ot-text-anime-3").forEach((e) => {
            e.animation && (e.animation.progress(1).kill(), e.split.revert()),
                (e.split = new SplitText(e, { type: "lines,words,chars", linesClass: "split-line" })),
                gsap.set(e, { perspective: 400 }),
                gsap.set(e.split.chars, { opacity: 0, x: "50" }),
                (e.animation = gsap.to(e.split.chars, { scrollTrigger: { trigger: e, start: "top 90%" }, x: "0", y: "0", rotateX: "0", opacity: 1, duration: 1, ease: Back.easeOut, stagger: 0.02 }));
        });
    }

    /*----------------- 13. eCommerce -----------------*/
    function ot_ecommerce() {

        // Quantity Minus Button
        $(document).on('click', '.ot-cart-minus', function (e) {
            e.preventDefault();
            const $input = $(this).siblings('input');
            let count = parseInt($input.val()) || 1;
            count = Math.max(count - 1, 1);
            $input.val(count).trigger('change');
        });

        // Quantity Plus Button
        $(document).on('click', '.ot-cart-plus', function (e) {
            e.preventDefault();
            const $input = $(this).siblings('input');
            let count = parseInt($input.val()) || 1;
            $input.val(count + 1).trigger('change');
        });

        // Checkout Payment Description Toggle
        $(document).on('click', '.ot-checkout-payment-item label', function () {
            const $desc = $(this).siblings('.ot-checkout-payment-desc');
            $('.ot-checkout-payment-desc').not($desc).slideUp(400); // Close others
            $desc.stop(true, true).slideToggle(400);
        });

        // Show Login Toggle
        $(document).on('click', '.ot-checkout-login-form-reveal-btn', function (e) {
            e.preventDefault();
            $('#tpReturnCustomerLoginForm').stop(true, true).slideToggle(400);
        });

        // Show Coupon Toggle
        $(document).on('click', '.ot-checkout-coupon-form-reveal-btn', function (e) {
            e.preventDefault();
            $('#tpCheckoutCouponForm').stop(true, true).slideToggle(400);
        });

        // Create an Account Toggle
        $(document).on('click', '#cbox', function () {
            $('#cbox_info').stop(true, true).slideToggle(900);
        });

        // Shipping Box Toggle
        $(document).on('click', '#ship-box', function () {
            $('#ship-box-info').stop(true, true).slideToggle(1000);
        });
    }

    // Initialize after DOM is ready
    $(document).ready(function () {
        ot_ecommerce();
    });

    // Cart totals calculation
    document.addEventListener("DOMContentLoaded", () => {
        function updateRowTotal(row) {
            const price = parseFloat(row.dataset.price);
            const qty = parseInt(row.querySelector(".qty-input").value, 10);
            const total = price * qty;
            row.querySelector(".product-total").textContent = `$${total.toFixed(2)}`;
        }

        function updateCartTotals() {
            const rows = document.querySelectorAll("#cartItems tr[data-id]");
            let subtotal = 0;

            rows.forEach(row => {
                const price = parseFloat(row.dataset.price);
                const qty = parseInt(row.querySelector(".qty-input").value, 10);
                subtotal += price * qty;
            });

            const shippingInput = document.querySelector('input[name="shipping"]:checked');
            const shipping = shippingInput ? parseFloat(shippingInput.value) : 0;
            const total = subtotal + shipping;

            const subtotalEl = document.getElementById("subtotal");
            const totalEl = document.getElementById("totalAmount");

            if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
        }

        (function initCart() {
            const table = document.getElementById("cartItems");
            if (!table) return;

            table.addEventListener("click", function (e) {
                const row = e.target.closest("tr[data-id]");
                if (!row) return;

                // Remove item
                if (e.target.classList.contains("cart-remove-btn")) {
                    row.remove();
                    updateCartTotals();
                }

                // Plus
                if (e.target.classList.contains("ot-cart-plus")) {
                    const qty = row.querySelector(".qty-input");
                    qty.value = parseInt(qty.value, 10) + 1;
                    updateRowTotal(row);
                    updateCartTotals();
                }

                // Minus
                if (e.target.classList.contains("ot-cart-minus")) {
                    const qty = row.querySelector(".qty-input");
                    qty.value = Math.max(1, parseInt(qty.value, 10) - 1);
                    updateRowTotal(row);
                    updateCartTotals();
                }
            });

            // Manual Quantity Input
            table.addEventListener("input", function (e) {
                if (e.target.classList.contains("qty-input")) {
                    const row = e.target.closest("tr[data-id]");
                    if (parseInt(e.target.value, 10) > 0) {
                        updateRowTotal(row);
                        updateCartTotals();
                    }
                }
            });

            // Shipping Selection
            document.querySelectorAll('input[name="shipping"]').forEach(item => {
                item.addEventListener("change", updateCartTotals);
            });
        })();

        updateCartTotals();
    });

    /*----------- 14. Pricing-switch & Tab ----------*/
    $(document).ready(function () {
        var e = $("#filt-monthly"),
            d = $("#filt-yearly"),
            t = $("#switcher"),
            m = $("#monthly"),
            y = $("#yearly");

        if ($('.ot-pricing-tabs').length) {
            e.on("click", function () {
                t.prop("checked", false);
                e.addClass("toggler--is-active");
                d.removeClass("toggler--is-active");
                m.removeClass("hide");
                y.addClass("hide");
            });

            d.on("click", function () {
                t.prop("checked", true);
                d.addClass("toggler--is-active");
                e.removeClass("toggler--is-active");
                m.addClass("hide");
                y.removeClass("hide");
            });

            t.on("click", function () {
                d.toggleClass("toggler--is-active");
                e.toggleClass("toggler--is-active");
                m.toggleClass("hide");
                y.toggleClass("hide");
            });
        }
    });

    /*----------------- 15. Skill js ---------------- */
    document.addEventListener("DOMContentLoaded", function () {
        const skillSection = document.querySelector(".ot-skill-main");
        const skillBars = document.querySelectorAll(".ot-skill-per");
        let animated = false;

        function animateSkillBars() {
            skillBars.forEach(function (skillPer) {
                let per = parseFloat(skillPer.getAttribute("data-per"));
                skillPer.style.width = per + "%";

                let animatedValue = 0;
                let startTime = null;

                function animate(timestamp) {
                    if (!startTime) startTime = timestamp;
                    let progress = timestamp - startTime;
                    let stepPercentage = progress / 1000;

                    if (stepPercentage < 1) {
                        animatedValue = per * stepPercentage;
                        skillPer.setAttribute("data-per", Math.floor(animatedValue) + "%");
                        requestAnimationFrame(animate);
                    } else {
                        skillPer.setAttribute("data-per", per + "%");
                    }
                }

                requestAnimationFrame(animate);
            });
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateSkillBars();
                    observer.unobserve(skillSection);
                }
            });
        }, {
            threshold: 0.3,
        });

        if (skillSection) {
            observer.observe(skillSection);
        }
    });

    /*----------------- 16. ScrollCue ---------------- */
    document.addEventListener('DOMContentLoaded', function () {
        scrollCue.init({
            percentage: .99,
            duration: 900
        });
    });
    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    /*---------- 17. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        // Delegate events for opening the search box
        $(document).on("click", $searchOpen, function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });

        // Delegate event for closing the search box when clicking outside
        $(document).on("click", function (e) {
            if (!$(e.target).closest($searchBox).length && !$(e.target).closest($searchOpen).length) {
                $($searchBox).removeClass($toggleCls);
            }
        });

        // Prevent the click inside the search box from closing it
        $(document).on("click", $searchBox + " form", function (e) {
            e.stopPropagation();
            $($searchBox).addClass($toggleCls);
        });

        // Delegate event for closing the search box on clicking close button
        $(document).on("click", $searchCls, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(".popup-search-box", ".searchBoxToggler", ".searchClose", "show");

    $(".ot-search-close-btn,.body-overlay").on("click", function () {
        $(".ot-search-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    /*----------------- 18. Smooth Scroll ---------------*/
    gsap.registerPlugin(ScrollTrigger);

    let lenis;
    let tickerId = null;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function initializeLenis() {
        lenis = new Lenis({
            lerp: 0.07, // Smoothing factor
            smooth: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP's ticker to sync with Lenis
        tickerId = gsap.ticker.add((time) => {
            if (lenis) lenis.raf(time * 1000);
        });

        // Allow native scroll inside certain elements
        document.querySelectorAll(".allow-natural-scroll").forEach((el) => {
            el.addEventListener("wheel", (e) => e.stopPropagation(), {
                passive: true,
            });
            el.addEventListener("touchmove", (e) => e.stopPropagation(), {
                passive: true,
            });
        });
    }

    function enableOrDisableLenis() {
        if (prefersReducedMotion) return;

        if (window.innerWidth > 991) {
            if (!lenis) initializeLenis();
            lenis.start();
        } else {
            if (lenis) {
                lenis.stop();
                lenis = null;
            }
            // Clean up the GSAP ticker if it was added
            if (tickerId) {
                gsap.ticker.remove(tickerId);
                tickerId = null;
            }
        }
    }
    enableOrDisableLenis();

    /*----------------- 19. Team Active Class ---------------*/
    $('.ot-team-card').on('mouseenter', function () {
        $(this).addClass('active').siblings('.ot-team-card').removeClass('active');
    });

    /*----------------- 20. Price filter active ---------------*/
    if ($("#slider-range").length) {

        $("#slider-range").slider({

            range: true,

            min: 0,

            max: 500,

            values: [5, 300],

            slide: function (event, ui) {

                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);

            }

        });

        $("#amount").val("$" + $("#slider-range").slider("values", 0) +

            " - $" + $("#slider-range").slider("values", 1));

        $('#filter-btn').on('click', function () {

            $('.filter-widget').slideToggle(1000);

        });

    }

    /*----------- 21. lettering js ---------------- */
    function injector(t, splitter, klass, after) {
        let a = t.text().split(splitter),
            inject = '';
        if (a.length) {
            $(a).each(function (i, item) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.empty().append(inject);
        }
    }

    let methods = {
        init: function () {

            return this.each(function () {
                injector($(this), '', 'char', '');
            });

        },

        words: function () {

            return this.each(function () {
                injector($(this), ' ', 'word', ' ');
            });

        },

        lines: function () {

            return this.each(function () {
                let r = "eefec303079ad17405c889e092e105b0";
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });

        }
    };

    $.fn.lettering = function (method) {
        // Method calling logic
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
        }
        $.error('Method ' + method + ' does not exist on jQuery.lettering');
        return this;
    };

    $(".ot-circle-anime").lettering();

    $('[data-slider-prev], [data-slider-next]').on('click', function () {
        var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
        var targetSlider = $(sliderSelector);

        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;

            if (swiper) {
                if ($(this).data('slider-prev')) {
                    swiper.slidePrev();
                } else {
                    swiper.slideNext();
                }
            }
        }
    });

    /*-------------- 22. Custom Service Slider -------------*/
    $(document).ready(function () {


        // ✅ Click event for service list
        $(document).on('click', '.ot-service-list-wrap', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });

        // ✅ Ensure one item is active on load
        if ($('.ot-service-list-area .ot-service-list-wrap.active').length === 0) {
            $('.ot-service-list-area .ot-service-list-wrap:first').addClass('active');
        }

        // ✅ Show Next Service
        function showNextservice() {
            let $items = $('.ot-service-list-area .ot-service-list-wrap');
            let $active = $items.filter('.active');
            let $next = $active.next('.ot-service-list-wrap');

            $active.removeClass('active');
            if ($next.length) {
                $next.addClass('active');
            } else {
                $items.first().addClass('active');
            }
        }

        // ✅ Show Previous Service
        function showPreviousservice() {
            let $items = $('.ot-service-list-area .ot-service-list-wrap');
            let $active = $items.filter('.active');
            let $prev = $active.prev('.ot-service-list-wrap');

            $active.removeClass('active');
            if ($prev.length) {
                $prev.addClass('active');
            } else {
                $items.last().addClass('active');
            }
        }

        // ✅ Bind click events for navigation buttons
        $(document).on('click', '.ot-service-next', function (e) {
            e.preventDefault();
            showNextservice();
        });

        $(document).on('click', '.ot-service-prev', function (e) {
            e.preventDefault();
            showPreviousservice();
        });

    });

    /*-------------- 23. Scroll rotate -------------*/
	let reloadClassName = document.getElementById("reload");

	if(reloadClassName !== null){
		window.onscroll = function () {
			scrollRotate();
		};
		function scrollRotate() {
			reloadClassName.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
		}
	}


})(jQuery);