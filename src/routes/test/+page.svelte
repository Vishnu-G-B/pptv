<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    // import SimpleParallax from "simple-parallax-js/vanilla";
    // import {browser} from "$app/environment";

    import image1 from "$lib/assets/images/1_PPL OTT.jpg"

    gsap.registerPlugin(ScrollTrigger);

    export let images = [
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
        {src: image1, alt: "Image 1"},
    ];
    export let title = "Image Gallery";

    let imageElements = [];

    onMount(() => {
        // if (browser) {
        //     let images = document.querySelectorAll('img');
        //     new SimpleParallax(images);
        // }

        imageElements.forEach((el) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 80
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    });

    // Create a fixed layout with the specific pattern
    function createFixedLayout() {
        const placements = [];
        let currentImageIndex = 0;

        // Calculate how many complete sets we need
        // Each set consists of 7 images (2 in first row + 2 in second row + 3 in third row)
        const totalSets = Math.ceil(images.length / 7);

        for (let set = 0; set < totalSets; set++) {
            // First row: Images in columns 1 and 3
            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3,
                    col: 0, // First column
                    marginLeft: '0px',
                    marginRight: '0px'
                });
            }

            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3,
                    col: 2, // Third column
                    marginLeft: '0px',
                    marginRight: '0px'
                });
            }

            // Second row: Images in columns 1 and 3 with margins pushing toward center
            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3 + 1,
                    col: 0,
                    marginLeft: '0px',
                    marginRight: '-30vw'
                });
            }

            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3 + 1,
                    col: 2,
                    marginLeft: '-30vw',
                    marginRight: '0px'
                });
            }

            // Third row: Images in all three columns
            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3 + 2,
                    col: 0, // First column
                    marginLeft: '0px',
                    marginRight: '0px'
                });
            }

            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3 + 2,
                    col: 1, // Second column
                    marginLeft: '0px',
                    marginRight: '0px'
                });
            }

            if (currentImageIndex < images.length) {
                placements.push({
                    imageIndex: currentImageIndex++,
                    row: set * 3 + 2,
                    col: 2, // Third column
                    marginLeft: '0px',
                    marginRight: '0px'
                });
            }
        }

        return placements;
    }

    const placements = createFixedLayout();
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-gray-50">
    <h2 class="text-4xl font-bold mb-12 text-center">{title}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-fit mx-auto">
        {#each placements as placement, i}
            {#if placement.imageIndex < images.length}
                {@const image = images[placement.imageIndex]}
                <div
                        class="relative flex justify-center items-center"
                        style="grid-row: {placement.row + 1}; grid-column: {placement.col + 1}; margin-right: {placement.marginRight}; margin-left: {placement.marginLeft};"
                        bind:this={imageElements[i]}
                >
                    <div class="w-[400px] h-[225px] overflow-hidden rounded-lg shadow-lg">
                        <img
                                src={image.src}
                                alt={image.alt || `Gallery image ${placement.imageIndex+1}`}
                                class="w-full h-full object-cover"
                        />
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</section>