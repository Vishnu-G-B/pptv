<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import SplitType from "split-type";

    gsap.registerPlugin(ScrollTrigger);

    let container1;
    let scaleValues = {video1: 1};
    const videoRatio = 16 / 9;

    onMount(() => {
        let typeSplit = new SplitType('.text-anim-parent', {
            types: 'lines, words, chars',
            tagName: 'span'
        });

        gsap.from('.text-anim-parent .line', {
            y: '-50%',
            opacity: 0,
            duration: 0.5,
            ease: 'sine.inOut',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.text-anim-parent',
                start: 'top center',
            }
        });

        gsap.utils.toArray('.animate-button').forEach(button => {
            button.addEventListener('mouseenter', () => gsap.to(button, {scale: 1.05, duration: 0.3}));
            button.addEventListener('mouseleave', () => gsap.to(button, {scale: 1, duration: 0.3}));
        });

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === container1) {
                    const cw = entry.contentRect.width;
                    const ch = entry.contentRect.height;
                    const scale = Math.max(
                        (ch * videoRatio) / cw,
                        cw / (ch * videoRatio)
                    );
                    scaleValues = {...scaleValues, video1: scale};
                }
            }
        });
        if (container1) observer.observe(container1);

        return () => observer.disconnect();
    });
</script>

<div
    bind:this={container1}
    class="w-full h-screen relative bg-gradient overflow-hidden"
>
    <iframe
        class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 pointer-events-none"
        style="transform: translate(-50%, -50%) scale({scaleValues.video1});"
        src="https://player.vimeo.com/video/1077053431?h=fa003380ac&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
        title="PPL Background Video"
        frameborder="0"
        allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>

    <!-- Dark overlay - now centered gradient instead of left-biased -->
    <div class="absolute inset-0 bg-[#250025]/60"></div>

    <!-- Centered content -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
        <div class="flex flex-col items-center text-center text-white/90 px-4 md:px-8 max-w-4xl w-full">

            <h1
                class="text-anim-parent text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3"
                style="font-family: Arial"
            >
                Purple People Labs
            </h1>

            <p class="text-base sm:text-xl md:text-2xl text-white/80 mb-2 max-w-2xl">
                Start an industry-driven &amp; NEP 2020 aligned content creators lab at your school.
            </p>

            <p class="text-xl sm:text-2xl md:text-3xl font-bold text-[#ff9900] mb-8">
                Education + Entertainment + Impact
            </p>

            <a
                href="#"
                class="animate-button text-base md:text-xl text-white px-8 md:px-10 py-3 md:py-4 rounded-xl
                       font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-primary
                       text-center uppercase inline-block"
            >
                #GoPurple
            </a>
        </div>
    </div>
</div>
