[README.md](https://github.com/user-attachments/files/25366436/README.md)
# 🏛️ GRANT AI ALLIANCE MASTER

> **Grants Management Knowledge & Compliance Assistant**
> An AI-powered internal chatbot for Grants Management Units — policy-driven, compliance-focused, document-grounded.

---

## 📌 What Is This?

**Grant AI Alliance Master** is a single-page web application that functions as an internal AI compliance advisor for Grants Management Units (GMUs). It uses the Claude AI API to answer staff questions about grants processes, donor compliance, approval workflows, and documentation requirements — but **only based on documents you upload**.

It will never invent policies, guess thresholds, or fabricate rules.

---

## ✅ Core Features

| Feature | Description |
|---|---|
| 📁 Document Upload | Upload PDFs, DOCX, XLSX, TXT, PPTX files as the AI knowledge base |
| 💬 AI Chat Interface | Ask natural language questions about grants management |
| 🔒 Policy-Only Responses | AI responds only from uploaded documents |
| 📋 Structured Answers | Responses include Purpose, Roles, Steps, Compliance Tips, Risks |
| ⚡ Quick Prompts | Pre-built questions for common grants scenarios |
| 🗂️ Multi-Document Support | Upload unlimited files; knowledge base grows continuously |
| 👥 Role Intelligence | Identifies approval hierarchies from organigrams |
| ⚠️ Compliance Flags | Highlights risks and common errors |

---

## 🗂️ Repository Structure

```
grant-ai-alliance-master/
├── index.html          ← Main application (single file, self-contained)
├── README.md           ← This file
├── .env.example        ← Environment variable template
├── .gitignore          ← Files to exclude from Git
└── docs/
    ├── DEPLOYMENT.md   ← How to deploy to GitHub Pages / Netlify / Vercel
    └── USAGE_GUIDE.md  ← How staff should use the tool
```

---

## 🚀 Quick Start (Local)

### Step 1 — Clone the repository
```bash
git clone https://github.com/YOUR-ORG/grant-ai-alliance-master.git
cd grant-ai-alliance-master
```

### Step 2 — No build step needed
This is a pure HTML/CSS/JS application. Open `index.html` in any modern browser.

> ⚠️ **Important:** The Claude API is called from the browser. For production use, you must either:
> - Route calls through a backend proxy (recommended), OR
> - Use GitHub Pages with Netlify Functions / Cloudflare Workers as a proxy

### Step 3 — Configure your API key
See `docs/DEPLOYMENT.md` for how to securely configure your Anthropic API key.

---

## 📄 Document Types to Upload

| Document Type | Examples |
|---|---|
| Grants Manuals | Grants Management Manual, Field Operations Manual |
| Donor Annexes | USAID Annex, EU Grant Conditions, UNHCR Guidelines |
| Policies | Finance Policy, Procurement Policy, HR Policy |
| SOPs | Budget Modification SOP, Disbursement SOP, Closeout SOP |
| Organigrams | GMU Org Chart, Approval Authority Matrix |
| Compliance Guidelines | Internal Control Framework, Audit Requirements |
| Templates | Budget Template, Financial Report Template |

---

## 💬 Example Questions to Ask

- *"How do I process a grant budget modification?"*
- *"What costs are eligible under USAID funding?"*
- *"Who approves financial reports in the grants unit?"*
- *"What documents are required before disbursement?"*
- *"What is the escalation pathway for compliance issues?"*
- *"What are the audit documentation requirements?"*

---

## 🔐 Security Notes

- **Never commit your API key** to GitHub
- Use environment variables or a backend proxy
- See `.env.example` for configuration template
- The `.gitignore` excludes `.env` files automatically

---

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (no framework required)
- **AI Engine:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Hosting:** GitHub Pages, Netlify, Vercel, or any static host
- **Dependencies:** None (zero npm packages)

---

## 📞 Support

For internal support, contact your Grants Management Unit lead or IT administrator.

---

*Built for internal organizational use. Responses are grounded strictly in uploaded documentation.*
