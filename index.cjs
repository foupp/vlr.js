const { Client } = require('undici');

const Cli = new Client('https://vlr-js.vercel.app');

module.exports = async function getPage(path) {
    const res = await request(url(path));
    return res.body.json();
}
module.exports = async function getMatches() {
    const res = await request(url('/matches'));
    return res.body.json();
}
module.exports = async function getMatchResults(page) {
    const res = await request(url('/matches/results' + page !== undefined ? `/${page}` : null));
    return res.body.json();
}