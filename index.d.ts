export enum FillerTypes {
    NotAvailable = 'Not Available',
    Unknown = 'Unknown',
    TBD = 'TBD',
}

export enum PageType {
    Forum = 1,
    Match = 2,
    Team = 3,
    Player = 4,
    Rankings = 5,
    Matches = 6,
}

type MatchesData = Array<{
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
}>

type MatchResultsData = Array<{
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Complete";
    series: string;
    eta: string;
}>

interface MatchData {
    teams: Array<{ name: string; link: string; }>;
    notes: string[];
    maps: Array<"Pearl" | "Ascent" | "Fracture" | "Breeze" | "Haven" | "Icebox" | "Split"> | FillerTypes.Unknown;
    patch: string | FillerTypes.Unknown;
    winner: {
        name: string,
        link: string,
    } | FillerTypes.TBD;
    time: string;
    status: "Live" | "Upcoming" | "Complete" | FillerTypes.Unknown;
    vods: {
        fullmatch: string;
        maps: {
            1: string;
            2: string;
            3: string;
        } | FillerTypes.NotAvailable;
    } | FillerTypes.NotAvailable;
    event: {
        name: string | FillerTypes.Unknown;
        series: string;
        image: string;
        link: string;
    }
}

interface PlayerData {
    name: string;
    alias: string;
    country: string;
    winnings: string | FillerTypes.NotAvailable;
    links: string[] | FillerTypes.NotAvailable
}

declare interface Error { code: number, status: string }

interface TeamData {
    name: string;
    rank: number | FillerTypes.NotAvailable;
    country: string;
    region: string | FillerTypes.NotAvailable;
    winnings: string | FillerTypes.NotAvailable;
    roster: Array<{
        alias: string;
        name: string;
    }> | FillerTypes.NotAvailable;
    links: string[] | FillerTypes.NotAvailable;
}

interface ForumData {
    author: string,
    label: string | FillerTypes.NotAvailable,
    threads: number,
    frags: number
}

type RankingsData = Array<{
    region: string;
    teams: Array<{
        name: string,
        rank: number,
        team: `/team/${number}/${string}`
    }>
}>

export interface Match {
    type: PageType.Match,
    data: Match,
    isForum: () => false,
    isMatch: () => true,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
}

export interface Player {
    type: PageType.Player,
    data: Player,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => true,
    isRankings: () => false,
    isMatches: () => true,
}

export interface Team {
    type: PageType.Team
    data: TeamData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => true,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
}

export interface Forum {
    type: PageType.Forum,
    data: ForumData,
    isForum: () => true,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
}

export interface Rankings {
    type: PageType.Rankings,
    data: RankingsData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => true,
    isMatches: () => true,
}

export interface Matches {
    type: PageType.Matches,
    data: MatchesData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
}

export interface MatchResults {
    type: PageType.Matches,
    data: MatchResultsData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
}

/**
 * Get information from any (soon!) page from [vlr.gg](https://www.vlr.gg)
 * @param path Path from [vlr.gg](https://www.vlr.gg) you want to fetch
 */
export default function getPage(path: `/${string}`): Promise<Match | Player | Team | Forum | Rankings | Matches | Error>;

/**
 * Get all upcoming/live matches - [vlr.gg/matches](https://www.vlr.gg/matches)
 */
export function getMatches(): Promise<Matches | Error>;

/**
 * Get all completed matches - [vlr.gg/matches/results](https://www.vlr.gg/matches/results)
 */
export function getMatchResults(page?: number | string): Promise<MatchResults | Error>;

/**
 * Get top 10 or all rankings of each region (Max 10 teams per region) [vlr.gg/rankings](https://www.vlr.gg/rankings)
 */
export function getRankings(): Promise<Rankings | Error>;