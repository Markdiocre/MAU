"use client"
import AuthForm from '@/components/AuthForm'
import { signup } from '../action'

export default function Login() {
    return <AuthForm title='SIGN UP' formAction={signup} />
}