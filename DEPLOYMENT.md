# 🚀 DEPLOYMENT GUIDE — Grant AI Alliance Master

This guide covers multiple deployment options from simplest to most secure.

---

## ⚡ Option A: GitHub Pages (Simplest — for internal/trusted staff only)

> Best for: Small teams where staff can be trusted with a shared API key via Netlify/Cloudflare proxy.

### Step 1 — Fork or create the repository
1. Go to github.com and sign in
2. Create a new repository named `grant-ai-alliance-master`
3. Upload all files from this package

### Step 2 — Enable GitHub Pages
1. In your repository, click **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select `Deploy from a branch`
4. Choose branch: `main`, folder: `/ (root)`
5. Click **Save**
6. Wait 2–5 minutes, then visit: `https://YOUR-USERNAME.github.io/grant-ai-alliance-master`

> ⚠️ GitHub Pages hosts your frontend. The API key must be handled via a proxy (see Option C).

---

## ⚡ Option B: Netlify (Recommended — Free tier, easy setup)

### Step 1 — Connect repository
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **Add new site → Import an existing project**
3. Connect your GitHub account
4. Select the `grant-ai-alliance-master` repository
5. Leave build settings as defaults (no build command needed)
6. Click **Deploy site**

### Step 2 — Add Netlify Function as API Proxy (Secure)
This keeps your API key server-side and out of the browser.

Create file: `netlify/functions/claude-proxy.js`

```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

### Step 3 — Set environment variable in Netlify
1. Go to **Site settings → Environment variables**
2. Click **Add a variable**
3. Key: `ANTHROPIC_API_KEY`
4. Value: Your key from [console.anthropic.com](https://console.anthropic.com)
5. Click **Save**

### Step 4 — Update index.html to use proxy
In `index.html`, find the fetch call and change:
```javascript
// FROM:
const response = await fetch('https://api.anthropic.com/v1/messages', {

// TO:
const response = await fetch('/.netlify/functions/claude-proxy', {
```
Also remove the `anthropic-version` and `x-api-key` headers from the fetch call in the browser.

---

## ⚡ Option C: Vercel (Alternative to Netlify)

### Step 1 — Connect repository
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `grant-ai-alliance-master` repository
4. Click **Deploy**

### Step 2 — Add Vercel Serverless Function
Create file: `api/claude-proxy.js`

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

### Step 3 — Set environment variable in Vercel
1. Go to your project → **Settings → Environment Variables**
2. Add `ANTHROPIC_API_KEY` with your API key value
3. Redeploy

### Step 4 — Update index.html to use proxy
Change the API fetch URL to `/api/claude-proxy`

---

## 🔐 Security Best Practices

| Practice | Why |
|---|---|
| Use a proxy function | Keeps API key out of browser |
| Restrict repository to private | Prevents code exposure |
| Add HTTP Basic Auth via Netlify | Limits access to staff only |
| Rotate API keys regularly | Reduces breach risk |
| Monitor API usage in Anthropic console | Detect unexpected usage |

---

## 🌐 Access Control (Optional)

To restrict the tool to staff only, use Netlify Identity or Vercel Authentication:

**Netlify Identity (Free):**
1. In Netlify → **Identity → Enable Identity**
2. Set registration to **Invite only**
3. Under **Git Gateway**, enable it
4. In site settings → **Access control → Visitor access**: Password protection or JWT

---

## 📦 File Upload in Production

The current implementation reads files client-side (in the browser). For larger organizations, consider:
- Storing uploaded documents in **Supabase Storage** or **AWS S3**
- Using a vector database (Pinecone, Weaviate) for semantic search across large document sets
- Adding a backend parser for better PDF text extraction

---

*For technical support, contact your IT administrator.*
