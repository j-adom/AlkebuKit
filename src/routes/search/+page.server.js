import { client } from "$lib/sanity";
    
export function load({ params, query }) {
    const searchQuery = query.q
    const filter = `*[_type == 'book' 
                        && defined(slug.current) 
                        && !(_id in path("drafts.**"))
                        && defaultBookVariant.price > 0
                        && defaultBookVariant.featured
                        ] {
                            "images": defaultBookVariant.images[0].asset->url,
                            authors[]->{name, slug},
                            "price": defaultBookVariant.price,
                            "binding": defaultBookVariant.binding,
                            ...
                            } | [0..20]`
    return client
        .fetch(filter)
        .then(res => {
                const featured = res
                return { featured };
        }).catch(err => this.error(500, err));