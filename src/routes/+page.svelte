<script>
    import BentoBox from "$lib/components/common/BentoBox.svelte";
    import Landing from "$lib/components/PPLlabs/Landing.svelte";
    import ArcedCards from "$lib/components/common/ArcedCards.svelte";
    import Footer from "$lib/components/common/Footer.svelte";
    import TextCarousel from '$lib/components/common/textCarousel.svelte';
    import ImgNav from "$lib/components/common/ImgNav.svelte";
    import Watchlist from "$lib/components/common/watchlist.svelte";
    import FlashcardParent from "$lib/components/common/FlashcardParent.svelte";
</script>

<ImgNav/>
<Landing/>
<BentoBox/>
<Watchlist/>
<div class="h-[400px] bg-background"></div>
<!--<TextCarousel/>-->
<FlashcardParent/>
<ArcedCards/>
<Footer/>

