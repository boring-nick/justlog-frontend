import type { Emote } from "$lib/types";

const BASE_URL = "https://api.betterttv.net/3/cached";

export interface BttvEmoteBase {
    id: string;
    code: string;
    imageType: string;
}

export interface BttvEmote extends BttvEmoteBase {
    userId: string;
}

export interface BttvSharedEmote extends BttvEmote {
    id: string;
    code: string;
    imageType: string;
    user: BttvUserResponse;
}

export interface BttvUserResponse {
    id: string;
    bots: Array<string>;
    channelEmotes: Array<BttvEmote>;
    sharedEmotes: Array<BttvSharedEmote>;
}

export function getEmoteUrl(id: string, size: 1 | 2 | 3) {
    return `https://cdn.betterttv.net/emote/${id}/${size}x`;
}

export async function getBttvGlobal(): Promise<Array<BttvEmote>> {
    const response = await fetch(`${BASE_URL}/emotes/global`);
    const json: Array<BttvEmote> = await response.json();
    return json;
}

export async function getBttvChannel(userId: number): Promise<BttvUserResponse> {
    const response = await fetch(`${BASE_URL}/users/twitch/${userId}`);
    const json: BttvUserResponse = await response.json();
    return json;
}

export async function getGlobal(): Promise<Array<Emote>> {
    let emotes = [];

    const bttvGlobal = await getBttvGlobal();

    for (const emote of bttvGlobal) {
        emotes.push({
            name: emote.code,
            url: getEmoteUrl(emote.id, 3)
        })
    }

    return emotes;
}

export async function getChannel(userId: number): Promise<Array<Emote>> {
    let emotes = [];

    const bttvChannel = await getBttvChannel(userId);

    for (const emote of bttvChannel.channelEmotes) {
        emotes.push({
            name: emote.code,
            url: getEmoteUrl(emote.id, 3)
        })
    }

    for (const emote of bttvChannel.sharedEmotes) {
        emotes.push({
            name: emote.code,
            url: getEmoteUrl(emote.id, 3)
        })
    }

    return emotes;
}