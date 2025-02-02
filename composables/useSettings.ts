import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export interface Settings {
  id: string
  sitename: string
  description: string | null
  logo_url: string | null
  logo_width: number | null
  logo_height: number | null
  facebook: string | null
  twitter: string | null
  google_analytics: string | null
  created_at: string
  updated_at: string
}

export const useSettings = () => {
  const supabase = useSupabaseClient()
  const settings = ref<Settings | null>(null)
  const loading = ref(false)

  const getPublicUrl = (path: string) => {
    if (!path) return null
    
    // If the path is already a full URL, return it as is
    if (path.startsWith('http')) {
      return path
    }

    // If path contains the bucket path, clean it
    const cleanPath = path.includes('public/') 
      ? path.split('public/').pop() 
      : path

    if (!cleanPath) return null

    const { data } = supabase.storage
      .from('public')
      .getPublicUrl(cleanPath)

    return data.publicUrl
  }

  const fetchSettings = async () => {
    try {
      loading.value = true
      console.log('Fetching settings...')
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error) {
        // Check if it's a "no rows returned" error
        if ((error as any).code === 'PGRST116') {
          // No settings exist, create default row
          const { data: newSettings, error: insertError } = await supabase
            .from('settings')
            .insert({
              sitename: 'Xpost.mn'
            })
            .select()
            .single()

          if (insertError) throw insertError
          settings.value = newSettings
        } else {
          throw error
        }
      } else {
        settings.value = data
      }
    } catch (err) {
      console.error('Error in fetchSettings:', err)
      // Initialize with default settings if there's an error
      settings.value = settings.value || {
        sitename: 'Xpost.mn',
        description: null,
        logo_url: null,
        logo_width: null,
        logo_height: null,
        facebook: null,
        twitter: null,
        google_analytics: null
      } as Settings
    } finally {
      loading.value = false
    }
  }

  const updateSettings = async (newSettings: Partial<Settings>) => {
    if (!settings.value?.id) {
      console.error('No settings ID found')
      return
    }

    try {
      // Only include editable fields
      const updateData = {
        sitename: newSettings.sitename ?? settings.value.sitename,
        description: newSettings.description ?? settings.value.description,
        logo_url: newSettings.logo_url ?? settings.value.logo_url,
        logo_width: newSettings.logo_width ?? settings.value.logo_width,
        logo_height: newSettings.logo_height ?? settings.value.logo_height,
        facebook: newSettings.facebook ?? settings.value.facebook,
        twitter: newSettings.twitter ?? settings.value.twitter,
        google_analytics: newSettings.google_analytics ?? settings.value.google_analytics
      }

      const { data, error } = await supabase
        .from('settings')
        .update(updateData)
        .eq('id', settings.value.id)
        .select()
        .single()

      if (error) throw error
      settings.value = data
      return data
    } catch (err) {
      console.error('Error updating settings:', err)
      throw err
    }
  }

  const subscribeToSettings = () => {
    console.log('Subscribing to settings changes...')
    const channel = supabase
      .channel('settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'settings'
        },
        async (payload) => {
          console.log('Settings changed:', payload)
          if (payload.new) {
            settings.value = payload.new as Settings
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      console.log('Unsubscribing from settings...')
      supabase.removeChannel(channel)
    }
  }

  return {
    settings,
    loading,
    fetchSettings,
    updateSettings,
    subscribeToSettings,
    getPublicUrl
  }
}
