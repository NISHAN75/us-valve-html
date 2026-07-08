(function ($) {
    $(document).ready(function () {
        $(document).on('click', '.scroll-btn', function (e) {
            e.preventDefault();
            const $nextSection = $('.content-block-area');
            if ($nextSection.length) {
                lenis.scrollTo($nextSection[0], { offset: -100 });
            }
        });
        // header sticky
        var windowOn = $(window);
        windowOn.on('scroll', function () {
            if ($("body").hasClass("home")) {
                var scroll = windowOn.scrollTop();
                if (scroll < 100) {
                    $(".header-area").removeClass("header-sticky");
                    $(".header-offcanvas").removeClass("version-2");
                } else {
                    $(".header-area").addClass("header-sticky");
                    $(".header-offcanvas").addClass("version-2");
                }
            }
        });


        $(".modal-area").on("shown.bs.modal", function () {
            OverlayScrollbars($(".modal-body"), {
                className: "os-theme-custom",
                scrollbars: {
                    visibility: "auto",
                    autoHide: "leave",
                    autoHideDelay: 500,
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });

        // nice select
        $('select').niceSelect();

       



        // Magnific popup
		$('.trigger-popup').magnificPopup({
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
		});



        



 
        // animation
        gsap.registerPlugin(SplitText, ScrollTrigger);
        let textWrappers = $(".animation-text");

        // Split text into lines and letters
        let mainTitleSplit = new SplitText(textWrappers, {
            type: "lines,chars",
            linesClass: "line-wrapper overflow-hidden",
            charsClass: "letter",
            tag: "span"
        });

        // Animate each line's letters
        $(".line-wrapper").each(function () {
            let letters = $(this).find(".letter");
            gsap.from(letters, {
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "power3.inOut"
            });
        });
        // animation line
        gsap.utils.toArray(".animation-line").forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",

                    },
                }
            );
        });
        // animation

  


        // offcanvas animation
        // Trigger animation when the offcanvas is shown
        gsap.set(".main-menu > ul", {
            x: -100,
            opacity: 0
        });
        gsap.set(".mobile-menu > ul", {
            x: -100,
            opacity: 0
        });
        gsap.set(".emergency-wrapper", {
            x: -100,
            opacity: 0
        });
        gsap.set(".contact-button-wrapper", {
            x: -100,
            opacity: 0
        });
        gsap.set(".social-link-wrapper", {
            x: 100,
            opacity: 0
        });
        // Animate on offcanvas show
        $(".header-offcanvas").on('shown.bs.offcanvas', function () {
            gsap.fromTo(
                ".main-menu > ul", {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }
            );
            gsap.fromTo(
                ".mobile-menu > ul", {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }
            );
            gsap.fromTo(
                ".emergency-wrapper", {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: 'power2.out'
            }
            );
            gsap.fromTo(
                ".contact-button-wrapper", {
                x: -100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out'
            }
            );
            gsap.fromTo(
                ".social-link-wrapper", {
                x: 100,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }
            );
        });
        $(".header-offcanvas").on('hidden.bs.offcanvas', function () {
            gsap.set(".main-menu > ul", {
                x: -100,
                opacity: 0
            });
            gsap.set(".mobile-menu > ul", {
                x: -100,
                opacity: 0
            });
            gsap.set(".emergency-wrapper", {
                x: -100,
                opacity: 0
            });
            gsap.set(".contact-button-wrapper", {
                x: -100,
                opacity: 0
            });
            gsap.set(".social-link-wrapper", {
                x: 100,
                opacity: 0
            });
        });

        // offcanvas animation

        // mobile menu
        const $mobileMenu = $(".mobile-menu");
        $mobileMenu.find("ul > li > a").on("click", function (e) {
            const $menuItem = $(this).closest("li");

            // Remove 'active' class from all other menu items
            $mobileMenu.find("ul > li").removeClass("active");
            $menuItem.addClass("active");
            const $submenu = $(this).siblings(".sub-menu");

            if ($submenu.is(":visible")) {
                $submenu.slideUp();
                $menuItem.removeClass("active");
            } else {
                // Slide down if not visible
                $(".sub-menu").slideUp();
                $(".menu-link > a").removeClass("active");
                $submenu.stop(true, true).slideDown();
            }
            // Prevent default behavior for menu-link class items
            if ($menuItem.hasClass("menu-link")) {
                e.preventDefault();
            }
        });
        const $footerMenu = $(".main-footer-wrapper");
        $footerMenu.find(".footer-title").on("click", function (e) {
            const $footerItem = $(this).closest(".footer-item");

            // Remove 'active' class from all other menu items
            $footerMenu.find(".footer-item").removeClass("active");
            $footerItem.addClass("active");
            const $footerSubMenu = $(this).siblings(".footer-sub-menu");
            if ($footerSubMenu.is(":visible")) {
                $footerSubMenu.slideUp();
                $footerItem.removeClass("active");
            } else {
                // Slide down if not visible
                $(".footer-sub-menu").slideUp();
                $footerSubMenu.stop(true, true).slideDown();
            }
            // Prevent default behavior for menu-link class items
            if ($footerItem.hasClass(".footer-menu")) {
                e.preventDefault();
            }
        });
       
        // mobile menu


        // sticky title
        $(".title-sticky").each(function () {
            const $block = $(this);
            ScrollTrigger.create({
                trigger: $block[0],
                start: "top 30%",
                end: "bottom 60%",
                pin: $block.find(".section-title")[0],
                pinSpacing: true
            });
        });
        // sticky title

        // testimonial slider
        let projectSlider = new Swiper(".featured-project-slider", {
            slidesPerView: 2,
            spaceBetween: 30,
            keyboard: {
                enabled: true,
            },
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 640px
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
            }
        });
        $(".tp-swiper-button-next").on("click", function(e){
            e.preventDefault();
            projectSlider.slideNext();
        });
        $(".tp-swiper-button-prev").on("click", function(e){
            e.preventDefault();
            projectSlider.slidePrev();
        });
        let singleProjectSlider = new Swiper(".single-project-slider", {
            cssMode: true,
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            navigation: {
                nextEl: ".tp-swiper-button-next",
                prevEl: ".tp-swiper-button-prev",
            }
        });



        //paralax

        windowOn.on("load resize", function () {
            if (windowOn.width() > 991) {
                const commitmentImg = $(".trigger-parallax");
                if (commitmentImg.length) {
                    commitmentImg.each(function () {
                        const currentItem = $(this).find(".parallax-img");

                        // Get the initial height only once and store it in data attribute
                        if (!currentItem.data("original-height")) {
                            currentItem.data("original-height", currentItem.height());
                        }

                        const originalHeight = currentItem.data("original-height");

                        // Set the height to original height + 120
                        currentItem.parent().css("height", originalHeight);
                        currentItem.css("height", originalHeight + 120);

                        // Clear existing ScrollTriggers to prevent duplicates
                        if (currentItem.data("parallax-trigger")) {
                            currentItem.data("parallax-trigger").kill();
                        }

                        const trigger = gsap.to(currentItem, {
                            y: -120,
                            ease: "none",
                            scrollTrigger: {
                                trigger: currentItem[0],
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        });

                        // Store the ScrollTrigger instance for later cleanup
                        currentItem.data("parallax-trigger", trigger);
                    });
                }
            } else {
                // Disable the parallax effect for smaller screens
                $(".parallax-img").each(function () {
                    const currentItem = $(this);
                    if (currentItem.data("parallax-trigger")) {
                        currentItem.data("parallax-trigger").kill(); // Kill the ScrollTrigger instance
                        currentItem.removeData("parallax-trigger"); // Clear stored data
                    }
                    currentItem.css("transform", "none"); // Reset transform
                });
            }
        });

        //  paralax


        // modal
        const $myModal = $('#myModal');
        const $myInput = $('#myInput');

        $myModal.on('shown.bs.modal', function () {
            $myInput.focus();
        });
        // modal

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