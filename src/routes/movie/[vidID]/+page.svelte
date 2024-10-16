<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap';
    import sampleVid from "$lib/assets/images/samplevideo.mp4"
    import Learn from "$lib/components/PPLlabs/Learn.svelte";
    import Engage from "$lib/components/PPLlabs/Engage.svelte";
    import Act from "$lib/components/PPLlabs/Act.svelte";

    let activeSection = null;
    let sections = ['Learn', 'Engage', 'Act'];
    let isLiked = false;

    onMount(() => {
        gsap.set('.section-content', {opacity: 0, y: 20});
    });

    function showSection(section) {
        // if (activeSection === section) {
        //     activeSection = null;
        //     gsap.to(`.section-content`, {opacity: 0, y: 20, duration: 0.3});
        // } else {
        activeSection = section;
        gsap.to(`.section-content`, {opacity: 0, y: 20, duration: 0.3});
        gsap.to(`.${section.toLowerCase()}-content`, {opacity: 1, y: 0, duration: 0.5, delay: 0.3});
        // }
    }

    function toggleLike() {
        isLiked = !isLiked;
        gsap.to('.heart-button', {
            scale: isLiked ? 1.2 : 1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }
</script>

<div class="bg-surface grid-lines">
    <div class="h-screen w-full bg-surface grid-lines relative flex justify-center items-center">
        <div class="h-[50%] w-[35%] absolute rounded-xl bottom-12 left-24 z-10">
            <div class="h-full w-full rounded-3xl flex-col justify-between items-center
                        text-white primary-font p-4">
                <div class="text-center text-5xl mb-4 font-extrabold">
                    Movie Name
                </div>
                <div class="text-center text-lg mb-2 tracking-widest">
                    Movie Information, runtime, etc.
                </div>
                <div class="text-lg text-justify mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, itaque! Voluptate assumenda
                    maiores
                    voluptas dolorem. Ad, mollitia dolorum. Quam in minima aliquam earum consequatur saepe ab
                    similique
                    fuga modi minus.
                </div>
                <div class="text-center text-xl mb-2 font-light">
                    Educational | Something | Something Else
                </div>
                <div class="w-full h-fit text-center text-2xl mt-2 font-bold flex justify-center items-center">
                    <button class="rounded-lg backdrop-blur-lg bg-on-surface/20 text-lg text-on-surface primary-font px-3 py-2 flex flex-row items-center justify-between gap-2 group">
                        <div class="bg-primary rounded-lg h-fit w-fit px-2 py-2 flex flex-row group-hover:translate-x-1 duration-300 transition-all">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="14"
                                    viewBox="0 0 448 512"
                                    class="fill-on-surface"
                            >
                                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                <path
                                        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                                />
                            </svg
                            >
                        </div>
                        Watch Now!
                    </button>
                </div>
            </div>
        </div>
        <div class="w-[90%] h-[90vh] rounded-xl overflow-hidden object-cover -mr-6">
            <video autoplay muted loop playsinline id="myVideo" class="object-cover w-full h-full">
                <source src="{sampleVid}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
        </div>
    </div>

    <div class="w-full px-24 flex justify-center">
        <div class="flex space-x-4">
            {#each sections as section}
                <button
                        class="px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300 hover:bg-primary-dark"
                        class:active={activeSection === section}
                        on:click={() => showSection(section)}
                >
                    {section}
                </button>
            {/each}
            <button
                    class="heart-button px-4 py-2 bg-red-500 text-white rounded-lg transition-all duration-300 hover:bg-red-600"
                    on:click={toggleLike}
            >
                {isLiked ? '❤️' : '🤍'}
            </button>
        </div>
    </div>

    <div class="w-full px-24 flex flex-col justify-center py-5">
        <div class="learn-content section-content" class:hidden={activeSection !=='Learn'}>
            <Learn/>
        </div>

        <div class="engage-content section-content" class:hidden={activeSection !=='Engage'}>
            <Engage/>
        </div>

        <div class="act-content section-content" class:hidden={activeSection !== 'Act'}>
            <Act/>
        </div>
    </div>
</div>

<style>
    .active {
        @apply bg-primary;
    }

    .hidden {
        display: none;
    }
</style>