import { NextRequest } from 'next/server';
import axios from 'axios';

// Define the GET method
export async function GET(req: NextRequest, context: { params: { patientId?: string } }) {
  const { patientId } = context.params || {}; // Safely extract patientId

  // Retrieve accessToken from query parameters or headers
  const accessToken = req.nextUrl.searchParams.get('accessToken') || req.headers.get('Authorization')?.split(' ')[1];

  // Check if patientId or accessToken is missing
  if (!patientId || patientId === 'undefined') {
    return new Response('Patient ID is required', { status: 400 });
  }

  if (!accessToken) {
    return new Response('Access Token is required', { status: 400 });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FHIR_SERVER}/Patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    //console.log('FHIR Server response:', response.data); // Log the response data for verification
  
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);
  
    if (axios.isAxiosError(error)) {
      console.error('Axios error response data:', error.response?.data); // Detailed error log
      return new Response(JSON.stringify(error.response?.data) || error.message, {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Failed to fetch patient data', { status: 500 });
    }
  }
}
