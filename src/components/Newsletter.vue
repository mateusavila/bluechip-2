<script lang="ts" setup>
import { ref } from "vue"
import * as yup from "yup"
import { Field, Form } from "vee-validate"
import Loading from "./Loading.vue"
import ResultNewsletter from "./ResultNewsletter.vue"
const loading = ref<boolean>(false)
const schema = yup.object({
  email: yup.string().required().email(),
})

const title = ref<string>('POOF! - Welcome to the cool kids club.')
const status = ref<boolean>(false)
const onSubmit = (values: any, { resetForm }: any) => {
  loading.value = true
  
  fetch(`/services/newsletter.json`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(() => {
      loading.value = false
      status.value = true
      resetForm()
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="newsletter">
    <Loading :status="loading" :is-newsletter="true" />
    <ResultNewsletter :title="title" :status="status" />
    <Form @submit="onSubmit" :validation-schema="schema">
      <Field
        v-slot="{ field, meta }"
        id="email"
        :name="`email`"
        type="email"
        placeholder="E-mail"
        required="required|email"
        :validate-on-blur="true"
      >
        <input
          v-bind="field"
          placeholder="E-mail"
          :class="{ error: !meta.valid && meta.validated }"
        />
      </Field>
      <button type="submit" class="button">Submit</button>
    </Form>
  </div>
</template>

<style lang="sass">
.newsletter
  width: 100%
  position: relative
  form
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
  input
    height: 54px
    border-radius: 16px
    background: var(--high-pure)
    border: 2px solid var(--warning-pure)
    font-family: var(--fira)
    padding: 0 20px
    font-size: 16px
    width: calc(100% - 120px)
    transition: all .2s ease-in-out
    &.error
      background: var(--warning-dark)
      color: var(--high-pure)
      transition: all .2s ease-in-out
@media all and (max-width: 500px)
  .newsletter
    form
      display: block
    input
      width: 100%
    .button
      margin: 10px auto 0
</style>
