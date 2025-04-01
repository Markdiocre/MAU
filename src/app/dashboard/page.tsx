"use client"

import { useState } from "react";
import "./page.css"
import { currentIngredientsPrompt } from "@/service/gptService";


export default function Dashboard() {
    const [ingredients, setIngredients] = useState('')
    const [mood,  setMood] = useState('')
    const [budget, setBudget] = useState('')
    const [people, setPeople] = useState('')



    function handlePromptSubmit(){
        currentIngredientsPrompt({
            currentIngredients: ingredients,
            mood: mood,
            budget: Number(budget),
            numberOfPeople: Number(people)
        })
    }

    return (
        <div >
            Ano meron kayo?

            <div>
                <textarea name="current_ingredients" id="ingredients" onChange={e => setIngredients(e.target.value)}>
                    
                </textarea><br/>

                Mood: Your current cravings or mood of the ulam (Sinabawan, Fried)<br/>
                <input type="text" onChange={e => setMood(e.target.value)} /> <br/>

                Budget: What budget you currently have<br/>
                <input type="number" onChange={e => setBudget(e.target.value)}/><br/>

                Tao: For how many people?<br/>
                <input type="number" onChange={e => setPeople(e.target.value)}/>
            </div>

            <button onClick={handlePromptSubmit}>Submit</button>
        </div>
    );
}