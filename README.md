# Synacy Trainee Leave System

A simple, role-based leave management web app built with Angular. As a new user or contributor, this README will help you understand what the project does, how it’s structured, and how to run it locally.

## Overview
This app lets people in an organization manage time-off requests:

- Employees can submit leave requests and view their own leave history.
- Managers can review and approve/reject leave requests from their team as well as submit their own leave requests.
- Admins can manage employees and view company-wide leave applications.

It’s a typical Angular application that can run in development mode with live reload for local work.

## Key Features
- Role-based pages (Admin, Manager, Employee)
- Apply for leave and view leave history
- Admin tools to view and manage employees and all leave requests
- Reusable UI components (tables, paginators, modals, etc.)
- Angular Material for consistent UI

## Tech Stack
- Angular 18
- TypeScript
- Angular Material & CDK
- Node.js

## Prerequisites
Make sure you have the following installed:

- Node.js
  - Recommended: Node 18.19+ or Node 20+
- npm (comes with Node)
- Optional: Angular CLI 18.x globally
  - If you prefer not to install globally, you can use npx to run Angular CLI commands.

To verify:
- node -v
- npm -v
- ng version (optional)

## Getting Started

1) Clone the repository
- Use your preferred Git client or command line.

2) Install dependencies
- npm install

3) Run in development (with live reload)
- npm start
- This runs ng serve and serves the app locally (by default on http://localhost:4200). The terminal will display the exact URL.

4) Run unit tests
- npm test

## Building for Production

- npm run build
- This produces a production build in the dist/ directory.

## NPM Scripts

- npm start
  - Runs the app in development mode with live reload.
- npm run build
  - Creates a production build in dist/.
- npm run watch
  - Builds in watch mode for development.
- npm test
  - Runs unit tests with Karma/Jasmine.
- npm run serve:ssr:synacy-trainee-leave-system
  - Serves the built SSR bundle via Node/Express.

## Project Structure (what you’ll likely touch first)
- src/
  - app/
    - pages/
      - admin/ (admin features)
      - manager/ (manager features)
      - employee/ (employee features)
    - shared-components/ (reusable UI components like tables, modals, header, sidebar)
    - services/ (app services such as data access)
    - models/ (TypeScript interfaces/types)
    - app.* (root app config, routing)
  - main.ts (client bootstrap)
  - main.server.ts (server-side bootstrap)
  - styles.scss (global styles)
- public/ (static assets, if any)
- server.ts (Node/Express entry used by SSR runtime)
- angular.json (Angular workspace config)
- proxy.conf.json (optional dev proxy configuration)
- package.json (dependencies and scripts)

## Configuration Notes

- Dev Proxy (optional):
  - If you have a backend API running elsewhere and want to avoid CORS in dev, you can use proxy.conf.json with ng serve’s --proxy-config flag. Adjust targets and routes as needed for your environment.
- Environment variables:
  - If you need different API endpoints for dev/prod, use Angular environment files or runtime configuration patterns suitable for your setup.

## Troubleshooting

- Port already in use:
  - Stop the other process or run ng serve --port 4300 (or any free port).
- SSR serve can’t find server.mjs:
  - Ensure you ran npm run build first and that dist/synacy-trainee-leave-system/server/server.mjs exists.
- Node version issues:
  - Use Node 18.19+ or 20+ to match Angular 18 requirements.
- Missing Angular CLI:
  - Use npx ng <command> instead of a global ng installation.

## Contributing

- Create a new branch for your feature or fix.
- Follow existing code style and component patterns.
- Add/adjust tests where appropriate.
- Run npm test and ensure the app builds (npm run build) before opening a PR.

## License

- Please refer to the repository’s LICENSE file or your organization’s licensing policy.

If you’re new and just want to see the app:
- Install Node and npm
- Run npm install
- Run npm start
- Open the URL shown in your terminal (usually http://localhost:4200)
