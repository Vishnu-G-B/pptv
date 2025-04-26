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
            anticipatePin: 1
        });


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionElement,
                start: 'top top+=10%',
                end: 'top top-=150',
                scrub: 1,
            }
        })
            .to(yearHeader, {
                scale: 0.15,
                y: '-10vh',
                opacity: 0.8,
                ease: 'power1.inOut'
            });


        return () => {
            st?.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    });
</script>

<section bind:this={sectionElement} class="year-section relative min-h-screen">
    <div bind:this={yearHeaderWrapper}
         class="year-header-pin-wrapper h-screen w-full absolute top-0 left-0 pointer-events-none z-10">
        <div class="h-full flex items-start justify-center">
            <h2 bind:this={yearHeader}
                class="year-header text-[25vw] md:text-[20vw] lg:text-[18vw] font-bold text-gray-200 select-none origin-center whitespace-nowrap">
                {year}
            </h2>
        </div>
    </div>

    <div class="section-content relative z-0 pt-[100vh]">
        {#each items as item (item.title)}
            <Item title={item.title} text={item.text} imageUrl={item.imageUrl}/>
        {/each}
    </div>
</section>

<style>
    .section-content {
        background-color: white;
    }
</style>