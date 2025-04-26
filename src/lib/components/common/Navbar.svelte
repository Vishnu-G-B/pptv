<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap";
    import yifLogo from "$lib/assets/images/YIF_logo_final.png";
    import pplLogo from "$lib/assets/images/PPLlogo.png";
    import trending from "$lib/assets/images/trending.png";
    import swadeshplexlogo from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import hearticon from "$lib/assets/images/hearticon.png";

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

        // Make sure the content is temporarily visible with all text showing
        // to properly calculate the full expanded width
        navLinks.forEach(link => {
            gsap.set(link, {
                display: "block",
                opacity: 0,
                position: "static"
            });
        });

        // Temporarily make the container visible to calculate proper width
        const originalDisplay = navContent.style.display;
        navContent.style.visibility = 'hidden';
        navContent.style.display = 'flex';
        navContent.style.position = 'absolute';
        navContent.style.width = 'auto';

        // Find the widest icon for collapsed state
        const icons = navContent.querySelectorAll('.nav-icon');
        let maxIconWidth = 0;
        icons.forEach(icon => {
            maxIconWidth = Math.max(maxIconWidth, icon.offsetWidth);
        });

        // Force a reflow to ensure all elements are properly measured
        void navContent.offsetWidth;

        // Calculate the width needed for the expanded state
        // Add extra padding to ensure text fits properly
        expandedWidth = `${navContent.scrollWidth + 40}px`;

        // Set collapsed width based on the widest icon plus padding
        collapsedWidth = `${maxIconWidth + 32}px`;

        // Reset styles
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

        // Set initial width
        navContainer.style.width = collapsedWidth;
    });
</script>

<div class="fixed -left-[120%] top-0 bg-gradient-to-r from-alternate-primary to-transparent to-95% h-screen w-1/4"
     bind:this={navContainerBgGradient}></div>
<div class="h-screen fixed left-0 top-0 z-[6] transition-all duration-300"
     on:mouseenter={expandNavbar}
     on:mouseleave={collapseNavbar}
     bind:this={navContainer} role="none">
    <div bind:this={navContent}
         class="h-full desktop-nav-container backdrop-blur-sm relative flex flex-col items-start justify-center p-4 gap-5 overflow-visible"
         role="navigation">
        <a href="/">
            <div class="w-fit h-fit mb-4 absolute top-3 -ml-2">
                <img src="{pplLogo}" class="w-[95px] h-[95px] object-cover" alt="ppl logo">
            </div>
        </a>
        <a href="/">
            <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{hearticon}" alt="heart icon" class="max-w-full max-h-full object-contain">
                </div>

                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 hidden overflow-visible">
                    PPL Featured
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{trending}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain p-1 bg-gray-50 rounded-full">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 hidden overflow-visible">
                    Most Loved
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{yifLogo}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 hidden overflow-visible">
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
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 hidden overflow-visible">
                    SwadeshPlex
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center">
                    <img src="{kiddinglogo}" alt="logo of young india festival"
                         class="max-w-full max-h-full object-contain rounded-full">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 hidden overflow-visible">
                    Kidding Around Bharat
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
    </div>
</div>
