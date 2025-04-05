"use client"

import { useState } from "react";
import { requestHandler } from "@/app/utils/requestHandler";
import { useRouter } from "next/navigation";
import "./page.css"


export default function Dashboard() {
    const [mood, setMood] = useState('')
    const [budget, setBudget] = useState('')
    const [people, setPeople] = useState('')
    const [requests, setRequests] = useState('')

    const [items, setItems] = useState<string[]>(['']);

    const router = useRouter()

    const handleInputChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;

        if (value.trim() !== '' && index === newItems.length - 1) {
            newItems.push('');
        }

        setItems(newItems);
    };

    const handleItemDelete =  (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1)
        setItems(newItems)
    }

    const getCleanItemsString = () => {
        return items
          .filter(item => item.trim() !== '') 
          .flatMap(item => 
            item.split(',').map(part => part.trim()).filter(part => part !== '')
          )
          .join(', ');
      };

    const handlePromptSubmit = (e: any) => {
        e.preventDefault()

        const ingredients : string = getCleanItemsString()

        requestHandler({
            url: '/ingredients',
            method: 'POST',
            body: {
                ingredients, mood, budget, people, requests
            }
        }).then((res) => {
            console.log(res.data.output)
        })
    }

    const handleLogout = async () => {
        await requestHandler({
            url: '/auth/logout',
            method: 'POST',
        }).then((res) => {
            router.push('/')
        })
    }

    return (
        <>
            Ano meron kayo?
            <form onSubmit={handlePromptSubmit}>
                {/* <textarea name="current_ingredients" id="ingredients" onChange={e => setIngredients(e.target.value)} /><br/> */}
                <div>
                    {items.map((item, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder="Type an item..."
                            />
                            <button onClick={e => handleItemDelete(index)}>Delete</button>
                        </div>
                    ))}
                </div>

                Mood: Your current cravings or mood of the ulam (Sinabawan, Fried)<br />
                <input type="text" onChange={e => setMood(e.target.value)} /> <br />

                Budget: What budget you currently have<br />
                <input type="number" onChange={e => setBudget(e.target.value)} /><br />

                Tao: For how many people?<br />
                <input type="number" onChange={e => setPeople(e.target.value)} /><br />

                Additional Request: May additional request ka ba? (Wala kaming kalan)<br />
                <input type="text" onChange={e => setRequests(e.target.value)} /><br />

                <button type="submit">Submit</button>
            </form>

            <button onClick={handleLogout}>Logout</button>
        </>
    );
}