# Hireflow

Hireflow is a modern job posting site built with a monorepo architecture. It includes a web app for browsing and posting jobs, a mobile app for job seekers on the go, and a robust backend API.

## Features

- **Job Postings:** Companies can post job openings with detailed descriptions.
- **Job Search:** Job seekers can search for jobs by keyword, location, and other filters.
- **User Authentication:** Secure user accounts for both job seekers and employers.
- **Job Applications:** Job seekers can easily apply for jobs directly through the platform.

## Tech Stack

- **Monorepo:** Managed with [Turborepo](https://turbo.build/repo) and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).
- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [TSyringe](https://github.com/microsoft/tsyringe) for dependency injection
- **Frontend (Web):**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)[]()
- **Frontend (Mobile):**
  - [React Native](https://reactnative.dev/)
  - [Expo](https://expo.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Shared Packages:**
  - `@hireflow/types`: Shared TypeScript types.
  - `@hireflow/typescript-config`: Shared TypeScript configurations.

## Project Structure

The repository is a monorepo with the following structure:

```
/
├── apps/
│   ├── api/      # Backend API (Express.js)
│   ├── mobile/   # Mobile App (React Native/Expo)
│   └── web/      # Web App (React/Vite)
├── packages/
│   ├── types/    # Shared TypeScript types
│   └── typescript-config/ # Shared TypeScript configurations
└── ...
```

- `apps/api`: The backend Express.js application that serves the data to the web and mobile apps.
- `apps/web`: The main web interface for users to interact with the platform.
- `apps/mobile`: The mobile application for job seekers.
- `packages/types`: Shared types between the different applications.
- `packages/typescript-config`: Shared TypeScript `tsconfig.json` files.

## Screenshots

| Home | Search | Job Details |
|------|--------|-------------|
| ![Home](docs/images/mobile_preview1.jpeg) | ![Search](docs/images/mobile_preview2.jpeg) | ![Job Details](docs/images/mobile_preview3.jpeg) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version >=18)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/hireflow.git
    cd hireflow
    ```

2.  Install the dependencies:
    ```bash
    yarn install
    ```

## Available Scripts

The following scripts are available from the root of the project:

- `yarn dev`: Start all applications in development mode.
- `yarn build`: Build all applications.
- `yarn lint`: Lint all applications.
- `yarn format`: Format all files with Prettier.
- `yarn check-types`: Type-check all applications.

You can also run these scripts for individual applications by navigating to the respective `apps/*` directory.
