<!--
NewsGrid.svelte

This component displays a grid of news items, with a header, button, and background image.
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { isValidArray, isValidObject } from '$lib/utils/validation';
	import Button from '$lib/components/assets/Button.svelte';

	/*------------------------------
	# Fetch and Destructure Props
	------------------------------*/
	export let news;
	let cta = news.cta || {};
	let cards = news.cards || [];
</script>

<div class="component-spacing py-20">
	<!-- News Grid Component -->
	<div
		class="border-y border-silver flex flex-col 800:flex-row justify-between gap-5 items-start 800:items-center p-9"
	>
		<!-- Header -->
		{#if news.header}
			<p class="text-onyx font-serif text-3xl 580:text-4xl xl:text-5xl">{news.header}</p>
		{/if}
		<!-- CTA -->
		{#if isValidObject(cta) && cta.buttonText && cta.buttonURL}
			<Button text={cta.buttonText} href={cta.buttonURL} invert={true} />
		{/if}
	</div>
	<!-- News Cards -->
	{#if isValidArray(cards)}
		<ul class="flex overflow-scroll">
			<!-- Individual Card -->
			{#each cards as card, index}
				<li
					class={`group w-2/3 580:w-5/12 xl:w-1/4 flex flex-col justify-between px-6 py-9 min-h-[350px] min-w-[280px] max-h-[400px] aspect-square relative cursor-pointer border-b border-r border-silver after:transition-all after:duration-300 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-white hover:after:opacity-0 news-bg-${
						index + 1
					}`}
				>
					<!-- Title -->
					<p
						class="transition-all duration-300 relative z-10 text-xl 580:text-2xl xl:text-3xl font-serif text-onyx font-light group-hover:text-white"
					>
						{card.title}
					</p>
					<!-- Date -->
					<p
						class="transition-all duration-300 relative z-10 text-base font-sans text-onyx font-semibold tracking-1px uppercase group-hover:text-white"
					>
						{card.date}
					</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>
