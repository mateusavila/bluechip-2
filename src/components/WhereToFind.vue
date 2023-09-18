<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { toRefs, watch } from 'vue';
import type { ListMainInterface } from '../lib/types'
const props = defineProps<{
	list: ListMainInterface[]
}>()
const { list } = toRefs(props)

const returnFormat = (format: string) => {
	if (format === 'bottom right angle') {
		return 'form-1'
	}
	if (format === 'top line') {
		return 'form-2'
	}
	if (format === 'rounded') {
		return 'form-3'
	}
	if (format === 'top left angle') {
		return 'form-4'
	}
	if (format === 'right line') {
		return 'form-5'
	}
}

const applyDelayAnimation = (factor: number = 0.5) => {
	list.value.forEach((_item, index) => {
		const itemElement = document.querySelector<HTMLElement>(`#where-to-find-list .animated:nth-child(${index + 1})`)!
		itemElement.style.cssText = `
			animation-duration: .6s;
			animation-fill-mode: forwards;
			animation-iteration-count: 1;
			animation-direction: alternate;
			animation-name: revealAllY;
			animation-delay: ${index * factor}s
		`
	});
}

const { y } = useWindowScroll()
watch(y, () => {
	const whereTheTeam = document.querySelector('#where-to-find')!
	const offsetwhereTheTeam = whereTheTeam?.getBoundingClientRect().y!

	// bugfix to get the correct height
	const brandsMaster = document.querySelector('#brands-master')?.clientHeight!
	const meetTheTeam = document.querySelector('#meet-the-team')?.clientHeight!
	const whoWeAre = document.querySelector('#who-we-are')?.clientHeight!
	const intro = document.querySelector('#intro')?.clientHeight!

	const listPlaces = [brandsMaster, meetTheTeam, whoWeAre, intro].reduce((prev, acc) => prev + acc, 0)
	if (y.value > (offsetwhereTheTeam - 100)) {
		whereTheTeam.classList.add('active')
	}
	if (y.value > listPlaces) {
		whereTheTeam.classList.add('active')
		applyDelayAnimation(0.35)
	}
})
</script>
<template>
	<div class="where-to-find" id="where-to-find">
		<div class="container">
			<h2>Where to find</h2>
			<div class="where-to-find-list" id="where-to-find-list">
				<div 
					:key="index"
					v-for="{ format, place: { url, alt, dimensions: { width, height } } }, index in list"
					:class="`animated where-to-find-item ${returnFormat(format)}`">
					<img :src="url" :alt="alt" :width="width" :height="height" loading="lazy" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
	.where-to-find
		display: block
		width: 100%
		float: left
		position: relative
		padding: 0 0 150px
		background: var(--high-light)
		&.active
			h2
				animation: .8s 1 alternate revealAllY .75s forwards
			&:after, .container:after
				animation: .4s 1 alternate revealOpacity .4s forwards
		&:after
			content: ''
			position: absolute
			top: 200px
			height: 140px
			right: 0
			z-index: 1
			opacity: 0
			width: calc((100% - 1340px) / 2)
			background: var(--warning-light)
		.container
			max-width: 1422px
			width: calc(100% - 40px)
			margin: 0 auto
			position: relative
			&:after
				content: ''
				position: absolute
				top: 200px
				opacity: 0
				height: 140px
				right: 0
				z-index: 1
				width: 550px
				border-top-left-radius: 140px
				border-bottom-left-radius: 140px
				background: var(--warning-light)
		h2
			text-transform: uppercase
			font-family: var(--humane)
			text-align: right
			font-size: 300px
			opacity: 0
			margin: 0
			position: relative
			z-index: 2
			color: var(--primary-pure)
	.where-to-find-list
		display: grid
		margin: 100px 0 0
		grid-template-columns: repeat(3, 1fr)
		grid-gap: 42px
		.where-to-find-item
			background: var(--high-pure)
			display: flex
			opacity: 0
			align-items: center
			justify-content: center
			width: 450px
			height: 450px
			&.form-1
				border-top-left-radius: 100%
				border-bottom-left-radius: 100%
				border-top-right-radius: 100%
			&.form-2
				border-bottom-right-radius: 100%
				border-bottom-left-radius: 100%
			&.form-3
				border-radius: 100%
			&.form-4
				border-bottom-left-radius: 100%
				border-bottom-right-radius: 100%
				border-top-right-radius: 100%
			&.form-5
				border-bottom-left-radius: 100%
				border-top-left-radius: 100%
			img
				max-width: 240px
				width: 90%
				max-height: 150px
				height: auto
				object-fit: contain
				display: block
	@media all and (max-width: 1450px)
		.where-to-find-list
			width: 100%
			.where-to-find-item
				width: 100%
				height: 0
				padding-bottom: 100%
				display: block
				position: relative
				img
					max-width: 80%
					height: auto
					position: absolute
					top: 50%
					left: 50%
					transform: translate(-50%, -50%)
	@media all and (max-width: 1200px)
		.where-to-find
			&:after
				top: 80px
				width: 100px
			.container
				&:after
					top: 80px
			h2
				font-size: 200px
				line-height: 83%
	@media all and (max-width: 1000px)
		.where-to-find-list
			grid-template-columns: repeat(2, 1fr)
	@media all and (max-width: 850px)
		.where-to-find-list
			grid-gap: 20px
		.where-to-find
			padding-top: 50px
			&:after
				top: 90px
				height: 80px
				width: 300px
				border-top-left-radius: 80px
				border-bottom-left-radius: 80px
			.container
				&:after
					display: none
			h2
				font-size: 120px
	@media all and (max-width: 600px)
		.where-to-find-list
			grid-template-columns: 100%
				
</style>
