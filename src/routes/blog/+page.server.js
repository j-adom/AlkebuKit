import {client} from '$lib/sanity';
export function load({ params, url }) {
    const numBooks = 12;
    const p = url.searchParams.get('p') || 1
    const bookStart = p ? (p - 1) * numBooks : 0;
    const sort = url.sort ? url.sort : '(publishedAt desc)';
    const bookEnd = (p) * numBooks
    const bookSplice = '[' + bookStart + '...' + bookEnd + ']'
    const filter = `{
                        'posts': *[_type == 'post' 
                                    && defined(slug.current) 
                                    && !(_id in path("drafts.**"))
                                    ] {
                                        ...,
                                        "mainImage": mainImage.asset->url,
                                        "author": authors[0].author->
                                    } | order${sort} ${bookSplice}
                    }`
    const posts =  client.fetch(filter, {bookSplice})
    if(posts) {
        return {
            posts
        }
    }
    
}
