<script context="module">
    import client from '../sanityClient'
    
    export function preload({ params, query }) {
        const searchQuery = query.q
        const filter = `*[_type == 'book' 
                            && defined(slug.current) 
                            && !(_id in path("drafts.**"))
                            && defaultBookVariant.price > 0
                            && defaultBookVariant.featured
                            ] {
                                "images": defaultBookVariant.images[0].asset->url,
                                authors[]->{name, slug},
                                "price": defaultBookVariant.price,
                                "binding": defaultBookVariant.binding,
                                ...
                                } | [0..20]`
        return client
            .fetch(filter)
            .then(res => {
                    const featured = res
                    return { featured };
            }).catch(err => this.error(500, err));
    }
</script>

<script>
    import algoliasearch from 'algoliasearch/lite';
    import instantsearch from 'instantsearch.js';
    import { configure, searchBox, hits, pagination } from 'instantsearch.js/es/widgets';
    import { connectInfiniteHits } from 'instantsearch.js/es/connectors'
    import FeaturedBar from '../components/Shop/Books/FeaturedBar.svelte'
    import { onMount } from 'svelte'
    import { stores } from '@sapper/app';
    import { getContext } from 'svelte'
    import imageURLBuilder from '@sanity/image-url'

    const settings$ = getContext('settings')

    $: settings = $settings$

    const urlFor = source => imageURLBuilder(client).image(source)

    const { page } = stores(); 
    export let featured;
    let searchQuery = $page.query.q || '';

    // function setQuery() {
    //     document.getElementById('searchBox').value = searchQuery

    // }

    onMount(() => {
        let lastRenderArgs;

        const infiniteHits = connectInfiniteHits(
            (renderArgs, isFirstRender) => {
                const { hits, showMore, widgetParams } = renderArgs;
                const { container } = widgetParams;
                // console.log(hits[0])
                lastRenderArgs = renderArgs;

                if (isFirstRender) {
                    const sentinel = document.createElement('div');
                    container.appendChild(document.createElement('ul'));
                    container.appendChild(sentinel);

                    const observer = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                        if (entry.isIntersecting && !lastRenderArgs.isLastPage) {
                            showMore();
                        }
                        });
                });

                observer.observe(sentinel);

                return;
                }

                container.querySelector('ul').innerHTML = hits
                .map(
                    hit =>
                    `<li>
                        <div class="ais-Hits-item" style="width: 100%">
                            
                            <div class="row">
                                <div class="col-4">
                                    <a href=${hit.url} > <img class="img-fluid w-100" src="${hit.image}"  /> </a>
                                </div>
                                <div class="col-8">
                                    <a href=${hit.url} style="color: var(--thm-primary)"><h2 class="hit-name" style="color: var(--thm-primary)">
                                        <strong>${instantsearch.highlight({ attribute: 'title', hit })}</strong>
                                    </h2></a>
                                    <p class="hit-description">
                                        ${instantsearch.highlight({ attribute: 'description', hit })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>`
                )
                .join('');
            }
        );

        const searchClient = algoliasearch('XZ2RH1TJ7K', 'b42abea25baedc51f65eb03dc9d264eb');
    
        const search = instantsearch({
            indexName: 'netlify_28858b01-d440-45e4-ae60-768f535fa445_master_all',
            searchClient,
            routing: true,
            initialUiState: {
                'netlify_28858b01-d440-45e4-ae60-768f535fa445_master_all': {
                    query: searchQuery
                }
            }
        });

        search.addWidgets([
            
            searchBox({
                container: "#searchBox",
                placeholder: 'Search our website',
                autofocus: 'true'
            }),

            infiniteHits({
                container: document.querySelector('#hits'),
                
            }),

            configure({
                attributesToSnippet: ['description'],
            })

        ]);

        search.start();

        document.getElementById('hits').children[0].style.listStyle = 'none'
        if(document.getElementsByTagName("mark").length){
            document.getElementsByTagName("mark").forEach(e => {
                e.style.fontSize = 'inherit'
            });
        }
        document.querySelector('input[type="search"]').value = searchQuery;
        document.querySelector('img').style.width = '100%'
    })

</script>

<style>
    /* .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;  
    }
    
    ul {
    list-style: none;
    padding: 0;
    }

    .container {
    max-width: 960px;
    overflow: hidden;
    margin: 0 auto;
    }

    .ais-SearchBox {
    margin: 1em 0;
    }

    .ais-Hits-item {
    margin-bottom: 1em;
    width: calc(50% - 1rem);
    }

    .ais-Hits-item img {
    margin-right: 1em;
    }

    .hit-name {
    margin-bottom: 0.5em;
    font-weight: bold
    }
    .hit-name a{
        color: var(--thm-primary)
    }

    .hit-description {
    color: #888;
    font-size: 14px;
    margin-bottom: 0.5em;
    }
     */
    
    :global(.ais-Highlight-highlighted){
        font-size: inherit;
        background-color: var(--thm-base)
    }
</style>

<svelte:head>
    <script>window.process = {env: { DEBUG: undefined } }</script>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous"> -->

</svelte:head>

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2>Search Results</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a href="/">Home</a></li>
            <li><span>Search </span></li>
        </ul>
    </div>
</section>

<section class="product">
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-6">
                <div class="sidebar-wrapper style2">
                    <!--Start single sidebar-->
 
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

                    <!--End sidebar categories Box-->
                    <!--Start single sidebar-->
                    <FeaturedBar {featured} />
                    <!--End single sidebar-->

                </div>
            </div>
            <!--End Sidebar Wrapper-->
            <div class="col-xl-9 col-lg-9">
                <div id="searchBox"></div>
                <br>
                <div id="hits"></div>
            </div>
        </div>
    </div>
</section>