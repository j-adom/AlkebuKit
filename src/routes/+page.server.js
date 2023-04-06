import { client } from '$lib/sanity';
export async function load({ params, fetch, session, stuff }) {
	const query = '*[_type == "homePage" && !(_id in path("drafts.**"))][0]'
    const homePage = await client.fetch(query)
    const {banner, section2, section3, section4} = homePage
    if (homePage) {
        return {
           banner, section2, section3, section4
            }
        }
    

    return {
        status: 500,
        body: new Error('No result from Sanity')
    }

}

export const prerender = true;