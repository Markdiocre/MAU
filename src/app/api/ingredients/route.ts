import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from "@/service/gptService";


export async function POST(req: NextRequest){
    const body = await req.json()
    const resPrompt = await generatePrompt({
        currentIngredients: body.ingredients,
        mood: body.mood,
        budget: body.budget,
        numberOfPeople: body.people,
        request: body.requests
    })

    if(resPrompt){
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