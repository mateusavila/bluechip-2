<script setup lang="ts">
  import { Loading } from './images';
  defineProps<{
    status: boolean
    isNewsletter?: boolean
    isJoin?: boolean
  }>()
</script>

<template>
  <div class="loading" :class="{active: status, 'is-newsletter': isNewsletter, 'is-join': isJoin}">
    <img :src="Loading" alt="loading page" width="200" height="200" loading="lazy">
  </div>
</template>

<style lang="sass">
  .loading
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    display: flex
    justify-content: center
    align-items: center
    opacity: 0
    visibility: hidden
    z-index: 100
    transition: all .2s ease-in-out
    &.is-join
      background: var(--high-light)
    &.is-newsletter
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 105%
      height: 105%
      border-radius: 10px
    &.active
      opacity: 1
      visibility: visible
      transition: all .2s ease-in-out
    img
      max-width: 150px
      height: auto
      display: block
</style>