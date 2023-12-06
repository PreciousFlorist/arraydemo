import { writable } from 'svelte/store';

const createCursorStore = () => {
	const { subscribe, set, update } = writable({
		enabled: false,
		customCursor: null,
		text: ''
	});

	// Initialize the custom cursor
	function initialize(CustomCursor, options) {
		const cursor = new CustomCursor('.cursor', options);
		cursor.initialize();
		cursor.disable(); // Disable cursor initially
		set({ enabled: false, customCursor: cursor });
	}

	// Toggle cursor visibility
	function toggle(enable) {
		update((state) => {
			if (state.customCursor) {
				if (enable) {
					state.customCursor.enable();
				} else {
					state.customCursor.disable();
				}
				return { ...state, enabled: enable };
			}
			return state;
		});
	}

	// Update text
	function updateText(newText) {
        update(state => ({ ...state, text: newText }));
    }

	// Cleanup
	function destroy() {
		update((state) => {
			state.customCursor?.destroy();
			return { enabled: false, customCursor: null };
		});
	}

	return {
		subscribe,
		initialize,
		toggle,
		destroy,
		updateText
	};
};

export const cursorStore = createCursorStore();
