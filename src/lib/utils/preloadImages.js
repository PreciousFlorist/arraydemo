export function preloadImages(urls) {
	return Promise.all(
		urls.map((url) => {
			return new Promise((resolve, reject) => {
				let img = new Image(); // Creates a new Image object
				img.onload = resolve; // Resolves the promise when the image is successfully loaded
				img.onerror = reject; // Rejects the promise if the image fails to load
				img.src = url; // Sets the source of the image which triggers the loading
			});
		})
	);
}
