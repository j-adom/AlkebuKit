<!-- todos:
    - Add portabletext code
    - Add Related Products section
    - Add right side product navigation accordion:
      - Categories
      - Featured Products
      - Link to genre  
    - Pull in reviews
 -->


<script>
    import BuyBook from '$lib/components/Shop/Books/BuyBook.svelte'
    import BookTabs from '$lib/components/Shop/Books/BookTabs.svelte'
    import BookCarousel from '$lib/components/Shop/Books/BookCarousel.svelte'
    import BookCard from '$lib/components/Shop/Books/BookCard.svelte'
    import BookCover from '$lib/components/Shop/Books/BookCover.svelte'
    
    import Meta from '$lib/components/Meta.svelte'
    import StarRating from 'svelte-stars-rating'
    
    import { urlFor } from '$lib/sanity';

    export let data;
    const {book, settings} = data

    if (book.description == undefined){
        book.description = 'No description available'
    } 
    
    import { page } from '$app/stores'
    
    let authorsNames = []
    book.authors.forEach(author => {
        authorsNames.push(author.name)    
    });

    let genreText = []
    book.genre ? book.genre.forEach(genre => {
        genreText.push(genre.name)
    }) : '';

    let collectionText = []
    book.collection ? book.collection.forEach(collection => {
        collectionText.push(collection.title) 
    }) : "";

    let descText = book.description ? book.description.replace(/(<([^>]+)>)/gi, "") : ''

    const desc =    (typeof book.subtitle !== "undefined" ? book.subtitle +' | ' : '')
                    + ( genreText.length ? genreText.join(' | ') + ' | ' : '')
                    + ( collectionText.length ? collectionText.join( ' | ') + '|'  : '')
                    + ( book.tags ? book.tags.join(' | ') + ' | ' : '')
                    + (descText.length ? descText : '')
    
    const metadata = {
		title: book.title +' by ' + authorsNames.join(', ')+' | '+ book.binding+' | Alkebu-Lan Images',
        description: desc,
		image: urlFor(book.images).auto('format').url(),
		imageAlt: book.title,
        url: `/shop/books/${book.slug.current}/${book._id}/`,
        product: {
            price: book.price
        }
    }

    let tags = book.tags? book.tags.map( t => t.replace('&','AND')) : ''

    let relatedBooks = []
    book.authors.map( author => {
        author.otherTitles.forEach(title => {
            if(title._id !== book._id) {
            relatedBooks.push(title)
            }  
        });
    })

    let q = 1
    const increment = () => q++
    const decrement = () => Math.max(0, q--)

    let style = {
        styleStarWidth: 40,
        styleEmptyStarColor: "#737373",
        styleFullStarColor: "#ffd219"
    }
    let styleSmall = {
        styleStarWidth: 10,
        styleEmptyStarColor: "#737373",
        styleFullStarColor: "#ffd219"
    }
    
  
</script>

<style>
    .product_detail_price_box p {
        font: 2em sans-serif;
        color: var(--thm-primary)
    }

    .bm-reviews{
        margin-top: 115px;
    }
 
</style>

<Meta {metadata} />

<svelte:head>
    <script async src="//lithub.com/b/v1/bookmarks.js?ver=1.3"></script>
</svelte:head>

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2>Book Catalogue</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a rel=prefetch href="/shop/">Shop</a></li>
            <li><a rel=prefetch href="/shop/books/" class="shop_style">Books</a></li>
            <li><span>Book Details</span></li>
        </ul>
    </div>
</section>
<section class="product_detail mx-auto px-12">
    <div class="container mx-auto px-12">
        <div class="flex flex-col md:flex-row md:justify-between ">
            <div class="md:w-2/5 lg:w-1/3">
                <div class="product_detail_image">
                    <img loading="lazy" src="{urlFor(book.images).bg('fff').fit('fill').auto('format').url()}" alt={book.title}>
                </div>
            </div>
            <div class="md:w-3/5 lg:w-3/5 md:ml-10">
                <div class="product_detail_content">
                    <h2>{book.title}</h2>
                    {#if book.subtitle} <h1 class="text-4xl">{book.subtitle}</h1>{/if}
                    <h1 class="text-3xl">by {#each book.authors as author, i}
                                {#if i == 0}<a rel=prefetch href="/shop/books/authors/{author.slug.current}/" class="no-underline hover:underline text-black text-3xl">{author.name}</a>
                                {:else}, <a rel=prefetch href="/shop/books/authors/{author.slug.current}/" class="no-underline hover:underline text-black text-3xl">, {author.name}</a>
                                {/if}
                            {/each}
                        </h1>
                    <div class="product_detail_text">
                        <p>{book.binding.charAt(0).toUpperCase() + book.binding.slice(1)}</p>
                    </div>
                    <ul class="list-unstyled category_tag_list">
                        {#if book.genre}
                            <li>Genre: {#each book.genre as g, i} 
                                            {#if i ==0} <a rel=prefetch href="/shop/books/genres/{g.slug.current}/">{g.name}</a>
                                            {:else} <a rel=prefetch href="/shop/books/genres/{g.slug.current}/">, {g.name} </a>
                                            {/if}
                                        {/each}
                            </li>
                        {/if}
                        {#if book.collection}
                            <li>Collections: {#each book.collection as c, i} 
                                                {#if i ==0} <a rel=prefetch href="/shop/books/collections/{c.slug.current}/">{c.title}</a>
                                                {:else} <a rel=prefetch href="/shop/books/collections/{c.slug.current}/">, {c.title} </a>
                                                {/if}
                                            {/each}
                            </li>
                        {/if}
                        {#if book.tags}
                            {#if book.tags[0] !== null}
                            <li>Tags: {#each tags as t, i} 
                                            {#if t !== null}
                                                {#if i ==0} <a rel=prefetch href="/shop/books/tags/{encodeURI(t)}">{t}</a>
                                                {:else} <a rel=prefetch href="/shop/books/tags/{encodeURI(t)}">, {t} </a>
                                                {/if}
                                            {/if}
                                        {/each}
                            </li>
                            {/if}
                        {/if}
                    </ul>
                    <div class="product_detail_review_box">
                        
                        <div class="product_detail_price_box">
                            <p>${book.price.toFixed(2)}</p>
                        </div>
                        <div class="product_detail_review">
                            {#if book.gRating > 0}
                                <StarRating 
                                    rating={book.gRating}
                                    {style}>
                                </StarRating>
                                <!-- <a rel=prefetch href="#"><i class="fa fa-star"></i></a>
                                <a rel=prefetch href="#"><i class="fa fa-star"></i></a>
                                <a rel=prefetch href="#"><i class="fa fa-star"></i></a>
                                <a rel=prefetch href="#"><i class="fa fa-star"></i></a>
                                <a rel=prefetch href="#" class="deactive"><i class="fa fa-star"></i></a> -->
                                <span>Google Books Review Rating</span>
                            {/if}
                        </div>
                    </div>
                   
                    <!-- <ul class="list-unstyled product_detail_address">
                        <li>REF. 4231/406</li>
                        <li>Available in store</li>
                    </ul> -->

                    <div class="product-quantity-box flex flex-col align-items-middle md:flex-row md:justify-left md:gap-5">
                        <div class="form-control">
                            <div class="flex flex-row border-1 gap-1 align-middle bg-gray-200 rounded-sm">
                                <button on:click={() => decrement()} class="btn text-3xl border-0 align-middle bg-thm-base hover:bg-thm-primary hover:text-thm-base " type="button">-</button>
                                <div class="text-4xl text-thm-primary bg-thm-base px-4 box-border">{q}</div>
                                <button on:click={() => increment()} class="btn text-3xl border-0 align-middle bg-thm-base hover:bg-thm-primary hover:text-thm-base " type="button">+</button>
                            </div>
                        </div>
                        <div class="addto-cart-box">
                            <BuyBook {book} bind:quantity={q} />
                        </div>
                        <!-- <div class="wishlist_btn">
                            <a rel=prefetch href="#" class="thm-btn">Add to Wishlist</a>
                        </div> -->

                    </div>
                    
                    <div class="product_detail_share_box">
                        <div class="share_box_title">
                            <h2>Share with friends</h2>
                        </div>
                        <div class="share_box_social">
                            <a rel=prefetch href="https://www.facebook.com/sharer.php?u=https://www.alkebulanimages.com{$page.url.pathname}"><i class="fab fa-facebook-square"></i></a>
                            <a rel=prefetch href="https://twitter.com/share?text={book.title}&url=https://www.alkebulanimages.com{$page.url.pathname}"><i class="fab fa-twitter"></i></a>
                            <!-- <a rel=prefetch href="#"><i class="fab fa-instagram"></i></a>
                            <a rel=prefetch href="#"><i class="fab fa-dribbble"></i></a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1">
            <div class="cols-span-1">
                <div class="flex flex-column md:flex-row">
                    
                    <div class="product-tab-box tabs-box">
                        <BookTabs {book} />
                    </div>
                    <div 
                        class="bm-reviews" 
                        data-isbn={book._id}
                        data-width="auto"
                        data-link="true">
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</section>

{#if relatedBooks.length > 0}
    <section class="all_products_two">
        <div class="container">
            <div class="block-title text-center">
                <p>Keep shopping</p>
                <h3>Books by the same Author(s)</h3>
                <div class="leaf">
                    <img loading="lazy" src="/assets/images/resources/leaf.png" alt="">
                </div>
            </div>
            <div class="all_products">
                <div class="grid grid-cols-12 gap-2">
                    {#if relatedBooks.length > 4}
                        <BookCarousel books={relatedBooks} />
                    {:else}
                        {#each relatedBooks as book}
                            <div class="col-span-12  md:col-span-6 xl:col-span-3 lg:col-span-3 ">
                                <div class="all_products_single text-center">
                                    <div class="all_product_item_image">
                                        {#if book.images} <img loading="lazy" src="{urlFor(book.images).fit('fill').auto('format').url()}" alt={book.title}>
                                        {:else} <BookCover title={book.title} subtitle={book.sibtitle} />
                                        {/if}
                                        <div class="all_product_hover">
                                            <button class="all_product_icon snipcart-add-item "
                                                data-item-name={book.title}
                                                data-item-price={book.price}
                                                data-item-id={book._id}
                                                data-item-url='/shop/books/{book.slug.current}/{book._id}/'
                                                data-item-description="book"
                                                data-item-image={book.images}
                                                data-item-quantity="1"
                                                data-item-height={book.height}
                                                data-item-length={book.length}
                                                data-item-width={book.width}
                                                data-item-weight={book.weight || (book.binding == 'hardcover') ? '2' : '1'}
                                                >
                                                <span class="icon-shopping-cart"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <h4><a rel=prefetch href="/shop/books/{book.slug.current}/{book._id}/">{book.title} ({book.binding})</a></h4>
                                    <!-- <StarRating 
                                        rating={book.gRating}
                                        {styleSmall}>
                                    </StarRating> -->
                                    <p>${book.price }</p>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </section>
{/if}

<!-- <section class="all_products_two">
        <div class="container">
            <div class="block-title text-center">
                <p>Keep shopping</p>
                <h3>similar products</h3>
                <div class="leaf">
                    <img loading="lazy" src="/assets/images/resources/leaf.png" alt="">
                </div>
            </div>
            <div class="all_products">
                <div class="row">
                    {#if relatedBooks.length > 3}
                        <BookCarousel books={relatedBooks} />
                    {:else}
                        {#each relatedBooks as book}
                            <CarouselCard {book} />
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </section> -->