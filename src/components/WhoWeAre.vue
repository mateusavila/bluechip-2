<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useWindowScroll } from '@vueuse/core'
import { WhoWeAreStar, WhoWeArePeople } from './images'
import * as prismicH from "@prismicio/helpers"
const props = defineProps<{
	text: any
}>()
const { y } = useWindowScroll()
const { text } = toRefs(props)
const finalText = prismicH.asHTML(text.value)

watch(y, () => {
	const whoWeAre = document.querySelector('#who-we-are')!
	const offsetClient = whoWeAre?.getBoundingClientRect().y!
	if (y.value > (offsetClient - 90)) {
		whoWeAre.classList.add('active')
	}
})
</script>

<template>
	<div class="who-we-are" id="who-we-are">
		<div class="container">
			<div class="who-we-are-image">
				<div class="who-we-are-image-img">
					<img :src="WhoWeAreStar" alt="" width="188" height="188" loading="lazy" class="who-we-are-star">
					<img :src="WhoWeArePeople" alt="" width="513" height="513" loading="lazy" class="who-we-are-people">
				</div>
				<h2>Who <br>We Are</h2>
			</div>
			<div class="who-we-are-text" v-html="finalText"></div>
			<div class="yellow-graphism"></div>
		</div>
	</div>
</template>
<style lang="sass">
	.who-we-are
		padding: 134px 0 600px
		position: relative
		display: block
		width: 100%
		float: left
		&.active
			.who-we-are-text
				animation: .8s 1 alternate revealAllY .75s forwards
			.who-we-are-image
				animation: .8s 1 alternate revealAllY .6s forwards
			&:before, .yellow-graphism
				animation: .2s 1 alternate revealOpacity .4s forwards
		&:before
			content: ''
			width: 50%
			opacity: 0
			position: absolute
			z-index: 0
			background: var(--highlight-medium)
			top: 550px
			height: 180px
			left: 0
			transform: translateX(-50%)
		.yellow-graphism
			width: calc(100% - 600px)
			position: absolute
			z-index: 0
			opacity: 0
			background: var(--highlight-medium)
			border-top-right-radius: 180px
			border-bottom-right-radius: 180px
			top: 550px
			height: 180px
			left: 50%
			transform: translateX(-50%)
		.container
			max-width: 1443px
			width: calc(100% - 40px)
			margin: 0 auto
			display: flex
			align-items: flex-end
			justify-content: space-between
	.who-we-are-image
		max-width: 810px
		width: 100%
		position: relative
		opacity: 0
		z-index: 2
		h2
			font-size: 300px
			margin: 0
			display: inline-block
			font-family: var(--humane)
			line-height: 250px
			text-transform: uppercase
			color: var(--primary-pure)
			position: absolute
			right: 0
			top: 50px
			z-index: 2
	.who-we-are-star
		position: absolute
		top: -75px
		z-index: 2
		left: 300px
	.who-we-are-people
		position: relative
		z-index: 1
	.who-we-are-text
		width: calc(100% - 860px)
		position: relative
		z-index: 2
		opacity: 0
		>>> p, p
			color: var(--primary-dark)
			font-size: 20px
			line-height: 200%
			margin: 30px 0 0
	@media all and (max-width: 1350px)
		.who-we-are-star
			width: 145px
			height: 145px
			left: 260px
		.who-we-are
			&:before
				width: 60%
				top: 400px
			.container
				align-items: flex-start
			.yellow-graphism
				top: 400px
		.who-we-are-people
			width: 400px
			height: auto
			display: block
		.who-we-are-text
			width: calc(100% - 700px)
		.who-we-are-image
			width: 650px
			h2
				line-height: 80%
				font-size: 230px
	@media all and (max-width: 1200px)
		.who-we-are
			padding-bottom: 400px
		.who-we-are-image
			width: 600px
		.who-we-are-text
			width: calc(100% - 650px)
	@media all and (max-width: 1024px)
		.who-we-are
			&:before
				width: 600px
			.container
				flex-wrap: wrap
			.yellow-graphism
				width: 600px
				left: 400px
		.who-we-are-text
			width: 100%
			margin-top: 30px
			p, >>> p
				font-size: 16px
	@media all and (max-width: 1000px)
		.who-we-are
			padding-bottom: 300px
	@media all and (max-width: 720px)
		.who-we-are-people
			width: 250px
			height: 250px
		.who-we-are-star
			width: 80px
			height: 80px
			left: 200px
			top: -40px
		.who-we-are-image
			width: 100%
			justify-content: flex-start
			h2
				font-size: 150px
				right: auto
				left: 225px
		.who-we-are
			&:before
				top: 300px
				height: 120px
			.yellow-graphism
				top: 300px
				width: 35%
				left: 380px
				height: 120px
	@media all and (max-width: 600px)
		.who-we-are
			padding-bottom: 200px
	@media all and (max-width: 500px)
		.who-we-are
			padding-top: 80px
			&:before
				width: 700px
				border-top-right-radius: 120px
				border-bottom-right-radius: 120px
			.yellow-graphism
				display: none
			.container
				width: calc(100% - 28px)
		.who-we-are-image
			h2
				font-size: 120px
				left: 180px
	@media all and (max-width: 400px)
		.who-we-are
			&:before
				top: 210px
				width: 600px
		.who-we-are-people
			width: 190px
			height: 190px
		.who-we-are-star
			left: 140px
		.who-we-are-image
			h2
				left: 140px
				font-size: 110px
</style>
