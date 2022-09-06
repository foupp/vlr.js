import { request } from 'undici'

const url = (path) => 'https://vlr-js.vercel.app' + path;

const MatchValidator = (path) => {
    if (!path.startsWith('/')) throw Error('Path must start with a forward slash (/)');
    if (path.includes('/')) {
        path = path.split('/');
        const id = path[1];
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
    } else {
        const id = path;
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
    }
}

class VLR {
    async getMatch(path) {
        MatchValidator(path);

        const res = await request(url(path));
        return res.body.json();
    }
    async getMatches() {
        const res = await request(url('/matches'));
        return res.body.json();
    }
    async getMatchResults(page) {
        const res = await request(url(`/match/results/${page ? page : 1}`));
        return res.body.json();
    }
}

export default VLR;