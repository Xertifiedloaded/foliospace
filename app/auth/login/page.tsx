// pages/auth/login.tsx
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Login Form Validation Schema
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // Implement login logic
      console.log('Login Data:', data)
      // Typically would call an authentication service
    } catch (error) {
      // Handle login errors
      console.error('Login failed', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login to Follio</CardTitle>
          <CardDescription>
            Enter your credentials to access your portfolio dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className="mt-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link 
              href="/auth/forgot-password" 
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/auth/signup" 
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


