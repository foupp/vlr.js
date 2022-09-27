export enum Fillers {
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

interface MatchData {
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

interface PlayerData {
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

interface EventData {
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

declare interface Error { code: number, status: string }

interface TeamData {
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

interface ForumData {
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

export interface Match {
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

export interface Player {
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

export interface Team {
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

export interface Forum {
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

export interface Rankings {
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

export interface Matches {
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

export interface MatchResults {
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

export interface Events {
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

export interface Event {
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

export interface Players {
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

/**
 * Get upcoming, completed, and ongoings events [vlr.gg/events](https://www.vlr.gg/events)
 * @param region Get events from a specific region
 */
export function getEvents(region?: string): Promise<Events | Error>;

/**
 * View information on a specific event
 * @param id The ID of the event (ex. `/1`)
 */
export function getEvent(id: number | string): Promise<Event | Error>;

/**
 * View all personal that either rostered or free [vlr.gg/players/others](https://www.vlr.gg/players/others)
 */
export function getPlayers(): Promise<Players | Error>;

/**
 * View information on a specific player
 * @param id The ID of the player (ex. `/1`)
 */
export function getPlayer(id: number | string): Promise<Player | Error>;