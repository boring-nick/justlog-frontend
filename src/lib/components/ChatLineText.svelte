<script lang="ts">
    import type { Emote } from "$lib/types";
    import ChatEmote from "./ChatEmote.svelte";

    export let text: string = "";
    export let emotes: Array<Emote> = [];

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

    $: blocks = createBlocks(text, emotes);
</script>

{#each blocks as block}
{#if typeof block === "string"}
{block}
{:else}
<ChatEmote name={block.name} url={block.url} />
{/if}
{/each}