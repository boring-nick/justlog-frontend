import type { Emote } from '$lib/types';

const BASE_URL = 'https://api.frankerfacez.com/v1';

export interface FFZRoomResponse {
	room: FFZRoom;
	sets: Record<string, FFZEmoteSet>;
}

export interface FFZGlobalResponse {
	default_sets: number[];
	sets: Record<string, FFZEmoteSet>;
	users: Record<string, string[]>;
}

export interface FFZRoom {
	_id: number;
	twitch_id: number;
	id: string;
	is_group: boolean;
	display_name: string;
	set: number;
	moderator_badge: string;
	vip_badge: Record<string, string>;
	mod_urls: Record<string, string>;
}

export interface FFZEmoteSet {
	id: number;
	_type: number;
	title: string;
	emoticons: FFZEmoticon[];
}

export interface FFZEmoticon {
	id: number;
	name: string;
	height: number;
	width: number;
	public: boolean;
	hidden: boolean;
	modifier: boolean;
	owner: FFZOwner;
	urls: Record<string, string>;
	status: number;
	usage_count: number;
	created_at: Date;
	last_updated: Date;
}

export interface FFZOwner {
	_id: number;
	name: string;
	display_name: string;
}

export function getEmoteUrl(id: string, size: 1 | 2 | 3) {
	return `https://cdn.betterttv.net/emote/${id}/${size}x`;
}

export async function getFFZGlobal(): Promise<FFZGlobalResponse> {
	const response = await fetch(`${BASE_URL}/set/global`);

	return await response.json();
}

export async function getFFZChannel(userId: number): Promise<FFZRoomResponse> {
	const response = await fetch(`${BASE_URL}/room/id/${userId}`);

	return await response.json();
}

export async function getGlobal(): Promise<Array<Emote>> {
	const emotes = [];

	const ffzGlobal = await getFFZGlobal();

	for (const setId in ffzGlobal.sets) {
		const set = ffzGlobal.sets[setId];

		for (const emote of set.emoticons) {
			emotes.push({
				name: emote.name,
				url: emote.urls['4'] || emote.urls['2'] || emote.urls['1']
			});
		}
	}

	return emotes;
}

export async function getChannel(userId: number): Promise<Array<Emote>> {
	const emotes = [];

	const ffzEmotes = await getFFZChannel(userId);

	for (const setId in ffzEmotes.sets) {
		const set = ffzEmotes.sets[setId];

		for (const emote of set.emoticons) {
			emotes.push({
				name: emote.name,
				url: emote.urls['4'] || emote.urls['2'] || emote.urls['1']
			});
		}
	}

	return emotes;
}
