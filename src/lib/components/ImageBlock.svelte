<script>
  import SanityImage from './SanityImage.svelte'
  export let portableText
  $: ({value} = portableText)

  import { urlFor } from '$lib/sanity';
</script>

<!-- {#if value.asset}
  <figure>
    <SanityImage image={value} />
    {#if value.caption}
      <figcaption>{value.caption}</figcaption>
    {/if}
  </figure>
{/if}

$: ({value} = portableText) -->

<figure>
  <img src={urlFor(value)} alt={value.caption} />

  <figcaption>{value.caption}</figcaption>
</figure>