<script>
  import BookCover from './BookCover.svelte'

  import { urlFor } from "$lib/sanity";

  export let book;
  book.binding = book.binding ? book.binding : book.defaultBookVariant.binding
  let weight = book.weight ? book.weight : book.binding == 'hardcover' ? '2' : '1'

</script>

<style>

    .single{
        position: relative;
        display: block;
        overflow: hidden;
        padding: 0 1rem
    }
    .single h4 a{
        color: inherit;
        transition: 500ms;
    }
    .single h4 {
    font-size: 30px;
    color: var(--thm-black);
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    line-height: 30px;
    margin-top: 27px;
    -webkit-transition: all 500ms ease;
    transition: all 500ms ease;
    }
    .single:hover h4 {
        color: var(--thm-primary);
    }
    .single h4 a:hover {
        color: var(--thm-primary);
    }
    .single p {
        font-size: 20px;
        color: #878986;
        margin: 0;
        line-height: 28px;
    }
</style>

    <div class="single text-center">
        <div class="all_product_item_image">
            {#if book.images} <img loading="lazy" src="{urlFor(book.images).fit('fill').auto('format').url()}" alt={book.title}>
            {:else} <BookCover title={book.title} subtitle={book.subtitle} />
            {/if}
            <div class="all_product_hover">
                <button class="all_product_icon snipcart-add-item "
                    data-item-name={book.title}
                    data-item-price={book.price.toFixed(2)}
                    data-item-id={book._id}
                    data-item-url='/shop/books/{book.slug.current}/{book._id}/'
                    data-item-description="book"
                    data-item-image={book.images}
                    data-item-quantity="1"
                    data-item-weight={Math.ceil(weight * 453.592)}
                    data-item-height={Math.ceil((book.depth || 1 )* 2.54 )}
                    data-item-length={Math.ceil((book.length || 9) * 2.54)}
                    data-item-width={Math.ceil((book.width || 6) * 2.54)}
                >
                    <span class="icon-shopping-cart"></span>
                </button>
            </div>
        </div>
        <h4><a href="/shop/books/{book.slug.current}/{book._id}/">{book.title} ({book.binding})</a></h4>
        <p>${book.price}</p>
    </div>