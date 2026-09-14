export const DEMO_API_KEY = 'offertrail_demo_local_dev_key';
const STORAGE_KEY = 'offertrail.apiKey';

export function getApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) || DEMO_API_KEY;
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key);
}

export function clearApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasSession(): boolean {
  return Boolean(localStorage.getItem(STORAGE_KEY));
}
