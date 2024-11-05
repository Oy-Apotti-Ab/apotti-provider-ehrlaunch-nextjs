// app/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOAuth } from './context/OAuthContext'; // Import the custom hook

function AuthorizationRedirect() {
  const [iss, setIss] = useState<string | null>(null);
  const [launch, setLaunch] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { authorizeUrl } = useOAuth(); // Get the authorizeUrl from the context

  useEffect(() => {
    if (searchParams) {
      const issParam = searchParams.get('iss');
      const launchParam = searchParams.get('launch');

      if (issParam && launchParam) {
        setIss(issParam);
        setLaunch(launchParam);
      } else {
        const appParam = searchParams.get('app');
        if (appParam) {
          const decodedAppUrl = decodeURIComponent(appParam);
          try {
            const decodedUrl = new URL(decodedAppUrl);
            const decodedLaunch = decodedUrl.searchParams.get('launch');
            const decodedIss = decodedUrl.searchParams.get('iss');

            if (decodedLaunch && decodedIss) {
              setIss(decodedIss);
              setLaunch(decodedLaunch);
            }
          } catch (error) {
            console.error('Error parsing the decoded URL:', error);
          }
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (iss && launch && authorizeUrl) { // Ensure authorizeUrl is available
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;
      const scope = 'openid fhirUser launch/patient offline_access';
      const state = 'random-state';
      const aud = process.env.NEXT_PUBLIC_FHIR_SERVER;

      if (!aud) throw new Error('NEXT_PUBLIC_FHIR_SERVER is missing or undefined');

      const authUrl = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&launch=${launch}&aud=${encodeURIComponent(aud)}&scope=${encodeURIComponent(scope)}&state=${state}`;

      window.location.href = authUrl;
    }
  }, [iss, launch, authorizeUrl]); // Add authorizeUrl as a dependency

  return (
    <div>
      <h1>Authorization Redirect Page</h1>
      <p>Waiting to redirect to authorization server...</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthorizationRedirect />
    </Suspense>
  );
}

