<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import Hero from '$lib/components/blocks/Hero.svelte';
	import ContactModal from '$lib/components/blocks/ContactModal.svelte';
	import NewsGrid from '$lib/components/blocks/NewsGrid.svelte';
	import CallToAction from '$lib/components/blocks/CallToAction.svelte';
	import Accordion from '$lib/components/blocks/Accordion.svelte';

	/*------------------------------
	# Fetch and Destructure Data
	------------------------------*/
	export let data;
	const { hero, contact, news, cta, accordion } = data;
</script>

<Hero {hero} />
<ContactModal {contact} />
<Accordion {accordion} />
<NewsGrid {news} />
<CallToAction {cta} />
