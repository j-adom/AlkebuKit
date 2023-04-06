import { client } from "$lib/sanity";

export function load({ params, url }) {
    const collection = params.slug
    const numBooks = 12;
    const p = parseInt(url.searchParams.get('p')) || 1
    const bookStart = p ? (p - 1) * numBooks : 0;
    const sort = url.searchParams.get('sort') ? url.searchParams.get('sort') : 'title asc';
    const bookEnd = (p) * numBooks
    const bookSplice = '[' + bookStart + '...' + bookEnd + ']' //Splice records to only return count of numBooks
    const filter = `*[_type == 'collection' && slug.current == $collection][0]{
                        title,
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
                        'bookCount': count(*[_type =='book'     
                                                && !(_id in path("drafts.**"))
                                                && defaultBookVariant.price > 0
                                                && references(^._id)
                                            ]),
                        'genres': *[_type == 'genre' && keyGenre == true]{name, slug}                            
                    }`
    const books= client.fetch(filter,{collection})
    if (books) {
        return {
            books
        }
    }}