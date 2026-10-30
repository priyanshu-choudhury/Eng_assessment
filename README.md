# Priyanshu Choudhury — Interactive Portfolio

A static, responsive portfolio with a Python playground, maths pattern visualizer, light/dark themes, clickable companion, certificates, education, Toastmasters, and photography links.

## Upload to GitHub and make it live

1. Extract the ZIP on your computer.
2. Sign in to YOUR GitHub account. Create a new **public** repository named `priyanshu-portfolio`. Add a README so the upload button is easy to find.
3. Open the repository, select **Add file → Upload files**.
4. Drag in ALL extracted files AND the `assets` folder. Upload the contents, not the ZIP or a surrounding folder. `index.html`, `playground.js`, `python-worker.js`, and `assets` must sit at the repository root.
5. Click **Commit changes** and commit to `main`.
6. Open **Settings → Pages**. Under Build and deployment choose **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
7. Wait for the Pages deployment to finish. Open the website URL shown in Settings → Pages. A project repository normally uses `https://YOUR-USERNAME.github.io/priyanshu-portfolio/`.

If you see a 404, check that `index.html` is directly at the root, the branch and folder are correct, and the Pages deployment in Actions has completed. Uploading a ZIP without extracting it will not work.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Local preview

From this folder run `python -m http.server 8000` and open `http://localhost:8000`. Use a local server rather than double-clicking the HTML, because the Python playground uses a Web Worker.

## Python playground

Real Python runs locally in the visitor's browser using Pyodide 0.28.2 from jsDelivr. The first run downloads the runtime and needs internet. Fonts load from Google Fonts; system fonts are used if unavailable. No server, API key, build tools, or npm installation required. Stop terminates the worker; a 60-second timeout also stops long runs. Examples use print output, not interactive input(). Output is capped at 500 messages per run.

The playground examples are introductory demonstrations, not claims of past projects. The mathematical pattern visualization itself runs in JavaScript/SVG.

## Personalize

- Edit text and CSS in `index.html`.
- Edit sample code and interactive controls in `playground.js`.
- Replace images in `assets` while keeping the same names, or update their paths.
- Your personal GitHub profile is not linked yet: the supplied URL was the GitHub homepage, and Priyanshu's username is still needed. Once known, add a normal link to `https://github.com/YOUR-USERNAME`.

The files contain no ChatGPT hosting configuration or account credentials. The included images are supplied personal photos and certificates; retain them only for this portfolio.
