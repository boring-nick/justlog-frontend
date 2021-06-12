<script lang="ts">
	import { serverBaseUrl } from '$lib/stores';
</script>

<div class="container">
	<label for="serverBaseUrl" class="form-label">Server base URL</label>
	<input id="serverBaseUrl" class="form-control" type="text" bind:value={$serverBaseUrl} />
</div>
