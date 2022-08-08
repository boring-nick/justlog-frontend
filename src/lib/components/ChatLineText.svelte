<script lang="ts">
	import type { JustlogMessage } from '$lib/justlog';
	import { thirdPartyGlobalEmotes } from '$lib/stores';
	import { contextKey } from '$lib/thirdPartyEmotes';
	import type { Emote } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let message: JustlogMessage;
	const thirdPartyChannelEmotes: Readable<Array<Emote>> = getContext(contextKey);

	let blocks: Array<Emote | string> = [];

	const TYPE = {
		EMOTE: 0,
		URL: 1
	};

	function createBlocks(text: string, emotes: Array<Emote>) {
		let blocks: Array<any> = [];
		let words = text.split(' ');
		let part = '';

		for (const word of words) {
			let emote = emotes.find((e) => e.name === word);
			if (emote) {
				if (part) {
					blocks.push(part);
					part = '';
				}
				blocks.push([TYPE.EMOTE, emote]);
			}
			else if (word.startsWith("http://") || word.startsWith("https://")) {
				if (part) {
					blocks.push(part);
					part = '';
				}
				blocks.push([TYPE.URL, word]);
			}
			else {
				if (part) {
					part += ' ' + word;
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
			const emotesStr = message.tags.emotes.split('/');

			for (const emoteStr of emotesStr) {
				const [id, positionsStr] = emoteStr.split(':');
				const positions = positionsStr.split(',');
				const [start, end] = positions[0].split('-');

				const name = message.text.slice(parseInt(start), parseInt(end) + 1);

				emotes.push({
					name,
					url: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/4.0`
				});
			}
		}
		return emotes;
	}

	$: blocks = createBlocks(message?.text || '', [
		...extractTwitchEmotes(message),
		...$thirdPartyChannelEmotes,
		...$thirdPartyGlobalEmotes.data
	]);
</script>

<span class="wrapper">
	{#each blocks as block}
		{#if typeof block === 'string'}
			<span>{block}</span>
			{:else if block[0] === TYPE.EMOTE}
			<img src={block[1].url} alt={block[1].name} />
			{:else if block[0] === TYPE.URL}
			<a href={block[1]} target="_blank">{block[1]}</a>
		{/if}
	{/each}
</span>

<style>
.wrapper > * {
	margin-right: 0.5ch;
}
img {
	max-height: 2.5rem;
}
</style>
	<!-- TODO: {JSON.stringify(message.tags?.badges)} -->
