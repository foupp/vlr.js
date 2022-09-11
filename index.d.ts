enum ValueTypes {
    NotAvailable = 'Not Available',
    Unknown = 'Unknown',
    TBD = 'TBD',
}

type Matches = {
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
    live: 0 | 1 | boolean;
}[] | { code: number, status: string }

type Match = {
    teams: Array<{ name: string; link: string; }>;
    notes: string[];
    maps: Array<"Pearl" | "Ascent" | "Fracture" | "Breeze" | "Haven" | "Icebox" | "Split"> | ValueTypes.Unknown;
    patch: string | ValueTypes.Unknown;
    winner: string | ValueTypes.TBD;
    time: string;
    status: "Live" | "Upcoming" | ValueTypes.Unknown;
    vods: {
        fullmatch: string;
        maps: {
            1: string;
            2: string;
            3: string;
        } | ValueTypes.NotAvailable;
    } | ValueTypes.NotAvailable;
    event: {
        name: string | ValueTypes.Unknown;
        series: string;
        image: string;
        link: string;
    }
} | { code: number, status: string };

declare class VLR {
    getMatch(path: string): Promise<Match>;
    getMatches(): Promise<Matches>;
    getMatchResults(page?: number | string): Promise<Match>;
}

export default VLR;