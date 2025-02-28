<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap/dist/gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    // Props
    export let items = ['Share.', 'Design.', 'Create.'];
    export let isNarrow = false;

    // Component state
    let container;
    let wordItems;
    let mainTimeline;
    let charTimeline;
    let mediaMatch;

    // Cleanup on component destroy
    onDestroy(() => {
        if (mainTimeline) mainTimeline.kill();
        if (charTimeline) charTimeline.kill();
        if (mediaMatch) mediaMatch.kill();
    });

    // Set up positions based on spacing
    function setPositions(spacing) {
        const numWords = wordItems.length;
        const zPos = numWords * spacing;
        const angle = 360 / (numWords + 5);
        const transformOrigin = `50% 50% -${zPos}px`;

        // Initialize the words (li elements)
        gsap.set(wordItems, { rotationX: 0 });
        wordItems.forEach((item, i) => {
            gsap.set(item, {
                z: zPos,
                rotationX: -angle * (i + 1),
                transformOrigin
            });
        });

        return { angle, numWords };
    }

    // Create the main rotation timeline (without affecting opacity)
    function initMainTimeline({ angle, numWords }) {
        mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        });

        mainTimeline.to(wordItems, {
            rotationX: `+=${(numWords + 1) * angle}`,
            force3D: true,
            duration: items.length,
            ease: 'none'
        });
    }

    // Combine all character animations into a single timeline
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

        wordItems.forEach((wordItem, index) => {
            const chars = [...wordItem.querySelectorAll('.char')];
            // Set the initial state for each character
            gsap.set(chars, {
                y: 100,
                rotateX: -90,
                opacity: 0
            });

            // Determine offsets so that each word animates sequentially
            let fadeInOffset, fadeOutOffset;
            if (index === 0) {
                fadeInOffset = 15;
                fadeOutOffset = 23.5;
            } else if (index === 1) {
                fadeInOffset = 25;
                fadeOutOffset = 32;
            } else {
                fadeInOffset = 34.5;
                fadeOutOffset = 40;
            }

            // Animate fade in (each char staggered)
            charTimeline.fromTo(chars,
                { y: 100, autoAlpha: 0, rotateX: -90 },
                {
                    y: 0,
                    stagger: 0.3,
                    rotateX: 0,
                    autoAlpha: 1,
                    ease: 'none',
                    duration: 2
                },
                `start+=${fadeInOffset}`
            )
                // Then animate fade out so that the next word can appear
                .to(chars,
                    {
                        stagger: 0.5,
                        autoAlpha: 0,
                        rotateX: 90,
                        ease: 'none',
                        y: 0,
                        duration: 2
                    },
                    `start+=${fadeOutOffset}`
                );
        });
    }

    // Setup media queries to adjust spacing based on viewport width
    function initMediaQueries() {
        mediaMatch = gsap.matchMedia();

        mediaMatch.add('(max-width: 767px)', () => {
            const params = setPositions(30);
            initMainTimeline(params);
        });

        mediaMatch.add('(min-width: 768px)', () => {
            const params = setPositions(70);
            initMainTimeline(params);
        });
    }

    onMount(() => {
        wordItems = container.querySelectorAll('.words-carousel__item');
        initMediaQueries();
        initCharacterTimeline();
    });
</script>

<div
        class="words-carousel relative {isNarrow ? 'h-[250vh] lg:-mt-[25vh]' : 'h-[400vh]'}"
        bind:this={container}
>
    <div class="words-carousel__inner sticky top-0 h-screen flex items-center justify-center perspective-[70rem] text-white">
        <ul
                class="words-carousel__list relative w-[50vw] h-[50vw] transform-style-preserve-3d origin-[50%_50%]"
        >
            {#each items as item}
                <li
                        class="words-carousel__item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-6xl md:text-[15rem] backface-hidden"
                >
                    {#each item.split('') as char}
                        <span class="char inline-block text-[1em] text-black">{char}</span>
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
</style>
