type Matches = {
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
    live: 0 | 1 | boolean;
}[] | { code: 404, status: 'No match information found.' }

type Match = {
    teams: Array<{ name: string; link: string; }>;
    notes: string[];
    maps: Array<"Pearl", "Ascent", "Fracture", "Breeze", "Haven", "Icebox", "Split">;
    patch: string;
    winner: string | undefined;
    time: string;
    vods: {
        fullmatch: string | undefined;
        maps: {
            1: string | undefined;
            2: string | undefined;
            3: string | undefined;
        }
    } | {};
    event: {
        name: string;
        series: string;
        image: string;
        link: string;
    }
} | { code: 404, status: 'No match information found.' }

MatchValidator = (path: string) => {
    if (path.includes('/')) {
        path = path.split('/');
        const id = path[0];
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
        continue;
    } else {
        const id = path;
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
        continue;
    }
}

class VLR {
    async getMatch(path: string): Promise<Match>;
    async getMatches(): Promise<Matches>;
    async getMatchResults(page?: number | string): Promise<Match>;
}

export default VLR;