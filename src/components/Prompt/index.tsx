import { Dispatch, SetStateAction } from "react"

interface PromptInterface {
    setActive: Dispatch<SetStateAction<boolean>>
    loading: boolean
    prompt: string
}

const Prompt: React.FC<PromptInterface> = ({ setActive, loading, prompt }) => {



    return (<>

        {loading && <div className="flex items-center justify-center gap-2 border sm:w-[650px] w-full bg-amber-200 p-2 my-10">
            <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-gray-700">Loading  Recipe...</span>
        </div>}

        {!loading && <div className="border sm:w-[650px] w-full bg-amber-200 p-2 my-10 mx-4">

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: prompt }}
            />

            <button type="button" className="w-full text-white font-bold bg-green-700 hover:bg-green-950  p-4 mt-6 cursor-pointer " onClick={() => setActive(false)}>CLOSE</button>

        </div>}
    </>)
}

export default Prompt;