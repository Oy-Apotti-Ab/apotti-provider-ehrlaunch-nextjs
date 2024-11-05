import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { NextRequest, NextResponse } from 'next/server';

// Define the structure of the extension
interface Extension {
  url: string;
  valueUri?: string; // Optional since it may not be present
}

async function getTokenEndpoint(fhirBaseUrl: string): Promise<string> {
  try {
    const response = await axios.get(`${fhirBaseUrl}/metadata`);
    const extensions = response.data.rest[0].security.extension.find(
      (ext: { url: string }) => ext.url === "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris"
    ).extension as Extension[]; // Cast to Extension[]

    // Find the token endpoint and handle undefined value
    const tokenEndpoint = extensions.find((ext) => ext.url === "token")?.valueUri;

    if (!tokenEndpoint) {
      throw new Error('Token endpoint not found in metadata.');
    }

    return tokenEndpoint; // This will now always return a string
  } catch (error) {
    console.error("Error fetching token endpoint:", error);
    throw new Error("Failed to retrieve token endpoint");
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
  }

  const fhirBaseUrl = process.env.NEXT_PUBLIC_FHIR_SERVER;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;
  const state = '1234';

  try {
    
    const tokenEndpoint = await getTokenEndpoint(fhirBaseUrl as string); // Ensure fhirBaseUrl is treated as a string

    const tokenResponse = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        state,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, patient } = tokenResponse.data;

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/patient/${patient}?accessToken=${access_token}`
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status || 500;
    const errorMessage = axiosError.response?.data || 'Internal server error';

    console.error('Error exchanging authorization code for access token:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}


