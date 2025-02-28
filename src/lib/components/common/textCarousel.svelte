<script>
    import {onMount, onDestroy} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import temp1 from "$lib/assets/images/temp1.jpg";
    import temp2 from "$lib/assets/images/temp2.jpg";
    import temp3 from "$lib/assets/images/temp3.jpg";
    import temp4 from "$lib/assets/images/temp4.png";

    gsap.registerPlugin(ScrollTrigger);

    export let items = ["Social Emotional Learning", "Life Skills", "Sustainable Development Goals", "Community Service Projects"];
    export let isNarrow = false;
    export let backgroundImages = [
        temp1,
        temp2,
        temp3,
        temp4,
    ];

    let container;
    let wordItems;
    let mainTimeline;
    let charTimeline;
    let bgTimeline;
    let bgImages;
    let mediaMatch;

    // Helper to return fade-in and fade-out offsets based on word index and total count.
    function getOffsets(index, total) {
        if (total === 3) {
            const offsets = [
                {fadeIn: 15, fadeOut: 23.5},
                {fadeIn: 25, fadeOut: 32},
                {fadeIn: 34.5, fadeOut: 40}
            ];
            return offsets[index];
        }
        if (total === 4) {
            const offsets = [
                {fadeIn: 5, fadeOut: 25},
                {fadeIn: 35, fadeOut: 55},
                {fadeIn: 55, fadeOut: 70},
                {fadeIn: 80, fadeOut: 100}
            ];
            return offsets[index];
        }
        // Fallback: even spacing.
        const base = 10;
        const step = 25;
        const duration = 15;
        return {
            fadeIn: base + index * step,
            fadeOut: base + index * step + duration
        };
    }

    // Cleanup on component destroy.
    onDestroy(() => {
        if (mainTimeline) mainTimeline.kill();
        if (charTimeline) charTimeline.kill();
        if (bgTimeline) bgTimeline.kill();
        if (mediaMatch) mediaMatch.kill();
    });

    // Set positions for the words based on a spacing value.
    function setPositions(spacing) {
        const numWords = wordItems.length;
        const zPos = numWords * spacing * 2;
        const angle = 360 / (numWords * 4);
        const transformOrigin = `50% 50% -${zPos}px`;
        const initalRotation = angle * 0.5;

        gsap.set(wordItems, {rotationX: initalRotation});
        wordItems.forEach((item, i) => {
            gsap.set(item, {
                z: zPos,
                rotationX: initalRotation - angle * (i * 1.5),
                transformOrigin
            });
        });

        return {angle, numWords};
    }

    // Initialize the main rotation timeline.
    function initMainTimeline({angle, numWords}) {
        mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        mainTimeline.to(wordItems, {
            rotationX: `+=${(numWords) * angle}`,
            force3D: true,
            duration: items.length,
            ease: 'power1.inOut'
        });
    }

    function initCharacterTimeline() {
        charTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        });

        charTimeline.addLabel("start");

        const total = wordItems.length;
        wordItems.forEach((wordItem, index) => {
            const chars = [...wordItem.querySelectorAll('.char')];
            gsap.set(chars, {
                y: 100,
                rotateX: -90,
                opacity: 0
            });

            const {fadeIn, fadeOut} = getOffsets(index, total);
            charTimeline.fromTo(
                chars,
                {y: 100, autoAlpha: 0, rotateX: -90},
                {
                    y: 0,
                    stagger: 0.3,
                    rotateX: 0,
                    autoAlpha: 1,
                    ease: 'none',
                    duration: 2
                },
                `start+=${fadeIn}`
            ).to(
                chars,
                {
                    stagger: 0.5,
                    autoAlpha: 0,
                    rotateX: 90,
                    ease: 'none',
                    y: 0,
                    duration: 2
                },
                `start+=${fadeOut}`
            );
        });
    }

    function initBgTimeline() {
        bgTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        });

        bgTimeline.addLabel("start");

        const total = wordItems.length;
        bgImages.forEach((img, index) => {
            const {fadeIn, fadeOut} = getOffsets(index, total);
            if (index === 0) {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn}`
                    )
                    .fromTo(
                        '.words-carousel__filter',
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        '<'
                    )
                    .to(
                        img,
                        {opacity: 0, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            } else if (index === 3) {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn}`
                    )
                    .to(
                        img,
                        {opacity: 1, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            } else {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn}`
                    )
                    .to(
                        img,
                        {opacity: 0, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            }
        });
    }

    function initMediaQueries() {
        mediaMatch = gsap.matchMedia();

        mediaMatch.add('(max-width: 767px)', () => {
            const params = setPositions(60); // Increased from 40
            initMainTimeline(params);
        });

        mediaMatch.add('(min-width: 768px)', () => {
            const params = setPositions(150); // Increased from 120
            initMainTimeline(params);
        });
    }

    onMount(() => {
        wordItems = container.querySelectorAll('.words-carousel__item');
        bgImages = container.querySelectorAll('.bg-image');
        initMediaQueries();
        initCharacterTimeline();
        initBgTimeline();
    });
</script>

<div class="words-carousel relative {isNarrow ? 'h-[300vh] lg:-mt-[25vh]' : 'h-[450vh]'} bg-[#f6f5ec] mt-4 -mb-32"
     bind:this={container}>
    <div class="words-carousel__bg sticky top-1/2 left-1/2
                transform -translate-x-3 sm:-translate-x-8 -translate-y-1/2
                w-[95vw] h-[95vh] overflow-hidden">
        {#each items as _, i}
            <img
                    src={backgroundImages[i]}
                    alt=""
                    class="bg-image h-full w-full absolute inset-0 object-cover opacity-0 rounded-xl"
                    style="opacity: {i === 0 ? 1 : 0};"
            />
        {/each}
        <div class="words-carousel__filter absolute inset-0 bggradient rounded-xl"></div>
    </div>


    <!-- Carousel Content -->
    <div class="words-carousel__inner sticky top-1/2 transform -translate-y-1/2 h-screen flex items-center
                justify-center perspective-[150rem] text-white">
        <ul class="words-carousel__list relative w-[50vw] h-[50vw] transform-style-preserve-3d origin-[50%_50%]">
            {#each items as item,index}
                <li class="words-carousel__item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           text-center w-[95vw] text-[2rem] md:text-[6rem] backface-hidden
                text-brand-orange"
                >
                    {#each item.split(' ') as word}
                        <div class="word-line mb-2 md:mb-4">
                            {#each word.split('') as char}
                                <span class="char inline-block">{char}</span>
                            {/each}
                        </div>
                    {/each}
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    :global(.backface-hidden) {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .bggradient {
        /*background: rgb(255,255,255);*/
        background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(37, 0, 37, 1) 90%);
    }

    .word-line {
        display: block;
        line-height: 0.5;
        margin-bottom: 0.4em;
    }
</style>
