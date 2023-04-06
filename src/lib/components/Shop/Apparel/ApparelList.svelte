<script>
    import ApparelCard from './ApparelCard.svelte'
    import Select from 'svelte-select'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    export let products
    export let currentPage
    export let prodCount
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
        {value: 'defaultApparelVariant.publishedAt desc', label: 'Recently Published'},
        {value: 'price asc', label: 'Lowest Price'},
        {value: 'defaultApparelVariant.featured desc', label: 'Featured Products'}
        
    ]

    function handleSelect(event) {
        sort = event.detail.value
        let href = $page.url.pathname + '?sort=' + sort + '&p=1#productList'
        goto(href)
    }
</script>
    
<div class="col-xl-9 col-lg-9">
    <div class="product-items">
        <div class="row">
            <div class="col-xl-12">
                <div class="showing-result-shorting">
                    <div class="left">
                        <div class="showing" id="productList">
                            <p>Showing products {(currentPage-1)*perPage+1}-{Math.min(currentPage *perPage, prodCount)} of {prodCount} Results</p>
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
        </div>
        <div class="all_products">
            <div class="row">
                {#each products as product}
                    <ApparelCard {product} />
                {/each}
            </div>
        </div>
        {#if prodCount >= perPage}
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-end">
                    <li class="page-item" class:d-none="{currentPage <= 1}">
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
        color: var(--thm-primary)
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