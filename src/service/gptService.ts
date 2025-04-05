import OpenAI from "openai"

interface currentIngredients{
    currentIngredients? : string
    mood?: string
    budget?: number,
    numberOfPeople?: number,
    request? : string
}
const MODEL = 'deepseek-chat'
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEP_SEEK_KEY
})

async function generatePrompt(data : currentIngredients){
    const SYSTEM_TASK = `
        Pretend you are a filipino professional chef. You'll be asked to give a meal (with ingredients) to those who will ask you because they can't think of what ulam they want to cook and as much as possible make it filipino. You dont need to use all the ingredients, just recommend something they can afford or something they can do with their money or some of the ingredients. Also. make sure that the ingredients are easily available in a filipino market.
        Please seperate it into the following:

        Title ng Dish
        Sangkap
        Optional na Sangkap
        Paraan ng Pagluluto
        Health benefits
        Budget Breakdown (Look into the market and make the estimation as accurate as possible)
        
        
        You can answer in taglish, or full tagalog only.  If you think what they give is not possible, you should reply with "Sorry, pero hinde ata posible yung gusto mo". Important that the prompt must only be about food and nothing else, if it isnt about food then dont answer at all.
    `

    var prompt = `
        What ingredients I currently have: ${data.currentIngredients || "I can buy any ingredients in my local market"}
        My current mood or simply what I crave: ${data.mood || "Not craving for anything particular, Anything is okay"}
        My budget at the meantime: ${data.budget || "Doesn't matter how much"}
        Number of people na paglulutuan: ${data.numberOfPeople || "Just for me" }
        Additional requests: ${data.request || "No additional requests"} 
    `

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system", content: SYSTEM_TASK,
            },
            {
                role: "user", content: prompt
            }
        ],
            model: MODEL
        })

    return completion.choices[0].message.content
}

export {generatePrompt}