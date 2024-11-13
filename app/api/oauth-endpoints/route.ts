// app/api/oauth-endpoints/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_FHIR_SERVER}/.well-known/smart-configuration`
    );
    //console.log("Fetched OAuth metadata:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching OAuth metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch OAuth metadata" },
      { status: 500 }
    );
  }
}
