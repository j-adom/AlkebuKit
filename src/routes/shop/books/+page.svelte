<script>
    import BookList from '$lib/components/Shop/Books/BookList.svelte'
    import FeaturedBar from '$lib/components/Shop/FeaturedBar.svelte'
	import { SearchIcon } from 'svelte-feather-icons'

    import { urlFor } from '$lib/sanity';

    import { page } from '$app/stores'
    import Meta from '$lib/components/Meta.svelte'


    export let data
    const {bookCount, books, genres, featured} = data.bks
    const settings = data.settings

	let perPage = 12;
    let pageCount = Math.ceil(bookCount/perPage)

    $: currentPage = parseInt($page.url.searchParams.get('p')) || 1
    
    let sort = $page.url.searchParams.get('sort') || ''
    console.log(sort)

    let baseURL = `/shop/books/`
    let metaURL = currentPage > 1 ? baseURL + '?p=' + currentPage  
                :  baseURL 
    let metaImg ="https://cdn.sanity.io/images/nrl6nc45/production/87f3a18c04e9e50a99b0e4e46b0e08a0e9c0ae57-4160x2340.jpg?&w=400&h=300&auto=format"

    let thisPage = currentPage > 1 ? `| Page ${currentPage} ` : ''
    const metadata = {
		title: `Book Catalogue ${thisPage}| Alkebu-Lan Images`,
		description: `Browse are extensive catalog focused on books by Black Authors and about Black topics`,
		image: metaImg,
		imageAlt: 'Alkebu-Lan Images Bookshelf',
		url: metaURL
    }
</script>

<Meta {metadata} />

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2>Book Catalogue</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a href="/">Home</a></li>
            <li><a href="/shop/" class="shop_style">Shop</a></li>
            <li><span>Books</span></li>
        </ul>
    </div>
</section>

<section class="product">
    <div class="container w-full mx-auto px-8">
        <div class="flex flex-col lg:flex-row gap-3">
            <div class="basis-1 md:basis-1/2 lg:basis-1/4">
                <div class="sidebar-wrapper style2">
                    <!--Start single sidebar-->
                    <div class="single-sidebar wow fadeInUp animated" data-wow-delay="0.1s"
                        data-wow-duration="1200ms">
                        <div class="sidebar-search-box">
                            <form class="search-form" action="/search" method="GET">
                                <input placeholder="Search" type="search" name="q" >
                                <button type="submit">
                                    <SearchIcon size="24" />
                                </button>
                            </form>
                        </div>
                    </div>
                    <!--End single sidebar-->
                    <!--Start sidebar categories Box-->
                    <!-- <div class="price_sidebar wow fadeInUp animated" data-wow-delay="0.3s"
                        data-wow-duration="1200ms">
                        <h3>Price</h3>
                        <div class="price-ranger">
                            <div id="slider-range"></div>
                            <div class="ranger-min-max-block">
                                <input type="text" readonly class="min">
                                <span>-</span>
                                <input type="text" readonly class="max">
                                <input type="submit" value="Filter">
                            </div>
                        </div>
                    </div> -->
                    <!--End sidebar categories Box-->
                    <!--Start sidebar categories Box-->
                    <div class="single-sidebar wow fadeInUp animated" data-wow-delay="0.3s"
                        data-wow-duration="1200ms">
                        <div class="categories-box">
                            <div class="title">
                                <h3>Categories</h3>
                            </div>
                            <ul class="categories clearfix">
                            {#each genres as genre}    
                                <li><a href="/shop/books/genres/{genre.slug.current}/">{genre.name}</a></li>
                            {/each}
                            </ul>
                        </div>
                    </div>
                    <!--End sidebar categories Box-->
                    <!--Start single sidebar-->
                    <FeaturedBar {featured}/>
                    <!--End single sidebar-->

                </div>
            </div>
            <!--End Sidebar Wrapper-->
            <BookList {books} {bookCount} {sort} bind:currentPage bind:pageCount {perPage} />
        </div>
    </div>
</section>