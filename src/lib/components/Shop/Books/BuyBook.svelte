<script>
  export let book;
  export let quantity = 1;

  let slug = `/shop/books/${book.slug.current}/${book._id}/`
  book.binding = book.binding ? book.binding : book.defaultBookVariant.binding
  let weight = book.weight ? book.weight : book.binding == 'hardcover' ? '2' : '1'
</script>

<button class="snipcart-add-item thm-btn hover:text-thm-base"
 data-item-name={book.title}
 data-item-price={book.price.toFixed(2)}
 data-item-id={book._id}
 data-item-url={slug}
 data-item-description='Book'
 data-item-image={book.images}
 data-item-weight={Math.ceil(weight * 453.592)}
 data-item-height={Math.ceil((book.depth || 1 )* 2.54 )}
 data-item-length={Math.ceil((book.length || 9) * 2.54)}
 data-item-width={Math.ceil((book.width || 6) * 2.54)}
 data-item-quantity={quantity}>
  Add to Cart
</button>