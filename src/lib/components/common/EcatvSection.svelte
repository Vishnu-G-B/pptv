<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import ecatvlogo from "$lib/assets/images/ecatv.png";

    gsap.registerPlugin(ScrollTrigger);

    let container;
    let scaleValue = 1;
    const videoRatio = 16 / 9;

    // Vimeo placeholder — same ID used in BentoBox
    const VIMEO_ID = '1072992217';

    onMount(() => {
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === container) {
                    const cw = entry.contentRect.width;
                    const ch = entry.contentRect.height;
                    scaleValue = Math.max(
                        (ch * videoRatio) / cw,
                        cw / (ch * videoRatio)
                    );
                }
            }
        });
        if (container) observer.observe(container);
        return () => observer.disconnect();
    });
</script>

<div
    bind:this={container}
    class="w-full min-h-screen relative overflow-hidden flex items-center justify-center"
    id="ecatv-section"
>
    <!-- Background video -->
    <iframe
        class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 pointer-events-none"
        style="transform: translate(-50%, -50%) scale({scaleValue});"
        src="https://player.vimeo.com/video/{VIMEO_ID}?background=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
        title="ECA TV Background Video"
        frameborder="0"
        allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-[#250025]/70 z-1"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center text-center text-white px-6 md:px-16 max-w-5xl py-24">

        <!-- Logo -->
        <div class="mb-6 h-20 md:h-28 w-auto">
            <img src={ecatvlogo} alt="ECA TV Logo" class="h-full w-auto object-contain"/>
        </div>

        <h2 class="text-3xl sm:text-5xl md:text-6xl font-bold text-[#ff9900] mb-4 leading-tight"
            style="font-family: Arial">
            India's First OTT Platform<br/>for Early Childhood Education
        </h2>

        <p class="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mb-6 leading-relaxed">
            ECA TV is an upcoming digital learning platform developed in collaboration with the Early Childhood Association (ECA) and the Association for Preparatory Education &amp; Research (APER). Designed as a dedicated OTT ecosystem and Digital University for early years education, the platform brings together teachers, parents, and young learners through engaging, research-driven audiovisual content.
        </p>

        <p class="text-base sm:text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
            Through initiatives such as <span class="text-[#ff9900] font-bold">Teacher Talkies</span>, educators from across the ECA–APER network will be trained and featured as content creators, enabling a nationwide ecosystem of peer-to-peer learning and knowledge sharing.
        </p>

        <p class="text-xl sm:text-2xl font-bold text-brand-green mb-8">
            Stay Tuned. ECA TV Coming Soon.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 text-sm text-white/60">
            <div class="flex flex-col items-center">
                <span class="font-bold text-white/80 uppercase tracking-widest text-xs mb-1">Project By</span>
                <span>Early Childhood Association (ECA)</span>
                <span>Association for Preparatory Education &amp; Research (APER)</span>
            </div>
            <div class="hidden sm:block w-px bg-white/20"></div>
            <div class="flex flex-col items-center">
                <span class="font-bold text-white/80 uppercase tracking-widest text-xs mb-1">Technology &amp; Content By</span>
                <span>Purple People Labs, Mumbai</span>
            </div>
        </div>
    </div>
</div>
