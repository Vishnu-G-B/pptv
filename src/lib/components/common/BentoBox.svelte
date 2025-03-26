<script>
    import {onMount} from 'svelte';
    import {gsap} from 'gsap/dist/gsap';
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import EmblemLight from '$lib/assets/images/EmblemLight.svg';
    import EmblemDark from '$lib/assets/images/EmblemDark.svg';
    import mygovlogo from '$lib/assets/images/mygovlogo.png';
    import LandingVid from '$lib/assets/images/landingVid.mp4';
    import temp4 from '$lib/assets/images/Pragya Bodhini.webp';
    import studentfilmbg from "$lib/assets/images/2B_KAB.png"
    import teacherTraining from '$lib/assets/Videos/Teacher Traning_Website Final.mp4';
    import year75logo from "$lib/assets/images/Azadi-Ka-Amrit-Mahotsav-Logo.png";
    import studentfilmsbgvideo from "$lib/assets/Videos/PPL Films_Website Final.mp4";
    import projectGulak from "$lib/assets/images/Project Gullak Logo.png";
    import lahdcvid from "$lib/assets/Videos/Ladakh PM evidya_Website_Final.mp4";
    import yifVideoFinal from "$lib/assets/Videos/YIF_Website_Final 02.mp4";

    let sectionRef;
    gsap.registerPlugin(ScrollTrigger)

    function formatNumber(num) {
        const x = num.toString();
        if (x.length <= 3) return x;
        const lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return formattedOther + ',' + lastThree;
    }

    onMount(() => {
        const boxes = sectionRef.querySelectorAll('.metric-box');

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
                        start: "top center+=350",
                    },
                    snap: {innerText: 1},
                    onUpdate: function () {
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
    });
</script>

<!--<section bind:this={sectionRef} class="h-fit w-full bg-background">-->
<!--    <div class="h-fit w-full grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto grid-flow-dense p-4 relative bg-video">-->
<!--        <div class="relative metric-box md:col-span-4 bg-gray-50 rounded-2xl p-8 flex flex-col justify-center min-h-[200px]-->
<!--                ">-->
<!--            <div class="absolute inset-0 rounded-2xl overflow-hidden">-->
<!--                &lt;!&ndash;                Shift the image UP so the face are visible&ndash;&gt;-->
<!--                <img src="{temp4}" alt="Background" class="w-full h-full object-cover rounded-2xl"/>-->
<!--                <div class="absolute inset-0 bg-primary/60 rounded-2xl "></div>-->
<!--            </div>-->
<!--            <div>-->
<!--                <span class="number relative z-10 text-orange-400 text-5xl md:text-7xl font-stint font-bold"-->
<!--                      data-value="25">-->
<!--                    25-->
<!--                </span>-->
<!--                <span class="relative z-10 text-brand-orange text-5xl md:text-7xl font-stint font-bold">-->
<!--                    Crore <span class="text-3xl">School Children</span>-->
<!--                </span>-->
<!--            </div>-->
<!--            <p class="mt-2 relative z-10 text-white text-xl font-karla uppercase font-bold mr-40">-->
<!--                <span class="text-brand-orange">Mission</span> Quality educational-->
<!--                content made affordable <br/> for Ministry Of Education’s PM eVIDYA initiative</p>-->
<!--        </div>-->


<!--        <div class="relative metric-box md:col-span-2 md:row-span-2 bg-gray-50 rounded-2xl p-4 flex flex-col justify-center">-->
<!--            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted-->
<!--                   playsinline>-->
<!--                <source src="{teacherTraining}" type="video/mp4">-->
<!--                Your browser does not support the video tag.-->
<!--            </video>-->
<!--            <div class="absolute inset-0 bg-primary/60 rounded-2xl "></div>-->
<!--            <div class="relative z-10 text-brand-orange">-->
<!--                <div>-->
<!--                    <span class="number text-4xl md:text-6xl font-bold font-stint"-->
<!--                          data-value="5000">5,000-->
<!--                    </span>-->
<!--                    <span class="relative z-10 text-5xl md:text-3xl font-stint font-bold tracking-tighter">-->
<!--                    Teachers&nbsp;Trained-->
<!--                    </span>-->
<!--                </div>-->
<!--                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">-->
<!--                    In Film Pedagogy integration <br> into the-->
<!--                    academic curriculum</p>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 bg-gray-50 border-2 border-surface rounded-2xl p-6 flex flex-col justify-center ">-->
<!--            <div>-->
<!--                <span class="number text-4xl md:text-5xl text-primary font-stint font-bold"-->
<!--                      data-value="65">-->
<!--                    65-->
<!--                </span>-->
<!--                <span class="relative z-10 text-primary text-5xl md:text-3xl font-stint font-bold">-->
<!--                    Film Festivals-->
<!--                </span>-->
<!--            </div>-->
<!--            <p class="text-orange-400 mt-2 text-xl font-karla uppercase font-bold">Special screenings, nominations and-->
<!--                kids workshops worldwide</p>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 md:row-span-2 bg-gray-50 border-2 border-surface rounded-2xl p-6 flex flex-col justify-center">-->
<!--            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted-->
<!--                   playsinline>-->
<!--                <source src="{ecavid}" type="video/mp4">-->
<!--                Your browser does not support the video tag.-->
<!--            </video>-->
<!--            <div class="absolute inset-0 bg-primary/50 rounded-2xl "></div>-->
<!--            <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-5 rounded-2xl"></div>-->
<!--            <div class="relative z-10 text-white mix-blend-difference">-->
<!--                <div>-->
<!--                    <span class="number text-4xl md:text-4xl font-bold font-stint"-->
<!--                          data-value="21">21-->
<!--                    </span>-->
<!--                    <span class="relative z-10 text-5xl md:text-3xl font-stint font-bold">-->
<!--                    Global Awards-->
<!--                    </span>-->
<!--                </div>-->
<!--                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">-->
<!--                    In Education and Films</p>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 md:row-span-2 bg-gray-50 rounded-2xl p-4 flex flex-col justify-center">-->
<!--            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted-->
<!--                   playsinline>-->
<!--                <source src="{LandingVid}" type="video/mp4">-->
<!--                Your browser does not support the video tag.-->
<!--            </video>-->
<!--            <div class="absolute top-0 left-0 w-full h-full bg-primary/40 z-5 rounded-2xl"></div>-->
<!--            <div class="relative z-10 text-white mix-blend-difference">-->
<!--                <div>-->
<!--                    <span class="number text-4xl md:text-6xl font-bold font-stint text-white"-->
<!--                          data-value="3">3-->
<!--                </span>-->
<!--                    <span class="relative z-10 text-5xl md:text-4xl font-stint font-bold">-->
<!--                        Lakh-->
<!--                    </span>-->

<!--                    <span class="relative z-10 text-5xl md:text-2xl font-stint font-bold">-->
<!--                    Young Filmmakers-->
<!--                    </span>-->
<!--                </div>-->
<!--                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">-->
<!--                    films produced by & for children-->
<!--                </p>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 bg-gray-50 border-2 border-surface rounded-2xl p-1 flex flex-col md:flex-row justify-center items-center">-->
<!--            <div class="h-[15rem] w-fit bg-gray-50 rounded-lg mx-1">-->
<!--                <img src={EmblemDark} alt="Government of India Logo" class="h-full w-auto mb-4"/>-->
<!--            </div>-->
<!--            <p class="text-primary text-xl font-karla uppercase font-bold text-center">-->
<!--                <span class="text-2xl text-center font-extrabold">ECA - APER</span><br/>-->
<!--                Conferred award for blending films in education</p>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 md:row-span-2 relative bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center overflow-hidden">-->
<!--            <div class="absolute inset-0">-->
<!--                <img src="{temp1}" alt="Background" class="w-full h-full object-cover"/>-->
<!--                <div class="absolute inset-0 bg-primary/60"></div>-->
<!--            </div>-->

<!--            <div class="relative z-10 text-white ">-->
<!--                <span class="number text-4xl md:text-6xl font-bold font-stint text-white"-->
<!--                      data-value="1500">1500-->
<!--                </span>-->
<!--                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">-->
<!--                    Young Filmmakers Inspired in urban and rural schools-->
<!--                </p>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="metric-box md:col-span-2 bg-gray-50 border-2 border-surface rounded-2xl p-1 flex flex-col md:flex-row justify-center items-center">-->
<!--            <div class="h-[15rem] w-fit bg-gray-50 rounded-lg mx-1">-->
<!--                <img src={EmblemDark} alt="Government of India Logo" class="h-full w-auto mb-4"/>-->
<!--            </div>-->
<!--            <div class="text-primary text-xl font-karla font-bold text-center">-->
<!--                <span class="text-2xl text-center font-extrabold">1<sup class="lowercase">st</sup> Academic Film Studio</span><br/>-->
<!--                Co-Production with Ladakh Government <br/>-->
<!--                Co-Production with Ladakh Autonomous Hill Development Council-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;    Ladakh behind ladhak bento grid&ndash;&gt;-->
<!--    &lt;!&ndash;    PPL video being 250+ bento&ndash;&gt;-->
<!--</section>-->

<!--        IN PHOTO REF REPLACE THE 3l with the PM-EVIDYA box Make sure the 3l one is landscape-->


<section bind:this={sectionRef} class="h-fit w-full bg-background">
    <div class="grid grid-cols-12 grid-rows-[repeat(12,minmax(100px,auto))] gap-4 m-4">
        <div class="metric-box flex flex-col justify-end items-start
                    col-start-1 row-start-1 col-span-12 row-span-3 md:col-start-1 md:row-start-1 md:col-span-7 md:row-span-3
                    bg-gray-50 rounded-2xl pl-4 pb-4 relative">
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <!-- Shift the image UP so the face are visible-->
                <img src="{temp4}" alt="Background" class="w-full h-full object-cover rounded-2xl "/>
                <div class="absolute inset-0 bg-primary/60 rounded-2xl -mt-4"></div>
            </div>
            <div>
                <span class="number relative z-10 text-orange-400 text-5xl md:text-7xl font-stint font-bold"
                      data-value="25">
                    25
                </span>
                <span class="relative z-10 text-brand-orange text-5xl md:text-7xl font-stint font-bold">
                    Crore <span class="text-3xl">School Children</span>
                </span>
            </div>
            <p class="mt-2 relative z-10 text-white text-xl font-karla uppercase font-bold mr-40">
                <span class="text-brand-orange">Mission</span> Quality educational
                content made affordable <br/> for Ministry Of Education’s PM eVIDYA initiative</p>
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-start-1 row-start-4 col-span-12 row-span-3 md:col-start-8 md:row-start-1 md:col-span-5 md:row-span-3
                    bg-gray-50 rounded-2xl pl-4 pb-4 relative">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{teacherTraining}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-primary/40 rounded-2xl "></div>
            <div class="relative z-10 text-brand-orange">
                <div>
                    <span class="number text-4xl md:text-6xl font-bold font-stint"
                          data-value="5000">5,000
                    </span>
                    <span class="relative z-10 text-5xl md:text-3xl font-stint font-bold tracking-tighter">
                    Teachers&nbsp;Trained
                    </span>
                </div>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">
                    Blending Film Pedagogy & Academics
            </div>
        </div>

        <div class="metric-box flex flex-col justify-center items-center
                    col-start-1 row-start-7 col-span-12 row-span-3 md:col-start-5 md:row-start-4 md:col-span-4 md:row-span-4
                    bg-gray-50 border-2 border-surface rounded-2xl pl-4 pb-4">
            <div class="flex flex-row justify-around items-center w-full">
                <div class="h-[8rem] w-fit bg-gray-50 rounded-lg mx-1">
                    <img src={year75logo} alt="Government of India Logo" class=" object-contain h-full w-auto mb-4"/>
                </div>
                <div class="h-[8rem] w-fit bg-gray-50 rounded-lg mx-1">
                    <img src={mygovlogo} alt="Government of India Logo" class="h-full w-auto mb-4"/>
                </div>
            </div>

            <p class="text-orange-400 mt-2 text-xl text-center font-karla uppercase font-bold">Recognized By Government
                Of India<br/> @75 Ideas</p>
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-start-1 row-start-17 col-span-12 row-span-4 md:col-start-1 md:row-start-4 md:col-span-4 md:row-span-5
                    bg-gray-50 rounded-2xl pb-4 pl-4 relative">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{yifVideoFinal}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute top-0 left-0 w-full h-full bg-primary/40 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-brand-orange">
                <div>
                    <span class="number text-4xl md:text-6xl font-bold font-stint text-brand-orange" data-value="300000">300000</span>
<!--                    <span class="relative z-10 text-5xl md:text-4xl font-stint font-bold">-->
<!--                        Lakh-->
<!--                    </span>-->
<!--                    <span class="relative z-10 text-5xl md:text-2xl font-stint font-bold">-->
                    <!--                        -->
                    <!--                    </span>-->
                </div>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">
                    Young Filmmakers Inspired
                </p>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-start-1 row-start-10 col-span-12 row-span-3 md:col-start-9 md:row-start-4 md:col-span-4 md:row-span-4
                    bg-gray-50 border-2 border-surface rounded-2xl pl-4 pb-4">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{studentfilmsbgvideo}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute top-0 left-0 w-full h-full bg-primary/40 z-5 rounded-2xl"></div>
            <div class="relative z-10 text-brand-orange">
                <div>
                    <span class="number text-4xl md:text-6xl font-bold font-stint text-brand-orange"
                          data-value="250">250</span>
                    <span class="relative z-10 text-5xl md:text-2xl font-stint font-bold inline-block">
                        Student Produced Films
                    </span>
                </div>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">
                    Produced by children and schools to create an impact</p>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-end items-start border-2 border-black
                    col-start-1 row-start-21 col-span-12 row-span-4 md:col-start-1 md:row-start-9 md:col-span-4 md:row-span-4
                    bg-gray-50 rounded-2xl pl-4 pb-4 relative">
            <div class="flex-shrink-0 min-w-0 h-full w-full bg-transparent
                    overflow-hidden z-[1]
                    absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-14">
                <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-[80%] w-full"
                />
            </div>
            <div class="relative z-10 text-primary text-center">
                <div class="text-primary">
                    <span class="number text-4xl md:text-5xl font-bold font-stint text-brand-orange"
                          data-value="11">11</span>
                    <br/>
                    <span class="relative z-10 text-xl md:text-2xl font-stint font-bold text-brand-orange">
                        Community Projects
                    </span>
                </div>
                <p class="text-primary text-center mt-2 text-xl font-karla uppercase font-bold">
                    Building social impact through film stories by connecting villages to the world
                </p>
            </div>
        </div>

        <div class="metric-box flex flex-col justify-center items-center border-2 border-black
                    col-start-1 row-start-25 col-span-12 row-span-4 md:col-start-5 md:row-start-8 md:col-span-4
                    md:row-span-5 bg-gray-50 rounded-2xl pl-4 pb-4 relative overflow-hidden">
            <video class="absolute top-0 left-0 w-full h-full object-cover z-[-1] rounded-2xl" autoplay loop muted
                   playsinline>
                <source src="{lahdcvid}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-primary/40 rounded-2xl "></div>
            <div class="flex flex-row justify-around items-center w-full z-10">
                <!--                <div class="h-[10rem] w-fit bg-transparent rounded-lg mx-1 z-10">-->
                <!--                    <img src={year75logo} alt="Government of India Logo" class="object-contain h-full w-auto mb-4 z-10"/>-->
                <!--                </div>-->
                <div class="h-[15rem] w-fit bg-transparent rounded-lg mx-1 z-10">
                    <img src={EmblemLight} alt="Government of India Logo" class="h-full w-auto mb-4 z-10"/>
                </div>
            </div>
            <p class="text-brand-orange mt-2 text-6xl text-center font-karla uppercase font-bold z-10">
                LAHDC
            </p>
            <p class="text-white mt-2 text-2xl text-center font-karla uppercase font-bold z-10">
                Academic Film Studio <br> Leh District, Ladakh
        </div>

        <div class="metric-box flex flex-col justify-end items-start
                    col-start-1 row-start-13 col-span-12 row-span-4 md:col-start-9 md:row-start-8 md:col-span-4 md:row-span-5
                    bg-gray-50 border-2 border-surface rounded-2xl pl-4 pb-4">
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <!-- Shift the image UP so the face are visible-->
                <img src="{studentfilmbg}" alt="Background" class="w-full h-full object-cover rounded-2xl"/>
                <div class="absolute inset-0 bg-primary/40 rounded-2xl "></div>
            </div>
            <div class="relative z-10 text-brand-orange">
                <div>
                    <span class="number text-4xl md:text-6xl font-bold font-stint text-brand-orange"
                          data-value="65">65</span>
                    <span class="relative z-10 text-5xl md:text-2xl font-stint font-bold">
                        Film Festivals
                    </span>
                </div>
                <p class="text-white mt-2 text-xl font-karla uppercase font-bold">
                    Special screenings, nominations and kids workshops worldwide</p>
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