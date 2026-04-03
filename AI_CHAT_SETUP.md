# AI Chat Setup (Groq Free Tier)

This project now includes:
- Frontend chat widget in `src/App.jsx`
- Backend API server in `server/chat-api.js`

## 1) Get a free Groq API key
1. Open: https://console.groq.com
2. Create account and generate API key.

## 2) Create local env file
1. Copy `.env.example` to `.env`
2. Fill values:

```env
GROQ_API_KEY=your_real_key
GROQ_MODEL=llama-3.1-8b-instant
CHAT_API_PORT=8787
FRONTEND_ORIGIN=http://localhost:5173
```

## 3) Run locally (frontend + backend together)
```bash
npm run dev:full
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8787/api/chat`

Vite is configured to proxy `/api` to local backend in dev.

## 4) Deploy with AWS Amplify (important)
Amplify hosting for this repo is static frontend only. The backend server in `server/chat-api.js` is not auto-hosted by Amplify static hosting.

Use one of these options for backend:
- AWS Lambda + API Gateway
- Render/Railway/Fly.io small Node service

Then set frontend env variable in Amplify:
- `VITE_CHAT_API_URL=https://your-backend-domain.com/api/chat`

## 5) Security checklist
- Never commit `.env`
- Keep API key server-side only
- Add rate limits and usage monitoring
- Rotate key if exposed
