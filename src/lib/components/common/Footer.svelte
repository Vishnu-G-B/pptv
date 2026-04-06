<script>
    import AutoText from "./AutoText.svelte";
    import footertemp from "$lib/assets/images/footer_temp.jpg";
    import {openContact} from '$lib/stores/modalStore.js';
</script>

<div class="flex flex-col">
    <div class="min-h-screen lg:min-h-fit w-full h-fit flex flex-col md:flex-row md:justify-between md:items-start bg-alternate-primary py-8 px-6 relative z-[5]">
        <div class="flex flex-col w-fit h-fit">
            <p class="text-xl md:text-3xl lg:text-6xl brand-font text-background">Edutainment With</p>
            <p class="text-xl md:text-3xl lg:text-6xl brand-font text-background">A <span
                    class="italic font-[1000]">Purpose</span>
            </p>
            <!-- Contact Us button now opens the modal -->
            <!--            <button-->
            <!--                on:click={openContact}-->
            <!--                class="w-fit px-5 h-fit text-sm py-1 mt-5 active:bg-brand-orange hover:bg-brand-orange-->
            <!--                       transition-colors duration-300 brand-font text-alternate-primary bg-brand-green rounded-xl">-->
            <!--                Contact Us-->
            <!--            </button>-->
            <button on:click|preventDefault={openContact}
                    class="w-1/2 mt-4 px-8 py-3 rounded-xl bg-brand-green text-black font-bold text-lg uppercase tracking-wide
                  active:bg-brand-orange hover:bg-brand-orange transition-colors duration-200">
                Contact Us
            </button>
        </div>
        <div class="flex flex-col">
            <div class="w-full h-fit flex flex-col items-end justify-start text-sm md:text-lg tracking-tight font-thin brand-font text-background mt-14 md:mt-0 gap-3">
                <img src="{footertemp}" alt="" class="h-[150px] w-auto rounded-full">
            </div>
            <div class="w-full h-fit flex flex-row items-start justify-end mt-14 gap-3 mr-10">
                <div class="h-5 w-5 rounded-full bg-brand-orange"></div>
                <div class="h-5 w-5 rounded-full bg-brand-green"></div>
                <div class="h-5 w-5 rounded-full bg-brand-orange"></div>
            </div>
            <div class="absolute bottom-3 left-0 w-full h-fit flex items-center justify-between px-5">
                <div class="h-fit w-fit flex flex-row items-end">
                    <p class="text-sm brand-font text-background font-thin">©Purple People Labs 2025</p>
                </div>
            </div>
        </div>
    </div>
</div>
