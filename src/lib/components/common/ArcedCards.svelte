<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";
    import {textAnimation} from "$lib/animations/textSplit.js";
    import bgImg from "$lib/assets/images/bgImg.jpg";
    import { openWow } from '$lib/stores/modalStore.js';

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let cardContent = [
        {
            title: "Why We Started",
            text: "To support the PM eVidya mission — affordable access to quality educational content for 25 crore school going children in India. With over 15 lakh schools in India, and less than 0.02% of cinema created specifically for children, we see filmmaking as a vital tool for education, communication and social impact."
        },
        {
            title: "What We Do",
            text: "Established in 2012, we design an all integrated Film Pedagogy program for K to 12 schools including Film & Media Curriculum, Content Creator Labs, Content IP Design, Teacher Training, Social Impact Campaigns & International Film Festivals — By Children, For Children."
        },
        {
            title: "Who We Are",
            text: "We are a growing crew of educators, filmmakers, philanthropists, journalists, artists, techies, lawyers... children at heart. Purple is a color of creativity and wisdom. We are proudly a family of 'purple people', here to make a difference for children through film & media skills education and impactful cinema."
        }
    ];

    onMount(() => {
        const path = document.querySelector("#path");
        cardContent.forEach((_, index) => {
            gsap.set(`#card-${index}`, {
                motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false, start: 1, end: 1 }
            });

            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cardContainer",
                    start: `top+=${index * 25}% top`,
                    end: `+=${window.innerHeight}`,
                    scrub: 1,
                    id: `card-${index}-timeline`
                }
            });

            cardTl.to(`#card-${index}`, {
                motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 1, end: 0, autoRotate: false },
                scale: 0.8, opacity: 0, ease: "none"
            });
            cardTl.to(`#card-${index + 1}`, { rotateX: 0, ease: "none" }, "<");
        });
    });
</script>

<div class="MainContainer bg-[#f6f5ec] h-fit w-full relative">
    <div class="bgimgcontainer hidden sm:block h-screen w-full sticky top-0 z-10 transform overflow-hidden">
        <img src="{bgImg}" alt="filling background" class="object-contain sm:object-cover w-full h-full">
    </div>

    <div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative md:-mt-[90vh]">
        <!-- Heading + stats + Know More -->
        <div class="w-full text-center flex flex-col justify-start items-center md:items-end
                    sticky top-20 md:top-20 z-20 md:pr-8 md:pt-4 gap-3">
            <div class="bg-background/85 backdrop-blur-sm rounded-2xl px-5 py-3 flex flex-col items-center md:items-end gap-3">
                <div use:textAnimation
                     class="text-center md:text-right text-5xl capitalize font-bold z-20 leading-tight"
                     style="font-family: Arial">
                    <span class="text-primary font-fancy text-6xl font-extralight block">What makes us</span>
                    <span class="text-brand-orange block">WOW!</span>
                </div>
                <!-- Stats -->
                <div class="flex flex-row flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                    <div class="flex flex-col items-center">
                        <span class="text-2xl md:text-3xl font-bold text-primary">300+</span>
                        <span class="text-xs md:text-sm text-surface text-center">Films By Children</span>
                    </div>
                    <div class="hidden sm:block w-px bg-on-surface/20"></div>
                    <div class="flex flex-col items-center">
                        <span class="text-2xl md:text-3xl font-bold text-primary">75+</span>
                        <span class="text-xs md:text-sm text-surface text-center">International Screenings</span>
                    </div>
                    <div class="hidden sm:block w-px bg-on-surface/20"></div>
                    <div class="flex flex-col items-center">
                        <span class="text-2xl md:text-3xl font-bold text-brand-orange">∞</span>
                        <span class="text-xs md:text-sm text-surface text-center">Impact &amp; Love</span>
                    </div>
                </div>
                <!-- Know More -->
                <button on:click={openWow}
                    class="self-start flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest
                           hover:text-brand-orange transition-colors duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
                    </svg>
                    Know More
                </button>
            </div>
        </div>

        <!-- Cards — bigger text -->
        <div class="interCard w-[90%] max-w-[500px] sticky top-[40%] md:top-[20%] mx-auto md:ml-auto md:mr-0 z-20 md:pr-8">
            {#each cardContent as item, i}
                <div id="card-{i}" class="card absolute w-[340px] h-[200px] sm:w-[500px] sm:h-[270px]
                        bg-background border-2 border-surface p-6 sm:p-10 rounded-2xl shadow-[0_0_10px_rgba(102,0,102,0.1)]"
                     style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);">
                    <div class="flex flex-col justify-center items-start w-full h-full">
                        <h3 use:textAnimation
                            class="text-lg sm:text-2xl font-bold text-brand-orange mb-2 text-left capitalize">
                            {item.title}
                        </h3>
                        <p class="text-brand-green text-left text-sm sm:text-base font-semibold leading-snug">
                            {item.text}
                        </p>
                    </div>
                </div>
            {/each}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-[48%] md:-translate-x-0 -translate-y-1/2
                        md:left-auto md:right-8 md:top-0
                        z-50 opacity-0 w-full max-w-[500px] h-[450px]">
                <svg viewBox="0 -50 500 450" preserveAspectRatio="xMidYMid meet" class="w-full h-full">
                    <path id="path" d="M 168 -27 Q 255 117 242 374"
                          stroke="#000000" stroke-width="1" fill="none"/>
                </svg>
            </div>
        </div>
    </div>
</div>
