<script lang="ts">
	import type { JustlogMessage } from '$lib/justlog';
	import ChatLineText from './ChatLineText.svelte';

	export let message: JustlogMessage;
</script>

<div {...$$restProps}>
	{message.displayName}: <ChatLineText {message} />
</div>
