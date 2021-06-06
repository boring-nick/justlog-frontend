<script lang="ts">
    import type { JustlogChannel } from "$lib/justlog";
    import type { Filters } from "$lib/types";

    export let channels: Array<JustlogChannel> = [];

    export let filters: Filters = {
        channel: null,
        username: ""
    };

    let input = {
        channel: "",
        username: ""
    }

    function onSubmit() {
        filters = {
            channel: channels.find(e => e.name === input.channel),
            username: input.username
        };
    }
</script>

<form {...$$restProps} on:submit|preventDefault={onSubmit}>
    <div class="input-group mb-2">
        <span class="input-group-text">#</span>
        <input bind:value={input.channel} type="text" class="form-control" list="channels" placeholder="Channel" aria-label="Channel">
        <datalist id="channels">
            {#each channels as channel (channel)}
            <option value={channel.name}>
            {/each}
        </datalist>
        <span class="input-group-text">@</span>
        <input bind:value={input.username} type="text" class="form-control" placeholder="Username" aria-label="Username">
        <button type="submit" class="btn btn-dark">Load</button>
    </div>
    <div class="input-group mb-2">
        <span class="input-group-text">&gt;</span>
        <input type="date" class="form-control" aria-label="From date">
        <input type="time" class="form-control" aria-label="From time">
        <span class="input-group-text">&lt;</span>
        <input type="date" class="form-control" aria-label="To date">
        <input type="time" class="form-control" aria-label="To time">
    </div>
</form>