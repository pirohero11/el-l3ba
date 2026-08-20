import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
    return Boolean(supabaseUrl && supabaseAnonKey);
};

// Create client with fallback values if env vars are missing
export const supabase = createClient(
    supabaseUrl || 'https://cldffpllbqapzvzfloow.supabase.co',
    supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZGZmcGxsYnFhcHp2emZsb293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDg5MDYsImV4cCI6MjEwMTkyNDkwNn0.7YlxemRkQXswxlP9Mwg3tcJ6bnRzT8DfinIANSciT4o'
);

export interface AdminFingerprintData {
    credential_id: string;
    device_name?: string;
    allowed_pages: string[];
    registered_at: string;
}

export interface AdminRecord {
    id: string;
    username: string;
    role: string;
    fingerprint?: AdminFingerprintData | AdminFingerprintData[] | null;
}
