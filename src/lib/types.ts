import type { JustlogChannel } from "$lib/justlog";

export interface Emote {
    name: string;
    url: string;
}

export interface Filters {
    channel: JustlogChannel;
    username: string;
}

export interface Year {
    number: number;
    months: Array<Month>;
}

export interface Month {
    number: number;
    days: Array<number>;
}