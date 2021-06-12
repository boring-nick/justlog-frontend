import type { Emote } from '$lib/types';

const PROXY_BASE = 'https://7tv.kkx.one';

export interface SevenTVUserResponse {
	data: SevenTVUserData;
}

export interface SevenTVUserData {
	user: SevenTVUser;
}

export interface SevenTVUser {
	emotes: SevenTVEmote[];
}

export interface SevenTVEmote {
	id: string;
	name: string;
	visibility: number;
	mime: string;
	owner: Owner;
}

export interface Owner {
	id: string;
	display_name: string;
	login: string;
	twitch_id: string;
}
export interface SevenTVSearchResponse {
	data: SevenTVSearchData;
}

export interface SevenTVSearchData {
	search_emotes: SevenTVEmote[];
}

export function getEmoteUrl(id: string, size: 1 | 2 | 3) {
	return `https://cdn.7tv.app/emote/${id}/${size}x`;
}

export async function getSevenTVGlobal(): Promise<SevenTVSearchResponse> {
	const response = await fetch(`${PROXY_BASE}/global`);

	return await response.json();
}

export async function getSevenTVChannel(username: string): Promise<SevenTVUserResponse> {
	const response = await fetch(`${PROXY_BASE}/channel/${username}`);

	return await response.json();
}

export async function getGlobal(): Promise<Array<Emote>> {
	const sevenTvGlobal = await getSevenTVGlobal();

	if (!sevenTvGlobal?.data?.search_emotes) return [];

	return sevenTvGlobal.data.search_emotes.map((emote) => ({
		name: emote.name,
		url: getEmoteUrl(emote.id, 3)
	}));
}

export async function getChannel(username: string): Promise<Array<Emote>> {
	const sevenTvChannel = await getSevenTVChannel(username);

	if (!sevenTvChannel?.data?.user?.emotes) return [];

	return sevenTvChannel.data.user.emotes.map((emote) => ({
		name: emote.name,
		url: getEmoteUrl(emote.id, 3)
	}));
}
