import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  const { data: { session }, error } = await supabase.auth.getSession()

  if (!session) {
    return navigateTo('/auth/login')
  }

  // Here you can add additional checks for admin role if needed
  return
})
