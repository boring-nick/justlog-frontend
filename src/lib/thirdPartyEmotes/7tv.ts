import type { Emote } from '$lib/types';

const API_BASE = 'https://api.7tv.app/v2';

export interface SevenTVEmote {
	id: string;
	name: string;
	owner: SevenTVUser;
	visibility: number;
	mime: string;
	status: number;
	width: Array<number>;
	height: Array<number>;
	urls: Array<[string, string]>;
}

export interface SevenTVUser {
	id: string;
	twitch_id: string;
	login: string;
	display_name: string;
	role: SevenTVRole;
	emote_aliases: SevenTVEmoteAliases;
}

export interface SevenTVRole {
	id: string;
	name: string;
	position: number;
	color: number;
	allowed: number;
	denied: number;
	default: boolean;
}

export type SevenTVEmoteAliases = { [id: string]: string };

export async function getSevenTVGlobal(): Promise<Array<SevenTVEmote>> {
	const response = await fetch(`${API_BASE}/emotes/global`);

	return await response.json();
}

export async function getSevenTVChannel(username: string): Promise<Array<SevenTVEmote>> {
	const response = await fetch(`${API_BASE}/users/${username}/emotes`);

	return await response.json();
}

export async function getGlobal(): Promise<Array<Emote>> {
	const sevenTvGlobal = await getSevenTVGlobal();

	return sevenTvGlobal.map((emote) => ({
		name: emote.name,
		url: emote.urls[3][1] || emote.urls[2][1] || emote.urls[1][1] || emote.urls[0][1]
	}));
}

export async function getChannel(username: string): Promise<Array<Emote>> {
	const sevenTvChannel = await getSevenTVChannel(username);

	return sevenTvChannel.map((emote) => ({
		name: emote.name,
		url: emote.urls[3][1] || emote.urls[2][1] || emote.urls[1][1] || emote.urls[0][1]
	}));
}
