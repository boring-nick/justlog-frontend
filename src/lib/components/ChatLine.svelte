<script lang="ts">
	import type { JustlogMessage } from '$lib/justlog';
	import ChatLineText from './ChatLineText.svelte';

	export let message: JustlogMessage;
</script>
<!-- TODO: fix vertical alignment-->
<div class="wrapper d-flex align-items-center align-self-center">
	<span>
		<small class="font-monospace text-muted">{new Date(message.timestamp).toLocaleString()}</small>
		{#if message.type === 1 || message.tags["msg-id"] === "announcement"}
			{#if message.tags["msg-id"] === "announcement"}
				<span class="fw-bold">Announcement</span>
			{/if}
			<span class="fw-bold" style="color: {message.tags.color}"
				>{message.displayName}</span>: <ChatLineText {message}/>
		{:else}
			<span class="fst-italic">{message.text}</span>
		{/if}
	</span>
</div>

<style>
	.wrapper {
		min-height: 2.5rem;
	}
</style>
