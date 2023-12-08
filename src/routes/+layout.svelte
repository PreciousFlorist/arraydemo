<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { preloadImages } from '$lib/utils/preloadImages';

	import Navbar from '$lib/layout/Navbar.svelte';
	import MobileNavbar from '$lib/layout/MobileNavbar.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Sidebar from '$lib/layout/Sidebar.svelte';
	import CustomCursor from '$lib/components/assets/CustomCursor.svelte';
	import { cursorStore } from '$lib/stores/cursorStore';

	/*------------------------------
	# Fetch and Destructure Data
	------------------------------*/
	export let data;
	const { header, footer } = data;

	/*------------------------------
    # Custom Cursor Setup
    ------------------------------*/
	// Imported and used globally across the app, so that it can be used with any component.
	onMount(async () => {
		// Preload images
		let headerImages = extractHeaderImageUrls(header);
		let footerImages = extractFooterImageUrls(footer);
		preloadImages([...headerImages, ...footerImages]);

		// Render custom cursor
		const { default: CustomCursorClass } = await import('custom-cursor.js');
		const options = {
			hideTrueCursor: false
		};
		cursorStore.initialize(CustomCursorClass, options);
		cursorStore.toggle(false); // Initially disable the cursor
	});

	onDestroy(() => {
		cursorStore.destroy();
	});

	/*------------------------------
	# Helper Functions
	------------------------------*/
	function extractHeaderImageUrls(headerData) {
		let images = [];

		// Extract CTA background images
		if (headerData.cta) {
			headerData.cta.forEach((cta) => {
				if (cta.background) images.push(cta.background);
			});
		}

		// Extract navigation dropdown background images and item images
		if (headerData.navigationLinks) {
			headerData.navigationLinks.forEach((link) => {
				if (link.type === 'dropdown' && link.dropdownContent) {
					if (link.dropdownContent.background) {
						images.push(link.dropdownContent.background);
					}
					link.dropdownContent.items.forEach((item) => {
						if (item.image) images.push(item.image);
					});
					if (link.cta && link.cta.background) {
						images.push(link.cta.background);
					}
				}
			});
		}

		// Extract social link images
		if (headerData.socialLinks) {
			headerData.socialLinks.forEach((link) => {
				if (link.image) images.push(link.image);
			});
		}

		return images.filter((url) => url); // Filter out any undefined or null URLs
	}

	function extractFooterImageUrls(footerData) {
		let images = [];

		// Extract logo image
		if (footerData.logo && footerData.logo.image) {
			images.push(footerData.logo.image);
		}

		// Extract product images
		if (footerData.productsSection && footerData.productsSection.products) {
			footerData.productsSection.products.forEach((product) => {
				if (product.image) images.push(product.image);
			});
		}

		// Extract social media link images
		if (footerData.socialMediaLinks) {
			footerData.socialMediaLinks.forEach((link) => {
				if (link.image) images.push(link.image);
			});
		}

		// Extract payment method images
		if (footerData.payments && footerData.payments.methods) {
			footerData.payments.methods.forEach((method) => {
				if (method.image) images.push(method.image);
			});
		}

		return images.filter((url) => url); // Filter out any undefined or null URLs
	}
</script>

<CustomCursor />

<Navbar {header} />
<MobileNavbar {header} />
<Sidebar />

<slot />
<Footer {footer} />
