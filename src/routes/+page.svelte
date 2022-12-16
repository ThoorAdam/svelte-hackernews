<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="flex flex-col  divide-y divide-gray-300">
    {#each data.news as item (item.id)}
        <div class="mb-2 pt-2 last:mb-0 first:pt-0">
            <a class="hover:underline hover:font-medium text-gray-700" href="/news/{item.id}">{item.title}</a>
        </div>
    {/each}
</div>
