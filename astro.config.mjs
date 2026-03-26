// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://beabzk.dev',
	server: {
		port: 4444,
	},
	image: {
    responsiveStyles: true,
    layout: 'constrained',
  	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Serif',
			cssVariable: '--font-atkinson',
			weights: [400, 500, 600, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
		},
		{
			provider: fontProviders.local(),
			name: 'Atkinson Hyperlegible Mono',
			cssVariable: '--font-atkinson-mono',
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/AtkinsonHyperlegibleMono-VariableFont_wght.ttf'],
						weight: '100 900',
						style: 'normal',
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
