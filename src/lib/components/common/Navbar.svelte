<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap";
    import yifLogo from "$lib/assets/images/YIF_logo_final.png";
    import pplLogo from "$lib/assets/images/PPLlogo.png";
    import swadeshplexlogo from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import movieticketicon from "$lib/assets/images/movies.gif";
    import popcorn from "$lib/assets/images/popcorn.png";
    import home from "$lib/assets/images/home.png";

    let navContainer;
    let navContent;
    let navContainerBgGradient;
    let navLinks;
    let isExpanded = false;
    let collapsedWidth;
    let expandedWidth;

    function expandNavbar() {
        if (!isExpanded) {
            gsap.to(navContainerBgGradient, {
                left: 0,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(navContainer, {
                width: expandedWidth,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(navLinks, {
                display: "flex",
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.1
            });
            isExpanded = true;
        }
    }

    function collapseNavbar() {
        if (isExpanded) {
            gsap.to(navContainerBgGradient, {
                left: "-120%",
                duration: 0.5,
                ease: "power2.out",
            });
            gsap.to(navLinks, {
                display: "none",
                opacity: 0,
                y: "100%",
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    gsap.to(navContainer, {
                        width: collapsedWidth,
                        duration: 0.2,
                        ease: "power2.inOut"
                    });
                }
            });
            isExpanded = false;
        }
    }

    onMount(() => {
        navLinks = navContainer.querySelectorAll('.desktop-nav-links-description');
        gsap.set(navLinks, {
            opacity: 0,
            y: "100%",
            display: "none"
        });

        navLinks.forEach(link => {
            gsap.set(link, {
                display: "block",
                opacity: 0,
                position: "static"
            });
        });

        const originalDisplay = navContent.style.display;
        navContent.style.visibility = 'hidden';
        navContent.style.display = 'flex';
        navContent.style.position = 'absolute';
        navContent.style.width = 'auto';

        const icons = navContent.querySelectorAll('.nav-icon');
        let maxIconWidth = 0;
        icons.forEach(icon => {
            maxIconWidth = Math.max(maxIconWidth, icon.offsetWidth);
        });

        void navContent.offsetWidth;

        expandedWidth = `${navContent.scrollWidth + 40}px`;

        collapsedWidth = `${maxIconWidth + 32}px`;

        navLinks.forEach(link => {
            gsap.set(link, {
                display: "none",
                opacity: 0,
                position: ""
            });
        });

        navContent.style.visibility = '';
        navContent.style.display = originalDisplay;
        navContent.style.position = '';
        navContent.style.width = '';

        navContainer.style.width = collapsedWidth;
    });
</script>

<div class="fixed -left-[120%] top-0 h-screen w-screen bg-gradient-to-r from-surface via-surface/90 to-transparent pointer-events-none"
     bind:this={navContainerBgGradient}></div>
<div class="h-screen fixed left-0 top-0 z-[6] transition-all duration-300"
     on:mouseenter={expandNavbar}
     on:mouseleave={collapseNavbar}
     bind:this={navContainer} role="none">
    <div bind:this={navContent}
         class="h-full w-fit desktop-nav-container
                relative flex flex-col items-start justify-center p-4 gap-5 overflow-visible
                "
         role="navigation">
        <a href="/">
            <div class="w-fit h-fit mb-4 absolute top-3 -ml-2">
                <img src="{pplLogo}" class="w-[90px] h-[90px] object-cover" alt="ppl logo">
            </div>
        </a>
        <a href="/">
            <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap mt-10">
                <div class="nav-icon mr-4 flex-shrink-0 w-[55px] h-[55px] flex items-center justify-center">
                    <img src="{home}" alt="heart icon" class="max-w-full max-h-full object-contain">
                </div>

                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    Home
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="/">
            <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[55px] h-[55px] flex items-center justify-center">
                    <img src="{movieticketicon}" alt="heart icon" class="max-w-full max-h-full object-contain">
                </div>

                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    PPL Box Office
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{popcorn}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain p-1 rounded-full">
                </div>
                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    What's Popping
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[55px] h-[55px] flex items-center justify-center ml-[1px]">
                    <img src="{yifLogo}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain">
                </div>
                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    Young India Filmmakers
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{swadeshplexlogo}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain">
                </div>
                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    SwadeshPlex
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[70px] h-[70px] flex items-center justify-center overflow-hidden -ml-1">
                    <img src="{kiddinglogo}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-cover rounded-full">
                </div>
                <div class="text-base primary-font text-white desktop-nav-links-description opacity-0 hidden overflow-visible">
                    Kidding Around Bharat
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
    </div>
</div>