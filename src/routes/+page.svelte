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


    // let wowImagesData = [
    //     conscious_ott,
    //     feature_your_film,
    //     childrens_perspective,
    //     make_a_difference,
    // ]


    let wowTidBitsData = {
        0: ['PM eVidya', 'NEP 2020', 'Activity', 'Conscious'],
        1: ['Filmmaking', 'Mentors', 'Tour', 'Festival'],
        2: ['Inspiring', 'Films', 'Children', 'Perspective'],
        3: ['Subscription', 'Contribution', 'Urban Schools', 'Social Impact']
    }


    let wowHeadingData = [
        'Conscious OTT Platform',
        'Feature Your Film',
        "Children's Perspective",
        "Make A Difference",
    ]


    let wowDescriptionData = [
        'We promote and stream impactful cinema and quality educational content aligned with NEP 2020 to support the PM eVIDYA initiative. Each Film also has activity- based learning modules.',
        "Learn filmmaking from industry mentors and feature your film for a larger cause! You can embark on a filmmaking tour or join our digital film festival project.",
        "Watch inspiring films made by young minds (ages 6-18) that provide a fresh, children’s perspective on how they perceive the world around them.",
        "Every subscription contributes to free filmmaking workshops in rural areas, grants for urban school filmmakers & social impact projects",
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
        displayTidbits();
        for (let i = 0; i < totalMovieCards; i++) {
            gsap.to(`.movie-card-${i + 1}`, {
                x: `${100 * i}%`,
                opacity: `${i === 0 ? 1 : 0.7}`,
                scale: `${i === 0 ? 1 : 0.9}`,
            })
        }
        let wowCardsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.wow-card-trigger',
                start: 'top -2%',
                end: 'top -2%',
                scrub: false,
                markers: true,
            },
            onComplete: () => {
                openTickets();
            }
        });

        for (let i = 0; i <= totalWowCards; i++) {
            gsap.to(`.wow-carousel-${i + 1}`, {
                translateX: `${12 * i}%`,
                translateZ: `${-8 * i}em`,
            }, '<');
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

    function slideRight() {
        displayTidbits();
        if (!animationPlaying && carouselStatus) {
            if (currentIndex !== totalWowCards) {
                let slideRightTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= totalWowCards; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`wow-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideRightTimeline.to(`.wow-carousel-${i + 1}`, {
                        translateX: `${translateValues.x + 80}%`,
                        translateY: `${translateValues.y + 20}%`,
                        rotate: `${translateValues.rotation + 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex++;
            }
        }
    }

    function slideLeft() {
        displayTidbits();
        if (!animationPlaying) {
            if (currentIndex !== 0) {
                let slideLeftTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= totalWowCards; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`wow-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideLeftTimeline.to(`.wow-carousel-${i + 1}`, {
                        translateX: `${translateValues.x - 80}%`,
                        translateY: `${translateValues.y - 20}%`,
                        rotate: `${translateValues.rotation - 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex--;
            }
        }
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


    function pointsHovered(event) {
        let hoverAnimationTimeline = gsap.timeline();
        let endPoint = parseInt(event.target.id.split("-")[1]);
        if (endPoint < parseInt(lastPointHovered.split("-")[1])) {
            document.getElementById(lastPointHovered).classList.remove('drawer-opened');
            hoverAnimationTimeline.to(`#${lastPointHovered}`, {
                translateY: '0%',
                duration: '0.2',
                ease: 'sine',
            }, '<');
        }
        for (let i = 1; i <= endPoint; i += 1) {
            if (!document.getElementById(`point-${i}`).classList.contains("drawer-opened")) {
                document.getElementById(`point-${i}`).classList.add("drawer-opened");
                hoverAnimationTimeline.to(`#point-${i}`, {
                    translateY: '-30%',
                    duration: '0.2',
                    ease: 'sine'
                }, '<+0.1');
            }
        }
    }

    function pointsNormalise(event) {
        let resetHoverTimeline = gsap.timeline();
        let activePoints = document.getElementsByClassName("drawer-opened");
        console.log(activePoints);
        for (let i = activePoints.length - 1; i >= 0; i -= 1) {
            resetHoverTimeline.to(`#${activePoints[i].id}`, {
                translateY: '0%',
                duration: '0.2',
                ease: 'sine'
            }, '<+0.1');
            activePoints[i].classList.remove("drawer-opened");
        }
    }

    function singlePointUnhovered(event) {
        lastPointHovered = event.target.id
    }

    function displayTidbits() {
        console.log('something');
        if (window.screen.width > 648) {
            let tidbitsTimeline = gsap.timeline({});
            tidbitsTimeline.to('.wow-tidbit-text', {
                opacity: 0,
                stagger: 0.2,
                duration: 0.1,
                onComplete: () => {
                    for (let i = 0; i < wowTidBitsData[currentIndex].length; i++) {
                        console.log(document.getElementById(`wow-tidbit-${i + 1}`), i);
                        document.getElementById(`wow-tidbit-${i + 1}`).innerHTML = wowTidBitsData[currentIndex][i].replace(' ', '&nbsp;');
                        document.getElementById(`wow-tidbit-container-${i + 1}`).style.backgroundColor = colourPallete[i % (colourPallete.length)];
                    }
                }
            });

            tidbitsTimeline.to('.wow-tidbit-text', {
                opacity: 1,
                display: 'block',
                stagger: 0.2,
                duration: 0.1
            }, '<')
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
<div class="min-h-screen h-fit w-full flex flex-col relative bg-gray-100 overflow-hidden wow-card-trigger">
    <div class="h-fit w-fit px-3 py-1 brand-font text-white text-lg absolute top-12 left-12 z-[2] wow-tidbit"
         id="wow-tidbit-container-1"><p class="wow-tidbit-text" id="wow-tidbit-1"></p></div>
    <div class="h-fit w-fit px-3 py-1 brand-font text-white text-lg absolute top-80 right-12 z-[2] wow-tidbit"
         id="wow-tidbit-container-2"><p class="wow-tidbit-text" id="wow-tidbit-2"></p></div>
    <div class="h-fit w-fit px-3 py-1 brand-font text-white text-lg absolute top-36 left-36 z-[2] wow-tidbit"
         id="wow-tidbit-container-3"><p class="wow-tidbit-text" id="wow-tidbit-3"></p></div>
    <div class="h-fit w-fit px-3 py-1 brand-font text-white text-lg absolute top-[40%] right-[20%] z-[2] wow-tidbit"
         id="wow-tidbit-container-4"><p class="wow-tidbit-text" id="wow-tidbit-4"></p></div>
    <div class="h-fit w-full flex flex-col items-start">
        <div class="h-screen w-full bg-gradient-to-b from-purple-300 to-60% to-gray-100 absolute top-0">
        </div>
        <div class="w-full h-fit px-2 z-[2] mt-12 relative min-[451px]:text-right">
            <p class="text-primary brand-font font-bold w-full text-5xl md:text-7xl lg:text-8xl" id="wow-card-heading">
                What Makes
                <span class="relative" style="filter: drop-shadow()">
                Us
                <span class="absolute -bottom-4 right-0 brand-font text-primary text-sm md:text-lg p-1 bg-purple-400">
                    Purple&nbsp;People&nbsp;Labs
                </span>
            </span>
                WOW!
            </p>
        </div>
        <div class="w-full h-fit px-5 mt-14 relative flex justify-end">
            <p class="text-black brand-font font-normal w-full text-sm md:text-xl min-[451px]:text-right min-[451px]:w-[70%]"
               id="wow-card-subheading">
                Every film you watch helps shape a brighter
                future—because when stories meet purpose, magic happens!"
            </p>
        </div>
        <div class="h-[350px] w-full flex flex-col mt-12 xl:mt-24 items-center justify-center relative wow-tickets"
             id="wow-card-cards"
             style="perspective: 800px">
            <div class="h-[350px] w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl wow-controller-left flex items-center justify-center"
                        on:click={() => {slideRight()}}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                            <polygon
                                    points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                        </g>
                    </svg>
                </button>
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl woww-controller-right flex items-center justify-center"
                        on:click={() => {slideLeft()}}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                            <polygon
                                    points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                        </g>
                    </svg>
                </button>
            </div>
            <!--        <div class="h-fit w-fit main-page-ticket absolute origin-bottom-left">-->
            <!--            <Ticket mainTitle="TICKETS" isPassHeading="{false}" showBuyButton="{false}"/>-->
            <!--        </div>-->
            <div class="h-fit w-fit wow-heading-ticket wow-ticket-div absolute wow-carousel-1 origin-bottom-left"
                 style="z-index: {totalWowCards + 2};">
                <div class="h-[350px] xl:h-[375px] w-[325px] shadow-lg p-3 pt-6 pb-6 flex flex-col items-center justify-between gap-4 relative"
                     style="background-color: {colourPallete[0]}">
                    <!--                    <img src="{wowImagesData[0]}" alt="a boy holding his hands up" class="absolute bottom-0 right-0" style="filter: opacity(0.25)">-->
                    <p class="brand-font text-white/90 text-4xl font-extrabold z-[2]">{wowHeadingData[0]}</p>
                    <p class="brand-font text-white text-sm font-normal z-[2]">{wowDescriptionData[0]}</p>
                </div>
            </div>
            {#each {length: totalWowCards} as _, index}
                <div class="h-fit w-fit wow-content-ticket wow-ticket-div absolute wow-carousel-{index+2} origin-bottom-left"
                     style="z-index: {totalWowCards - index+1}">
                    <div class="h-[350px] xl:h-[375px] w-[325px]  shadow-lg p-3 pb-6 pt-6 flex flex-col items-center justify-between gap-4"
                         style="background-color: {colourPallete[index+1]}">
                        <!--                        <img src="{wowImagesData[index+1]}" alt="2" class="absolute bottom-0 right-0" style="filter: opacity(0.25)">-->
                        <p class="brand-font text-white/90 text-4xl font-extrabold">{wowHeadingData[index + 1]}</p>
                        <p class="brand-font text-white text-sm font-normal">{wowDescriptionData[index + 1]}</p>
                    </div>
                    <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                </div>
            {/each}
        </div>
    </div>
    <div class="h-screen w-full flex flex-col items-center justify-center z-[2] relative mt-24"
         style="user-select: none">
        <div class="h-screen w-full absolute top-0 flex items-center justify-center blur-xl">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-300 to-[25%] to-white animate-gradientMovement h-full w-full"></div>
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
