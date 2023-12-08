<!-- 
CallToAction.svelte

This CTA component includes:
- Infinite scrolling text background
- Spinning star element
- Photo grid
- CTA Button
-->


<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import Button from '$lib/components/assets/Button.svelte';
	import { isValidArray, isValidObject } from '$lib/utils/validation';
	import { fade } from '$lib/utils/fade';

	/*------------------------------
	# Fetch and Destructure Props
	------------------------------*/
	export let cta;
	let button = cta.button || {};
	let photos = cta.instagramImages || [];

	/*------------------------------
    # Local State
    ------------------------------*/
	let scrollContainer; // Reference to the container of the scrolling text
	let starElement; // Reference to the star element for animation

	/*------------------------------
    # Lifecycle Hooks
    ------------------------------*/
	onMount(() => {
		// Calculate the total width of the scrollable content
		const textWidth = scrollContainer.querySelector('p').offsetWidth;
		const totalWidth = textWidth * scrollContainer.children.length;
		// Duplicate copy for a seamless loop
		const content = scrollContainer.innerHTML;
		scrollContainer.innerHTML += content;
		// Set the scroll speed (pixels per second) and calculate duration
		const scrollSpeed = 110; // Adjust this value to control the scroll speed
		const totalDuration = totalWidth / scrollSpeed;

		// Scrolling text animation
		gsap.to(scrollContainer, {
			x: () => -(totalWidth - window.innerWidth),
			ease: 'linear',
			repeat: -1,
			duration: totalDuration,
			modifiers: {
				x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) // Loop back to start when reaching the end
			}
		});

		// Star text
		gsap.to(starElement, {
			rotation: 360,
			duration: 10,
			ease: 'linear',
			repeat: -1
		});
	});
</script>

<div class="component-spacing">
	
	<!-- Call to Action Background and Content -->
	<div class="pb-32 pt-24 cta-gradient relative">
		<div class="cta-pinstripe absolute top-0 left-0 w-full h-full"></div>
		
		<!-- Scrolling Text -->
		<div class="flex flex-col items-center justify-center overflow-hidden">
			<div class="whitespace-nowrap flex overflow-hidden" bind:this={scrollContainer}>
				{#if cta.title}
					{#each Array.from({ length: 4 }) as _}
						<p
							class="mr-20 text-[100px] 950:text-[110px] 1200:text-[120px] 1400:text-[140px] shrink-0 text-white opacity-30 font-serif relative z-10"
						>
							{cta.title}
						</p>
					{/each}
				{/if}
			</div>
			<!-- CTA Button -->
			{#if isValidObject(button) && button.title && button.url}
				<Button text={button.title} href={button.url} />
			{/if}
		</div>

		<!-- Star Element -->
		<div
			class="absolute z-10 flex items-center justify-center 1400:right-[15%] 1400:-bottom-[9%] 1400:scale-90 lg:right-[12%] lg:-bottom-[11%] lg:scale-[.8] 500:right-[3%] -bottom-[16%] scale-[.6] right-[1%]"
		>
			<div class="relative">
				<img bind:this={starElement} alt="Meet Array" src="/images/components/cta/star-text.svg" />
			</div>
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<img alt="White array logo" src="/images/components/cta/star.svg" />
			</div>
		</div>
	</div>
	
	<!-- Instagram Image Grid -->
	{#if isValidArray(photos)}
		<ul use:fade class="fade-in-down flex overflow-scroll">
			{#each photos as _, index}
				<li
					class={`w-2/3 580:w-5/12 xl:w-1/4 flex flex-col justify-between px-6 py-9 min-h-[350px] min-w-[280px] max-h-[400px] aspect-square relative cursor-pointer cta-bg-${
						index + 1
					}`}
				>
					<img
						class="opacity-90 w-6 absolute top-3 right-3"
						src="/images/components/cta/picture-in-picture.svg"
						alt="Open in new tab"
					/>
				</li>
			{/each}
		</ul>
	{/if}
</div>
