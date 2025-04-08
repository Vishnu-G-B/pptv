<script>
    import {onMount, onDestroy} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
    import temp1 from "$lib/assets/images/1_PPL OTT.jpg";
    import temp2 from "$lib/assets/images/2B_KAB.png";
    import temp3 from "$lib/assets/images/5_School Studio.png";
    import temp4 from "$lib/assets/images/4_YIF.webp";
    import temp5 from "$lib/assets/images/2_KAB.png";

    gsap.registerPlugin(ScrollTrigger);

    export let items = ["SwadeshPlex", "Young India Filmmakers", "Kidding Around Bharat", "PM eVidya School Studio"];
    export let paragraphs = [
        "A Conscious OTT platform streaming impactful & educational content starting @ Just ONE Rupee",
        "A filmmaking festival for children  amplifying young voices from rural and urban communities across India",
        "Community Filmmaking Tours to villages, artisans, start-ups  & changemakers across India capturing real stories on reel",
        "A capacity building program for the Ministry Of Education’s PM eVIDYA initiative including studio design, teacher training and co-production of curriculum based content in regional languages.",
    ];
    export let isNarrow = false;
    export let backgroundImages = [
        temp1,
        temp4,
        temp2,
        temp3,
        // temp5
    ];

    let container;
    let wordItems;
    let paragraphItems;
    let mainTimeline;
    let charTimeline;
    let bgTimeline;
    let paragraphTimeline;
    let headerTimeline;
    let bgImages;
    let mediaMatch;

    // Helper to return fade-in and fade-out offsets based on word index and total count.
    function getOffsets(index, total) {
        if (total === 3) {
            const offsets = [
                {fadeIn: 15, fadeOut: 23.5},
                {fadeIn: 25, fadeOut: 32},
                {fadeIn: 34.5, fadeOut: 40}
            ];
            return offsets[index];
        }
        if (total === 4) {
            const offsets = [
                {fadeIn: 20, fadeOut: 35},
                {fadeIn: 40, fadeOut: 60},
                {fadeIn: 65, fadeOut: 75},
                {fadeIn: 85, fadeOut: 100}
            ];
            return offsets[index];
        }
        const base = 10;
        const step = 25;
        const duration = 15;
        return {
            fadeIn: base + index * step,
            fadeOut: base + index * step + duration
        };
    }

    onDestroy(() => {
        if (mainTimeline) mainTimeline.kill();
        if (charTimeline) charTimeline.kill();
        if (bgTimeline) bgTimeline.kill();
        if (paragraphTimeline) paragraphTimeline.kill();
        if (mediaMatch) mediaMatch.kill();
    });

    function setPositions(spacing) {
        const numWords = wordItems.length;
        const zPos = numWords * spacing * 2;
        const angle = 360 / (numWords * 4);
        const transformOrigin = `50% 50% -${zPos}px`;
        const initalRotation = angle * 0.5;

        gsap.set(wordItems, {rotationX: initalRotation});
        wordItems.forEach((item, i) => {
            gsap.set(item, {
                z: zPos,
                rotationX: initalRotation - angle * (i * 1.5),
                transformOrigin
            });
        });

        return {angle, numWords};
    }

    function initMainTimeline({angle, numWords}) {
        mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        mainTimeline.to(wordItems, {
            rotationX: `+=${(numWords) * angle}`,
            force3D: true,
            duration: items.length,
            ease: 'power1.inOut'
        });
    }

    function initCharacterTimeline() {
        charTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        });

        charTimeline.addLabel("start");

        const total = wordItems.length;
        wordItems.forEach((wordItem, index) => {
            const chars = [...wordItem.querySelectorAll('.char')];
            gsap.set(chars, {
                y: 100,
                rotateX: -90,
                opacity: 0
            });

            const {fadeIn, fadeOut} = getOffsets(index, total);
            charTimeline.fromTo(
                chars,
                {y: 100, autoAlpha: 0, rotateX: -90},
                {
                    y: 0,
                    stagger: 0.3,
                    rotateX: 0,
                    autoAlpha: 1,
                    ease: 'none',
                    duration: 2
                },
                `start+=${fadeIn}`
            ).to(
                chars,
                {
                    stagger: 0.5,
                    autoAlpha: 0,
                    rotateX: 90,
                    ease: 'none',
                    y: 0,
                    duration: 2
                },
                `start+=${fadeOut}`
            ).to(
                ".headingDiv",
                {
                    stagger: 0.5,
                    autoAlpha: 0,
                    rotateX: 90,
                    ease: 'none',
                    y: 0,
                    duration: 2
                },
                "<"
            )
        });
    }

    function initParagraphTimeline() {
        paragraphTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        });

        paragraphTimeline.addLabel("start");

        const total = paragraphItems.length;
        paragraphItems.forEach((paragraph, index) => {
            const {fadeIn, fadeOut} = getOffsets(index, total);

            gsap.set(paragraph, {opacity: 0});

            paragraphTimeline
                .fromTo(
                    paragraph,
                    {opacity: 0},
                    {opacity: 1, duration: 2, ease: "power1.inOut"},
                    `start+=${fadeIn}`
                )
                .to(
                    paragraph,
                    {opacity: 0, duration: 2, ease: "power1.inOut"},
                    `start+=${fadeOut}`
                );
        });
    }

    function initBgTimeline() {
        bgTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true
            }
        });

        bgTimeline.addLabel("start");

        const total = wordItems.length;
        bgImages.forEach((img, index) => {
            const {fadeIn, fadeOut} = getOffsets(index, total);
            if (index === 0) {
                bgTimeline
                    // .fromTo(
                    //     img,
                    //     {opacity: 0},
                    //     {opacity: 1, duration: 5, ease: "power1.inOut"},
                    //     `start+=${fadeIn}`
                    // )
                    // .fromTo(
                    //     '.words-carousel__filter',
                    //     {opacity: 0},
                    //     {opacity: 1, duration: 5, ease: "power1.inOut"},
                    //     '<'
                    // )
                    .to(
                        img,
                        {opacity: 0, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            } else if (index === 2) {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn - 5}`
                    )
                    .to(
                        img,
                        {opacity: 1, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            } else if (index === 3) {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn}`
                    )
                    .to(
                        img,
                        {opacity: 1, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            } else {
                bgTimeline
                    .fromTo(
                        img,
                        {opacity: 0},
                        {opacity: 1, duration: 2, ease: "power1.inOut"},
                        `start+=${fadeIn}`
                    )
                    .to(
                        img,
                        {opacity: 0, duration: 2, ease: 'none'},
                        `start+=${fadeOut + 7}`
                    );
            }
        });
    }

    function initMediaQueries() {
        mediaMatch = gsap.matchMedia();

        mediaMatch.add('(max-width: 767px)', () => {
            const params = setPositions(60);
            initMainTimeline(params);
        });

        mediaMatch.add('(min-width: 768px)', () => {
            const params = setPositions(150);
            initMainTimeline(params);
        });
    }

    function initHeaderTimeline() {
        gsap.set(".movingHeader", {y: "0%"});
        gsap.set(".movingHeader2", {y: "100%"});

        headerTimeline = gsap.timeline({repeat: -1});
        headerTimeline
            .to(".movingHeader", {
                y: "-100%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
                delay: 1,
            })
            .to(".movingHeader2", {
                y: "0%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
            }, "<")
            .to(".movingHeader", {
                y: "0%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
                delay: 1,
            })
            .to(".movingHeader2", {
                y: "100%",
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.inOut",
            }, "<");
    }

    onMount(() => {
        // wordItems = container.querySelectorAll('.words-carousel__item');
        // paragraphItems = container.querySelectorAll('.paragraph-item');
        // bgImages = container.querySelectorAll('.bg-image');
        // initMediaQueries();
        // initCharacterTimeline();
        // initBgTimeline();
        // initParagraphTimeline();
        initHeaderTimeline();
    });
</script>

<div class="headingDiv sticky top-1/2 left-1/2 transform-gpu  -translate-y-1/2 text-center
                h-screen w-full z-[0] flex flex-col justify-center items-center gap-0 capitalize
                xl:text-8xl 2xl:text-9xl brand-font font-bold text-brand-orange italic">
    <span class="capitalize">OUR</span>
    <div class="m-0 p-0 -tracking-[0.13em] h-[130px] w-full flex flex-col justify-center items-center
                    relative overflow-hidden">
        <div class="movingHeaderContainer absolute text-brand-green">
            <span class="movingHeader -mr-4">A</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">w</span>
            <span class="movingHeader">-</span>
            <span class="movingHeader">f</span>
            <span class="movingHeader">f</span>
            <span class="movingHeader">e</span>
            <span class="movingHeader">r</span>
            <span class="movingHeader">i</span>
            <span class="movingHeader">n</span>
            <span class="movingHeader">g</span>
            <span class="movingHeader">s</span>
        </div>
        <div class="movingHeaderContainer2 absolute text-primary">
            <span class="movingHeader2 -mr-4">A</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">w</span>
            <span class="movingHeader2">-</span>
            <span class="movingHeader2">f</span>
            <span class="movingHeader2">f</span>
            <span class="movingHeader2">e</span>
            <span class="movingHeader2">r</span>
            <span class="movingHeader2">i</span>
            <span class="movingHeader2">n</span>
            <span class="movingHeader2">g</span>
            <span class="movingHeader2">s</span>
        </div>
    </div>
</div>
<!--<div class="words-carousel relative {isNarrow ? 'h-[300vh] lg:-mt-[25vh]' : 'h-[450vh]'} bg-background mt-4 -mb-[18rem]"-->
<!--     bind:this={container}>-->
<!--    <div class="words-carousel__bg sticky top-1/2 left-1/2-->
<!--                transform -translate-x-3 sm:-translate-x-8 -translate-y-1/2-->
<!--                w-[95vw] h-[95vh] overflow-hidden">-->
<!--        {#each items as _, i}-->
<!--            <img-->
<!--                    src={backgroundImages[i]}-->
<!--                    alt=""-->
<!--                    class="bg-image h-full w-full absolute inset-0 object-cover opacity-0 rounded-xl"-->
<!--                    style="opacity: {i === 0 ? 1 : 0};"-->
<!--            />-->
<!--        {/each}-->
<!--        <div class="words-carousel__filter absolute inset-0 bg-[#250025]/70 rounded-xl"></div>-->
<!--    </div>-->

<!--    <div class="words-carousel__inner sticky top-1/2 transform -translate-y-1/2 h-screen flex items-center-->
<!--                justify-center perspective-[150rem] text-white">-->
<!--        &lt;!&ndash;        <div class="paragraphs-container absolute top-1/2 lef mt-8 w-full">&ndash;&gt;-->
<!--        &lt;!&ndash;            {#each paragraphs as paragraph, index}&ndash;&gt;-->
<!--        &lt;!&ndash;                <p class="paragraph-item absolute top-0 left-0 w-full text-center text-lg md:text-2xl opacity-0&ndash;&gt;-->
<!--        &lt;!&ndash;                              text-white font-light mx-auto max-w-lg px-4"&ndash;&gt;-->
<!--        &lt;!&ndash;                   style="opacity: {index === 0 ? 1 : 0};">&ndash;&gt;-->
<!--        &lt;!&ndash;                    {paragraph}&ndash;&gt;-->
<!--        &lt;!&ndash;                </p>&ndash;&gt;-->
<!--        &lt;!&ndash;            {/each}&ndash;&gt;-->
<!--        &lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="flex flex-col items-center justify-center relative">-->
<!--            <ul class="words-carousel__list relative w-[50vw] h-[50vw] transform-style-preserve-3d origin-[50%_50%]">-->
<!--                {#each items as item, index}-->
<!--                    <li class="words-carousel__item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2-->
<!--                            text-center w-[95vw] text-[2rem] md:text-[5rem] backface-hidden font-bold-->
<!--                            text-white flex flex-col items-center justify-center"-->
<!--                    >-->
<!--                        <div class="single-line">-->
<!--                            {#each item.split('') as char}-->
<!--                                <span class="char inline-block">{char}</span>-->
<!--                            {/each}-->
<!--                        </div>-->
<!--                        <div class="paragraph-item w-full text-center text-lg md:text-2xl opacity-0-->
<!--                              text-white font-light mx-auto max-w-2xl "-->
<!--                             style="opacity: {index === 0 ? 1 : 0};">-->
<!--                            {paragraphs[index]}-->
<!--                        </div>-->
<!--                    </li>-->
<!--                {/each}-->
<!--            </ul>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<style>
    :global(.backface-hidden) {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .single-line {
        display: inline-block;
        white-space: nowrap;
    }

    .movingHeader,
    .movingHeader2 {
        display: inline-block;
    }


</style>