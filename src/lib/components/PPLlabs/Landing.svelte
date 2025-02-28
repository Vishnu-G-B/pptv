<script>
    import {onMount} from 'svelte';
    import gsap from 'gsap';
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import evidyaLogo from "$lib/assets/images/evidya.jpeg";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import ecatvlogo from "$lib/assets/images/ecatv.jpeg";
    import projectGulak from "$lib/assets/images/Project Gullak Logo.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import yif_logo from "$lib/assets/images/YIF logo (2).png";
    import {goto} from "$app/navigation";
    import {textAnimation} from "$lib/animations/textSplit.js";
    import Textify from "textify.js";

    let contentContainer;
    let mainHeading;
    let subHeading;
    let tagline;
    let buttons;

    onMount(() => {
        const tl = gsap.timeline({defaults: {ease: "power3.out"}});


        gsap.fromTo(
            ".navAnim",
            {
                opacity: 0,
                y: -30,
                // rotationX: 90,
                transformOrigin: "bottom center"
            },
            {
                opacity: 1,
                y: 0,
                // rotateX: 0,
                duration: 2,
                ease: "expo.out",
                stagger: 0.1
            }
        );

        new Textify({
            el: '.large-animation-3',
            splitType: 'lines',
            largeText: true,
            animation: {
                by: 'lines',
                stagger: 0.1,
                duration: 0.7,
                ease: 'expo.inOut',
                transformOrigin: 'left top',
                animateProps: {"y": "0", "opacity": 0}
            }
        }, gsap)


        gsap.utils.toArray('.animate-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    });

    const handleClick = () => {
        goto('/purpletv');
    };
</script>

<div class="w-full h-screen relative bg-gradient overflow-hidden">
    <video
            class="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoplay
            loop
            muted
            playsinline>
        <source src="{LandingVid}" type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
    <div class="absolute inset-0 bg-gradient-to-r from-[#250025]/90 to-[#250025]/0"></div>

    <!--  REMOVE LINE FROM LEFT OF PPL LOGO  -->

    <div class="h-fit w-full absolute top-0 left-0 flex justify-start items-center gap-[2vw] py-[1vh] px-[2vw]">
        <!-- Background horizontal lines -->
        <div class="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
            <hr class="border-t-2 border-primary">
        </div>
        <div class="absolute top-1/2 left-0 w-full translate-y-[0.3rem] z-0">
            <hr class="border-t-2 border-brand-orange">
        </div>
        <div class="absolute top-1/2 left-0 w-full -translate-y-[0.4rem] z-0">
            <hr class="border-t-2 border-brand-green">
        </div>

        <!-- Navigation Logos -->
        <!-- 1. PPLlabs logo (remains auto width) -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[12vh] min-[426px]:h-[15vh] w-[10vh] bg-transparent rounded-full overflow-hidden mr-4">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"/>
        </div>

        <!-- 2. Kidding Bharat logo: fixed width to avoid Safari stretching -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10vh] w-[10vh] bg-transparent rounded-full overflow-hidden">
            <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-contain h-full w-full"/>
        </div>

        <!-- 3. Evidya logo (circular, fixed width already) -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[9vh] min-[426px]:w-[9vh] bg-black rounded-full overflow-hidden">
            <img src="{evidyaLogo}" alt="Evidya Logo" class="object-cover h-full w-full rounded-full"/>
        </div>

        <!-- 4. Ecatv logo (circular, fixed width already) -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[9vh] min-[426px]:w-[9vh] bg-black rounded-full overflow-hidden">
            <img src="{ecatvlogo}" alt="Ecatv Logo" class="object-cover h-full w-full rounded-full"/>
        </div>

        <!-- 5. Project Gulak logo (remains fixed) -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[12.5vh] w-[9vh] bg-transparent overflow-hidden">
            <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-full w-full"/>
        </div>

        <!-- 6. Swadeshplex logo: fixed width to prevent excessive auto sizing -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10.1vh] w-[10vh] bg-transparent overflow-hidden">
            <img src="{swadeshplex}" alt="Swadeshplex Logo" class="object-contain h-full w-full"/>
        </div>

        <!-- 7. YIF logo: fixed width to prevent excessive auto sizing -->
        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10.1vh] w-[10vh] bg-transparent overflow-hidden">
            <img src="{yif_logo}" alt="YIF Logo" class="object-contain h-full w-full"/>
        </div>
    </div>


    <div
            class="absolute inset-0 flex items-end justify-start z-10 mb-4 md:mb-[2.5rem]"
            bind:this={contentContainer}>
        <div class="max-w-3xl p-4 md:p-8 rounded-lg primary-font">
            <h1 use:textAnimation
                class="text-xl md:text-[1.8rem] font-bold text-[#ff9900] mb-2 md:mb-4 leading-tight"
                bind:this={mainHeading}
                style="font-family: Arial">
                Edutainment With A Purpose @ ONE Rupee*
            </h1>
            <h2 class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify large-animation-3"
                bind:this={subHeading}>
                We are a Conscious OTT Platform for K to 12 schools committed to produce and promote impactful cinema,
                educational content & curriculum.
                Our mission is to support the Ministry Of Education’s PM eVIDYA initiative aligned with NEP 2020, for 25
                Crore school going children and their families
                at Just ONE Rupee*. #ONEderful #GoPurple
            </h2>
            <p
                    class="text-base md:text-lg text-white/80 mb-4 md:mb-8 text-[#6aa84f] text-justify"
                    bind:this={tagline}
                    style="font-family: Arial">
        <span
                use:textAnimation
                class="text-lg md:text-[1.6rem] font-bold tracking-[0.040em] text-[#6aa84f]">
          Watch - Learn - Create - Impact
        </span>
                <br/>
                <span
                        use:textAnimation
                        class="capitalize text-2xl md:text-5xl font-bold text-[#6aa84f]">
          Make A Difference
        </span>
            </p>
            <!-- Button -->
            <div class="flex flex-col sm:flex-row gap-2 md:gap-4" bind:this={buttons}>
                <button
                        class="animate-button text-base md:text-3xl text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-[#660066]"
                        on:click={handleClick}>
                    #GoPurple
                </button>
            </div>
        </div>
    </div>
</div>
