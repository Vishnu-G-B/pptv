<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import Section from '$lib/components/Timeline2/Section.svelte';

    export let data = []; // The timeline data array

    let timelineContainer;
    let progressBar;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const progressST = ScrollTrigger.create({
            trigger: timelineContainer,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                gsap.to(progressBar, {height: `${self.progress * 100}%`, ease: 'none', duration: 0.1});
            },
        });

        ScrollTrigger.refresh();

        return () => {
            progressST?.kill();
        };
    });

</script>

<div bind:this={timelineContainer} class="timeline-container relative w-full">

    <div class="progress-bar-container fixed top-0 left-0 h-screen w-2 bg-gray-200 z-50">
        <div bind:this={progressBar} class="progress-bar-fill h-0 w-full bg-blue-500"></div>
    </div>

    <div class="sections-wrapper ml-2">
        {#each data as sectionData (sectionData.year)}
            <Section year={sectionData.year} items={sectionData.items}/>
        {/each}
    </div>

</div>