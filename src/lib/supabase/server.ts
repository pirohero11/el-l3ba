import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://cldffpllbqapzvzfloow.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZGZmcGxsYnFhcHp2emZsb293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDg5MDYsImV4cCI6MjEwMTkyNDkwNn0.7YlxemRkQXswxlP9Mwg3tcJ6bnRzT8DfinIANSciT4o",
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    } catch {
                        // Cookie writes from Server Components may be ignored.
                        // Session refresh should be handled by proxy.ts.
                    }
                },
            },
        }
    )
}