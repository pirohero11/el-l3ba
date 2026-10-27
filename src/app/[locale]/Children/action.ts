'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ChildSession } from '@/lib/session'

export interface CreateChildResponse {
    success: boolean;
    data?: ChildSession;
    error?: string;
}

export async function createChild(formData: FormData): Promise<CreateChildResponse> {
    const supabase = await createClient()

    const name = String(formData.get('name') ?? '').trim()
    const ImageName = String(formData.get('ImageName') ?? '').trim()

    if (!name) {
        return { success: false, error: 'Name is required' }
    }

    // With RLS disabled, no auth user is required to insert into Children
    const insertPayload: Record<string, any> = {
        name,
    };

    if (ImageName) {
        insertPayload.imageName = ImageName.replace(/^\//, '');
    }

    const { data, error } = await supabase
        .from('Children')
        .insert(insertPayload)
        .select()
        .single();

    if (error) {
        console.error('Failed to create child:', error);
        return { success: false, error: error.message || 'Could not create Child' };
    }

    revalidatePath('/[locale]/child/scan')

    return {
        success: true,
        data: data as ChildSession,
    };
}