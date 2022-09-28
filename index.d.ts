// <reference types="typescript" />

export enum Fillers {
    NotAvailable = 'Not Available',
    Unknown = 'Unknown',
    TBD = 'TBD',
}

export enum PageType {
    Error = 0,
    Forum = 1,
    Match = 2,
    Team = 3,
    Player = 4,
    Rankings = 5,
    Matches = 6,
    Event = 7,
    Events = 8,
    Players = 9,
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

type MatchData = {
    teams: Array<{ name: string; link: string; }>;
    notes: string[];
    maps: Array<"Pearl" | "Ascent" | "Fracture" | "Breeze" | "Haven" | "Icebox" | "Split"> | Fillers.Unknown;
    patch: string | Fillers.Unknown;
    winner: {
        name: string,
        link: string,
    } | Fillers.TBD;
    time: string;
    status: "Live" | "Upcoming" | "Complete" | Fillers.Unknown;
    vods: {
        fullmatch: string;
        maps: {
            1: string;
            2: string;
            3: string;
        } | Fillers.NotAvailable;
    } | Fillers.NotAvailable;
    event: {
        name: string | Fillers.Unknown;
        series: string;
        image: string;
        link: string;
    }
}

type PlayersData = Array<{
    player: {
        alias: string;
        name: string;
        position: "Player" | "Analyst" | "Manager" | "Assistant coach" | "Head coach" | "Coach" | string | Fillers.NotAvailable;
        currentTeam: {
            name: string | Fillers.NotAvailable;
            link: `/${string}`;
        };
        previousTeam: {
            name: string | Fillers.NotAvailable;
            link: `/${string}` | Fillers.NotAvailable;
        };
        social: Array<string> | Fillers.NotAvailable;
        origin: Intl.DisplayNames | string;
        winnings: `$${string}`
    }
}>;

type PlayerData = {
    name: string;
    alias: string;
    country: string;
    winnings: string | Fillers.NotAvailable;
    links: string[] | Fillers.NotAvailable
}

type EventsData = Array<{
    link: `/${string}`;
    title: string;
    status: "Completed" | "Upcoming" | "Ongoing";
    prizepool: `$${number}`;
    dates: string;
    region: string;
    thumb: `https://${string}`;
}>

type EventData = {
    title: string;
    description: string;
    dates: string;
    prize: string;
    stages: Array<{
        dates: string;
        name: string;
    }>;
    avatar: string;
    series?: string;
}

type ReqError = {
    type: 0,
    data: {
        code: number,
        message: string
    }
}

type TeamData = {
    name: string;
    rank: number | Fillers.NotAvailable;
    country: string;
    region: string | Fillers.NotAvailable;
    winnings: string | Fillers.NotAvailable;
    roster: Array<{
        alias: string;
        name: string;
    }> | Fillers.NotAvailable;
    links: string[] | Fillers.NotAvailable;
}

type ForumData = {
    author: string,
    label: string | Fillers.NotAvailable,
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

export type Match = {
    type: PageType.Match,
    data: Match,
    isForum: () => false,
    isMatch: () => true,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Player = {
    type: PageType.Player,
    data: Player,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => true,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Team = {
    type: PageType.Team
    data: TeamData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => true,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Forum = {
    type: PageType.Forum,
    data: ForumData,
    isForum: () => true,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Rankings = {
    type: PageType.Rankings,
    data: RankingsData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => true,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Matches = {
    type: PageType.Matches,
    data: MatchesData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type MatchResults = {
    type: PageType.Matches,
    data: MatchResultsData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => true,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Events = {
    type: PageType.Events,
    data: EventsData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => false,
    isEvent: () => false,
    isEvents: () => true,
    isPlayers: () => false,
}

export type Event = {
    type: PageType.Event,
    data: EventData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => false,
    isEvent: () => true,
    isEvents: () => false,
    isPlayers: () => false,
}

export type Players = {
    type: PageType.Players,
    data: PlayersData,
    isForum: () => false,
    isMatch: () => false,
    isTeam: () => false,
    isPlayer: () => false,
    isRankings: () => false,
    isMatches: () => false,
    isEvent: () => false,
    isEvents: () => false,
    isPlayers: () => true,
}

/**
 * Get information from any (soon!) page from [vlr.gg](https://www.vlr.gg)
 * @param path Path from [vlr.gg](https://www.vlr.gg) you want to fetch
 */
export default function getPage(path: `/${string}`): Promise<Match | Player | Team | Forum | Rankings | Matches  | Players | Events | Event | ReqError>;

/**
 * Get all upcoming/live matches - [vlr.gg/matches](https://www.vlr.gg/matches)
 */
export function getMatches(): Promise<Matches | ReqError>;

/**
 * Get all completed matches - [vlr.gg/matches/results](https://www.vlr.gg/matches/results)
 */
export function getMatchResults(page?: number | string): Promise<MatchResults | ReqError>;

/**
 * Get top 10 or all rankings of each region (Max 10 teams per region) [vlr.gg/rankings](https://www.vlr.gg/rankings)
 */
export function getRankings(): Promise<Rankings | ReqError>;

/**
 * Get upcoming, completed, and ongoings events [vlr.gg/events](https://www.vlr.gg/events)
 * @param region Get events from a specific region
 */
export function getEvents(region?: string): Promise<Events | ReqError>;

/**
 * View information on a specific event
 * @param id The ID of the event (ex. `/1`)
 */
export function getEvent(id: number | string): Promise<Event | ReqError>;

/**
 * View all personal that either rostered or free [vlr.gg/players/other](https://www.vlr.gg/players/other)
 */
export function getPlayers(): Promise<Players | ReqError>;

/**
 * View information on a specific player
 * @param id The ID of the player (ex. `/1`)
 */
export function getPlayer(id: number | string): Promise<Player | ReqError>;