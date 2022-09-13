const { Client } = require('undici');
const Cli = new Client('https://vlr-js.vercel.app');

module.exports = async function getPage(path) {
    const res = await Cli.request({
        method: 'GET',
        path
    });
    return {
        data: res.body.json()
    }
}
module.exports = async function getMatches() {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches'
    });
    return {
        type: 1,
        data: res.body.json()
    }
}
module.exports = async function getMatchResults(page) {
    const res = await Cli.request({
        method: 'GET',
        path: '/matches/results'
    });
    return {
        type: 1,
        data: res.body.json()
    }
}