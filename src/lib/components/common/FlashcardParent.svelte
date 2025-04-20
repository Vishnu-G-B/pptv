<!-- App.svelte -->
<script>
    import Flashcard from './Flashcard.svelte';
    import {onMount} from 'svelte';
    import img1 from "$lib/assets/images/1_PPL OTT.jpg";
    import img2 from "$lib/assets/images/2B_KAB.png";
    import img3 from "$lib/assets/images/3_ECA TV.png";
    import img4 from "$lib/assets/images/5_School Studio.png";
    import img5 from "$lib/assets/images/6_Gullak.png";
    import img6 from "$lib/assets/images/2_KAB.png";
    import gsap from "gsap/dist/gsap";

    let mounted = false;
    let headerTimeline;
    let windowWidth;

    let componentData = [
        {
            word: "A Conscious OTT platform streaming impactful and educational content Starting @ Just ONE Rupee.",
            title: "PURPLE PEOPLE LABS",
            image: img1,
        },
        {
            word: "Filmmaking Grant for children supported by industry mentors to amplify young voices from urban and rural india celebrating ideas.",
            title: "YOUNG INDIA FILMMAKERS",
            image: img2,
        },
        {
            word: "Community Filmmaking Tours to villages, artisans, start-ups  & changemakers across India capturing real stories on reel.",
            title: "KIDDING AROUND BHARAT",
            image: img3
        },
        {
            word: "A CSR filmmaking workshop for children supporting real stories from rural India.",
            title: "THE PROJECT GULLAK",
            image: img4
        },
        {
            word: "offering 5",
            title: "ECA - APER TV",
            image: img5
        },
        {
            word: "A capacity building program for the Ministry Of Education’s PM eVIDYA initiative including studio design, teacher training and co-production of curriculum based content in regional languages.",
            title: "PM eVIDYA SCHOOL STUDIO", // Added title
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
                    style="
                          transform:
                            {mounted ?
                              `rotate(${(i % 2 === 0 ? 1 : -1) * (Math.floor(i/2) + 1) *
                                (window.innerWidth < 768 ? 0.6 : 2)}deg)
                               translateY(${i % 3 * (window.innerWidth < 768 ? 5 : 15)}px)` :
                              'translateY(100px) scale(0.8)'};
                          transition-delay: ${i * 100}ms;
                          z-index: ${i};
                        "
            >
                <Flashcard imgsrc={card.image} answer={card.word} title={card.title}/>
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