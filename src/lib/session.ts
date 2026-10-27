export interface ChildSession {
  id: string;
  name: string;
  imageName?: string | null;
  score?: number | null;
  recorded_vid_locations?: string | null;
  streak?: number | null;
  num_of_mission?: number | null;
  [key: string]: any;
}

export function getSession(): ChildSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem('session');
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setSession(data: ChildSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('session', JSON.stringify(data));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('session');
}
