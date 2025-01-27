import { useSupabaseClient } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return navigateTo('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  if (!profile || !profile.is_admin) {
    // If user is not an admin, redirect to home
    return navigateTo('/')
  }

  return
})
