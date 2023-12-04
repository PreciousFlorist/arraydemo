<script>
	import ContactModal from '$lib/components/blocks/ContactModal.svelte';
	import NewsGrid from '$lib/components/blocks/NewsGrid.svelte';
	import CallToAction from '$lib/components/blocks/CallToAction.svelte';
	import Link from '$lib/components/assets/Link.svelte';
	import Button from '$lib/components/assets/Button.svelte';

	export let data;
	const { contact, news, cta } = data;
</script>

<ContactModal {contact} />

<div class="py-[200px] pl-[200px] bg-green-200 flex flex-col gap-10">
	<Link url="https://example.com" text="Meet the team" color="blue" />
	<Link url="https://example.com" text="Discover More" color="orange" />

	<Button
		text="Click Me"
		onClick={() => console.log('Button clicked')}
		invert={false}
		href="https://example.com"
	/>
	<Button
		text="Another Button"
		onClick={() => console.log('Another button clicked')}
		invert={true}
		href="https://example.com"
		reverseArrow={true}
	/>
</div>

<NewsGrid {news} />
<CallToAction {cta} />
