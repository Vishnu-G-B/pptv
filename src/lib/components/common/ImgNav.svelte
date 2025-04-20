<script>
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import kiddinglogo from "$lib/assets/images/Kidding Around Bharat.png";
    import evidyaLogo from "$lib/assets/images/evidyaLogo.png";
    import ecatvlogo from "$lib/assets/images/ecatv.jpeg";
    import ecatvlogo2 from "$lib/assets/images/ecatv.png";
    import projectGulak from "$lib/assets/images/Project_Gullak_Logo_Final.png";
    import swadeshplex from "$lib/assets/images/SWADESHPLEX_LOGO.png";
    import yif_logo from "$lib/assets/images/YIF_logo_final.png";
    import {onDestroy, onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

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
                marginTop: "-10px",
                ease: "power1.out",
                duration: 0.3
            }, 0)
            .to('.firstImg', {
                marginRight: "-0.5rem",
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
                gap-[1vw] min-[376px]:gap-[2vw] pl-1 min-[376px]:p-[0vw] sm:pl-[2vw] sm:py-0 sm:pr-0 z-50 overflow-hidden">
        <div class="absolute top-1/2 left-0 w-full -translate-y-1/2 z-[1] overflow-hidden">
            <hr class="border-t-2 border-primary border-dashed">
            <!--            <hr class="border-t-2 border-[#adff30] opacity-75 mt-1">-->
        </div>

        <div class="navAnim firstImg flex-shrink-0 min-w-0 h-[7vh] min-[426px]:h-[20vh] w-auto max-w-[15vh]
                    bg-transparent rounded-full overflow-hidden mr-0 min-[426px]:mr-4 z-[1]">
            <img src="{PPLlogo}" alt="PPL labs Logo" class="object-contain h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[7vh] w-[7vh] min-[426px]:h-[10vh] min-[426px]:w-[10vh] bg-transparent
                    overflow-hidden z-[1]">
            <img src="{yif_logo}" alt="YIF Logo" class="object-cover h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11vh] min-[426px]:w-[11vh]  bg-transparent
                    overflow-hidden z-[1]">
            <img src="{swadeshplex}" alt="Swadeshplex Logo" class="object-cover h-full w-full"
            />
        </div>


        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11.5vh] min-[426px]:w-[11.5vh] bg-transparent rounded-full
                    overflow-hidden z-[1]">
            <img src="{kiddinglogo}" alt="Kidding Bharat Logo" class="object-cover h-full w-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[8vh] w-[8vh] min-[426px]:h-[11.5vh] min-[426px]:w-[11.5vh]
                    bg-transparent rounded-full overflow-hidden z-[1]">
            <img src="{evidyaLogo}" alt="Evidya Logo" class="object-cover h-full w-full rounded-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[7vh] w-[7vh] min-[426px]:h-[10.5vh] min-[426px]:w-[11vh]
                            bg-transparent rounded-full overflow-hidden z-[1]">
            <img src="{ecatvlogo2}" alt="Ecatv Logo" class="object-contain h-full w-full rounded-full"
            />
        </div>

        <div class="navAnim flex-shrink-0 min-w-0 h-[9vh] w-[8vh] min-[426px]:h-[13vh] min-[426px]:w-[12vh]  bg-transparent
                    overflow-hidden z-[1]">
            <img src="{projectGulak}" alt="Project Gulak Logo" class="object-cover h-full w-full"
            />
        </div>
    </div>
</div>