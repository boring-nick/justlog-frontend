<script lang="ts">
	import Channel from '$lib/components/Channel.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import FiltersForm from '$lib/components/FiltersForm.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import type { JustlogChannelsResponse, JustlogMessage } from '$lib/justlog';
	import { Justlog } from '$lib/justlog';
	import type { Year } from '$lib/types';
	import { createAwaiter, serverBaseUrl } from '$lib/stores';
	import type { Filters } from '$lib/types';

	let filters: Filters;

	$: justlog = new Justlog($serverBaseUrl);

	let channels = createAwaiter<JustlogChannelsResponse>();
	let logData = createAwaiter<Array<JustlogMessage>>();
	let listData = createAwaiter<any>();

	$: if (justlog && filters?.channel && (!filters?.username || (selected && filters?.username))) {
		logData.setPromise(getLogs(filters));
	}
	$: if (justlog && filters?.channel && filters?.username) {
		listData.setPromise(listLogs(filters));
	} else if (justlog) {
		listData.set({ data: null, isLoading: false, error: null });
	}
	$: if (justlog) {
		channels.setPromise(justlog.getChannels());
	}

	let selected: {
		year: number;
		month: number;
		day: number;
	};

	async function listLogs(filters: Filters) {
		const list = await justlog.listLogs({
			channel: filters.channel.name,
			user: filters.username
		});

		let result: Array<Year> = [];

		for (const el of list.availableLogs) {
			const year = result.find((e) => e.number === parseInt(el.year));
			if (year) {
				year.months.push({
					number: parseInt(el.month),
					days: []
				});
			} else {
				result.push({
					number: parseInt(el.year),
					months: [
						{
							number: parseInt(el.month),
							days: []
						}
					]
				});
			}
		}

		return result;
	}

	async function getLogs(filters: Filters) {
		const channelID = parseInt(filters.channel.userID);
		const response = await justlog.getLogs(
			channelID,
			{ reverse: true },
			filters.username,
			filters.username && selected.year,
			filters.username && selected.year && selected.month
		);

		return response.messages;
	}
</script>

{#if $channels.isLoading}
	<div class="d-flex justify-content-center align-items-center p-2">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{:else if $channels.data}
	<FiltersForm class="mb-2" channels={$channels.data.channels} bind:filters />
	<div class="mb-2">
		{#if $listData.data}
			<DatePicker years={$listData.data} bind:selected />
		{/if}
	</div>
{:else if $channels.error}
	{JSON.stringify($channels.error)}
{/if}
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
{:else if $logData.error}
	{JSON.stringify($logData.error)}
{/if}
