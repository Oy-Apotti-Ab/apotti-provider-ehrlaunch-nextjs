// app/api/oauth-endpoints/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // Append `/metadata` to the FHIR server URL for the correct endpoint
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FHIR_SERVER}/metadata`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching OAuth metadata:", error);
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}
