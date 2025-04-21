<script>
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import yif_logo from "$lib/assets/images/YIF_logo_final.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import evidyaLogo from "$lib/assets/images/evidyaLogo.png";
    import ecatvlogo2 from "$lib/assets/images/ecatv.png";
    import projectGulak from "$lib/assets/images/Project_Gullak_Logo_Final.png";
    import {onMount} from 'svelte';
    import {gsap} from 'gsap';

    let expanded = false;
    // list of additional logos
    const logos = [
        yif_logo,
        swadeshplex,
        kiddinglogo,
        evidyaLogo,
        ecatvlogo2,
        projectGulak
    ];

    // refs array for bind:this
    let logoEls = Array(logos.length).fill(null);

    function toggle() {
        expanded = !expanded;
        if (expanded) {
            // animate logos into view
            gsap.fromTo(
                logoEls,
                {y: 0, opacity: 0},
                {y: (i) => (i + 1) * 64, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out'}
            );
        } else {
            // animate logos back to hidden
            gsap.to(
                logoEls,
                {y: 0, opacity: 0, duration: 0.2, stagger: {each: 0.04, from: 'end'}, ease: 'power2.in'}
            );
        }
    }
</script>

<!-- mobile only: show primary logo, expand on click -->
<div class="block lg:hidden relative z-50">
    <!-- trigger logo -->
    <img
            src="{PPLlogo}"
            alt="PPL labs Logo"
            class="h-12 w-12 m-4 rounded-full cursor-pointer shadow-lg"
            on:click={toggle}
    />

    {#if expanded}
        <!-- overlay blur + darken -->
        <div
                class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md"
                on:click={toggle}
        ></div>

        <!-- stacked logo list -->
        <div class="fixed top-4 left-4 flex flex-col items-start z-50">
            {#each logos as src, i}
                <img
                        bind:this={logoEls[i]}
                        src="{src}"
                        alt="Logo {i + 2}"
                        class="h-12 w-12 my-2 rounded-full shadow-lg opacity-0"
                />
            {/each}
        </div>
    {/if}
</div>
