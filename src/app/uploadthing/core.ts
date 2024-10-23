import {createUploadthing, type FileRouter} from 'uploadthing/next'

import {api} from '~/trpc/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({image: {maxFileSize: '16MB', maxFileCount: 1}})
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await api.user.getCurrentUser()

      // If you throw, the user will not be able to upload
      // TODO: add roles
      if (!user?.id) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user.id}
    })
    .onUploadComplete(async ({metadata, file}) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {uploadedBy: metadata.userId}
    }),

  galleryImagesUploader: f({image: {maxFileSize: '16MB', maxFileCount: 6}})
    .middleware(async () => {
      // This code runs on your server before upload
      // TODO: add roles
      const user = await api.user.getCurrentUser()

      // If you throw, the user will not be able to upload
      if (!user?.id) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user.id}
    })
    .onUploadComplete(async ({metadata, file}) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {uploadedBy: metadata.userId}
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
