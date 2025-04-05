import './style.css'
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface AuthFormProps {
    title: string;
    formAction: (formData: FormData) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, formAction }) => {
    const router = useRouter()

    return (
        <div>
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="title text-4xl font-bold mb-2 ">MA, ANO ULAM?</h1>
                <h1 className="text-1xl mb-1 ">{title}</h1>
                <form className="flex flex-col space-y-4 mb-4 min-w-[300px]">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required className="p-2 rounded bg-white border-green-700 border-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required className="p-2 rounded bg-white border-green-700 border-2" />
                    </div>
                    <button type="submit" formAction={formAction} className="button text-white p-2 rounded cursor-pointer font-bold">
                        {title}
                    </button>
                </form>

                {(title.toLowerCase() == "login") &&
                    <p>No Account? <b> <a onClick={() => router.push('/auth/register')} className='cursor-pointer'>Register here</a> </b></p>
                }

                {(title.toLowerCase() == "sign up") &&
                    <p>Already have an Account? <b> <a onClick={() => router.push('/auth/login')} className='cursor-pointer'>Login here</a> </b></p>
                }

                <a onClick={()=>router.push('/about/privacy')} className='cursor-pointer mt-5'>Privacy Policy</a>
            </div>
        </div>
    );
};

export default AuthForm;
