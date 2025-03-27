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
            title: "Conscious OTT Platform",
            text: "We promote and stream impactful cinema and quality educational content aligned with NEP 2020 to support the PM eVIDYA initiative. Each Film also has activity-based learning modules. #GoPurple"
        },
        {
            title: "Feature Your Film",
            text: "Learn filmmaking from industry mentors and feature your film for a larger cause! You can embark on a filmmaking tour at Kidding Around Bharat or Join India’s largest Student Film Festival at Young India Filmmakers"
        },
        {
            title: "Children’s Perspective",
            text: "Watch quality content relevant for teachers and parents to empower our children in their early years and preparatory years. Our collaboration with ECA-APER coming soon."
        },
        {
            title: "Make A Difference",
            text: "Every subscription contributes to free filmmaking workshops in rural areas, grants for urban school filmmakers & social impact projects and all we do at SWADESHPLEX"
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

    <div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative -mt-[90vh]">
        <div class="w-full text-center flex justify-center items-center md:justify-end md:items-start
                    sticky top-0 md:top-20 z-20 md:pr-8 md:pt-4">
            <div
                    use:textAnimation
                    class="text-center text-5xl capitalize font-bold z-20 leading-tight"
                    style="font-family: Arial"
            >
                <span class="text-primary font-fancy text-6xl font-extralight block">What makes us</span>
                <span class="text-brand-orange block">WOW!</span>
            </div>
        </div>

        <div class="interCard w-[90%] max-w-[500px] sticky top-[20%] md:top-[20%]
            mx-auto md:ml-auto md:mr-0 z-20 md:pr-8">
            {#each cardContent as item, i}
                <div
                        id="card-{i}"
                        class="card absolute w-[400px] h-[200px] sm:w-[480px] sm:h-[245px]
                           bg-background border-2 border-surface
                           p-5 sm:p-10 rounded-2xl
                           shadow-[0_0_10px_rgba(102,0,102,0.1)]"
                        style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);"
                >
                    <div class="flex flex-col justify-center items-start text-center w-full h-full">
                        <h3
                                use:textAnimation
                                class="text-lg sm:text-2xl font-bold text-brand-orange mb-3 text-left uppercase"
                        >
                            {item.title}
                        </h3>
                        <p class="text-brand-green text-left text-sm sm:text-lg font-bold large-animation-3">
                            {item.text}
                        </p>
                    </div>
                </div>
            {/each}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-x-0 -translate-y-1/2
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