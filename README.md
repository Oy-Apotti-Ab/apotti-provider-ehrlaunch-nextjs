# Apotti Provider EHR Launch (Next.js Project)

This project is a provider-facing application using Next.js, integrated with SMART on FHIR to allow users to authenticate and manage healthcare-related data, including observations and patient information. The app supports OAuth2 authentication, connects to FHIR servers, and enables providers to interact with Electronic Health Records (EHRs).

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
  - [Vercel](#vercel)
  - [Azure](#azure)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

This application is built to provide healthcare providers with a secure, efficient way to interact with patient data via the FHIR (Fast Healthcare Interoperability Resources) standard. It uses OAuth2 for secure authentication and authorization, integrated with SMART on FHIR. The application enables users to view and create patient observations, access patient records, and securely manage data in compliance with healthcare regulations.

## Technologies

- **Next.js** 13 (using the App Router)
- **TypeScript**
- **OAuth2** for authentication
- **SMART on FHIR** integration
- **React** for client-side rendering
- **CSS Modules** for styling
- **FHIR Server** for healthcare data interaction

## Features

- Secure OAuth2-based authentication
- Integration with FHIR server for retrieving and posting healthcare data
- Patient information and observation management
- Server-side and client-side rendering (SSR/CSR)
- Environment variable management for secure deployment

## Getting Started

### Prerequisites

- **Node.js** (v16.x or later recommended)
- **npm** or **yarn**
- **FHIR server** for healthcare data access (e.g., SMART Health IT Sandbox, Epic FHIR API)
- **OAuth2 credentials** for FHIR server authentication

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/apotti-provider-ehrlaunch-nextjs.git
   cd apotti-provider-ehrlaunch-nextjs

2. **Install Dependencies**
npm install
or
yarn install

### Environment Variables
Configure the following environment variables in a .env.local file at the project root:
NEXT_PUBLIC_FHIR_SERVER=https://your-fhir-server-url/api/FHIR/R4
NEXT_PUBLIC_CLIENT_ID=your-client-id
NEXT_PUBLIC_BASE_URL=https://your-deployed-url.com

## Usage
1. Run the Development Server
npm run dev
2. Access the Application
pen http://localhost:3000 in your browser to view the app.
3. Logging and Debugging
Console logs will display environment variables in development. Ensure these values are available and correctly set.

## Deployment
### Vercel
Environment Variables: Add environment variables directly to Vercel under the project’s settings.
Deploy: Connect your repository to Vercel and deploy. Vercel will automatically redeploy upon environment variable changes.
### Azure
Environment Variables: Set up environment variables under Azure’s Application Settings.
Redeployment: Ensure redeployment or restart of the Azure service for environment changes to take effect.

## File Structure
```plaintext
apotti-provider-ehrlaunch-nextjs/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/route.ts    # OAuth callback handler
│   │   └── patient/[patientId]/route.ts   # Fetch patient data
│   ├── components/
│   │   └── PatientObservationForm.tsx     # Patient observation form
│   ├── patient/[patientId]/
│   │   └── page.tsx                  # Patient detail page
│   ├── styles/
│   │   ├── HomePage.css
│   │   └── PatientPage.css
│   └── page.tsx                      # Entry point for app
├── public/                           # Public assets
├── .env.local                        # Local environment variables
├── next.config.js                    # Next.js configuration
├── README.md                         # Project documentation
└── tsconfig.json                     # TypeScript configuration
```

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License
This project is licensed under the MIT License.