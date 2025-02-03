<script>
    import {onMount} from "svelte";
    import gsap from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import vidsrc from "$lib/assets/images/output.mp4";

    let videoEl;
    let containerEl;

    function once(el, event, fn, opts) {
        const onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn, opts);
        return onceFn;
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Preload the video to ensure smooth playback
        videoEl.load();

        once(document.documentElement, "touchstart", () => {
            videoEl.play();
            videoEl.pause();
        });

        // Pre-calculate video frames for smoother scrubbing
        once(videoEl, "loadedmetadata", () => {
            // Ensure video is ready before creating timeline
            videoEl.currentTime = 0;

            const tl = gsap.timeline({
                defaults: {duration: 1},
                scrollTrigger: {
                    trigger: containerEl,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5, // Add smooth scrubbing with a small delay
                    anticipatePin: 1, // Helps with smoother start
                    invalidateOnRefresh: true, // Ensures accuracy after resize
                    fastScrollEnd: true, // Improves performance during fast scrolling
                }
            });

            tl.fromTo(
                videoEl,
                {
                    currentTime: 0
                },
                {
                    currentTime: videoEl.duration || 1,
                    ease: "none", // Linear interpolation for smooth scrubbing
                }
            );
        });

        // Optimize video loading and caching
        setTimeout(() => {
            if (window.fetch) {
                const src = videoEl.currentSrc || videoEl.src;
                fetch(src)
                    .then((response) => response.blob())
                    .then((blob) => {
                        const blobURL = URL.createObjectURL(blob);
                        const currentTime = videoEl.currentTime;

                        once(document.documentElement, "touchstart", () => {
                            videoEl.play();
                            videoEl.pause();
                        });

                        // Use requestAnimationFrame for smoother source switching
                        requestAnimationFrame(() => {
                            videoEl.setAttribute("src", blobURL);
                            videoEl.currentTime = currentTime;
                        });
                    });
            }
        }, 1000);

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            URL.revokeObjectURL(videoEl.src);
        };
    });
</script>

<video
        bind:this={videoEl}
        class="fixed top-1/2 left-1/2 min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
        playsinline
        webkit-playsinline
        preload="auto"
        muted
>
    <source src={vidsrc} type="video/mp4"/>
</video>

<div bind:this={containerEl} class="h-[500vh]"></div>