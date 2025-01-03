// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['radix-vue/nuxt', '@nuxt/ui', '@nuxtjs/supabase'],
  // css: ['~/assets/css/main.css'],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  supabase: {
    redirectOptions: {
      login: '/'
    }
  },
  // tailwindcss: {
  //   cssPath: '~/assets/css/tailwind.css',
  //   configPath: 'tailwind.config',
  //   exposeConfig: false,
  //   exposeLevel: 2,
  //   config: {},
  //   injectPosition: 'first',
  //   viewer: true,
  // }
})
