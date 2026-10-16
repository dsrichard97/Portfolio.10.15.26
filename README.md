# Portfolio

A modern, high-performance portfolio website built with React 19, TypeScript, and Tailwind CSS. Turnkey ready for GitHub Pages or custom domain deployment.

## Features

- **Project Gallery with Deep Case Studies**: Bento grid layout, interactive category filter tabs, search, and full-screen case study modal with architecture breakdown and code snippets.
- **Interactive Engineering Blog**: Filterable essay archive with reading times, key takeaways, copyable code snippets, and clean typography.
- **Contact Form**: Direct email integration pre-populating client mailto links, accompanied by an offline message ledger in local storage.
- **Systems Architecture Sandbox**: Interactive hero topology explorer illustrating production invariants and terminal test runs.
- **GitHub Pages Turnkey Deployment**: Pre-configured GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`) and relative asset base paths in `vite.config.ts`.
- **Inline Profile Customizer**: Interactive modal to personalize bio, links, and headline statistics with instant local persistence.

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

## Deploying to GitHub Pages (`https://dsrichard97.github.io/Portfolio.10.15.26/`)

1. Commit and push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: upgrade portfolio for FP&A"
   git branch -M main
   git remote add origin https://github.com/dsrichard97/Portfolio.10.15.26.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**
   - Under **Build and deployment > Source**, select **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your portfolio in ~1–2 minutes!
4. Once completed, your live portfolio will be available at:
   **https://dsrichard97.github.io/Portfolio.10.15.26/**
