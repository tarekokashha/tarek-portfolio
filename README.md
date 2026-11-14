# tarek-portfolio

My personal site. Robotics work, AI systems and the software I ship for clients.

**Live:** [tarek-portfolio-phi.vercel.app](https://tarek-portfolio-phi.vercel.app)

## Stack

JavaScript, no framework runtime. Static output deployed on Vercel, so the page is a single
request path with no client-side hydration cost.

## Running locally

```bash
git clone https://github.com/tarekokashha/tarek-portfolio.git
cd tarek-portfolio
npm install
npm run dev
```

## CVs

Two one-page CVs come out of the same source: one for robotics roles, one for software roles.
Copy lives in `cv/content.mjs`, layout in `cv/cv.css`.

```bash
npm run cv
```

That writes `cv/Tarek_Okasha_CV_Robotics.pdf` and `cv/Tarek_Okasha_CV_Software.pdf`, and copies both
into `static/` as `Tarek-Okasha-CV.pdf` (robotics) and `Tarek-Okasha-CV-Software.pdf`, the two files
the site offers for download.
It needs Playwright with Chromium, and it fails if either CV runs past one page.

## Deploying

Pushes to `main` trigger a Vercel production deploy. If the Vercel project is still tracking
`claude/portfolio-repo-deployment-kkmf9k`, change the production branch to `main` under
Project Settings, Git.

## License

Content and imagery are mine and not licensed for reuse. The layout code is free to learn from.
