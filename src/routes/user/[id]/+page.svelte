<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { signOut } from '@auth/sveltekit/client';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

{#if data.user}
    <h2 class="text-2xl font-medium">{data.user.name}</h2>

    <div class="flex flex-row gap-1">
        <dt>Karma:</dt>
        <dd>{data.user._count.votes}</dd>
    </div>

    <div class="flex flex-row gap-1">
        <dt>Posts:</dt>
        <dd>{data.user._count.articles}</dd>
    </div>

    <div class="flex flex-row gap-1" class:mb-4={data.user.id === data.session?.user.id}>
        <dt>Comments:</dt>
        <dd>{data.user._count.comments}</dd>
    </div>

    {#if data.user.id === data.session?.user.id}
        <Button on:click={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
    {/if}
{:else}
    <h2>User not found</h2>
{/if}
