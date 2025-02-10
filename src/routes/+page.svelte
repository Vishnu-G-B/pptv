<script>
    import {onMount} from 'svelte';
    import gsap from 'gsap';
    import Faq from "$lib/components/PPLlabs/faq.svelte";
    import BentoBox from "$lib/components/common/BentoBox.svelte";
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import Landing from "$lib/components/PPLlabs/Landing.svelte";
    import ArcedCards from "$lib/components/common/ArcedCards.svelte";
    import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';


    const imageModules = import.meta.glob('$lib/assets/images/top10Posters/*', {
        eager: true, // Load immediately (not lazy-loaded)
        as: 'url'    // Import as URL strings
    });

    const movieCardsPosters = Object.values(imageModules);
    let movieCardsHeading = []
    for (let url of Object.keys(imageModules)) {
        let split = url.split('/');
        movieCardsHeading.push(split[split.length - 1].split('.')[0].replaceAll('_', ' ').trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '));
    }

    let colourPallete = [
        '#4A004A',
        '#5A007A',
        '#8C00D1',
        '#7A00B8',
        '#FFB3FF'
    ]


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    let lastPointHovered = '';
    let totalWowCards = 3;
    let totalMovieCards = movieCardsHeading.length;
    let currentIndex = 0;
    let carouselStatus = false;
    let animationPlaying = false;
    let currentIndexMovieCarousel = 0;
    let movieCarouselNotAnimating = true;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        for (let i = 0; i < totalMovieCards; i++) {
            gsap.to(`.movie-card-${i + 1}`, {
                x: `${100 * i}%`,
                opacity: `${i === 0 ? 1 : 0.7}`,
                scale: `${i === 0 ? 1 : 0.9}`,
            })
        }
    });

    function getTranslatePercentage(element) {
        const transformValue = window.getComputedStyle(element[0]).transform;
        const w = window.getComputedStyle(element[0]).width;
        const h = window.getComputedStyle(element[0]).height;
        var matrix = new WebKitCSSMatrix(transformValue);

        const style = window.getComputedStyle(element[0]);
        const rotationMatrix = style.transform || style.webkitTransform || style.mozTransform;

        let angle;
        if (rotationMatrix === 'none') {
            angle = 0;
        } else {
            const values = rotationMatrix.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
        return {
            x: matrix.m41 / parseInt(w) * 100,
            y: matrix.m42 / parseInt(h) * 100,
            left: element[0].style.left,
            rotation: angle,
        };
    }


    export function openTickets() {
        animationPlaying = true;
        carouselStatus = true;
        let ticketTimeline = gsap.timeline({
            onComplete: () => {
                animationPlaying = false;
            }
        });
        for (let i = 2; i <= totalWowCards + 1; i++) {
            ticketTimeline.to(`.wow-carousel-${i}`, {
                translateX: `${-80 * (i - 1)}%`,
                translateY: `${-20 * (i - 1)}%`,
                translateZ: 0,
                rotate: `${-20 * (i - 1)}deg`,
                ease: 'sine',
            }, '<+=0.1');
        }
    }

    function movieCarouselLeft() {
        if (currentIndexMovieCarousel >= 1 && movieCarouselNotAnimating) {
            let movieTimeline = gsap.timeline({
                onComplete: () => {
                    movieCarouselNotAnimating = true;
                },
                onStart: () => {
                    movieCarouselNotAnimating = false;
                }
            });
            console.log(currentIndexMovieCarousel);
            for (let i = 0; i < totalMovieCards; i++) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, {
                    x: `${translateValues.x + 100}%`,
                    opacity: 0.7,
                    scale: 0.9,
                }, '<');
            }
            console.log('current index movie', currentIndexMovieCarousel);
            movieTimeline.to(`.movie-card-${currentIndexMovieCarousel}`, {
                opacity: 1,
                scale: 1,
            }, '<');
            currentIndexMovieCarousel--;
        }
    }

    function movieCarouselRight() {
        if (currentIndexMovieCarousel < totalMovieCards - 1 && movieCarouselNotAnimating) {
            currentIndexMovieCarousel++;
            let movieTimeline = gsap.timeline({
                onComplete: () => {
                    movieCarouselNotAnimating = true;
                },
                onStart: () => {
                    movieCarouselNotAnimating = false;
                }
            })
            for (let i = currentIndexMovieCarousel - 1; i >= 0; i -= 1) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, {
                    x: `${translateValues.x - 100}%`,
                    opacity: 0.75,
                    scale: 0.9,
                }, '<');
            }

            for (let i = currentIndexMovieCarousel; i < totalMovieCards; i++) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                console.log(translateValues.x);
                movieTimeline.to(`.movie-card-${i + 1}`, {
                    x: `${translateValues.x - 100}%`,
                }, '<');
                movieTimeline.to(`.movie-card-${currentIndexMovieCarousel + 1}`, {
                    opacity: 1,
                    scale: 1,
                }, '<');
            }
        }
    }
</script>


<Landing/>
<BentoBox/>
<ArcedCards/>
<div class="min-h-screen h-fit w-full flex flex-col relative bg-[#f6f5ec] overflow-hidden wow-card-trigger">
    <div class="h-screen w-full flex flex-col items-center justify-center z-[2] relative mt-24"
         style="user-select: none">
        <div class="h-screen w-full absolute top-0 flex items-center justify-center blur-xl">
            <div class="absolute inset-0 bg-[#f6f5ec] h-full w-full"></div>
            <div class="h-full w-full flex items-center justify-center absolute">
                <img alt="" class="h-full w-full object-contain" src="{movieCardsPosters[currentIndexMovieCarousel]}">
            </div>
            <!--                        <div class="h-fit w-full absolute">-->
            <!--                            <Waves/>-->
            <!--                        </div>-->
        </div>
        <div class="h-[375px] w-full relative flex flex-row items-center justify-center">
            {#each {length: totalMovieCards} as _, index}
                <div class="absolute h-[375px] w-[300px] flex-shrink-0 movie-cards movie-card-{index+1} flex flex-row-reverse">
                    <!--                    style="translate: translate3d({110*index}%, 0, 0); opacity: {index === 0 ? 1 : 0.7}; scale: {index === 0 ? 1: 0.9}">-->
                    <div class="absolute -top-[90%] -left-5">
                        <p class="brand-font font-bold text-primary text-[20rem] mix-blend-screen"
                           style="-webkit-text-fill-color: {currentIndexMovieCarousel === index ? 'inherit': 'transparent'}; -webkit-text-stroke-color: {currentIndexMovieCarousel === index ? 'inherit': '#250025'}; -webkit-text-stroke-width: {currentIndexMovieCarousel === index ? '': '1px'}; text-shadow: {currentIndexMovieCarousel === index ? '4px 4px 0px #d8b4fe': ''}">
                            {index + 1}
                        </p>
                    </div>
                    <div class="h-full w-full">
                        <div class="h-full w-full relative">
                            <img src="{movieCardsPosters[index]}" alt="photo of all the avengers"
                                 class="w-full h-full object-cover opacity-[0.95]"
                                 style="filter: {currentIndexMovieCarousel === index ? '': 'grayscale(100%) sepia(100%) hue-rotate(260deg)'};">
                            <div class="absolute top-0 h-full w-full"></div>
                        </div>
                        <div class="absolute top-4 left-2" style="writing-mode: sideways-lr">
                            <!--                        <p class="brand-font text-white text-3xl font-bold uppercase">{movieCardsHeading[index]}</p>-->
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="h-fit w-full flex flex-row items-center justify-center z-[2]">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl wow-controller-left flex items-center justify-center"
                    on:click={movieCarouselLeft}>
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                    </g>
                </svg>
                <p class="hidden">Go left</p>
            </button>
            <!--            <p class="text-primary brand-font font-bold text-2xl">{currentIndexMovieCarousel + 1}-->
            <!--                /{movieCardsHeading.length}</p>-->
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl woww-controller-right flex items-center justify-center"
                    on:click={() => {movieCarouselRight()}}>
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                    </g>
                </svg>
                <p class="hidden">Go Right</p>
            </button>
        </div>
    </div>
</div>

<Faq/>

<style>
    @keyframes gradientMovement {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .animate-gradientMovement {
        animation: gradientMovement 8s ease infinite;
        background-size: 200% 200%;
    }

    .custom-edges {
        filter: grayscale(100%) blur(2px) contrast(500%) invert(100%) brightness(5%) contrast(1200%);
        opacity: 0.9;
    }
</style>
