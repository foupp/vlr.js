import DOMParser from "dom-parser";
const parser = new DOMParser();

export enum PageType {
    Forum = 1,
    Match = 2,
    Team = 3,
    Player = 4
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

async function getTeam(id: string) {

    const x = await fetch(`https://www.vlr.gg/team/${id}`)

    if (x.status === 404) return {
        code: 404,
        message: "Page not found"
    }

    const data = await x.text()

    const html = parser.parseFromString(data, "text/html");

    const TBD = "TBD";
    const NotAvailable = "Not Available";
    const Unknown = "Unknown";

    const name = html.getElementsByClassName("wf-title")[0].textContent;
    const links = html.getElementsByClassName("team-header-links")[0];

    const a = links.innerHTML.match(/\<a href=(.*?).*\>\s*(.*?)\s*\<\/a\s*?\>|/g).filter(x => x.length > 0).join("")
    const b = parser.parseFromString(a, "text/html");
    const c = b.getElementsByTagName("a");
    const d = [];
    for (let i = 0; i < c.length; i++) {
        const href = c[i].attributes.find(x => x.name === "href");
        d.push(href.value)
    }

    const aliases = html.getElementsByClassName('team-roster-item-name-alias').map(x => x.textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim());
    const realnames = html.getElementsByClassName('team-roster-item-name-real').map(x => x.textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim());

    const e = [];

    for (let i = 0; i < aliases.length; i++) {
        e.push({
            alias: aliases[i],
            name: realnames[i]
        })
    }

    const cache = {
        name: name || NotAvailable,
        rank: parseInt(html.getElementsByClassName('rank-num')[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim()),
        country: html.getElementsByClassName('team-header-country')[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
        region: html.getElementsByClassName('rating-txt')[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
        winnings: html.getElementsByTagName('span').find(x => x.attributes.find(a => a.name === "style" && a.value === `font-size: 22px; font-weight: 500;`)).textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
        roster: e,
        links: d,
    };

    return {
        type: PageType.Team,
        data: cache
    }
}

export async function get({ params }) {
    try {
        var results = await getTeam(params.id);
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