// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        { charset: 'utf-8' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    },
    pageTransition: false,
    layoutTransition: false,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase",
  ],

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      domain: '',
      path: '/',
      sameSite: 'lax'
    },
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  },

  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
    dataValue: "theme",
    storageKey: "nuxt-color-mode",
    classPrefix: "",
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'mn',
    detectBrowserLanguage: false,
    langDir: 'locales',
    locales: [
      {
        code: 'mn',
        name: 'Монгол',
        file: 'mn.json'
      }
    ]
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      tinymceApiKey: process.env.TINYMCE_API_KEY,
    },
  },

  nitro: {
    preset: "node-server",
  },

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

  compatibilityDate: "2025-01-22",
});