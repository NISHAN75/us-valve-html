(function ($) {
    $(document).ready(function () {
        
        // offcanvas humbarger
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

         // Magnific popup
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

        // gsap

        gsap.registerPlugin(ScrollTrigger);

        // function lineAnimation() {

        //     ScrollTrigger.getAll().forEach(st => st.kill());

        //     gsap.killTweensOf(".line-one, .line-two, .line-three");

        //     gsap.set(".line-one, .line-two, .line-three", {
        //         clearProps: "transform"
        //     });

        //     gsap.to(".line-one", {
        //         xPercent: -7.5,
        //         skewX: -26,
        //         duration: 1.8,
        //         ease: "expo.out",
        //         scrollTrigger: {
        //             trigger: ".line-wrapper",
        //             start: "top 80%",
        //             once: true
        //         }
        //     });

        //     gsap.to(".line-two", {
        //         xPercent: -18.9,
        //         skewX: -26,
        //         duration: 1.8,
        //         ease: "expo.out",
        //         scrollTrigger: {
        //             trigger: ".line-wrapper",
        //             start: "top 80%",
        //             once: true
        //         }
        //     });

        //     gsap.to(".line-three", {
        //         xPercent: -31.65,
        //         skewX: -26,
        //         duration: 1.8,
        //         ease: "expo.out",
        //         scrollTrigger: {
        //             trigger: ".line-wrapper",
        //             start: "top 80%",
        //             once: true
        //         }
        //     });
        // }

        // lineAnimation();

        // let resizeTimer;

        // window.addEventListener("resize", () => {
        //     clearTimeout(resizeTimer);

        //     resizeTimer = setTimeout(() => {
        //         lineAnimation();
        //         ScrollTrigger.refresh();
        //     }, 200);
        // });


function titleAnimation() {
    if (window.titleTl) {
        window.titleTl.scrollTrigger.kill();
        window.titleTl.kill();
    }

    window.titleTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".product-catalog-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true
            // markers: true
        }
    });

    let tl = window.titleTl;

    // LEFT
    tl.to(".title-stripe-wrapper.left-side .stripe-one", {
        x: -20,
        opacity: 0.5,
        duration: 0.8
    }, 0)

    .to(".title-stripe-wrapper.left-side .stripe-two", {
        x: -12,
        opacity: 0.75,
        duration: 0.8
    }, 0)

    .to(".title-stripe-wrapper.left-side .stripe-three", {
        x: -6,
        opacity: 0.9,
        duration: 0.8
    }, 0)

    // RIGHT
    .to(".title-stripe-wrapper.right-side .stripe-one", {
        x: 20,
        opacity: 0.5,
        duration: 0.8
    }, 0)

    .to(".title-stripe-wrapper.right-side .stripe-two", {
        x: 12,
        opacity: 0.75,
        duration: 0.8
    }, 0)

    .to(".title-stripe-wrapper.right-side .stripe-three", {
        x: 6,
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



        // OverlayScrollbars
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
        // lenis
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
        // lenis


    });
})(jQuery);