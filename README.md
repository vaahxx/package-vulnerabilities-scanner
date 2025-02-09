# Package Vulnerabilities Scanner

## Overview

Package Vulnerabilities Scanner is a tool designed to help developers identify vulnerabilities in their project's dependencies.

## How to run
You can access the web app in https://package-vulnerabilities-scanner.vercel.app/

Or: 

1. Install dependencies with `npm install`
2. Run with `npm run dev`

## Dependencies

### ShadCN

This project uses ShadCN as the UI component library. Components are accessible (ARIA-compliant) and optimized for styling with Tailwind CSS. Instead of being an npm package, ShadCN generates local components, making them easier to extend and modify without extra dependencies.

### next

Next is the backbone of this project, providing the structure and performance optimizations needed for a modern web application.

I chose to use React due to my familiarity with this framework instead of Vue.js, which I had brief contact with years ago.

### zod

Zod is a TypeScript-first schema declaration and validation library. It is used to validate the structure of the `package.json` file and other data structures, ensuring that the data conforms to the expected format.

### @eslint/eslintrc, eslint, eslint-config-next

These libraries are used for linting the codebase, ensuring that the code adheres to best practices and coding standards. `eslint-config-next` provides a set of ESLint rules specifically for Next.js projects.

### tailwindcss

Tailwind CSS is a utility-first CSS framework. This tool is used to process and manage the project's styles, providing a highly customizable and efficient styling solution.

### typescript

TypeScript is a strongly typed programming language that builds on JavaScript. It provides static type checking, which helps catch errors early in the development process and improves code quality.

## Screenshots
<img width="1214" alt="image" src="https://github.com/user-attachments/assets/c3f7a887-8cbc-4983-a0f9-fbf28a416739" />

<img width="1216" alt="image" src="https://github.com/user-attachments/assets/cc176d7c-d192-4a76-8954-df5213582763" />


