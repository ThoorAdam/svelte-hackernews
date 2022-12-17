<script lang="ts">
    export let user;
    export let voteCount;
</script>

{#if user}
    <a href="/user/{user.id}">{user.name} ({voteCount})</a>
{:else}
    <a href="/signin">Sign In</a>
{/if}
