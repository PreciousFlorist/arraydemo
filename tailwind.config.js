module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['primary-pattern', 'secondary-pattern'],
	theme: {
		fontFamily: {
			sans: ['"Source Sans 3"', 'sans-serif'],
			serif: ['SpeziaSerif', 'serif']
		},

		extend: {
			colors: {
				coral: '#f78559',
				silver: '#CCCCCC',
				whitesmoke: '#F7F7F7',
				onyx: '#414042',
				egyptianblue: '#2c3a9f',
				sandybrown: '#f59e50',
				jet: '#333333',
				arraygray: '#777777'
			},
			backgroundImage: {
				'primary-pattern': "url('/images/navigation/what-we-do/background.jpeg')",
				'secondary-pattern': "url('/images/navigation/company/background.jpg')"
			},
			letterSpacing: {
				'1px': '1px'
			},
			gap: {
				'15px': '15px'
			},
			fontSize: {
				'22px': '22px'
			},
			maxWidth: {
				'180px': '180px'
			},
			minWidth: {
				'320px': '320px'
			},
			width: {
				'17px': '17px',
				'500px': '500px'
			},
			spacing: {
				'1px': '1px',
				'3px': '3px',
				'11px': '11px',
				'15px': '15px',
				'22px': '22px',
				'25px': '25px',
				'43px': '43px',
				'49px': '49px',
				'77px': '77px',
				'100px': '100px',
				'200px': '200px',
				'340px': '340px'
			},
			screens: {
				500: '500px',
				580: '580px',
				730: '730px',
				800: '800px',
				950: '950px',
				1100: '1100px',
				1200: '1200px',
				1400: '1400px'
			}
		}
	},
	plugins: []
};
