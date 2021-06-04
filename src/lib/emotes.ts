import * as bttv from "$lib/emotes/bttv";
import * as ffz from "$lib/emotes/ffz";
import type { Emote } from "./types";

export async function getGlobalEmotes(): Promise<Array<Emote>> {
    return [...await bttv.getGlobal(), ...await ffz.getGlobal()];
}

export async function getChannelEmotes(userId: number): Promise<Array<Emote>> {
    return [...await bttv.getChannel(userId), ...await ffz.getChannel(userId)]
}