<script>
    import FeaturedBar from '$lib/components/Shop/FeaturedBar.svelte'
    import BookList from '$lib/components/Shop/Books/BookList.svelte'
    import Meta from '$lib/components/Meta.svelte'
    import { urlFor } from '$lib/sanity';
	import { page, } from '$app/stores';
	import { SearchIcon } from 'svelte-feather-icons'
    
    export let data
    const {name, bookCount, books, genres, featured} = data.auth
    const settings = data.settings
    let perPage = 12;
    let pageCount = Math.ceil(bookCount/perPage)

    let currentPage 
    $: currentPage = parseInt($page.url.searchParams.get('p')) || 1
    
    let sort = $page.url.searchParams.get('query') || ''
    let slug = $page.params.slug
    let baseURL = `/shop/books/authors/${slug}/`
    let metaURL = parseInt($page.url.searchParams.get('p')) > 1 ? baseURL + '?p=' + $page.url.searchParams.get('p')
                :  baseURL 
    let metaImg ="https://cdn.sanity.io/images/nrl6nc45/production/87f3a18c04e9e50a99b0e4e46b0e08a0e9c0ae57-4160x2340.jpg?&w=400&h=300&auto=format"

    let thisPage = parseInt($page.url.searchParams.get('p')) > 1 ? `| Page ${$page.url.searchParams.get('p')} ` : ''
    const metadata = {
		title: `${name} ${thisPage}| Alkebu-Lan Images`,
        description: `Books written by ${name} `,
		image: metaImg,
		imageAlt: 'bookshelf',
        url: metaURL,
    }
</script>

<Meta {metadata}/>

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2><small>Author:</small><br>{name}</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a href="/shop/">Shop</a></li>
            <li><a href="/shop/books/" class="shop_style">Books</a></li>
            <li><span>Authors</span></li>
        </ul>
    </div>
</section>

<section class="product">
    <div class="container w-full mx-auto px-8">
        <div class="flex flex-col lg:flex-row gap-3">
             <div class="basis-1 md:basis-1/4">
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