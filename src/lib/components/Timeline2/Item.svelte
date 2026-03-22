<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

    export let title = 'Default Title';
    export let text = '';
    export let imageUrl = 'https://via.placeholder.com/600x400';
    export let vimeoId = ''; // optional: if set, shows autoplay vimeo video instead of image
    export let meta = []; // optional: array of {label, value} pairs
    export let supporters = []; // optional: array of {heading, names[]}

    let itemElement;
    let imageElement;
    let videoContainer;
    let scaleValue = 1;
    const videoRatio = 16 / 9;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!vimeoId && imageElement) {
            const animation = gsap.fromTo(imageElement,
                {yPercent: -15},
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
        }

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

<div bind:this={itemElement}
     class="item-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24 min-h-[60vh] px-6 md:px-12 lg:px-20">

    <!-- Text side -->
    <div class="text-content">
        <h3 class="text-3xl md:text-4xl font-bold mb-4 text-on-surface">{title}</h3>
        <p class="text-base md:text-lg text-on-surface mb-6 leading-relaxed">{text}</p>

        {#if meta.length > 0}
            <div class="flex flex-col gap-2 mt-4">
                {#each meta as m}
                    <div class="flex flex-col">
                        <span class="text-xs uppercase tracking-widest text-primary font-bold">{m.label}</span>
                        <span class="text-sm text-on-surface">{m.value}</span>
                    </div>
                {/each}
            </div>
        {/if}

        {#if supporters.length > 0}
            <div class="flex flex-col gap-3 mt-6">
                {#each supporters as s}
                    <div>
                        <p class="text-xs uppercase tracking-widest text-brand-orange font-bold mb-1">{s.heading}</p>
                        {#each s.names as name}
                            <p class="text-sm text-on-surface">{name}</p>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Media side -->
    <div class="media-wrapper overflow-hidden rounded-2xl h-64 md:h-96 shadow-lg relative"
         bind:this={videoContainer}>
        {#if vimeoId}
            <iframe
                class="absolute top-1/2 left-1/2 w-full h-full z-0 pointer-events-none rounded-2xl"
                style="transform: translate(-50%, -50%) scale({scaleValue});"
                src="https://player.vimeo.com/video/{vimeoId}?background=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
                title="{title} Video"
                frameborder="0"
                allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        {:else}
            <img bind:this={imageElement}
                 src={imageUrl}
                 alt={title}
                 class="w-full h-full object-cover transform"/>
        {/if}
    </div>
</div>
