This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, create your own OpenAI API key and put it in as environment variable

```bash
cp .env.example .env.production

# Put your API key in .env.production
```

If you want to see make your own change or see live update, run the development server. This will create a dev build instead of a production build under `build/<...>-dev`

```bash
pnpm run dev
```

If you want to use as is, this will create a production build under `build/<...>-prod`

```bash
pnpm run build
```

Follow this to load your build into Chrome: https://docs.plasmo.com/framework#loading-the-extension-in-chrome
