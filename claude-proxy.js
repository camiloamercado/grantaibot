// netlify/functions/claude-proxy.js
// ════════════════════════════════════════════════════
// Serverless proxy for Anthropic Claude API
// Keeps API key server-side — never exposed to browser
// ════════════════════════════════════════════════════

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // CORS headers for your domain
  const headers = {
    'Access-Control-Allow-Origin': '*', // Restrict to your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);

    // Validate required fields
    if (!body.messages || !body.model) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: messages, model' })
      };
    }

    // Call Anthropic API with server-side key
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.error('Proxy error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal proxy error: ' + err.message })
    };
  }
};
