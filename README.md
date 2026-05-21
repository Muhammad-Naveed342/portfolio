# Muhammad Naveed Portfolio

A production-ready React portfolio built with Vite, featuring GitHub repository data loaded dynamically from the GitHub API.

## Features

- React + Vite (TypeScript)
- Dark, modern developer-style design
- Responsive layout for mobile, tablet, and desktop
- GitHub repositories fetched dynamically
- Top projects selected by stars and recent activity
- Smooth scroll and hover animations
- Ready for deployment on Vercel

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## GitHub Deployment

1. Initialize Git and push your repository:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/Muhammad-Naveed342/portfolio.git
git push -u origin main
```

2. Deploy to Vercel:

- Install the Vercel CLI or use the Vercel dashboard.
- Connect your GitHub repo.
- Set the build command to `npm run build`.
- Set the output directory to `dist`.

## Notes

- The app fetches repositories from `https://api.github.com/users/Muhammad-Naveed342/repos`.
- If you want to add a real email or LinkedIn URL, replace the placeholder contact links in `src/App.tsx`.
