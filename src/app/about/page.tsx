"use client"
import Navbar from "@/components/Navbar"

export default function About() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="sm:text-4xl text-3xl font-bold mb-4">Ma, Ano Ulam?</h1>
                <p className="max-w-[320px] text-center">A passion project by <b> <a href="https://github.com/Markdiocre" className="cursor-pointer" target="_"> MARKDIOCRE </a></b>, made for the benefits of those who cant decide what to eat.</p>
                <br />

                <h3 className="max-w-[320px] text-center"><b>Connect with me</b> : mark.manuel.business@gmail.com</h3>
            </div>
        </div>
    )
}