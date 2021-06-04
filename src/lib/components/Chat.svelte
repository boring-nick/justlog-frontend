<script lang="ts">
    import type { JustlogMessage } from "$lib/justlog";
    import type { Emote } from "$lib/types";
    import ChatLine from "./ChatLine.svelte";

    export let messages: Array<JustlogMessage> = [];
    export let emotes: Array<Emote> = [];
</script>

{#each messages as message (message.id)}
<ChatLine {message} {emotes} />
{/each}