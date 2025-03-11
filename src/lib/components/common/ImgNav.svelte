<script>
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import evidyaLogo from "$lib/assets/images/evidyaLogo.png";
    import ecatvlogo from "$lib/assets/images/ecatv.jpeg";
    import projectGulak from "$lib/assets/images/Project Gullak Logo.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import yif_logo from "$lib/assets/images/YIF logo (2).png";
    import {onDestroy, onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {blur} from "svelte/transition";

    gsap.registerPlugin(ScrollTrigger);

    let scrollThres = 200;
    let scaleFactor = 0.8;

    onMount(() => {

        gsap.fromTo(
            ".navAnim",
            {
                opacity: 0,
                y: -30,
                transformOrigin: "bottom center"
            },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "expo.out",
                stagger: 0.1
            }
        );

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: `${scrollThres}px top`,
                toggleActions: "play reverse play reverse",
            }
        });
        tl
            .to('.navAnim img', {
                scale: scaleFactor,
                ease: "power1.out",
                duration: 0.3
            }, 0)
            .to('.imageContainer', {
                gap: "1vw",
                paddingTop: "0.5vh",
                paddingBottom: "1vh",
                paddingLeft: "1vw",
                marginTop: "-30px",
                ease: "power1.out",
                duration: 0.3
            }, 0)
            .to('.firstImg', {
                marginRight: "-1rem",
                ease: "power1.out",
                duration: 0.3,
            }, 0)
            .to(".gopurpleButton", {
                display: "block",
                opacity: 1,
                ease: "power1.out",
                duration: 0.3,
            }, 0)
            .to(".bgBlurDiv", {
                backdropFilter: "blur(16px)",
                ease: "power1.out",
                duration: 0.3,
            }, 0)
    });
    onDestroy(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    })


</script>

<div class="h-fit w-full sticky top-0 z-50 ">
    <div class="imageContainer h-fit w-full absolute top-0 left-0 flex justify-start items-center
                gap-[2vw] pt-[1vh] pb-[1vh] pl-[2vw] z-50">
        <div class="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[1]">
            <hr class="border-t-2 border-primary">
        </div>
        <div class="absolute top-1/2 left-0 w-full translate-y-[0.3rem] z-[1]">
            <hr class="border-t-2 border-brand-orange">
        </div>
        <div class="absolute top-1/2 left-0 w-full -translate-y-[0.4rem] z-[1]">
            <hr class="border-t-2 border-brand-green">
        </div>
        <div class="bgBlurDiv absolute top-0 left-0 w-full h-[130px] z-0 backdrop-blur-0">
        </div>

        <div class="gopurpleButton  absolute w-[200px] h-[100px] top-1/2 right-0
                    transform -translate-x-1/2 -translate-y-[30%] z-[2] opacity-0 hidden">
            <button class="animate-button text-base md:text-3xl text-white px-4 md:px-8 py-2 md:py-3
                        rounded-xl font-bold font-sans transition-colors duration-300 backdrop-blur-sm bg-[#660066]">
                #GoPurple
            </button>
        </div>

        <div class="navAnim firstImg flex-shrink-0 min-w-0 h-[12vh] min-[426px]:h-[20vh] w-auto max-w-[15vh]
                    bg-transparent rounded-full overflow-hidden mr-4 z-[1]">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10vh] w-[10vh] bg-transparent rounded-full
                    overflow-hidden z-[1]">
            <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-contain h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11vh] min-[426px]:w-[11vh]
                    bg-transparent rounded-full overflow-hidden z-[1]">
            <img src="{evidyaLogo}" alt="Evidya Logo" class="object-cover h-full w-full rounded-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[9vh] min-[426px]:w-[9vh]
                    bg-transparent rounded-full overflow-hidden z-[1]">
            <img src="{ecatvlogo}" alt="Ecatv Logo" class="object-cover h-full w-full rounded-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[12.5vh] w-[9vh] bg-transparent
                    overflow-hidden z-[1]">
            <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10.1vh] w-[10vh] bg-transparent
                    overflow-hidden z-[1]">
            <img src="{swadeshplex}" alt="Swadeshplex Logo" class="object-contain h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] min-[426px]:h-[10.1vh] w-[10vh] bg-transparent
                    overflow-hidden z-[1]">
            <img src="{yif_logo}" alt="YIF Logo" class="object-contain h-full w-full"
            />
        </div>


    </div>
</div>