<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Input from '$lib/components/Input.svelte';
    import Label from '$lib/components/Label.svelte';
    import Textarea from '$lib/components/Textarea.svelte';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<form method="POST" class="flex flex-col w-full md:w-1/2 gap-2 mx-auto">
    <Label>
        Title *
        <Input options={{ type: 'text', name: 'title', value: form?.title ?? '' }} invalid={form?.missingTitle} />
    </Label>

    <Label>
        URL
        <Input options={{ type: 'url', name: 'url' }} />
    </Label>

    <Label>
        Content *
        <Textarea options={{ rows: '5', name: 'content', value: form?.content ?? '' }} invalid={form?.missingContent} />
    </Label>

    <Button options={{ type: 'submit', disabled: false }}>Submit</Button>
</form>
