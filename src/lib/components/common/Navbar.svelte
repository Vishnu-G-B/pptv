<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap";
    import yifLogo from "$lib/assets/images/YIF logo.png";

    let navContainer;
    let navContent;
    let navLinks;
    let isExpanded = false;
    let collapsedWidth;
    let expandedWidth;

    function expandNavbar() {
        if (!isExpanded) {
            gsap.to(navContainer, {
                width: expandedWidth,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(navLinks, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.3
            });
            isExpanded = true;
        }
    }

    function collapseNavbar() {
        if (isExpanded) {
            gsap.to(navLinks, {
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
        gsap.set(navLinks,
            {
                opacity: 0,
                y: "100%"
            });

        collapsedWidth = `${navContent.querySelector('.nav-icon').offsetWidth + 32}px`;
        expandedWidth = `${navContent.scrollWidth + 32}px`;

        navContainer.style.width = collapsedWidth;
    });
</script>

<div class="h-screen fixed left-0 top-0 z-[6] transition-all duration-300"
     on:mouseenter={expandNavbar}
     on:mouseleave={collapseNavbar}
     bind:this={navContainer} role="none">
    <div bind:this={navContent}
         class="h-full desktop-nav-container backdrop-blur-sm relative flex flex-col items-start justify-center p-4 gap-5 overflow-hidden"
         role="navigation">
        <div class="w-fit h-fit mb-4 absolute top-3">
            <p class="text-sm text-on-surface primary-font">logo</p>
        </div>
        <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap">
            <div class="nav-icon mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"
                     class="fill-on-surface">
                    <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"/>
                </svg>
            </div>
            <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                Home
                <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
            </div>
        </div>
        <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
            <div class="nav-icon mr-4 flex-shrink-0">
                <img src="{yifLogo}" alt="logo of young india festival" class="w-[30px] h-[30px] object-left">
            </div>
            <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                Young India Filmmakers
                <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
            </div>
        </div>
    </div>
</div>