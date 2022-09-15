import DOMParser from "dom-parser";
const parser = new DOMParser();

async function getRankings() {
    const x = await fetch(`https://www.vlr.gg/rankings`)

    if (x.status === 404) return {
        code: 404,
        message: "Page not found"
    }

    const data = await x.text()

    const html = parser.parseFromString(data, "text/html");

    const TBD = "TBD";
    const NotAvailable = "Not Available";
    const Unknown = "Unknown";

    const cols: any[] = html.getElementsByClassName('world-rankings-col');
    const cols__parsed = parser.parseFromString(cols.map(x => x.outerHTML).join(""), "text/html")
    const table__labels = cols__parsed.getElementsByClassName('wf-label');

    const tables = [];

    for (let i = 0; i < cols.length; i++) {
        const col = cols[i];

        const cards__parsed = parser.parseFromString(col.outerHTML, "text/html");
        const cards = cards__parsed.getElementsByClassName('wf-card');

        const __cards = [];

        for (let e = 0; e < cards.length; e++) {
            const card = cards[e];
            const card__parsed = parser.parseFromString(card.outerHTML, "text/html");

            const anchor = card__parsed.getElementsByTagName('a')[0];

            const td_rank = card__parsed.getElementsByClassName('rank-item-rank')[0];
            const td_team = card__parsed.getElementsByClassName('rank-item-team')[0];
            const td_rating = card__parsed.getElementsByClassName('rank-item-rating')[0];

            const rank = td_rank?.textContent.trim();
            const name = td_team?.attributes.find(x => x.name === "data-sort-value")?.value;
            const rating = td_rating?.textContent.trim();
            const link = anchor?.attributes?.find(x => x.name === "href")?.value;

            if (name) __cards.push({
                name,
                rank,
                rating,
                link
            });
        }
        console.log(__cards)
        tables.push(__cards);
    }

    const regions = table__labels.map(a => a.textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim())

    const cache = [];

    for (let i = 0; i < regions.length; i++) {
        cache.push({
            region: regions[i],
            teams: tables[i]
        });
    }

    return {
        data: cache
    }
}

export async function get({ params }) {
    try {
        var results = await getRankings();
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