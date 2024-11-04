import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Named export for the GET method
export async function GET(request: NextRequest, { params }: { params: { patientId: string } }) {
  const { patientId } = params;
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!patientId || !accessToken) {
    return NextResponse.json({ error: 'Missing patient ID or access token' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FHIR_SERVER}/Observation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        patient: patientId,
        category: 'vital-signs',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching observations:', error);
    return NextResponse.json({ error: 'Error fetching observations' }, { status: 500 });
  }
}

