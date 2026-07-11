/*
  The Name: Us Valve
  File: main.js
  Description: Site-wide interactions - header height sync, mobile
               offcanvas menu, Magnific Popup video modal, GSAP
               scroll animations, OverlayScrollbars, and Lenis
               smooth scroll.
*/

/* JS INDEX
-----------------------------------
1. Header Height Sync
2. Offcanvas Hamburger Menu (Bootstrap offcanvas)
3. Magnific Popup - Video Modal (YouTube / Vimeo iframe)
4. GSAP - Banner Diagonal Line Animation
5. GSAP - Product Catalog Title Stripe Animation
6. OverlayScrollbars - Custom Scrollbar
7. Lenis - Smooth Scroll
-----------------------------------
*/

(function ($) {
    $(document).ready(function () {

        /* ==================================================================
           1. HEADER HEIGHT SYNC
           The header is position: fixed, so ".header-fix" is a spacer div
           that mirrors its real height (recalculated on load/resize) to
           stop page content jumping under the fixed header.
           ================================================================== */
        function headerHeight() {
            const headerArea = document.querySelector(".header-area");
            const headerFix = document.querySelector(".header-fix");

            if (!headerArea || !headerFix) return;

            const height = headerArea.offsetHeight;

            gsap.set(headerFix, {
                height: height
            });
        }

        // Initial call
        window.addEventListener("load", headerHeight);

        // Resize debounce
        let headerResizeTimer;

        window.addEventListener("resize", () => {
            clearTimeout(headerResizeTimer);

            headerResizeTimer = setTimeout(() => {
                headerHeight();
                ScrollTrigger.refresh();
            }, 200);
        });

        /* ==================================================================
           2. OFFCANVAS HAMBURGER MENU
           Toggles the hamburger icon's "open" state and morphs the close
           button's two spans into an X whenever the Bootstrap offcanvas
           mobile menu is shown/hidden.
           ================================================================== */
        let offcanvasElement = $('.header-offcanvas');
        offcanvasElement.on('show.bs.offcanvas', function () {
            $('.humbarger-btn').addClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: 'rotate(45deg)',
                marginBottom: '0'
            });
            $('.btn-close span:nth-child(2)').css({
                transform: 'rotate(-45deg)',
                marginTop: '-5px'
            });
        });
        offcanvasElement.on('hide.bs.offcanvas', function () {
            $('.humbarger-btn').removeClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: '',
                marginBottom: ''
            });
            $('.btn-close span:nth-child(2)').css({
                transform: '',
                marginTop: ''
            });
        });

        /* ==================================================================
           3. MAGNIFIC POPUP - VIDEO MODAL (YouTube / Vimeo iframe)
           Any element with class "trigger-popup" opens its href inside an
           iframe lightbox. YouTube/Vimeo URLs are pattern-matched so only
           the video ID is embedded, with autoplay enabled. The Vimeo
           player instance auto-closes the popup when playback ends, and
           the background placeholder video resumes when the popup closes.
           ================================================================== */
        $(document).on('click', '.trigger-popup', function (e) {
            e.preventDefault();
            $.magnificPopup.open({
                items: {
                    src: $(this).attr('href')
                },
                type: 'iframe',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
                        '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: function (url) {
                                var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                                if (!m || !m[1]) return null;
                                return m[1];
                            },
                            src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: function (url) {
                                var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                                if (!m || !m[5]) return null;
                                return m[5];
                            },
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        }
                    }
                },
                callbacks: {
                    open: function () {
                        var iframe = jQuery('.mfp-content iframe');
                        var player = new Vimeo.Player(iframe);

                        player.on('ended', function () {
                            jQuery.magnificPopup.close();
                        });
                    },
                    close: function () {
                        let video = document.getElementById("placeholder-video");
                        if (video) {
                            video.play();
                        }
                    }
                }
            });
        });

        /* ==================================================================
           GSAP SETUP
           ================================================================== */
        gsap.registerPlugin(ScrollTrigger);

        /* ==================================================================
           4. GSAP - BANNER DIAGONAL LINE ANIMATION
           Slides the three skewed decorative lines (".line-one/two/three")
           in from the right, once, as the ".line-wrapper" scrolls into
           view. Re-runs cleanly on resize by killing only its own
           ScrollTriggers/tweens and clearing inline transforms first, so
           it never fights other ScrollTrigger instances on the page.
           ================================================================== */
        function lineAnimation() {

            // Only kill ScrollTriggers that belong to the line-wrapper,
            // instead of nuking every ScrollTrigger on the page.
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger && st.trigger.classList && st.trigger.classList.contains("line-wrapper")) {
                    st.kill();
                }
            });

            gsap.killTweensOf(".line-one, .line-two, .line-three");

            gsap.set(".line-one, .line-two, .line-three", {
                clearProps: "transform"
            });

            gsap.to(".line-one", {
                x: "-=128",
                skewX: -26,
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".line-wrapper",
                    start: "top 80%",
                    once: true
                }
            });

            gsap.to(".line-two", {
                x: "-=313",
                skewX: -26,
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".line-wrapper",
                    start: "top 80%",
                    once: true
                }
            });

            gsap.to(".line-three", {
                x: "-=523",
                skewX: -26,
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: ".line-wrapper",
                    start: "top 80%",
                    once: true
                }
            });
        }

        lineAnimation();

        let resizeTimer;

        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                lineAnimation();
                ScrollTrigger.refresh();
            }, 200);
        });


        /* ==================================================================
           5. GSAP - PRODUCT CATALOG TITLE STRIPE ANIMATION
           Fans the left/right skewed stripe elements and the two edge
           outline lines outward as ".product-catalog-section" scrolls
           into view, and reverses on scroll-out (toggleActions). Rebuilt
           from scratch on load/resize: any previous timeline + its
           ScrollTrigger are killed and inline transform/opacity are
           cleared first, since the tween values below are relative
           ("-=12"/"+=6") and would otherwise stack on every re-run.
           ================================================================== */
        function titleAnimation() {
            if (window.titleTl) {
                if (window.titleTl.scrollTrigger) {
                    window.titleTl.scrollTrigger.kill();
                }
                window.titleTl.kill();
            }

            // Reset to base state before building a fresh timeline,
            // otherwise relative x values ("-=12") will stack on every re-run.
            gsap.set(
                ".title-stripe-wrapper .stripe-one, .title-stripe-wrapper .stripe-two, .title-stripe-wrapper .stripe-three, .edge-outline-line-1, .edge-outline-line-2",
                { clearProps: "transform,opacity" }
            );

            window.titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".product-catalog-section",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true
                }
            });

            let tl = window.titleTl;

            // LEFT
            tl.to(".title-stripe-wrapper.left-side .stripe-one", {
                x: "-=20",
                opacity: 0.5,
                duration: 0.8
            }, 0)

            .to(".title-stripe-wrapper.left-side .stripe-two", {
                x: "-=12",
                opacity: 0.75,
                duration: 0.8
            }, 0)

            .to(".title-stripe-wrapper.left-side .stripe-three", {
                x: "-=6",
                opacity: 0.9,
                duration: 0.8
            }, 0)

            // RIGHT
            .to(".title-stripe-wrapper.right-side .stripe-one", {
                x: "+=20",
                opacity: 0.5,
                duration: 0.8
            }, 0)

            .to(".title-stripe-wrapper.right-side .stripe-two", {
                x: "+=12",
                opacity: 0.75,
                duration: 0.8
            }, 0)

            .to(".title-stripe-wrapper.right-side .stripe-three", {
                x: "+=6",
                opacity: 0.9,
                duration: 0.8
            }, 0)

            // EDGE
            .to(".edge-outline-line-1", {
                x: 30,
                duration: 0.8
            }, 0)

            .to(".edge-outline-line-2", {
                x: -30,
                duration: 0.8
            }, 0);
        }

        window.addEventListener("load", titleAnimation);

        let resizeTimer2;

        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer2);

            resizeTimer2 = setTimeout(() => {
                titleAnimation();
                ScrollTrigger.refresh();
            }, 200);
        });


        /* ==================================================================
           6. OVERLAYSCROLLBARS - CUSTOM SCROLLBAR
           Replaces the native browser scrollbar on <body> with a themed
           OverlayScrollbars instance (click-to-scroll + drag-to-scroll
           enabled, auto-hides on mouse leave, smooth scroll behavior).
           ================================================================== */
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });

        /* ==================================================================
           7. LENIS - SMOOTH SCROLL
           Initializes Lenis for inertia-based smooth scrolling and wires
           it into GSAP's ticker/ScrollTrigger so scroll-driven animations
           stay perfectly in sync with the smoothed scroll position.
           ================================================================== */
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);


    });
})(jQuery);