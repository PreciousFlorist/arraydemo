<script>
	/*------------------------------
	# Props
	------------------------------*/
	export let image;
	export let alt;
	export let link;
	export let white = true;
	export let size = 'default';
</script>

<a
	href={link}
	class={`group cursor-pointer flex justify-center items-center w-full h-full relative overflow-hidden after:absolute after:h-full after:top-full after:bottom-0 after:right-0 after:left-0 after:transition-all after:duration-300 hover:after:top-0  ${
		white ? 'after:bg-whitesmoke' : 'after:bg-white'
	}`}
>
	<!-- Social Media Icon & Hover States -->
	<img
		src={image}
		{alt}
		class="transition-all duration-300 relative z-10 grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0"
		style={`width: ${size === 'large' ? '32px' : '17px'}`}
	/>
</a>
