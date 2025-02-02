import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useUser = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return {
    user,
    signOut
  }
}
