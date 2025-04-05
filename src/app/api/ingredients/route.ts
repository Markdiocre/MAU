import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "@/service/gptService";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest){
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if(!user){
        return NextResponse.json({
            message: "Please log in",
        }, {status: 401})
    }

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    const { count, error } = await supabase
    .from('recipes')
    .select("*", {count: 'exact', head : true})
    .gte('created_at', startOfToday.toISOString())
    .lte('created_at', endOfToday.toISOString())

    if(error){
        return NextResponse.json({
            message: "There's a problem encountered",
            error: error.message
        }, {status: 500})
    }

    if(count && count > 4){
        return NextResponse.json({
            message: "Sorry, You reached the limit of prompts for today",
        }, {status: 403})
    }

    const body = await req.json()
    const resPrompt = await generatePrompt({
        currentIngredients: body.ingredients,
        mood: body.mood,
        budget: body.budget,
        numberOfPeople: body.people,
        request: body.requests
    })

    if(resPrompt){
        const {error} = await supabase
        .from('recipes')
        .insert([
            {
                user_id: user.id,
                recipe: resPrompt
            }
        ])

        if(error){
            return NextResponse.json({
                message: "There's a problem encountered",
                error: error.message
            }, {status: 500})
        }

        return NextResponse.json({
            output: resPrompt
        }, {
            status: 200
        })
    }

    return NextResponse.json({
        message: "There is an error in your request. Please contect the app developer"
    },{
        status: 500
    })
}