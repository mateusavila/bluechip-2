<script lang="ts" setup>
import { Clip } from "./images"
import { ref } from "vue"
import * as yup from "yup"
import { Field, Form, ErrorMessage } from "vee-validate"
import Loading from "./Loading.vue"
import Result from './Result.vue'

const schema = yup.object({
  email: yup.string().required().email(),
  message: yup.string().required(),
  fullname: yup.string().required(),
})

const loading = ref<boolean>(false)
const title = ref<string>('Success!')
const text = ref<string>('Your message as been sent.')
const status = ref<boolean>(false)
const close = () => status.value = false

const onSubmit = (values: any, { resetForm }: any) => {
  loading.value = true
  const fileInput = document.getElementById("file") as HTMLInputElement
  if (fileInput && fileInput.files) {
    const file = fileInput.files[0]
    const body = new FormData()
    body.append("file", file)
    for (const [key, value] of Object.entries(values)) {
      body.append(key, value as any)
    }

    fetch(`/services/join_the_team.json`, {
      method: "POST",
      mode: "cors",
      body: body,
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
}
</script>

<template>
  <div class="join-team">
    <Loading :is-join="true" :status="loading" />
    <Result :title="title" :text="text" @close="close" :status="status" theme="join" />
    <div class="container">
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="fields">
          <div class="field">
            <label for="fullname">Full-Name *</label>
            <Field
              v-slot="{ field, meta }"
              id="fullname"
              name="fullname"
              type="fullname"
              placeholder="Full name*"
              required="required"
              :validate-on-blur="true"
            >
              <input
                v-bind="field"
                :class="{ error: !meta.valid && meta.validated }"
              />
            </Field>
            <ErrorMessage name="fullname">
              <p class="field-error">Name is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label for="email">Email *</label>
            <Field
              v-slot="{ field, meta }"
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              required="required|email"
              :validate-on-blur="true"
            >
              <input
                v-bind="field"
                :class="{ error: !meta.valid && meta.validated }"
              />
            </Field>
            <ErrorMessage name="email">
              <p class="field-error">E-mail is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label for="message">Message *</label>
            <Field
              id="message"
              name="message"
              type="message"
              required="required"
              :validate-on-blur="true"
              as="textarea"
            ></Field>
            <ErrorMessage name="message">
              <p class="field-error">Message is required</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="buttons">
          <label for="file" class="button button-white">
            <span>
              <img :src="Clip" alt="" width="16" height="16" loading="lazy" />
              Attach Resume/CV
            </span>
            <input
              type="file"
              name="file"
              id="file"
              accept="application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </label>
          <button type="submit" class="button first">Submit</button>
        </div>
        <div class="message">
          <p>* Required fields</p>
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="sass">
.join-team
  position: relative
  background: var(--high-light)
  padding: 80px 0
  width: 100%
  .message
    text-align: right
    margin-top: 20px
    p
      margin: 0
      color: var(--primary-dark)
      font-size: 12px
  .container
    width: calc(100% - 40px)
    margin: 0 auto
    max-width: 814px
  input[type=file]
    display: none
</style>
