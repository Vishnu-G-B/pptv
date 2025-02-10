<script>
    import {onMount} from 'svelte';
    import gsap from 'gsap';
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import evidyaLogo from "$lib/assets/images/evidya.jpeg";
    import kiddinglogo from "$lib/assets/images/kiddingbharat.png";
    import ecatvlogo from "$lib/assets/images/ecatv.jpeg";
    import yiflogo from "$lib/assets/images/YIF logo.png";
    import crewstorylogo from "$lib/assets/images/crewstory.jpeg";
    import {goto} from "$app/navigation";

    let contentContainer;
    let mainHeading;
    let subHeading;
    let tagline;
    let buttons;

    onMount(() => {
        const tl = gsap.timeline({defaults: {ease: "power3.out"}});

        gsap.fromTo(
            ".navAnim",
            {
                opacity: 0,
                y: 30,
                rotationX: 90,
                transformOrigin: "bottom center"
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 2,
                ease: "expo.out",
                stagger: 0.1
            }
        );

        tl.from(contentContainer, {
            opacity: 0,
            duration: 1
        })
            .from(mainHeading, {
                y: 50,
                opacity: 0,
                duration: 0.8
            })
            .from(
                subHeading,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.8
                },
                "-=0.6"
            )
            .from(
                tagline,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8
                },
                "-=0.6"
            )
            .from(
                buttons.children,
                {
                    y: 20,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.5
                },
                "-=0.4"
            );

        // Hover animation for buttons
        gsap.utils.toArray('.animate-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    });

    const handleClick = () => {
        goto('/purpletv');
    };
</script>

<div class="w-full h-screen relative bg-gradient overflow-hidden">
    <video
            class="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoplay
            loop
            muted
            playsinline>
        <source src="{LandingVid}" type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
    <div class="absolute inset-0 bg-gradient-to-r from-[#250025]/90 to-[#250025]/0"></div>

    <div class="h-fit w-full absolute top-0 left-0 flex justify-start items-center gap-[1vw] py-[1vh] px-[2vw]">
        <div class="navAnim h-[12vh] min-[426px]:h-[15vh] w-auto bg-transparent rounded-full">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"/>
        </div>
        <div class="navAnim h-[8vh] w-[8vh] min-[426px]:h-[9vh] min-[426px]:w-[9vh] bg-black rounded-full">
            <img src="{evidyaLogo}" alt="Evidya Logo" class="object-cover h-full w-full rounded-full"/>
        </div>
        <div class="navAnim h-[8vh] min-[426px]:h-[9vh] w-auto bg-black rounded-full">
            <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-contain h-full w-full"/>
        </div>
        <div class="navAnim h-[8vh] w-[8vh] min-[426px]:h-[9vh] min-[426px]:w-[9vh] bg-black rounded-full">
            <img src="{ecatvlogo}" alt="Ecatv Logo" class="object-cover h-full w-full rounded-full"/>
        </div>
        <div class="navAnim h-[8vh] min-[426px]:h-[9vh] w-auto bg-black rounded-full">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"/>
        </div>
        <div class="navAnim h-[8vh]  min-[426px]:h-[8vh] w-auto bg-black rounded-full">
            <img src="{crewstorylogo}" alt="Crewstory Logo" class="object-cover h-full w-full rounded-full"/>
        </div>
    </div>

    <div
            class="absolute inset-0 flex items-end justify-start z-10 mb-4 md:mb-[2.5rem]"
            bind:this={contentContainer}>
        <div class="max-w-3xl p-4 md:p-8 rounded-lg primary-font">
            <h1
                    class="text-xl md:text-[1.8rem] font-bold text-[#ff9900] mb-2 md:mb-4 leading-tight"
                    bind:this={mainHeading}
                    style="font-family: Arial">
                Edutainment With A Purpose @ ONE Rupee*
            </h1>
            <h2
                    class="text-base md:text-lg text-white/90 mb-4 md:mb-6 text-justify"
                    bind:this={subHeading}>
                We are a Conscious OTT Platform for K to 12 schools committed to produce and promote impactful cinema,
                educational content & curriculum.<br/><br/>
                Our mission is to support the Ministry Of Education’s PM eVIDYA initiative aligned with NEP 2020, for 25
                Crore school going children and their families <br/>
                at Just ONE Rupee*. #ONEderful #GoPurple
            </h2>
            <p
                    class="text-base md:text-lg text-white/80 mb-4 md:mb-8 text-[#6aa84f] text-justify"
                    bind:this={tagline}
                    style="font-family: Arial">
        <span class="text-lg md:text-[1.6rem] font-bold tracking-[0.040em] text-[#6aa84f]">
          Watch - Learn - Create - Impact
        </span>
                <br/>
                <span class="capitalize text-2xl md:text-5xl font-bold text-[#6aa84f]">
          Make A Difference
        </span>
            </p>
            <!-- Button -->
            <div class="flex flex-col sm:flex-row gap-2 md:gap-4" bind:this={buttons}>
                <button
                        class="animate-button text-base md:text-3xl text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-[#660066]"
                        on:click={handleClick}>
                    #GoPurple
                </button>
            </div>
        </div>
    </div>
</div>
