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

    return await response.json();
}

export async function getBttvChannel(userId: number): Promise<BttvUserResponse> {
    const response = await fetch(`${BASE_URL}/users/twitch/${userId}`);

    return await response.json();
}

export async function getGlobal(): Promise<Array<Emote>> {
    const bttvGlobal = await getBttvGlobal();
    
    return bttvGlobal.map(emote => ({
        name: emote.code,
        url: getEmoteUrl(emote.id, 3)
    }));
}

export async function getChannel(userId: number): Promise<Array<Emote>> {
    const bttvChannel = await getBttvChannel(userId);

    return [
        ...bttvChannel.channelEmotes.map(emote => ({
            name: emote.code,
            url: getEmoteUrl(emote.id, 3)
        })),
        ...bttvChannel.sharedEmotes.map(emote => ({
            name: emote.code,
            url: getEmoteUrl(emote.id, 3)
        }))
    ];
}