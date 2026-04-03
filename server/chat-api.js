import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = Number(process.env.CHAT_API_PORT || 8787);
const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const apiKey = process.env.GROQ_API_KEY;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const inMemoryRateLimit = new Map();

const getClientIp = (req) => req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

const isRateLimited = (ip) => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 15;

  const history = inMemoryRateLimit.get(ip) || [];
  const fresh = history.filter((ts) => now - ts < windowMs);

  if (fresh.length >= maxRequests) {
    inMemoryRateLimit.set(ip, fresh);
    return true;
  }

  fresh.push(now);
  inMemoryRateLimit.set(ip, fresh);
  return false;
};

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model });
});

app.post('/api/chat', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GROQ_API_KEY in server environment.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  if (messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  const systemPrompt = {
    role: 'system',
    content:
      'You are Talha\'s portfolio assistant. Help visitors understand Talha\'s cybersecurity, cloud, and IT services. Keep responses concise, professional, and clear. If asked to contact, suggest LinkedIn.',
  };

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 500,
        messages: [systemPrompt, ...messages],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: `Provider error: ${text}` });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'No response generated.';

    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Chat API server running on http://localhost:${port}`);
});
