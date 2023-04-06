import { client } from "$lib/sanity";
import { GROQ_BOOK_COUNT, GROQ_FEATURED_BOOKS, GROQ_BOOK_GENRE } from "$lib/queries";
export async function load({url}){
    const numBooks = 12;
    const p = url.searchParams.get('p') ? parseInt(url.searchParams.get('p')) : 1
    const bookStart = p ? (p - 1) * numBooks : 0;
    const sort = url.searchParams.get('sort') || 'title asc';
    const bookEnd = (p) * numBooks
    const bookSplice = '[' + bookStart + '...' + bookEnd + ']'
    const filter = `{
                        'books': *[_type == 'book' 
                                    && defined(slug.current) 
                                    && !(_id in path("drafts.**"))
                                    && defaultBookVariant.price > 0
                                    ] {
                                        ...,
                                        "images": defaultBookVariant.images[0].asset->url,
                                        authors[]->{name, slug},
                                        "price": defaultBookVariant.price,
                                        "binding": defaultBookVariant.binding,
                                        ...} | order(${sort}) ${bookSplice} ,
                        ${GROQ_BOOK_GENRE},
                        ${GROQ_BOOK_COUNT},
                        ${GROQ_FEATURED_BOOKS}
                    }`
    const bks = await client.fetch(filter)
    if (bks) {
        return { 
                bks
            }
    }
    
        
    return {
        status: 500,
        body: new Error('No result from Sanity')
    }
}