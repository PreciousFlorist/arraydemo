<!--
MobileNavbar.svelte

This component creates a responsive header for mobile devices, features navigation links with dropdown functionality
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import gsap from 'gsap';
	import SocialMediaIcon from '$lib/components/assets/SocialMediaIcon.svelte';
	import Button from '$lib/components/assets/Button.svelte';
	import { toggleContactModal } from '$lib/utils/contactForm.js';
	import { isValidArray } from '$lib/utils/validation';

	/*------------------------------
	# Fetch and Destructure Props
	------------------------------*/
	export let header;
	let navigationLinks = header?.navigationLinks || [];
	let socialLinks = header?.socialLinks || [];
	let cta = header?.cta || [];

	let active = false;
	let submenuElements = [];

	/*------------------------------
    # Local State and Functions
    ------------------------------*/

	function openContactModal() {
		toggleContactModal();
		toggleMenu();
	}

	function toggleMenu() {
		active = !active;

		// Close all submenus along with nav
		if (!active) {
			submenuElements.forEach((element) => {
				gsap.delayedCall(0.3, () => {
					gsap.set(element, { x: 0 });
				});
			});
		}
	}

	function toggleSubmenu(index) {
		const element = submenuElements[index];
		if (element) {
			if (gsap.getProperty(element, 'x') !== 0) {
				// Close
				gsap.fromTo(element, { x: '-100%' }, { x: 0, duration: 0.3 });
			} else {
				// Open
				gsap.fromTo(element, { x: 0 }, { x: '-100%', duration: 0.3 });
			}
		}
	}
</script>

<header
	class="950:hidden fixed w-full flex z-50 flex-row justify-between items-center top-0 pl-[24px] h-[64px] border-b border-silver backdrop-blur after:w-full after:h-full after:bg-white after:top-0 after:left-0 after:opacity-80 after:absolute"
>
	<!-- Logo -->
	<div class="relative z-30">
		<img src="/images/array-logo.svg" alt="Array Logo" class="h-43px" />
	</div>
	<!-- Hamburger -->
	<button
		class="absolute z-30 right-0 p-15px h-full w-[64px] border-l border-silver bg-whitesmoke flex justify-center items-center"
		on:click={toggleMenu}
	>
		<div>
			<span
				class={`my-[8px] ml-auto h-0.5 w-4 block rounded-full transition-all duration-300 origin-[50%_50%] ${
					active
						? 'translate-y-[10px] -translate-x-[0px] w-7 rotate-[135deg] bg-egyptianblue'
						: 'bg-jet'
				} `}
			></span>
			<span
				class={`my-[8px] ml-auto h-0.5 w-7 block rounded-full transition-all duration-300 origin-[50%_50%] ${
					active ? 'scale-0' : 'bg-jet'
				}`}
			></span>
			<span
				class={`my-[8px] ml-auto h-0.5 w-4 block rounded-full transition-all duration-300 origin-[50%_50%] ${
					active
						? '-translate-y-[10px] -translate-x-[0px] w-7 -rotate-[135deg] bg-egyptianblue'
						: 'bg-jet'
				} `}
			></span>
		</div>
	</button>
	<!-- Navigation -->
	<nav
		class={`fixed z-40 top-full h-[calc(100vh-64px)] right-0 left-0 bg-white border-b border-t border-silver transition-all duration-300 overflow-x-hidden overflow-y-scroll ${
			active ? 'visible opacity-1' : 'invisible opacity-0'
		}`}
	>
		<div class="flex z-40">
			<!-- Page Links -->
			{#if isValidArray(navigationLinks)}
				<ul class="pl-[24px] py-5 grow">
					{#each navigationLinks as link, index}
						<!-- Standard Links -->
						{#if link.type === 'link'}
							<li class="py-2.5">
								<a class="text-jet text-[19px] font-semibold uppercase tracking-1px" href={link.url}
									>{link.title}</a
								>
							</li>

							<!-- Submenu Links -->
						{:else if link.type === 'dropdown'}
							<li class=" py-2.5">
								<button
									class="cursor-pointer text-jet text-[19px] font-semibold uppercase tracking-1px"
									on:click={() => toggleSubmenu(index)}>{link.title} +</button
								>
							</li>
						{/if}
					{/each}
				</ul>
			{/if}

			<div class="w-[64px] border-l border-silver"></div>
		</div>
		<!-- Search -->
		<div class="border-t border-b border-silver flex h-[64px] z-40">
			<input
				class="grow pl-[24px] text-[18px] tracking-1px font-light"
				type="text"
				placeholder="Search our site"
			/>
			<div class="w-[64px] flex justify-center items-center">
				<img src="/images/search-icon.svg" alt="Search" class="cursor-pointer" />
			</div>
		</div>
		<!-- Call to Action -->
		{#if isValidArray(cta)}
			{#each cta as banner}
				<div
					class={`py-10 z-40 px-[24px] flex flex-col justify-center items-center ${banner.background}`}
				>
					<p class="font-serif text-white text-4xl mb-6 text-center">{banner.title}</p>
					<Button text={banner.buttonText} onClick={openContactModal} />
				</div>
			{/each}
		{/if}
		<!-- Social Media Links -->
		<ul class="flex flex-row z-40 border-b border-silver">
			{#each socialLinks as social}
				<li class="w-1/4 border-l border-silver flex justify-center items-center aspect-square">
					<SocialMediaIcon image={social.image} alt={social.alt} link={social.link} size="large" />
				</li>
			{/each}
		</ul>
		<!-- Submenus -->
		{#if isValidArray(navigationLinks)}
			{#each navigationLinks as link, index}
				{#if link.type === 'dropdown'}
					<div
						bind:this={submenuElements[index]}
						class="absolute z-40 w-full h-[calc(100vh-64px)] top-0 bg-white border-b border-silver left-full overflow-scroll"
					>
						<div class="py-4 px-[24px] flex justify-between border-b border-silver">
							<!-- Submenu Title -->
							<p class="uppercase tracking-1px text-lg font-bold text-arraygray">{link.title}</p>
							<!-- Close Submenu -->
							<button
								on:click={() => toggleSubmenu(index)}
								class="text-egyptianblue uppercase font-semibold text-sm tracking-1px flex gap-2.5 items-center"
							>
								<img src="/images/assets/arrow-blue.svg" alt="Left arrow" />

								<span class="relative top-1px">Back</span>
							</button>
						</div>
						<ul class="grid grid-cols-2">
							{#each link.dropdownContent.items as item}
								<li
									class="border-b border-r border-silver px-[24px] p-5 flex flex-col gap-2.5 justify-center items-center"
								>
									<!-- Link Icon -->
									<img src={item.image} alt={item.alt} class="w-16 relative" />
									<!-- Link Title -->
									<p
										class="text-center uppercase text-jet text-semibold tracking-1px text-xs"
										href="#"
									>
										{item.title}
									</p>
								</li>
							{/each}
						</ul>

						<!-- Background -->
						<div
							class={`py-10 px-[24px] flex flex-col gap-2 ${link.dropdownContent.background} bg-cover`}
						>
							<p class="font-serif text-white text-3xl tracking-1px">{link.cta.title}</p>
							<p class="font-sans text-white text-base tracking-1px font-light">
								{link.cta.description}
							</p>
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</nav>
</header>
