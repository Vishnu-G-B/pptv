<script>
    import yifLogo from "$lib/assets/images/YIF logo.png";

    function desktopNavLinkHover() {
        let navLinks = document.getElementsByClassName('desktop-nav-links-description');
        for (let link of navLinks) {
            link.classList.remove('hidden');
        }
        let navOverlay = document.getElementById('desktop-nav-overlay');
        navOverlay.classList.remove('hidden');
    }

    function desktopNavLinkLeave() {
        let navLinks = document.getElementsByClassName('desktop-nav-links-description');
        for (let link of navLinks) {
            link.classList.add('hidden');
        }
        let navOverlay = document.getElementById('desktop-nav-overlay');
        navOverlay.classList.add('hidden');
    }
</script>

<!--DESKTOP NAVBAR-->
<div class="w-full h-screen fixed top-0 hidden bg-gradient-to-r from-surface/70 to-transparent to-30% z-[2]"
     id="desktop-nav-overlay"></div>
<div class="w-fit h-screen fixed backdrop-blur-sm transition-all duration-300 left-0 top-0 flex flex-col items-start justify-center p-3 gap-5 z-[4]"
     on:mouseover={desktopNavLinkHover} on:mouseleave={desktopNavLinkLeave} on:focus={()=>{}} role="button"
     tabindex="0">
    <div class="w-fit h-fit absolute top-3">
        <p class="text-sm text-on-surface primary-font">logo</p>
    </div>
    <div class="w-fit h-fit flex flex-row gap-2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" class="fill-on-surface">
            <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z"/>
        </svg>
        <p class="text-lg primary-font text-on-surface hidden desktop-nav-links-description">Home</p>
    </div>
    <div class="w-fit h-fit flex flex-row gap-2 items-center justify-center">
        <img src="{yifLogo}" alt="logo of young india festival" class="w-[30px] h-[30px] object-cover">
        <p class="text-lg primary-font text-on-surface hidden desktop-nav-links-description">Young India Filmmakers</p>
    </div>
</div>