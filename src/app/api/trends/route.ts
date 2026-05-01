import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  try {
    // We use require because google-trends-api doesn't have official TS types
    const googleTrends = require('google-trends-api');
    
    // Fetch interest over time for the last 12 months
    const results = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 
    });

    const parsedResults = JSON.parse(results);
    const timelineData = parsedResults?.default?.timelineData || [];
    
    // Format data for Recharts
    const data = timelineData.map((item: any) => ({
      date: item.formattedTime,
      value: item.value[0] || 0
    }));

    if (data.length === 0) {
      throw new Error("No data returned from Google Trends");
    }

    return NextResponse.json({ data, source: 'live' });
  } catch (error) {
    console.error('Google Trends API Error (Fallback triggered):', error);
    // If blocked or rate-limited, we return an error flag so the client can use Mock Data
    return NextResponse.json({ error: 'Failed to fetch', source: 'fallback' }, { status: 500 });
  }
}
