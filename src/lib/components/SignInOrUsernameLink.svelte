<script lang="ts">
    export let user;
</script>

{#if user}
    <a href="/user/{user.name}">{user.name}</a>
{:else}
    <a href="/signin">Sign In</a>
{/if}
