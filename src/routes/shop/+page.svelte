<!-- Add component on Featured Products-->

<script>
    import Meta from '$lib/components/Meta.svelte'
    import { urlFor } from '$lib/sanity';
    
    const metadata = {
		title: 'Shop | Alkebu-Lan Images',
		description: `Our store has 4 departments: Books, Apparel, Health & Beauty, and Art & Afrian Imports`,
		image: '/assets/images/resources/logo.png',
		imageAlt: 'Alkebu-Lan Images Logo',
		url: '/shop/'
    }

	export let data
	const { banner, section1} = data.shop

</script>

<Meta {metadata}/>

<section class="page-header" style="background-image: url({urlFor(banner.bannerImage).width(1920).height(300).auto('format').url()});">
    <div class="container">
        <h2>Categories</h2>
        <ul class="thm-breadcrumb list-unstyled">
            <li><a href="/">Home</a></li>
            <li><a href="/shop/" class="shop_style">Shop</a></li>
            <!-- <li><span>Categories</span></li> -->
        </ul>
    </div>
</section>

<section class="recent-project our_projects">
    <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div class="">
                <div class="recent_project_single mrb-30">
                    <div class="project_img_box">
                        <img loading="lazy" src={urlFor(section1.images[0]).width(370).height(484).auto('format').url()} alt={section1.images[0].alt}>
                        <div class="project_content">
                            <h3>Book<br>catalogue</h3>
                        </div>
                        <div class="hover_box">
                            <a href="/shop/books"><span class="icon-left-arrow"></span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="recent_project_single mrb-30">
                    <div class="project_img_box">
                        <img loading="lazy" src={urlFor(section1.images[1]).width(370).height(484).auto('format').url()} alt={section1.images[1].alt}>
                        <div class="project_content">
                            <h3>fashion<br>& apparel</h3>
                        </div>
                        <div class="hover_box">
                            <a href="/shop/fashion"><span class="icon-left-arrow"></span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="recent_project_single mrb-30">
                    <div class="project_img_box">
                        <img loading="lazy" src={urlFor(section1.images[2]).width(370).height(484).saturation(-100).auto('format').url()} alt={section1.images[2].alt}>
                        <div class="project_content">
                            <h3>Health<br>& Beauty</h3>
                        </div>
                        <div class="hover_box">
                            <!-- <a href="/shop/health-and-beauty"><span class="icon-left-arrow"></span></a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="recent_project_single mrb-30">
                    <div class="project_img_box">
                        <img loading="lazy" src={urlFor(section1.images[3]).width(370).height(484).saturation(-100).auto('format').url()} alt={section1.images[3].alt}>
                        <div class="project_content">
                            <h3>African art<br>& imports</h3>
                        </div>
                        <div class="hover_box">
                            <!-- <a href="/shop/art-and-imports"><span class="icon-left-arrow"></span></a> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</section>
