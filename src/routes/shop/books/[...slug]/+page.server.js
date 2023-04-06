import { client } from "$lib/sanity";
export async function load({params}){
  const [ slug, bookID ] = params.slug.split('/')
  const filter = '*[_type == "book" && _id == $bookID][0]';
  const projection = `{

    _id,
    title,
    subtitle,
    authors[]->{
      ...,
      name,
      "otherTitles": *[_type == "book" 
              && !(_id in path("drafts.**"))
              && defaultBookVariant.price > 0 
              && references(^._id)
      ]{
          ...,
          _id,
          title,
          "images": defaultBookVariant.images[0].asset->url,
          "binding": defaultBookVariant.binding,
          authors[]->{name, slug},
          "price": defaultBookVariant.price,
          "gRating": defaultBookVariant.gRating
      }| order(title)
    },
    collection[]->{title,slug},
    genre[]->{name,slug},
    description,
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
    tags,
    slug
  }`;
  console.log(params);
  const query = filter + projection;
  const book = await client
    .fetch(query, { bookID })
  if (book) {
    return {
        book
      }
    }

}

