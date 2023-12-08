import { writable } from 'svelte/store';
export const isOverlayOpen = writable(false);
// Toggle visibilty status of contact modal
export function toggleContactModal() {
	isOverlayOpen.update((value) => !value);
}
