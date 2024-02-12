<template>
  <div>
    <p class="mt-8 mb-16">Hello {{ JSON.parse(dataUser?.first_name)._rawValue }} 🎉</p>
    <button @click="signOut()">Sign Out</button>
    <h1 class="text-3xl font-semibold">Your notes</h1>
    <div class="flex flex-col gap-4 mt-4">
      <div v-for="note in notes" :key="note.id" class="p-8 bg-gray-700 rounded">
        {{ note.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})
const user = useSupabaseUser()
const client = useSupabaseClient()
const signOut = async () => {
  const { error } = await client.auth.signOut()
}

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/')
    }
  })
})
const { data: notes } = await useFetch('/api/notes', {
  key: `notes for ${user.value.id}`,
  headers: useRequestHeaders(['cookie'])
})

const { data: dataUser } = await useFetch('/api/user', {
  key: `info for ${user.value.id}`
})

</script>

<style>

</style>