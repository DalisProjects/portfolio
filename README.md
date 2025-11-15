Portfolio Website (Angular)

This is a personal portfolio website built with Angular. It features a background video, typing animation, social links, and buttons to showcase projects and CV. This README will guide you from cloning the repository to deploying it on GitHub Pages, and explain what information to change for your own portfolio.


1- Prerequisites

Before running or deploying this project, make sure you have:

Node.js (v18+ recommended)

npm (comes with Node.js)

Angular CLI installed globally:

npm install -g @angular/cli


Git installed and configured: https://git-scm.com/downloads

A GitHub account and repository ready for deployment.

2- Installation

Clone this repository:

git clone https://github.com/YourUsername/YourPortfolioRepo.git


Navigate into the project folder:

cd YourPortfolioRepo


Install dependencies:

npm install

3- Running Locally

To run the project on your computer:

ng serve


Open your browser at http://localhost:4200

The site will automatically reload if you make changes to the source files.

4- Building the Project

Before deploying, you need to build the project for production:

ng build --configuration production --base-href /YourRepoName/


--base-href /YourRepoName/ ensures GitHub Pages serves the project correctly.

This generates a dist/YourRepoName/ folder with all the production files.

4- Deploying to GitHub Pages

We use angular-cli-ghpages to deploy:

Install it (if not installed):

npm install -g angular-cli-ghpages


Deploy the project:

npx angular-cli-ghpages --dir=dist/YourRepoName --repo=https://github.com/YourUsername/YourRepoName.git --branch=gh-pages


Your portfolio will be live at:

https://YourUsername.github.io/YourRepoName/

5- Customizing Your Portfolio

To make this portfolio your own, update the following key pieces of information:

Home Section (src/app/home/home.component.ts):

name: string = "Your Name";   // Replace with your name
roles: string[] = ["Your roles or skills here"]; // Replace with your roles


Social Links (home.component.ts):

socialLinks = [
  { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/yourprofile/' },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/yourprofile/' },
  { icon: 'fab fa-whatsapp', url: 'https://wa.me/YourNumber' }
];


CV Download Button (home.component.html):

<a href="assets/YourCV.pdf" class="btn btn-secondary" target="_blank">Visualize CV</a>


Replace YourCV.pdf in src/assets/ with your CV file.

Background Video:

<video autoplay muted loop playsinline class="bg-video" [src]="'assets/bg.mp4'"></video>


Replace bg.mp4 in src/assets/ with your own video. Ensure it is compressed and short for faster loading.

Project Links (home-buttons):

<a routerLink="/projects" class="btn btn-primary">View My Work</a>


Update /projects page with your projects.
                # Production build (generated)

Notes

Always use relative paths for assets, e.g., assets/bg.mp4.

Use ng build --configuration production --base-href /YourRepoName/ for GitHub Pages deployment.

Make sure the GitHub repository name matches your base-href.

Video backgrounds should be muted and short to avoid mobile autoplay issues.
