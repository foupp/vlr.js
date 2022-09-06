
# vlr.js

Unofficial API for [vlr.gg](https://www.vlr.gg/) (Valorant esports coverage)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
## Feedback

If you have any feedback, please reach out to us at support@marill.one.


## Installation

Install `vlr.js` with npm

```bash
  npm install vlr.js
```
    
## Usage

```javascript
import vlr from 'vlr.js'

const VLR = new vlr()

console.log(VLR.getMatch('130621'))
```
#### Console:
```bash
{
    teams: [
        {
            name:"Paper Rex",
            link:"https://vlr.gg/team/624/paper-rex"
        },
        {
            name:"Team Liquid",
            link:"https://vlr.gg/team/474/team-liquid"
        }
    ],
    notes: ["1d 11h","Bo3"],
    maps: [],
    vods: {
        maps: {}
    },
    patch: "5.04",
    time: "Wednesday, September 7th - 10:00 AM EDT",
    status: "Upcoming",
    event: {
        name: "Valorant Champions 2022",
        series: "Group Stage: Decider (A)",
        image: "https//owcdn.net/img/63067806d167d.png",
        link: "https://vlr.gg/event/1015/valorant-champions-2022/group-stage"
    }
}
```


## API Reference
URL: `https://vlr-js.vercel.app/`

#### Get all matches


```http
  GET /matches
```

#### Get match results

```http
  GET /matches/results
```

| Parameter | Type     | Description                       | Required |
| :-------- | :------- | :-------------------------------- | :------- |
| `page`      | `string` | Specific match page | No |

#### getMatch(path)

`path:` string

Get specific match from API

Returns:
```ts
{
    teams: Array<{ name: string; link: string; }>;
    notes: string[];
    maps: Array<"Pearl", "Ascent", "Fracture", "Breeze", "Haven", "Icebox", "Split">;
    patch: string;
    winner: string | undefined;
    time: string;
    vods: {
        fullmatch: string | undefined;
        maps: {
            1: string | undefined;
            2: string | undefined;
            3: string | undefined;
        }
    } | {};
    event: {
        name: string;
        series: string;
        image: string;
        link: string;
    }
}
```

#### getMatches()

Get recent matches from API

Returns:
```ts
Array<{
    date: string;
    teams: string[];
    time: string;
    event: string;
    status: "Upcoming" | "LIVE";
    series: string;
    eta: string;
    live: 0 | 1 | boolean;
}>
```

#### Error Response
```ts
{ code: 404, status: 'No match information found.' } | {}
```


## Roadmap

- Additional API Endpoints


## Support

For support, email support@marill.one.

