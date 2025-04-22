<script>
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import ecatvlogo2 from "$lib/assets/images/ecatv.png";
    import projectGulak from "$lib/assets/images/Project_Gullak_Logo_Final.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import yif_logo from "$lib/assets/images/YIF_logo_final.png";
    import {onDestroy, onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

    let scrollThres = 200;
    let scaleFactor = 0.8;
    let isMobile = false;
    let isExpanded = false;
    let isTooltipDismissed = false;
    let logoContainer;
    let hiddenLogos = [];
    let logoLabels = [];
    let mainLogoLabel;
    let browser = false;
    let hintAnimation;
    let closeButton;
    let tooltip;

    // Logo descriptions
    const logoDescriptions = [
        "PPL Labs", // Main logo (first visible one)
        "YIF",
        "Swadeshplex",
        "Kidding Around Bharat",
        "ECATV",
        "Project Gullak"
    ];

    const checkMobile = () => {
        if (!browser) return;
        isMobile = window.innerWidth < 768;
    };

    const dismissTooltip = () => {
        if (!browser) return;

        isTooltipDismissed = true;
        localStorage.setItem('navTooltipDismissed', 'true');

        if (hintAnimation) {
            hintAnimation.kill();
        }

        gsap.to('.navTooltip', {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                gsap.set('.navTooltip', {display: 'none'});
            }
        });
    };

    const toggleMobileMenu = () => {
        if (!browser || !isMobile) return;

        // Dismiss tooltip when menu is opened
        if (!isExpanded && !isTooltipDismissed) {
            dismissTooltip();
        }

        isExpanded = !isExpanded;

        gsap.killTweensOf('.hiddenLogo');
        gsap.killTweensOf('.logoLabel');
        gsap.killTweensOf('.mainLogoLabel');
        gsap.killTweensOf('.logoContainer');
        gsap.killTweensOf('.mobileOverlay');
        gsap.killTweensOf('.navTooltip');
        gsap.killTweensOf('.closeButton');

        if (isExpanded) {
            if (hintAnimation) {
                hintAnimation.kill();
            }

            gsap.set('.navTooltip', {
                opacity: 0,
                display: 'none'
            });

            gsap.to('.mobileOverlay', {
                opacity: 1,
                display: 'block',
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(logoContainer, {
                height: 'auto',
                duration: 0.4,
                ease: "power2.out"
            });

            gsap.to(closeButton, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                delay: 0.1,
                display: 'flex',
                ease: "back.out(1.7)"
            });

            gsap.to(mainLogoLabel, {
                opacity: 1,
                x: 0,
                duration: 0.3,
                delay: 0.1,
                ease: "power2.out"
            });

            gsap.to(hiddenLogos, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.3,
                display: 'flex',
                ease: "power2.out"
            });

            gsap.to(logoLabels, {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.3,
                delay: 0.2,
                display: 'block',
                ease: "power2.out"
            });
        } else {
            gsap.to(closeButton, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: "power2.in",
                display: 'none'
            });

            gsap.to(logoLabels, {
                opacity: 0,
                x: -20,
                duration: 0.2,
                ease: "power2.in",
                display: 'none'
            });

            gsap.to(mainLogoLabel, {
                opacity: 0,
                x: -20,
                duration: 0.2,
                ease: "power2.in"
            });

            gsap.to(hiddenLogos, {
                opacity: 0,
                y: (i) => -40 * (i + 1),
                duration: 0.3,
                delay: 0.1,
                ease: "power2.in",
                display: 'none'
            });

            gsap.to(logoContainer, {
                height: '7vh',
                duration: 0.4,
                delay: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    gsap.to('.mobileOverlay', {
                        opacity: 0,
                        duration: 0.2,
                        display: 'none'
                    });
                }
            });
        }
    };

    const startHintAnimation = () => {
        if (!browser || !isMobile || isExpanded || isTooltipDismissed) return;

        if (hintAnimation) {
            hintAnimation.kill();
        }

        gsap.set('.navTooltip', {
            display: 'flex',
            opacity: 0,
            scale: 0.9,
            right: '-120px'  // Position to the right of the logo
        });

        hintAnimation = gsap.timeline({repeat: -1, yoyo: true})
            .to('.navTooltip', {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power1.inOut"
            })
            .to('.navTooltip', {
                opacity: 0.7,
                scale: 0.95,
                duration: 1.5,
                ease: "power1.inOut"
            });
    };

    onMount(() => {
        browser = typeof window !== 'undefined';

        if (browser) {
            // Check if tooltip was previously dismissed
            isTooltipDismissed = localStorage.getItem('navTooltipDismissed') === 'true';

            gsap.registerPlugin(ScrollTrigger);

            checkMobile();
            window.addEventListener('resize', checkMobile);

            hiddenLogos = document.querySelectorAll('.hiddenLogo');
            logoLabels = document.querySelectorAll('.logoLabel');
            mainLogoLabel = document.querySelector('.mainLogoLabel');
            logoContainer = document.querySelector('.logoContainer');
            closeButton = document.querySelector('.closeButton');
            tooltip = document.querySelector('.navTooltip');

            gsap.set(hiddenLogos, {
                opacity: 0,
                y: (i) => -40 * (i + 1),
                display: 'none'
            });

            gsap.set(logoLabels, {
                opacity: 0,
                x: -20,
                display: 'none'
            });

            gsap.set(mainLogoLabel, {
                opacity: 0,
                x: -20
            });

            gsap.set(closeButton, {
                opacity: 0,
                scale: 0.8,
                display: 'none'
            });

            // Only start animation if tooltip hasn't been dismissed
            if (!isTooltipDismissed) {
                setTimeout(startHintAnimation, 1500);
            }

            gsap.fromTo(
                ".navAnim",
                {
                    opacity: 0,
                    y: -30,
                    transformOrigin: "bottom center"
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: "expo.out",
                    stagger: 0.1
                }
            );

            // Desktop scroll animation
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: `${scrollThres}px top`,
                    toggleActions: "play reverse play reverse",
                }
            });

            tl.to('.navAnim img', {
                scale: scaleFactor,
                ease: "power1.out",
                duration: 0.3
            }, 0)
                .to('.imageContainer', {
                    gap: "1vw",
                    paddingTop: "0.5vh",
                    paddingBottom: "1vh",
                    paddingLeft: "1vw",
                    marginTop: "-10px",
                    ease: "power1.out",
                    duration: 0.3
                }, 0)
                .to('.firstImg', {
                    marginRight: "-0.5rem",
                    ease: "power1.out",
                    duration: 0.3,
                }, 0)
                .to('.desktopLabel', {
                    fontSize: "0.8rem",
                    ease: "power1.out",
                    duration: 0.3
                }, 0);
        }
    });

    const handleClick = () => {
        if (browser) {
            window.location = "https://yif-website.vercel.app/";
        }
    };

    onDestroy(() => {
        if (browser) {
            // Only run cleanup in browser
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', checkMobile);
            if (hintAnimation) {
                hintAnimation.kill();
            }
        }
    });
</script>

<div class="h-fit w-full sticky top-0 z-50">
    <button class="mobileOverlay fixed inset-0 bg-black/50 backdrop-blur-md z-40 hidden opacity-0 md:hidden"
            on:click={toggleMobileMenu}></button>

    <div class="imageContainer h-fit w-full absolute top-0 left-0 hidden md:flex justify-start items-center
                gap-[1vw] min-[376px]:gap-[2vw] pl-1 min-[376px]:p-[0vw] sm:pl-[2vw] sm:py-0 sm:pr-0 z-50 overflow-hidden">
        <div class="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[1] overflow-hidden">
            <hr class="border-t-2 border-primary border-dashed">
        </div>

        <div class="navAnim firstImg flex-shrink-0 min-w-0 h-[7vh] min-[426px]:h-[20vh] w-auto max-w-[15vh]
                    bg-transparent rounded-full overflow-hidden mr-0 min-[426px]:mr-4 z-[1] flex items-center">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">PPL Labs</span>
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[7vh] w-[7vh] min-[426px]:h-[10vh] min-[426px]:w-[10vh] bg-transparent
                    overflow-hidden z-[1] flex items-center">
            <img src="{yif_logo}" alt="YIF Logo" class="object-cover h-full w-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">YIF</span>
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11vh] min-[426px]:w-[11vh] bg-transparent
                    overflow-hidden z-[1] flex items-center">
            <img src="{swadeshplex}" alt="Swadeshplex Logo" class="object-cover h-full w-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">Swadeshplex</span>
        </div>

        <button class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11.5vh] min-[426px]:w-[11.5vh] bg-transparent rounded-full
                    overflow-hidden z-[1] flex items-center"
                on:click={handleClick}>
            <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-cover h-full w-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">Kidding Around Bharat</span>
        </button>

        <div class="navAnim flex-shrink-0 min-w-0 h-[7vh] w-[7vh] min-[426px]:h-[10.5vh] min-[426px]:w-[11vh]
                            bg-transparent rounded-full overflow-hidden z-[1] flex items-center">
            <img src="{ecatvlogo2}" alt="Ecatv Logo" class="object-contain h-full w-full rounded-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">ECATV</span>
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[9vh] w-[8vh] min-[426px]:h-[13vh] min-[426px]:w-[12vh] bg-transparent
                    overflow-hidden z-[1] flex items-center">
            <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-full w-full"/>
            <span class="desktopLabel ml-2 text-white font-medium text-lg">Project Gullak</span>
        </div>
    </div>

    <div class="logoContainer md:hidden fixed left-2 top-2 h-[7vh] w-full z-50 flex flex-col gap-4 overflow-visible">
        <button class="closeButton absolute right-4 top-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full z-[60]
                    flex items-center justify-center shadow-md" on:click={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>

        <div class="flex items-center relative">
            <button class="mainLogo flex-shrink-0 h-[10vh] w-auto max-w-[15vh] bg-transparent rounded-full
                        overflow-hidden z-[2] cursor-pointer relative"
                    on:click={toggleMobileMenu}>
                <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-fit"/>
            </button>
            <span class="mainLogoLabel text-white font-medium text-lg ml-3">{logoDescriptions[0]}</span>

            <div class="navTooltip absolute right-1/2 translate-x-1/4 2xs:translate-x-0 2xs:right-1/2 top-1/2 -translate-y-1/2 bg-background shadow-lg px-3 py-2
                 rounded-md text-sm text-black font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -ml-1 transform -scale-x-100" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <span class="primary-font text-primary capitalize font-bold">Click to open</span>
                <button on:click|stopPropagation={dismissTooltip}
                        class="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5
                               hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="flex items-center">
            <div class="hiddenLogo flex-shrink-0 h-[10vh] w-[10vh] bg-transparent overflow-hidden z-[1]">
                <img src="{yif_logo}" alt="YIF Logo" class="object-cover h-full w-full mx-auto"/>
            </div>
            <span class="logoLabel text-white font-medium text-lg ml-3">{logoDescriptions[1]}</span>
        </div>

        <div class="flex items-center">
            <div class="hiddenLogo flex-shrink-0 h-[10vh] w-[10vh] bg-transparent overflow-hidden z-[1]">
                <img src="{swadeshplex}" alt="Swadeshplex Logo" class="object-cover h-full w-full"/>
            </div>
            <span class="logoLabel text-white font-medium text-lg ml-3">{logoDescriptions[2]}</span>
        </div>

        <div class="flex items-center">
            <div class="hiddenLogo flex-shrink-0 h-[10vh] w-[10vh] bg-transparent rounded-full overflow-hidden z-[1]">
                <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-cover h-full w-full"/>
            </div>
            <span class="logoLabel text-white font-medium text-lg ml-3">{logoDescriptions[3]}</span>
        </div>

        <div class="flex items-center">
            <div class="hiddenLogo flex-shrink-0 h-[10vh] w-[10vh] bg-transparent rounded-full overflow-hidden z-[1]">
                <img src="{ecatvlogo2}" alt="Ecatv Logo" class="object-contain h-full w-full rounded-full"/>
            </div>
            <span class="logoLabel text-white font-medium text-lg ml-3">{logoDescriptions[4]}</span>
        </div>

        <div class="flex items-center">
            <div class="hiddenLogo flex-shrink-0 h-[11vh] w-[11vh] bg-transparent overflow-hidden z-[1]">
                <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-full w-full"/>
            </div>
            <span class="logoLabel text-white font-medium text-lg ml-3">{logoDescriptions[5]}</span>
        </div>
    </div>
</div>

<style>
    .logoContainer {
        transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobileOverlay {
        transition: opacity 0.3s ease;
    }

    .hiddenLogo, .logoLabel, .mainLogoLabel, .closeButton, .navTooltip {
        will-change: transform, opacity;
    }

    .navTooltip {
        will-change: transform, opacity;
        transition: transform 0.2s ease;
        transform-origin: left center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        z-index: 100;
    }

    .navTooltip button:hover {
        transform: scale(1.1);
    }

    .desktopLabel {
        font-size: 1rem;
        transition: font-size 0.3s ease;
        white-space: nowrap;
    }

    .closeButton:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }
</style>