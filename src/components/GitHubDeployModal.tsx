import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, FileCode, Sparkles } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [copiedViteConfig, setCopiedViteConfig] = useState(false);

  if (!isOpen) return null;

  const githubActionsYaml = `name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const viteConfigSnippet = `// vite.config.ts
// If your GitHub repository is named "portfolio", add base: '/portfolio/'
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/<REPO_NAME>/' : '/',
  // ...
});`;

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(githubActionsYaml);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  const handleCopyVite = () => {
    navigator.clipboard.writeText(viteConfigSnippet);
    setCopiedViteConfig(true);
    setTimeout(() => setCopiedViteConfig(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Github className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-display text-neutral-100">
              GitHub Pages Deployment Guide
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-sm font-body">
          <p className="text-neutral-300 leading-relaxed">
            This portfolio is built with zero server runtime requirements, making it 100% turnkey to deploy for free on <strong className="text-neutral-100">GitHub Pages</strong> or <strong className="text-neutral-100">Vercel</strong>.
          </p>

          {/* 3 Step Protocol */}
          <div className="space-y-4">
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>Step 1: Push Code to GitHub</span>
              </div>
              <p className="text-xs text-neutral-300">
                Initialize a Git repository and push this codebase to your personal GitHub account.
              </p>
              <div className="bg-neutral-900 p-2.5 rounded font-mono text-[11px] text-neutral-300 space-y-1">
                <p>git init && git add .</p>
                <p>git commit -m "feat: upgrade portfolio"</p>
                <p>git remote add origin https://github.com/&lt;your-username&gt;/portfolio.git</p>
                <p>git push -u origin main</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>Step 2: Enable GitHub Pages in Repo Settings</span>
              </div>
              <p className="text-xs text-neutral-300">
                In your GitHub repository, navigate to <strong className="text-white">Settings → Pages</strong>, then under <strong className="text-white">Build and deployment &gt; Source</strong>, choose <strong className="text-amber-400">GitHub Actions</strong>.
              </p>
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span>Step 3: Automated Workflow (.github/workflows/deploy.yml)</span>
                <button
                  onClick={handleCopyWorkflow}
                  className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedWorkflow ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy YAML</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-300">
                This repository already includes <code className="text-amber-300">.github/workflows/deploy.yml</code>. Whenever you push to <code className="text-neutral-200">main</code>, GitHub Actions builds and publishes your site automatically!
              </p>
              <div className="bg-neutral-900 p-3 rounded font-mono text-[10px] text-neutral-300 max-h-48 overflow-y-auto leading-relaxed">
                <pre>{githubActionsYaml}</pre>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800 text-xs text-neutral-400 font-mono flex items-center justify-between">
            <span>Free hosting with custom domains supported</span>
            <span className="text-emerald-400">Zero maintenance costs</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors font-mono"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
