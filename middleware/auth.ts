import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // Check for active session
  const { data: { session } } = await supabase.auth.getSession()

  // If user is not logged in and trying to access admin
  if (!session && to.path.startsWith('/admin')) {
    return navigateTo('/auth/login')
  }

  // If user is logged in and trying to access auth pages
  if (session && to.path.startsWith('/auth')) {
    return navigateTo('/admin')
  }
})
