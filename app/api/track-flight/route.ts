import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const flight = request.nextUrl.searchParams.get('flight');

  if (!flight || flight.trim() === '') {
    return NextResponse.json({ error: 'Missing flight query parameter.' }, { status: 400 });
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${encodeURIComponent(flight)}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch flight data.' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch flight data.' }, { status: 500 });
  }
}
