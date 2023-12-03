import { writable } from 'svelte/store';
export const isOverlayOpen = writable(false);

export function toggleContactModal() {
	isOverlayOpen.update((value) => !value);
}
