<!-- 
Header.svelte

The website's header, featuring logo, navigation links, social media links, and a search bar.
-->

<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import Link from '$lib/components/assets/Link.svelte';
	import SocialMediaIcon from '$lib/components/assets/SocialMediaIcon.svelte';
	import { isValidArray } from '$lib/utils/validation';

	/*------------------------------
    # Fetch and Destructure Props
    ------------------------------*/
	export let header;
	let navigationLinks = header?.navigationLinks || [];
	let socialLinks = header?.socialLinks || [];

	/*------------------------------
    # Toggle Search Functionality
    ------------------------------*/
	let isSearchOpen = false;
	function toggleSearch() {
		isSearchOpen = !isSearchOpen;
	}
</script>

<header
	class="hidden 950:flex fixed w-full flex-row justify-between items-center pl-20 border-b border-silver backdrop-blur z-50 after:absolute after:w-full after:h-full after:bg-white after:top-0 after:left-0 after:opacity-80"
>
	<!-- Logo -->
	<div class="relative z-30 flex">
		<img src="/images/array-wordmark-logo.svg" alt="Array Logo" class="h-11" />
		<img src="/images/array-icon-logo.svg" alt="Array Logo" class="h-11 -ml-11" />
	</div>

	<!-- Main Navigation -->
	<nav class=" z-30 flex flex-row">
		<!-- Page Links -->
		<ul class="flex flex-row">
			{#if isValidArray(navigationLinks)}
				{#each navigationLinks as link}
					<!-- Standard links -->
					{#if link.type === 'link'}
						<li
							class={`p-15px xl:px-25px flex items-center uppercase text-onyx font-semibold tracking-1px cursor-pointer group/link duration-200 ${
								isSearchOpen ? 'opacity-0' : ''
							}`}
						>
							<p
								class="text-sm 1100:text-base transition-all group-hover/link:text-coral whitespace-nowrap"
							>
								{link.title}
							</p>
						</li>

						<!-- Links with Submenus -->
					{:else if link.type === 'dropdown'}
						<li
							class={`p-15px xl:px-25px flex items-center uppercase text-onyx font-semibold tracking-1px cursor-default group/dropdown duration-200
						${isSearchOpen ? 'opacity-0' : ''}
						`}
						>
							<p class="text-sm 1100:text-base group-hover/dropdown:text-coral whitespace-nowrap">
								{link.title}
							</p>

							{#if link.dropdownContent}
								<div
									class={`absolute top-full w-full pl-14 1100:pl-20 right-0 l-14 border-t border-silver flex transition-all duration-300 group-hover/dropdown:opacity-100 group-hover/dropdown:visible opacity-0 invisible`}
								>
									<!-- Submenu Greeting -->
									<div
										class={`flex flex-col w-1/4 justify-center items-center ${
											link.dropdownContent.items && link.dropdownContent.items.length >= 6
												? ' min-w-[315px] 1100:min-w-[340px] col-span-4 1100:col-span-1 row-span-2'
												: ' min-w-[265px] 1100:min-w-[350px] col-span-2'
										} py-2.5 px-6 1100:pl-16 bg-white border-b border-silver`}
									>
										<div class="flex flex-col gap-15px">
											{#if link.dropdownContent.header.title}
												<p class="capitalize font-serif text-2xl 1100:text-3xl leading-10">
													{link.dropdownContent.header.title}
												</p>
											{/if}
											<div>
												{#if link.dropdownContent.header.description}
													<p class="capitalize mb-8 font-light leading-8 text-base 1100:text-2xl">
														{link.dropdownContent.header.description}
													</p>
												{/if}

												{#if link.dropdownContent.header.actionText && link.dropdownContent.header.actionLink}
													<Link
														url={link.dropdownContent.header.actionLink}
														text={link.dropdownContent.header.actionText}
														color="blue"
													/>
												{/if}
											</div>
										</div>
									</div>

									<!-- Submenu Pages -->
									<div class={`flex grow flex-wrap bg-cover ${link.dropdownContent.background} `}>
										{#each link.dropdownContent.items as cell}
											<div
												class={`group/cell py-2.5 px-6 cursor-pointer flex flex-col justify-center items-center gap-y-3.5 relative overflow-hidden border-b border-l border-silver ${
													link.dropdownContent.items && link.dropdownContent.items.length >= 6
														? 'w-1/3 h-[200px]'
														: 'w-1/5 h-[255px] 1100:h-80'
												}`}
											>
												<div
													class="absolute bg-white h-full w-[102%] top-0 transition-all duration-300 z-0 group-hover/cell:-translate-y-full py-2.5 px-6"
												></div>

												{#if cell.image && cell.alt}
													<div class="h-[70px] flex items-center">
														<img
															src={cell.image}
															alt={cell.alt}
															class="w-16 relative z-10 transition-all duration-300 filter-none group-hover/cell:brightness-0 group-hover/cell:invert"
														/>
													</div>
												{/if}
												{#if cell.title}
													<p
														class={`font-sans text-center relative z-10 transition-colors duration-300 text-sm 1100:text-base group-hover/cell:text-white max-w-180px ${
															link.dropdownContent.items && link.dropdownContent.items.length >= 6
																? ''
																: 'whitespace-nowrap'
														}`}
													>
														{cell.title}
													</p>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</li>
					{/if}
				{/each}
			{/if}

			<!-- Search Bar -->
			<li class="px-3.5 1100:py-6 1100:pr-10 relative flex items-center">
				<button class="relative z-30 flex items-center py-3px" on:click={toggleSearch}>
					<img src="/images/search-icon.svg" alt="Search" class="cursor-pointer" /></button
				>
				<input
					type="text"
					placeholder="What are you looking for?"
					class={`py-1 pr-2.5 1100:pl-12 font-sans font-extralight absolute h-full top-0 bottom-0 transition-all duration-300 z-20 bg-transparent after:duration-200 ${
						isSearchOpen
							? 'border-l border-silver right-12 w-500px opacity-100'
							: 'right-0 opacity-0 w-0'
					}`}
				/>
			</li>
		</ul>

		<!-- Social Media Links -->
		{#if isValidArray(socialLinks)}
			<ul class="flex flex-row relative z-30 min-h-[77px]">
				{#each socialLinks as social}
					{#if social.image && social.alt && social.link}
						<li class="w-14 flex justify-center items-center border-l border-silver">
							<SocialMediaIcon image={social.image} alt={social.alt} link={social.link} />
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</nav>
</header>
