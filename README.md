# Traceless

Traceless is a [Next.js](https://nextjs.org) project designed to help individuals and businesses reduce their carbon footprint. This platform provides tools to track, analyze, and minimize carbon emissions from various activities such as transportation, food consumption, and household energy usage.

## Features

- **Calculate Carbon Emissions**: Analyze and understand the carbon footprint of your daily activities like transportation and energy usage.
- **Feedback & Recommendations**: Receive tailored advice to minimize your emissions and adopt more eco-friendly habits.
- **Visualize Your Impact**: Interactive charts to help you understand your carbon contributions at a glance.
- **Earn Badges & Rewards**: Stay motivated and committed by earning badges and rewards as you progress toward sustainability.

## Tech Stack

### Frontend
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img alt="Next.js" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-%231d1d1d.svg?style=for-the-badge&logoColor=white">

### Backend
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
<img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
<img alt="Clerk" src="https://img.shields.io/badge/clerk-%23003344.svg?style=for-the-badge&logoColor=white">

### Database
<img alt="Postgres" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
<img alt="Neon Database" src="https://img.shields.io/badge/neon-db-%230055FF.svg?style=for-the-badge&logo=postgresql&logoColor=white">

### Tools
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
<img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="Recharts" src="https://img.shields.io/badge/recharts-%2338B2AC.svg?style=for-the-badge&logo=recharts&logoColor=white">
<img alt="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">
<img alt="NPM" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white">

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `page.tsx`. The page auto-updates as you edit the file.

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/traceless.git
    cd traceless
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the following variables:
    ```env
    DATABASE_URL=your_database_url
    NEXT_PUBLIC_CLIMATIQ_API_KEY=your_climatiq_api_key
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

## Usage

To use the project, navigate to [http://localhost:3000](http://localhost:3000) in your browser and follow the on-screen instructions to calculate your carbon footprint.

## Project Structure

- `app`: Contains the main application components and pages.
- `components`: Reusable UI components.
- `services`: Services for API calls and database interactions.
- `db`: Database schema and configuration.
- `public`: Static assets like images and fonts.
- `styles`: Global styles and Tailwind CSS configuration.

## Configuration

This project uses environment variables for configuration. Create a `.env.local` file in the root directory and add the following variables:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLIMATIQ_API_KEY=your_climatiq_api_key
```