<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import Item from '$lib/components/Timeline2/Item.svelte';

    export let year = 'YEAR';
    export let items = [];

    let sectionElement;
    let yearHeader;
    let yearHeaderWrapper;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const st = ScrollTrigger.create({
            trigger: sectionElement,
            start: 'top top',
            end: 'bottom top',
            pin: yearHeaderWrapper,
            pinSpacing: false,
            anticipatePin: 1,

        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionElement,
                start: 'top top+=100px',
                end: 'center top-=500px',
                scrub: true,
            }
        });

        tl.fromTo(yearHeader,
            {
                scale: 1,
                yPercent: 0,
                opacity: 1
            },
            {
                scale: 0.15,
                yPercent: -80,
                opacity: 0.8,
                ease: 'power2.out'
            }
        );

        return () => {
            st?.kill();
            tl.scrollTrigger?.kill(); // Kill the trigger associated with the timeline
            tl.kill(); // Kill the timeline itself
        };
    });
</script>

<section bind:this={sectionElement} class="year-section relative min-h-screen bg-surface">
    <div bind:this={yearHeaderWrapper}
         class="year-header-pin-wrapper h-screen w-full absolute top-0 left-0 pointer-events-none z-10">
        <div class="h-full flex items-center justify-center">
            <h2 bind:this={yearHeader}
                class="year-header text-[25vw] md:text-[20vw] lg:text-[18vw] font-bold text-gray-200 select-none origin-center whitespace-nowrap">
                {year}
            </h2>
        </div>
    </div>

    <div class="section-content relative z-0 pt-[100vh] bg-surface">
        {#each items as item (item.title)}
            <Item title={item.title} text={item.text} imageUrl={item.imageUrl}/>
        {/each}
    </div>
</section>

<style>

    .year-header-pin-wrapper.is-pinned {
        pointer-events: none;
    }

    .year-header-pin-wrapper.is-pinned .year-header {
        pointer-events: auto;
    }

</style>