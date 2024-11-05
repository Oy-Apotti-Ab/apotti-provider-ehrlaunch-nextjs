// Create a new component to log the environment variables
'use client';

import { useEffect } from 'react';

const LogEnvVariables = () => {
  useEffect(() => {
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("NEXT_PUBLIC_CLIENT_ID:", process.env.NEXT_PUBLIC_CLIENT_ID);
    console.log("NEXT_PUBLIC_FHIR_SERVER:", process.env.NEXT_PUBLIC_FHIR_SERVER);
  }, []);

  return <div>Check the console for environment variables</div>;
};

export default LogEnvVariables;
