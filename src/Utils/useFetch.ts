interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

export async function useFetch(url: string, options?: FetchOptions) {
  //https://quickmpback.onrender.com/api/
  const apiUrl = 'https://quickmpback.onrender.com/api/';
  const fullUrl = apiUrl + url;

  const {
    method = 'GET',
    body,
    headers = {
      'Content-Type': 'application/json' // Importante para que el backend sepa que es JSON
    },
    credentials = 'include'
  } = options || {};

  const fetchOptions: RequestInit = {
    method,
    headers,
    credentials
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
    console.log(fetchOptions);
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Error fetching data');
    }
    return { data: result, error: null };
  } catch (err: any) {
    return { data: null, error: err };
  }
}
