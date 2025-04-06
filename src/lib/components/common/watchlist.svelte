<script>
    import Card3D from "$lib/components/common/Card3D.svelte";
    import LandingVid from "$lib/assets/images/landingVid.mp4";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {Flip} from "gsap/dist/Flip";
    import {TextPlugin} from "gsap/dist/TextPlugin";

    const imageModules = import.meta.glob('$lib/assets/images/top10Posters/*', {
        eager: true, // Load immediately (not lazy-loaded)
        as: 'url'    // Import as URL strings
    });

    const movieCardsPosters = Object.values(imageModules);
    let movieCardsHeading = []
    let movieVids = []
    for (let url of Object.keys(imageModules)) {
        let split = url.split('/');
        movieCardsHeading.push(split[split.length - 1].split('.')[0].replaceAll('_', ' ').trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '));
        movieVids.push(LandingVid);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function splitTextOnWord(selector, specialTagStartingReplacement, specialTagEndingReplacement) {
        var textWrapper = document.querySelector(`${selector}`);
        textWrapper.innerHTML = textWrapper.innerHTML = textWrapper.textContent.replace(
            /(\S+)([\s.,!?]*)/g,
            `<span class="word-${selector.replace('.', '')} inline-block" style='opacity: 0; scale: 2;transform: translateX(-30px)'>$1</span>$2`
        );
        if (specialTagStartingReplacement && specialTagEndingReplacement) {
            textWrapper.innerHTML = textWrapper.innerHTML.replaceAll('$$$', specialTagStartingReplacement);
            textWrapper.innerHTML = textWrapper.innerHTML.replaceAll('***', specialTagEndingReplacement);
            textWrapper.innerHTML = textWrapper.innerHTML.replaceAll('++', ' ');
        }
        // let textDiv = document.getElementsByClassName('wonderfull-reveal-effect')[0];
        // textDiv.innerHTML = textDiv.textContent.replace(/\S/g, "<span class='wonderfull-reveal-indi-char text-nowrap' style=''>$&</span>")
    }


    let lastPointHovered = '';
    let totalWowCards = 3;
    let totalMovieCards = movieCardsHeading.length;
    let trailerPlaying = false;
    let currentIndex = 0;
    let carouselStatus = false;
    let animationPlaying = false;
    let currentIndexMovieCarousel = 0;
    let movieCarouselNotAnimating = true;
    let moviePosterInvertMarginTop = false;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(Flip);
        gsap.registerPlugin(TextPlugin);
        for (let i = 0; i < totalMovieCards; i++) {
            gsap.to(`.movie-card-${i + 1}`, {
                x: `${100 * i}%`,
                opacity: `${i === 0 ? 1 : 0.7}`,
                scale: `${i === 0 ? 1 : 0.9}`,
            })
        }

        let wonderfullHeadingTimeline = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    wonderfullHeadingTimeline.reverse()
                }, 1000);
            },
            onReverseComplete: () => {
                setTimeout(() => {
                    wonderfullHeadingTimeline.play()
                }, 1000);
            }
        });
        wonderfullHeadingTimeline.to('.wonderfull-text', {
            y: '-100%',
            ease: 'sine',
            stagger: -0.05
        });
        wonderfullHeadingTimeline.to('.wonderfull-text-part-2', {
            y: '0%',
            ease: 'sine',
            stagger: 0.05
        }, '<+=0.5');

        let wonderfullCoverTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#wonderfull-poster-div',
                start: 'top bottom',
                end: 'top 60%',
                scrub: true,
                markers: false,
            }
        });
        wonderfullCoverTimeline.to('#wonderfull-cover-div', {
            opacity: 1,
        });
    });

    function handleMovieCardTrailer() {
        if (trailerPlaying) {
            revertMovieCardTrailerPlaying();
        } else {
            playMovieCardsTrailer();
        }
    }

    function playMovieCardsTrailer() {
        trailerPlaying = true;
        const trailerMovieState = Flip.getState(`.movie-card-${currentIndexMovieCarousel + 1}`);
        const currentCard = document.getElementsByClassName(`movie-card-${currentIndexMovieCarousel + 1}`)[0];
        const nextCard = document.getElementsByClassName(`movie-card-${currentIndexMovieCarousel + 2}`)[0];
        nextCard.style.opacity = '0';
        currentCard.classList.add('h-screen', 'w-full', 'opacity-0', 'scale-[200]')
        const movieCardContainer = document.getElementsByClassName(`movie-cards-container`)[0];
        movieCardContainer.classList.add('h-screen', 'w-full');
        Flip.from(trailerMovieState, {
            duration: 0.75,
            ease: 'sine',
            onComplete: () => {
                const mainContainer = document.getElementsByClassName(`main-movie-container`)[0];
                mainContainer.insertAdjacentHTML('beforeend', `<div class="opacity-0 absolute top-0 h-full w-full overflow-hidden" id="movie-trailer-playing"><video class="w-full h-full object-cover" autoplay loop><source src=${LandingVid} type="video/mp4"/></video></div>`);
                let movieTrailerTimeline = gsap.timeline();
                movieTrailerTimeline.to('#movie-trailer-playing', {
                    duration: 0.75,
                    opacity: 1,
                    ease: 'sine',
                }, '<');
            }
        });
    }

    function revertMovieCardTrailerPlaying() {
        const trailerMovieState = Flip.getState(`.movie-card-${currentIndexMovieCarousel + 1}`);
        const currentCard = document.getElementsByClassName(`movie-card-${currentIndexMovieCarousel + 1}`)[0];
        const nextCard = document.getElementsByClassName(`movie-card-${currentIndexMovieCarousel + 2}`)[0];
        nextCard.style.opacity = '1';
        currentCard.classList.remove('h-screen', 'w-full', 'opacity-0', 'scale-[200]');
        currentCard.classList.add('scale-[1]');
        const movieCardContainer = document.getElementsByClassName(`movie-cards-container`)[0];
        movieCardContainer.classList.remove('h-screen');
        gsap.to('#movie-trailer-playing', {
            duration: 0.75,
            opacity: 0,
            scale: 0.5,
            ease: 'sine',
            onComplete: () => {
                document.getElementById('movie-trailer-playing').remove();
            }
        });
        Flip.from(trailerMovieState, {
            duration: 0.75,
            ease: 'sine',
            onComplete: () => {
                trailerPlaying = false;
            }
        })
    }

    function movieCarouselLeft() {
        if (currentIndexMovieCarousel >= 1 && movieCarouselNotAnimating && !trailerPlaying) {
            let movieTimeline = gsap.timeline({
                onComplete: () => {
                    movieCarouselNotAnimating = true;
                },
                onStart: () => {
                    movieCarouselNotAnimating = false;
                }
            });
            for (let i = 0; i < totalMovieCards; i++) {
                let translateValues = getTranslatePercentage(document.getElementsByClassName(`movie-card-${i + 1}`));
                movieTimeline.to(`.movie-card-${i + 1}`, {
                    x: `${translateValues.x + 100}%`,
                    opacity: 0.75,
                    scale: 0.9,
                }, '<');
            }
            movieTimeline.to(`.movie-card-${currentIndexMovieCarousel}`, {
                opacity: 1,
                scale: 1,
            }, '<');
            currentIndexMovieCarousel--;
        }
    }

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
            rotation: angle,
        };
    }

    function movieCarouselRight() {
        if (currentIndexMovieCarousel < totalMovieCards - 1 && movieCarouselNotAnimating && !trailerPlaying) {
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

    $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth/>
<div class="min-h-screen h-fit w-full flex flex-col relative bg-background wonderfull-trigger items-start justify-start pt-5">
    <p class="brand-font text-4xl md:text-5xl font-bold lg:hidden text-left px-5 text-primary w-full lg:text-7xl group">
        The <span class="text-brand-orange relative">ONEderfull <span
            class="hidden lg:block absolute bottom-1 w-full h-[9px] bg-primary left-0"></span><span
            class="hidden lg:block absolute bottom-1 left-0 bg-brand-orange w-0 h-[9px] group-hover:w-full transition-all duration-500"></span></span>
        Watchlist
    </p>
    <div class="h-screen w-full flex-col items-center justify-center hidden lg:flex gap-2 sticky top-0">
        <div class="absolute top-0 h-full w-full backdrop-blur-lg opacity-0" id="wonderfull-cover-div"></div>
        <p class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-primary">
            THE
        </p>
        <div class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-brand-orange relative italic overflow-hidden flex flex-row">
            <div class="relative overflow-visible">
                <p class="opacity-0 ">WONDERFULL</p>
            </div>
            <div class="flex flex-row h-fit overflow-hidden absolute ">
                <span class="wonderfull-text-1 wonderfull-text">O</span><span class="wonderfull-text-2 wonderfull-text">N</span><span
                    class="wonderfull-text-3 wonderfull-text">E</span><span
                    class="wonderfull-text-4 wonderfull-text">D</span><span
                    class="wonderfull-text-5 wonderfull-text">E</span><span
                    class="wonderfull-text-6 wonderfull-text">R</span><span
                    class="wonderfull-text-7 wonderfull-text">F</span><span
                    class="wonderfull-text-8 wonderfull-text">U</span><span
                    class="wonderfull-text-9 wonderfull-text">L</span><span
                    class="wonderfull-text-10 wonderfull-text">L</span>
            </div>
            <div class="flex flex-row h-fit overflow-hidden absolute text-brand-green">
                <span class="wonderfull-text-part-2 translate-y-[100%]">W</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">O</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">N</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">D</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">E</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">R</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">F</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">U</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">L</span><span
                    class="wonderfull-text-part-2 translate-y-[100%]">L</span>
            </div>
        </div>
        <p class="text-7xl xl:text-8xl 2xl:text-9xl brand-font font-bold text-primary">
            WATCHLIST
        </p>
        <div class="flex flex-row w-full gap-5 px-10 mt-10 max-w-[1100px]">
            <div class="w-1/2 flex flex-col items-center justify-start">
                <p class="text-lg xl:text-xl text-primary font-bold italic text-left w-full">
                    THE CHILDREN’S PERSPECTIVE
                </p>
                <p class="text-lg font-light text-surface w-full">
                    Our films are not just stories; they are windows into the world from a fresh and unique
                    perspective—<span class="text-brand-orange font-bold italic">The
                Children’s Perspective. </span>Each film reflects the hopes, challenges and life-experiences of young
                    minds,
                    bringing their untold stories to life.
                </p>
            </div>

            <div class="w-1/2 flex flex-col items-center justify-start">
                <p class="text-lg xl:text-xl text-brand-orange font-bold italic text-left w-full text-nowrap">
                    THREE FOLD LEARNING OUTCOMES
                </p>
                <p class="text-lg font-light text-surface w-full">
                    These films are carefully analyzed and transformed into impactful lesson plans by our team of
                    academic experts as a TLM resource for: <br/> 1. Social Emotional Learning <br/> 2.Film & Media
                    Skills
                    Exploration <br/> 3. Community Service Engagement
                </p>
            </div>

            <div class="w-1/2 flex flex-col items-center justify-start">
                <p class="text-lg xl:text-xl text-brand-green font-bold italic text-left w-full text-nowrap">
                    EDUTAINMENT WITH A PURPOSE
                </p>
                <p class="text-lg  font-light text-surface w-full">
                    Paired with activity-based modules, the films seamlessly blend storytelling with critical themes.
                    Together, they create a rich educational experience that inspires learning, fosters empathy, and
                    empowers children to envision a better world.
                </p>
            </div>
        </div>
    </div>
    <div class="min-h-screen h-fit lg:hidden w-full bg-background flex flex-col items-center pt-5 relative">
        <div class="h-[300px] w-full flex flex-row items-center justify-center overflow-hidden absolute top-5 z-[2] movie-cards-container">
            {#each {length: totalMovieCards} as _, index}
                <div class="flex flex-row h-[300px] items-end justify-center absolute">
                    <!--{#if index === currentIndexMovieCarousel}-->
                    <!--    <p class="brand-font font-bold text-white mix-blend-difference uppercase text-2xl z-[2]"-->
                    <!--       style="writing-mode: sideways-lr">-->
                    <!--        {movieCardsHeading[currentIndexMovieCarousel]}-->
                    <!--    </p>-->
                    <!--{/if}-->
                    <div class="w-[200px] flex-shrink-0 movie-cards movie-card-{index+1} flex flex-row-reverse"
                         style="translate: translate3d({110 * index}%, 0, 0); opacity: {index === 0 ? 1 : 0.7};
                                        scale: {index === 0 ? 1 : 0.9}">
                        <div class="h-full w-full">
                            <div class="h-full w-full relative">
                                <img src="{movieCardsPosters[index]}" alt="photo of all the avengers"
                                     class="w-full h-full object-cover"
                                     style="filter: {currentIndexMovieCarousel === index ? '': 'grayscale(100%) sepia(100%) hue-rotate(260deg)'};">
                                <div class="absolute top-0 h-full w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!--                <div class="flex flex-row w-full h-fit absolute top-5 items-end justify-center">-->
        <!--                    <p class="brand-font font-bold text-white mix-blend-difference text-2xl z-[2]"-->
        <!--                       style="writing-mode: sideways-lr">MOVIE NAME HERE</p>-->
        <!--                    <div class="h-[300px] w-[200px] bg-primary rounded-xl z-[2]"></div>-->
        <!--                </div>-->
        <div class="bg-surface h-fit w-full mt-[150px] relative z-50">
            <div class="relative h-[150px]">
                <svg class="absolute -top-[90%] left-0 w-full h-[150px]" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#FF9900FF"
                          fill-opacity="1"></path>
                </svg>
                <svg class="absolute -top-[80%] left-0 w-full h-[150px]" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#250025"
                          fill-opacity="1"></path>
                </svg>
            </div>
            <div class="h-fit bg-surface pb-7 w-full px-5 md:px-28 flex flex-col gap-5 items-center z-50">
                <div class="flex flex-col h-fit w-fit items-center justify-center gap-2">
                    <div class="flex flex-row gap-5 z-[2] mt-5">
                        <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl wow-controller-left flex items-center justify-center"
                                on:click={movieCarouselLeft}>
                            <svg height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                                    <polygon
                                            points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                                </g>
                            </svg>
                            <p class="hidden">Go left</p>
                        </button>
                        <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl woww-controller-right flex items-center justify-center"
                                on:click={() => {movieCarouselRight()}}>
                            <svg height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                                    <polygon
                                            points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                                </g>
                            </svg>
                            <p class="hidden">Go Right</p>
                        </button>
                    </div>
                    <!--                    <div class="h-[10px] bg-brand-orange rounded-xl" style="width: {currentIndexMovieCarousel/totalMovieCards}%"></div>-->
                </div>
                <div class="h-fit w-full">
                    <p class="brand-font font-thin text-background text-xl">
                        Our films are not just stories; they are windows into the world from a fresh and unique
                        perspective—<span
                            class="text-brand-orange font-bold italic">The Children’s Perspective.</span> Each
                        film reflects the hopes, challenges and
                        life-experiences of young minds, bringing their untold stories to life.
                    </p>
                </div>
                <div class="h-fit w-full flex flex-row gap-3">
                    <button class="h-fit w-full text-lg p-2 rounded-xl bg-brand-orange text-surface brand-font font-bold">
                        Get A Glimpse
                    </button>
                </div>
            </div>
            <div class="relative h-[50px] z-50">
                <svg class="absolute -bottom-[280%] -rotate-180 left-0 w-full h-[150px] z-50" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#FF9900FF"
                          fill-opacity="1"></path>
                </svg>
                <svg class="absolute -bottom-[250%] -rotate-180 left-0 w-full h-[150px] z-50" preserveAspectRatio="none"
                     viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0L34.3,32C68.6,64,137,128,206,154.7C274.3,181,343,171,411,176C480,181,549,203,617,186.7C685.7,171,754,117,823,112C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,256C1302.9,256,1371,224,1406,208L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                          fill="#250025"
                          fill-opacity="1"></path>
                </svg>
            </div>
        </div>
    </div>
    <!--    GRID SOLUTION-->
    <div class="h-fit w-full flex-col items-center justify-center mt-24 hidden lg:flex" id="wonderfull-poster-div">
        <div class="grid-cols-[repeat(3,minmax(0,1fr))] hidden lg:grid lg:gap-[40px] xl:grid-cols-[repeat(4,minmax(0,1fr))] xl:gap-[30px] px-10">
            {#each {length: totalMovieCards} as _, index}
                <!--Translate y value is half of the height of the card div-->
                {#if index === 4 && innerWidth >= 1280}
                    <div class="opacity-0 rounded-xl lg:p-3 xl:p-4 h-full transform-style-preserve-3d shadow-xl">
                    </div>
                {/if}
                <Card3D imgLocation="{movieCardsPosters[index]}"
                        index="{index+1}"
                        cardContainerColor="{innerWidth}"/>
            {/each}
        </div>
    </div>
</div>