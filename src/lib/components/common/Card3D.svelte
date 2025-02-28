<!-- Card3D.svelte -->
<script>
    export let imgLocation;
    export let cardContainerColor;
    export let index;

    let cardContainerColorString = () => {
        if (index % 2 === 0) {
            return cardContainerColor >= 1280 ? 'bg-primary mt-[100px]' : 'bg-primary';
            // return cardContainerColor ? 'bg-primary' : 'bg-primary mt-[100px]';
        } else {
            // return cardContainerColor ? 'bg-brand-orange' : 'bg-brand-orange mt-[100px]';
            return cardContainerColor >= 1280 ? 'bg-brand-orange' : 'bg-brand-orange mt-[100px]';
        }
    }
    console.log(cardContainerColor);
    console.log(cardContainerColorString());

    let rotateX = 0;
    let rotateY = 0;
    let glareX = 50;
    let glareY = 50;

    function handleMouseMove(event) {
        const card = event.currentTarget;
        const {left, top, width, height} = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const mouseX = event.clientX - left;
        const mouseY = event.clientY - top;

        // Calculate rotation values (-15 to 15 degrees range)
        rotateX = ((mouseY - height / 2) / height) * -30;
        rotateY = ((mouseX - width / 2) / width) * 30;

        // Update glare position
        glareX = (mouseX / width) * 100;
        glareY = (mouseY / height) * 100;
    }

    function handleMouseLeave() {
        rotateX = 0;
        rotateY = 0;
        glareX = 50;
        glareY = 50;
    }
</script>
<div class="h-fit w-fit relative" data-buddy-text="#Go Purple">
    <div
            class="relative group transition-[transform] duration-300 ease-out cursor-pointer"
            on:mouseleave={handleMouseLeave}
            on:mousemove={handleMouseMove}
            style={`
    transform: perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg);
  `}
    >
        <div
                class="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style="background: radial-gradient(circle at {glareX}% {glareY}% rgba(102,0,102,1) 0%, rgba(102,0,102,1) 79%));"
        />

        <div class="{cardContainerColorString()} rounded-xl lg:p-3 xl:p-4 shadow-xl h-full transform-style-preserve-3d shadow-xl">
            <div class="flex-shrink-0 aspect-[2/3] lg:h-[400px]">
                <img alt="" class="object-fit h-full w-full movie-posters transition-all duration-700 ease-in"
                     src="{imgLocation}"
                     style="">
            </div>
        </div>

    </div>
    <div class="absolute -bottom-5 -left-8">
        <p class="brand-font font-bold {index%2 == 0 ? 'text-brand-orange': 'text-primary'} text-8xl xl:text-9xl">{index}</p>
    </div>
</div>

<style global>
    .transform-style-preserve-3d {
        transform-style: preserve-3d;
    }

    .movie-posters {
        filter: grayscale(100%) sepia(100%) hue-rotate(260deg);
    }

    .movie-posters:hover {
        filter: grayscale(0%) sepia(0%) hue-rotate(0deg);
    }
</style>