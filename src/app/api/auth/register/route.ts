import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import {z }from 'zod';

const userSchema = z.object({
    email: z.string({
        required_error: "Email must be provided"
    }).email('Invalid email address'),
    password: z.string({
        required_error: "Email must be provided"
    }).min(8, 'Password must be at least 8 characters long'),
});

export async function POST(request: NextRequest){
    const supabase =await createClient()
    const {email, password} = await request.json();

    try{
        const cleanData = await userSchema.parse({
            email, password
        })

        const { error } = await supabase.auth.signUp(cleanData)

        if(error){
            return NextResponse.json({
                message: error.message
            },{
                status: 400
            })
        }

        return NextResponse.json({
            message: "Registered! Confirm your email by using the email you registered in this application."
        }, {
            status: 200
        })
    }catch(e){
        if (e instanceof z.ZodError) {
            return NextResponse.json({
                message: e.errors[0].message
            }, {
                status: 400
            })
        }
    }
}
