import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
const projectId = "nrl6nc45"
const dataset = "production"

export const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2023-01-14',
  useCdn: true
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}
