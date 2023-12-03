export async function load({ fetch }) {
    const contactResponse = await fetch('/sample-data/components/contact.json');
    const contactData = await contactResponse.json();

    return {
        contact: contactData,
    };
}
