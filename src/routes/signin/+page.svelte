<script lang="ts">
    import { signIn } from '@auth/sveltekit/client';

    import GithubLogo from '$lib/assets/github.svg';
    import Button from '$lib/components/Button.svelte';

    async function signInWithGithub() {
        await signIn('github', {
            callbackUrl: 'http://localhost:3000',
        });
    }
</script>

<div class="flex justify-center items-center w-full">
    <Button on:click={signInWithGithub}>
        <img src={GithubLogo} alt="Github logo" class="w-5 h-5 mr-2" />
        <span>Sign in with github</span>
    </Button>
</div>
