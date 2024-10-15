<script>
    import sampleVid from '$lib/assets/images/samplevideo.mp4'
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

<!--<div class="w-full h-[17rem] bg-surface grid-lines pl-[4rem] sticky top-0">-->
<!--    <div class="w-full h-full py-4 pr-14 pl-5 rounded-2xl">-->
<!--        <div class="w-full h-full bg-[#0f1115] rounded-2xl flex justify-center items-center">-->
<!--            <div class="ad-image-div w-1/2 h-full relative">-->
<!--                <div class="absolute w-fit h-full top-4 left-4 text-4xl text-on-surface font-bold tracking-wider primary-font">-->
<!--                    Young<br/>India<br/>Film<br/>Festival-->
<!--                </div>-->
<!--                <div class=" w-full h-full rounded-3xl shadow-[0_0_24px_11px_rgba(0,0,0,0.42)] overflow-hidden">-->
<!--                    <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">-->
<!--                        <source src="{sampleVid}" type="video/mp4">-->
<!--                        Your browser does not support HTML5 video.-->
<!--                    </video>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="ad-text-div w-1/2 h-full flex flex-col justify-center items-start p-4 shadow-[0px_-1px_33px_52px_rgba(0,0,0,1)]-->
<!--                        rounded-r-xl bg-black bg-gradient-to-r from-black via-[#0e0f13] to-[#16181f] z-10">-->
<!--                <div class="w-[25%] h-1/2 text-center flex justify-start items-center">-->
<!--                    <p class="text-xl text-on-surface text-start font-bold primary-font">-->
<!--                        This is some advertisement text.-->
<!--                    </p>-->
<!--                </div>-->
<!--                <div class="w-full h-1/2 flex justify-start items-center">-->
<!--                    <button class="rounded-lg backdrop-blur-lg bg-on-surface/20 text-lg text-on-surface primary-font px-3 py-2 flex flex-row items-center justify-between gap-2 group">-->
<!--                        <div class="bg-primary rounded-lg h-fit w-fit px-2 py-2 flex flex-row group-hover:translate-x-1 duration-300 transition-all">-->
<!--                            <svg-->
<!--                                    xmlns="http://www.w3.org/2000/svg"-->
<!--                                    height="16"-->
<!--                                    width="14"-->
<!--                                    viewBox="0 0 448 512"-->
<!--                                    class="fill-on-surface"-->
<!--                            >-->
<!--                                &lt;!&ndash;!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.&ndash;&gt;-->
<!--                                <path-->
<!--                                        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"-->
<!--                                />-->
<!--                            </svg-->
<!--                            >-->
<!--                        </div>-->
<!--                        Register Now!-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<div class="h-fit w-full bg-surface sticky top-0 grid-lines home-video-container-trigger">
    <div class="w-full pb-[56.25%] sticky top-0 h-0 z-[3] home-video-container">
        <iframe class="absolute top-0 left-0 w-full h-full"
                width="512"
                src="https://www.youtube-nocookie.com/embed/YisYNBBd3Jw?si=Iou-0ZVdcubUjATc&amp;controls=0&amp;autoplay=1&amp;showinfo=0&amp;loop=1&amp;mute=1"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</div>
<div class="h-fit w-full flex flex-col gap-0">
    <div class="absolute top-0 h-[97vh] max-w-[28%] overflow-hidden flex flex-col items-end justify-end mt-[7rem] ml-20">
        <div class="h-fit w-full p-5 backdrop-blur-xl rounded-lg flex z-[4] flex-col gap-8">
            <p class="text-7xl primary-font font-bold text-on-surface">
                Purple TV
            </p>
            <p class="text-xl primary-font font-thin text-on-surface">We are Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Accusamus consequatur dicta doloremque expedita explicabo facere harum
                necessitatibus nemo odio quis quod ratione sit tempore temporibus ullam vel veritatis, voluptas
                voluptate.
            </p>
            <div class="w-full h-fit relative">
                <div class="absolute top-0 left-0 h-2 w-full rounded-t-xl bg-primary/50"></div>
                <div class="absolute top-0 left-0 h-full w-2 rounded-l-xl bg-primary/50 z-[0]"></div>
                <div class="absolute top-0 right-0 h-full w-2 rounded-r-xl bg-primary/50 z-[0]"></div>
                <div class="absolute bottom-0 left-0 h-2 w-full rounded-b-xl bg-primary/50 z-[0]"></div>
                <button class="w-full h-fit bg-on-surface/20 rounded-lg text-on-surface py-2 text-center primary-font text-xl backdrop-blur-lg">
                    COMING SOON!
                </button>
            </div>
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
<!--<div class="absolute top-0 h-fit bg-surface grid-lines w-full flex flex-col pl-20">-->
<!--    <div class="h-[96vh] max-w-[28%] relative overflow-hidden flex flex-col items-end justify-end pb-14">-->
<!--        <div class="h-fit w-full p-5 backdrop-blur-xl rounded-lg flex z-[4] flex-col gap-8">-->
<!--            <p class="text-7xl primary-font font-bold text-on-surface">-->
<!--                Purple TV-->
<!--            </p>-->
<!--            <p class="text-xl primary-font font-thin text-on-surface">We are Lorem ipsum dolor sit amet,-->
<!--                consectetur-->
<!--                adipisicing elit. Accusamus consequatur dicta doloremque expedita explicabo facere harum-->
<!--                necessitatibus-->
<!--                nemo-->
<!--                odio quis quod ratione sit tempore temporibus ullam vel veritatis, voluptas voluptate.-->
<!--            </p>-->
<!--            <div class="w-full h-fit relative">-->
<!--                <div class="absolute top-0 left-0 h-2 w-full rounded-t-xl bg-primary/50"></div>-->
<!--                <div class="absolute top-0 left-0 h-full w-2 rounded-l-xl bg-primary/50 z-[0]"></div>-->
<!--                <div class="absolute top-0 right-0 h-full w-2 rounded-r-xl bg-primary/50 z-[0]"></div>-->
<!--                <div class="absolute bottom-0 left-0 h-2 w-full rounded-b-xl bg-primary/50 z-[0]"></div>-->
<!--                <button class="w-full h-fit bg-on-surface/20 rounded-lg text-on-surface py-2 text-center primary-font text-xl backdrop-blur-lg">-->
<!--                    COMING SOON!-->
<!--                </button>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="h-fit w-full z-[5] overflow-x-hidden pb-10">-->
<!--        <div class="h-fit w-full z-[5]">-->
<!--            <div class="h-fit w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll">-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--                <div class="bg-primary rounded-lg h-[550px] w-[350px] flex-shrink-0"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<style>
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>