"use client"

import { useState } from "react";
import { requestHandler } from "@/app/utils/requestHandler";
import "./page.css"


export default function Dashboard() {
    const [ingredients, setIngredients] = useState('')
    const [mood,  setMood] = useState('')
    const [budget, setBudget] = useState('')
    const [people, setPeople] = useState('')
    const [requests, setRequests] = useState('')

    function handlePromptSubmit(e: any){
        e.preventDefault()

        requestHandler({
            url: '/ingredients',
            method: 'POST',
            body:{
                ingredients, mood, budget, people, requests
            }
        }).then((res)=>{
            console.log(res.data.output)
        })
    }

    return (
        <div >
            Ano meron kayo?

            <form onSubmit={handlePromptSubmit}>
                <textarea name="current_ingredients" id="ingredients" onChange={e => setIngredients(e.target.value)} /><br/>

                Mood: Your current cravings or mood of the ulam (Sinabawan, Fried)<br/>
                <input type="text" onChange={e => setMood(e.target.value)} /> <br/>

                Budget: What budget you currently have<br/>
                <input type="number" onChange={e => setBudget(e.target.value)}/><br/>

                Tao: For how many people?<br/>
                <input type="number" onChange={e => setPeople(e.target.value)}/><br/>

                Additional Request: May additional request ka ba? (Wala kaming kalan)<br/>
                <input type="text" onChange={e => setRequests(e.target.value)}/><br/>

                <button type="submit">Submit</button>
            </form>

            
        </div>
    );
}