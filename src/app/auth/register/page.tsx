"use client"
import AuthForm from '@/components/AuthForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { requestHandler } from '@/app/utils/requestHandler'

export default function Login() {
    const router = useRouter()
    const [errors, setErrors] = useState('')

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        await requestHandler({
            method: "POST",
            url: '/auth/register',
            body:{
                email: formData.get('email') as string,
                password: formData.get('password') as string
            }
        }).then((res)=>{
            alert(res.data.message)
            router.refresh() // to revalidate layout
            router.replace('/auth/login/')
        }).catch((err)=>{
            alert(err.response.data.message)
            setErrors(err.response.data.message)
        })
    }

    return <AuthForm title='SIGN UP' formAction={handleRegister} errors={errors} />
}