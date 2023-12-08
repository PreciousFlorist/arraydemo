/*------------------------------------------------------------
# Applies a fade-in animation to a DOM element using Intersection Observer.

// The index value allows us to stop iterating over lists after the first value
// The delay value allows us to offset the class transition of list elements

// Start by importing file and adding `use:fade` to target element
// Use styles from `src/styles/resets/transitions.css`
------------------------------------------------------------*/

export function fade(node, { index = null, delay = 0, onlyFirst = false } = {}) {
	// If 'onlyFirst' is true, apply animation only to the first item (index 0) in a list
	if (onlyFirst && index !== 0) {
		return;
	}

	// Initialize Intersection Observer to watch visibility of the element
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						// Apply fade-in classes with potential delay
						// These classes override arbitrary opacity and translate values
						node.classList.add('!opacity-100');
						node.classList.add('!translate-x-0');
						node.classList.add('!translate-y-0');
					}, delay);
				}
			});
		},
        // Only trigger once the element has fully entered the screen
		{ rootMargin: '-10% 0px -5% 0px' }
	);

	observer.observe(node); 

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
