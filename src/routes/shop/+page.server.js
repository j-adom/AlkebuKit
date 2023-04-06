import { client } from "$lib/sanity";

export async function load() {
    const shop = await client.fetch('*[_type == "shop"][0]')
    if (shop) {
        return {
                shop
            }
        }
};
