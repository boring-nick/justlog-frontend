import type { JustlogChannel } from "$lib/justlog";

export interface Emote {
    name: string;
    url: string;
}

export interface Filters {
    channel: JustlogChannel;
    username: string
}