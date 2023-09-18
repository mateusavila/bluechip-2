<script setup lang="ts">
import { toRefs } from 'vue'
import type { ClientsMainInterface } from '../lib/types'
import { HeaderStar, Inc5000Badge, Star1, Star2, Star3, Star4 } from './images'
import Clients from './Clients.vue'
const props = defineProps<{
	clients: ClientsMainInterface[]
}>()
const { clients } = toRefs(props)

</script>
<template>
	<div class="intro" id="intro">
		<div class="container">
			<div class="intro-title">
				<img :src="HeaderStar" alt="" width="81" height="81" loading="lazy" class="intro-title-star">
				<h2>BLUECHIP</h2>
				<div class="intro-title-info">
					<img :src="Inc5000Badge" alt="" width="361" height="115" loading="lazy" class="intro-badge">
					<nav class="navigation-scroll">
						<a href="#who-we-are" class="button button-1" aria-label="Go to session Who We Are">WHO WE ARE</a>
						<a href="#brands" class="button button-2" aria-label="Go to session Brands">BRANDS</a>
						<a href="#where-to-find" class="button button-3" aria-label="Go to session Where to find">WHERE TO FIND</a>
					</nav>
				</div>
			</div>
			<div class="intro-images">
				<img :src="Star1" alt="" width="240" height="240" loading="lazy" class="intro-images-1">
				<img :src="Star2" alt="" width="240" height="240" loading="lazy" class="intro-images-2">
				<div class="intro-images-3">
					<img :src="Star4" alt="" width="156" height="156" loading="lazy">
				</div>
				<img :src="Star3" alt="" width="240" height="240" loading="lazy" class="intro-images-4">
			</div>
			<div class="intro-graphism"></div>
			<Clients :clients="clients" />
		</div>
	</div>
</template>

<style lang="sass">
	.intro
		position: relative
		height: 1080px
		overflow: hidden
		display: block
		float: left
		width: 100%
		background: var(--high-light)
		&:after
			content: ''
			position: absolute
			z-index: 1
			height: 406px
			width: 50%
			opacity: 0
			background: var(--highlight-medium)
			bottom: 360px
			right: 0
			animation: .6s 1 alternate revealOpacity .2s forwards
		&-graphism
			position: absolute
			z-index: 1
			height: 406px
			width: calc(100% - 200px)
			background: var(--highlight-medium)
			border-top-left-radius: 400px
			border-bottom-left-radius: 400px
			bottom: 360px
			right: 0
			opacity: 0
			animation: .6s 1 alternate revealOpacity .2s forwards
		.container
			margin: 0 auto
			display: flex
			flex-wrap: wrap
			justify-content: space-between
			height: 100%
			padding: 120px 0 80px
			max-width: 1400px
			width: calc(100% - 80px)
			position: relative
		h2
			font-weight: normal
			font-family: var(--humane)
			font-size: 600px
			line-height: 422px
			opacity: 0
			text-transform: uppercase
			margin: 0
			position: relative
			z-index: 2
			animation: .8s 1 alternate revealAllY .6s forwards
			color: var(--primary-pure)
	.navigation-scroll
		position: relative
		display: flex
		grid-gap: 10px
		opacity: 0
		animation: .8s 1 alternate revealAllY .4s forwards
	.intro-title
		position: relative
		display: flex
		justify-content: space-between
		flex-wrap: wrap
		width: calc(100% - 500px)
	.intro-title-info
		width: 100%
		display: flex
		justify-content: space-between
		position: absolute
		z-index: 3
		align-items: flex-end
		top: 420px
	.intro-title-star
		position: absolute
		z-index: 3
		top: -90px
		left: -50px
		animation: .8s 1 alternate revealAllY .2s forwards
	.intro-images
		position: absolute
		width: 500px
		height: 500px
		right: -40px
		z-index: 2
		margin-top: 80px
		display: flex
		flex-wrap: wrap
		justify-content: space-between
		grid-gap: 10px
		&:after
			content: ''
			position: absolute
			width: 614px
			height: 240px
			transform: rotate(-45deg)
			background: var(--high-dark)
			top: 132px
			right: -54px
			border-radius: 250px
		&-1, &-2, &-3, &-4
			z-index: 2
			width: 240px
			height: 240px
			position: relative
			opacity: 0
		&-1
			animation: .8s 1 alternate revealAllXNegative forwards
		&-3
			animation: .8s 1 alternate revealAllXNegative .2s forwards
		&-2
			animation: .8s 1 alternate revealAllX forwards
		&-4
			animation: .8s 1 alternate revealAllX .2s forwards
		&-3
			display: flex
			align-items: center
			justify-content: center
	.intro-badge
		opacity: 0
		animation: .8s 1 alternate revealAllY .6s forwards
	@media all and (max-width: 1600px)
		.intro
			h2
				font-size: clamp(320px, calc(20rem + ((1vw - 9.5px) * 43.0769)), 600px)
				line-height: .8
		.intro-images
			right: 0
		.intro-title-info
			max-width: 800px
		.intro-title-star
			left: -30px
	@media all and (max-width: 1400px)
		.intro-images
			width: 400px
			height: 400px
			right: 0
			&:after
				height: 190px
				right: -45px
				width: 500px
				top: 110px
		.intro-images-1, .intro-images-2, .intro-images-3, .intro-images-4
			width: 190px
			height: 190px
		.intro-badge
			max-width: 280px
			display: block
			height: auto
		.intro-images-3
			img
				max-width: 120px
				height: auto
				display: block
		.intro-title-star
			top: -70px
	@media all and (max-width: 1300px)
		.intro-title
			width: 100%
		.intro-images
			margin-top: 60px
	@media all and (max-width: 1150px)
		.intro-graphism
			height: 300px
			bottom: 470px
		.intro
			&:after
				bottom: 470px
				right: 0
				width: 50px
				height: 300px
		.intro-images
			width: 300px
			height: 300px
			right: 0
			&:after
				height: 140px
				right: -32px
				width: 360px
				top: 78px
		.intro-images-1, .intro-images-2, .intro-images-3, .intro-images-4
			width: 140px
			height: 140px
		.intro-images-3
			img
				max-width: 100px
		.intro-title-info
			max-width: 100%
			top: 350px
	@media all and (max-width: 900px)
		.intro-title-info
			top: 300px
		.intro
			.container
				width: calc(100% - 40px)
			h2
				font-size: clamp(190px, calc(11.875rem + ((1vw - 5px) * 32.5)), 320px)
		.intro-title-star
			max-width: 55px
			display: block
			height: auto
			top: -35px
			left: -15px
		.intro-images
			width: 250px
			height: 250px
			right: 5px
			margin-top: 20px
			&:after
				height: 120px
				right: -26px
				width: 300px
				top: 63px
		.intro-images-1, .intro-images-2, .intro-images-3, .intro-images-4
			width: 120px
			height: 120px
		.intro-images-3
			img
				max-width: 70px
		.intro-badge
			max-width: 240px
	@media all and (max-width: 720px)
		.intro-graphism
			height: 250px
			bottom: 400px
		.intro
			min-height: 900px
			height: 900px
			padding-bottom: 0
			.container
				padding-bottom: 0
			&:after
				bottom: 400px
				right: 0
				width: 50px
				height: 250px
			.container
				padding-top: 80px
		.intro-badge
			position: absolute
			top: -100px
			left: 0
		.intro-title-info
			justify-content: center
		.intro-images
			width: 180px
			height: 180px
			right: 0
			margin-top: 20px
			&:after
				height: 85px
				right: -20px
				width: 220px
				top: 49px
		.intro-images-1, .intro-images-2, .intro-images-3, .intro-images-4
			width: 85px
			height: 85px
		.intro-images-3
			img
				max-width: 50px
	@media all and (max-width: 500px)
		.intro-title-info
			top: 250px
		.intro-title-star
			max-width: 30px
			top: -15px
			left: -5px
		.intro-images
			width: 110px
			height: 110px
			right: 0
			margin-top: 60px
			&:after
				height: 50px
				right: -12px
				width: 135px
				top: 31px
		.intro-images-1, .intro-images-2, .intro-images-3, .intro-images-4
			width: 50px
			height: 50px
		.intro-images-3
			img
				max-width: 40px
		.intro-badge
			max-width: 200px
			top: -100px
		.intro-graphism
			height: 220px
			bottom: 550px
			width: 280px
		.intro
			&:after
				bottom: 550px
				right: 0
				width: 50px
				height: 220px
			.container
				width: calc(100% - 28px)
			h2
				font-size: clamp(130px, calc(8.125rem + ((1vw - 3.2px) * 33.3333)), 190px)
		.navigation-scroll
			flex-wrap: wrap
			grid-gap: 5px
			.button
				width: 100%
				font-size: 14px
</style>
