export enum ValueTypes {
    NotAvailable = 'Not Available',
    Unknown = 'Unknown',
    TBD = 'TBD',
}

export enum PageType {
    Forum = 1,
    Match = 2,
    Team = 3,
    Player = 4
}

export type Matches = {
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
    live: 0 | 1 | boolean;
}[] | { code: number, status: string }

export type Match = {
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

export type Player = {
    name: string;
    alias: string;
    country: string;
    winnings: string;
    links: string[]
} | { code: number, status: string };

export type Team = {
    name: string;
    rank: number;
    country: string;
    region: string;
    winnings: string;
    roster: Array<{
        alias: string;
        name: string;
    }>;
    links: string[];
} | { code: number, status: string };

export async function getPage(path: string): Promise<{
    type: PageType,
    data: Match | Team | Player,
    isForum: () => boolean,
    isMatch: () => boolean,
    isTeam: () => boolean,
    isPlayer: () => boolean
}>;
export async function getMatches(): Promise<Matches>;
export async function getMatchResults(page?: number | string): Promise<Matches>;