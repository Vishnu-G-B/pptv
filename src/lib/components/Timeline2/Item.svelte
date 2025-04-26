<script>
    import { onMount } from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

    export let title = 'Default Title';
    export let text = 'Default paragraph text.';
    export let imageUrl = 'https://via.placeholder.com/600x400';

    let itemElement;
    let imageElement;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const animation = gsap.fromTo(imageElement,
            { yPercent: -15 },
            {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: itemElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            }
        );

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    });
</script>

<div bind:this={itemElement} class="item-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24 min-h-[60vh]">
    <div class="text-content px-4 md:px-0">
        <h3 class="text-3xl md:text-5xl font-bold mb-4">{title}</h3>
        <p class="text-base md:text-lg text-gray-600">{text}</p>
    </div>

    <div class="image-wrapper overflow-hidden h-64 md:h-96 rounded-lg shadow-lg">
        <img bind:this={imageElement} src={imageUrl} alt="{title}" class="w-full h-full object-cover transform" />
    </div>
</div>