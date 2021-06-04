import { writable, get } from "svelte/store"
import type { Writable } from "svelte/store"



export function createLocalStorage<T>(key: string, value: T): Writable<T> {
    const store = writable(value)
    const { subscribe, set, update } = store
    const json = typeof localStorage === "undefined" ? null : window.localStorage.getItem(key)

    if (json) {
        set(JSON.parse(json))
    }

    function updateStorage(k: string, v: T) {
        window.localStorage.setItem(k, JSON.stringify(v))
    }

    return {
        subscribe,
        set(...[v]: Parameters<typeof set>) {
            updateStorage(key, v)
            set(v)
        },
        update(...[u]: Parameters<typeof update>) {
            const v = u(get(store))
            updateStorage(key, v)
            set(v)
        }
    }
}


export function createAwaiter<T>(promise: Promise<T>) {
	const { subscribe, set } = writable<{isLoading: boolean, error: Error, data: T}>({ isLoading: true, error: null, data: null });
	
	setPromise(promise);

	function setPromise(promise: Promise<T>) {
		promise.then(data => set({ isLoading: false, error: null, data }), error => set({ isLoading: false, error, data: null }))
	}

	return {
		subscribe,
		set: setPromise
	};
}