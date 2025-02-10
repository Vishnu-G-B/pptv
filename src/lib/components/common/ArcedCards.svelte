<!--<script>-->
<!--    import {onMount} from "svelte";-->
<!--    import {gsap} from "gsap/dist/gsap";-->
<!--    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";-->
<!--    import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";-->

<!--    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);-->

<!--    let cardContent = [-->
<!--        {-->
<!--            title: "Conscious OTT Platform",-->
<!--            text: "We promote and stream impactful cinema and quality educational content aligned with NEP 2020 to support the PM eVIDYA initiative. Each Film also has activity- based learning modules."-->
<!--        },-->
<!--        {-->
<!--            title: "Feature Your Film",-->
<!--            text: "Learn filmmaking from industry mentors and feature your film for a larger cause! You can embark on a filmmaking tour or join our digital film festival project."-->
<!--        },-->
<!--        {-->
<!--            title: "Children’s Perspective",-->
<!--            text: "Watch inspiring films made by young minds (ages 6-18) that provide a fresh, children’s perspective on how they perceive the world around them."-->
<!--        },-->
<!--        {-->
<!--            title: "Make A Difference",-->
<!--            text: "Every subscription contributes to free filmmaking workshops in rural areas, grants for urban school filmmakers & social impact projects."-->
<!--        }-->
<!--    ];-->

<!--    onMount(() => {-->
<!--        const path = document.querySelector("#path");-->

<!--        cardContent.forEach((_, index) => {-->
<!--            gsap.set(`#card-${index}`, {-->
<!--                motionPath: {-->
<!--                    path: path,-->
<!--                    align: path,-->
<!--                    alignOrigin: [0.5, 0.5],-->
<!--                    autoRotate: false,-->
<!--                    start: 1,-->
<!--                    end: 1-->
<!--                }-->
<!--            });-->

<!--            const cardTl = gsap.timeline({-->
<!--                scrollTrigger: {-->
<!--                    trigger: ".cardContainer",-->
<!--                    start: `top+=${index * 25}% top`,-->
<!--                    end: `+=${window.innerHeight}`,-->
<!--                    scrub: 1,-->
<!--                    id: `card-${index}-timeline`,-->
<!--                }-->
<!--            });-->

<!--            cardTl.to(`#card-${index}`, {-->
<!--                motionPath: {-->
<!--                    path: path,-->
<!--                    align: path,-->
<!--                    alignOrigin: [0.5, 0.5],-->
<!--                    start: 1,-->
<!--                    end: 0,-->
<!--                    autoRotate: false,-->
<!--                },-->
<!--                scale: 0.8,-->
<!--                opacity: 0,-->
<!--                ease: "none",-->
<!--            });-->
<!--        });-->
<!--    });-->
<!--</script>-->

<!--<div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative">-->
<!--    &lt;!&ndash; Header section remains unchanged &ndash;&gt;-->
<!--    <div class="h-[50vh] w-full text-center flex justify-center items-center sticky top-0">-->
<!--        <div class="text-center text-5xl capitalize font-bold text-primary" style="font-family: Arial">-->
<!--            What makes us WOW!-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="interCard w-full sm:w-[500px] sticky top-1/2 sm:mx-auto transform -translate-y-[6rem]">-->
<!--        {#each cardContent as item, i}-->
<!--            <div id="card-{i}"-->
<!--                 class="card absolute w-[345px] h-[125px] sm:w-[480px] sm:h-[245px] bg-[#181818] border border-[#555] sm:p-10 rounded-2xl-->
<!--                        shadow-[0_0_10px_rgba(255,255,255,0.1)] px-8 py-20"-->
<!--                 style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);">-->
<!--                <div class="flex flex-col justify-center items-start text-center w-full h-full ">-->
<!--                    <h3 class="text-lg sm:text-xl font-semibold text-pink-500 mb-3 text-left">{item.title}</h3>-->
<!--                    <p class="text-gray-300 text-left text-sm">{item.text}</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        {/each}-->

<!--        <div class="w-full h-[400px] sm:h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-100">-->
<!--            <svg width="100%" height="100%" viewBox="160 -30 100 410" preserveAspectRatio="xMidYMid meet">-->
<!--                <path id="path"-->
<!--                      d="M 168 -27 Q 255 117 242 374"-->
<!--                      stroke="#000000" stroke-width="1" fill="none"-->
<!--                />-->
<!--            </svg>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->


<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let cardContent = [
        {
            title: "Conscious OTT Platform",
            text: "We promote and stream impactful cinema and quality educational content aligned with NEP 2020 to support the PM eVIDYA initiative. Each Film also has activity-based learning modules."
        },
        {
            title: "Feature Your Film",
            text: "Learn filmmaking from industry mentors and feature your film for a larger cause! You can embark on a filmmaking tour or join our digital film festival project."
        },
        {
            title: "Children’s Perspective",
            text: "Watch inspiring films made by young minds (ages 6-18) that provide a fresh, children’s perspective on how they perceive the world around them."
        },
        {
            title: "Make A Difference",
            text: "Every subscription contributes to free filmmaking workshops in rural areas, grants for urban school filmmakers & social impact projects."
        }
    ];

    onMount(() => {
        const path = document.querySelector("#path");

        cardContent.forEach((_, index) => {
            // Set the starting point for each card along the motion path
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

            // Create the timeline for each card with scroll trigger
            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cardContainer",
                    start: `top+=${index * 25}% top`,
                    end: `+=${window.innerHeight}`,
                    scrub: 1,
                    id: `card-${index}-timeline`
                }
            });

            // Animate the card along the motion path on scroll
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
        });
    });
</script>

<!-- Main container -->
<div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative">
    <!-- Header / Spacer -->
    <div class="h-[50vh] w-full text-center flex justify-center items-center sticky top-0">
        <div class="text-center text-5xl capitalize font-bold text-primary" style="font-family: Arial">
            What makes us WOW!
        </div>
    </div>

    <!-- Card container and SVG path -->
    <div class="interCard w-[90%] max-w-[500px] sticky top-1/2 mx-auto transform -translate-y-[6rem]">
        {#each cardContent as item, i}
            <div id="card-{i}"
                 class="card absolute w-[345px] h-[125px] sm:w-[480px] sm:h-[245px]
                 bg-background border-2 border-surface
                 sm:p-10 rounded-2xl
            shadow-[0_0_10px_rgba(102,0,102,0.1)] px-8 py-20"
                 style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);">
                <div class="flex flex-col justify-center items-start text-center w-full h-full">
                    <h3 class="text-lg sm:text-2xl font-bold text-brand-orange mb-3 text-left uppercase">{item.title}</h3>
                    <p class="text-primary text-left text-sm font-bold">{item.text}</p>
                </div>
            </div>
        {/each}

        <!-- Updated SVG container -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-0 w-full max-w-[500px] h-[450px]
                   ml-2 sm:ml-0">
            <svg
                    viewBox="0 -50 500 450"
                    preserveAspectRatio="xMidYMid meet"
                    class="w-full h-full">
                <path id="path"
                      d="M 168 -27 Q 255 117 242 374"
                      stroke="#000000"
                      stroke-width="1"
                      fill="none"/>
            </svg>
        </div>
    </div>
</div>
