async function getDuneAnalyticsData(queryId) {
  try {
    const response = await fetch('/api/dune-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ queryId: queryId })
    });

    const result = await response.json();

    if (result.success) {
      console.log('Dune Data:', result.rows);
      // یہاں اپنے ڈیش بورڈ میں ڈیٹا کو ڈسپلے کریں
    } else {
      console.error('خرابی:', result.error);
    }
  } catch (err) {
    console.error('Network Error:', err);
  }
}
