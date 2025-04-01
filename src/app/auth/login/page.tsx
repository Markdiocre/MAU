"use client"

import { login } from '../action'
import AuthForm from '@/components/AuthForm'

export default function Login() {


  return <AuthForm title='LOGIN' formAction={login} />
}