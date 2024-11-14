# Apotti Patient Standalone App (Next.js)

This project is a standalone patient-facing application that allows patients to enter and view their observations. It interacts with a FHIR server to retrieve and create patient observations using the SMART on FHIR protocol. This application is built using Next.js with TypeScript.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [File Structure](#file-structure)
- [Patient Data Handling](#patient-data-handling)
- [License](#license)

## Features
- **Patient Data Display**: Displays patient information (Name, ID, Date of Birth, Address) retrieved from the FHIR server.
- **Observations Display**: Shows the patient's observations in a table, sorted by the `effectiveDateTime` in descending order.
- **Observation Creation**: Allows patients to create new observations by filling out a form.
- **SMART on FHIR Authentication**: Utilizes the SMART on FHIR protocol for OAuth2 authentication.

## Technologies
- **Next.js** (v13+)
- **React** (v18+)
- **TypeScript** (for type safety)
- **CSS Modules** (for styling)
- **Axios** (for data fetching)
- **FHIR** (Fast Healthcare Interoperability Resources)

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/apotti-patient-standalone.git

2.  Navigate to the project directory:
cd apotti-patient-standalone

3. Install the dependencies:
npm install

## Environment Variables
Before running the application, ensure you have the following environment variables set in the .env.local file:
NEXT_PUBLIC_FHIR_SERVER: FHIR server base URL
NEXT_PUBLIC_FHIR_SERVER_A: FHIR server authorization endpoint
NEXT_PUBLIC_CLIENT_ID: Your client ID for OAuth2 authentication

## Running the Application
To start the development server, run:
```bash
npm run dev
```

This will start the application on http://localhost:3000.

## File Structure

```plaintext
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── callback
│   │   │       └── route.ts       # Callback route for OAuth2
│   │   └── observation
│   │       └── [patientId]
│   │           └── route.ts       # API route to fetch patient observations
│   ├── components
│   │   └── PatientObservationForm.tsx  # Observation form component
│   ├── patient
│   │   └── [patientId]
│   │       └── page.tsx           # Patient details and observation listing
│   ├── page.tsx                   # Homepage of the application
│   └── styles
│       ├── HomePage.css           # CSS for the homepage
│       └── PatientPage.css        # CSS for the patient info and observations page
├── public
│   └── apottilabs.png             # Logo used in the app
├── .env.local                     # Environment variables
├── package.json                   # Dependencies and scripts
└── README.md                      # Project information
```

## Patient Data Handling
Patient Info
The patient’s information is displayed after successful authentication and fetching of patient data from the FHIR server. It includes:

- Name
- ID
- Date of Birth
- Address
- 
Observations:. The patient’s observations are fetched from the FHIR server and displayed in a table. Observations are sorted by effectiveDateTime in descending order. Each observation includes:

    - Observation Code
    - Value
    - Unit
    - DateTime
## License
This project is licensed under the MIT License.