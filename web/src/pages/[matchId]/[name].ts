import DOMParser from "dom-parser";
import moment from "moment-timezone";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const Maps = /Pearl|Fracture|Split|Bind|Ascent|Haven|Icebox|Breeze/g;

async function getMatch(matchId: string, matchName: string) {
    const parser = new DOMParser();

    if (parseInt(matchId) < 6)return {
        code: 404,
        message: "Page not found"
    }

    const x = await fetch(`https://www.vlr.gg/${matchId}/${matchName}`)

    if (x.status === 404) return {
        code: 404,
        message: "Page not found"
    }

    const data = await x.text()

    const html = parser.parseFromString(data, "text/html");

    const divs = html.getElementsByTagName("div");
    const images = html.getElementsByTagName("img");
    const teams = html.getElementsByClassName("wf-title-med");
    const teamLink = html.getElementsByClassName("match-header-link");
    const note = html.getElementsByClassName("match-header-vs-note");
    const headerNote = html.getElementsByClassName("match-header-note");
    const times = html.getElementsByClassName("moment-tz-convert");
    const date = html.getElementsByClassName("match-header-date");
    const score = html.getElementsByClassName("js-spoiler");
    const vods = html.getElementsByTagName("a");

    let vod = 0;

    const cache = {
        teams: [],
        notes: [],
        maps: [],
        vods: {
            fullmatch: undefined,
            maps: {
                1: undefined,
                2: undefined,
                3: undefined,
            }
        },
        winner: undefined,
        patch: undefined,
        time: "",
        status: undefined,
        event: {
            name: undefined,
            series: html.getElementsByClassName("match-header-event-series")[0].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim(),
            image: undefined,
            link: 'https://vlr.gg' + html.getElementsByClassName("match-header-event")[0].attributes.find(({ name }) => name === "href").value,
        }
    }

    for (let i = 0; i < date.length; i++) {
        const text = date[i].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
        cache.patch = text.match(/(\d+\.)?(\d+\.)?(\*|\d+)$/g)[0];
    }

    for (let i = 0; i < teams.length; i++) {
        const text = teams[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
        cache.teams[i] = {}
        cache.teams[i].name = text;
    }

    for (let i = 0; i < note.length; i++) {
        const text = note[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();

        cache.notes.push(text);
        cache.notes = cache.notes.filter(onlyUnique);
    }

    for (var i = 0; i < divs.length; i++) {
        const div = divs[i];
        const style = div.attributes.find(({ name }) => name === "style");
        if (style && style.value === "font-weight: 700;") cache.event.name = div.textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
    }

    for (var i = 0; i < images.length; i++) {
        const img = images[i];
        const style = img.attributes.find(({ name }) => name === "style");
        if (style && style.value === "height: 32px; width: 32px; margin-right: 6px;") cache.event.image = 'https' +  img.attributes.find(({ name }) => name === "src").value;
    }

    for (let i = 0; i < times.length; i++) {
        const text = times[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
        if (i === 0) {
            cache.time += text;
        } else if (i === 1) {
            cache.time += ` - ${text}`;
        }
    }

    for (let i = 0; i < score.length; i++) {
        if (i == 0) {
            const text = score[i].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
            const scores = text.split(":");
            if (parseInt(scores[0]) === 2) cache.winner = cache.teams[0];
            else cache.winner = cache.teams[1];
        }
    }

    for (let i = 0; i < teamLink.length; i++) {
        cache.teams[i].link = 'https://vlr.gg' + teamLink[i].attributes.find(({ name }) => name === "href").value;
    }

    for (let i = 0; i < headerNote.length; i++) {
        const text = headerNote[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();

        const raw = text.split(/((?:^|\W)(?:$|\W))/g)
        let pick = raw.filter(x => (x.includes('pick') || x.includes('remains'))).join(" ");
        pick = pick.match(/Pearl|Fracture|Split|Bind|Ascent|Haven|Icebox|Breeze/g);

        cache.maps = pick;
    }
    

    for (let i = 0; i < vods.length; i++) {
        const style = vods[i].attributes.find(({ name }) => name === "style");

        // Full Match
        if (style && style.value === "height: 37px; line-height: 37px; padding: 0 20px; margin: 0 3px; margin-bottom: 6px; min-width: 108px; flex: 1;") {
            cache.vods.fullmatch = vods[i].attributes.find(({ name }) => name === "href").value;
            vod++;
        } else if (style && style.value === "height: 37px; line-height: 37px; padding: 0 20px; margin: 0 3px; margin-bottom: 6px; flex: 1;") {
            vod++;
            switch (vod) {
                case 2: {
                    cache.vods.maps[1] = vods[i].attributes.find(({ name }) => name === "href").value;
                    vod++;
                    break;
                }
                case 3: {
                    cache.vods.maps[2] = vods[i].attributes.find(({ name }) => name === "href").value;
                    vod++;
                    break;
                }
                case 4: {
                    cache.vods.maps[3] = vods[i].attributes.find(({ name }) => name === "href").value;
                    vod++;
                    break;
                }
            }
        }
    }

    if (cache.winner) cache.status = "Complete";
    else if (!cache.winner && cache.notes.includes("LIVE")) cache.status = "Live";
    else if (!cache.winner && !cache.notes.includes("LIVE")) cache.status = "Upcoming";

    return cache
}

export async function get({ params }) {
    try {
        const id = params.matchId;

        const results = await getMatch(params.matchId, params.name);
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