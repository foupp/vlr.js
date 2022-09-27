import _, {
    getEvent,
    getEvents,
    getMatchResults,
    getMatches,
    getPlayer,
    getPlayers,
    getRankings
} from './index.mjs';

_('/team/2').then(() => console.log('getPage - working')).catch(() => {
    throw new Error('getPage - error');
}); /* Team */
getEvent(1089).then(() => console.log('getEvent - working')).catch(() => {
    throw new Error('getEvent - error');
}); /* Event */
getEvents().then(() => console.log('getEvents - working')).catch(() => {
    throw new Error('getEvents - error');
}); /* Events */
getMatchResults().then(() => console.log('getMatchResults - working')).catch(() => {
    throw new Error('getMatchResults - error');
});  /* Match Results */
getMatches().then(() => console.log('getMatches - working')).catch(() => {
    throw new Error('getMatches - error');
});  /* Matches */
getPlayer(9).then(() => console.log('getPlayer - working')).catch(() => {
    throw new Error('getPlayer - error');
});  /* Player */
getPlayers().then(() => console.log('getPlayers - working')).catch(() => {
    throw new Error('getPlayers - error');
});  /* Players */
getRankings().then(() => console.log('getRankings - working')).catch(() => {
    throw new Error('getRankings - error');
});  /* Rankings */