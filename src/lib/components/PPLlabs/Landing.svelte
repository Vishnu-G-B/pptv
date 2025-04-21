<script>
    import {onMount} from 'svelte';
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {goto} from "$app/navigation";
    import SplitType from "split-type";

    gsap.registerPlugin(ScrollTrigger);

    let container1;
    let scaleValues = {video1: 1};
    const videoRatio = 16 / 9;

    onMount(() => {
        const tl = gsap.timeline({defaults: {ease: "power3.out"}});

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

    const handleClick = () => {
        goto('/purpletv');
    };
</script>

<div
        bind:this={container1}
        class="w-full h-screen relative bg-gradient overflow-hidden"
>
    <iframe
            class="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 pointer-events-none"
            style="transform: translate(-50%, -50%) scale({scaleValues.video1});"
            src="https://player.vimeo.com/video/1077053431?h=fa003380ac&amp;background=1&amp;loop=1&amp;transparent=0&amp;byline=0&amp;title=0&amp;portrait=0"
            title="YIF Video"
            frameborder="0"
            allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
    ></iframe>

    <div class="absolute inset-0 bg-gradient-to-r from-[#250025]/90 to-[#250025]/0"></div>

    <div class="absolute inset-0 flex items-center justify-start z-10 mb-4">
        <div class="p-2 md:p-8 rounded-lg flex flex-col w-full sm:w-[60%] text-white/90">
            <h1
                    class="text-lg sm:text-4xl font-bold text-[#ff9900]"
                    style="font-family: Arial"
            >
                Edutainment With A Purpose
            </h1>

            <h2 class="text-lg sm:text-2xl mb-4">
                Watch Impactful Films
                <span class="text-brand-green font-extrabold">@ONE Rupee</span>
            </h2>

            <p class="text-left text-lg sm:text-xl mb-4">
                We are a Conscious OTT Platform committed to produce and promote impactful cinema.
            </p>

            <p class="text-left text-lg sm:text-xl">
                Our film and media skills curriculum empower schools, teachers and 6 to 18 year old children to explore
                the power of digital storytelling to change the world, one film at a time! #GoPurple
            </p>
            <div class="flex flex-col sm:flex-row gap-2 md:gap-4 mt-5">
                <button
                        class="animate-button text-base md:text-2xl text-white px-4 md:px-4 py-2 md:py-3 rounded-xl
                                font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-primary
                                text-center uppercase"
                        on:click={handleClick}>
                    Subscribe
                </button>
            </div>
        </div>
    </div>
</div>
