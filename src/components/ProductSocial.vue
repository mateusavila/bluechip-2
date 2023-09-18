
<script setup lang="ts">
import { toRefs } from 'vue'
import type { URLInterface } from '../lib/types'
import { Facebook, Instagram, Cart } from './images'
const props = defineProps<{
  facebook: URLInterface
  instagram: URLInterface
  cart: URLInterface
}>()
const { facebook, instagram, cart } = toRefs(props)

</script>
<template>
  <div class="product-social">
    <a :href="facebook.url" target="_blank" rel="noopener noreferrer">
      <img :src="Facebook" alt="" width="40" height="40" loading="lazy">
    </a>
    <a :href="instagram.url" target="_blank" rel="noopener noreferrer">
      <img :src="Instagram" alt="" width="40" height="40" loading="lazy">
    </a>
    <a :href="cart.url" target="_blank" rel="noopener noreferrer">
      <img :src="Cart" alt="" width="40" height="40" loading="lazy">
    </a>
  </div>
</template>

<style lang="sass">
	.product-social
		width: 228px
		display: flex
		justify-content: space-between
		align-items: center
		a
			text-decoration: none
			cursor: pointer
			transition: all .2s ease-in-out
			position: relative
			&:hover
				transition: all .2s ease-in-out
				transform: translateY(-5px)
	@media all and (max-width: 1024px)
		.product-social
			width: 180px
</style>
