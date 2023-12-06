<!-- 
Sidebar.svelte

Fixed to the left of the screen, this component triggers the opeing and closing of the contact modal.
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { toggleContactModal, isOverlayOpen } from '$lib/utils/contactForm.js';
</script>

<button
	class="fixed h-full w-14 1100:w-20 border-r border-silver mt-[63px] 950:mt-77px backdrop-blur hidden 800:flex justify-center items-center group z-[11] after:absolute after:w-full after:h-full after:bg-white after:top-0 after:left-0 after:opacity-80"
	on:click={toggleContactModal}
>
	<div
		class="-rotate-90 pl-77px whitespace-nowrap uppercase flex flex-row items-center gap-2.5 relative z-[11]"
	>
		<!-- Sidebar with Open Modal -->
		{#if $isOverlayOpen}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10.215"
				height="10.215"
				viewBox="0 0 10.215 10.215"
			>
				<g id="Group_1058" data-name="Group 1058" transform="translate(266.117 -379.12) rotate(90)">
					<path
						id="Path_2123"
						data-name="Path 2123"
						d="M392.712,260.692l-8.8,8.8"
						transform="translate(-4.084 -4.084)"
						fill="none"
						class="stroke-egyptianblue group-hover:stroke-white"
						stroke-linecap="round"
						stroke-width="1"
					></path>
					<path
						id="Path_2124"
						data-name="Path 2124"
						d="M8.8,0,0,8.8"
						transform="translate(388.628 256.609) rotate(90)"
						fill="none"
						class="stroke-egyptianblue group-hover:stroke-white"
						stroke-linecap="round"
						stroke-width="1"
					></path>
				</g>
			</svg>
			<p
				class="group-hover:text-white text-sm 1100:text-base text-onyx transition-all duration-300 font-semibold tracking-1px"
			>
				Close
			</p>
		{:else}
			<!-- Sidebar with Closed Modal -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="26.114"
				height="24.071"
				viewBox="0 0 26.114 24.071"
			>
				<g id="Group_1021" data-name="Group 1021" transform="translate(-48.75 -35.75)">
					<path
						id="Union_5"
						data-name="Union 5"
						d="M.345-256.429A.346.346,0,0,1,0-256.775v-22.881A.345.345,0,0,1,.345-280H17.7a.345.345,0,0,1,.345.345v3.026l1.167-1.168.945-.945.847-.846A1.4,1.4,0,0,1,22-280a1.45,1.45,0,0,1,1.032.428l2.15,2.15a1.44,1.44,0,0,1,.016,2.035l-.847.847-.849.849a.342.342,0,0,1-.076.115l-5.388,5.389v7.862s0,0,0,0h0a.345.345,0,0,1-.1.239l-3.551,3.551a.342.342,0,0,1-.226.1H.345Zm.345-.69H13.8v-3.206a.344.344,0,0,1,.345-.345h3.207V-267.5l-3.82,3.82a.342.342,0,0,1-.173.1h0l-.012,0-.015,0L9-262.955a.307.307,0,0,1-.05,0,.343.343,0,0,1-.115-.02.348.348,0,0,1-.129-.081.347.347,0,0,1-.1-.243.349.349,0,0,1,0-.051l.6-4.227a.343.343,0,0,1,.093-.32l8.046-8.047v-3.371H.689Zm13.8-.488,2.374-2.373H14.489Zm-5.134-6.1.726-.1-.622-.622Zm1.578-.226,1.938-.277-.511-2.521-2.5-.494-.277,1.94Zm2.094-2.979.465,2.293,3.959-3.959.015-.014,5.232-5.232-.945-.945-.434-.434Zm-.488-.488,8.291-8.291L19.6-276.921l-.144-.144-1.512,1.512-7.662,7.7Zm7.4-10.157,3.226,3.227.457-.457L20.4-278.01Zm4.171,2.281.6-.6a.751.751,0,0,0-.016-1.059l-2.15-2.151a.773.773,0,0,0-1.061-.015l-.6.6,1.613,1.613Z"
						transform="translate(49 316)"
						class="fill-egyptianblue group-hover:fill-white transition-all duration-300"
					></path>
					<path
						id="Union_5_-_Outline"
						data-name="Union 5 - Outline"
						d="M14.144-256.179H.345a.6.6,0,0,1-.595-.6v-22.881a.6.6,0,0,1,.595-.595H17.7a.6.6,0,0,1,.595.595v2.422l2.533-2.532A1.652,1.652,0,0,1,22-280.25a1.7,1.7,0,0,1,1.209.5l2.15,2.15a1.7,1.7,0,0,1,.5,1.2,1.653,1.653,0,0,1-.486,1.193l-1.664,1.664a.59.59,0,0,1-.108.147l-5.314,5.315v7.768h0a.592.592,0,0,1-.174.41l-3.551,3.551a.59.59,0,0,1-.378.173h-.043ZM.345-279.75a.1.1,0,0,0-.095.095v22.881a.1.1,0,0,0,.095.1H14.153a.092.092,0,0,0,.057-.027l3.553-3.552a.1.1,0,0,0,.027-.065v-7.967l5.462-5.462a.093.093,0,0,0,.021-.032l.019-.047,1.732-1.732a1.157,1.157,0,0,0,.34-.835,1.2,1.2,0,0,0-.356-.846l-2.15-2.15A1.2,1.2,0,0,0,22-279.75a1.156,1.156,0,0,0-.826.339l-3.386,3.386v-3.63a.1.1,0,0,0-.095-.095ZM14.05-256.869H.439v-22.691H17.6v3.724l-8.119,8.121a.094.094,0,0,0-.026.087l.01.045-.612,4.273a.1.1,0,0,0,0,.014.1.1,0,0,0,.028.068.1.1,0,0,0,.034.021.1.1,0,0,0,.033.006h.008l4.347-.622a.092.092,0,0,0,.045-.026l0,0L17.6-268.1v7.681H14.144a.094.094,0,0,0-.095.095Zm-13.11-.5H13.55v-2.956a.6.6,0,0,1,.595-.595H17.1v-5.974L13.71-263.5a.591.591,0,0,1-.3.167h-.006l-.017,0-.024,0-4.331.619a.549.549,0,0,1-.087.006.592.592,0,0,1-.2-.034.594.594,0,0,1-.221-.139.6.6,0,0,1-.175-.42.6.6,0,0,1,.006-.087l.6-4.188a.6.6,0,0,1,.17-.5l7.972-7.973v-3.017H.939Zm13.3.366v-3.227h3.228Zm.5-2.727v1.52l1.52-1.52Zm-5.678-3.678.222-1.55,1.329,1.328Zm1.784-.255-1.529-1.529.332-2.325,2.924.577.6,2.944Zm-1-1.706,1.176,1.176,1.552-.222-.425-2.1-2.08-.411Zm3.494,1.261-.584-2.881,8.563-8.562,1.732,1.733Zm-.041-2.717.346,1.705,3.63-3.63.019-.018,5.05-5.05-1.025-1.026Zm-.678-.3L9.773-267.7l7.989-8.029,1.689-1.689,1.733,1.733Zm-1.839-.883,1.675.339,8.02-8.019-1.026-1.026-1.335,1.335Zm12.383-5.966-3.58-3.58.811-.811,3.58,3.58Zm-2.873-3.58,2.873,2.873.1-.1L20.4-277.656Zm3.817,2.635-3.579-3.58.779-.779a.97.97,0,0,1,.693-.277,1.027,1.027,0,0,1,.722.292l2.15,2.151a1,1,0,0,1,.016,1.413Zm-2.872-3.58,2.872,2.873.427-.426a.5.5,0,0,0-.016-.706l-2.15-2.151a.523.523,0,0,0-.368-.145.481.481,0,0,0-.339.13Z"
						transform="translate(49 316)"
						class="fill-egyptianblue group-hover:fill-white transition-all duration-300"
					></path>
				</g>
			</svg>
			<p
				class="group-hover:text-white text-sm 1100:text-base text-onyx transition-all duration-300 font-semibold tracking-1px"
			>
				Request a quote
			</p>
		{/if}
	</div>

	<!-- Background Hover Element -->
	<div
		class="absolute -right-1px left-0 bottom-0 top-full group-hover:top-0 bg-egyptianblue transition-all duration-300 z-10"
	></div>
</button>
