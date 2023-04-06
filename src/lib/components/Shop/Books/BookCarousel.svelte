<script>
	import CarouselCard from './CarouselCard.svelte'	
	import Carousel from '@beyonk/svelte-carousel'
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'

	export let books;

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
	
	let shuffledBooks = shuffle(books).slice(0,11)
</script>

<style>
        .control :global(svg) {
		width: 100%;
		height: 100%;
		color: var(--thm-primary);
        border: 2px solid var(--thm-primary);
        background-color: var(--thm-base);
		border-radius: 32px;
    }

    
</style>

<Carousel perPage={{ 1000: 4, 800: 3, 500: 2 }}>
    <span class="control" slot="left-control">
        <ChevronLeftIcon />
    </span>
    {#each shuffledBooks as book}
        <div class="slide-content">
            <CarouselCard {book} />
        </div>	
    {/each}
    <span class="control" slot="right-control">
        <ChevronRightIcon />
    </span>
</Carousel>