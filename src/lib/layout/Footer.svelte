<!-- 
Footer.svelte

The website's footer, including the company logo, products, contact information, social media links, terms of service, and payment methods.
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { isValidArray, isValidObject } from '$lib/utils/validation';
	import Button from '$lib/components/assets/Button.svelte';
	import SocialMediaIcon from '$lib/components/assets/SocialMediaIcon.svelte';

	/*------------------------------
    # Fetch and Destructure Props
    ------------------------------*/
	export let footer;

	let logo = footer?.logo || {};
	let products = footer?.productsSection || {};
	let cta = footer?.cta || {};
	let socials = footer?.socialMediaLinks || [];
	let tos = footer?.tos || {};
	let payments = footer?.payments || {};
</script>

<footer class="component-spacing py-7 bg-whitesmoke">
	<div class="border-y border-silver grid grid-cols-1 auto-rows-auto">
		<!-- Products -->
		<div
			class="flex items-center justify-between py-5 px-6 800:px-14 row-start-3 800:row-start-1 border-t 800:border-t-0 border-silver"
		>
			{#if isValidObject(logo) && logo.image && logo.alt}
				<div class="hidden 800:block">
					<img src={logo.image} alt={logo.alt} />
				</div>
			{/if}

			{#if isValidObject(products)}
				<div
					class="flex flex-wrap sm:flex-nowrap justify-between w-full 800:w-fit items-center gap-2.5 800:px-14 800:py-2.5"
				>
					{#if products.title}
						<p class="w-full sm:w-fit text-onyx font-light">{products.title}</p>
					{/if}

					{#if products.products}
						{#each products.products as product}
							<div class="w-fit">
								<img src={product.image} alt={product.alt} />
							</div>
						{/each}
					{/if}
				</div>
			{/if}
		</div>

		<!-- Contact & CTA -->
		<div class="flex flex-row flex-wrap border-t-0 border-b 800:border-t border-silver">
			<div
				class="w-full 1200:w-1/2 py-5 px-6 800:py-12 800:pl-14 border-b 1200:border-b-0 border-silver flex flex-col items-center 800:items-start"
			>
				{#if isValidObject(logo) && logo.image && logo.alt}
					<div class="800:hidden w-fit">
						<img src={logo.image} alt={logo.alt} />
					</div>
				{/if}

				{#if isValidObject(cta)}
					{#if cta.text}
						<p
							class="font-serif text-onyx text-22px 800:text-[35px] mb-5 max-w-[530px] text-center 800:text-left font-light"
						>
							{cta.text}
						</p>
					{/if}

					{#if cta.buttonText && cta.buttonHref}
						<Button text={cta.buttonText} href={cta.buttonHref} invert={true} />
					{/if}
				{/if}
			</div>

			<!-- Social Media Links -->
			<div class="w-full 1200:w-1/2 flex 1400:basis-[650px] 1400:ml-auto">
				{#if isValidArray(socials)}
					{#each socials as social}
						<div
							href={social.url}
							class="w-1/4 h-full aspect-square 1200:aspect-auto border-r border-l-0 1200:border-r-0 1200:border-l border-silver flex justify-center items-center"
						>
							<SocialMediaIcon
								image={social.image}
								alt={social.alt}
								link={social.url}
								white={false}
								size="large"
							/>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Terms of Service -->
		<div class="flex flex-col-reverse 800:flex-row">
			<div
				class="w-full 800:w-1/2 grow py-5 px-6 800:px-14 800:py-9 border-r 1200:border-r-0 border-silver"
			>
				{#if isValidObject(tos)}
					{#if tos.acknowledgement}
						<p class="text-[14px] text-onyx font-light mb-2.5">{tos.acknowledgement}</p>
					{/if}
					{#if tos.terms}
						<p class="text-[14px] text-onyx font-light">{@html tos.terms}</p>
					{/if}
				{/if}
			</div>

			<!-- Payment Methods -->
			<div
				class="w-full 800:w-1/2 border-b 800:border-b-0 1200:border-l border-silver flex flex-wrap 1400:basis-[650px] justify-between items-center py-5 px-6 800:pl-[50px] 800:pr-14"
			>
				{#if isValidObject(payments)}
					{#if payments.methods}
						{#each payments.methods as method, i}
							<div
								class={`flex items-center justify-center w-1/4 sm:w-1/5 1400:w-auto order-[${i}]`}
							>
								<img src={method.image} alt={method.alt} />
							</div>
						{/each}
					{/if}

					{#if payments.ctaText && payments.ctaUrl}
						<div
							class="mt-5 sm:mt-0 sm:order-first 800:order-last w-full sm:w-fit 800:w-full 1400:w-auto"
						>
							<Button text={payments.ctaText} href={payments.ctaUrl} invert={true} />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</footer>
