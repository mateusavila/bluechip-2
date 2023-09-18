<script lang="ts" setup>
import * as yup from 'yup'
import { Field, Form, ErrorMessage } from 'vee-validate'
import Loading from './Loading.vue'
import Result from './Result.vue'
import { ref } from 'vue'

const loading = ref<boolean>(false)
const title = ref<string>('Success!')
const text = ref<string>('Your message as been sent.')
const status = ref<boolean>(false)
const close = () => status.value = false

const schema = yup.object({
  email: yup.string().required().email(),
  message: yup.string(),
  lastname: yup.string().required(), 
  name: yup.string().required(),
  company: yup.string(),
  subject: yup.string(),
})

const onSubmit = (values: any, {resetForm}: any) => {
  loading.value = true
  fetch(`/services/contact_form.json`, {
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
      text.value = "Your message as been sent."
      title.value = "Success!"
      resetForm()

    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="contact-team">
    <Loading :status="loading" />
    <Result :title="title" :text="text" @close="close" :status="status" theme="contact" />
    <div class="container">
      <Form 
        @submit="onSubmit"
        :validation-schema="schema"
        >
        <div class="fields">
          <div class="field half">
            <label for="name">Name *</label>
            <Field v-slot="{field, meta}" id="name" name="name" type="name"
              placeholder="Name*" required="required" :validate-on-blur="true">
              <input v-bind="field" :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage name="name">
              <p class="field-error">Name is required</p>
            </ErrorMessage>
          </div>
          <div class="field half">
            <label for="lastname">Last Name *</label>
            <Field v-slot="{field, meta}" id="lastname" name="lastname" type="lastname" placeholder="Last name*" required="required" :validate-on-blur="true">
              <input v-bind="field" :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage name="lastname">
              <p class="field-error">Last Name is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="fields">
          <div class="field half">
            <label for="email">Email *</label>
            <Field v-slot="{field, meta}" id="email" name="email" type="email" placeholder="E-mail" required="required|email" :validate-on-blur="true">
              <input v-bind="field" :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage name="email">
              <p class="field-error">E-mail is required</p>
            </ErrorMessage>
          </div>
          <div class="field half">
            <label for="company">Company</label>
            <Field v-slot="{field, meta}" id="company" name="company" type="text" placeholder="Company">
              <input v-bind="field" :class="{ error: !meta.valid && meta.validated }">
            </Field>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label for="subject">Subject</label>
            <Field v-slot="{field, meta}" id="subject" name="subject" type="subject" placeholder="Subject" :validate-on-blur="true">
              <input v-bind="field" :class="{ error: !meta.valid && meta.validated }">
            </Field>
            <ErrorMessage name="subject">
              <p class="field-error">Subject is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label for="message">Message</label>
            <Field id="message" name="message" type="message" required="required" :validate-on-blur="true" as="textarea"></Field>
            <ErrorMessage name="message">
              <p class="field-error">Message is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="buttons">
          <p>* Required fields</p>
          <button type="submit" class="button">Submit</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="sass">
  .contact-team
    position: relative
    background: var(--high-pure)
    padding: 120px 0
    width: 100%
    .button
      p
        margin: 0
        color: var(--primary-dark)
        font-size: 12px
    .container 
      width: calc(100% - 40px)
      margin: 0 auto
      max-width: 814px
</style>