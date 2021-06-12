<script lang="ts">
    import type { JustlogMessage } from "$lib/justlog";
    import ChatLine from "./ChatLine.svelte";
    import VirtualList from "svelte-virtual-scroll-list";

    export let messages: Array<JustlogMessage> = [];

    const pepega = (p: any) => p as JustlogMessage;
</script>

<div class="h-100 flex-grow-1 position-relative mb-2">
    <!--{#each messages as message}
    <ChatLine {message} />
    {/each}-->
    <div class="bg-dark border p-2 h-100 w-100 position-absolute top-0 left-0">
        <VirtualList data={messages} isHorizontal={false} key="id" keeps={200} estimateSize={30} let:data={item}>
            <ChatLine message={pepega(item)} />
        </VirtualList>
    </div>
</div>