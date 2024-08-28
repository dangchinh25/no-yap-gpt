This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

<img width="1759" alt="image" src="https://github.com/user-attachments/assets/0859da99-85a4-49d0-bce2-da60ef21d332">

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

## TODO

- How to store user variable effectively
- Chat interface instead of 1 off call
- Can we stream => Not sure why sometimes we miss content being sent back
- Support anthropic
