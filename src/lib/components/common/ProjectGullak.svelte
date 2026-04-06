<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import projectGullakLogo from "$lib/assets/images/Project_Gullak_Logo_Final.png";
    import {openContact} from "$lib/stores/modalStore.js";

    gsap.registerPlugin(ScrollTrigger);

    let container;

    const supporters = [
        'ESSAR Foundation',
        'Being Human – The Salman Khan Foundation',
        'BookASmile – A CSR Initiative Of BookMyShow (Now BookAChange)'
    ];

    onMount(() => {
        // Fade-in animation for content blocks
        gsap.fromTo('.gullak-content-block',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                }
            }
        );
    });
</script>

<div bind:this={container} class="w-full bg-[#250025] py-20 px-6 md:px-16 lg:px-24 relative z-[100]" id="project-gullak">

    <!-- Header -->
    <div class="gullak-content-block flex flex-col md:flex-row items-center gap-8 mb-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
            <img src={projectGullakLogo} alt="Project Gullak Logo" class="h-32 md:h-44 w-auto object-contain"/>
        </div>

        <!-- Title + tagline -->
        <div class="flex flex-col text-center md:text-left">
            <p class="text-brand-orange text-sm uppercase tracking-widest font-bold mb-2">Project Gullak</p>
            <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
                style="font-family: Arial">
                Make A Difference,<br/>
                <span class="text-[#ff9900]">One Film At A Time!</span>
            </h2>
            <p class="text-white/70 text-base sm:text-lg max-w-xl">
                Inspired by the traditional <em class="text-white">gullak</em> (piggy bank), Project Gullak is a coherent grant for young filmmakers that nurtures real stories from rural Bharat into impactful films.
            </p>
        </div>
    </div>

    <!-- Description -->
    <div class="gullak-content-block max-w-4xl mx-auto mb-16">
        <p class="text-white/80 text-base sm:text-lg leading-relaxed text-center md:text-left">
            With support from our school projects and CSR partners, we organize filmmaking workshops &amp; educational film tours for children across unique villages, NGOs or communities. Films made by children are then screened across various schools and festivals to create awareness and invite support to sustain developmental projects for the same NGO/community.
        </p>
    </div>

    <!-- Divider -->
    <div class="gullak-content-block w-full max-w-4xl mx-auto mb-16">
        <div class="h-px bg-white/10 w-full"></div>
    </div>

    <!-- Supporters -->
    <div class="gullak-content-block max-w-4xl mx-auto">
        <p class="text-xs uppercase tracking-widest font-bold text-brand-orange mb-6 text-center md:text-left">
            Supported By
        </p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
            {#each supporters as name}
                <div class="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white/80 text-sm text-center">
                    {name}
                </div>
            {/each}
        </div>
    </div>

    <!-- Bottom CTA / Contact prompt -->
    <div class="gullak-content-block mt-20 flex flex-col items-center text-center gap-4">
        <p class="text-white/50 text-sm uppercase tracking-widest">Want to partner with us?</p>
        <h3 class="text-3xl sm:text-4xl font-bold text-white">Edutainment With A Purpose</h3>
        <button on:click|preventDefault={openContact}
           class="mt-4 px-8 py-3 rounded-xl bg-primary text-white font-bold text-lg uppercase tracking-wide
                  hover:bg-primary/80 transition-colors duration-200">
            Contact Us
        </button>
    </div>
</div>
