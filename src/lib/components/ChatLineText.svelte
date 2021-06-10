<script lang="ts">
    import ChatEmote from "$lib/components/ChatEmote.svelte";
    import type { JustlogMessage } from "$lib/justlog";
    import { thirdPartyGlobalEmotes } from "$lib/stores";
    import { contextKey } from "$lib/thirdPartyEmotes";
    import type { Emote } from "$lib/types";
    import { getContext } from "svelte";
    import type { Readable } from "svelte/store";

    export let message: JustlogMessage;
    const thirdPartyChannelEmotes: Readable<Array<Emote>> = getContext(contextKey);

    let blocks: Array<Emote | string> = [];

    function createBlocks(text: string, emotes: Array<Emote>) {
        let blocks: Array<Emote | string> = [];
        let words = text.split(" ");
        let part = "";
        
        for (const word of words) {
            let emote = emotes.find(e => e.name === word);
            if (part) {
                if (emote) {
                    blocks.push(part);
                    part = "";
                    blocks.push(emote);
                }
                else {
                    part += " " + word;
                }
            }
            else {
                if (emote) {
                    blocks.push(emote);
                }
                else {
                    part = word;
                }
            }
        }
        if (part) blocks.push(part);

        return blocks;
    }

    function extractTwitchEmotes(message: JustlogMessage) {
        let emotes: Array<Emote> = [];
        if (message?.tags?.emotes) {
            const emotesStr = message.tags.emotes.split("/");

            for (const emoteStr of emotesStr) {
                const [ id, positionsStr ] = emoteStr.split(":");
                const positions = positionsStr.split(",");
                const [ start, end ] = positions[0].split("-");

                const name = message.text.slice(parseInt(start), parseInt(end) + 1);

                emotes.push({
                    name,
                    url: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/4.0`
                })
            }
        }
        return emotes;
    }

    $: blocks = createBlocks(message?.text || "", [...extractTwitchEmotes(message), ...$thirdPartyChannelEmotes, ...$thirdPartyGlobalEmotes.data]);
</script>

{#each blocks as block}
{#if typeof block === "string"}
{block}
{:else}
<ChatEmote name={block.name} url={block.url} />
{/if}
{/each}
<!-- TODO: {JSON.stringify(message.tags?.badges)} -->