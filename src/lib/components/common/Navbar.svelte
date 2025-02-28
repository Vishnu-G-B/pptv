<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap";
    import yifLogo from "$lib/assets/images/YIF logo.png";
    import pplLogo from "$lib/assets/images/PPLlogo.png";
    import trending from "$lib/assets/images/trending.png";
    import evidyaLogo from "$lib/assets/images/evidya.jpeg";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import ecatvlogo from "$lib/assets/images/ecatv.jpeg";
    import yiflogo from "$lib/assets/images/YIF logo.png";
    import crewstorylogo from "$lib/assets/images/crewstory.jpeg";

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
            });
            gsap.to(navContainer, {
                width: expandedWidth,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(navLinks, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3
            });
            isExpanded = true;
        }
    }

    function collapseNavbar() {
        if (isExpanded) {
            gsap.to(navContainerBgGradient, {
                left: "-120%",
                duration: 1,
            });
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

<div class="fixed -left-[120%] top-0 bg-gradient-to-r from-surface/60 to-transparent to-35% h-screen w-full"
     bind:this={navContainerBgGradient}></div>
<div class="h-screen fixed left-0 top-0 z-[6] transition-all duration-300"
     on:mouseenter={expandNavbar}
     on:mouseleave={collapseNavbar}
     bind:this={navContainer} role="none">
    <div bind:this={navContent}
         class="h-full desktop-nav-container backdrop-blur-sm relative flex flex-col items-start justify-center p-4 gap-5 overflow-hidden"
         role="navigation">
        <div class="w-fit h-fit mb-4 absolute top-3 -ml-2">
            <img src="{pplLogo}" class="w-[65px] h-[65px]" alt="ppl logo">
        </div>
        <a href="/">
            <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40px" height="40px"
                         class="fill-on-surface">
                        <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"/>
                    </svg>
                </div>

                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    Home
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="/">
            <div class="w-full h-fit flex flex-row items-center group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0">
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="#dee3e9"
                         xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" d="M12 5.50098L14 7.5004" stroke="#dee3e9" stroke-width="1.5"
                              stroke-linecap="round"/>
                        <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"
                              fill="#dee3e9"/>
                    </svg>
                </div>

                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    Purple Favourites
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0">
                    <img src="{trending}" alt="logo of young india festival"
                         class="w-[40px] h-[40px] object-cover p-1 bg-gray-50 rounded-full">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    Most Viewed
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0">
                    <img src="{yifLogo}" alt="logo of young india festival" class="w-[40px] h-[40px] object-left">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    Young India Filmmakers
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0">
                    <img src="{kiddinglogo}" alt="logo of young india festival" class="w-[40px] h-[40px] object-left">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    Kidding Around Bharat
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
        <a href="https://yif-website.vercel.app/">
            <div class="w-full h-fit flex flex-row items-center relative group whitespace-nowrap">
                <div class="nav-icon mr-4 flex-shrink-0 rounded-full">
                    <img src="{crewstorylogo}" alt="logo of young india festival"
                         class="w-[40px] h-[40px] object-cover rounded-full">
                </div>
                <div class="text-base primary-font text-on-surface desktop-nav-links-description opacity-0 overflow-hidden">
                    The Crewstory
                    <div class="h-0.5 w-0 group-hover:w-full bg-primary/80 absolute bottom-0 transition-all duration-300"></div>
                </div>
            </div>
        </a>
    </div>
</div>