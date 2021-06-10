<script lang="ts">
    import Channel from "$lib/components/Channel.svelte";
    import Chat from "$lib/components/Chat.svelte";
    import FiltersForm from "$lib/components/FiltersForm.svelte";
    import DatePicker from "$lib/components/DatePicker.svelte";
    import type { JustlogChannel,JustlogMessage } from "$lib/justlog";
    import { Justlog } from "$lib/justlog";
    import type { Year, Month } from "$lib/types";
    import { createAwaiter } from "$lib/stores";
    import type { Filters } from "$lib/types";

    let filters: Filters;

    const justlog = new Justlog("https://logs.ivr.fi");
    let logData = createAwaiter<Array<JustlogMessage>>();
    let listData = createAwaiter<any>();

    $: if (filters?.channel && (!filters?.username || (selected && filters?.username))) {
        logData.setPromise(getLogs(filters));
    }
    $: if (filters?.channel && filters?.username) {
        listData.setPromise(listLogs(filters));
    }
    else {
        listData.set({data: null, isLoading: false, error: null});
    }

    let channels: Array<JustlogChannel> = [];

    let selected: {
        year: number,
        month: number,
        day: number
    }

    async function listLogs(filters: Filters) {
        const list = await justlog.listLogs({
            channel: filters.channel.name,
            user: filters.username
        })

        let result: Array<Year> = [];

        for (const el of list.availableLogs) {
            const year = result.find(e => e.number === parseInt(el.year));
            if (year) {
                year.months.push({
                    number: parseInt(el.month),
                    days: []
                });
            }
            else {
                result.push({
                    number: parseInt(el.year),
                    months: [{
                        number: parseInt(el.month),
                        days: []
                    }]
                })
            }
        }

        return result
    }

    async function getLogs(filters: Filters) {
        console.log(filters);
        const channelID = parseInt(filters.channel.userID);
        const response = await justlog.getLogs(channelID, {reverse: true}, filters.username, filters.username && selected.year, (filters.username && selected.year) && selected.month);

        return response.messages;
    }

    justlog.getChannels()
        .then(res => channels = res.channels);
</script>

<FiltersForm class="mb-2" {channels} bind:filters={filters} />
<div class="mb-2">
    {#if $listData.data}
    <DatePicker years={$listData.data} bind:selected></DatePicker>
    {/if}
</div>
{#if $logData.isLoading}
    <div class="d-flex justify-content-center align-items-center p-5">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
{:else if $logData.data}
<Channel channel={filters.channel}>
    {#if $logData.data}
    <Chat messages={$logData.data} />
    {/if}
</Channel>
{/if}