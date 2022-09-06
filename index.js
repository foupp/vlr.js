import { request } from 'undici'

const MatchValidator = (path) => {
    if (path.includes('/')) {
        path = path.split('/');
        const id = path[0];
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
    } else {
        const id = path;
        if (isNaN(parseInt(id))) throw Error('Invalid Match ID');
    }
}

class VLR {
    async getMatch(path) {
        MatchValidator(path);

        const res = await request(`https://api.vlr.gg/match/${path}`);
    }
}

export default 'a';
module.exports = 'a';