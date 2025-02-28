<script>
    import PPLlogo from "$lib/assets/images/PPLlogo.png";
    import AutoText from "$lib/components/common/AutoText.svelte";
    import {gsap} from "gsap/dist/gsap";

    let hoverColors = ['#5cb85c', '#ff9900'];
    let hoverCounter = 0;

    function handleFooterLinkHover(hoveredElement) {
        gsap.to(hoveredElement.target, {
            color: hoverColors[hoverCounter%(hoverColors.length)],
            scale: 1.05,
            duration: 0.5,
            ease: 'expo',
        });
        hoverCounter++;
    }

    function handleFooterLinkUnhover(unhoveredElement) {
        gsap.to(unhoveredElement.target, {
            color: '#f6f5ec',
            scale: 1,
            duration: 0.5,
            ease: 'expo',
        });
    }
</script>

<div class="h-fit bg-surface w-full md:flex md:flex-row md:gap-5 lg:justify-between lg:gap-9 p-5 relative ">
    <div class="flex flex-col md:w-[200px] lg:w-[300px] gap-20">
        <div class="h-[40px] w-[40px] md:h-[50px] md:w-[50px] mt-14">
            <img alt="" class="h-full w-full object-cover" src="{PPLlogo}">
        </div>
        <div class="flex flex-col w-fit gap-2">
            <p class="text-[0.65rem] sm:text-[0.75rem] text-background/50 uppercase brand-font font-light">
                // Send Us A Message!
            </p>
            <button class="w-full h-fit p-2 relative overflow-hidden bg-background brand-font text-[0.65rem] sm:text-[0.75rem] font-bold rounded-xl transition-all duration-300 group hover:border-2 hover:border-brand-green active:scale-95">
                <div class="absolute top-[100%] left-0 bg-brand-orange group-hover:top-0 w-full h-full transition-all duration-300 rounded-xl"></div>
                <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-primary">Contact
                    Us</p>
                <p class="opacity-0">Contact Us</p>
            </button>
        </div>
    </div>
    <div class="flex flex-col lg:flex-row lg:flex-wrap">
        <div class="flex flex-col sm:flex-row items-start justify-center sm:justify-start sm:items-start w-full h-fit mt-14 gap-3 sm:gap-10 lg:w-fit">
            <div class="flex flex-row w-fit sm:w-[150px] items-center gap-2 ">
                <div class="bg-brand-orange h-1 w-1"></div>
                <p class="text-[0.65rem] sm:text-[0.75rem] brand-font font-normal text-background uppercase">
                    Placeholder</p>
            </div>
            <div class="flex flex-col w-full gap-1 text-xl font-light sm:gap-3 lg:w-[300px]">
                <a class="brand-font text-background sm:leading-5 footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>PM eVIDYA School Studio</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Young India Filmmakers</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Kidding Around Bharat</a>
            </div>
        </div>
        <div class="flex flex-col items-start justify-center w-full h-fit mt-14 gap-3 sm:flex-row sm:justify-start sm:items-start sm:gap-10 lg:w-fit">
            <div class="flex flex-row w-fit sm:w-[150px] items-center gap-2 ">
                <div class="bg-brand-green h-1 w-1"></div>
                <p class="text-[0.65rem] sm:text-[0.75rem] brand-font font-normal text-background uppercase">
                    Placeholder</p>
            </div>
            <div class="flex flex-col w-full justify-start gap-1 text-xl font-light sm:gap-3 lg:w-[300px]">
                <a class="brand-font text-background sm:leading-5 footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>ECA TV</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Impact Projects</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>The Crew Story</a>
            </div>
        </div>
        <div class="flex flex-col items-start justify-center w-full h-fit mt-14 gap-3 sm:flex-row sm:justify-start sm:items-start sm:gap-10 lg:w-fit">
            <div class="flex flex-row w-fit sm:w-[150px] items-center gap-2 ">
                <div class="bg-brand-orange h-1 w-1"></div>
                <p class="text-[0.65rem] sm:text-[0.75rem] brand-font font-normal text-background uppercase">
                    Placeholder</p>
            </div>
            <div class="flex flex-col w-full gap-1 text-xl font-light sm:gap-3 lg:w-[300px]">
                <a class="brand-font text-background sm:leading-5 footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>FAQs</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Press & Partners</a>
            </div>
        </div>
        <div class="flex flex-col items-start justify-center w-full h-fit mt-14 gap-3 mb-5 sm:flex-row sm:justify-start sm:items-start sm:gap-10 lg:w-fit">
            <div class="flex flex-row w-fit sm:w-[150px] items-center gap-2 ">
                <div class="bg-brand-green h-1 w-1"></div>
                <p class="text-[0.65rem] sm:text-[0.75rem] brand-font font-normal text-background uppercase">Socials</p>
            </div>
            <div class="flex flex-col w-full gap-1 text-xl font-light sm:gap-3 lg:w-[300px]">
                <a class="brand-font text-background sm:leading-5 footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Instagram</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>Youtube</a>
                <a class="brand-font text-background footer-link cursor-pointer" on:mouseleave={handleFooterLinkUnhover}
                   on:mouseover={handleFooterLinkHover}>LinkedIn</a>
            </div>
        </div>
    </div>
    <div class="flex absolute right-0 top-0 h-full">
        <div class="h-full w-[30px] bg-brand-orange"></div>
        <div class="h-full w-[30px] bg-brand-green"></div>
    </div>


    <!--    <div class="w-full h-fit">-->
    <!--        <AutoText-->
    <!--                className="rounded-lg"-->
    <!--                maxSize={1000}-->
    <!--                minSize={16}-->
    <!--                text="#Go Purple"-->
    <!--        />-->
    <!--    </div>-->
</div>
<!--<div class="pt-2 w-full flex flex-col items-center justify-center sticky -z-[1] bottom-0 h-full">-->
<!--    <div class="absolute left-1 top-0 h-1/2 w-[2px] bg-brand-orange">-->
<!--        <div class="h-2 w-2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-brand-orange rounded-full"></div>-->
<!--    </div>-->
<!--    <div class="absolute left-3 top-0 h-1/3 w-[2px] bg-brand-green">-->
<!--        <div class="h-2 w-2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-brand-green rounded-full"></div>-->
<!--    </div>-->

<!--    <AutoText-->
<!--            className="rounded-lg brand-font font-extrabold text-primary"-->
<!--            maxSize={1000}-->
<!--            minSize={16}-->
<!--            text="Edutainment With A Purpose"-->
<!--    />-->
<!--    <p class="text-sm sm:text-xl brand-font text-bold text-primary -mt-2 mb-3">-->
<!--        <span class="bg-brand-orange">#</span>Go Purple <span class="bg-brand-green">#</span>ONEderfull-->
<!--    </p>-->
<!--    <div class="h-[1px] w-full border-[1px] border-dotted border-surface mb-3"></div>-->
<!--    <div class="h-fit w-full flex flex-row mb-3 px-5 justify-between">-->
<!--        <p class="text-[0.65rem] text-black font-bold brand-font">-->
<!--            © 2025 Purple People Labs <span class="text-black/70">// ALL RIGHTS RESERVED</span>-->
<!--        </p>-->
<!--&lt;!&ndash;        <p class="text-[0.65rem] text-black font-bold brand-font">&ndash;&gt;-->
<!--&lt;!&ndash;            WE RESPECT YOUR PRIVACY&ndash;&gt;-->
<!--&lt;!&ndash;        </p>&ndash;&gt;-->
<!--    </div>-->
<!--    <div class="flex absolute right-0 top-0 h-full -z-[1]">-->
<!--        <div class="h-full w-[30px] bg-brand-orange"></div>-->
<!--        <div class="h-full w-[30px] bg-brand-green"></div>-->
<!--    </div>-->
<!--</div>-->
