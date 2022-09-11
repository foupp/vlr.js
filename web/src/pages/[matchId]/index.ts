import DOMParser from "dom-parser";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const Maps = /Pearl|Fracture|Split|Bind|Ascent|Haven|Icebox|Breeze/g;

async function getMatch(matchId: string) {
    const parser = new DOMParser();

    if (parseInt(matchId) < 6) return {
        code: 404,
        message: "Match not found"
    }

    const x = await fetch(`https://www.vlr.gg/${matchId}`)

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

    const series = html.getElementsByClassName("match-header-event-series")[0]?.textContent?.replace(/(\r\n|\n|\r|\t)/gm, '')?.trim()
    const link = html.getElementsByClassName("match-header-event")[0]?.attributes?.find(({ name }) => name === "href")?.value;

    const TBD = "TBD";
    const NotAvailable = "Not Available";
    const Unknown = "Unknown";

    const cache = {
        teams: [],
        notes: [],
        maps: [],
        vods: {
            fullmatch: "Not Available",
            maps: {
                1: "Not Available",
                2: "Not Available",
                3: "Not Available",
            }
        },
        winner: TBD,
        patch: NotAvailable,
        time: "",
        status: NotAvailable,
        event: {
            name: NotAvailable,
            series: series || Unknown,
            image: Unknown,
            link: link ? 'https://vlr.gg' + link : Unknown,
        }
    };

    if (date.length > 0) {
        for (let i = 0; i < date.length; i++) {
            const text = date[i].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
            if (text && (/(\d+\.)?(\d+\.)?(\*|\d+)$/g).test(text)) cache.patch = text.match(/(\d+\.)?(\d+\.)?(\*|\d+)$/g)[0];
        }
    }

    if (teams.length > 0) {
        for (let i = 0; i < teams.length; i++) {
            const text = teams[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
            if (!text) return;
            cache.teams[i] = {
                name: Unknown,
                link: Unknown,
            }
            cache.teams[i].name = text;
        }
    }

    if (note.length > 0) {
        for (let i = 0; i < note.length; i++) {
            const text = note[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
            if (!text) return;
            cache.notes.push(text);
            cache.notes = cache.notes.filter(onlyUnique);
        }
    }

    if (divs.length > 0) {
        for (var i = 0; i < divs.length; i++) {
            const div = divs[i];
            if (!div) return;
            const style = div.attributes.find(({ name }) => name === "style");
            if (style && style.value === "font-weight: 700;") cache.event.name = div.textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
        }
    }

    if (images.length > 0) {
        for (var i = 0; i < images.length; i++) {
            const img = images[i];
            if (!img) return;
            const style = img.attributes.find(({ name }) => name === "style");
            if (style && style.value === "height: 32px; width: 32px; margin-right: 6px;") cache.event.image = 'https' + img.attributes.find(({ name }) => name === "src").value;
        }
    }

    if (times.length > 0) {
        for (let i = 0; i < times.length; i++) {
            const text = times[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
            if (!text) return;
            if (i === 0) {
                cache.time += text;
            } else if (i === 1) {
                cache.time += ` - ${text}`;
            }
        }
    }

    if (score.length > 0) {
        for (let i = 0; i < score.length; i++) {
            if (i == 0) {
                const text = score[i].textContent.replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                if (!text) return;
                const scores = text.split(":");
                if (parseInt(scores[0]) === 2) cache.winner = cache.teams[0];
                else cache.winner = cache.teams[1];
            }
        }
    }

    if (teamLink.length > 0 && teams.length > 0) {
        for (let i = 0; i < teamLink.length; i++) {
            if (cache.teams[i].name !== TBD) {
                if (!teamLink[i].attributes.find(({ name }) => name === "href")) return;
                cache.teams[i].link = 'https://vlr.gg' + teamLink[i].attributes.find(({ name }) => name === "href").value;
            }
        }
    }

    if (headerNote.length > 0) {
        for (let i = 0; i < headerNote.length; i++) {
            const text = headerNote[i].textContent.replace(/(\r\n|\n|\r)/gm, '').trim();
            if (!text) return;
            const raw = text.split(/((?:^|\W)(?:$|\W))/g)
            let pick = raw.filter(x => (x.includes('pick') || x.includes('remains'))).join(" ");
            pick = pick.match(/Pearl|Fracture|Split|Bind|Ascent|Haven|Icebox|Breeze/g);

            cache.maps = pick;
        }
    }  

    if (vods.length > 0) {
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
                        cache.vods.maps[1] = vods[i].attributes?.find(({ name }) => name === "href")?.value;
                        vod++;
                        break;
                    }
                    case 3: {
                        cache.vods.maps[2] = vods[i].attributes?.find(({ name }) => name === "href")?.value;
                        vod++;
                        break;
                    }
                    case 4: {
                        cache.vods.maps[3] = vods[i].attributes?.find(({ name }) => name === "href")?.value;
                        vod++;
                        break;
                    }
                }
            }
        }
    }

    // Change status based on winner or added 'LIVE' note to page
    if (cache.winner !== TBD) cache.status = "Complete";
    else if (cache.notes.includes("LIVE")) cache.status = "Live";
    else if (!cache.notes.includes("LIVE")) cache.status = "Upcoming";
    else cache.status = Unknown;

    // Check if any VODS are listed on vlr.gg
    const vodsExist = Object.values(cache.vods).filter(x => {
        if (typeof x === 'string' && x === NotAvailable) return false;
        else if (typeof x === 'object') return Object.values(x).filter(y => y === NotAvailable).length === 0;
        else return true;
    }).length === 0;
    const mapVodsExist = Object.values(cache.vods.maps).filter(x => x === NotAvailable).length === 0;

    if (vodsExist) cache.vods = NotAvailable as any;
    if (cache.vods.fullmatch === NotAvailable) cache.vods.fullmatch = NotAvailable as any;
    if (mapVodsExist) cache.vods.maps = NotAvailable as any;
    if (cache.event.name === TBD) cache.event.name = Unknown as any;
    if (cache.patch === TBD) cache.patch === Unknown as any;
    if (cache.maps.length < 1) cache.maps = Unknown as any;
    
    console.log(cache);

    return cache
}

export async function get({ params }) {
    try {
        const id = params.matchId;

        const results = await getMatch(params.matchId);
        if (!results) return new Response(JSON.stringify({ code: 404, message: 'No match information found.' }), {
            status: 404,
            statusText: 'No match information found.'
        });
        return new Response(JSON.stringify(results), {
            status: 200
        });
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({
            code: 500,
            message: error.message
        }), {
            status: 500,
            statusText: error.message
        });
    }
}