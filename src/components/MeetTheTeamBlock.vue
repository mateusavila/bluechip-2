<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { MeetTheTeam, MeetTheTeamStar } from './images'
import * as prismicH from "@prismicio/helpers"
import { useWindowScroll } from '@vueuse/core'
const props = defineProps<{
	title: any
	text: any
}>()
const { title, text } = toRefs(props)
const finalText = prismicH.asHTML(text.value)
const finalTitle = prismicH.asHTML(title.value)

const { y } = useWindowScroll()
watch(y, () => {
	const meetTheTeam = document.querySelector('#meet-the-team')!
	const offsetMeetTheTeam = meetTheTeam?.getBoundingClientRect().y!
	if (y.value > (offsetMeetTheTeam - 200)) {
		meetTheTeam.classList.add('active')
	}
})

</script>
<template>
	<div class="meet-the-team" id="meet-the-team">
		<div class="container">
			<div class="meet-the-team-image">
				<img :src="MeetTheTeam" alt="This is the team" width="476" height="476" loading="lazy">
			</div>
      <div class="meet-the-team-text">
        <img :src="MeetTheTeamStar" alt="" width="116" height="116" loading="lazy" class="meet-star meet-star-left">
        <div class="meet-the-team-info">
          
          <div class="meet-the-team-info-text" v-html="`${finalTitle}${finalText}`"></div>
        </div>
        <img :src="MeetTheTeamStar" alt="" width="116" height="116" loading="lazy" class="meet-star meet-star-right">
      </div>
    </div>
  </div>
</template>

<style lang="sass">
	.meet-the-team
		position: relative
		height: 858px
		display: block
		width: 100%
		float: left
		padding: 0 0 100px
		background: var(--high-light)
		&.active
			&:before, &:after, .container:before, .container:after
				animation: .4s 1 alternate revealOpacity .4s forwards
			.meet-the-team-image
				animation: .4s 1 alternate revealOpacity .6s forwards
			.meet-the-team-text
				h3, p
					animation: .8s 1 alternate revealAllY .75s forwards
			.meet-star-left
				animation: .8s 1 alternate revealAllY .9s forwards
			.meet-star-right
				animation: .8s 1 alternate revealAllY 1.2s forwards
		&:before, &:after
			content: ''
			position: absolute
			opacity: 0
		&:before
			background: var(--highlight-medium)
			height: 858px
			width: calc((100% - 1340px) / 2)
			z-index: 1
			top: 0
		&:after
			height: 466px
			top: 50%
			transform: translateY(-50%)
			width: calc((100% - 1340px) / 2)
			z-index: 2
			right: 0
			background: var(--primary-pure)
		.container
			max-width: 1340px
			width: calc(100% - 40px)
			display: flex
			margin: 0 auto
			height: 858px
			align-items: center
			justify-content: space-between
			position: relative
			&:before, &:after
				content: ''
				position: absolute
				opacity: 0
			&:before
				background: var(--highlight-medium)
				height: 858px
				top: 0
				width: 550px
				z-index: 1
				border-top-right-radius: 858px
				border-bottom-right-radius: 858px
			&:after
				height: 466px
				width: calc(100% - 200px)
				z-index: 2
				right: 0
				background: var(--primary-pure)
	.meet-the-team-image
		width: 476px
		position: relative
		z-index: 3
		opacity: 0
		img
			width: 100%
			height: auto
			display: block
	.meet-the-team-text
		width: calc(100% - 500px)
		position: relative
		display: flex
		justify-content: space-between
		grid-gap: 50px
		align-items: center
		z-index: 3
		h3, >>> h3
			font-size: 48px
			line-height: 58px
			margin: 0 0 30px
			opacity: 0
			color: var(--high-pure)
		p, >>> p
			font-size: 20px
			line-height: 200%
			opacity: 0
			color: var(--high-pure)
			margin: 0
			max-width: 605px
	.meet-star
		opacity: 0
		position: relative
	@media all and (max-width: 1400px)
		.meet-the-team
			&:before
				width: 200px
			&:after
				width: 200px
	@media all and (max-width: 1300px)
		.meet-the-team-text
			grid-gap: 20px
		.meet-star
			width: 80px
			height: auto
			display: block
	@media all and (max-width: 1200px)
		.meet-the-team-image
			width: 400px
		.meet-the-team-text
			width: calc(100% - 420px)
			grid-gap: 15px
			h3, >>> h3
				margin-bottom: 15px
				font-size: 38px
				line-height: 120%
			p, >>> p
				font-size: 16px
		.meet-the-team
			&:before
				width: 600px
				height: 750px
				top: 50px
				border-top-right-radius: 750px
				border-bottom-right-radius: 750px
			&:after
				height: 400px
			.container
				&:after
					height: 400px
				&:before
					display: none
	@media all and (max-width: 1000px)
		.meet-star-right
			display: none
	@media all and (max-width: 900px)
		.meet-star
			width: 50px
	@media all and (max-width: 850px)
		.meet-star-left
			position: absolute
			left: -45px
		.meet-the-team-image
			width: 300px
		.meet-the-team
			&:before
				height: 600px
				top: 130px
			&:after
				width: calc(100% - 20px)
				height: 300px
				border-top-left-radius: 300px
				border-bottom-left-radius: 300px
			.container
				&:after
					display: none
		.meet-the-team-text
			width: calc(100% - 320px)
			p, >>> p
				margin: 0
			h3, >>> h3
				margin-bottom: 10px
				font-size: 26px
	@media all and (max-width: 750px)
		.meet-star-left
			top: -25px
			left: 50%
			margin-left: -15px
		.meet-star-right
			display: block
			bottom: -25px
			left: 50%
			margin-left: -15px
			position: absolute
		.meet-the-team
			height: auto
			padding-bottom: 0
			&:before
				border-radius: 0
				height: 500px
			.container
				height: 100%
				padding: 50px 0
			&:before
				top: 0
				width: 100%
			&:after
				display: none
			.container
				flex-wrap: wrap
				align-content: flex-start
		.meet-the-team-image
			margin: 10px auto 30px
			width: 250px
		.meet-the-team-text
			max-width: 1300px
			width: 100%
			background: var(--primary-pure)
			padding: 50px 20px
			position: relative
			&:after, &:before
				content: ''
				position: absolute
				background: var(--primary-pure)
				width: 20px
				height: 100%
			&:before
				left: -20px
			&:after
				right: -20px
			p, >>> p
				max-width: 100%
</style>
