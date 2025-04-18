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
            class="absolute inset-0 flex items-center justify-start z-10 mb-4"
    >
        <div class="p-2 md:p-8 rounded-lg flex flex-col w-[60%]">
            <h1
                    class="text-4xl font-bold text-[#ff9900]"

                    style="font-family: Arial">
                Edutainment With A Purpose
            </h1>
            <h2 class="text-2xl text-white/90 mb-4"
            >
                Watch Impactful Films <span class="text-brand-green font-extrabold">Starting @ONE Rupee </span>

            </h2>
            <div class="text-white/90 text-left text-xl mb-4">
                We are a Conscious OTT Platform committed to produce and promote impactful cinema.
            </div>
            <div class="text-white/90 text-left text-xl">
                Our film and media skills curriculum empower schools, teachers and 6 to 18 year old children to explore
                the power of digital storytelling to change the world, one film at a time! #GoPurple
            </div>
<!--            <div class="flex flex-col sm:flex-row gap-2 md:gap-4 mt-4">-->
            <!--                <button-->
            <!--                        class="animate-button text-base md:text-2xl text-white px-4 md:px-6 py-2 md:py-3 rounded-xl-->
            <!--                                font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-primary-->
            <!--                                text-center uppercase"-->
            <!--                        on:click={handleClick}>-->
            <!--                    Subscribe-->
            <!--                </button>-->
            <!--            </div>-->
        </div>
    </div>
</div>
