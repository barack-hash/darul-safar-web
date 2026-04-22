export default async function handler(req, res) {
  const { flight } = req.query;

  if (!flight || typeof flight !== 'string') {
    return res.status(400).json({ error: 'Missing flight query parameter.' });
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${encodeURIComponent(flight)}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch flight data.' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch flight data.' });
  }
}
