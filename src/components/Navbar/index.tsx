import { useRouter } from "next/navigation";

export default function Navbar(){
    const router = useRouter()
    return (
        <nav className="fixed w-full flex justify-between px-3 py-2">
            <div>
                <a onClick={()=> router.push('/about')} className="cursor-pointer font-bold">ABOUT</a>
            </div>
            <div>
                <a onClick={()=> router.push('/auth/login')} className="cursor-pointer font-bold mr-2">LOGIN</a>
                <a onClick={()=> router.push('/auth/register')} className="cursor-pointer font-bold">REGISTER</a>
            </div>
        </nav>
    );
}