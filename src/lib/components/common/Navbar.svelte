<script>
    import yifLogo from "$lib/assets/images/YIF logo.png";
    import {gsap} from "gsap";
    import {Flip} from "gsap/dist/Flip";
    import {onMount} from "svelte";

    onMount(() => {
        gsap.registerPlugin(Flip);
    })

    function desktopNavLinkHover() {
        const desktopNavState = Flip.getState('.desktop-nav-container');
        let openNavTimeline = gsap.timeline();
        openNavTimeline.pause(0);
        // openNavTimeline.to('.desktop-nav-container', {
        //     width: '100%',
        //     duration: 0.5,
        //     ease: 'power4.inOut'
        // });
        let navLinks = document.getElementsByClassName('desktop-nav-links-description');
        for (let link of navLinks) {
            link.style.display = 'flex';
        }
        Flip.from(desktopNavState, {
            duration: 1, ease: 'power4.inOut', onStart: () => {
                openNavTimeline.play(0);
            }
        });

        openNavTimeline.to('#desktop-nav-overlay', {
            left: '0%',
            duration: 1,
            ease: 'power4.inOut',
        });
        openNavTimeline.to('.desktop-nav-links-description', {
            opacity: 1,
            x: '0%',
            duration: 1,
            ease: 'power4.inOut',
        }, '<');
        // openNavTimeline.to('#desktop-nav-overlay', {
        //     left: '0%',
        //     duration: 1,
        //     ease: 'power4.inOut'
        // }, '<');
        // openNavTimeline.to('.desktop-nav-links-description', {
        //     display: 'flex',
        //     opacity: 1,
        //     duration: 0.5,
        //     ease: 'power4.inOut'
        // }, '>');
        // let navOverlay = document.getElementById('desktop-nav-overlay');
        // navOverlay.classList.remove('hidden');
    }

    function desktopNavLinkLeave() {
        let closeNavTimeline = gsap.timeline();
        closeNavTimeline.to('.desktop-nav-links-description', {
            opacity: 0,
            x: '-50%',
            duration: 1,
            ease: 'power4.inOut',
        });
        closeNavTimeline.to('#desktop-nav-overlay', {
            left: '-100%',
            duration: 2,
            ease: 'power4.inOut'
        }, '<');
        let desktopNavState = Flip.getState('.desktop-nav-container');
        let navLinks = document.getElementsByClassName('desktop-nav-links-description');
        for (let link of navLinks) {
            link.style.display = 'none';
        }
        Flip.from(desktopNavState, {duration: 1, ease: 'power4.inOut'})
    }
</script>

<!--DESKTOP NAVBAR-->
<div class="w-full h-screen fixed top-0 -left-[100%] bg-gradient-to-r from-surface/70 to-transparent to-30% z-[2]"
     id="desktop-nav-overlay"></div>
<div class="w-[295px] h-screen fixed left-0 top-0 z-[4]">
    <div class="w-fit h-full desktop-nav-container backdrop-blur-sm flex flex-col items-start justify-center p-3 px-5 gap-5"
         on:mouseover={desktopNavLinkHover} on:mouseleave={desktopNavLinkLeave} on:focus={()=>{}} role="button"
         tabindex="0">
        <div class="w-fit h-fit absolute top-3">
            <p class="text-sm text-on-surface primary-font">logo</p>
        </div>
        <div class="w-fit h-fit flex flex-row gap-2 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"
                 class="fill-on-surface">
                <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"/>
            </svg>
            <p class="text-lg primary-font -translate-x-[100%] text-on-surface hidden desktop-nav-links-description opacity-0 text-nowrap text-clip">
                Home
            </p>
        </div>
        <div class="w-fit h-fit flex flex-row gap-2 items-center justify-center relative">
            <img src="{yifLogo}" alt="logo of young india festival" class="w-[30px] h-[30px] object-left">
            <p class="text-lg primary-font -translate-x-[100%] text-on-surface hidden desktop-nav-links-description opacity-0 text-nowrap text-clip">
                Young India Filmmakers
            </p>
        </div>
    </div>
</div>