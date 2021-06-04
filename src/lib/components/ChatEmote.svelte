<script>
    export let name = "";
    export let url = "";
</script>

<img class="emote" src={url} alt={name}>

<style>
    .emote {
        height: 40px;
        padding: 5px;
    }
</style>