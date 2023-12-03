export async function load({ fetch }) {
    const headerResponse = await fetch('/sample-data/navigation/header.json');
    const headerData = await headerResponse.json();

    // Add fetching logic for the footer as well
    const footerResponse = await fetch('/sample-data/navigation/footer.json');
    const footerData = await footerResponse.json();

    return {
        header: headerData,
        footer: footerData
    };
}
