<!-- Flashcard.svelte -->
<script>
    export let imgsrc;
    export let answer;
    export let title; // Add title prop

    let showCardBack = false;
    const toggleFlip = () => showCardBack = !showCardBack;
</script>

<div class="relative w-full sm:w-80 md:w-96 lg:w-[420px] perspective-1000 group z-10">
    <div
            class="relative w-full aspect-video transition-transform duration-500 transform-style-preserve-3d shadow-lg
               group-hover:shadow-2xl rounded-xl"
            class:flip-it={showCardBack}
    >
        <div class="absolute inset-0 rounded-2xl overflow-hidden backface-hidden">
            <img src={imgsrc} alt="Background" class="w-full h-full object-cover rounded-2xl"/>
<!--            <div class="absolute inset-0 bg-[#660066]/60 rounded-2xl"></div>-->

            <!-- Title in the center of the card -->
            <div class="absolute inset-0 flex items-center justify-center">
                <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white px-4 py-2 text-center bg-primary">
                    {title}
                </h1>
            </div>
        </div>

        <div class="absolute w-full h-full backface-hidden bg-[#250025] flex justify-center items-center rotate-y-180
                rounded-xl shadow-md p-4 border-4 border-[#250025]">
            <p class="text-center text-lg font-bold text-[#dee3e9]">{answer}</p>
        </div>

        <!-- Flip Button (visible on both sides) -->
        <button
                on:click={toggleFlip}
                class="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4
                  bg-[#ff9900] hover:bg-[#ff9900]/80 text-[#250025] rounded-full
                  w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14
                  flex items-center justify-center shadow-lg z-20
                  transform transition-transform duration-300 hover:scale-110"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd"/>
            </svg>
        </button>
    </div>
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