<script lang="ts">
    import type { JustlogChannel } from "$lib/justlog";
    import { contextKey,getChannelEmotes } from "$lib/thirdPartyEmotes";
    import type { Emote } from "$lib/types";
    import { setContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";

    const thirdPartyEmotes: Writable<Array<Emote>> = writable([]);

    setContext(contextKey, thirdPartyEmotes);

    $: getChannelEmotes(parseInt(channel.userID), channel.name)
        .then(emotes => thirdPartyEmotes.set(emotes));

    export let channel: JustlogChannel;
</script>

<slot></slot>