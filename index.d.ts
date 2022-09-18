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

export interface Matches {
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
    live: 0 | 1 | boolean;
}

export interface Match {
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
}

export interface Player {
    name: string;
    alias: string;
    country: string;
    winnings: string | ValueTypes.NotAvailable;
    links: string[] | ValueTypes.NotAvailable
}

export interface Error { code: number, status: string }

export interface Team {
    name: string;
    rank: number | ValueTypes.NotAvailable;
    country: string;
    region: string | ValueTypes.NotAvailable;
    winnings: string | ValueTypes.NotAvailable;
    roster: Array<{
        alias: string;
        name: string;
    }> | ValueTypes.NotAvailable;
    links: string[] | ValueTypes.NotAvailable;
}

export function getPage(path: string): Promise<{
    type: PageType,
    data: Match | Team | Player | Error,
    isForum: () => boolean,
    isMatch: () => boolean,
    isTeam: () => boolean,
    isPlayer: () => boolean
}>;
export function getMatches(): Promise<Matches[]>;
export function getMatchResults(page?: number | string): Promise<Matches[]>;