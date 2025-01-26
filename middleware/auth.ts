import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  // Check for active session
  const { data: { session } } = await supabase.auth.getSession()

  // Define protected routes that require authentication
  const protectedRoutes = ['/admin', '/settings', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  const isAuthRoute = to.path.startsWith('/auth') || to.path === '/login'

  // Redirect /login to /auth/login for consistency
  if (to.path === '/login') {
    return navigateTo('/auth/login', { replace: true })
  }

  // If user is logged in and tries to access auth pages
  if (session && isAuthRoute) {
    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    // If admin, keep them in admin page
    if (profile?.is_admin) {
      return navigateTo('/admin', { replace: true })
    }
    // If not admin, send to home
    return navigateTo('/', { replace: true })
  }

  // If trying to access protected route without session
  if (isProtectedRoute && !session) {
    return navigateTo('/auth/login')
  }

  // For all other routes, continue normally
  return
})
