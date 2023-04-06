<script>
    import {urlFor} from '$lib/sanity'
    import {onMount} from 'svelte'
    import {browser} from '$app/environment'
    import {fade} from 'svelte/transition'

    export let image
    export let maxWidth = 1200
    export let alt = undefined
    // Example image document ID: image-cc93b69600f5cd1abce97fd0d4aa71793dbbba76-1350x900-png
    // Structure: image-${storedImgId}-${dimensions}-${format}
    // If we split it by "-", the 3rd element are the dimensions (1350x900)
    $: dimensions = image?.asset?._ref?.split('-')[2]
    // If we split dimensions by "x", we get the width (1350) and height (900)
    $: [width, height] = dimensions.split('x').map(Number)
    $: aspectRatio = width / height
    // Once loaded, the image will transition to full opacity
    let imageRef
    let src = urlFor(image).width(maxWidth).fit('fillmax')
    $: loaded = false

    onMount(() => {
        imageRef.onLoad = () => {
            loaded = true
        }
    })
  </script>

  {#if browser && image}
    <img
      in:fade
      loading="lazy"
      src=src
      alt={alt || image.alt || ''}
      class:loaded
      bind:this={imageRef}
      style="aspect-ratio: {aspectRatio};"
    />
  {/if}