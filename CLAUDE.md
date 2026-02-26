# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static portfolio/resume site for Tomasz Ceszke, hosted on GitHub Pages with custom domain `tomek.ceszke.com`.

## Tech Stack

- Bootstrap 3, jQuery, plain HTML/CSS
- No build tools, package managers, tests, or linters
- Preview by opening HTML files directly in a browser

## Structure

- `index.html` – profile/landing page
- `cv.html` – full resume with experience, education, certificates, and open source projects
- `contact.html` – social links (LinkedIn, GitHub, Stack Overflow) with thumbnail images
- `css/main.css` – custom styles layered on top of Bootstrap 3
- `js/` – vendored jQuery and Bootstrap JS (no custom JS)
- `img/` – contact page icons and profile photo
- `files/` – downloadable assets (e.g. CV PDF)

## Page Architecture

All three pages share an identical structure:
1. Bootstrap navbar with `hidden-print` class (disappears when printing)
2. `.starter-template > .page-header` for the page title
3. Main content section
4. Footer with `hidden-print` class and copyright

The CV page uses `<section id="cv">` with `<article>` elements per section (Summary, Experience, Education, etc.), styled via `section#cv > article > header > h3` in `main.css`. The `hidden-print` pattern makes `cv.html` print-friendly by hiding nav/footer.

## Deployment

Push to `master` branch; GitHub Pages serves automatically via `CNAME` (`tomek.ceszke.com`).
