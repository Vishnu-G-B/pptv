<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import mygovlogo from '$lib/assets/images/mygovlogo.png';
    import temp4 from '$lib/assets/images/Pragya Bodhini.webp';
    import year75logo from "$lib/assets/images/Azadi-Ka-Amrit-Mahotsav-Logo.png";
    import projectGulak from "$lib/assets/images/gullakv2.jpg";
    import ADimg from "$lib/assets/images/placeimg.webp";
    import ecaaperlogo from "$lib/assets/images/eca-aper-logo-2024.png"
    import laurels from "$lib/assets/images/filmfestivalsleaves.png"

    let sectionRef;
    gsap.registerPlugin(ScrollTrigger)

    function formatNumber(num) {
        const x = num.toString();
        if (x.length <= 3) return x;
        const lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return formattedOther + ',' + lastThree;
    }

    // Collection of containers for video scaling
    let videoContainers = [];
    const videoRatio = 16 / 9;
    let scaleValues = {};

    onMount(() => {
        const boxes = sectionRef.querySelectorAll('.metric-box');

        // Set up the resize observer for all video containers
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const container = entry.target;
                const containerId = container.dataset.containerId;
                const cw = entry.contentRect.width;
                const ch = entry.contentRect.height;
                scaleValues[containerId] = Math.max(ch * videoRatio / cw, cw / (ch * videoRatio));
            }
        });

        // Observe all video containers
        videoContainers.forEach(container => {
            if (container) observer.observe(container);
        });

        boxes.forEach((box) => {
            const numberElement = box.querySelector('.number');
            if (numberElement) {
                const endValue = parseInt(numberElement.dataset.value.replace(/,/g, ''));
                gsap.fromTo(numberElement, {
                    innerText: 0
                }, {
                    innerText: endValue,
                    duration: 2,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top center+=350",
                    },
                    snap: {innerText: 1},
                    onUpdate: function () {
                        numberElement.innerHTML = formatNumber(Math.ceil(this.targets()[0].innerText)) + "+";
                    }
                });
            }
        });

        gsap.fromTo(boxes, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef,
                start: "top center+=100",
            }
        });
    });
</script>

<section bind:this={sectionRef} class="h-fit w-full bg-background p-2 sm:p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9
                grid-rows-auto
                sm:grid-rows-[repeat(6,minmax(250px,auto))]
                lg:grid-rows-[repeat(13,minmax(50px,auto))]
                gap-4">

        <div class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-2 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-3
                    bg-gray-50 rounded-2xl p-4 relative overflow-hidden">
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <img src="{ADimg}" alt="Background" class="w-full h-full object-fill rounded-2xl"/>
            </div>
            <div class="relative z-10 flex flex-row-reverse items-center justify-center h-full w-full p-4 gap-4">

            </div>
        </div>

        <div
                bind:this={videoContainers[0]}
                data-container-id="video1"
                class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-1 lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-4
                    bg-gray-50 rounded-2xl p-4 relative overflow-hidden">
            <iframe
                    class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 rounded-2xl pointer-events-none p-0 m-0"
                    style="transform: translate(-50%, -50%) scale({scaleValues['video1'] || 1});"
                    src="https://player.vimeo.com/video/1072992217?h=263d515145&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
                    title="YIF Video"
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
            >
            </iframe>
            <div class="absolute inset-0 bg-surface/40 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-brand-orange">
                <span class="number text-6xl sm:text-[5vw] lg:text-[3vw] font-bold font-stint text-brand-orange"
                      data-value="300000">300000</span>
                <p class="text-white mt-2 text-base sm:text-[2.3vw] lg:text-[1.2vw] font-karla uppercase font-bold">
                    Young Filmmakers Inspired
                </p>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-center items-center
                    col-span-1 sm:col-span-1 lg:col-start-4 lg:col-span-3 lg:row-start-4 lg:row-span-2
                    bg-gray-50 border-2 border-surface rounded-2xl p-4">
            <div class="flex flex-row justify-around items-center w-full mb-4">
                <div class="h-20 sm:h-20 w-fit bg-gray-50 rounded-lg mx-1">
                    <img src={year75logo} alt="Government of India Logo" class="object-contain h-full w-auto"/>
                </div>
                <div class="h-20 sm:h-20 w-fit bg-gray-50 rounded-lg mx-1">
                    <img src={mygovlogo} alt="Government of India Logo" class="h-full w-auto rounded-tr-2xl"/>
                </div>
            </div>
            <p class="w-full text-black text-base sm:text-[2.3vw] lg:text-[1.2vw] text-center font-karla uppercase font-bold">
                Recognized By the Government Of India @75 Ideas
            </p>
        </div>
        <div class="metric-box flex flex-col justify-end items-start lg:h-[175px]
                    col-span-1 sm:col-span-1 lg:col-start-4 lg:col-span-3 lg:row-start-6 lg:row-span-2
                    bg-surface border-2 border-black rounded-2xl px-4 py-8 relative">
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <img src="{projectGulak}" alt="Background" class="w-full h-full object-cover rounded-2xl"/>
                <div class="absolute inset-0 bg-primary/60 rounded-2xl"></div>
            </div>
            <div class="relative z-10 sm:-mb-4">
                <div class="flex flex-col sm:flex-row items-start sm:items-end sm:justify-start gap-2 -mb-2">
                    <span class="number text-orange-400 text-6xl sm:text-[5vw] lg:text-[3vw] font-stint font-bold"
                          data-value="11">
                        11
                    </span>
                    <span class="text-brand-orange text-3xl sm:text-[3vw] lg:text-[2vw] font-stint font-bold">
                        Community Projects
                    </span>
                </div>
                <p class="mt-2 text-white text-base sm:text-[2.3vw] lg:text-[1.2vw] font-karla uppercase font-bold">
                    Films connecting villages to the world
                </p>
            </div>
        </div>

        <div
                bind:this={videoContainers[1]}
                data-container-id="video2"
                class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-1 lg:col-start-7 lg:col-span-3 lg:row-start-5 lg:row-span-4
                    bg-gray-50 border-2 border-surface rounded-2xl p-2 relative overflow-hidden">
            <iframe
                    class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 rounded-2xl pointer-events-none p-0 m-0"
                    style="transform: translate(-50%, -50%) scale({scaleValues['video2'] || 1});"
                    src="https://player.vimeo.com/video/1072992165?h=aafe6442f4&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
                    title="Teacher Training Video"
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
            >
            </iframe>
            <div class="absolute inset-0 bg-primary/60 rounded-2xl"></div>
            <div class="relative z-10 text-brand-orange w-full">
                <div class="h-fit flex flex-col sm:flex-row items-start sm:items-end gap-2">
                    <p class="number text-6xl sm:text-[5vw] lg:text-[3vw] font-bold font-stint align-baseline"
                       data-value="5000">5,000
                    </p>
                    <p class="text-3xl sm:text-[3vw] lg:text-[2vw] font-stint font-bold tracking-tighter align-baseline">
                        Teachers&nbsp;Trained
                    </p>
                </div>
                <p class="text-white mt-2 text-base sm:text-[2.3vw] lg:text-[1.3vw] font-karla uppercase font-bold">
                    Blending Film Pedagogy & Academics
                </p>
            </div>
        </div>

        <div
                bind:this={videoContainers[2]}
                data-container-id="video3"
                class="metric-box flex flex-col justify-center items-center
                    col-span-1 sm:col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-4 lg:row-span-4
                    bg-gray-50 rounded-2xl relative overflow-hidden">
            <iframe
                    class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 rounded-2xl pointer-events-none p-0 m-0"
                    style="transform: translate(-50%, -50%) scale({scaleValues['video3'] || 1});"
                    src="https://player.vimeo.com/video/1072991962?h=1f85de6838&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
                    title="LAHDC Video"
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
            >
            </iframe>
            <div class="absolute inset-0 bg-surface/30 z-[1] rounded-2xl"></div>
            <div class="relative z-10 flex flex-col items-start justify-end h-full w-full p-4">
                <p class="text-brand-orange text-3xl sm:text-[3vw] lg:text-[2.5vw] text-center sm:text-left font-karla font-bold">
                    PM eVIDYA School Studio
                </p>
                <p class="text-white -mt-1 lg:mt-2 text-lg sm:text-[3vw] lg:text-[1.5vw] text-center font-karla uppercase font-bold">
                    LAHDC, Leh Collaboration
                </p>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-1 lg:col-start-1 lg:col-span-3 lg:row-start-8 lg:row-span-2
                    bg-gray-50 border-2 border-black rounded-2xl px-4 py-3 relative">
            <div class="flex flex-col gap-10 sm:gap-0 sm:flex-row items-center justify-center w-full h-full z-10 relative">
                <div class="number text-orange-400 text-6xl sm:text-[5vw] lg:text-[4vw] font-stint font-bold sm:-ml-1
                            w-full sm:w-1/2 flex justify-center items-center text-center"
                     data-value="65">
                    65
                </div>
                <img class="object-cover w-3/4 sm:w-1/2 h-auto absolute top-0 left-1/2 sm:left-0 transform-gpu -translate-x-[54%] sm:-translate-x-3"
                     src="{laurels}" alt="leaves">
                <div class="text-surface text-3xl sm:text-[3vw] lg:text-[1.7vw] font-stint font-bold uppercase
                            w-full text-center sm:text-left sm:w-1/2">
                    International Film Festivals
                </div>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                   col-span-1 sm:col-span-1 lg:col-start-4 lg:col-span-3 lg:row-start-8 lg:row-span-2
                   bg-gray-50 border-2 border-black rounded-2xl relative p-2">
            <div class="flex flex-col sm:flex-row justify-center items-center h-full w-full gap-2">
                <div class="h-full sm:h-28 w-full sm:w-1/2 bg-gray-50 rounded-lg ml-4">
                    <img src={ecaaperlogo} alt="Government of India Logo"
                         class="object-contain h-full w-auto"/>
                </div>
                <div class="text-black text-2xl w-full sm:w-1/2 sm:text-[2.3vw] md:text-[1vw] lg:text-[1.1vw]
                            text-center font-karla uppercase font-bold p-1 leading-tight">
                    conferred award <br/>in film pedagogy
                </div>
            </div>

        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-2 lg:col-start-1 lg:col-span-6 lg:row-start-10 lg:row-span-4
                    bg-gray-50 rounded-2xl p-4 relative overflow-hidden">
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <img src="{temp4}" alt="Background" class="w-full h-full object-cover rounded-2xl"/>
                <div class="absolute inset-0 bg-primary/60 rounded-2xl"></div>
            </div>
            <div class="relative z-10">
                <div class="flex flex-col sm:flex-row items-start sm:items-end sm:justify-start gap-2">
                    <span class="number text-orange-400 text-6xl sm:text-[5vw] lg:text-[3vw] font-stint font-bold"
                          data-value="25">
                        25
                    </span>
                    <span class="text-brand-orange text-3xl sm:text-[3vw] lg:text-[2.5vw] font-stint font-bold">
                        Crore School Going Children
                    </span>
                </div>
                <p class="mt-2 text-white text-base sm:text-[1.7vw] lg:text-[1.08vw] xl:text-[1vw] font-karla uppercase font-bold">
                    <span class="text-brand-orange">Mission</span> Quality educational
                    content made affordable for Ministry Of Education's PM eVIDYA initiative
                </p>
            </div>

        </div>

        <div
                bind:this={videoContainers[3]}
                data-container-id="video4"
                class="metric-box flex flex-col justify-end items-start
                    col-span-1 sm:col-span-1 sm:col-start-2 sm:row-start-4 lg:col-start-7 lg:col-span-3 lg:row-start-9 lg:row-span-5
                    bg-gray-50 border-2 border-surface rounded-2xl p-4 relative overflow-hidden">
            <iframe
                    class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 rounded-2xl pointer-events-none p-0 m-0"
                    style="transform: translate(-50%, -50%) scale({scaleValues['video4'] || 1});"
                    src="https://player.vimeo.com/video/1072992017?h=ec1524e950&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
                    title="Placeholder Video"
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
            >
            </iframe>
            <div class="absolute inset-0 bg-surface/30 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-brand-orange">
                <div class="flex flex-col sm:flex-row items-start sm:items-end gap-2">
                    <span class="number text-6xl sm:text-[5vw] lg:text-[3vw] font-bold font-stint text-brand-orange"
                          data-value="21">21</span>
                    <span class="text-3xl sm:text-[3vw] lg:text-[1.8vw] font-stint font-bold">
                        Global Awards
                    </span>
                </div>
                <p class="text-white mt-2 text-base sm:text-[2.3vw] lg:text-[1.2vw] font-karla uppercase font-bold">
                    Infinite Accolades and love
                </p>
            </div>
        </div>

    </div>
</section>

<style>
    @media (max-width: 640px) {
        .metric-box {
            min-height: 300px;
        }
    }
</style>