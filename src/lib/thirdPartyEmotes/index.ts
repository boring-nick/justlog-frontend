import type { Emote } from "$lib/types";
import * as sevenTv from "./7tv";
import * as bttv from "./bttv";
import * as ffz from "./ffz";

export const contextKey = {};

export async function getGlobalEmotes(): Promise<Array<Emote>> {
    return [...await bttv.getGlobal(), ...await ffz.getGlobal(), /*...await sevenTv.getGlobal()*/];
}

export async function getChannelEmotes(userId: number, username: string): Promise<Array<Emote>> {
    return [...await bttv.getChannel(userId), ...await ffz.getChannel(userId), /*...await sevenTv.getChannel(username)*/];
}