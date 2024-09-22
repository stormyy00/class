# T1 Planner


### Built With

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br/>
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=nextauth&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-000000?style=for-the-badge&logo=drizzle&logoColor=#84A438)


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node

  This project runs on Node.js Version 20.10.0 and higher. Please ensure you have Node.js installed via the [official website](https://nodejs.org/en).


### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/stormyy00/planner.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Project Configuration

This project requires environment variables to be set up in a `.env` file for proper configuration and operation. Below are the required environment variables and instructions on how to set them up.

### Required Environment Variables

1. `DATABASE_URL`
2. `NEXTAUTH_SECRET`
3. `NEXTAUTH_URL`
4. `GOOGLE_CLIENT_ID`
5. `GOOGLE_CLIENT_SECRET`
6. `GITHUB_CLIENT_ID`
7. `GITHUB_CLIENT_SECRET`

## Usage

To run the project locally:

1. Start the development server
   ```sh
   npm run dev
   ```
2. Visit `http://localhost:3000` in your browser.

### Recommended Extensions

- Prettier
  - Open your command palette, choose your default formatter to be Prettier, and enable format on save.
- ESLint
  - When you push a commit, we have a pre-commit hook that automatically runs prettier, eslint, and builds your project to make sure everything is ok.
- JavaScript and TypeScript Nightly

<p align="right">(<a href="#readme-top">back to top</a>)</p>
