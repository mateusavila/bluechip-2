<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import type { ClientsMainInterface } from '../lib/types'
import { AsSeenAs } from './images'
const { y } = useWindowScroll()

const props = defineProps<{
  clients: ClientsMainInterface[]
}>()

const { clients } = toRefs(props)
const totalClients = clients.value.length

watch(y, () => {
  const clients = document.querySelector('#clients')!
  const offsetClient = clients?.getBoundingClientRect().y!
  if (y.value > (offsetClient - 120)) {
    clients.classList.add('active')
  }
})

</script>
<template>
  <div class="clients" id="clients">
    <div class="clients-as-seen-as">
      <img :src="AsSeenAs" alt="" class="as-seen-as" width="205" height="85" loading="lazy">
      <p>As Seen As</p>
    </div>
    <div class="clients-list-area">
      <div class="clients-list">
        <div class="clients-item" :key="index"
          v-for="{ client: {url, alt, dimensions: { width, height }}}, index in clients">
          <img :src="url" :alt="alt" class="clients-item-image" :width="width"
            :height="height" loading="lazy" />
        </div>
        <div class="clients-item" :key="index"
          v-for="{ client: {url, alt, dimensions: { width, height }}}, index in clients">
          <img :src="url" :alt="alt" class="clients-item-image" :width="width"
            :height="height" loading="lazy" />
        </div>
        <div class="clients-item" :key="index"
          v-for="{ client: {url, alt, dimensions: { width, height }}}, index in clients">
          <img :src="url" :alt="alt" class="clients-item-image" :width="width"
            :height="height" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @keyframes marqueeAnimationMobile
    0%
      transform: translateX(0)
    100%
      transform: translateX(calc(((v-bind('totalClients') * 220px) + (v-bind('totalClients') * 60px)) * -1))
  .clients
    width: 100%
    height: 180px
    display: flex
    align-items: center
    flex-wrap: wrap
    justify-content: space-between
    margin-top: 200px
    position: relative
    opacity: 0
    transform: translateY(50px)
    &.active
      transition: all .5s ease-in-out
      opacity: 1
      transform: translateY(0)
  .clients-as-seen-as
    position: absolute
    left: 0
    top: 50% 
    z-index: 3
    width: 205px
    height: 86px
    transform: translateY(-50%)
    .as-seen-as
      position: absolute
      z-index: 2
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    p
      color: #fff
      position: absolute
      z-index: 3
      margin: 0
      top: 50%
      left: 50%
      white-space: nowrap
      transform: translate(-50%, -50%)
  .clients-list-area
    background: #fff
    width: calc(100% - 105px)
    overflow: hidden
    margin-left: 105px
    position: relative
    z-index: 1
    border-top-right-radius: 109px
    border-bottom-right-radius: 109px
    &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: #EE7B36
      mix-blend-mode: lighten
      border-radius: 0px 109px 109px 0px
  .clients-list
    display: flex
    position: relative
    height: 180px
    align-items: center
    grid-gap: 60px
    flex-flow: row nowrap
    animation: marqueeAnimationMobile 14s linear infinite
    .clients-item
      display: flex
      align-items: center
      justify-content: center
      width: 300px
      img
        max-width: 220px
        max-height: 70px
        object-fit: contain
  @media all and (max-width: 1150px)
    .clients
      margin-top: 80px
  @media all and (max-width: 720px)
    .clients-as-seen-as
      top: -50px
      transform: none
      width: 170px
      img
        width: 100%
        display: block
      p
        font-size: 14px
    .clients-list-area
      margin: 0
      width: 100%
      border-radius: 0
    .clients
      margin: 0
      position: absolute
      bottom: 100px
</style>
