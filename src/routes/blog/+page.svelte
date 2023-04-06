<script>
	import {PortableText} from '@portabletext/svelte';
    import ImageBlock from '$lib/components/ImageBlock.svelte';
	import Link from '$lib/components/Link.svelte';
	import {client} from '$lib/sanity';
	import dayjs from "dayjs";


	import imageURLBuilder from '@sanity/image-url';
    const urlFor = source => imageURLBuilder(client).image(source)


	export let data
	const {settings, posts} = data

</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Habari Gani? | Alkebu-Lan Images</title>
</svelte:head>

<section class="page-header" style="background-image: url({urlFor(settings.banner).width(1920).height(300).auto('format').url()});">
	<div class="container">
		<h2>Habari Gani?<br>(What's the News?)</h2>
		<ul class="thm-breadcrumb list-unstyled">
			<li><a href="/">Home</a></li>
			<li><span>News</span></li>
		</ul>
	</div>
</section>
<!-- <ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data f or the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<!-- <li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul> --> 
<section class="blog-one news">
	
	<div class="container">
		<div class="row">
			{#each posts.posts as post}
				<div class="grid lg:grid-cols-4">
					<div class="blog_one_single mb-30">
						<div class="blog_one_image">
							<div class="blog_image">
								<a href="/blog/{post.slug.current}"><img src={urlFor(post.mainImage).size(370,309).auto('format').url()} alt="{post.title}">	</a>
								<div class="blog_one_date_box">
									<p>{dayjs(post.publishedAt).format('MMM DD YYYY')}</p>
								</div>
							</div>
							<div class="blog-one__content">
								<!-- <ul class="list-unstyled blog-one__meta">
									<li><a href= "/blog/{post.slug.current}"><i class="far fa-user-circle"></i> Admin</a></li>
									<li><a href="news_detail.html"><i class="far fa-comments"></i> 2 Comments</a>
									</li>
								</ul> -->
								<h3><a href="/blog/{post.slug.current}">{post.title}</a></h3>
								<div class="blog_one_text">
									<PortableText 
										value={post.excerpt}
										components={{
											types:{
												image: ImageBlock
											},
											marks: {
												link: Link
											}
											}
										}

									/>
									<!-- <p>There are lorem ipsum is simply free many variations of ipsum the majority
										suffered.</p> -->
								</div>
								<div class="read_more_btn">
									<a href="/blog/{post.slug.current}"><i class="fa fa-angle-right"></i>Read More</a>
								</div>
							</div>
						</div>
					</div>
				</div>	
			{/each}
			

		</div>
	</div>
</section>