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
    export let logo = '';

    // Resolve logo from the logos folder via Vite glob
    const logoModules = import.meta.glob('$lib/assets/images/logos/*', { eager: true, as: 'url' });
    $: logoUrl = logo
        ? (Object.entries(logoModules).find(([p]) => p.endsWith('/' + logo))?.[1] ?? '')
        : '';

    // Video scaling for the right panel
    let videoContainer;
    let scaleValue = 1;
    const videoRatio = 16 / 9;

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

<!-- ─── Section wrapper ─── -->
<div class="w-full bg-[#250025] flex flex-col">

    <!-- ══════════════════════════════════════════════
         TOP: Left text panel + Right video panel
    ══════════════════════════════════════════════ -->
    <div class="flex flex-col lg:flex-row min-h-screen">

        <!-- ── LEFT PANEL: logo + text (ProjectGullak layout) ── -->
        <div class="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-24">

            <!-- Logo + text side by side (ProjectGullak header style) -->
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8">

                <!-- Logo (large, left — ProjectGullak style) -->
                {#if logoUrl}
                    <div class="flex-shrink-0">
                        <img src={logoUrl} alt="{title} logo"
                             class="h-28 md:h-36 lg:h-40 w-auto object-contain drop-shadow-lg"/>
                    </div>
                {/if}

                <!-- Text block (right of logo) -->
                <div class="flex flex-col text-center md:text-left">

                    <!-- Subtitle — orange uppercase (ECAtv label style) -->
                    {#if subtitle}
                        <p class="text-[#ff9900] text-xs uppercase tracking-widest font-bold mb-3">
                            {subtitle}
                        </p>
                    {/if}

                    <!-- Title — large bold white (ECAtv heading treatment) -->
                    <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight mb-4"
                        style="font-family: Arial">
                        {title}
                    </h3>
                </div>
            </div>

            <!-- Body text (white/70 — ECAtv paragraph style) -->
            <p class="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                {text}
            </p>

            <!-- Meta badges — small pill tags for year/date info -->
            {#if meta.length > 0}
                <div class="flex flex-row flex-wrap gap-2 mb-6">
                    {#each meta as m}
                        <div class="bg-white/10 border border-white/15 rounded-full px-4 py-1.5">
                            <span class="text-[10px] text-[#ff9900] font-bold uppercase tracking-widest">{m.label}:&nbsp;</span>
                            <span class="text-xs text-white font-medium">{m.value}</span>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- Read More button (ECAtv arrow style) -->
            <button on:click={handleReadMore}
                class="self-center md:self-start flex items-center gap-2 text-[#ff9900] font-bold
                       text-sm uppercase tracking-widest hover:text-white transition-colors duration-200 group">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="h-4 w-4 group-hover:translate-x-1 transition-transform"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </button>

            <!-- ── Credits footer — inside left panel, below Read More ── -->
            {#if supporters.length > 0}
                <div class="mt-10 pt-8 border-t border-white/10">
                    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:gap-0 items-start">
                        {#each supporters as s, i}
                            <!-- Vertical divider between credit columns (ECAtv style) -->
                            {#if i > 0}
                                <div class="hidden sm:block w-px bg-white/15 self-stretch mx-6 flex-shrink-0"></div>
                            {/if}
                            <!-- Credit column -->
                            <div class="flex flex-col gap-2 flex-1 min-w-[130px]">
                                <!-- Column heading — ECAtv credits label -->
                                <p class="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-1">
                                    {s.heading}
                                </p>
                                <!-- Names as ProjectGullak chiplets -->
                                <div class="flex flex-row flex-wrap gap-2">
                                    {#each s.names as name}
                                        <div class="bg-white/5 border border-white/10 rounded-xl
                                                    px-3 py-2 text-white/70 text-xs leading-snug">
                                            {name}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>

        <!-- ── RIGHT PANEL: Autoplay video (original split layout) ── -->
        <div class="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full relative overflow-hidden bg-black/20"
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
                <!-- Subtle left-side fade so text panel blends cleanly into video -->
                <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#250025] to-transparent z-[1] pointer-events-none"></div>
            {:else if imageUrl}
                <img src={imageUrl} alt={title}
                     class="absolute inset-0 w-full h-full object-cover"/>
            {:else}
                <div class="absolute inset-0 bg-white/5"></div>
            {/if}
        </div>
    </div>

</div>

<!-- Thin separator between timeline sections -->
<div class="w-full h-px bg-white/10"></div>
