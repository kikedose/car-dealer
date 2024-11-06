/**
 * Fetches data from the specified URL with optional settings for method, headers, and body.
 *
 * @template T - The expected type of the response data.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<T>} - A promise that resolves to the parsed JSON response.
 * @throws {Error} - Throws an error if the request fails or the response is not ok.
 */
const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchData;
