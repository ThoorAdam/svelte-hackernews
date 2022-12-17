<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';

    import { Toaster } from 'svelte-french-toast';

    import SignInOrUsernameLink from '$lib/components/SignInOrUsernameLink.svelte';

    $: sortBy = $page.url.searchParams.get('s') ?? 'newest';
    $: url = $page.url.pathname;
</script>

<div class="p-4 mx-auto w-full min-h-full">
    <div class="bg-teal-500 w-full p-2 text-white text-sm flex flex-row justify-between">
        <div class="flex flex-row gap-2">
            <a href="/" class="font-semibold">ThoorNews</a>
            <span>|</span>
            <a href="/?s=newest" class={sortBy === 'newest' && url === '/' && 'font-semibold'}>Newest</a>
            <span>|</span>
            <a href="/?s=oldest" class={sortBy === 'oldest' && url === '/' && 'font-semibold'}>Oldest</a>
            {#if $page.data.session?.user}
                <span>|</span>
                <a href="/submit" class={url === '/submit' && 'font-semibold'}>Submit</a>
            {/if}
        </div>

        <div>
            <SignInOrUsernameLink user={$page.data.session?.user} voteCount={$page.data.voteCount} />
        </div>
    </div>

    <div class="w-full p-4 bg-gray-100">
        <slot />
    </div>
</div>

<Toaster />