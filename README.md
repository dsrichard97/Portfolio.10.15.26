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

## Deploying to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: upgrade portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your portfolio!
