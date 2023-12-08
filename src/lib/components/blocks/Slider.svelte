<!-- 
Slider.svelte

This component creates a vertical slider, with reel animations. Each slide contains a gradient image, icon, and line of text.
-->

<script>
	/*------------------------------
    # Imports
    ------------------------------*/
	import { onMount } from 'svelte';
	import { cursorStore } from '$lib/stores/cursorStore';
	import { isValidArray } from '$lib/utils/validation';
	import { preloadImages } from '$lib/utils/preloadImages';
	import Link from '$lib/components/assets/Link.svelte';

	/*------------------------------
	# Fetch Props and Destructure Props
	------------------------------*/
	export let slider;
	let slides = slider.slides || [];
	let length = slides.length;
	let currentSlideIndex = 0; // This index is used to set the background gradient, starting with the first slide on pageload

	/*------------------------------------------------------------
	# Utility Functions
	------------------------------------------------------------*/
	// Preload Images
	onMount(() => {
		// Extract URLs for preloading
		let backgroundUrls = slides.map((slide) => slide.background);
		// Process files
		preloadImages(backgroundUrls);
	});

	/*------------------------------
    # Slide transitions
    ------------------------------*/
	// Rotation degree for the slide reel animation
	let rotation = -13;
	// Rotates the slide reel based on slide direction
	function rotateWheel(direction) {
		if (direction === 'next') {
			rotation += 25.721;
		} else if (direction === 'prev') {
			rotation -= 25.721;
		}
	}

	// Navigates to the next or previous slide
	function goToSlide(direction) {
		let newIndex = direction === 'next' ? currentSlideIndex + 1 : currentSlideIndex - 1;
		if (newIndex >= length) newIndex = 0;
		if (newIndex < 0) newIndex = length - 1;
		rotateWheel(direction);
		updateSlideIndex(newIndex);
	}

	// Updates current slide
	function updateSlideIndex(newIndex) {
		if (newIndex >= 0 && newIndex < slides.length) {
			currentSlideIndex = newIndex;
		}
	}

	/*------------------------------
	# Custom cursor
	------------------------------*/
	// Toggles custom cursor visibility and text
	function handleMouseEnter() {
		cursorStore.toggle(true);
		cursorStore.updateText(slider.cursorText); // Set cursor text value
		cursorStore.updateDirection(true); // Set arrow direction
	}
	function handleMouseLeave() {
		cursorStore.toggle(false);
		cursorStore.updateText(''); // Unset cursor text value
	}

	// Cursor visibility controls for hoverable elements
	function showDefaultCursor() {
		cursorStore.toggle(false);
	}
	function showCustomCursor() {
		cursorStore.toggle(true);
	}

	/*------------------------------
	# Slider touch responses
	------------------------------*/
	// Monitor drag activity & response
	let startY,
		isDragging = false;
	let dragDirection;

	// Store drag coordiantes
	function onDragStart(event) {
		startY = event.pageY || (event.touches ? event.touches[0].pageY : 0);
		isDragging = true;
		dragDirection = null; // Reset direction on new drag
	}

	// Determine dragging direction
	function onDragMove(event) {
		if (!isDragging) return;

		const currentY = event.pageY || (event.touches ? event.touches[0].pageY : 0);
		const diffY = currentY - startY;

		if (diffY > 0) {
			dragDirection = 'down';
		} else if (diffY < 0) {
			dragDirection = 'up';
		}
	}

	// Toggle slide on drag end
	function onDragEnd() {
		if (dragDirection === 'down') {
			goToSlide('next');
		} else if (dragDirection === 'up') {
			goToSlide('prev');
		}
		isDragging = false;
	}
</script>

<div class="component-spacing relative overflow-hidden">
	<div
		class="cursor-none relative bg-no-repeat bg-center bg-cover transition-all duration-300 flex flex-col 1400:flex-row justify-end max-1400:pb-10"
		style={`background-image: url('${slides[currentSlideIndex].background}')`}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		on:mousedown={onDragStart}
		on:mousemove={onDragMove}
		on:mouseup={onDragEnd}
		on:touchstart={onDragStart}
		on:touchmove={onDragMove}
		on:touchend={onDragEnd}
		role="presentation"
	>
		<!-- Header -->
		<div
			class=" relative flex max-1400:flex-col max-1400:items-center 1400:min-w-[710px] 1400:w-[47%] 1400:h-[800px]"
		>
			<!-- Background Banner -->
			<div
				class="z-20 max-1400:w-full max-1400:h-fit max-1400:top-0 max-1400:left-0 max-1400:flex max-1400:flex-row max-1400:justify-center max-1400:items-stretch"
			>
				<!-- Banner left -->
				<div class=" bg-onyx flex-grow 1400:hidden"></div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 390 304.861"
					class="
                    max-1400:w-96 min-w-96
                    1400:z-20 1400:object-cover 1400:w-[113%] 1400:h-full 1400:-rotate-90 1400:absolute 1400:right-0 1400:top-0
                    "
				>
					<path
						id="Path_2280"
						data-name="Path 2280"
						d="M359.864,195a178.229,178.229,0,0,0,62.828,136.016c.08.07.155.136.234.2V390H118.065V0H422.926V58.784a2.994,2.994,0,0,0-.234.2A178.215,178.215,0,0,0,359.864,195"
						transform="translate(390 -118.065) rotate(90)"
						fill="#414042"
					></path>
				</svg>
				<div class=" bg-onyx flex-grow 1400:hidden"></div>
			</div>

			<!-- Reel and thumbnail assets -->
			<div
				class="
                absolute select-none pointer-events-none z-10 -bottom-[150px] 500:-bottom-[185px] 580:-bottom-[210px] lg:w-[525px] lg:h-[525px]
                1400:w-[525px] 1400:h-[525px] 1400:-rotate-90 1400:top-1/2 1400:-translate-y-1/2 1400:-right-6
                "
			>
				<div
					class="w-[420px] lg:w-[526px] relative
                "
				>
					<!-- Thubmnail icon -->
					<div
						class=" z-10 rounded-[14px] transition-all duration-300 border border-white absolute w-[53px] h-14 top-[333px] right-[184px] lg:w-[59px] lg:h-[70px] lg:top-[417px] lg:right-[233px] bg-no-repeat bg-center bg-cover"
						style={`background-image: url('${slides[currentSlideIndex].background}')`}
					></div>
					<!-- Slide Reel -->
					<div class="backdrop-blur rounded-full">
						<img
							class=" transition-all duration-300"
							style={`transform: rotate(${rotation}deg)`}
							src="/images/assets/slider/wheel.svg"
							alt="Reel"
						/>
					</div>
				</div>
				<!-- Pointer -->
				<img
					class="relative -top-2.5 rotate-90 mx-auto max-lg:w-[60px]"
					src="/images/assets/slider/pointer.svg"
					alt="Pointer"
				/>
			</div>

			<!-- Header Content -->
			<div
				class="flex flex-col justify-center absolute z-30 px-6 lg:px-9 sm:gap-9 w-full 1400:w-fit 1100:px-20 h-full bottom-0 1400:py-16 1400:justify-between max-sm:pb-10 1400:gap-2.5"
			>
				<!-- Subheader -->
				{#if slider.subhead}
					<p class="relative z-10 uppercase font-sans font-semibold text-white tracking-1px">
						{slider.subhead}
					</p>
				{/if}
				<!-- Title -->
				{#if slider.title}
					<p
						class="relative z-10 w-fit capitalize font-serif tracking-1px text-white text-4xl leading-[45px] lg:text-5xl lg:leading-[55px]"
					>
						{@html slider.title}
					</p>
				{/if}
				<!-- CTA Link -->
				{#if slider.buttonText && slider.buttonURL}
					<div class="max-sm:hidden">
						<Link
							url={slider.buttonURL}
							text={slider.buttonText}
							cursorReset={true}
							color="orange"
						/>
					</div>
				{/if}
			</div>
		</div>

		<!-- Slide -->
		{#if isValidArray(slides)}
			<div class="flex flex-col justify-center 1400:relative 1400:w-[calc(53%)] 1400:ml-28">
				<div
					class="flex flex-col justify-center items-center pt-[400px] 580:pt-[450px] lg:pt-[500px] 1400:pt-0"
				>
					<!-- Slide Loop -->
					{#each slides as slide, index}
						<div class={`flex max-1400:absolute bottom-[105px] 580:bottom-[138px]  `}>
							<div
								class={`px-6 lg:px-9 1100:px-20 1400:p-0 select-none max-w-[633px] lg:max-w-[800px] 1400:max-w-[70%] 1400:basis-[700px] flex justify-center items-center gap-8 ${
									index === currentSlideIndex ? 'opacity-100' : 'opacity-0 absolute'
								}`}
							>
								<!-- Icon -->
								{#if slide.iconURL && slide.iconAlt}
									<img class="max-500:hidden w-[75px]" src={slide.iconURL} alt={slide.iconAlt} />
								{/if}
								<!-- Slide copy -->
								{#if slide.body}
									<p class="text-white tracking-1px text-2xl leading-9">
										{slide.body}
									</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<!-- Slide Navigation Tools -->
				<div
					class="flex w-full items-center gap-[22px] absolute select-none px-6 lg:px-9 1100:px-20 1400:px-0 bottom-[45px] 1400:bottom-[100px] left-0 1400:max-w-[70%] 1400:basis-[700px]"
				>
					<!-- Current Slide Number -->
					<p class="text-white font-semibold">0{currentSlideIndex + 1}</p>

					<!-- Progress Bar -->
					<div class="flex grow w-full items-center">
						{#each slides as _, index}
							<div
								class={`bg-white transition duration-300 ${
									currentSlideIndex === index ? 'h-[3px]' : 'h-px'
								}`}
								style={`width: ${(1 / length) * 100}%; opacity: ${
									currentSlideIndex === index ? '1' : '0.5'
								};`}
							></div>
						{/each}
					</div>

					<!-- Total number of slides -->
					<p class="text-white font-semibold whitespace-nowrap">/ 0{length}</p>

					<!-- Navigation Buttons -->
					<div class="flex gap-1 580:gap-2">
						<!-- Prev -->
						<button
							class="min-w-[54px] backdrop-blur p-1px"
							on:click={() => goToSlide('prev')}
							on:mouseenter={showDefaultCursor}
							on:mouseleave={showCustomCursor}
						>
							<img src="/images/assets/slider/navigation.svg" alt="Previous" />
						</button>
						<!-- Next -->
						<button
							class="min-w-[54px] backdrop-blur p-1px"
							on:click={() => goToSlide('next')}
							on:mouseenter={showDefaultCursor}
							on:mouseleave={showCustomCursor}
						>
							<img class="rotate-180" src="/images/assets/slider/navigation.svg" alt="Next" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
