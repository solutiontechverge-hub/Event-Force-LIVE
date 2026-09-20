# Event Force

Next.js frontend for Event Force.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |

## Deploy

This app is deployed on a VPS via GitHub Actions (`dev` branch push → build + PM2). Copy `.env.example` to `.env` on the server and set real values before building.
