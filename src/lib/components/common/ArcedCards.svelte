<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin";

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let cardContent = [
        {
            title: "Conscious OTT Platform",
            text: "We promote and stream impactful cinema and quality educational content aligned with NEP 2020 to support the PM eVIDYA initiative. Each Film also has activity- based learning modules."
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
                    id: `card-${index}-timeline`,
                }
            });

            cardTl.to(`#card-${index}`, {
                motionPath: {
                    path: path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    start: 1,
                    end: 0,
                    autoRotate: false,
                },
                scale: 0.8,
                opacity: 0,
                ease: "none",
            });
        });
    });
</script>

<div class="cardContainer bg-[#f6f5ec] h-[400vh] w-full relative">
    <!-- Added a spacer div to push content below the cards -->
    <div class="h-[50vh] w-full  text-center flex justify-center items-center">
        <div class="text-center text-5xl capitalize font-bold text-primary" style="font-family: Arial">
            What makes us WOW!
        </div>
    </div>

    <div class="interCard w-[500px] sticky top-1/2 mx-auto transform -translate-y-[6rem]">
        {#each cardContent as item, i}
            <div id="card-{i}"
                 class="card absolute w-[480px] h-[245px] bg-[#181818] border border-[#555] p-10 rounded-2xl
                        shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                 style="z-index: {3 - i}; transform: translate(-50%, -50%) rotate({i * 2}deg);">
                <div class="flex flex-col justify-center items-start text-center w-full h-full">
                    <h3 class="text-xl font-semibold text-pink-500 mb-3 text-left">{item.title}</h3>
                    <p class="text-gray-300 text-left">{item.text}</p>
                </div>
            </div>
        {/each}
        <svg width="450" height="450"
             class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-0">
            <path id="path"
                  d="M 168 -27 Q 255 117 242 374"
                  stroke="#FFFFFF" stroke-width="1" fill="none"
            />
        </svg>
    </div>
</div>