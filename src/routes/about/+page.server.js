import { client } from '$lib/sanity';
export async function load() {
    const about = await client.fetch('*[_type == "about"][0]')
    if (about) {
        return {
            about
        }
    }

    return {
        status: 500,
        body: new Error('No result from Sanity')
    }

}
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export const prerender = true;