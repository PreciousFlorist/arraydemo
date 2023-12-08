<!-- 
AccordionComponent.svelte

This component implements an accordion with an embedded carousel and custom cursor toggle. 
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/

	import { browser } from '$app/environment';
	import { isValidArray } from '$lib/utils/validation';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import Link from '$lib/components/assets/Link.svelte';
	import { cursorStore } from '$lib/stores/cursorStore';
	import { fade } from '$lib/utils/fade';

	/*------------------------------
	# Fetch and Destructure Props
	------------------------------*/
	// Accordion panels data and initial state for the open panel.
	export let accordion;
	let panels = accordion.panels || [];
	let openAccordionIndex = 0; // First panel is open by default

	/*------------------------------
	# Utility Functions
	------------------------------*/
	// Toggle function to open or close accordion panels.
	function toggleAccordion(index) {
		openAccordionIndex = openAccordionIndex === index ? null : index;
	}

	// Mouse event handlers for custom cursor behavior.
	function handleMouseEnter() {
		cursorStore.toggle(true);
		cursorStore.updateText(accordion.cursorText); // Set cursor text value
		cursorStore.updateDirection(false); // Set arrow direction
	}
	function handleMouseLeave() {
		cursorStore.toggle(false);
		cursorStore.updateText(''); // Unset cursor text value
	}
</script>

<div class="component-spacing py-20 overflow-hidden">
	<!-- Accordion title -->
	<p
		use:fade
		class="fade-in-right uppercase font-sans font-semibold text-onyx tracking-1px pb-5 px-6 lg:px-9 1100:px-20"
	>
		{accordion.title}
	</p>
	{#if isValidArray(panels)}
		<div class=" border-t border-silver">
			<!-- Individual Accordion Panel -->
			{#each panels as panel, index}
				<div class="border-b border-silver">
					<!-- Toggle Accordion Button -->
					<button
						class={`flex items-center justify-between text-left w-full py-5 px-6 lg:px-9 1100:px-20 focus:outline-none transition-[padding] duration-300 ${
							openAccordionIndex === index ? 'lg:py-6' : 'py-5'
						}`}
						on:click={() => toggleAccordion(index)}
					>
						<div use:fade class="fade-in-right flex items-center lg:gap-7">
							<p class="hidden lg:block text-arraygray font-sans font-semibold">
								{'0' + (index + 1)}
							</p>
							<p
								class={` font-serif transition-all duration-300 ${
									openAccordionIndex === index
										? ' text-onyx text-2xl md:text-3xl lg:text-4xl'
										: 'text-arraygray  text-xl md:text-2xl lg:text-3xl'
								}`}
							>
								{panel.heading}
							</p>
						</div>

						<span class="text-3xl text-arraygray">{openAccordionIndex === index ? '-' : '+'}</span>
					</button>

					<!-- Accordion Panel Content -->
					<div
						use:fade
						class={`fade-in-up overflow-hidden flex flex-col lg:flex-row bg-whitesmoke transition-all duration-300 ${
							openAccordionIndex === index ? 'max-h-[1000px] lg:h-[600px]' : 'max-h-0 lg:h-0'
						}`}
					>
						<!-- Header & CTA -->
						<div
							class="lg:w-[45%] h-full p-6 pb-8 lg:p-12 1100:pl-20 border-t border-r border-silver flex flex-col gap-7 justify-between"
						>
							<p
								use:fade
								class="fade-in-up font-sans text-arraygray leading-normal font-light text-2xl"
							>
								{panel.body}
							</p>

							<div class="hidden lg:block">
								<Link url={panel.buttonURL} text={panel.buttonText} color="blue" />
							</div>

							<div class="block lg:hidden">
								<Link url={panel.buttonURL} text={panel.buttonSmText} color="blue" />
							</div>
						</div>

						<!-- Carousel -->
						<div
							class=" cursor-none group flex lg:w-[55%] 1200:w-[65%] h-[600px] lg:border-t border-silver overflow-hidden"
							on:mouseenter={handleMouseEnter}
							on:mouseleave={handleMouseLeave}
							role="presentation"
						>
							{#if isValidArray(panel.caseStudy) && browser}
								<Splide
									options={{ type: 'loop', width: '100%', height: '100%', gap: 0 }}
									hasTrack={false}
								>
									<div
										use:fade={{index, delay: 0, onlyFirst: true}}
										class="{index === 0 ? 'fade-in-left' : ''} relative h-full w-full"
									>
										<SplideTrack>
											{#each panel.caseStudy as project, i}
												<SplideSlide>
													<div class="flex flex-col h-[600px] relative">
														<!-- Slide header & Bio -->
														<div
															class="xl:h-full xl:absolute z-20 flex flex-col gap-2.5 w-full bg-white xl:bg-transparent xl:justify-end p-6 xl:p-12 top-0 left-0 transition-all duration-300 backdrop-blur xl:opacity-0 group-hover:opacity-100"
														>
															{#if project.title}
																<p
																	class="uppercase font-sans font-bold tracking-1px text-onyx xl:text-white"
																>
																	{project.title}
																</p>
															{/if}
															{#if project.bio}
																<p
																	class="font-serif font-light xl:max-w-[45vw] tracking-1px text-2xl lg:text-3xl xl:leading-[63px] xl:text-5xl xl:text-white"
																>
																	{project.bio}
																</p>
															{/if}
														</div>
														<!-- Background Overlay -->
														<div
															class="invisible xl:visible absolute z-10 top-0 left-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-[37%]"
															style={`background-color: ${project.background}`}
														></div>

														<!-- Image and Video Assets -->
														<div class="lg:h-[600px] flex-grow w-full relative">
															{#if project.imageSrc && project.imageAlt}
																<img
																	class="max-xl:absolute w-full h-full object-cover object-center pointer-events-none"
																	src={project.imageSrc}
																	alt={project.imageAlt}
																/>
															{:else if project.videoSrc}
																<video
																	autoplay
																	playsinline
																	muted
																	loop
																	class="max-xl:absolute w-full h-full object-center object-cover"
																>
																	<source src={project.videoSrc} type="video/mp4" />
																	<source src={project.videoSrc} type="video/ogg" />
																</video>
															{/if}
														</div>
													</div>
												</SplideSlide>
											{/each}
										</SplideTrack>
										<!-- Carousel Navigation -->
										<div
											class="splide__arrows absolute max-md:-top-5 max-lg:-top-6 right-2.5 z-20 lg:bottom-2.5 lg:right-2.5 xl:hidden flex gap-2.5"
										>
											<button
												class="splide__arrow splide__arrow--prev w-10 h-10 md:w-12 md:h-12 bg-center bg-contain rotate-180 bg-[url('/images/assets/carousel/arrow.svg')]"
											></button>
											<button
												class="splide__arrow splide__arrow--next w-10 h-10 md:w-12 md:h-12 bg-center bg-contain bg-[url('/images/assets/carousel/arrow.svg')]"
											></button>
										</div>
									</div>
								</Splide>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
