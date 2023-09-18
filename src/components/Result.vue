<script setup lang="ts">
  import { toRefs } from 'vue'
  const props = defineProps<{
    status: boolean
    title: string
    text: string
    theme: string
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const close = () => emit('close')
  const { title, status, text } = toRefs(props)
</script>

<template>
  <div class="result" :class="[{active: status}, theme]">
    <h3>{{title}}</h3>
    <p>{{text}}</p>
    <div class="result-action">
      <button @click="close" class="button button-2">close</button>
    </div>
  </div>
</template>

<style lang="sass">
  .result
    position: absolute
    top: 0
    left: 0
    background: #fff
    display: flex
    align-content: center
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    visibility: hidden
    padding: 20px
    opacity: 0
    transition: all .2s ease-in-out
    flex-wrap: wrap
    &.join
      background: var(--high-light)
    &.active
      visibility: visible
      opacity: 1
      transition: all .2s ease-in-out
    h3, p
      width: 100%
      text-align: center
    h3
      margin: 0 0 20px
      font-size: clamp(40px, calc(2.5rem + ((1vw - 3.2px) * 5.6818)), 80px)
      color: var(--primary-medium)
      font-family: var(--humane)
      text-transform: uppercase
    p
      margin: 0
      font-size: clamp(14px, calc(0.875rem + ((1vw - 3.2px) * 0.8523)), 20px)
      color: var(--low-medium)
  .result-action
    margin-top: 40px
    display: flex
    justify-content: center

</style>