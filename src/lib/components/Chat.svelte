<script lang="ts">
    import type { JustlogMessage } from "$lib/justlog";
    import ChatLine from "./ChatLine.svelte";

    export let messages: Array<JustlogMessage> = [];
</script>

<div class="bg-dark p-2 border" {...$$restProps}>
    {#each messages as message}
    <ChatLine {message} />
    {/each}
</div>