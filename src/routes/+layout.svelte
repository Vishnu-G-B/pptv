<script>
    import "../app.css";
    import Navbar from "$lib/components/common/Navbar.svelte";
    import HorizontalNav from "$lib/components/common/HorizontalNav.svelte";
    import {page} from "$app/stores";

    const hideHorizontalNavPaths = ['/'];
    const hideNavbarPaths = ['/'];

    $: showHorizontalNav = !hideHorizontalNavPaths.includes($page.url.pathname);
    $: showNavbar = !hideNavbarPaths.includes($page.url.pathname);

</script>

{#if showHorizontalNav}
    <HorizontalNav/>
{/if}

<slot/>

{#if showNavbar}
    <Navbar/>
{/if}
