export async function load({ fetch }) {
	const contactResponse = await fetch('/sample-data/components/contact.json');
	const contactData = await contactResponse.json();

	const newsResponse = await fetch('/sample-data/components/news.json');
	const newsData = await newsResponse.json();

	const ctaResponse = await fetch('/sample-data/components/cta.json');
	const ctaData = await ctaResponse.json();

	const accordionResponse = await fetch('/sample-data/components/accordion.json');
	const accordionData = await accordionResponse.json();

	return {
		contact: contactData,
		news: newsData,
		cta: ctaData,
		accordion: accordionData
	};
}
