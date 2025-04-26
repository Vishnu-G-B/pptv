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
    <!--    <div class="w-full pb-[56.25%] sticky top-0 h-0 z-[3] home-video-container">-->
    <!--        <iframe class="absolute top-0 left-0 w-full h-full"-->
    <!--                width="512"-->
    <!--                src="https://www.youtube.com/embed/goYHQmz6Ur4?si=86nqXWJ9f5eDPT9l&amp;controls=0&amp;autoplay=1&amp;showinfo=0&amp;mute=1"-->
    <!--                title="YouTube video player" frameborder="0"-->
    <!--                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"-->
    <!--                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>-->
    <!--    </div>-->
    <div class="absolute inset-0 bg-gradient-to-r from-alternate-primary to-transparent to-[35%] z-5 "></div>
    <div class="w-full h-full z-[3] home-video-container">
        <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">
            <source src="{sampleVid}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
    </div>
    <div class="absolute left-24 bottom-32 w-1/3 h-fit p-10 text-on-surface text-lg">
        <span class="text-5xl font-bold text-nowrap ">Purple People Labs</span>
        Watch films made by children, teachers & schools for a happier world on stories that matter.<br/><br/>
        Education - Entertainment - Social
        Impact. #GoPurple
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
