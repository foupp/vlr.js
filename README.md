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
  </p>
</div>

Get live information from [vlr.gg](https://www.vlr.gg/) (Valorant esports coverage)

### *NEW*: Get all region's rankings using `.getPage('/rankings')`
 ⚠️⚠️ Some pages on [vlr.gg](https://www.vlr.gg/) may have issues when fetching data from their site ⚠️⚠️

---

## Installation

Install `vlr.js` with npm

```bash
  npm install vlr.js
```

## Usage

```javascript
import vlr from 'vlr.js'

console.log(await VLR.getMatch('130621'))
```

---

## API Reference

### getPage(path)

`path:` string or  number - The path of a match, team, player or forum on [vlr.gg](https://www.vlr.gg/) (e.g. `/130621`)

### getMatches()

Get live match and upcoming matches from [vlr.gg](https://www.vlr.gg/matches)

### getMatcheResults(page)

`page:` string or number (**optional**) - Specific page of matches to search from

### Error Response

```ts
{ code: number, message: string }
```

---

## Roadmap

- Match 'match' types (e.g. a match of `getMatches` does not have the same type as `getMatch`)
- Add specific rank pages
