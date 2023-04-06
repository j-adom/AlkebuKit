<script>
  import BuyApparel from './BuyApparel.svelte'
  import { urlFor } from "$lib/sanity";

  export let product;
  let weight = product.weight ? product.weight : 2
</script>

<style>

</style>

<div class="col-xl-4 col-lg-4 col-md-6">
  <div class="all_products_single text-center">
    <div class="all_product_item_image">
      <a href="/shop/apparel/{product.slug.current}/">
        <img loading="lazy"
          src={urlFor(product.images)
            .width(200)
            .fit('fill')
            .auto('format').url()}
          alt={product.title} />
        <!-- <div class="all_product_hover">
          <BuyApparel {product}/>
        </div> -->
        </a>
    </div>
    <h4>
      <a href="/shop/apparel/{product.slug.current}/{product._id}/">
        {product.title} ({product.apparelType.title})
      </a>
    </h4>
    <h2>
      {#if product.brand} 
          {#if product.brand.slug}
              <a href="/shop/apparel/brands/{product.brand.slug.current}/">{product.brand.title}</a>
          {/if}
      {/if}
    </h2>
    <p>From ${product.price}</p>
  </div>
</div>



