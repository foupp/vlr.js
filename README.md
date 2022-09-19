<div align="center">
  <br />
  <p>
    <a href="https://vlr.js.org"><img src="https://i.ibb.co/bsDwFD4/vlrjs-banner.png" width="546" alt="vlr.js" /></a>
  </p>
  <br />
  <p>
     <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="MIT License" />
     <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/vlr.js?style=flat-square" alt="Bundle Size">
     <img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/vlrjs/vlr.js?style=flat-square" alt="Latest Version">
     <br />
      <br />
     <h3>Get live information from <a href="https://www.vlr.gg/">vlr.gg</a>
  </p>
</div>


## Installation

### **Node v12.22.12 or above is required**
```bash
npm install vlr.js
```

## Example

```typescript
import vlr from 'vlr.js'

const match = vlr('/6');
const forum = vlr('/1');
const team = vlr('/team/2');
const player = vlr('/player/9');
const rankings = vlr('/rankings');

console.log({
    match,
    forum,
    team,
    player,
    rankings
});
```

## API Reference

### getPage(path)

\*default function\*<br />
__path:__ String - Any path found from [vlr.gg](https://www.vlr.gg/)

### getMatches()

Get live match and upcoming matches from [vlr.gg/matches](https://www.vlr.gg/matches)

### getMatcheResults(page)

__page:__ String/Integer (**optional**) - Specific page number to search matches

### Error Response

```ts
{ code: number, message: string }
```

---

## Roadmap

- Add specific rank pages
