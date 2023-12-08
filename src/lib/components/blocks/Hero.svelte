<!--
Hero.svelte

This component includes the page tile and a video modal that overlays the entire screen.
-->

<script>
	/*------------------------------
    # Imports
    ------------------------------*/
	import { writable } from 'svelte/store';
	import { cursorStore } from '$lib/stores/cursorStore';
	import { fade } from '$lib/utils/fade';

	/*------------------------------
	# Fetch Props
	------------------------------*/
	export let hero;

	/*------------------------------
    # Utility Functions
    ------------------------------*/
	// State variable for lightbox visibility
	let isLightboxOpen = writable(false);

	// Function to toggle lightbox
	function toggleLightbox() {
		isLightboxOpen.update((isOpen) => !isOpen);
	}

	// Prevent clicks on the video from closing modal
	function handleVideoClick(event) {
		event.stopPropagation();
	}

	// Mouse event handlers for custom cursor behavior.
	function handleMouseEnter() {
		cursorStore.toggle(true);
		cursorStore.updateText(hero.cursorText); // Set cursor text value
		cursorStore.updateDirection(false); // Set arrow direction
	}
	function handleMouseLeave() {
		cursorStore.toggle(false);
		cursorStore.updateText(''); // Unset cursor text value
	}
</script>

<div class="component-spacing pt-16 950:pt-20 flex flex-col overflow-hidden">
	{#if hero.header}
		<h1
			use:fade
			class="fade-in-right font-serif text-onyx text-3xl leading-snug lg:text-[34px] xl:text-[38px] mx-6 lg:mx-9 1100:mx-20 py-10 lg:py-20 800:max-w-[65vw] xl:max-w-[800px]"
		>
			{hero.header}
		</h1>
	{/if}

	{#if hero.videoSrc}
		<div
			class="aspect-video min-h-[450px] max-h-[825px] relative xl:-right-px lg:ml-9 1100:ml-20 flex-grow"
			role="presentation"
		>
			<!-- Arrow -->
			<img
				src="/images/assets/hero/arrow.svg"
				alt="arrow"
				class="absolute z-30 right-0 top-0 -translate-y-1/4 800:-translate-y-1/2 w-[calc(100px+15vw)]"
			/>
			<!-- Video -->
			<video
				autoplay
				playsinline
				muted
				loop
				class=" absolute w-full h-full object-center object-cover"
			>
				<source src={hero.videoSrc} type="video/mp4" />
				<source src={hero.videoSrc} type="video/ogg" />
			</video>

			<!-- Overlay and Modal Toggle -->
			<div
				class="cursor-none hover:after:opacity-30 after:opacity-0 max-lg:after:opacity-30 after:absolute after:bg-black after:w-full after:h-full after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-30 after:transition-opacity after:duration-300"
				on:click={toggleLightbox}
				on:mouseenter={handleMouseEnter}
				on:mouseleave={handleMouseLeave}
				role="presentation"
			>
				<div
					class="lg:after:hidden after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:h-14 after:w-14 after:absolute after:z-40 after:backdrop-blur after:bg-white after:opacity-20"
				>
					<img
						src="/images/assets/hero/play-video.svg"
						alt="Play video"
						class="ml-0.5 lg:hidden w-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-40 opacity-100"
					/>
				</div>
			</div>
		</div>
	{/if}

	<!-- Lightbox -->
	<div
		class={`
        fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-300
        after:bg-lightbox after:opacity-90 after:absolute after:top-0 after:left-0 after:w-full after:h-full z-40
        ${$isLightboxOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}
		role="presentation"
		on:click={toggleLightbox}
	>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			class={`relative z-20 lg:max-w-[75vw] max-h-full aspect-video transition-all duration-300 ${
				$isLightboxOpen ? 'opacity-100' : 'opacity-0'
			}`}
			playsinline
			loop
			controls
			on:click={handleVideoClick}
		>
			<source src={hero.videoSrc} type="video/mp4" />
			<source src={hero.videoSrc} type="video/ogg" />
		</video>

		<!-- Close Modal -->
		<div
			class="absolute top-0 right-0 text-white p-2 px-2.5 bg-onyx rounded-bl-lg z-40 cursor-pointer"
		>
			<img src="/images/assets/hero/close.svg" alt="Close" class="w-5" />
		</div>
	</div>
</div>
