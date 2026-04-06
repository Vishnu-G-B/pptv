<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import { openTimeline } from '$lib/stores/modalStore.js';

    export let title = '';
    export let subtitle = '';
    export let text = '';
    export let fullText = '';
    export let imageUrl = '';
    export let vimeoId = '';
    export let meta = [];
    export let supporters = [];
    export let logo = '';  // filename e.g. "PPLlogo.png"

    let itemElement;
    let videoContainer;
    let scaleValue = 1;
    const videoRatio = 16 / 9;

    // Resolve logo URL at component level (Vite glob — must be here, not in ModalContainer)
    const logoModules = import.meta.glob('$lib/assets/images/logos/*', { eager: true, as: 'url' });
    $: logoUrl = logo
        ? (Object.entries(logoModules).find(([p]) => p.endsWith('/' + logo))?.[1] ?? '')
        : '';

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (vimeoId && videoContainer) {
            const obs = new ResizeObserver(entries => {
                for (const e of entries) {
                    const cw = e.contentRect.width;
                    const ch = e.contentRect.height;
                    scaleValue = Math.max((ch * videoRatio) / cw, cw / (ch * videoRatio));
                }
            });
            obs.observe(videoContainer);
            return () => obs.disconnect();
        }
    });

    function handleReadMore() {
        openTimeline({ title, subtitle, text, fullText, meta, supporters, logoUrl });
    }
</script>

<!-- ─── Main item layout (full-screen, dark, video right) ─── -->
<div bind:this={itemElement}
     class="item-container w-full min-h-screen bg-[#250025] flex flex-col lg:flex-row items-stretch">

    <!-- Left: text panel -->
    <div class="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 lg:py-24 max-w-2xl">

        {#if logoUrl}
            <div class="mb-6">
                <img src={logoUrl} alt="Project logo" class="h-16 md:h-20 w-auto object-contain"/>
            </div>
        {/if}

        {#if subtitle}
            <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-3">{subtitle}</p>
        {/if}

        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5"
            style="font-family: Arial">{title}</h3>

        <p class="text-white/70 text-base md:text-lg leading-relaxed mb-6">{text}</p>

        {#if meta.length > 0}
            <div class="flex flex-row flex-wrap gap-3 mb-5">
                {#each meta as m}
                    <div class="bg-white/10 rounded-full px-4 py-1">
                        <span class="text-xs text-brand-orange font-bold uppercase tracking-widest">{m.label}: </span>
                        <span class="text-xs text-white">{m.value}</span>
                    </div>
                {/each}
            </div>
        {/if}

        <button on:click={handleReadMore}
            class="mt-2 self-start flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-widest
                   hover:text-white transition-colors duration-200 group">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
        </button>
    </div>

    <!-- Right: video panel -->
    <div class="w-full lg:w-[50%] xl:w-[55%] min-h-[300px] lg:min-h-screen relative overflow-hidden"
         bind:this={videoContainer}>
        {#if vimeoId}
            <iframe
                class="absolute top-1/2 left-1/2 w-full h-full z-0 pointer-events-none"
                style="transform: translate(-50%, -50%) scale({scaleValue});"
                src="https://player.vimeo.com/video/{vimeoId}?background=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
                title="{title} Video"
                frameborder="0"
                allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <div class="absolute inset-0 bg-[#250025]/20 z-1 pointer-events-none"></div>
        {:else if imageUrl}
            <img src={imageUrl} alt={title} class="absolute inset-0 w-full h-full object-cover"/>
        {:else}
            <div class="absolute inset-0 bg-white/5"></div>
        {/if}
    </div>
</div>

<div class="w-full h-px bg-white/10"></div>
