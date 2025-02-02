import { defineNuxtPlugin, useSupabaseClient } from '#imports'
import type { NuxtApp } from '#app'

export interface StorageOptions {
  bucket?: string
  path?: string
  visibility?: 'public' | 'private'
  cacheControl?: string
  upsert?: boolean
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const supabase = useSupabaseClient()
  const defaultBucket = 'xpost-files'

  return {
    provide: {
      storage: {
        /**
         * Upload a file to Supabase Storage
         * @param file File to upload
         * @param path Path where the file will be stored
         * @param options Upload options
         * @returns Upload result with file URL
         */
        async uploadFile(file: File, path: string, options: StorageOptions = {}) {
          try {
            const {
              bucket = defaultBucket,
              visibility = 'public',
              cacheControl = '3600',
              upsert = false
            } = options

            // Upload file
            const { data, error: uploadError } = await supabase.storage
              .from(bucket)
              .upload(path, file, {
                cacheControl,
                upsert,
              })

            if (uploadError) {
              console.error('File upload error:', uploadError)
              throw new Error(`Failed to upload file: ${uploadError.message}`)
            }

            // Get public URL
            const { data: urlData } = supabase.storage
              .from(bucket)
              .getPublicUrl(path)

            return { data, publicUrl: urlData.publicUrl }
          } catch (error) {
            console.error('Storage upload error:', error)
            throw error
          }
        },

        /**
         * Get a signed URL for private files or public URL for public files
         * @param path File path
         * @param options Options for URL generation
         * @returns URL to access the file
         */
        async getFileUrl(path: string, options: StorageOptions & { expiresIn?: number } = {}) {
          try {
            const {
              bucket = defaultBucket,
              expiresIn = 3600 // 1 hour
            } = options

            // Try to get public URL first
            const { data: { publicUrl } } = supabase.storage
              .from(bucket)
              .getPublicUrl(path)

            if (publicUrl) return { url: publicUrl }

            // If not public, get signed URL
            const { data, error } = await supabase.storage
              .from(bucket)
              .createSignedUrl(path, expiresIn)

            if (error) throw error
            return data
          } catch (error) {
            console.error('Storage getFileUrl error:', error)
            throw error
          }
        },

        /**
         * Delete a file from storage
         * @param path File path
         * @param options Delete options
         */
        async deleteFile(path: string, options: StorageOptions = {}) {
          try {
            const { bucket = defaultBucket } = options

            const { error } = await supabase.storage
              .from(bucket)
              .remove([path])

            if (error) throw error
          } catch (error) {
            console.error('Storage delete error:', error)
            throw error
          }
        },

        /**
         * List all files in a bucket/folder
         * @param options List options
         * @returns List of files
         */
        async listFiles(options: StorageOptions & { 
          limit?: number,
          offset?: number,
          sortBy?: { column: string, order: 'asc' | 'desc' }
        } = {}) {
          try {
            const {
              bucket = defaultBucket,
              path = '',
              limit,
              offset,
              sortBy
            } = options

            const { data, error } = await supabase.storage
              .from(bucket)
              .list(path, {
                limit,
                offset,
                sortBy: sortBy ? sortBy : undefined
              })

            if (error) throw error
            return data
          } catch (error) {
            console.error('Storage list error:', error)
            throw error
          }
        },

        /**
         * Move/Copy a file to a new location
         * @param fromPath Source path
         * @param toPath Destination path
         * @param options Move options
         */
        async moveFile(fromPath: string, toPath: string, options: StorageOptions & { copy?: boolean } = {}) {
          try {
            const {
              bucket = defaultBucket,
              copy = false
            } = options

            const { error } = await supabase.storage
              .from(bucket)
              [copy ? 'copy' : 'move'](fromPath, toPath)

            if (error) throw error
          } catch (error) {
            console.error('Storage move/copy error:', error)
            throw error
          }
        },

        /**
         * Get metadata about a file
         * @param path File path
         * @param options Options
         * @returns File metadata
         */
        async getFileMetadata(path: string, options: StorageOptions = {}) {
          try {
            const { bucket = defaultBucket } = options

            // List the specific file to get its metadata
            const { data, error } = await supabase.storage
              .from(bucket)
              .list('', {
                limit: 1,
                offset: 0,
                search: path
              })

            if (error) throw error
            return data[0]
          } catch (error) {
            console.error('Storage metadata error:', error)
            throw error
          }
        },

        /**
         * Update file metadata (where possible)
         * @param path File path
         * @param metadata New metadata
         * @param options Update options
         */
        async updateFileMetadata(path: string, metadata: { cacheControl?: string }, options: StorageOptions = {}) {
          try {
            const { bucket = defaultBucket } = options

            // Create a minimal file for metadata update
            const blob = new Blob([''], { type: 'text/plain' });
            const dummyFile = new File([blob], 'metadata.txt', { type: 'text/plain' });

            const { error } = await supabase.storage
              .from(bucket)
              .update(path, dummyFile, { 
                ...metadata,
                upsert: false 
              })

            if (error) throw error
          } catch (error) {
            console.error('Storage metadata update error:', error)
            throw error
          }
        }
      }
    }
  }
})
