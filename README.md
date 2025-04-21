# GoogleFlight-like App

A frontend app which act like a miniature of Google Flight.
This fetch data from https://rapidapi.com/apiheya/api/sky-scrapper.

## Project Structure

### Folder Structure

```
/public         /* Assets that's not compiled, directly accessible through `http://{host}/{files-inside-public-folder}` */
/src
-- /assets          /* Assets which compiled */
-- /common          /* Common files used app-wide */
-- /lib             /* Utility & helper
---  /dummy         /* Dummy data */
---  /services      /* Utility functions related to external service /*
---  /types         /* Typescript's common types definition */
---  /utils         /* Utility helper functions  */
-- /pages           /* React components for our pages */
```

### Root Files

Root files :
- `index.html` : Entry HTML file
- `eslint.config.js` : Configuration for ESLINT (lint)
- `vite.config.js` : Configuration for Vite
- `tsconfig.json` : Configuration for Typescript, along with `tsconfig.app.json` and `tsconfig.node.json`
- `.env` : Environment variable (you need to add this file yourself as this is not committed to Git)

Root files inside `/src` :
- `main.ts` : Entry main script
- `AppRoutes.tsx` : Our routing

## Main Stacks & Libraries

- React
- Material UI
- Typescript
- Jotai : State management
- React Router : Frontend routing
- Vite : Frontend bundler & local development server
- Dayjs : Date manipulation
- Lodash : Utility helper

## How to Reproduce

1. Clone the project
2. Run `npm install` inside the project folder
3. Create a `.env` file contains the following variable : `VITE_RAPID_API_KEY` with API Key from RapidAPI
4. Run `npm run dev`
5. Open `http://localhost:5173` in browser