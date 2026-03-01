/**
 * Proxy API để bypass CORS khi gọi Google Apps Script.
 * Cập nhật SCRIPT_URL khi bạn thay đổi deployment Google Apps Script.
 */
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_API || 'https://script.google.com/macros/s/AKfycbzowQYnro_hCoIinNDxectBSWnRTfe3ENertGn7sXc1yQDt70Cdy-ryiKrwjnn4dY-4/exec';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function setCors(res) {
  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
}

/** Đọc body POST từ request (Vercel có thể không tự parse req.body). */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += (chunk || ''); });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(res);
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(SCRIPT_URL);
      const data = await response.text();
      setCors(res);
      res.setHeader('Content-Type', 'application/json');
      return res.status(response.status).send(data);
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (body === undefined || body === null || typeof body !== 'object') {
        const raw = await readBody(req);
        body = raw ? JSON.parse(raw) : {};
      }
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.text();
      setCors(res);
      res.setHeader('Content-Type', 'application/json');
      return res.status(response.status).send(data);
    }

    setCors(res);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Proxy error:', error);
    setCors(res);
    return res.status(500).json({ status: 500, message: error.message });
  }
};
