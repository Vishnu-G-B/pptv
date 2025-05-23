<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";
    import {textAnimation} from "$lib/animations/textSplit.js";
    import bgImg from "$lib/assets/images/bgImg.jpg";

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let cardContent = [
        {
            title: "A Teacher's Journey of stories",
            text: "Founded by Shweta Parakh, a teacher, filmmaker and entrepreneur who travelled across India with a film school in her bag to mentor and capture children’s perspective of the world on life, love, relationships, aspirations, hope and little things that matter to our hearts!"
        },
        {
            title: "Education through the lens",
            text: "PPL has been on a transformative journey across India since 2012, mentoring kids aged 6 to 18 and teachers, empowering them to amplify their voice, dreams and aspirations through the most powerful skill of storytelling-FILMMAKING."
        },
        {
            title: "A Mentor-Student Startup",
            text: "Co-founded by Kriti Gandhi, a Hong Kong based journalist, with a keen interest in capturing impactful stories of real life heroes, Kriti aligned with the soul of Purple People Labs, just like Shivain Arora & Krishnam Gupta who walked in as young filmmakers & grew as a family."
        },
        {
            title: "Make a film, Make A Difference",
            text: "Every subscription contributes to free filmmaking workshops in rural areas, grants for urban school filmmakers & social impact projects for all we do at Purple People Labs."
        }
    ];

    onMount(() => {
        const path = document.querySelector("#path");
        cardContent.forEach((_, index) => {
            gsap.set(`#card-${index}`, {
                motionPath: {
                    path: path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                    start: 1,
                    end: 1
                }
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
                motionPath: {
                    path: path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    start: 1,
                    end: 0,
                    autoRotate: false
                },
                scale: 0.8,
                opacity: 0,
                ease: "none"
            });
            cardTl.to(`#card-${index + 1}`, {
                rotateX: 0,
                ease: "none",
            }, "<");
        });
    });
</script>

<div class="MainContainer bg-[#f6f5ec] h-fit w-full relative">
    <div class="bgimgcontainer hidden sm:block h-screen w-full sticky top-0 z-10 transform overflow-hidden">
        <img src="{bgImg}" alt="filling background" class="object-contain sm:object-cover w-full h-full">
    </div>

    <div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative md:-mt-[90vh]">
        <div class="w-full text-center flex justify-center items-center md:justify-end md:items-start
                    sticky top-20 md:top-20 z-20 md:pr-8 md:pt-4">
            <div
                    use:textAnimation
                    class="text-center text-5xl capitalize font-bold z-20 leading-tight"
                    style="font-family: Arial"
            >
                <span class="text-primary font-fancy text-6xl font-extralight block">What makes us</span>
                <span class="text-brand-orange block">WOW!</span>
            </div>
        </div>

        <div class="interCard w-[90%] max-w-[500px] sticky top-[40%] md:top-[20%]
            mx-auto md:ml-auto md:mr-0 z-20 md:pr-8">
            {#each cardContent as item, i}
                <div id="card-{i}" class="card absolute w-[350px] h-[180px] sm:w-[480px] sm:h-[245px]
                        bg-background border-2 border-surface p-5 sm:p-8 rounded-2xl shadow-[0_0_10px_rgba(102,0,102,0.1)]"
                     style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);">
                    <div class="flex flex-col justify-center items-start text-center w-full h-full">
                        <h3 use:textAnimation
                            class="text-base sm:text-xl font-bold text-brand-orange mb-1 text-left capitalize">
                            {item.title}
                        </h3>
                        <p class="text-brand-green text-left text-xs sm:text-base font-bold large-animation-3">
                            {item.text}
                        </p>
                    </div>
                </div>
            {/each}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-[48%] md:-translate-x-0 -translate-y-1/2
                        md:left-auto md:right-8 md:top-0
                        z-50 opacity-0 w-full max-w-[500px] h-[450px]">
                <svg
                        viewBox="0 -50 500 450"
                        preserveAspectRatio="xMidYMid meet"
                        class="w-full h-full"
                >
                    <path
                            id="path"
                            d="M 168 -27 Q 255 117 242 374"
                            stroke="#000000"
                            stroke-width="1"
                            fill="none"
                    />
                </svg>
            </div>
        </div>
    </div>
</div>