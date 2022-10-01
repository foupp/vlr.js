<div align="center">
  <br />
  <p>
    <a href="https://vlr.js.org"><img src="https://i.ibb.co/bsDwFD4/vlrjs-banner.png" width="546" alt="vlr.js" /></a>
  </p>
</div>

## Installation

### **Node v12.22.12 or above is required**

```bash
npm install vlr.js
```

## Example

```typescript
// CommonJS
const vlr = require('vlr.js');
// ESM
import vlr, {
  getMatchResults,
  getTeam,
  getPlayer,
  getPlayers,
  getRankings,
  getEvents,
  getEvent
} from 'vlr.js';

const match = vlr('/6'); /* Match */
const matchResults = vlr.getMatchResults(); /* Match Results */
const forum = vlr('/1'); /* Forum */
const team = vlr('/team/2'); /* Team information */
const player = vlr.getPlayer(9); /* Player */
const players = vlr.getPlayers(); /* All players/staff */
const rankings = vlr.getRankings(); /* World rankings */
const events = vlr.getEvents(); /* All upcoming, ongoing and completed events */
const event = vlr.getEvent(1187); /* Specific event */

console.log({
    match,
    matchResults,
    forum,
    team,
    player,
    players,
    rankings,
    events,
    event
});
```

### Error Response

```ts
{ error: true, code: number, message: string }
```

---

## Roadmap

- Add threads and forum index
