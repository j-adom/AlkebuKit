<script>
    import BookCard from './BookCard.svelte'
    import Select from 'svelte-select'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    export let books
    export let currentPage
    export let bookCount
    export let pageCount  
    export let sort  
    export let perPage = 12;
    const numArray = [1,2,3,4,5]
    $: range = pageCount < 6 ? [...Array(pageCount).keys()].map(i=>i+1)
                :currentPage < 3 ? numArray.map(num => num += 1)
                : currentPage > (pageCount - 3) ? numArray.map(num => (pageCount - 6) + num ) 
                : numArray.map(num => num += (currentPage -3 )) 

    let sortQuery = sort.length ? `sort=${sort}&` : ''
    let sortElements = [
        {value: 'title asc', label: 'Title A-Z'},
        {value: 'title desc', label: 'Title Z-A'},
        {value: '_createdAt desc', label: 'Recently Added'},
        {value: 'defaultBookVariant.publishedAt desc', label: 'Recently Published'},
        {value: 'price asc', label: 'Lowest Price'},
        {value: 'defaultBookVariant.featured desc', label: 'Featured Books'}
        
    ]

    function handleSelect(event) {
        sort = event.detail.value
        let href = $page.url.pathname + '?sort=' + sort + '&p=1#productList'
        goto(href)
    }
</script>
    
    <div class="basis-1 lg:basis-3/4">
        <div class="product-items">
            <div class="flex">
                    <div class="showing-result-shorting w-full">
                        <div class="left">
                            <div class="showing" id="productList">
                                <p>Showing products {(currentPage-1)*perPage+1}-{Math.min(currentPage *perPage, bookCount)} of {bookCount} Results</p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="shorting">
                                <div class='dropdown bootstrap-select'>
                                    <Select items={sortElements}  placeholder="Sort results by:" showChevron={true} on:select={handleSelect}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="all_products">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {#each books as book}
                        <BookCard {book} />
                    {/each}
                </div>
            </div>
            {#if bookCount >= perPage}
                <nav aria-label="Page navigation example">
                    <ul class="flex justify-end rounded-sm list-none">
                        <li class="page-item" class:hidden="{currentPage <= 1}">
                            <a rel=prefetch class="page-link" href="{$page.url.pathname}?{sortQuery}p={currentPage - 1}#productList" tabindex="-1">Previous</a>
                        </li>
                        {#if pageCount > 6} 
                            <li class="page-item" class:disabled="{currentPage === 1}">
                                <a rel=prefetch class="page-link" href="{$page.url.pathname}?{sortQuery}p=1#productList" tabindex="-1">1</a>
                            </li> 
                            {#if range[0] > 2}
                                <p>...</p>
                            {/if}  
                        {/if}
                        {#each range as pageNum}
                                <li class="page-item" class:disabled="{currentPage === pageNum}">
                                    <a rel=prefetch class="page-link" href="{$page.url.pathname}?{sortQuery}p={pageNum}#productList">
                                        {pageNum}
                                    </a>
                                </li>
                        {/each}
                        {#if pageCount > 6}
                            {#if range[4] < (pageCount -1)}
                                <p>...</p>
                            {/if}  
                            <li class="page-item" class:disabled="{currentPage === pageCount}">
                                <a rel=prefetch class="page-link" href="{$page.url.pathname}?{sortQuery}p={pageCount}#productList" tabindex="-1">{pageCount}</a>
                            </li>
                        {/if}
                        <li class="page-item" class:d-none="{currentPage == pageCount}">
                            <a rel=prefetch class="page-link" href="{$page.url.pathname}?{sortQuery}p={currentPage + 1}#productList">Next</a>
                        </li>
                    </ul>
                </nav>
            {/if}
        </div>
    </div>

    <style>
        
        .page-link {
            color: var(--thm-primary);
            position: relative;
            display: block;
            padding: 0.5rem 0.75rem;
            margin-left: -1px;
            line-height: 1.25;
            background-color: #fff;
            border: 1px solid #dee2e6;
        }
        .disabled a, .page-link:hover{
            background-color: var(--thm-primary);
            color: var(--thm-base)
            
        }
        .dropdown{
           padding-top: 10px; 
           --indicatorTop: 2px;
           --clearSelectTop: 2px;
           --borderFocusColor: var(--thm-primary);
           --itemHoverBG: var(--thm-base)
        }
        
      
    </style>