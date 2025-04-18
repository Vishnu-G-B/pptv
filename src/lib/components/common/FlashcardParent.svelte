<!-- App.svelte -->
<script>
    import Flashcard from './Flashcard.svelte';
    import {onMount} from 'svelte';
    import img1 from "$lib/assets/images/1_PPL OTT.jpg";
    import img2 from "$lib/assets/images/2B_KAB.png";
    import img6 from "$lib/assets/images/3_ECA TV.png";
    import img4 from "$lib/assets/images/5_School Studio.png";
    import img5 from "$lib/assets/images/6_Gullak.png";
    import img3 from "$lib/assets/images/2_KAB.png";
    import {gsap} from "gsap/dist/gsap";

    let mounted = false;
    let headerTimeline;


    let componentData = [
        {
            word: "A Conscious OTT platform streaming impactful and educational content Starting @ Just ONE Rupee.",
            title: "PURPLE PEOPLE LABS",
            image: img1,
        },
        {
            word: "A filmmaking festival for children  amplifying young voices from rural and urban communities across India.",
            title: "YOUNG INDIA FILMMAKERS",
            image: img2,
        },
        {
            word: "Community Filmmaking Tours to villages, artisans, start-ups & changemakers across India capturing real stories on reel.",
            title: "KIDDING AROUND BHARAT",
            image: img3
        },
        {
            word: "offering 4",
            title: "THE PROJECT GULLAK",
            image: img4
        },
        {
            word: "A capacity building program for the Ministry Of Education’s PM eVIDYA initiative including studio design, teacher training and co-production of curriculum based content in regional languages.",
            title: "PM eVIDYA SCHOOL STUDIO",
            image: img5
        },
        {
            word: "offering 6",
            title: "ECA-APER TV",
            image: img6
        }
    ];

    function initHeaderTimeline() {
        gsap.set(".movingHeader", {y: "0%"});
        gsap.set(".movingHeader2", {y: "100%"});

        headerTimeline = gsap.timeline({repeat: -1});
        headerTimeline
            .to(".movingHeader", {
                y: "-100%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
                delay: 1,
            })
            .to(".movingHeader2", {
                y: "0%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
            }, "<")
            .to(".movingHeader", {
                y: "0%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
                delay: 1,
            })
            .to(".movingHeader2", {
                y: "100%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
            }, "<");
    }

    onMount(() => {
        initHeaderTimeline();
        setTimeout(() => {
            mounted = true;
        }, 100);
    });
</script>

<div class="headingDiv sticky top-1/2 left-1/2 transform-gpu  -translate-y-1/2 text-center
                h-screen w-full z-[0] flex flex-col justify-center items-center gap-0 capitalize
                xl:text-8xl 2xl:text-9xl brand-font font-bold text-brand-orange italic">
    <span class="capitalize">OUR</span>
    <div class="m-0 p-0 -tracking-[0.13em] h-[130px] w-full flex flex-col justify-center items-center
                    relative overflow-hidden">
        <div class="movingHeaderContainer absolute text-brand-green">
            <span class="movingHeader -mr-4">A</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">-</span>
            <span class="movingHeader">f</span>
            <span class="movingHeader">f</span>
            <span class="movingHeader">e</span>
            <span class="movingHeader">r</span>
            <span class="movingHeader">i</span>
            <span class="movingHeader">n</span>
            <span class="movingHeader">g</span>
            <span class="movingHeader">s</span>
        </div>
        <div class="movingHeaderContainer2 absolute text-primary">
            <span class="movingHeader2 -mr-4">A</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">-</span>
            <span class="movingHeader2">f</span>
            <span class="movingHeader2">f</span>
            <span class="movingHeader2">e</span>
            <span class="movingHeader2">r</span>
            <span class="movingHeader2">i</span>
            <span class="movingHeader2">n</span>
            <span class="movingHeader2">g</span>
            <span class="movingHeader2">s</span>
        </div>
    </div>
</div>


<div class="min-h-[110vh] bg-[#f3f3e7] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div class="max-w-full mx-auto">
        <div class="relative">
            <div class="flex flex-wrap justify-center z-10">
                {#each componentData.slice(0, 6) as card, i}
                    <div
                            class="transform transition-all duration-700 ease-in-out m-4 md:m-6 lg:m-8">
                        <Flashcard imgsrc={card.image} answer={card.word} title={card.title}/>
                    </div>
                {/each}
            </div>

            <div class="absolute -top-10 -left-10 w-32 h-32 bg-[#6aa84f] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div class="absolute top-0 -right-4 w-36 h-36 bg-[#ff9900] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-24 left-0 w-36 h-36 bg-[#660066] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 z-0"></div>
        </div>
    </div>
</div>

<style>
    @keyframes blob {
        0% {
            transform: translate(0px, 0px) scale(1);
        }
        33% {
            transform: translate(30px, -30px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
            transform: translate(0px, 0px) scale(1);
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }

    .animation-delay-4000 {
        animation-delay: 4s;
    }
</style>