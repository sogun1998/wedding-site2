/**
 * Proxy API để bypass CORS khi gọi Google Apps Script.
 * Cập nhật SCRIPT_URL khi bạn thay đổi deployment Google Apps Script.
 */
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_API || 'https://script.google.com/macros/s/AKfycbzY1b7FM9uN8JinqA1Ey85v1AM0xyLn_sC4p-B2Xgyw0c46ILMT1klXU2H_GeLjdkCE/exec';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(SCRIPT_URL);
      const data = await response.text();
      Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
      res.setHeader('Content-Type', 'application/json');
      return res.status(response.status).send(data);
    }

    if (req.method === 'POST') {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.text();
      Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
      res.setHeader('Content-Type', 'application/json');
      return res.status(response.status).send(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Proxy error:', error);
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(500).json({ error: error.message });
  }
}
