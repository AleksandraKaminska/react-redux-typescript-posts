# React redux typescript posts

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Build](#build)
- [Testing](#testing)
- [Storybook](#storybook)
- [Linting and Formatting](#linting-and-formatting)

## System Requirements

- [Node.js 18.20](https://nodejs.org/en/download/package-manager) or later.
- macOS, Windows (including WSL), and Linux are supported.
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Installation

To get started with this project, go to the project folder and install the dependencies using Yarn:

```bash
yarn
```

## Usage

To start the development server, run:

```
yarn dev
```

This will start the Vite development server and you should be able to see the application running at http://localhost:5173.

## Available Scripts

In the project directory, you can run:

- `yarn dev`: Starts the Vite development server for development.
- `yarn build`: Builds the app for production to the dist folder.
- `yarn preview`: Serves the production build locally, allowing you to preview the application as it would be in production.
- `yarn lint`: Lints the codebase using ESLint.
- `yarn prettier`: Formats the codebase according to Prettier configuration.
- `yarn test`: Runs all the tests using Vitest.
- `yarn test:watch`: Runs the tests in watch mode.
- `yarn test:coverage`: Runs the tests and generates a coverage report.
- `yarn storybook`: Starts the Storybook server on port 6006 for component development.
- `yarn storybook:build`: Builds the Storybook UI as a static web application.
- `yarn clean`: Cleans up the `dist` directory by removing the previous build artifacts.
- `yarn typecheck`: Runs TypeScript's type checker to ensure type safety.

## Build

To create a production build, run:

```
yarn build
```

The output will be generated in the dist directory.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. To run the tests:

```
yarn test
```

To run tests in watch mode:

```
yarn test:watch
```

To generate a coverage report:

```
yarn test:coverage
```

## Storybook

This project uses [Storybook](https://storybook.js.org/) for UI component development and documentation. To start Storybook locally, run:

```
yarn storybook
```

To build Storybook as a static site:

```
yarn storybook:build
```

## Linting and Formatting

The project uses ESLint and Prettier to maintain code quality and consistency.

- **Linting**: Run `yarn lint` to lint the code.
- **Formatting**: Run `yarn prettier` to format the codebase.
