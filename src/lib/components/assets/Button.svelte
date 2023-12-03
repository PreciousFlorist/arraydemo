<script>
	export let text = '';
	export let onClick = () => {};
	export let invert = false;
	export let href = '#';
	export let reverseArrow = false;

	// Define invert-specific class bindings
	const invertClasses = {
		true: {
			textClass: 'stroke-egyptianblue group-hover:stroke-white',
			hoverTextClass: 'group-hover:text-white',
			bgClass: 'after:bg-egyptianblue border-egyptianblue text-egyptianblue'
		},
		false: {
			textClass: 'stroke-white group-hover:stroke-egyptianblue',
			hoverTextClass: 'group-hover:text-egyptianblue',
			bgClass: 'after:bg-white border-white text-white'
		}
	};

	// Get the classes based on the invert prop
	const selectedInvert = invertClasses[invert];
</script>

<a
	{href}
	on:click|preventDefault={onClick}
	class={`group w-fit border uppercase rounded-full py-11px px-22px tracking-1px  relative flex items-center gap-2.5 after:z-[1] after:absolute after:rounded-full after:-left-1px after:-bottom-1px after:w-[calc(100%+2px)] after:h-1px after:opacity-0 after:transition-all after:duration-200 hover:after:h-49px hover:after:opacity-100 ${selectedInvert.bgClass}`}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="19.599"
		height="15.444"
		viewBox="0 0 19.599 15.444"
		class={`z-[2] ${reverseArrow ? 'rotate-180' : ''}`}
	>
		<g id="Group_1013" data-name="Group 1013" transform="translate(0 -3.429)">
			<path
				id="Path_14"
				data-name="Path 14"
				d="M735.886-140.74h18.281"
				transform="translate(-735.886 151.891)"
				fill="none"
				stroke-width="1"
				class={`transition-all duration-200 ${selectedInvert.textClass}`}
			/>
			<path
				id="Path_15"
				data-name="Path 15"
				d="M0,7.368,7.368,0l7.369,7.368"
				transform="translate(18.892 3.783) rotate(90)"
				fill="none"
				stroke-width="1"
				class={`transition-all duration-200 ${selectedInvert.textClass}`}
			/>
		</g>
	</svg>

	<p class={`transition-all duration-200 z-[2] ${selectedInvert.hoverTextClass}`}>
		{text}
	</p>
</a>
