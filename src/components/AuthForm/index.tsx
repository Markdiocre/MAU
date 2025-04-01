interface AuthFormProps {
    title: string;
    formAction: (formData: FormData) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, formAction }) => {
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <form className="flex flex-col space-y-4">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required className="border p-2 rounded" />

                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required className="border p-2 rounded" />

                <button type="submit" formAction={formAction} className="bg-blue-500 text-white p-2 rounded">
                    {title}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
