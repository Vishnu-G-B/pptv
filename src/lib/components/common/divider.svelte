<script>
    export let text = '';
    export let width = '100%';
</script>

<div class="flex justify-center items-center" style="width: {width}">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="flex-shrink mx-8 text-white tracking-light text-[32px] font-bold leading-tight">{text}</span>
    <div class="flex-grow border-t border-gray-300"></div>
</div>

<style>
    /* You can add any additional styles here if needed */
</style>