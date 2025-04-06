<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import {goto} from "$app/navigation";
    import {textAnimation} from "$lib/animations/textSplit.js";
    import SplitType from "split-type";

    onMount(() => {
        const tl = gsap.timeline({defaults: {ease: "power3.out"}});

        let typeSplit = new SplitType('.text-anim-parent', {
            types: 'lines, words, chars',
            tagName: 'span'
        })

        gsap.from('.text-anim-parent .line', {
            y: '-50%',
            opacity: 0,
            duration: 0.5,
            ease: 'sine.inOut',
            stagger: 0.1,

            scrollTrigger: {
                trigger: '.text-anim-parent',
                start: 'top center',

            }
        })

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
    >
        <div class="max-w-3xl p-4 md:p-8 rounded-lg primary-font">
            <h1 use:textAnimation
                class="text-xl md:text-[1.8rem] font-bold text-[#ff9900] leading-tight"

                style="font-family: Arial">
                Edutainment With A Purpose
            </h1>
            <h2 class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify "

                use:textAnimation>
                Starting at Just ONE Rupee* #ONEderful
                #Go Purple
            </h2>
            <div class="text-anim-parent">
                <h2 class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify line">
                    We are a Conscious OTT Platform committed to produce and promote impactful cinema and content for K
                    to
                    12 schools.
                </h2>
                <h2 class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify line">
                    Aligned with NEP 2020, we specialize in curriculum integration of “Film Pedagogy” to
                    educate, entertain, empower and enthuse school teachers and children.
                </h2>
            </div>
            <p
                    class="text-base md:text-lg text-white/80 mb-4 md:mb-8 text-[#6aa84f] text-justify"

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
            <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
                <button
                        class="animate-button text-base md:text-3xl text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-[#660066]"
                        on:click={handleClick}>
                    #GoPurple
                </button>
            </div>
        </div>
    </div>
</div>
