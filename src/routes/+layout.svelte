<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'
	import Footer from '$lib/components/Footer.svelte'
	// import Loader from 'static/assets/images/loader.png'
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte/internal';
	import '../app.css';

	export let settings
    const settings$ = writable(settings)

    // this updates the store's value when `settings` changes
    // syntactic sugar for: settings$.set(settings)
    $: $settings$ = settings

    setContext('settings', settings$)

	function changeZ(){
       let x = Array.from(document.getElementsByClassName('algolia-autocomplete') as HTMLCollectionOf<HTMLElement>)
       x.forEach(element => {
           element.style.zIndex = "1000"; 
       });
       document.getElementById('search').focus() 
    }
    
    let searchInput = ''
    function handleSubmit(searchInput){
        goto(`/search?q=${searchInput}`);
    }
</script>

<div class="page-wrapper">

	<Nav/>

	
	<main>
		{#if $navigating}
			<div class="preloader">
				<img src="/assets/images/loader.png" class="preloader__image" alt="">
			</div>
		{:else}
			<slot></slot>
		{/if}
	</main>

	<Footer/>

	<a href="." data-target="html" class="scroll-to-target scroll-to-top"><i class="fa fa-angle-up"></i></a>






    <div class="search-popup">
        <div class="search-popup__overlay custom-cursor__overlay">
            <div class="cursor"></div>
            <div class="cursor-follower"></div>
        </div><!-- /.search-popup__overlay -->
        <div class="search-popup__inner">
            <form on:submit="{handleSubmit}" class="search-popup__form" method="GET">
                <input on:input={changeZ} bind:value={searchInput} type="search" name="q" id="search" placeholder="Type here to Search...."
                aria-label="Search through site content">
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div><!-- /.search-popup__inner -->
    </div><!-- /.search-popup -->

</div>
<style>

</style>
