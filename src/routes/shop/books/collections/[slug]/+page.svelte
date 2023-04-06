<script>

    import BookList from '$lib/components/Shop/Books/BookList.svelte'
    import FeaturedBar from '$lib/components/Shop/FeaturedBar.svelte'
    import Meta from '$lib/components/Meta.svelte'
    // import GenreBox from '$lib/components/Shop/Books/GenreBox.svelte'
	import { SearchIcon } from 'svelte-feather-icons'

    import { page } from '$app/stores'
    import { urlFor } from "$lib/sanity";

    export let data

    const {title, bookCount, books, genres, featured} = data.books
    const settings = data.settings
    let perPage = 12;
    let pageCount = Math.ceil(bookCount/perPage)

    let currentPage 
    $: currentPage = parseInt($page.url.searchParams.get('p')) || 1   
    
    let sort = $page.url.searchParams.get('query') || ''
    let slug = $page.params.slug

    let baseURL = `/shop/books/collections/${slug}/`
    let metaURL = parseInt($page.url.searchParams.get('p')) > 1 ? baseURL + '?p=' + $page.url.searchParams.get('p')
                :  baseURL 
    let metaImg ="https://cdn.sanity.io/images/nrl6nc45/production/87f3a18c04e9e50a99b0e4e46b0e08a0e9c0ae57-4160x2340.jpg?&w=400&h=300&auto=format"

    let thisPage = parseInt($page.url.searchParams.get('p')) > 1 ? `| Page ${$page.url.searchParams.get('p')} ` : ''
    const metadata = {
		title: `Collection: ${title} ${thisPage}| Alkebu-Lan Images`,
        description: `A curated selection of books from the collection ${title} `,
		image: metaImg,
		imageAlt: 'bookshelf',
        url: metaURL,
    }

</script>

<Meta {metadata}/>

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2><small>Collection:</small><br>{title}</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a href="/shop/">Shop</a></li>
            <li><a href="/shop/books/" class="shop_style">Books</a></li>
            <li><span>Collections</span></li>
        </ul>
    </div>
</section>

<section class="product">
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-6">
                <div class="sidebar-wrapper style2">
                    <!--Start single sidebar-->
                    <div class="single-sidebar wow fadeInUp animated" data-wow-delay="0.1s"
                        data-wow-duration="1200ms">
                        <div class="sidebar-search-box">
                            <form class="search-form" action="/search" method="GET">
                                <input placeholder="Search" type="search" name="q">
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
                    <FeaturedBar {featured} />
                    <!--End single sidebar-->

                </div>
            </div>
            <!--End Sidebar Wrapper-->
            <BookList {books} {bookCount} {sort} bind:currentPage bind:pageCount {perPage} />
        </div>
    </div>
</section>