<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import { formatDistanceToNowStrict } from 'date-fns';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { Heart } from '@steeze-ui/heroicons';
    import toast from 'svelte-french-toast';
    import { post } from '$lib/http/requests';
    import Label from '$lib/components/Label.svelte';
    import Textarea from '$lib/components/Textarea.svelte';
    import Button from '$lib/components/Button.svelte';

    export let data: PageData;
    export let form: ActionData;

    async function toggleVote() {
        toggleHasVoted();

        const response = await post(`/api/article/${data.article.id}/toggle-vote`, {
            hasVoted: !data.hasVoted,
        });

        if (!response.ok) {
            toggleHasVoted();

            toast.error('Something went wrong, please try again.');
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
            <a href="/user/{data.article.user.id}" class="hover:underline">{data.article.user.name}</a>
            {formatDistanceToNowStrict(new Date(data.article.createdAt))} ago
        </span>
    </div>

    <p class="whitespace-pre-wrap text-sm text-gray-600 font-lato">{data.article.content}</p>

    {#if data.session}
        <form method="POST" class="mt-3 w-full md:w-1/2 flex flex-col gap-2">
            <Label>
                Comment
                <Textarea options={{ name: 'comment', rows: '5', value: form?.comment ?? '' }} invalid={form?.missingComment} />
            </Label>

            <Button options={{ type: 'submit' }}>Add comment</Button>
        </form>
    {/if}
</div>

{#if data.article.comments.length}
    <div class="mt-8">
        {#each data.article.comments as comment}
            <div class="flex flex-col mt-3">
                <div class="flex flex-row gap-1 items-center">
                    <a class="text-sm font-medium text-gray-700 hover:underline" href="/user/{comment.user.id}">{comment.user.name}</a>
                    <span class="text-xs text-gray-600 leading-[8px]">{formatDistanceToNowStrict(new Date(comment.createdAt))} ago</span>
                </div>

                <p class="whitespace-pre-wrap text-sm text-gray-600 font-lato">{comment.content}</p>
            </div>
        {/each}
    </div>
{/if}
