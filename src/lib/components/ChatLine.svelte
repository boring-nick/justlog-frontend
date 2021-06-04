<script lang="ts">
    import type { JustlogMessage } from "$lib/justlog";
    import type { Emote } from "$lib/types";
    import ChatLineText from "./ChatLineText.svelte";

    export let message: JustlogMessage;
    export let emotes: Array<Emote> = [];
</script>

{#if message}
<div>
    {message.displayName}: <ChatLineText text={message.text} {emotes} />
</div>
{/if}