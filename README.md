# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Live Analytics Setup (4 YouTube Channels)

1. Copy `.env.example` to `.env.local`.
2. Fill these values:
- `VITE_YOUTUBE_API_KEY`
- `VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_PODCAST_ID`
- `VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_ID`
- `VITE_YOUTUBE_CHANNEL_DAFF_PODCAST_ID`
- `VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_NEWS_ID`
3. Run `npm run dev`.

Optional:
- Set `VITE_ANALYTICS_API_URL` if you already have your own backend endpoint that returns merged analytics.
- If `VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_ID` is empty, app will use `VITE_YOUTUBE_CHANNEL_ID` as fallback.
