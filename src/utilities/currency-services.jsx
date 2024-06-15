const API_URL = 'https://api.apyhub.com/data/convert/currency';
const API_TOKEN = 'APY0GxuH5DFoCtRG6OTToQIFk9roo5nb8gUQXxNteYlgxh4pENcNH6GJwCkRDvhZtPFN7hWw'; // will have to move this into an .env variable.

export async function convertCurrency(source, target) {
  const payload = {
    source: source.toLowerCase(),
    target: target.toLowerCase(),
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apy-token': API_TOKEN,
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(API_URL, options);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to convert currency');
    }
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
}
