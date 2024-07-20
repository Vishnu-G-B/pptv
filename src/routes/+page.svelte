<script>
    import sampleVid from '$lib/assets/images/samplevideo.mp4'
</script>

<div class="w-full h-[17rem] bg-surface grid-lines pl-[4rem]">
    <div class="w-full h-full py-4 pr-14 pl-5 rounded-lg">
        <div class="w-full h-full bg-[#0f1115] rounded-2xl flex justify-center items-center">
            <div class="ad-image-div w-1/2 h-full relative">
                <div class="absolute w-fit h-full top-4 left-4 text-4xl text-on-surface font-bold tracking-wider">
                    Young<br/>India<br/>Film<br/>Festival
                </div>
                <div class="w-full h-full rounded-l-xl shadow-[0_0_24px_11px_rgba(0,0,0,0.42)] overflow-hidden">
                    <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">
                        <source src="{sampleVid}" type="video/mp4">
                        Your browser does not support HTML5 video.
                    </video>
                </div>
            </div>
            <div class="ad-text-div w-1/2 h-full flex flex-col justify-center items-start p-4 shadow-[0px_-1px_33px_52px_rgba(0,0,0,1)]
                        rounded-r-xl bg-black bg-gradient-to-r from-black via-[#0e0f13] to-[#16181f] z-10">
                <div class="w-[25%] h-1/2 text-center flex justify-start items-center">
                    <p class="text-xl text-on-surface text-start font-bold">
                        This is some advertisement text.
                    </p>
                </div>
                <div class="w-full h-1/2 flex justify-start items-center">
                    <button
                            type="button"
                            class="bg-[#252833] text-center w-56 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
                    >
                        <div class="bg-primary rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[96.5%] z-10 duration-500">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                                 clip-rule="evenodd" style="fill: white;">
                                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
                            </svg>
                        </div>
                        <p class="translate-x-6 text-white">Register Now!!</p>
                    </button>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="min-h-screen h-fit w-full mt-[17rem] absolute top-0 flex flex-col items-start justify-end pl-20 bg-surface grid-lines">
    <div class="h-[95vh] max-w-[28%] relative overflow-hidden flex flex-col items-start justify-end pb-14">
        <div class="h-fit w-full p-5 backdrop-blur-xl rounded-lg flex z-[2] flex-col gap-8">
            <p class="text-7xl primary-font font-bold text-on-surface">
                Purple TV
            </p>
            <p class="text-xl primary-font font-thin text-on-surface">We are Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Accusamus consequatur dicta doloremque expedita explicabo facere harum
                necessitatibus
                nemo
                odio quis quod ratione sit tempore temporibus ullam vel veritatis, voluptas voluptate.
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
    <div class="h-fit w-full z-[5] overflow-x-hidden pb-10">
        <div class="h-fit w-full z-[5]">
            <div class="h-fit w-full flex flex-row flex-nowrap gap-5 overflow-x-scroll">
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
                <div class="bg-primary rounded-xl h-[550px] w-[350px] flex-shrink-0"></div>
            </div>
        </div>
    </div>
</div>

<div class="h-screen w-full sticky top-0 bg-surface grid-lines overflow-hidden">
    <div class="w-full relative pb-[56.25%] h-0 overflow-hidden">
        <iframe class="absolute top-0 left-0 w-full h-full"
                width="512"
                src="https://www.youtube-nocookie.com/embed/YisYNBBd3Jw?si=Iou-0ZVdcubUjATc&amp;controls=0&amp;autoplay=1&amp;showinfo=0&amp;loop=1&amp;mute=1"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="absolute w-full h-full bg-gradient-to-t from-80% from-black/85 to-transparent"></div>
</div>