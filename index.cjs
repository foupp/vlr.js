const { Client } = require('undici')
const _ = require('lodash')

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError"; 
  }
}

const Cli = new Client('https://vlr-js.vercel.app');

module.exports = async function getPage(path) {
    if (!path) throw Error("Path parameter is required!")
    if (!path.startsWith('/')) throw new ValidationError("Path parameter must start with a forward slash --> /")
        
    const res = await Cli.request({
        method: 'GET',
        path
    });
    try {
        const r = await res.body.json();
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data,
            isError: () => r.type === 0,
            isForum: () => r.type === 1,
            isMatch: () => r.type === 2,
            isTeam: () => r.type === 3,
            isPlayer: () => r.type === 4,
            isRankings: () => r.type === 5,
            isMatches: () => r.type === 6,
        }
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
module.exports.getMatches = async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        };
    } catch (e) {
        const r = await res.body.text();
        if (r) console.error(r)
        else throw e;
    }
}
module.exports.getMatchResults = async function getMatchResults(page) {
    if (page && typeof page === "number" && page < 1) throw new ValidationError("Page parameter must be number greater than 0")
    if (page && typeof page === "string" && _.isNumber(_.toNumber(page))) page = _.toNumber(page);
    else if (page) throw new ValidationError("Page parameter must be a number by itself OR a number in a string")
    
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results/',
        query: {
            page: page || 1
        }
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
        return {
            type: r.type,
            data: r.data
        }
    } catch (e) {
        throw e;
    }
}
module.exports.getRankings = async function getRankings(region) {
    if (region && typeof region !== "string") throw new ValidationError('Region is not a string');
    const res = await Cli.request({
        method: 'GET',
        path: `/rankings/${_.kebabCase(region) || ""}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
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
module.exports.getEvents = async function getEvents(region) {
    if (region && typeof region !== "string") throw new ValidationError('Region is not a string');
    const res = await Cli.request({
        method: 'GET',
        path: `/events/${_.kebabCase(region) || ""}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
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
module.exports.getPlayers = async function getPlayers() {
    const res = await Cli.request({
        method: 'GET',
        path: `/players/other`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
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
module.exports.getPlayer = async function getPlayer(id) {
    if (typeof id !== "string" && typeof id !== "number") throw new ValidationError("Parameter 'id' is not a string or number")
    const res = await Cli.request({
        method: 'GET',
        path: typeof id === "string" && id.startsWith('/') ? `/player${id}` : `/player/${id}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
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
module.exports.getEvent = async function getEvent(id) {
    if (typeof id !== "string" && typeof id !== "number") throw new ValidationError("Parameter 'id' is not a string or number")
    const res = await Cli.request({
        method: 'GET',
        path: typeof id === "string" && id.startsWith('/') ? `/event${id}` : `/event/${id}`
    });
    try {
        const r = await res.body.json()
        if (r.code && r.message) return {
            error: true,
            code: r.code,
            message: r.message
        };
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