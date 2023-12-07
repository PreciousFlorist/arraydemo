<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { cursorStore } from '$lib/stores/cursorStore';

	/*------------------------------
	# Local State
	------------------------------*/
	let isVisible = false; // Visibility state of the cursor
	let cursorText; // Default text
	let rotate = false;

	/*------------------------------
	# Subscriptions
	------------------------------*/
	cursorStore.subscribe((state) => {
		isVisible = state.enabled;
		cursorText = state.text;
		rotate = state.rotate;
	});
</script>

<div class="select-none cursor pointer-events-none fixed h-[125px] w-[125px] z-[1000]">
	<!-- Custom Cursor Component -->
	<div
		class={`flex gap-2.5 h-full w-full justify-center items-center transition-all duration-300 relative -top-[65px] -left-[65px]
            after:bg-black after:h-full after:w-full after:opacity-30 after:absolute after:rounded-full after:top-0 after:bottom-0
        ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
	>
		<!-- Cursor Icon -->
		<div class={`relative z-10 ${rotate ? 'rotate-90' : ''}`}>
			<img src="/images/assets/cursor/arrow.svg" alt="An arrow" />
		</div>
		<!-- Cursor Text -->
		{#if cursorText}
			<p class="relative z-10 uppercase font-semibold font-sans text-white tracking-1px">
				{cursorText}
			</p>
		{/if}
	</div>
</div>
