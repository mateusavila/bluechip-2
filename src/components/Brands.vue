<script setup lang="ts">
import { toRefs, watch } from 'vue'
import type { BrandsMainInterface } from '../lib/types'
import { BrandsLeaf, BrandsPeople1, BrandsPeople2 } from './images'
import * as prismicH from "@prismicio/helpers"
import ProductSocial from './ProductSocial.vue'
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll()

const props = defineProps<{
	brands: BrandsMainInterface[]
}>()

const { brands } = toRefs(props)
watch(y, () => {
	const brandsMaster = document.querySelector('#brands-master')!
	const brandsContent = document.querySelectorAll('#brands-content .animated')!
	const offsetBrandsMaster = brandsMaster?.getBoundingClientRect().y!
	if (y.value > (offsetBrandsMaster - 80)) {
		brandsMaster.classList.add('active')
	}
	brandsContent.forEach(element => {
		if (y.value > (element.getBoundingClientRect().y! - 90)) {
			element.classList.add('active')
		}
	});

})
</script>

<template>
<div class="brands" id="brands-master">
	<div class="container">
		<div class="brands-title">
			<img :src="BrandsPeople1" alt="" width="274" height="274" loading="lazy" class="brands-people-1"  id="brands">
			<img :src="BrandsLeaf" alt="" width="120" height="120" loading="lazy" class="brands-leaf">
			<img :src="BrandsPeople2" alt="" width="344" height="344" loading="lazy" class="brands-people-2">
			<h2>Brands</h2>
		</div>
		<div class="brands-content" id="brands-content">
			<div 
				v-for="{ brand_image_product, brand_image_decorator, brand_image_title, facebook, instagram, cart, brand_text }, index in brands"
				:class="`animated brands-content-item ${index === brands.length ? 'last' : ''} ${index % 2 !== 0 ? 'invert' : ''}`">
				<div class="brands-content-item-image">
					<img :src="brand_image_decorator.url" :alt="brand_image_decorator.alt" :width="brand_image_decorator.dimensions.width"  :height="brand_image_decorator.dimensions.height" loading="lazy" :class="`brands-decorate-image brands-decorate-image-${index % 2 === 0 ? 'left' : 'right'}`" />
					<img :src="brand_image_product.url" :alt="brand_image_product.alt" :width="brand_image_product.dimensions.width" :height="brand_image_product.dimensions.height" loading="lazy" class="brands-product-image" />
				</div>
				<div class="brands-content-item-text">
					<img :src="brand_image_title.url" :alt="brand_image_title.alt" :width="brand_image_title.dimensions.width" :height="brand_image_title.dimensions.height" loading="lazy" class="brands-content-item-title" />
					<div v-html="prismicH.asHTML(brand_text)">

					</div>
					<ProductSocial 
						:facebook="facebook"
						:instagram="instagram"
						:cart="cart"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<style lang="sass">
	.brands
		position: relative
		display: block
		width: 100%
		float: left
		background: var(--high-light)
		&.active
			&:after, .brands-title:after
				animation: .2s 1 alternate revealOpacity .4s forwards
			.brands-title
				opacity: 1
				transition: all .8s ease-in-out
				h2
					animation: .8s 1 alternate revealAllY .6s forwards
			.brands-people-1
				animation: .8s 1 alternate revealAllY .7s forwards
			.brands-people-2
				animation: .8s 1 alternate revealAllY .8s forwards
			.brands-leaf
				animation: .8s 1 alternate revealAllY .9s forwards
			.brands-content
				animation: .8s 1 alternate revealAllY .6s forwards
		&:after
			content: ''
			top: -200px
			width: 50%
			position: absolute
			z-index: 1
			opacity: 0
			height: 368px
			background: var(--primary-pure)
			right: 0
		.container 
			width: calc(100% - 40px)
			max-width: 1100px
			margin: 0 auto
	.brands-title
		position: relative
		z-index: 2
		opacity: 0
		&:after
			content: ''
			opacity: 0
			top: -200px
			width: calc(100% - 200px)
			position: absolute
			z-index: 1
			height: 368px
			background: var(--primary-pure)
			border-top-left-radius: 368px
			border-bottom-left-radius: 368px
			right: 0
		h2
			color: var(--high-pure)
			position: relative
			z-index: 2
			font-size: 300px
			opacity: 0
			text-align: center
			margin: 0
			line-height: 1px
			font-family: var(--humane)
			text-transform: uppercase
	.brands-people-1, .brands-people-2, .brands-leaf
		position: absolute
		z-index: 2
		opacity: 0
	.brands-people-1
		top: -420px
		left: 510px
	.brands-leaf
		top: -267px
		left: 800px
	.brands-people-2
		left: 800px
		top: -120px
	.brands-content
		margin-top: 400px
		padding-bottom: 100px
		opacity: 0
		position: relative
	.brands-content-item
		margin: 100px 0 150px
		display: flex
		justify-content: space-between
		flex-wrap: wrap
		opacity: 0
		&.active
			animation: .8s 1 alternate revealAllY .5s forwards
			.brands-content-item-image
				animation: .8s 1 alternate revealAllY .8s forwards
			.brands-content-item-text
				animation: .8s 1 alternate revealAllY 1.2s forwards
		&.last
			margin-bottom: 0
		&.invert
			.brands-content-item-image
				order: 2
			.brands-content-item-text
				order: 1
	.brands-content-item-image
		max-width: 473px
		position: relative
		opacity: 0
		.brands-product-image
			width: 100%
			display: block
			height: auto
	.brands-content-item-text
		width: calc(100% - 550px)
		opacity: 0
		p, >>> p
			color: var(--primary-pure)
			font-size: 20px
			line-height: 200%
			margin: 30px 0
		.brands-content-item-title
			max-width: 400px
			width: 100%
			height: auto
			display: block
	.brands-decorate-image
		position: absolute
		top: -55px
		max-width: 55px
		max-height: 55px
	.brands-decorate-image-left
		right: -55px
	.brands-decorate-image-right
		left: -55px
	@media all and (max-width: 1200px)
		.brands
			&:after
				height: 300px
				top: -160px
		.brands-content
			padding-bottom: 50px
		.brands-title
			&:after
				height: 300px
				top: -160px
			h2
				font-size: 200px
				text-align: right
				padding-right: 300px
		.brands-people-1
			width: 200px
			height: auto
			right: 300px
			top: -300px
			left: auto
		.brands-leaf
			top: -200px
			right: 180px
			left: auto
			width: 100px
			height: auto
		.brands-people-2
			left: auto
			right: 0
			top: -80px
			width: 280px
			height: auto
		.brands-content-item-image
			width: 380px
		.brands-content-item-text
			width: calc(100% - 420px)
	@media all and (max-width: 1024px)
		.brands-content-item-text
			p, >>> p
				font-size: 16px
		.brands-content
			margin-top: 250px
	@media all and (max-width: 1000px)
		.brands
			&:after
				height: 250px
				top: -130px
		.brands-title
			&:after
				height: 250px
				top: -130px
			h2
				font-size: 150px
				text-align: right
				padding-right: 220px
		.brands-people-1
			width: 150px
			right: 220px
			top: -230px
		.brands-leaf
			top: -150px
			right: 130px
			width: 70px
		.brands-people-2
			left: auto
			right: 0
			top: -60px
			width: 200px
	@media all and (max-width: 900px)
		.brands-content-item.invert
			.brands-content-item-text
				order: 2
		.brands-content-item-text
			width: 100%
			margin-top: 20px
		.brands-content-item-image
			margin: 0 auto
			margin-bottom: 30px
	@media all and (max-width: 750px)
		.brands
			&:after
				height: 250px
				top: -130px
				width: 95%
				border-top-left-radius: 250px
				border-bottom-left-radius: 250px
		.brands-title
			&:after
				display: none
	@media all and (max-width: 600px)
		.brands
			&:after
				height: 140px
				top: -80px
				width: 98%
				border-top-left-radius: 140px
				border-bottom-left-radius: 140px
		.brands-title
			h2
				font-size: 100px
				text-align: right
				padding-right: 110px
		.brands-people-1
			width: 80px
			right: 110px
			top: -130px
		.brands-leaf
			top: -100px
			right: 50px
			width: 50px
		.brands-people-2
			left: auto
			right: 0
			top: -40px
			width: 100px
		.brands-content-item-image
			width: 280px
	@media all and (max-width: 400px)
		.brands-content-item-image
			width: 200px
		.brands-decorate-image-left
			width: 30px
			height: auto
			top: -30px
			right: -30px
		.brands-decorate-image-right
			width: 30px
			left: -30px
			top: -30px
			height: auto

</style>
