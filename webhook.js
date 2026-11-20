export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const expectedKey = process.env.WEBHOOK_SECRET || process.env.WEBHOOK_API_KEY;
  const receivedKey =
    req.headers['x-api-key'] ||
    req.headers['x-webhook-secret'] ||
    req.headers['authorization']?.replace(/^Bearer\s+/i, '');

  if (expectedKey && receivedKey !== expectedKey) {
    return res.status(401).json({ ok: false, error: 'Invalid API key' });
  }

  // یہاں خودکار لاجک (جیسے Base / 8453 ٹریکنگ یا لاگنگ) چلتی ہے
  const eventPayload = req.body;

  return res.status(200).json({
    ok: true,
    receivedAt: new Date().toISOString(),
    event: eventPayload?.type || 'webhook_event',
  });
}
