<script>
    import {onMount} from 'svelte';
    import gsap from 'gsap';
    import {ScrollTrigger} from 'gsap/ScrollTrigger';
    import EmblemLight from '$lib/assets/images/EmblemLight.svg';
    import EmblemDark from '$lib/assets/images/EmblemDark.svg';
    import LandingVid from '$lib/assets/images/landingVid.mp4';
    import temp1 from '$lib/assets/images/temp1.jpg';
    import temp2 from '$lib/assets/images/temp2.jpg';
    import temp3 from '$lib/assets/images/temp3.jpg';
    import temp4 from '$lib/assets/images/temp4.png';

    let sectionRef;
    const headerText = "Our Achievements";


    function formatNumber(num) {
        const x = num.toString();
        if (x.length <= 3) return x;
        const lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return formattedOther + ',' + lastThree;
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const boxes = sectionRef.querySelectorAll('.metric-box');

        // Animate numbers counting up
        boxes.forEach((box) => {
            const numberElement = box.querySelector('.number');
            if (numberElement) {
                const endValue = parseInt(numberElement.dataset.value.replace(/,/g, ''));
                gsap.fromTo(numberElement, {
                    innerText: 0
                }, {
                    innerText: endValue,
                    duration: 2,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top center+=200px",
                    },
                    snap: {innerText: 1},
                    onUpdate: function () {
                        // console.log(this.targets());
                        numberElement.innerHTML = formatNumber(Math.ceil(this.targets()[0].innerText)) + "+";
                    }
                });
            }
        });

        // Animate boxes appearing
        gsap.fromTo(boxes, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef,
                start: "top center+=100",
            }
        });
        gsap.fromTo(".letter",
            {
                rotationX: 90,
                opacity: 1,
                y: 30, // starts 30px below its final position (adjust as needed)
                transformOrigin: "bottom center"
            },
            {
                rotationX: 0,
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: ".section-header",
                    start: "top bottom"
                }
            }
        );
    });
</script>

<section bind:this={sectionRef} class="h-fit w-full bg-[#f6f5ec]">
<!--    <div class="section-header h-[20vh] w-full flex items-center justify-center overflow-hidden">-->
<!--        <h1 class="text-4xl md:text-6xl font-bold text-primary uppercase">-->
<!--            {#each headerText.split('') as letter}-->
<!--                {#if letter === ' '}-->
<!--                    <span class="letter inline-block">&nbsp;</span>-->
<!--                {:else}-->
<!--                    <span class="letter inline-block">{letter}</span>-->
<!--                {/if}-->
<!--            {/each}-->
<!--        </h1>-->
<!--    </div>-->
    <div class="h-fit w-full grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto md:p-4 relative bg-video">
        <div class="relative metric-box md:col-span-4 bg-gray-50 rounded-2xl p-8 flex flex-col justify-center min-h-[200px]
                ">
            <div class="absolute inset-0 rounded-2xl">
                <img src="{temp4}" alt="Background" class="w-full h-full object-cover rounded-2xl"/>
                <div class="absolute inset-0 bg-primary/60 rounded-2xl"></div>
            </div>
            <span class="number relative z-10 text-orange-400 text-5xl md:text-7xl font-stint font-bold"
                  data-value="300000">
                300000
            </span>
            <p class="mt-2 relative z-10 text-white text-xl font-karla uppercase font-bold">young filmmakers trained</p>
        </div>


        <div class="relative metric-box md:col-span-2 md:row-span-2 bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{LandingVid}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-white mix-blend-difference">
                <span class="number text-4xl md:text-6xl font-bold font-stint"
                      data-value="5000">5,000
                </span>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">teachers inspired as content
                    creators</p>
            </div>
        </div>

        <div class="metric-box md:col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col justify-center">
            <span class="number text-4xl md:text-5xlf text-primary font-stint font-bold"
                  data-value="65">65</span>
            <p class="text-orange-400 mt-2 text-xl font-karla uppercase font-bold">international film festivals</p>
        </div>

        <div class="metric-box md:col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col justify-center">
            <span class="number text-4xl md:text-5xl font-bold text-orange-400 font-stint" data-value="21">21</span>
            <p class="text-primary mt-2 text-xl font-karla uppercase font-bold">global awards & accolades</p>
        </div>

        <div class="metric-box md:col-span-2 md:row-span-2 bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{LandingVid}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute top-0 left-0 w-full h-full bg-primary/40 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-white mix-blend-difference">
                <span class="number text-4xl md:text-6xl font-bold font-stint text-white"
                      data-value="250">250
                </span>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">
                    films produced by & for children
                </p>
            </div>
        </div>

        <div class="metric-box md:col-span-2 bg-gray-50 rounded-2xl p-1 flex flex-col md:flex-row justify-center items-center">
            <div class="h-[15rem] w-fit bg-gray-50 rounded-lg mx-1">
                <img src={EmblemDark} alt="Government of India Logo" class="h-full w-auto mb-4"/>
            </div>
            <p class="text-primary text-xl font-karla uppercase font-bold">Conferred award for blending films in
                education</p>
        </div>

        <div class="metric-box md:col-span-2 md:row-span-2 relative bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center overflow-hidden">
            <div class="absolute inset-0">
                <img src="{temp1}" alt="Background" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-primary/60"></div>
            </div>

            <div class="relative z-10 h-[15rem] w-fit mb-4 rounded-lg p-2">
                <img src={EmblemLight} alt="Government of India Logo" class="h-full w-auto mb-4"/>
            </div>
            <div class="relative z-10 text-white text-xl font-karla uppercase font-bold">
                Recognized by the Government Of India
            </div>
        </div>

        <div class="metric-box md:col-span-2 bg-gray-50 rounded-2xl p-1 flex flex-col md:flex-row justify-center items-center">
            <div class="h-[15rem] w-fit bg-gray-50 rounded-lg mx-1">
                <img src={EmblemDark} alt="Government of India Logo" class="h-full w-auto mb-4"/>
            </div>
            <div class="text-primary text-xl font-karla uppercase font-bold">
                Collaboration project for PM eVIDYA Studio
            </div>
        </div>
    </div>
</section>

<style>
    .bg-gradient {
        background: rgb(216, 180, 254);
        background: linear-gradient(180deg, rgba(216, 180, 254, 1) 0%, rgba(243, 244, 240, 1) 20%, rgba(243, 244, 240, 1) 80%, rgba(216, 180, 254, 1) 100%);
    }
</style>