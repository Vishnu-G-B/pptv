import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	kit: {
		adapter: adapter(),
		vite: {
			build: {
				target: 'esnext',
			}
		}
	},
	preprocess: vitePreprocess()
};
export default config;