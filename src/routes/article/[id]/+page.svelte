<script lang="ts">
    import type { PageData } from './$types';
    import { formatDistanceToNowStrict } from 'date-fns';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { Heart } from '@steeze-ui/heroicons';
    import toast from 'svelte-french-toast';
    import { post } from '$lib/http/requests';

    export let data: PageData;

    async function toggleVote() {
        toggleHasVoted();

        const response = await post(`/api/article/${data.article.id}/toggle-vote`, {
            hasVoted: !data.hasVoted,
        });

        if (!response.ok) {
            toggleHasVoted();

            toast.error('Something went wrong, please try again.')
        }
    }

    function toggleHasVoted() {
        data.hasVoted = !data.hasVoted;
            data.article._count.votes = data.hasVoted ? data.article._count.votes + 1 : data.article._count.votes - 1;
    }
</script>

<div>
    <div class="flex flex-col mb-2">
        <div class="flex flex-row gap-1 items-center">
            {#if data.session?.user}
                <button on:click={toggleVote}>
                    <Icon src={Heart} theme={data.hasVoted && 'solid'} class="w-5 h-5 {data.hasVoted && 'text-teal-500'}" />
                </button>
            {/if}
            <h1 class="text-lg font-medium text-gray-700 -mt-[2px]">{data.article.title}</h1>
        </div>
        <span class="text-xs text-gray-600 leading-[8px]"
            >{data.article._count.votes} votes by
            <a href="/user/{data.article.user.name}" class="hover:underline">{data.article.user.name}</a>
            {formatDistanceToNowStrict(new Date(data.article.createdAt))} ago
        </span>
    </div>

    <p class="whitespace-pre-wrap text-sm text-gray-600 font-lato">{data.article.content}</p>
</div>
