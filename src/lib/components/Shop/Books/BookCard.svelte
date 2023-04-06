<script>
  import BookCover from "./BookCover.svelte";

  import { urlFor } from "$lib/sanity";

  export let book;
  book.binding = book.binding ? book.binding : book.defaultBookVariant.binding
  let {depth, width, length} = book  
  let weight = book.weight ? book.weight : book.binding == 'Paperback' ? 1 : 2
</script>

<style>

</style>


  <div class="flex flex-col text-center all_products_single ">
    <div class="all_product_item_image">
      {#if book.images}
        <img loading="lazy"
          src={urlFor(book.images)
            .fit('fill')
            .auto('format').url()}
          alt={book.title} />
      {:else}
        <BookCover title={book.title} subtitle={book.sibtitle} />
      {/if}
      <div class="all_product_hover">
        <button
            class="all_product_icon snipcart-add-item "
            data-item-name={book.title}
            data-item-price={book.price.toFixed(2)}
            data-item-id={book._id}
            data-item-url="/shop/books/{book.slug.current}/{book._id}/"
            data-item-description="book"
            data-item-image={book.images}
            data-item-quantity="1"
            data-item-weight={Math.ceil(weight * 453.592)}
            data-item-height={Math.ceil((book.depth || 1 )* 2.54 )}
            data-item-length={Math.ceil((book.length || 9) * 2.54)}
            data-item-width={Math.ceil((book.width || 6) * 2.54)}
        >

          <span class="icon-shopping-cart" />
        </button>
      </div>
    </div>
    <h4>
      <a href="/shop/books/{book.slug.current}/{book._id}/">
        {book.title} ({book.binding})
      </a>
    </h4>
    <h2>
      {#if book.authors} 
        {#each book.authors as author, i}
          {#if author.slug}
            {#if i == 0}
              by&nbsp
              <a href="/shop/books/authors/{author.slug.current}/">{author.name}</a>
            {:else}
              ,
              <a href="/shop/books/authors/{author.slug.current}/">{author.name}</a>
            {/if}
          {/if}
        {/each}
      {/if}
    </h2>
    <p class="text-2xl">${book.price}</p>
  </div>
