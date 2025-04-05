import { useRouter } from "next/navigation";
import "./style.css"


export default function Navbar(){
    const router = useRouter()
    return (
        <nav className="fixed w-full flex justify-between px-3 py-5">
            <div>
                <a onClick={()=> router.push('/about')} className="cursor-pointer font-bold p-2">ABOUT</a>
            </div>
            <div>
                <a onClick={()=> router.push('/auth/login')} className="cursor-pointer font-bold px-5 py-2 auth">LOGIN</a>
            </div>
        </nav>
    );
}