<script lang="ts">
    import Channel from "$lib/components/Channel.svelte";
    import Chat from "$lib/components/Chat.svelte";
    import FiltersForm from "$lib/components/FiltersForm.svelte";
    import type { JustlogChannel,JustlogMessagesResponse } from "$lib/justlog";
    import { Justlog } from "$lib/justlog";
    import { createAwaiter } from "$lib/stores";
    import type { Filters } from "$lib/types";

    const justlog = new Justlog("https://logs.ivr.fi");
    let logData;

    $: filters?.channel && (logData = createAwaiter<JustlogMessagesResponse>(justlog.getLogs(parseInt(filters.channel.userID), {reverse: true})));

    let channels: Array<JustlogChannel> = [];
    
    let filters: Filters;

    justlog.getChannels()
        .then(res => channels = res.channels);
</script>

<FiltersForm class="mb-2" {channels} bind:filters={filters} />
{#if logData && !$logData.isLoading}
<Channel channel={filters.channel}>
    <Chat messages={$logData.data?.messages.slice(0,50)} />
</Channel>
{/if}