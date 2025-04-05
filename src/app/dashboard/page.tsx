"use client"

import { useState } from "react";
import { requestHandler } from "@/app/utils/requestHandler";
import { useRouter } from "next/navigation";
import MarkdownIt from 'markdown-it';
import Prompt from "@/components/Prompt"
import "./page.css"


export default function Dashboard() {
    const [mood, setMood] = useState('')
    const [budget, setBudget] = useState('')
    const [people, setPeople] = useState('')
    const [requests, setRequests] = useState('')
    const [items, setItems] = useState<string[]>(['']);

    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [output, setOutput] = useState('')

    const router = useRouter()
    const md = new MarkdownIt()

    const handleInputChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;

        if (value.trim() !== '' && index === newItems.length - 1 && index + 1 < 10) {
            newItems.push('');
        }

        setItems(newItems);
    };

    const handleItemDelete = (index: number) => {
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
        setActive(true)
        setLoading(true)
        setOutput('')

        const ingredients: string = getCleanItemsString()

        requestHandler({
            url: '/ingredients',
            method: 'POST',
            body: {
                ingredients, mood, budget, people, requests
            }
        }).then(async (res) => {
            setLoading(false)
            setOutput(md.render(res.data.output))
        }).catch((err)=>{
            console.log(err)

            setLoading(false)
            setActive(false)

            if(err.status == 403){
                return alert("You reached your limit of prompts for today")
            }

            alert(err)
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

            <div className="flex justify-center h-full min-h-screen ">
                {active &&
                    <Prompt loading={loading} setActive={setActive} prompt={output} />
                }
                {!active &&

                    <form onSubmit={handlePromptSubmit} className="sm:max-w-[640px] w-full px-4 my-10">
                        <p className="font-bold text-lg text-left">Anong ingredients meron ka ngayon? Pakilista</p>
                        <p className="text-sm text-left">(What ingredients do you have right now? List Them.)</p>

                        <div>
                            {items.map((item, index) => (
                                <div key={index} className="h-full flex justify-between mt-4">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        placeholder="Type an ingredient..."

                                        className={items.length === 1 ? "border-green-700 border-2 p-2 w-full focus:border-4" : "border-green-700 border-2 p-2 w-[75%] focus:border-4"}
                                    />
                                    {index !== 0 &&
                                        <button type="button" onClick={e => handleItemDelete(index)} className="bg-red-500 p-2 ml-2 cursor-pointer hover:bg-amber-500">Delete</button>
                                    }

                                </div>
                            ))}
                        </div>

                        <p className="font-bold text-lg mt-4">Anong type ng pagkain ang gusto mo ngayon? (Sinabawan, Dessert, Etc.)</p>
                        <p className="text-sm text-left">(What type of food do you want to eat? (Soup, Dessert, Etc.))</p>
                        <input type="text" onChange={e => setMood(e.target.value)} className="border-green-700 border-2 focus:border-4 mt-4 p-2 w-full" placeholder="Type your food cravings.." />


                        <p className="font-bold text-lg mt-4">Ilan ang budget mo ngayon?</p>
                        <p className="text-sm text-left">(What's your budget right now?)</p>
                        <input type="number" onChange={e => setBudget(e.target.value)} className="border-green-700 border-2 mt-4 p-2 w-full focus:border-4" placeholder="Type your budget..." />

                        <p className="font-bold text-lg mt-4"> Para sa ilang tao ka magluluto?</p>
                        <p className="text-sm text-left">(For how many people would you cook for?)</p>
                        <input type="number" onChange={e => setPeople(e.target.value)} className="border-green-700 border-2 mt-4 p-2 w-full focus:border-4" placeholder="Type the number of people .." />

                        <p className="font-bold text-lg mt-4">May additional ka bang request? ("Wala kaming kalan", "Madali lang lutuin", etc)</p>
                        <p className="text-sm text-left">(Do you have additional requests? ("We dont have a stove", "Easy to cook", etc))</p>
                        <input type="text" onChange={e => setRequests(e.target.value)} className="border-green-700 border-2 mt-4 p-2 w-full focus:border-4" placeholder="Type your requests..." /><br />

                        <button type="submit" className="bg-green-400 w-full mt-6 cursor-pointer hover:bg-green-700 hover:text-white p-4 " >Generate Recipe</button>
                    </form>
                }
            </div>
        </>
    );
}