<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap/dist/gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Props to accept dynamic array of images
    export let images = [];
    export let title = "Image Gallery";

    // Reference to image elements for animations
    let imageElements = [];

    onMount(() => {
        // Set up parallax effect for each image
        imageElements.forEach((el, index) => {
            // Create parallax effect with varying speeds
            gsap.to(el, {
                y: () => (index % 2 === 0 ? 50 : -50), // Alternate parallax direction
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5, // Smooth scrolling effect
                }
            });

            // Fade-in animation when image enters viewport
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%", // Start animation when image is 90% in viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    });

    // Function to determine the span and placement classes for each image
    function getImageClasses(index) {
        // Base classes for all images
        let classes = "rounded-lg overflow-hidden shadow-lg transition-transform duration-500";

        // Randomize image sizes based on index
        if (index % 7 === 0) {
            // Large image spanning two columns
            classes += " col-span-2 row-span-2";
        } else if (index % 5 === 0) {
            // Medium image that's taller
            classes += " col-span-1 row-span-2";
        } else if (index % 3 === 0) {
            // Medium image that's wider
            classes += " col-span-2 row-span-1";
        } else {
            // Standard size
            classes += " col-span-1 row-span-1";
        }

        // Add margin variations
        if (index % 4 === 0) {
            classes += " -mt-8";
        } else if (index % 6 === 1) {
            classes += " mt-16";
        } else if (index % 5 === 2) {
            classes += " -mt-4";
        }

        // Add some horizontal offset for certain images
        if (index % 3 === 1) {
            classes += " ml-6";
        } else if (index % 4 === 2) {
            classes += " -ml-4";
        }

        return classes;
    }
</script>

<section class="py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
    <h2 class="text-4xl font-bold mb-12 text-center">{title}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {#each images as image, i}
            <div
                    class={getImageClasses(i)}
                    bind:this={imageElements[i]}
            >
                <img
                        src={image.src}
                        alt={image.alt || `Gallery image ${i+1}`}
                        class="w-full h-full object-cover"
                />
            </div>
        {/each}
    </div>
</section>