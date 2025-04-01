import { NextRequest } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    const supabase = await createClient()

    try {
        const cleanData = userSchema.parse({
            email, password
        })


        const { error } = await supabase.auth.signInWithPassword({
            email: cleanData.email,
            password: cleanData.password
        })

        if (error) {
            redirect('/error')
        }

        revalidatePath('/', 'layout')
        redirect('/dashboard')
    } catch (e) {
        if (e instanceof z.ZodError) {
            console.log('Validation failed:', e.errors);
        }
    }
}