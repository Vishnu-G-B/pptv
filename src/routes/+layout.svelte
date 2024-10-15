<script>
    import "../app.css";
    import Navbar from "$lib/components/common/Navbar.svelte";
    import HorizontalNav from "$lib/components/common/HorizontalNav.svelte";
</script>

<HorizontalNav/>
<slot/>
<Navbar/>
