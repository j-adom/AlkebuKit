<script>
  export let product;
  export let image;
  export let quantity = 1;
  export let color  = product.colors[0]
  export let size = product.sizes[0]
  export let icon = false
  let colors = product.colors.map(c => c.color)
  let sizes = product.sizes
  
  let sizeOptions = sizes.length > 1 ? sizes.join('|') : sizes[0]
  let colorOptions = colors.length > 1 ? colors.join('|') : colors[0]
  let slug = `/shop/apparel/${product.slug.current}/${product._id}/`
  let weight = product.weight ? product.weight : '2'
</script>

<button disabled={!color || !size} class="snipcart-add-item thm-btn"
 data-item-name={product.title}
 data-item-price={product.price.toFixed(2)}
 data-item-id={product._id}
 data-item-url={slug}
 data-item-description={product.description}
 data-item-image={image}
 data-item-weight={Math.ceil(weight * 453.592)}
 data-item-height={Math.ceil( 3 * 2.54 )}
 data-item-length={Math.ceil( 9 * 2.54)}
 data-item-width={Math.ceil( 5 * 2.54)}
 data-item-quantity={quantity}
 data-item-custom1-name="Size"
 data-item-custom1-options={sizeOptions}
 data-item-custom1-value={size}
 data-item-custom2-name="Color"
 data-item-custom2-options={colorOptions}
 data-item-custom2-value={color}
 >
  {#if icon}
    <span class="icon-shopping-cart" />
  {:else}
    Add to Cart 
  {/if}
</button>