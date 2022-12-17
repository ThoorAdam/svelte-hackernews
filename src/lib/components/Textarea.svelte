<script lang="ts">
    export let options: any = {};
    export let invalid = false;
</script>

<textarea class="bg-white rounded pl-2 py-2 outline-none focus:border-teal-500 border-2" class:border-red-500={invalid} {...options} />
