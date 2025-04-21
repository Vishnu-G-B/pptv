<!-- App.svelte -->
<script>
    import Flashcard from './Flashcard.svelte';
    import {onMount} from 'svelte';
    import img1 from "$lib/assets/images/1_PPL OTT.jpg";
    import img2 from "$lib/assets/images/4_YIF.webp";
    import img3 from "$lib/assets/images/6_Gullak.png";
    import img4 from "$lib/assets/images/2_KAB.png";
    import img5 from "$lib/assets/images/3_ECA TV.png";
    import img6 from "$lib/assets/images/2_KAB.png";
    import gsap from "gsap/dist/gsap";

    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import ecatvlogo2 from "$lib/assets/images/ecatv.png";
    import projectGulak from "$lib/assets/images/Project_Gullak_Logo_Final.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import yif_logo from "$lib/assets/images/YIF_logo_final.png";

    let mounted = false;
    let headerTimeline;
    let windowWidth;

    let componentData = [
        {
            word: "A Conscious OTT platform streaming impactful and educational content Starting @ Just ONE Rupee.",
            logosrc: PPLlogo,
            image: img1,
        },
        {
            word: "YIF is a Mentor-Driven Grant, empowering the next-generation of filmmakers guided by the finest artists in the Indian film industry.",
            logosrc: yif_logo,
            image: img2,
        },
        {
            word: "Community Filmmaking Tours to villages, artisans, start-ups  & changemakers across India capturing real stories on reel.",
            logosrc: swadeshplex,
            image: img3
        },
        {
            word: "A CSR filmmaking workshop for children supporting real stories from rural India.",
            logosrc: kiddinglogo,
            image: img4
        },
        {
            word: "offering 5",
            logosrc: ecatvlogo2,
            image: img5
        },
        {
            word: "A capacity building program for the Ministry Of Education’s PM eVIDYA initiative including studio design, teacher training and co-production of curriculum based content in regional languages.",
            logosrc: projectGulak,
            image: img6
        }
    ];

    function initHeaderTimeline() {
        if (headerTimeline) {
            headerTimeline.kill();
        }
        gsap.set(".movingHeader", {y: "0%"});
        gsap.set(".movingHeader2", {y: "100%"});
        headerTimeline = gsap.timeline({repeat: -1});
        headerTimeline
            .to(".movingHeader", {
                y: "-100%", duration: 0.5, stagger: 0.03, ease: "power2.inOut", delay: 1,
            })
            .to(".movingHeader2", {
                y: "0%", duration: 0.5, stagger: 0.03, ease: "power2.inOut",
            }, "<")
            .to(".movingHeader2", {y: "0%", duration: 1})
            .to(".movingHeader", {
                y: "0%", duration: 0.5, stagger: 0.03, ease: "power2.inOut",
            })
            .to(".movingHeader2", {
                y: "100%", duration: 0.5, stagger: 0.03, ease: "power2.inOut",
            }, "<");
    }

    function handleResize() {
        initHeaderTimeline();
    }

    onMount(() => {
        initHeaderTimeline();
        window.addEventListener('resize', handleResize);
        setTimeout(() => {
            mounted = true;
        }, 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (headerTimeline) {
                headerTimeline.kill();
            }
        };
    });
</script>

<svelte:window bind:innerWidth={windowWidth}/>

<div class="headingDiv sticky top-1/2 left-1/2 transform-gpu -translate-y-1/2 text-center
                h-fit w-full z-[0] flex flex-col justify-center items-center gap-0 capitalize
                text-4xl xs:text-5xl sm:text-6xl lg:text-8xl xl:text-9xl brand-font font-bold text-brand-orange italic">
    <span class="capitalize">OUR</span>
    <div class="m-0 p-0 -tracking-[0.05em] w-full flex flex-col justify-center items-center
                relative overflow-hidden"
         style="height: { windowWidth < 375 ? '40px' : windowWidth < 640 ? '50px' : windowWidth < 768 ? '70px' : windowWidth < 1024 ? '60px' : windowWidth < 1280 ? '80px' : '110px'}">
        <div class="movingHeaderContainer absolute text-brand-green w-full flex justify-center">
            <span class="movingHeader inline-block -mr-1 md:-mr-2 lg:-mr-3">A</span>
            <span class="movingHeader inline-block">w</span>
            <span class="movingHeader inline-block">w</span>
            <span class="movingHeader inline-block">w</span>
            <span class="movingHeader inline-block">-</span>
            <span class="movingHeader inline-block">f</span>
            <span class="movingHeader inline-block">f</span>
            <span class="movingHeader inline-block">e</span>
            <span class="movingHeader inline-block">r</span>
            <span class="movingHeader inline-block">i</span>
            <span class="movingHeader inline-block">n</span>
            <span class="movingHeader inline-block">g</span>
            <span class="movingHeader inline-block">s</span>
        </div>
        <div class="movingHeaderContainer2 absolute text-primary w-full flex justify-center">
            <span class="movingHeader2 inline-block -mr-1 md:-mr-2 lg:-mr-3">A</span>
            <span class="movingHeader2 inline-block">w</span>
            <span class="movingHeader2 inline-block">w</span>
            <span class="movingHeader2 inline-block">w</span>
            <span class="movingHeader2 inline-block">-</span>
            <span class="movingHeader2 inline-block">f</span>
            <span class="movingHeader2 inline-block">f</span>
            <span class="movingHeader2 inline-block">e</span>
            <span class="movingHeader2 inline-block">r</span>
            <span class="movingHeader2 inline-block">i</span>
            <span class="movingHeader2 inline-block">n</span>
            <span class="movingHeader2 inline-block">g</span>
            <span class="movingHeader2 inline-block">s</span>
        </div>
    </div>
</div>

<div class="h-fit sm:min-h-screen bg-[#f3f3e7] py-12 px-4 sm:px-6 lg:px-8 mt-20 sm:mt-0">
    <div class="h-full w-full flex flex-wrap justify-center z-10 relative">
        {#each componentData.slice(0, 6) as card, i}
            <div
                    class="h-full w-full sm:w-fit transform transition-all duration-700 ease-in-out m-4 md:m-6 lg:m-8
                                   flex justify-center items-center"
            >
                <Flashcard imgsrc={card.image} answer={card.word} logosrc={card.logosrc}/>
            </div>
        {/each}
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