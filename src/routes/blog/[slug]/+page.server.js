import {client} from "$lib/sanity";

export async function load({ params }) {
  // the `slug` parameter is available because
  // this file is called [slug].html
  const slug  = params.slug;
  const filter = '*[_type == "post" && slug.current == $slug][0]';
  const projection = `{
    ...,
    "author": authors[0].author->,
    body[]{
      ...,
      children[]{
        ...,
        _type == 'authorReference' => {
          _type,
          author->
        }
      },
    },
    "latest": *[_type == "post"]|order(publishedAt desc)[0..2]
    
  }`;

  const query = filter + projection;
  const post = await client
    .fetch(query, { slug })
    .catch(err => this.error(500, err));
  if(post) {
    return { post }
  }
}