import DOMParser from "dom-parser";
const parser = new DOMParser();

export enum PageType {
    Forum = 1,
    Match = 2,
    Team = 3,
    Player = 4
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPlayer(id: string) {

    const x = await fetch(`https://www.vlr.gg/player/${id}`)

    if (x.status === 404) return {
        code: 404,
        message: "Page not found"
    }

    const data = await x.text()

    const html = parser.parseFromString(data, "text/html");

    const NotAvailable = "Not Available";

    const c = html.getElementsByTagName("a").filter(x => x.attributes.find(a => a.name === "style" && a.value === "margin-top: 3px; display: block;"));
    const d = [];
    for (let i = 0; i < c.length; i++) {
        const href = c[i].attributes.find(x => x.name === "href");
        if (href.value.length > 0) d.push(href.value)
    }

    const cache = {
        name: html.getElementsByClassName('player-real-name')[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim() || NotAvailable,
        alias: html.getElementsByClassName("wf-title")[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim() || NotAvailable,
        country: capitalizeFirstLetter(html.getElementsByClassName('ge-text-light').find(x => x.attributes.find(a => a.name === "style" && a.value === "font-size: 11px; padding-bottom: 5px; margin-top: 12px;")).textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim().toLowerCase()) || NotAvailable,
        winnings: html.getElementsByTagName('span').find(x => x.attributes.find(a => a.name === "style" && a.value === `font-size: 22px; font-weight: 500;`)).textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim() || NotAvailable,
        links: d
    };

    return {
        type: PageType.Player,
        data: cache
    }
}

export async function get({ params }) {
    try {
        var results = await getPlayer(params.id);
        if (!results) return new Response(JSON.stringify({ code: 404, message: 'No information found.' }), {
            status: 404,
            statusText: 'No information found.'
        });
        return new Response(JSON.stringify(results), {
            status: 200
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({
            code: 500,
            message: 'There was an error while fetching page information.'
        }), {
            status: 500,
            statusText: error.message
        });
    }
}