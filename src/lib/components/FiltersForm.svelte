<script lang="ts">
	import type { JustlogChannel } from '$lib/justlog';
	import type { Filters } from '$lib/types';

	export let channels: Array<JustlogChannel> = [];

	export let filters: Filters = {
		channel: null,
		username: ''
	};

	let input = {
		channel: '',
		username: ''
	};

	function onSubmit() {
		filters = {
			channel: channels.find((e) => e.name === input.channel),
			username: input.username
		};
	}
</script>

<form {...$$restProps} on:submit|preventDefault={onSubmit}>
	<div class="input-group">
		<span class="input-group-text">#</span>
		<input
			bind:value={input.channel}
			type="text"
			class="form-control"
			list="channels"
			placeholder="Channel"
			aria-label="Channel"
			on:keypress={e => e.key === "Enter" && onSubmit()}
		/>
		<datalist id="channels">
			{#each channels as channel (channel)}
				<option value={channel.name} />{/each}
		</datalist>
		<span class="input-group-text">@</span>
		<input
			bind:value={input.username}
			type="text"
			class="form-control"
			placeholder="Username"
			aria-label="Username"
		/>
		<button type="submit" class="btn btn-dark">Load</button>
	</div>
</form>
