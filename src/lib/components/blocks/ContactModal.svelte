<!--
ContactModal.svelte

This component includes a contact form that overlays the entire screen.
- Styled input fields for including text, email, telephone, checkbox, and textarea.
- Background image transitions for each form page.
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { writable } from 'svelte/store';
	import { isValidArray } from '$lib/utils/validation';
	import { gsap } from 'gsap';
	import Button from '$lib/components/assets/Button.svelte';
	import { isOverlayOpen, toggleContactModal } from '$lib/utils/contactForm.js';

	/*------------------------------
	# Fetch and Destructure Props
	------------------------------*/
	export let contact;
	let slides = contact.form.slides || [];
	const selectedCards = writable({});

	let currentSlideIndex = 0; // Starting slide
	let currentBackgroundImage = slides[currentSlideIndex]?.backgroundImage || ''; // Starting background image/toggle

	let active = false;

	/*------------------------------
	# Utility Functions
	------------------------------*/
	// Toggle visibilty
	function toggleCard(title) {
		selectedCards[title] = !selectedCards[title];
	}

	// Navigation
	function goToNextSlide() {
		if (currentSlideIndex < slides.length - 1) {
			currentSlideIndex += 1;
			currentBackgroundImage = slides[currentSlideIndex].backgroundImage;
		}
	}

	function goToPreviousSlide() {
		if (currentSlideIndex > 0) {
			currentSlideIndex--;
			currentBackgroundImage = slides[currentSlideIndex].backgroundImage;
		}
	}
	// Submission
	function handleSubmit() {
		toggleContactModal();
		gsap.delayedCall(0.3, () => {
			currentSlideIndex = 0;
			currentBackgroundImage = slides[currentSlideIndex]?.backgroundImage || '';
		});
	}

	// Reset form position on close
	function resetSlideIndex() {
		currentSlideIndex = 0;
		currentBackgroundImage = slides[currentSlideIndex]?.backgroundImage || '';
	}

	$: if ($isOverlayOpen === false) {
		resetSlideIndex(); // Reset when the modal is closed
	}


</script>

<!-- Contact Form Modal -->
<div
	class={`fixed top-0 left-0 w-full h-full bg-cover bg-center overflow-scroll component-spacing pt-16 950:pt-20 z-40 bg-no-repeat transition-all duration-200 ${
		$isOverlayOpen
			? 'opacity-1 visible pointer-events-auto'
			: 'opacity-0 invisible pointer-events-none'
	}`}
	style="background-image: url('{currentBackgroundImage}')"
>
	<!-- Conditional rendering based on slide data -->
	{#if isValidArray(slides) && slides.length > 0 && currentSlideIndex < slides.length}
		<div class="w-full h-[calc(100%-77px)]">
			<div class="p-6 sm:p-12 950:px-20 950:py-16 xl:px-200px xl:py-100px">
				<!-- Slide Progress Indicator and Content -->
				<div
					class="hidden 800:flex justify-between border-b border-silver mb-16 xl:mb-[calc(15.6vh-27px)]"
				>
					{#each slides as slide, index}
						<!-- Individual Slide Indicator -->
						<p
							class={`uppercase text-center basis-1/4 pb-4 text-white font-semibold tracking-1px ${
								index === currentSlideIndex
									? 'relative after:w-full after:h-3px after:bg-sandybrown after:absolute after:left-0 after:-bottom-0.5'
									: ''
							}`}
						>
							{slide.nav}
						</p>
					{/each}
				</div>

				<!-- Close modal button (mobile) -->
				<div class="800:hidden flex w-fit ml-auto mb-6 sm:mb-12">
					<button
						on:click={toggleContactModal}
						class="uppercase text-white flex items-center gap-1 text-xs tracking-1px"
					>
						<p class="relative top-1px">Close</p>

						<img src="/images/assets/contact-modal/close.svg" alt="Close modal" loading="lazy" />
					</button>
				</div>

				<div class="flex flex-col xl:flex-row gap-10 xl:gap-y-20">
					<!-- Slide content -->
					<div
						class="xl:basis-340px 900:min-w-320px xl:min-w-[290px] 1400:min-w-[350px] flex flex-col gap-3 1400:gap-5"
					>
						<p class="text-5xl xl:text-4xl 1400:text-5xl text-white font-serif mb-2.5">
							{slides[currentSlideIndex].title}
						</p>
						<p class="text-2xl text-white font-sans font-extralight font-ballance">
							{slides[currentSlideIndex].description}
						</p>
					</div>

					<div class="340px:basis-[1000px] grow">
						{#if slides[currentSlideIndex].header}<p
								class="font-sans tracking-1px font-light text-white text-xl mb-4 capitalize"
							>
								{slides[currentSlideIndex].header}
							</p>{/if}

						<!-- Form fields -->
						<form class="flex flex-wrap gap-5">
							{#each slides[currentSlideIndex].fields as field}
								<!-- Text, Email, and Telephone -->
								{#if field.type === 'text' || field.type === 'email' || field.type === 'tel'}
									<div
										class={`${field.size === 'full' ? 'w-full' : 'w-full 950:w-[calc(50%-10px)]'} `}
									>
										{#if field.label}<p
												class="font-sans tracking-1px font-light text-white text-xl mb-4"
											>
												{field.label}
											</p>{/if}
										<input
											placeholder={field.placeholder}
											type={field.type}
											class="w-full bg-transparent border border-white text-white placeholder:text-white placeholder:opacity-50 h-12 rounded-3xl px-6 text-lg font-normal backdrop-blur"
										/>
									</div>

									<!-- Textarea -->
								{:else if field.type === 'textarea'}
									<div class="w-full">
										{#if field.label}<p
												class="font-sans tracking-1px font-light text-white text-xl mb-4"
											>
												{field.label}
											</p>{/if}

										<textarea
											placeholder={field.placeholder}
											class="py-2.5 px-15px w-full h-36 resize-none bg-transparent border border-white text-white placeholder:text-white placeholder:opacity-50 rounded-3xl text-lg font-normal backdrop-blur"
										></textarea>
									</div>

									<!-- Checkbox -->
								{:else if field.type === 'checkbox'}
									<div
										class="grid grid-cols-1 500:grid-cols-2 730:grid-cols-3 grid-rows-2 gap-25px w-full"
									>
										{#each field.options as cell}
											<button
												on:click={() => toggleCard(cell.title)}
												class={`relative py-15px px-2.5 after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0 after:border after:rounded-3xl ${
													selectedCards[cell.title]
														? 'after:border-white backdrop-blur'
														: 'after:border-transparent'
												}`}
											>
												<img src={cell.image} alt={cell.alt} class="brightness-0 invert mx-auto" loading="lazy"/>
												<p
													class="font-sans tracking-1px font-semibold text-white mt-22px mx-auto text-center max-w-[180px]"
												>
													{cell.title}
												</p>
											</button>
										{/each}
									</div>

									<!-- Form Footer -->
									{#if slides[currentSlideIndex].footerText}
										<button
											on:click={() => (active = !active)}
											class={`w-full 500:w-1/2 sm:w-1/3 mx-auto mt-1.5 relative py-15px after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0 after:border after:rounded-2xl ${
												active ? 'after:border-white backdrop-blur' : 'after:border-transparent'
											}`}
										>
											<p
												class="font-sans tracking-1px font-semibold text-white text-center uppercase mx-auto max-w-[180px]"
											>
												{slides[currentSlideIndex].footerText}
											</p>
										</button>
									{/if}
								{/if}
							{/each}
						</form>

						<!-- Navigation -->
						<div class="mt-5 flex justify-between">
							{#if slides[currentSlideIndex].previousButton}
								<Button text="Previous" onClick={goToPreviousSlide} reverseArrow="true" />
							{/if}

							{#if currentSlideIndex < slides.length - 1}
								<Button text="Next" onClick={goToNextSlide} />
							{:else}
								<Button text="Submit" onClick={handleSubmit} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
