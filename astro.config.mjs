import { defineConfig } from 'astro/config'

// https://astro.build/config
import vue from "@astrojs/vue"
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	integrations: [vue()],
	adapter: vercel(),
})