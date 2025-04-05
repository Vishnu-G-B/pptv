<script>
    import AutoText from "./AutoText.svelte";
</script>

<!--    <div class="w-full h-fit">-->
<!--        <AutoText-->
<!--                className="rounded-lg"-->
<!--                maxSize={1000}-->
<!--                minSize={16}-->
<!--                text="#Go Purple"-->
<!--        />-->
<!--    </div>-->
<div class="flex flex-col">
    <div class="min-h-screen lg:min-h-fit w-full h-fit flex flex-col md:flex-row md:justify-between md:items-start bg-alternate-primary py-8 px-6 relative z-[5]">
        <div class="flex flex-col w-fit h-fit">
            <p class="text-xl md:text-3xl lg:text-6xl brand-font text-background">Edutainment With</p>
            <p class="text-xl md:text-3xl lg:text-6xl brand-font text-background">A <span
                    class="italic font-[1000]">Purpose</span>
            </p>
            <!--            <div class="h-fit w-fit">-->
            <!--                <p class="text-sm md:text-lg brand-font lg:text-xl text-background/80 mt-5">-->
            <!--                    Lights, camera… let’s stay in touch!-->
            <!--                </p>-->
            <!--                <input class="w-full bg-transparent mt-2 shadow-[5px_8px_0px_0px_rgba(255,153,0,1)] text-background brand-font p-2 outline-2 outline outline-brand-orange rounded-lg"-->
            <!--                       placeholder="Your Email"-->
            <!--                       type="email">-->
            <!--            </div>-->
            <button class="w-fit px-5 h-fit text-sm py-1 mt-5 active:bg-brand-orange hover:bg-brand-orange transition-colors duration-300 brand-font text-alternate-primary bg-brand-green rounded-xl">
                Contact Us
            </button>
        </div>
        <div class="flex flex-col">
            <div class="w-full h-fit flex flex-col items-end justify-start text-sm md:text-lg tracking-tight font-thin brand-font text-background mt-14 md:mt-0 gap-3">
                <p>PM eVIDYA School Studio</p>
                <p>Young India Filmmakers</p>
                <p>Kidding Around Bharat</p>
                <p>ECA TV</p>
                <p>Impact Projects</p>
                <p>The Crew Story</p>
            </div>
            <div class="w-full h-fit flex flex-col items-end justify-start text-sm md:text-lg tracking-tight font-thin brand-font text-background mt-14 gap-3">
                <p>Press & Partners</p>
                <p>FAQs</p>
            </div>
            <div class="w-full h-fit flex flex-row items-start justify-end mt-14 gap-3">
                <div class="h-5 w-5 rounded-full bg-brand-orange"></div>
                <div class="h-5 w-5 rounded-full bg-brand-green"></div>
                <div class="h-5 w-5 rounded-full bg-brand-orange"></div>
            </div>
            <div class="absolute bottom-3 left-0 w-full h-fit flex items-center justify-between px-5">
                <div class="h-fit w-fit flex flex-row items-end">
                    <!--            <img alt="" class="h-14 w-14" src="{PPLlogo}">-->
                    <p class="text-sm brand-font text-background font-thin">©Purple People Labs 2025</p>
                </div>
                <!--        <p class="text-sm brand-font text-background font-thin">All Rights Reserved</p>-->
            </div>
        </div>
    </div>
</div>