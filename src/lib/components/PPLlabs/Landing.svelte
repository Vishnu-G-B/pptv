<script>
    import {onMount} from 'svelte';
    import gsap from 'gsap';
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
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
                We are a Conscious OTT Platform committed to produce and promote impactful cinema and content for K to
                12 schools. Aligned with NEP 2020, <br/> we specialize in curriculum integration of “Film Pedagogy” to
                educate, entertain, empower and enthuse school teachers and children.
            </h2>
            <h2 class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify "
                bind:this={subHeading}
                use:textAnimation>
                Starting at Just ONE Rupee* #ONEderful
                #Go Purple
            </h2>
            <p
                    class="text-base md:text-lg text-white/80 mb-4 md:mb-8 text-[#6aa84f] text-justify"
                    bind:this={tagline}
                    style="font-family: Arial">
        <span
                use:textAnimation
                class="text-lg md:text-[1.6rem] font-bold tracking-[0.044em] text-[#6aa84f]">
          Watch - Learn - Create - Impact
        </span>
                <br/>
                <span
                        use:textAnimation
                        class="text-2xl md:text-5xl font-bold text-[#6aa84f]">
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
