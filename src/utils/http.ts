export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("authorization_token");
  return token ? { Authorization: `Basic ${token}` } : {};
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  if (!text.trim()) {
    return undefined as unknown as T;
  }
  return JSON.parse(text) as T;
}
