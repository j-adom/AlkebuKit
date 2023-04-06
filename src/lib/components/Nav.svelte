<script>
	import { page } from '$app/stores';
import urlBuilder from '@sanity/image-url';
	import { SearchIcon, ShoppingCartIcon, MenuIcon, PhoneCallIcon, MailIcon } from 'svelte-feather-icons'
	let open = false //for when sveltify menu toggle instead of jquery toggle
	
</script>

<style>
	.button{
		border: none;
		background-color: transparent
	}

	.topbar_bg{
		position: absolute;
		left: 0;
		bottom: -16px;
		right: 0;
		height: 16px;
		z-index: 1;
	}
</style>

<div class="relative block mx-auto">

	<div class="topbar-one ">
		<div class="topbar_bg w-full" style="background-image: url(/assets/images/shapes/header-bg.png)"></div>
		<div class="navbar justify-between ">
			<div class="navbar-start hidden lg:flex text-lg font-medium ">
				<a class="flex items-center mx-2 hover:text-thm-base" href="mailto:info@alkebulanimages.com"><MailIcon size="18" />&nbsp;info@alkebulanimages.com</a>
				<a class="flex items-center mx-2 hover:text-thm-base" href="tel:615-321-4111"><PhoneCallIcon size="18" />&nbsp;615 321 4111</a>
			</div>
			<div class="navbar-middle mx-auto">
				<a href="/" class="main-nav__logo">
					<img loading="lazy" src="/assets/images/resources/logo.png" class="main-logo" alt="Alkebu-Lan Images" />
				</a>
			</div>
			<div class="navbar-end hidden lg:flex ">
				<div class="topbar-one__social">
					<a href="https://www.facebook.com/AlkebulanImages/"><i class="fab fa-facebook-square"></i></a>
					<a href="https://twitter.com/alkebulanimages"><i class="fab fa-twitter"></i></a>
					<a href="https://www.instagram.com/alkebulanimages"><i class="fab fa-instagram"></i></a>
					<a href="https://www.pinterest.com/alkebulanimages"><i class="fab fa-pinterest"></i></a>
				</div>
			</div>
		</div>
	</div>

	<header class="main-nav__header-one">
		<nav class="header-navigation stricky">
			<div class="container px-10 mx-auto flex justify-between">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="main-nav__left flex flex-row justify-between">
					<button  class="side-menu__toggler pr-1">
						<i class="fa fa-bars"></i>
					</button>
					<button class="main-nav__search search-popup__toggler">
						<i class="icon-magnifying-glass"></i>
					</button>
				</div>
				<div class="main-nav__main-navigation">
					<ul class=" main-nav__navigation-box flex justify-around">
						<li class:current={$page.url.pathname === undefined}>
							<a rel=prefetch href="/">Home</a>
							<!-- <ul>
								<li><a href="index.html">Home 01</a></li>
								<li><a href="index2.html">Home 02</a></li>
								<li><a href="index3.html">Home 03</a></li>
								<li><a href="index4.html">Home 04</a></li>
								<li><a href="index5.html">Home 05</a></li>
								<li class="dropdown"><a href="#">Header Versions</a>
									<ul>
										<li><a href="index.html">Header 01</a></li>
										<li><a href="index2.html">Header 02</a></li>
										<li><a href="index3.html">Header 03</a></li>
										<li><a href="index4.html">Header 04</a></li>
										<li><a href="index5.html">Header 05</a></li>
									</ul>/.sub-menu -->
								<!-- </li>
							</ul>/.sub-menu -->
						</li>
						<li class:current={$page.url.pathname === 'about'}>
							<a rel=prefetch href="/about">About Us</a>
						</li>
						<li class="dropdown" class:current={$page.url.pathname === 'shop'}>
							<a rel=prefetch href="/shop">Shop</a>
							<ul>
								<li><a rel=prefetch href="/shop/books">Books</a></li>
								<li><a rel=prefetch href="/shop/apparel">Apparel</a></li>
								<li><a >Health & Beauty</a></li>
								<li><a >Art & Imports</a></li>
							</ul><!-- /.sub-menu -->
						</li>
						<!-- <li class="dropdown" class:current={$page.url.pathname === 'home'}>
							<a href="#">Pages</a>
							<ul>
								<li><a href="about.html">About</a></li>
								<li><a href="why_choose_us.html">Why Choose Us</a></li>
								<li><a href="farmers.html">Farmers</a></li>
								<li><a href="gallery.html">Gallery</a></li>
							</ul><!-- /.sub-menu 
						</li> -->
						<li class:current={$page.url.pathname === 'blog'}>
							<a rel=prefetch href="/blog">Blog</a>
						</li>
						<li class:current={$page.url.pathname === 'contact'}>
							<a rel=prefetch href="/contact">Contact</a>
						</li>
					</ul>
				</div><!-- /.navbar-collapse -->

				<div class="main-nav__right">
					<div class="icon_cart_box">
						<button class="snipcart-checkout">
							<i class="icon-shopping-cart" style="font-size: 1.5rem"></i>
						</button>
					</div>
				</div>

			</div>
		</nav>
	</header>
	
</div>

<div class="side-menu__block">

	<div class="side-menu__block-overlay custom-cursor__overlay">
		<div class="cursor"></div>
		<div class="cursor-follower"></div>
	</div><!-- /.side-menu__block-overlay -->
	<div class="side-menu__block-inner flex">
		<div class="side-menu__top !justify-end">
			<a href="." class="side-menu__toggler side-menu__close-btn">
				<img loading="lazy" src="/assets/images/shapes/close-1-1.png" alt="">
			</a>
		</div><!-- /.side-menu__top -->


		<nav class="mobile-nav__container">
                <!-- content is loading via js -->
						<ul class=" main-nav__navigation-box flex flex-col">
							<li class="dropdown" class:current={$page.url.pathname === undefined}>
								<a rel=external href="/">Home</a>
							</li>
							<li class="dropdown" class:current={$page.url.pathname === 'about'}>
								<a rel=external href="/about/">About Us</a>
							</li>
							<li class="dropdown" class:current={$page.url.pathname === 'shop'}>
								<a rel=external href="/shop/">Shop<button class="dropdown-btn"><i class="fa fa-angle-right"></i></button></a>
								<ul>
									<li><a rel=external href="/shop/books/">Books</a></li>
									<li><a rel=external href="/shop/apparel">Apparel</a></li>
									<li><a >Health & Beauty</a></li>
									<li><a >Art & Imports</a></li>
								</ul><!-- /.sub-menu -->
							</li>
							<li class="dropdown" class:current={$page.url.pathname === 'blog'}>
								<a rel=external href="/blog/" >Blog<button class="dropdown-btn"><i class="fa fa-angle-right"></i></button></a>
								<!-- <ul>
									<li><a href="news.html">News</a></li>
									<li><a href="news_detail.html">News Details</a></li>
								</ul>/.sub-menu -->
							</li>
							<li class:current={$page.url.pathname === 'contact'}>
								<a rel=external href="/contact/">Contact Us</a>
							</li>
						</ul>
		</nav>
		<div class="side-menu__sep"></div><!-- /.side-menu__sep -->
		<div class="side-menu__content">
			<p><a href="mailto:info@alkebulanimages.com">info@alkebulanimages.com</a> <br> <a href="tel:615-321-4111">615 321 4111</a></p>
			<div class="side-menu__social">
				<a href="https://www.facebook.com/AlkebulanImages/"><i class="fab fa-facebook-square"></i></a>
				<a href="https://twitter.com/alkebulanimages"><i class="fab fa-twitter"></i></a>
				<a href="http://www.instagram.com/alkebulanimages"><i class="fab fa-instagram"></i></a>
				<a href="https://www.pinterest.com/alkebulanimages"><i class="fab fa-pinterest"></i></a>
			</div>
		</div><!-- /.side-menu__content -->
	</div><!-- /.side-menu__block-inner -->
</div><!-- /.side-menu__block -->