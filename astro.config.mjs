// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://beabzk.dev',
	vite: { plugins: [tailwindcss()] },
	markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
	server: {
		port: 4444,
	},
	image: {
		responsiveStyles: true,
		layout: 'constrained',
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'JetBrains Mono',
			cssVariable: '--font-site-mono',
			options: {
				variants: [
					{
							src: ['./src/assets/fonts/JetBrainsMono-VariableFont_wght.ttf'],
							weight: '100 800',
							style: 'normal',
					},
						{
							src: ['./src/assets/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf'],
							weight: '100 800',
							style: 'italic',
						},
				],
			},
		},
	],
	integrations: [
		mdx(),
		sitemap(),
		icon({
			include: {
				   mdi: ['linkedin', 'email', 'account', 'calendar', 'weather-sunny', 'weather-night', 'arrow-left', 'star-outline', 'open-in-new', 'briefcase-outline', 'map-marker-outline', 'lightning-bolt-outline'],
				   'simple-icons': ['github'],
			},
		}),
	],
});
