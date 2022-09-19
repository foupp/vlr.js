import { Client } from 'undici'

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError"; 
  }
}

const Cli = new Client('https://vlr-js.vercel.app');

export default async function getPage(path) {
    if (!path) throw Error("Path parameter is required!")
    if (!path.startsWith('/')) throw new ValidationError("Path parameter must start with a forward slash --> /")
        
    const res = await Cli.request({
        method: 'GET',
        path
    });
    try {
        const r = await res.body.json();
        if (r.error) return r;
        return {
            type: r.type,
            data: r.data,
        isForum: () => r.type === 1,
        isMatch: () => r.type === 2,
        isTeam: () => r.type === 3,
        isPlayer: () => r.type === 4,
        isRankings: () => r.type === 5,
        }
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
export async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    try {
        const r = await res.body.json()
        if (r.error) return r;
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
export async function getMatchResults(page) {
    if (isNaN(parseInt(page))) throw new ValidationError("Page parameter must be a number")
    if (typeof page === "number" && page < 1) throw new ValidationError("Page parameter must be number greater than 0")
        
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results/',
        query: {
            page: page || 1
        }
    });
    try {
        const r = await res.body.json()
        if (r.error) return r;
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        try {
            const r = await res.body.text();
            if (r) console.error(r)
            else throw e;
        } catch (_e) {
            throw _e;
        }
    }
}