<script lang="ts">
    import type { PageData } from "./$types";

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
{:else}
<h2>User not found</h2>
{/if}