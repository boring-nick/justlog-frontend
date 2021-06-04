<script lang="ts">
    import Chat from "$lib/components/Chat.svelte";
    import { Justlog } from "$lib/justlog";
    import type { JustlogMessagesResponse } from "$lib/justlog";
    import { createAwaiter } from "$lib/stores";
    import type { Emote } from "$lib/types";
    import { getGlobalEmotes, getChannelEmotes } from "$lib/emotes";

    const justlog = new Justlog("https://justlog.kkx.one");
    const logData = createAwaiter<JustlogMessagesResponse>(justlog.getLogs(11148817, null));

    let emotes: Array<Emote> = [];

    async function fetchEmotes() {
        const global = await getGlobalEmotes();
        const channel = await getChannelEmotes(11148817);

        emotes = [...global, ...channel];
    }

    fetchEmotes();
</script>

{#if !$logData.isLoading}
<Chat messages={$logData.data.messages.reverse().slice(1,50)} {emotes} />
{/if}