<script setup lang="ts">
  import { toRefs } from 'vue'
  const props = defineProps<{
    status: boolean
    title: string
  }>()

  const { title, status } = toRefs(props)
</script>

<template>
  <div class="result-newsletter" :class="{active: status}">
    <h3>{{title}}</h3>
  </div>
</template>

<style lang="sass">
  .result-newsletter
    position: absolute
    top: 0
    left: 0
    display: flex
    background: var(--primary-pure)
    align-content: center
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    visibility: hidden
    opacity: 0
    transition: all .2s ease-in-out
    flex-wrap: wrap
    z-index: 20
    &.active
      visibility: visible
      opacity: 1
      transition: all .2s ease-in-out
    h3
      width: 100%
      text-align: center
      margin: 0
      font-size: clamp(14px, calc(0.875rem + ((1vw - 3.2px) * 0.8523)), 20px)
      color: var(--high-pure)
      font-family: var(--fira)
</style>