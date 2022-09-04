import { browser } from '$app/env';
import type { Emote } from '$lib/types';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { getGlobalEmotes } from './thirdPartyEmotes';

export const thirdPartyGlobalEmotes = fetchOnce<Array<Emote>>(() => getGlobalEmotes(), {
	isLoading: false,
	data: []
});

export const serverBaseUrl = createLocalStorage('serverBaseUrl', defaultBaseUrl());

export function defaultBaseUrl(): String {
	return browser && window.location.protocol + '//' + window.location.host || 'https://localhost:8025';
}

type DataType<T> = { isLoading: boolean; error?: Error; data?: T };
type HandlerType<T> = (value: { isLoading: boolean; error?: Error; data?: T }) => void;

// should remove wrapper object for stores and just return error or default value
// make something to load data from multiple promises

export function fetchOnce<T>(
	promiseFn: any, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	initialValue: DataType<T> = { isLoading: false },
	browserOnly = false
): { subscribe: (handler: HandlerType<T>) => () => void } {
	let _value = initialValue;
	const subs: Array<HandlerType<T>> = [];

	function subscribe(handler: HandlerType<T>): () => void {
		subs.push(handler);

		if (_value === initialValue && !_value.isLoading && (browser || !browserOnly)) {
			_value.isLoading = true;
			const t = promiseFn();
			if (t instanceof Promise) {
				t.then((data: T) => {
					set({ isLoading: false, error: undefined, data });
				}).catch((e: Error) => {
					set({ isLoading: false, error: e, data: undefined });
				});
			} else {
				set({ isLoading: false, error: undefined, data: t });
			}
		}

		handler(_value);

		return () => subs.splice(subs.indexOf(handler));
	}

	function set(value: DataType<T>) {
		if (_value === value) return;

		_value = value;
		subs.forEach((s) => s(_value));
	}

	return { subscribe };
}

export function createLocalStorage<T>(key: string, value: T): Writable<T> {
	const store = writable(value);
	const { subscribe, set, update } = store;
	const json = typeof localStorage === 'undefined' ? null : window.localStorage.getItem(key);

	if (json) {
		set(JSON.parse(json));
	}

	function updateStorage(k: string, v: T) {
		window.localStorage.setItem(k, JSON.stringify(v));
	}

	return {
		subscribe,
		set(...[v]: Parameters<typeof set>) {
			updateStorage(key, v);
			set(v);
		},
		update(...[u]: Parameters<typeof update>) {
			const v = u(get(store));
			updateStorage(key, v);
			set(v);
		}
	};
}

export function createAwaiter<T>(promise?: Promise<T>) {
	const { subscribe, set } = writable<{ isLoading: boolean; error?: Error; data?: T }>({
		isLoading: false,
		error: undefined,
		data: undefined
	});

	promise && setPromise(promise);

	function setPromise(promise: Promise<T>) {
		set({ isLoading: true, error: undefined, data: undefined });
		promise.then(
			(data) => set({ isLoading: false, error: undefined, data }),
			(error) => set({ isLoading: false, error, data: undefined })
		);
	}

	return {
		subscribe,
		set,
		setPromise
	};
}
