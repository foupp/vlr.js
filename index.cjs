const { Client } = require('undici');
const Cli = new Client('https://vlr-js.vercel.app');

module.exports.getPage = async function getPage(path) {
    const res = await Cli.request({
        method: 'GET',
        path
    });
    return {
        data: await res.body.json()
    }
}
module.exports.getMatches = async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    return {
        type: 1,
        data: await res.body.json()
    }
}
module.exports.getMatchResults = async function getMatchResults(page) {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results'
    });
    return {
        type: 1,
        data: await res.body.json()
    }
}