<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

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
		const { default: CustomCursorClass } = await import('custom-cursor.js');
		const options = {
			hideTrueCursor: false,
			focusElements: ['.accordion-panel']
		};
		cursorStore.initialize(CustomCursorClass, options);
		cursorStore.toggle(false); // Initially disable the cursor
	});

	onDestroy(() => {
		cursorStore.destroy();
	});
</script>

<CustomCursor />

<Navbar {header} />
<MobileNavbar {header} />
<Sidebar />

<slot />
<Footer {footer} />
