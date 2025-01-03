<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const isSignUp = ref(false)
const client = useSupabaseClient()

const signUp = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  })
  console.log('user', data)
  console.log('error', error)
}

const login = async () => {
  const { user, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  console.log('user', user)
  console.log('error', error)
}

const a = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/notes')
    }
  })
})
</script>

<template>
  <section class="">
    <div class="flex">
      <div style="min-width: 50%">

      </div>
      <div>
        <img src="/img/cj-botha-flR7fkL9sLY-unsplash.jpg" alt="">
      </div>
    </div>
  </section>
</template>

<style>

</style>