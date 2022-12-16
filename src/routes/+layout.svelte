<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';

    import SignInOrUsernameLink from '$lib/components/SignInOrUsernameLink.svelte';

    $: sortBy = $page.url.searchParams.get('s');
</script>

<div class="p-4 mx-auto w-full min-h-full">
    <div class="bg-teal-500 w-full p-2 text-white text-sm flex flex-row justify-between">
        <div class="flex flex-row gap-2">
            <a href="/" class="font-semibold">ThoorNews</a>
            <span>|</span>
            <a href="/" class={sortBy === 'newest' ? 'font-semibold' : ''}>Newest</a>
        </div>

        <div>
            <SignInOrUsernameLink user={$page.data.session?.user} />
        </div>
    </div>

    <div class="w-full p-4 bg-gray-100">
        <slot />
    </div>
</div>
