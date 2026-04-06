<script>
    import "../app.css";
    import Navbar from "$lib/components/common/Navbar.svelte";
    import HorizontalNav from "$lib/components/common/HorizontalNav.svelte";
    import ModalContainer from "$lib/components/common/ModalContainer.svelte";
    import {page} from "$app/stores";

    const hideHorizontalNavPaths = ['/', '/test'];
    const hideNavbarPaths = ['/', '/test'];

    $: showHorizontalNav = !hideHorizontalNavPaths.includes($page.url.pathname);
    $: showNavbar = !hideNavbarPaths.includes($page.url.pathname);
</script>

<!-- ModalContainer sits at the ROOT of the DOM — outside all overflow/stacking contexts.
     z-index 9000 ensures it's always above everything including ImgNav (z-50). -->
<ModalContainer/>

<slot/>

{#if showNavbar}
    <Navbar/>
{/if}
