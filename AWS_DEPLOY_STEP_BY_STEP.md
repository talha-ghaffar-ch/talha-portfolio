# AWS Deployment (Auto Update on Every Code Change)

This guide is made for beginners. Follow in order.

## Goal
- Host your React site on AWS.
- Every time you update code and push to GitHub, AWS updates your live site automatically.

## What we prepared in this project
- Added `amplify.yml` so AWS Amplify knows how to build your Vite app.

## Part 1: Install tools (one-time)
1. Install Node.js LTS (if not already): https://nodejs.org/
2. Install GitHub Desktop (easiest for beginners): https://desktop.github.com/
3. Create a GitHub account: https://github.com/
4. Create an AWS account: https://aws.amazon.com/

## Part 2: Put this code on GitHub
Use GitHub Desktop (no command line needed):
1. Open GitHub Desktop.
2. File -> Add local repository.
3. Select this folder:
   - `C:\Users\talha\Desktop\Talha\Test`
4. If asked, choose "Create a repository".
5. Add a commit message like: `Initial portfolio site`.
6. Click "Commit to main".
7. Click "Publish repository".
8. Keep it Public or Private (your choice), then publish.

Important: Auto deployment needs code in GitHub.

## Part 3: Host on AWS Amplify
1. Login to AWS Console.
2. Search for **Amplify** and open **AWS Amplify Hosting**.
3. Click **Deploy an app**.
4. Select **GitHub** as source provider.
5. Authorize AWS Amplify to access your GitHub account.
6. Choose your repository and branch (`main`).
7. Amplify will detect build settings. Confirm it uses `amplify.yml`.
8. Click **Save and deploy**.
9. Wait for build to finish (usually 2-5 minutes).
10. Open the generated URL to see your live site.

## Part 4: Make it auto-update on every change
After initial setup, your flow is:
1. Edit code in VS Code.
2. Test locally:
   - `npm run dev`
3. In GitHub Desktop:
   - Review changed files
   - Commit message (example: `Update hero section`)
   - Click **Commit to main**
   - Click **Push origin**
4. AWS Amplify starts a new build automatically.
5. Your live website updates after build succeeds.

That is your automatic CI/CD pipeline.

## Part 5: Fix single-page app routing (important)
If direct links (like `/about`) show 404, add redirect rule:
1. Open Amplify app -> **Hosting** -> **Rewrites and redirects**.
2. Add rule:
   - Source address: `/<*>`
   - Target address: `/index.html`
   - Type: `200 (Rewrite)`
3. Save.

## Part 6: Add your own domain (optional)
1. Amplify app -> **Domain management**.
2. Click **Add domain**.
3. Enter your domain name.
4. Follow DNS verification steps shown by Amplify.

## Part 7: Troubleshooting
- Build fails with dependency error:
  - Check `package.json` has all used libraries.
  - Rebuild by pushing a small commit.
- No auto-update:
  - Ensure you actually pushed to the connected branch (`main`).
- Wrong image on live site:
  - Put images in `public/` and reference like `/photo.png`.

## Security tips
- Never commit AWS keys, passwords, or secret tokens.
- If later you need secrets, use Amplify environment variables.

## Quick checklist
- [ ] Code is on GitHub
- [ ] Amplify connected to repo and branch
- [ ] First deploy successful
- [ ] Push triggers auto-deploy
- [ ] SPA rewrite rule added

You are now set for automatic AWS hosting updates.
