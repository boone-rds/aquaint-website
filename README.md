# AquaINT Website

Public website and field intelligence tools for [AquaINT](https://aquaint.io).

AquaINT combines field monitoring, technology, and experienced interpretation to turn field data into practical agricultural decisions.

## Live Site

- Website: https://aquaint.io
- Field Conditions: https://aquaint.io/field-conditions

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Swiper
- Google Maps / Places
- NASA POWER
- Windy
- OpenET
- Firebase Hosting

A companion Cloudflare Worker provides protected access to OpenET:

- Repository: `aquaint-field-data`

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Or, using the local development helper:

```bash
devapp
```

The local site is typically available at:

```text
http://localhost:5173
```

## Environment Variables

Create a local `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

The Google Maps browser key should be restricted by HTTP referrer and limited to the required Google Maps Platform APIs.

Do not commit `.env` files or API credentials.

## Project Structure

```text
src/
├── components/
│   └── ConditionsSnapshot.tsx
├── pages/
│   ├── FieldConditions.tsx
│   └── FieldConditions.css
├── App.tsx
├── App.css
├── index.css
└── main.tsx

public/
├── icons/
└── images/
    ├── brand/
    └── markets/
```

## Routes

### `/`

Primary AquaINT marketing site.

Includes:

- What We Do
- Answer Better Questions
- Who We Serve
- Our Approach
- Contact
- Link to Field Conditions

### `/field-conditions`

Free agricultural field-conditions tool.

Current capabilities include:

- Windy interactive weather map
- Google Places address autocomplete
- Browser geolocation
- 7-day rainfall
- 30-day rainfall
- 60-day rainfall
- Base 50 Growing Degree Days
- Latest available monthly evapotranspiration

## Data Sources

### Windy

Provides the interactive regional weather visualization.

### NASA POWER

Provides daily precipitation and temperature data used for:

- 7-day rainfall
- 30-day rainfall
- 60-day rainfall
- Base 50 GDD calculations

### Google Maps Platform

Google Places provides address autocomplete and geographic coordinates for location-based field-condition queries.

### OpenET

Provides satellite- and model-derived monthly evapotranspiration.

OpenET requests are proxied through the separate `aquaint-field-data` Cloudflare Worker so the OpenET API key is never exposed to the browser.

The application requests the latest reasonably settled monthly ET period:

- after the 15th of the month: previous month
- on or before the 15th: two months prior

## Field Data Architecture

```text
Browser
  │
  ├── Google Places
  │       └── latitude / longitude
  │
  ├── NASA POWER
  │       ├── rainfall
  │       └── temperature / GDD
  │
  └── AquaINT Field Data Worker
          │
          └── OpenET
                  └── monthly ET
```

The companion Worker protects the OpenET API key and caches ET responses to reduce external API usage.

## Quality Checks

Before committing or deploying:

```bash
checkapp
```

This runs the project's formatting, linting, and production build checks.

## Deployment

The website is hosted with Firebase Hosting.

Deploy with:

```bash
firebase deploy --only hosting
```

Firebase project:

```text
aquaint-website
```

The site is configured as a single-page application so routes such as `/field-conditions` resolve through React Router.

## Development Workflow

Typical workflow:

```bash
devapp
```

Make and test changes, then:

```bash
checkapp
```

Commit and push with:

```bash
gship "commit message"
```

Deploy production changes with:

```bash
firebase deploy --only hosting
```

## Related Project

### AquaINT Field Data

`aquaint-field-data`

A Cloudflare Worker providing protected backend access to field-data APIs used by this website.

Current endpoint:

```text
GET /et?lat={latitude}&lon={longitude}
```

Current upstream source:

- OpenET Ensemble monthly evapotranspiration

## Brand

Primary AquaINT colors:

```text
Aqua        #10BCEB
Aqua Dark   #079FD0
Indigo      #35359C
Dark Indigo #1D234F
Gold        #D5A21F
Navy        #10242D
```

Brand assets are located under:

```text
public/images/brand/
```

## License

Private project for Aqua Intelligence, LLC.
