type CoolifyMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface CoolifyApiOptions<TPayload = unknown> {
  endpoint: string;
  method?: CoolifyMethod;
  payload?: TPayload;
}

export async function callCoolifyApi<TResponse = unknown, TPayload = unknown>(
  options: CoolifyApiOptions<TPayload>
): Promise<TResponse> {
  const { endpoint, method = 'GET', payload } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_COOLIFY_TOKEN}`,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (payload && method !== 'GET') {
    config.body = JSON.stringify(payload);
  }

  const baseUrl = process.env.NEXT_PUBLIC_COOLIFY_API_BASE;

  const res = await fetch(`${baseUrl}${endpoint}`, config);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Coolify API error: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const contentType = res.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    return (await res.json()) as TResponse;
  } else {
    return (await res.text()) as unknown as TResponse;
  }
}
