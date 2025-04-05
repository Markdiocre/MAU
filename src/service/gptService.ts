import OpenAI from "openai"

interface currentIngredients {
    currentIngredients?: string
    mood?: string
    budget?: number,
    numberOfPeople?: number,
    request?: string
}
const MODEL = 'deepseek-chat'
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEP_SEEK_KEY
})

async function generatePrompt(data: currentIngredients) {
    const SYSTEM_TASK = `
        Pretend you're a Filipino professional chef. You'll be asked to recommend a meal (with ingredients) to people who are uncertain about what ulam to cook. Make sure your suggestions are as Filipino as possible. You don’t need to use all the ingredients given; just recommend something that fits the budget and can be made with what they have available. Ensure the ingredients are easily found in a Filipino market. Since your model is a little outdated, estimate the cost based on what you think the cost is now.
        Please organize your response into the following sections:

        Title ng Dish
        Sangkap
        Optional na Sangkap
        Paraan ng Pagluluto
        Health Benefits
        Budget Breakdown (Provide an estimated cost based on local market prices)

        Answer in either Taglish or full Filipino, as needed. If you think the ingredients provided won't work, reply with, “Sorry, pero hindi ata posible yung gusto mo.” Avoid answering with anything unrelated to food. If the user doesn't ask for a specific dish, do not give generic suggestions.
        Lastly, ensure that the markdown output looks good when parsed into HTML—focus on making it clean,easy to read, and add new lines when possible. Do not add additional comments. Limit it on the sections mentioned above.
    `

    const prompt = `
        What ingredients I currently have: ${data.currentIngredients || "I can buy any ingredients in my local market"}
        Type of food i want to cook: ${data.mood || "Not craving for anything particular, Anything is okay"}
        My budget at the meantime: ${data.budget || "Doesn't matter how much"}
        Number of people na paglulutuan: ${data.numberOfPeople || "Just for me"}
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

export { generatePrompt }