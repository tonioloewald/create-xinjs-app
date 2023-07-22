# XinJS Bun App

This is a single-page application project template using [XinJS](https://xinjs.net) and [Bun](https://bun.sh/). Run the following commands to get started.

```sh
npx create-xinjs-app your-app-name
cd your-app-name
bun install
```

Because this isn't a pure `bun` workflow, the `create.js` script doesn't run `bun install` for you.

```sh
bun run dev
```

Then open http://localhost:3000 with your browser to see the result.

This bundles `src/index.ts` and starts a development server that serves from the `public` and `build` directories. When the incoming request to `localhost:3000/` comes in, the following exchange occurs:

- The server returns `public/index.html`.
- The browser renders this HTML, which contains a `script` tags with `src="/index.js"`. The browser requests this file.
- The server checks for this file, first in `public` (no match) then in `build`. It finds `build/index.js` and returns it to the browser.
- This file renders the React component in `src/App.tsx` inside the `div#root` element. The app is now ready to accept user input.

Start building your app by editing `src/index.ts`.
