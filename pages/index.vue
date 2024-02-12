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

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo('/notes')
    }
  })
})
</script>

<template>
  <div>
    <form
        @submit.prevent="() => (isSignUp ? signUp() : login())"
        class="flex flex-col gap-2"
    >
        <input 
            type="email"
            placeholder="Email"
            v-model="email"
            class="p-2 bg-gray-600 rounded text-white"
        >
        <input 
            type="password"
            placeholder="Password"
            v-model="password"
            class="p-2 bg-gray-600 rounded text-white"
        >
        <input 
          type="text"
          placeholder="First name"
          v-model="firstName"
          class="p-2 bg-gray-600 rounded text-white"
        >
        <input 
          type="text"
          placeholder="Last name"
          v-model="lastName"
          class="p-2 bg-gray-600 rounded text-white"
        >
        <button type="submit" class="p-2 text-white bg-green-500 rounded">
            <span v-if="isSignUp">Sign up</span>
            <span v-else>Log in</span>
        </button>
    </form>
    <button
        @click="isSignUp = !isSignUp"
        class="w-full mt-8 text-sm text-center underline text-slate-300"
    >
        <span v-if="isSignUp">Have an account? Login instead</span>
        <span v-else>Create a new account</span>
    </button>
  </div>
</template>

<style>

</style>