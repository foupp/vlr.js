const { Client } = require('undici');
const Cli = new Client('https://vlr-js.vercel.app');

module.exports.getPage = async function getPage(path) {
    const res = await Cli.request({
        method: 'GET',
        path
    });
    const r = await res.body.json()
    return {
        type: r.type,
        data: r.data,
        isForum: () => r.type === 1,
        isMatch: () => r.type === 2,
        isTeam: () => r.type === 3,
        isPlayer: () => r.type === 4
    }
}
module.exports.getMatches = async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    const r = await res.body.json()
    return {
        type: r.type,
        data: r.data,
        isForum: () => r.type === 1,
        isMatch: () => r.type === 2,
        isTeam: () => r.type === 3,
        isPlayer: () => r.type === 4
    }
}
module.exports.getMatchResults = async function getMatchResults(page) {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results'
    });
    const r = await res.body.json()
    return {
        type: r.type,
        data: r.data,
        isForum: () => r.type === 1,
        isMatch: () => r.type === 2,
        isTeam: () => r.type === 3,
        isPlayer: () => r.type === 4
    }
}
