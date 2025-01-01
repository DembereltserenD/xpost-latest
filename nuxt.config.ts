// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      tinymceApiKey: process.env.TINYMCE_API_KEY,
    },
  },
  nitro: {
    preset: "node-server",
  },
  ssr: false,
  tailwindcss: {
    config: {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            primary: "#00DC82",
            "primary-dark": "#00C472",
          },
        },
      },
    },
  },
});
