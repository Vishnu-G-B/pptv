<script>
    import Faq from "$lib/components/PPLlabs/faq.svelte";
    import {signIn, signOut} from '@auth/sveltekit/client';
    import clapper from "$lib/assets/images/icons/clapperboard.gif"
    import medal from "$lib/assets/images/icons/medal.gif";
    import filmtape from "$lib/assets/images/icons/film-tape.gif"
    import chair from "$lib/assets/images/icons/director-chair.png"

    const reasons = [
        {
            title: "Free Edutainment",
            description: "Coz we support the PM eVIDYA initiative & promotion of  positive transformative films",
            icon_path: clapper
        },
        {
            title: "Enjoy Rewards",
            description: "Earn reward points redeemable from our Rurban Bazaar for each film you watch",
            icon_path: medal,
        },
        {
            title: "Feature Your Film",
            description: "You can learn to make a film on our school programs & feature your own film too.",
            icon_path: filmtape
        },
        {
            title: "Make A Difference",
            description: "While watching & promoting our films you support our CSR project SwadeshPLEX",
            icon_path: chair
        }
    ];

    const trending = [
        "ECA TV Star Hunt", "Project YIF", "Teacher Talkies",
        "Kidding<br/>Around<br/>Bharat", "Swadesh PLEX", "eVIDYA School Studio"
    ];
    const handleSignIn = async () => {
        console.log('Signing IN');
        await signIn('google', {callbackUrl: '/?signedIn'});
    };

    const handleSignOut = async () => {
        console.log('signing Out');
        await signOut({callbackUrl: '/?signedOut'});
    };
</script>

<!--<div class="w-full h-fit bg-surface pb-28">-->
<!--    <div class="px-4 md:px-10 lg:px-20 flex justify-center py-5 pt-24">-->
<!--        <div class="w-full max-w-7xl">-->
<!--            <div class="flex flex-col lg:flex-row lg:items-center lg:gap-8">-->
<!--                <div-->
<!--                        class="w-full lg:w-3/5 bg-center bg-no-repeat bg-cover rounded-xl aspect-video mb-6 lg:mb-0"-->
<!--                        style='background-image: url("https://cdn.usegalileo.ai/replicate/73e5fd16-777b-43b4-be83-806c937200d5.png");'-->
<!--                ></div>-->
<!--                <div class="lg:w-2/5 flex flex-col gap-6">-->
<!--                    <div class="flex flex-col gap-2 text-left">-->
<!--                        <h1-->
<!--                                class="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight"-->
<!--                        >-->
<!--                            Make A Difference One Film At A Time-->
<!--                        </h1>-->
<!--                        <h2 class="text-gray-300 text-sm sm:text-base lg:text-lg font-normal leading-normal">-->
<!--                            Free Edutainment Content, Festivals &amp; Impact Projects For Students, Teachers &amp;-->
<!--                            Parents-->
<!--                        </h2>-->
<!--                    </div>-->
<!--                    <label class="flex flex-col w-full max-w-[480px]">-->
<!--                        <div class="flex w-full items-stretch rounded-xl h-12 sm:h-14 lg:h-16">-->
<!--                            <div-->
<!--                                    class="text-white flex border-none bg-[#F4EFE6] items-center justify-center pl-4 rounded-l-xl border-r-0"-->
<!--                            >-->
<!--                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"-->
<!--                                     fill="purple" viewBox="0 0 256 256">-->
<!--                                    <path-->
<!--                                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"-->
<!--                                    ></path>-->
<!--                                </svg>-->
<!--                            </div>-->
<!--                            <input-->
<!--                                    placeholder="Email or Mobile No."-->
<!--                                    class="flex-grow form-input min-w-0 overflow-hidden text-[#1C160C] focus:outline-0 focus:ring-0 border-none bg-[#F4EFE6] focus:border-none h-full placeholder:text-[#A18249] px-4 rounded-none text-sm sm:text-base font-normal leading-normal"-->
<!--                                    value=""-->
<!--                            />-->
<!--                            <div class="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#F4EFE6] pr-2">-->
<!--                                <button-->
<!--                                        class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 sm:h-12 sm:px-5 bg-purple-900 text-[#FFFFFF] text-sm sm:text-base font-bold leading-normal tracking-tight"-->
<!--                                        on:click={handleSignIn}-->
<!--                                >-->
<!--                                    <span class="truncate">Go Purple</span>-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </label>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<div class="w-full h-screen bg-surface relative">
    <div
            class="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-70"
            style='background-image: url("https://cdn.usegalileo.ai/replicate/73e5fd16-777b-43b4-be83-806c937200d5.png");'
    ></div>
    <!-- Purple filter overlay -->
    <!-- To adjust the strength of the purple filter, change the 'opacity-50' class below.
         Increase the number for a stronger effect (e.g., opacity-60, opacity-70),
         or decrease it for a weaker effect (e.g., opacity-40, opacity-30). -->
    <div class="absolute inset-0 bg-purple-900 opacity-30 mix-blend-multiply"></div>
    <div class="relative flex items-center justify-center h-full px-4 md:px-10 lg:px-20">
        <div class="w-full max-w-3xl text-center">
            <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
                Make A Difference One Film At A Time
            </h1>
            <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-normal leading-normal mb-8">
                Free Edutainment Content, Festivals &amp; Impact Projects For Students, Teachers &amp; Parents
            </h2>
            <div class="flex justify-center">
                <label class="flex flex-col w-full max-w-[480px]">
                    <div class="flex w-full items-stretch h-14 sm:h-16">
                        <!--                        <div class="text-white flex border-none bg-[#F4EFE6] items-center justify-center pl-4 rounded-l-xl border-r-0">-->
                        <!--                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="purple"-->
                        <!--                                 viewBox="0 0 256 256">-->
                        <!--                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>-->
                        <!--                            </svg>-->
                        <!--                        </div>-->
                        <input
                                placeholder="Email or Mobile No."
                                class="flex-grow form-input min-w-0 overflow-hidden text-[#1C160C] rounded-l-xl bg-[#F4EFE6]
                                placeholder:text-[#A18249] px-4 text-base sm:text-lg font-normal leading-normal"
                                value=""
                        />
                        <div class="flex items-center justify-center rounded-r-xl border-none bg-[#F4EFE6] pr-2">
                            <button
                                    class="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden
                                    rounded-full h-12 px-6 sm:h-14 sm:px-7 bg-purple-900 text-[#FFFFFF] text-base
                                    sm:text-lg font-bold leading-normal tracking-tight"
                                    on:click={handleSignIn}
                            >
                                <span class="truncate">Go Purple</span>
                            </button>
                        </div>
                    </div>
                </label>
            </div>
            <p class="mt-6 text-gray-200 text-sm sm:text-base max-w-2xl mx-auto">
                Join our community of filmmakers, educators, and changemakers. By signing up, you'll get access to
                exclusive content, resources, and opportunities to make a positive impact through the power of film.
                Let's create, learn, and inspire together!
            </p>
        </div>
    </div>
</div>

<div class="bg-surface grid-lines text-white p-6 px-24">
    <h2 class="text-4xl font-bold mb-4 primary-font">Reasons To Join</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {#each reasons as reason}
            <div class="bg-[#da8103] px-4 pt-10 pb-6 rounded-lg text-left relative">
                <h3 class="font-semibold mb-2 primary-font text-2xl">{reason.title}</h3>
                <p class="text-sm text-left">{reason.description}</p>
                <img src="{reason.icon_path}" alt="icon" class="w-[48px] h-auto object-cover absolute top-2 right-6">
            </div>
        {/each}
    </div>

    <h2 class="text-4xl font-bold mb-4 primary-font">What's Trending</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {#each trending as item, index}
            <div class="h-[300px] bg-primary text-white p-4 py-10 relative rounded-xl text-center
                        flex justify-center items-center">
                <span class="text-[3.3rem] font-extrabold primary-font absolute left-1 bottom-[-20px]">{index + 1}</span>
                <div class="primary-font h-full text-2xl text-left flex items-center justify-start">{@html item}</div>
            </div>
        {/each}
    </div>

    <h2 class="text-4xl font-bold mb-4 primary-font">Why Purple People Labs?</h2>
    <div class="h-[15rem] w-full bg-primary rounded-lg mb-10"></div>

    <h2 class="text-4xl font-bold mb-4 primary-font">Rurban Bazaar Rewards</h2>
    <div class="h-[30rem] w-full rounded-lg mb-10">
        <div class="h-full w-full grid grid-cols-9 grid-rows-5 gap-4">
            <div class="col-span-2 row-span-5 h-full w-full bg-[#da8103] rounded-lg text-left pl-5
                        flex flex-col justify-center items-start  text-3xl">
                <span class="primary-font text-6xl font-bold block">30%</span>
                <span class="primary-font text-4xl font-bold block">Additional</span>
                <span class="primary-font text-4xl font-bold block">Discount</span>
            </div>
            <div class="col-span-3 row-span-3 col-start-3h-full w-full bg-[#da8103] rounded-lg text-left px-5
                        flex flex-col justify-center items-start text-3xl">
                <span class="primary-font text-4xl font-bold block">Exclusive</span>
            </div>
            <div class="col-span-3 row-span-2 col-start-3 row-start-4 h-full w-full bg-[#da8103] rounded-lg text-left
                        px-5 flex flex-col justify-center items-start text-3xl">
                <span class="primary-font text-6xl font-bold block">100%</span>
                <span class="primary-font text-4xl font-bold block">Organic</span>
            </div>
            <div class="col-span-4 row-span-2 col-start-6 row-start-1 h-full w-full bg-[#da8103] rounded-lg text-center
                        px-5 flex flex-col justify-center items-center text-3xl">
                <span class="primary-font text-4xl font-bold block">Farm to Home</span>
            </div>
            <div class="col-span-2 row-span-3 col-start-6 row-start-3 h-full w-full bg-[#da8103] rounded-lg text-center
                        px-5 flex flex-col justify-center items-start text-3xl">
                <span class="primary-font text-5xl font-bold block mb-2">BUY 1</span>
                <span class="primary-font text-5xl font-bold block">GET 1</span>
            </div>
            <div class="col-span-2 row-span-3 col-start-8 row-start-3 h-full w-full bg-[#da8103] rounded-lg text-center
                        px-5 flex flex-col justify-start items-start text-3xl pt-5">
                <span class="primary-font text-4xl font-bold block mb-2">Enjoy</span>
                <span class="primary-font text-4xl font-bold block">Free Meal</span>
            </div>
        </div>

    </div>

    <!--    <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>-->
    <Faq/>
</div>

<style>
    .background-image {
        background-image: url("src/lib/assets/images/tempbg.jpg");
        background-size: cover;
    }
</style>