<!-- Flashcard.svelte -->
<script>
    import {onMount} from 'svelte';

    export let imgsrc;
    export let answer;
    export let logosrc;
    export let vimeoId = ''; // if set, card shows vimeo video on front (click to play)

    let showCardBack = false;
    let isFlipping = false;
    let videoPlaying = false;
    let videoContainer;
    let scaleValue = 1;
    const videoRatio = 16 / 9;

    const toggleFlip = () => {
        if (!isFlipping && !videoPlaying) {
            isFlipping = true;
            showCardBack = !showCardBack;
            setTimeout(() => { isFlipping = false; }, 500);
        }
    };

    function handleVideoClick() {
        videoPlaying = !videoPlaying;
    }

    onMount(() => {
        if (vimeoId && videoContainer) {
            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const cw = entry.contentRect.width;
                    const ch = entry.contentRect.height;
                    scaleValue = Math.max(
                        (ch * videoRatio) / cw,
                        cw / (ch * videoRatio)
                    );
                }
            });
            observer.observe(videoContainer);
            return () => observer.disconnect();
        }
    });
</script>

<div class="relative w-full md:w-72 lg:w-[410px] perspective-1000 group z-10">
    <div
        class="relative w-full aspect-video transition-transform duration-500 transform-style-preserve-3d shadow-lg
               group-hover:shadow-2xl rounded-xl"
        class:flip-it={showCardBack}
    >
        <!-- Front face -->
        <div class="absolute inset-0 rounded-2xl overflow-hidden backface-hidden" bind:this={videoContainer}>
            {#if vimeoId}
                <!-- Video front: shows thumbnail until clicked, then plays video -->
                {#if videoPlaying}
                    <iframe
                        class="absolute top-1/2 left-1/2 w-full h-full z-0 rounded-2xl"
                        style="transform: translate(-50%, -50%) scale({scaleValue});"
                        src="https://player.vimeo.com/video/{vimeoId}?autoplay=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
                        title="Video"
                        frameborder="0"
                        allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                {:else}
                    <!-- Thumbnail state: use Vimeo thumbnail URL as placeholder image -->
                    <img
                        src={imgsrc}
                        alt="Video thumbnail"
                        class="w-full h-full object-cover rounded-2xl"
                    />
                    <div class="absolute inset-0 bg-alternate-primary/50 rounded-2xl flex flex-col items-center justify-center gap-3">
                        <div class="navAnim firstImg flex-shrink-0 min-w-0 h-[22vh] min-[426px]:h-[27vh] w-auto
                                    bg-transparent rounded-full overflow-hidden z-[1]">
                            <img src={logosrc} alt="Logo" class="object-contain h-full w-full"/>
                        </div>
                        <!-- Play button overlay -->
                        <button
                            on:click={handleVideoClick}
                            class="absolute inset-0 flex items-end justify-end p-3 group/play"
                            aria-label="Play video"
                        >
                            <div class="bg-black/60 rounded-full p-2 group-hover/play:bg-primary transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                {/if}

                <!-- Stop button when playing -->
                {#if videoPlaying}
                    <button
                        on:click={handleVideoClick}
                        class="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 z-10 hover:bg-primary transition-colors duration-200"
                        aria-label="Stop video"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    </button>
                {/if}

            {:else}
                <!-- Original image front -->
                <img src={imgsrc} alt="Background" class="w-full h-full object-cover rounded-2xl"/>
                <div class="absolute inset-0 bg-alternate-primary/60 rounded-2xl"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="navAnim firstImg flex-shrink-0 min-w-0 h-[22vh] min-[426px]:h-[27vh] w-auto
                                bg-transparent rounded-full overflow-hidden z-[1]">
                        <img src={logosrc} alt="Logo" class="object-contain h-full w-full"/>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Back face -->
        <div class="absolute w-full h-full backface-hidden bg-[#250025] flex justify-center items-center rotate-y-180
                rounded-xl shadow-md p-4 border-4 border-[#250025]">
            <div class="text-center text-base sm:text-lg primary-font text-[#dee3e9]">{answer}</div>
        </div>
    </div>

    <!-- Flip button (only shown when video is not playing) -->
    {#if !videoPlaying}
        <button
            on:click={toggleFlip}
            class="absolute bottom-1 right-1
              text-brand-orange rounded-full
              w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14
              flex items-center justify-center shadow-lg z-20
              transform transition-all duration-300 hover:scale-110
              {isFlipping ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              transition-opacity duration-200"
            disabled={isFlipping}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" viewBox="0 0 20 20"
                 fill="currentColor">
                <path fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd"/>
            </svg>
        </button>
    {/if}
</div>

<style>
    .backface-hidden {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .perspective-1000 {
        perspective: 1000px;
    }

    .transform-style-preserve-3d {
        transform-style: preserve-3d;
    }

    .rotate-y-180 {
        transform: rotateY(180deg);
    }

    .flip-it {
        transform: rotateY(180deg);
    }
</style>
