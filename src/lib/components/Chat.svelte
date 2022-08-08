<script lang="ts">
	import type { JustlogMessage } from '$lib/justlog';
	import ChatLine from './ChatLine.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	export let messages: Array<JustlogMessage> = [];
</script>

<div class="h-100 flex-grow-1 position-relative mb-2">
	<div class="bg-dark border p-2 h-100 w-100 position-absolute top-0 left-0" height="500px">
		<VirtualList items={messages} let:item>
			<ChatLine message={item} />
		</VirtualList>
	</div>
</div>
