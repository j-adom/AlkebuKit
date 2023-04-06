<script>
    import { urlFor } from "$lib/sanity";
    import { getContext } from "svelte";
    
    export let featured
    const shuffle = (arr,count) => {
        let _arr = [...arr];
        return[...Array(count)].map( ()=> _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0] ); 
    }
    let randFeatured = shuffle(featured,5)
</script>

<div class="single-sidebar wow fadeInUp animated" data-wow-delay="0.5s"
    data-wow-duration="1200ms">
    <div class="top_sellers">
        <div class="title">
            <h3>Featured Products</h3>
        </div>
        <ul class="top-products">
            {#each randFeatured as product}
                {#if product._type == 'book'}
                    <li>
                        <div class="product_item">
                            <div class="img-box">
                                <img loading="lazy" src="{urlFor(product.images).fit('fill').auto('format').url()}" alt={product.title}>
                                <div class="overlay-content">
                                    <a href="/shop/books/{product.slug.current}/{product._id}/"><i class="fa fa-link" aria-hidden="true"></i></a>
                                </div>
                            </div>
                            <div class="title-box">
                                <h4><a href="/shop/books/{product.slug.current}/{product._id}/">{product.title} ({product.binding})</a></h4>
                                <div class="value">${product.price}</div>
                            </div>
                        </div>
                    </li>
                {:else if product._type == 'apparel'}
                    <li>
                        <div class="product_item">
                            <div class="img-box">
                                <img loading="lazy" src="{urlFor(product.images).fit('fill').auto('format').url()}" alt={product.title}>
                                <div class="overlay-content">
                                    <a href="/shop/apparel/{product.slug.current}/{product._id}/"><i class="fa fa-link" aria-hidden="true"></i></a>
                                </div>
                            </div>
                            <div class="title-box">
                                <h4><a href="/shop/apparel/{product.slug.current}/{product._id}/">{product.title} ({product.apparelType.title})</a></h4>
                                <div class="value">${product.price}</div>
                            </div>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>