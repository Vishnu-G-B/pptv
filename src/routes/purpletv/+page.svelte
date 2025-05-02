<script>
    import sampleVid from '$lib/assets/Videos/OTT Landing_Website Final.mp4'
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";
    import {dragscroll} from "@svelte-put/dragscroll";
    import {goto} from "$app/navigation";

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        let homeVideo = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-video-container-trigger',
                start: 'top top',
                end: 'top -65%',
                scrub: true,
                markers: false,
            }
        });
        homeVideo.to('.home-video-container', {
            opacity: 0,
        })
    })

    function handleIndividualVidClick(event) {
        event.preventDefault();
        const vidID = event.currentTarget.querySelector('div').id;
        goto(`/movie/${vidID}`);
    }

</script>

<div class="h-screen w-full bg-surface grid-lines home-video-container-trigger relative">
    <div class="absolute w-full h-full bg-gradient-to-r from-alternate-primary to-transparent z-5 "></div>
    <div class="w-full h-full z-[3] home-video-container">
        <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">
            <source src="{sampleVid}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
    </div>
    <div class="absolute left-24 bottom-32 w-1/3 h-fit p-11 text-on-surface text-lg flex flex-col">
        <span class="text-5xl font-bold text-nowrap inline-block mb-3">Purple People Labs</span>
        <span class="font-bold text-xl text-brand-orange inline-block mb-3">Education - Entertainment - Social Impact</span>
        Watch films made by children, teachers & schools for a happier world on stories that matter.<br/><br/>
        <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button
                    class="animate-button text-base md:text-2xl text-white px-4 md:px-4 py-2 rounded-xl
                                font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-primary
                                text-center capitalize"
            >
                #GoPurple
            </button>
        </div>
    </div>
</div>
<div class="h-screen bg-surface grid-lines pt-10 w-full flex flex-col gap-0">
    <div class="h-full w-full overflow-x-hidden py-10 z-[5] flex flex-col justify-center items-center gap-4">
        <div class="h-fit w-full z-[5] ml-[12rem]">
            <div class="h-[250px] w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll no-scrollbar pr-24"
                 use:dragscroll>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="1"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="2"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="3"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="4"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="5"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="6"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="7"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="8"></div>
                </a>
            </div>
        </div>
        <div class="h-fit w-full z-[5] ml-[12rem]">
            <div class="h-[250px] w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll no-scrollbar pr-24"
                 use:dragscroll>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="1"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="2"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="3"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="4"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="5"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="6"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="7"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="8"></div>
                </a>
            </div>
        </div>
        <div class="h-fit w-full z-[5] ml-[12rem]">
            <div class="h-[250px] w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll no-scrollbar pr-24"
                 use:dragscroll>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="1"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="2"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="3"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="4"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="5"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="6"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="7"></div>
                </a>
                <a href="" on:click="{handleIndividualVidClick}">
                    <div class="bg-primary rounded-lg aspect-video h-[225px] w-[400px] flex-shrink-0" id="8"></div>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
