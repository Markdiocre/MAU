import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/server'

const userSchema = z.object({
    email: z.string({
        required_error: "Email must be provided"
    }).email('Invalid email address'),
    password: z.string({
        required_error: "Password must be provided"
    }),
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
            return NextResponse.json({
                message: error.message
            }, {
                status: 400
            })
        }

        return NextResponse.json({
            message: "Login successful!"
        }, {
            status: 200
        })
    } catch (e) {
        if (e instanceof z.ZodError) {
            return NextResponse.json({
                message: e.errors[0].message
            }, {
                status: 400
            })
        }
    }
}