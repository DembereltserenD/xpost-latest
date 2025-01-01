/// <reference types="@nuxt/image" />
/// <reference types="@nuxtjs/i18n" />
/// <reference types="@nuxtjs/color-mode" />
/// <reference types="@nuxtjs/supabase" />

declare module '#app' {
  interface NuxtApp {
    $img: any;
    isHydrating: boolean;
    vueApp: any;
    payload: any;
    _asyncDataPromises: any;
  }

  export const useNuxtApp: () => NuxtApp;
}

export {}
