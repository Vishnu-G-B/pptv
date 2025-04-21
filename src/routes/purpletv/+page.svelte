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

<div class="h-screen w-full bg-surface sticky top-0 grid-lines home-video-container-trigger">
    <!--    <div class="w-full pb-[56.25%] sticky top-0 h-0 z-[3] home-video-container">-->
    <!--        <iframe class="absolute top-0 left-0 w-full h-full"-->
    <!--                width="512"-->
    <!--                src="https://www.youtube.com/embed/goYHQmz6Ur4?si=86nqXWJ9f5eDPT9l&amp;controls=0&amp;autoplay=1&amp;showinfo=0&amp;mute=1"-->
    <!--                title="YouTube video player" frameborder="0"-->
    <!--                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"-->
    <!--                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>-->
    <!--    </div>-->
    <div class="w-full h-full sticky top-0 z-[3] home-video-container">
        <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">
            <source src="{sampleVid}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
    </div>
</div>
<div class="h-fit w-full flex flex-col gap-0">
    <div class="absolute top-0 h-[97vh] max-w-[28%] overflow-hidden flex flex-col items-end justify-end ml-20">
        <div class="h-fit w-full p-5 backdrop-blur-xl rounded-lg flex z-[4] flex-col gap-8">
            <p class="text-6xl primary-font font-bold text-on-surface">
                #GoPurple
            </p>
            <p class="text-xl primary-font font-thin text-on-surface">We are Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Accusamus consequatur dicta doloremque expedita explicabo facere harum
                necessitatibus nemo odio quis quod ratione sit tempore temporibus ullam vel veritatis, voluptas
                voluptate.
            </p>
<!--            <div class="w-full h-fit relative">-->
            <!--                <div class="absolute top-0 left-0 h-2 w-full rounded-t-xl bg-primary/50"></div>-->
            <!--                <div class="absolute top-0 left-0 h-full w-2 rounded-l-xl bg-primary/50 z-[0]"></div>-->
            <!--                <div class="absolute top-0 right-0 h-full w-2 rounded-r-xl bg-primary/50 z-[0]"></div>-->
            <!--                <div class="absolute bottom-0 left-0 h-2 w-full rounded-b-xl bg-primary/50 z-[0]"></div>-->
            <!--                <button class="w-full h-fit bg-on-surface/20 rounded-lg text-on-surface py-2 text-center primary-font text-xl backdrop-blur-lg">-->
            <!--                    COMING SOON!-->
            <!--                </button>-->
            <!--            </div>-->
        </div>
    </div>
    <div class="h-fit w-full overflow-x-hidden pb-10 z-[5] ">
        <div class="h-fit w-full z-[5] ml-20">
            <div class="h-[550px] w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll no-scrollbar pr-24"
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
