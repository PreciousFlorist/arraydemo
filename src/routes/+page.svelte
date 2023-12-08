<script>
	/*------------------------------
	# Imports
	------------------------------*/
	import { onMount } from 'svelte';
	import { preloadImages } from '$lib/utils/preloadImages';

	import Hero from '$lib/components/blocks/Hero.svelte';
	import ContactModal from '$lib/components/blocks/ContactModal.svelte';
	import NewsGrid from '$lib/components/blocks/NewsGrid.svelte';
	import CallToAction from '$lib/components/blocks/CallToAction.svelte';
	import Accordion from '$lib/components/blocks/Accordion.svelte';
	import Slider from '$lib/components/blocks/Slider.svelte';

	/*------------------------------
	# Fetch and Destructure Data
	------------------------------*/
	export let data;
	const { hero, contact, news, cta, accordion, slider } = data;

	/*------------------------------
    # Lifecycle Hooks
    ------------------------------*/
	// Preload Images for Accordion
	onMount(() => {
		let accordionImages = extractAccordionImageUrls(accordion);
		let ctaImages = extractCtaImageUrls(cta);
		let newsImages = extractNewsGridImageUrls(news);
		let sliderImages = extractSliderImageUrls(slider);
		let contactModalImages = extractContactModalImageUrls(contact);
		preloadImages([
			...accordionImages,
			...ctaImages,
			...newsImages,
			...sliderImages,
			...contactModalImages
		]);
	});

	/*------------------------------
    # Helper Functions
    ------------------------------*/
	function extractAccordionImageUrls(accordionData) {
		let panels = accordionData.panels || [];
		return panels.flatMap(
			(panel) =>
				panel.caseStudy
					?.filter((study) => study.imageSrc !== undefined)
					.map((study) => study.imageSrc) || []
		);
	}

	function extractCtaImageUrls(ctaData) {
		let photos = ctaData.instagramImages || [];
		let background = ctaData.backgroundImages || {};
		let photoUrls = photos.map((photo) => photo.imageURL);
		let backgroundUrls = [background.primary, background.secondary].filter((url) => url);
		return [...photoUrls, ...backgroundUrls];
	}

	function extractNewsGridImageUrls(newsData) {
		let cards = newsData.cards || [];
		return cards.map((card) => card.background).filter((url) => url);
	}

	function extractSliderImageUrls(sliderData) {
		let slides = sliderData.slides || [];
		return slides.map((slide) => slide.background).filter((url) => url);
	}

	function extractContactModalImageUrls(contactData) {
		let slides = contactData.form.slides || [];
		return slides.map((slide) => slide.backgroundImage).filter((url) => url);
	}
</script>

<Hero {hero} />
<ContactModal {contact} />
<Accordion {accordion} />
<Slider {slider} />
<NewsGrid {news} />
<CallToAction {cta} />
