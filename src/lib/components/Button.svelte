<script lang="ts">
    export let options: any = {};
</script>

<button
    on:click
    {...options}
    class="flex flex-row items-center justify-center rounded-md bg-teal-500 text-white px-4 py-2 shadow transition-colors hover:bg-teal-400 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
>
    <slot />
</button>
