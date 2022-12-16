<script lang="ts">
    import { formatDistanceToNowStrict } from 'date-fns';
    import type { PageData } from './$types';

    export let data: PageData;

    console.log(data);
</script>

<div class="flex flex-col  divide-y divide-gray-300">
    {#each data.news as item (item.id)}
        <div class="mb-2 pt-2 last:mb-0 first:pt-0 flex flex-col">
            <a class="hover:underline hover:font-medium text-gray-700" href="/news/{item.id}">{item.title}</a>
            <span class="text-xs text-gray-600 leading-[8px]"
                >{item._count.votes} votes by
                <a href="/user/{item.author.name}" class="hover:underline">{item.author.name}</a>
                {formatDistanceToNowStrict(new Date(item.createdAt))} ago
            </span>
        </div>
    {/each}
</div>
