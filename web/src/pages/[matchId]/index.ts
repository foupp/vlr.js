import { request } from "undici";
import DOMParser from "dom-parser";
import { unescape } from "html-escaping";

async function getMatch(matchId: string) {
    const parser = new DOMParser();

    const x = await request(`https://www.vlr.gg/${matchId}`)
    const data = await x.body.text();

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function get({ params }) {
    try {
        const id = params.matchId;

        const results = await getMatch(params.matchId);
        if (!results) return new Response(JSON.stringify({ code: 404, status: 'No match information found.' }), {
            status: 404,
            statusText: 'No match information found.'
        });
        return new Response(JSON.stringify(results), {
            status: 200
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify(error), {
            status: 500,
            statusText: error.message
        });
    }
}