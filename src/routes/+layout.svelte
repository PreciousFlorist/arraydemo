<script>
	import Navbar from '$lib/layout/Navbar.svelte';
	import MobileNavbar from '$lib/layout/MobileNavbar.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Sidebar from '$lib/layout/Sidebar.svelte';

	// Fetch and destructure cms data
	export let data;
	const { header, footer } = data;

	import '../app.css';
</script>

<Navbar {header} />
<MobileNavbar {header} />
<Sidebar />

<slot />
<Footer {footer} />
