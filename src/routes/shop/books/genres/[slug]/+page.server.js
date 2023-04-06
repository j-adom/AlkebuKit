import { client } from "$lib/sanity";
import { GROQ_BOOK_COUNT, GROQ_FEATURED_BOOKS, GROQ_BOOK_GENRE } from "$lib/queries";
export async function load({params, url}){
    const genre = params.slug
    const numBooks = 12;
    const p = url.searchParams.get('p') ? parseInt(url.searchParams.get('p')) : 1
    const bookStart = p ? (p - 1) * numBooks : 0;
    const sort = url.searchParams.get('sort') || 'title asc';
    const bookEnd = (p) * numBooks
    const bookSplice = '[' + bookStart + '...' + bookEnd + ']'
    const filter = `*[_type == 'genre' && slug.current == $genre][0]{
                        name,        
                        'books': *[_type =='book' 
                            && !(_id in path("drafts.**"))
                            && defaultBookVariant.price > 0
                            && references(^._id)
                            ]{
                                ...,
                                "images": defaultBookVariant.images[0].asset->url,
                                authors[]->{name, slug},
                                "binding": defaultBookVariant.binding,
                                "weight": defaultBookVariant.weight,
                                "height": defaultBookVariant.dimensions.height,
                                "length": defaultBookVariant.dimensions.length,
                                "width": defaultBookVariant.dimensions.width,
                                "publisher": defaultBookVariant.publisher->,
                                "price": defaultBookVariant.price,
                                "gRating": defaultBookVariant.gRating,
                                "inStock": defaultBookVariant.instock,
                                "images": defaultBookVariant.images[0].asset->url,
                                "pageCount": defaultBookVariant.pagecount,
                                "ISBN": defaultBookvariant.isbn,
                                "printDate": defaultBookVariant.publishedDate,
                                "stockDate": _createdAt,
                                ...} | order(${sort}) ${bookSplice} ,
                        ${GROQ_BOOK_GENRE},
                        'bookCount': count(*[_type =='book'     
                                                    && !(_id in path("drafts.**"))
                                                    && defaultBookVariant.price > 0
                                                    && references(^._id)
                                                ]),
                        ${GROQ_FEATURED_BOOKS}
                    }`
    const books = await client.fetch(filter, {genre})
    if (books) {
        return { 
                books
            }
    }

    return {
        status: 500,
        body: new Error('No result from Sanity')
    }
}