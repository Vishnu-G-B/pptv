<script>
    export let width = 'w-full';
    export let color = 'bg-gray-300';
    export let margin = 'my-4';
    export let text = 'TEXT';
    export let textColor = 'text-gray-500';
    export let textSize = 'text-sm';
</script>

<div class="relative {width} {margin} mx-auto">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full {color}">
            <div class="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"></div>
        </div>
    </div>
    {#if text}
        <div class="relative flex justify-center">
            <span class="px-2 {textColor} {textSize} tracking-light leading-tight">{text}</span>
        </div>
    {/if}
</div>