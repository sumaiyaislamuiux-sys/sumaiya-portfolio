# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Experience page galleries

Add certificate scans, award photos, and recognition documents to
`public/images/certificates/`, `public/images/awards/`, and
`public/images/recognition/`. Digital badges belong in
`public/images/badges/`. Keep images optimized for the web and use URL-safe
filenames when possible.

Update the matching `certifications`, `recognitions`, or `leadership` array in
`src/app.jsx` with the image's public URL and descriptive `imageAlt` text.
Certificate and recognition entries without an image show a placeholder.
Include only verified dates and organizations, and add a short `description`
when useful.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
