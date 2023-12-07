<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { cursorStore } from '$lib/stores/cursorStore';
	import CustomCursor from './CustomCursor.svelte';

	/*------------------------------
    # Props
    ------------------------------*/
	export let url = '#';
	export let text = 'Link Text';
	export let color = 'orange'; // default color
	export let cursorReset = false;

	/*------------------------------
	# State Toggles
	------------------------------*/
	const colorClasses = {
		orange: {
			textClass: 'text-silver',
			arrowClass: 'stroke-sandybrown',
			beforeClass: 'before:bg-sandybrown',
			afterClass: 'after:bg-silver'
		},
		blue: {
			textClass: 'text-arraygray',
			arrowClass: 'stroke-egyptianblue',
			beforeClass: 'before:bg-egyptianblue',
			afterClass: 'after:bg-arraygray'
		}
	};

	// Get the classes based on the selected color
	const selectedColor = colorClasses[color] || colorClasses.orange;

	// Exempt link from custom cursor
	function showDefaultCursor() {
		if (cursorReset) {
			cursorStore.toggle(false);
		}
	}

	function showCustomCursor() {
		if (cursorReset) {
			cursorStore.toggle(true);
		}
	}
</script>

<!-- Link Component -->
<a
	href={url}
	class="flex items-center w-fit gap-2.5 relative py-[8px] {selectedColor.afterClass} after:absolute after:h-1px after:bottom-0 after:left-0 after:w-full after:z-10 {selectedColor.beforeClass} before:absolute before:h-1px before:bottom-0 before:left-0 before:w-[18px] before:z-20 before:transition-all before:duration-300 hover:before:w-full"
	on:mouseenter={showDefaultCursor}
	on:mouseleave={showCustomCursor}
>
	<!-- Arrow Icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="19.599"
		height="15.444"
		viewBox="0 0 19.599 15.444"
	>
		<g id="Group_666" data-name="Group 666" transform="translate(0 -3.429)">
			<path
				id="Path_14"
				data-name="Path 14"
				d="M735.886-140.74h18.281"
				transform="translate(-735.886 151.891)"
				fill="none"
				class={selectedColor.arrowClass}
				stroke-width="1"
			/>
			<path
				id="Path_15"
				data-name="Path 15"
				d="M0,7.368,7.368,0l7.369,7.368"
				transform="translate(18.892 3.783) rotate(90)"
				fill="none"
				class={selectedColor.arrowClass}
				stroke-width="1"
			/>
		</g>
	</svg>

	<!-- Link Text -->
	<p
		class="uppercase font-semibold font-sans text-[15px] 900:text-[16px] tracking-1px relative top-1px {selectedColor.textClass}"
	>
		{text}
	</p>
</a>
