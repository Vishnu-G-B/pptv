<script>
    import Card3D from "$lib/components/common/Card3D.svelte";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {Flip} from "gsap/dist/Flip";
    import {TextPlugin} from "gsap/dist/TextPlugin";

    // Vimeo placeholder — same ID used in BentoBox
    const VIMEO_PLACEHOLDER = '1072992217';

    const imageModules = import.meta.glob('$lib/assets/images/top10Posters/*', {
        eager: true,
        as: 'url'
    });

    const movieCardsPosters = Object.values(imageModules);

    let movieCardsHeading = [];
    for (let url of Object.keys(imageModules)) {
        let split = url.split('/');
        movieCardsHeading.push(split[split.length - 1].split('.')[0].replaceAll('_', ' ').trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '));
    }

    let totalMovieCards = movieCardsHeading.length;
    let currentIndex = 0;
    let currentIndexMovieCarousel = 0;
    let movieCarouselNotAnimating = true;
    let playingIndex = -1; // which card is playing video

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(Flip);
        gsap.registerPlugin(TextPlugin);

        for (let i = 0; i < totalMovieCards; i++) {
            gsap.to(`.movie-card-${i + 1}`, {
                x: `${100 * i}%`,
                opacity: `${i === 0 ? 1 : 0.7}`,
                scale: `${i === 0 ? 1 : 0.9}`,
            });
        }

        let wonderfullHeadingTimeline = gsap.timeline({
            onComplete: () => { setTimeout(() => { wonderfullHeadingTimeline.reverse(); }, 1000); },
            onReverseComplete: () => { setTimeout(() => { wonderfullHeadingTimeline.play(); }, 1000); }
        });
        wonderfullHeadingTimeline.to('.wonderfull-text', { y: '-100%', ease: 'sine', stagger: -0.05 });
        wonderfullHeadingTimeline.to('.wonderfull-text-part-2', { y: '0%', ease: 'sine', stagger: 0.05 }, '<+=0.5');

        let wonderfullCoverTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#wonderfull-poster-div',
                start: 'top bottom',
                end: 'top 60%',
                scrub: true,
                markers: false,
            }
        });
        wonderfullCoverTimeline.to('#wonderfull-cover-div', { opacity: 1 });
    });

    function getTranslatePercentage(element) {
        const transformValue = window.getComputedStyle(element[0]).transform;
        const w = window.getComputedStyle(element[0]).width;
        const h = window.getComputedStyle(element[0]).height;
        var matrix = new WebKitCSSMatrix(transformValue);
        const style = window.getComputedStyle(element[0]);
        const rotationMatrix = style.transform || style.webkitTransform || style.mozTransform;
        let angle;
        if (rotationMatrix === 'none') { angle = 0; }
        else {
            const values = rotationMatrix.split('(')[1].split(')')[0].split(',');
            angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        }
        return {
            x: matrix.m41 / parseInt(w) * 100,
            y: matrix.m42 / parseInt(h) * 100,
            rotation: angle,
        };
    }

    function movieCarouselLeft() {
        if (currentIndexMovieCarousel >= 1 && movieCarouselNotAnimating) {
            let movieTimeline = gsap.timeline({
                onComplete: () => { movieCarouselNotAnimating = true; },
                onStart: () => { movieCarouselNotAnimating = false; }
            });
            for (let i = 0; i < totalMovieCards; i++) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, { x: `${translateValues.x + 100}%`, opacity: 0.75, scale: 0.9 }, '<');
            }
            movieTimeline.to(`.movie-card-${currentIndexMovieCarousel}`, { opacity: 1, scale: 1 }, '<');
            currentIndexMovieCarousel--;
        }
    }

    function movieCarouselRight() {
        if (currentIndexMovieCarousel < totalMovieCards - 1 && movieCarouselNotAnimating) {
            currentIndexMovieCarousel++;
            let movieTimeline = gsap.timeline({
                onComplete: () => { movieCarouselNotAnimating = true; },
                onStart: () => { movieCarouselNotAnimating = false; }
            });
            for (let i = currentIndexMovieCarousel - 1; i >= 0; i -= 1) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, { x: `${translateValues.x - 100}%`, opacity: 0.75, scale: 0.9 }, '<');
            }
            for (let i = currentIndexMovieCarousel; i < totalMovieCards; i++) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, { x: `${translateValues.x - 100}%` }, '<');
                movieTimeline.to(`.movie-card-${currentIndexMovieCarousel + 1}`, { opacity: 1, scale: 1 }, '<');
            }
        }
    }

    function toggleVideo(index) {
        playingIndex = playingIndex === index ? -1 : index;
    }

    $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth/>

<div class="min-h-screen h-fit w-full flex flex-col relative bg-background wonderfull-trigger items-start justify-start pt-5">

    <!-- Mobile heading -->
    <p class="brand-font text-4xl md:text-5xl font-bold lg:hidden text-left px-5 text-primary w-full lg:text-7xl group">
        Our <span class="text-brand-orange relative">ONEderfull <span
            class="hidden lg:block absolute bottom-1 w-full h-[9px] bg-primary left-0"></span></span>
        Watchlist
    </p>

    <!-- Desktop sticky heading -->
    <div class="h-screen w-full flex-col items-center justify-center hidden lg:flex gap-2 sticky top-0">
        <div class="absolute top-0 h-full w-full backdrop-blur-lg opacity-0" id="wonderfull-cover-div"></div>
        <p class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-primary">OUR</p>
        <div class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-brand-orange relative italic overflow-hidden flex flex-row">
            <div class="relative overflow-visible">
                <p class="opacity-0">WONDERFULL</p>
            </div>
            <div class="flex flex-row h-fit overflow-hidden absolute">
                <span class="wonderfull-text-1 wonderfull-text">O</span><span class="wonderfull-text-2 wonderfull-text">N</span><span class="wonderfull-text-3 wonderfull-text">E</span><span class="wonderfull-text-4 wonderfull-text">D</span><span class="wonderfull-text-5 wonderfull-text">E</span><span class="wonderfull-text-6 wonderfull-text">R</span><span class="wonderfull-text-7 wonderfull-text">F</span><span class="wonderfull-text-8 wonderfull-text">U</span><span class="wonderfull-text-9 wonderfull-text">L</span><span class="wonderfull-text-10 wonderfull-text">L</span>
            </div>
            <div class="flex flex-row h-fit overflow-hidden absolute text-brand-green">
                <span class="wonderfull-text-part-2 translate-y-[100%]">W</span><span class="wonderfull-text-part-2 translate-y-[100%]">O</span><span class="wonderfull-text-part-2 translate-y-[100%]">N</span><span class="wonderfull-text-part-2 translate-y-[100%]">D</span><span class="wonderfull-text-part-2 translate-y-[100%]">E</span><span class="wonderfull-text-part-2 translate-y-[100%]">R</span><span class="wonderfull-text-part-2 translate-y-[100%]">F</span><span class="wonderfull-text-part-2 translate-y-[100%]">U</span><span class="wonderfull-text-part-2 translate-y-[100%]">L</span><span class="wonderfull-text-part-2 translate-y-[100%]">L</span>
            </div>
        </div>
        <p class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-primary">WATCHLIST</p>

        <!-- New watchlist text from doc -->
        <div class="flex flex-row w-full gap-5 px-10 mt-10 max-w-[1100px]">
            <div class="w-full flex flex-col items-center justify-start p-1">
                <p class="text-lg xl:text-xl text-primary font-bold italic text-center w-full mb-2">
                    Our Wonderful Watchlist
                </p>
                <p class="text-base font-light text-surface w-full text-center">
                    Since 2012, our Film Pedagogy programs at Purple People Labs have mentored children and teachers to create purpose-driven cinema as young content creators. Our films have featured on PM Vidya Channels of Ladakh and won accolades at International Film Festivals including the Seattle International Film Festival, I&amp;B Ministry's – The Golden Elephant, MICE Film Festival Venice, Miami International Film Festival &amp; the prestigious Cannes 2025.
                </p>
                <p class="text-base font-light text-surface w-full text-center mt-3">
                    Soon, these remarkable films will be available for viewing on our upcoming impact OTT platform, Swadeshplex, accessible at Just ₹1 — because we believe in the ONEders of One! One Idea, One Story, One Film is all it takes to make a difference. Every rupee will be reinvested as a creative grant to support new content ideas from teachers and students.
                </p>
            </div>
        </div>
    </div>

    <!-- Mobile carousel -->
    <div class="min-h-screen h-fit lg:hidden w-full bg-background flex flex-col items-center pt-5 relative mb-[150px]">
        <div class="h-[300px] w-full flex flex-row items-center justify-center overflow-hidden absolute top-5
                    movie-cards-container z-[60]">
            {#each {length: totalMovieCards} as _, index}
                <div class="flex flex-row h-[300px] items-end justify-center absolute">
                    <div class="w-[200px] flex-shrink-0 movie-cards movie-card-{index+1} flex flex-row-reverse"
                         style="translate: translate3d({110 * index}%, 0, 0); opacity: {index === 0 ? 1 : 0.7};
                                scale: {index === 0 ? 1 : 0.9}">
                        <div class="h-full w-full">
                            <div class="h-full w-full relative overflow-hidden rounded-xl">
                                {#if playingIndex === index}
                                    <iframe
                                        class="absolute top-1/2 left-1/2 w-full h-full z-0 pointer-events-none"
                                        style="transform: translate(-50%, -50%);"
                                        src="https://player.vimeo.com/video/{VIMEO_PLACEHOLDER}?autoplay=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
                                        title="Film video"
                                        frameborder="0"
                                        allow="autoplay; fullscreen; encrypted-media"
                                        allowfullscreen
                                    ></iframe>
                                {:else}
                                    <img src="{movieCardsPosters[index]}" alt="film poster"
                                         class="w-full h-full object-cover"
                                         style="filter: {currentIndexMovieCarousel === index ? '': 'grayscale(100%) sepia(100%) hue-rotate(260deg)'};"/>
                                    <button
                                        on:click={() => toggleVideo(index)}
                                        class="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                {/if}
                                {#if playingIndex === index}
                                    <button on:click={() => toggleVideo(index)}
                                        class="absolute bottom-2 right-2 bg-black/60 rounded-full p-2 z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="bg-surface h-fit w-full mt-[150px] relative">
            <div class="relative h-[150px]">
                <svg class="absolute -top-[90%] left-0 w-full h-[150px]" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#FF9900FF" fill-opacity="1"></path>
                </svg>
                <svg class="absolute -top-[80%] left-0 w-full h-[150px]" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#250025" fill-opacity="1"></path>
                </svg>
            </div>
            <div class="h-fit bg-surface pb-7 w-full px-5 md:px-28 flex flex-col gap-5 items-center">
                <div class="flex flex-col h-fit w-fit items-center justify-center gap-2">
                    <div class="flex flex-row gap-5 z-[2] mt-5">
                        <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl flex items-center justify-center"
                                on:click={movieCarouselLeft}>
                            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <g><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/><polygon points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/></g>
                            </svg>
                            <p class="hidden">Go left</p>
                        </button>
                        <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl flex items-center justify-center"
                                on:click={movieCarouselRight}>
                            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <g><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/><polygon points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/></g>
                            </svg>
                            <p class="hidden">Go Right</p>
                        </button>
                    </div>
                </div>
                <div class="h-fit w-full">
                    <p class="brand-font font-thin text-background text-xl">
                        Our films are not just stories; they are windows into the world from a fresh and unique
                        perspective—<span class="text-brand-orange font-bold italic">The Children's Perspective.</span>
                        Each film reflects the hopes, challenges and life-experiences of young minds, bringing their untold stories to life.
                    </p>
                </div>
                <div class="h-fit w-full flex flex-row gap-3">
                    <button class="h-fit w-full text-lg p-2 rounded-xl bg-brand-orange text-surface brand-font font-bold">
                        Get A Glimpse
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Desktop poster grid -->
    <div class="h-fit w-full flex-col items-center justify-center mt-24 hidden lg:flex mb-[250px]" id="wonderfull-poster-div">
        <div class="grid grid-cols-3 gap-[40px] xl:grid-cols-3 px-10 w-full max-w-6xl">
            {#each {length: totalMovieCards} as _, index}
                <div class="relative rounded-2xl overflow-hidden aspect-video shadow-xl group/poster cursor-pointer"
                     on:click={() => toggleVideo(index)}>
                    {#if playingIndex === index}
                        <iframe
                            class="absolute top-0 left-0 w-full h-full z-0"
                            src="https://player.vimeo.com/video/{VIMEO_PLACEHOLDER}?autoplay=1&loop=1&transparent=0&byline=0&title=0&portrait=0"
                            title="Film video {index + 1}"
                            frameborder="0"
                            allow="autoplay; fullscreen; encrypted-media"
                            allowfullscreen
                        ></iframe>
                        <!-- Stop button -->
                        <button
                            on:click|stopPropagation={() => toggleVideo(index)}
                            class="absolute bottom-3 right-3 bg-black/60 rounded-full p-2 z-10 opacity-0 group-hover/poster:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                        </button>
                    {:else}
                        <img src="{movieCardsPosters[index]}" alt="film poster {index + 1}"
                             class="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-105"/>
                        <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300">
                            <div class="bg-black/60 rounded-full p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                        <!-- Film title -->
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p class="text-white text-sm font-bold">{movieCardsHeading[index]}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>
