<script lang="ts">
    import type { PageData } from './$types';
    import { formatDistanceToNowStrict } from 'date-fns';

    export let data: PageData;
</script>

<div>
    <div class="flex flex-col mb-2">
        <h1 class="text-lg font-medium text-gray-700">{data.article.title}</h1>
        <span class="text-xs text-gray-600 leading-[8px]"
            >{data.voteCount} votes by
            <a href="/user/{data.article.author.name}" class="hover:underline">{data.article.author.name}</a>
            {formatDistanceToNowStrict(new Date(data.article.createdAt))} ago
        </span>
    </div>

    <p class="whitespace-pre-wrap text-sm text-gray-600 font-lato">{data.article.content}</p>
</div>
