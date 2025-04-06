"use client"

import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import { useState } from 'react'
import { requestHandler } from '@/app/utils/requestHandler'

export default function Login() {
  const router = useRouter()
  const [errors, setErrors] = useState('')


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    await requestHandler({
      method: 'POST',
      url: '/auth/login/',
      body: {
        email: formData.get('email') as string,
        password: formData.get('password') as string
      }
    }).then((res)=>{
      alert(res.data.message)
      router.refresh() // to revalidate layout
      router.push('/dashboard')
    }).catch((err)=>{
      alert(err.response.data.message)
      setErrors(err.response.data.message)
    })
  }

  return <AuthForm title='LOGIN' formAction={handleLogin} errors={errors}/>
}