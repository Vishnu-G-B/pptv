<!-- AutoText.svelte -->
<script>
    import {onMount, onDestroy} from 'svelte';

    export let text = '';
    export let minSize = 12; // minimum font size in pixels
    export let maxSize = 100; // maximum font size in pixels
    export let className = '';

    let container;
    let textElement;
    let resizeObserver;

    const resizeText = () => {
        if (!container || !textElement) return;

        // Reset font size to measure
        textElement.style.fontSize = `${maxSize}px`;

        // Get container dimensions
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Get text dimensions
        const textWidth = textElement.scrollWidth;
        const textHeight = textElement.scrollHeight;

        // Calculate scale factor
        const scale = Math.min(
            containerWidth / textWidth,
            containerHeight / textHeight
        );

        // Apply scaling with constraints
        const newSize = Math.min(
            maxSize,
            Math.max(minSize, maxSize * scale * 0.9) // 0.9 padding factor
        );

        textElement.style.fontSize = `${newSize}px`;
    };

    onMount(() => {
        resizeText();
        resizeObserver = new ResizeObserver(resizeText);
        if (container) resizeObserver.observe(container);
    });

    onDestroy(() => {
        if (resizeObserver) resizeObserver.disconnect();
    });
</script>

<div bind:this={container} class="w-full h-full flex items-center justify-center overflow-hidden p-2 {className}">
  <span
          bind:this={textElement}
          class="whitespace-nowrap font-medium text-center leading-none"
          style={`font-size: ${maxSize}px`}
  >
    {text}
  </span>
</div>