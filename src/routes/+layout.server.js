import { client } from '$lib/sanity';

export async function load() {
    const filter = '*[_type == "siteSettings"][0]'
    const projection = `{
        ...,
        'featuredBooks': *[_type == 'book' 
                                && defined(slug.current) 
                                && !(_id in path("drafts.**"))
                                && defaultBookVariant.price > 0
                                && defaultBookVariant.featured
                                ] {
                                    ...,
                                    "images": defaultBookVariant.images[0].asset->url,
                                    authors[]->{name, slug},
                                    "price": defaultBookVariant.price,
                                    "binding": defaultBookVariant.binding,
                                    } [0..10],										
        'newBooks': *[_type == 'book' 
                                && defined(slug.current) 
                                && !(_id in path("drafts.**"))
                                && defaultBookVariant.price > 0
                                ] {
                                    ...,
                                    "images": defaultBookVariant.images[0].asset->url,
                                    authors[]->{name, slug},
                                    "price": defaultBookVariant.price,
                                    "binding": defaultBookVariant.binding,
                                    } | order(_createdAt desc) [0..10]
    }`
    const settings = await client.fetch(filter+projection)
    const featured = settings.featuredBooks
    const newBooks = settings.newBooks
    if (settings) {
        return {
            settings,
            featured,
            newBooks
        }
    }
}



export const prerender = true;