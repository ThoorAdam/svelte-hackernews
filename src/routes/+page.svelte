<script lang="ts">
    import { formatDistanceToNowStrict } from 'date-fns';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="flex flex-col  divide-y divide-gray-300">
    {#each data.articles as article (article.id)}
        <div class="mb-2 pt-2 last:mb-0 first:pt-0 flex flex-col">
            <a class="hover:underline hover:font-medium text-gray-700" href="/article/{article.id}">{article.title}</a>
            <span class="text-xs text-gray-600 leading-[8px]"
                >{article._count.votes} votes by
                <a href="/user/{article.user.id}" class="hover:underline">{article.user.name}</a>
                {formatDistanceToNowStrict(new Date(article.createdAt))} ago | <span>{article._count.comments} comments</span>
            </span>
        </div>
    {/each}
</div>
