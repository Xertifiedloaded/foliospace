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

// Signup Form Validation Schema
const SignupSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type SignupFormData = z.infer<typeof SignupSchema>

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema)
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      // Implement signup logic
      console.log('Signup Data:', data)
      // Typically would call a registration service
    } catch (error) {
      // Handle signup errors
      console.error('Signup failed', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create Your Follio Account</CardTitle>
          <CardDescription>
            Sign up to build and share your professional portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                placeholder="Choose a unique username"
                {...register('username')}
                className="mt-2"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                placeholder="Create a strong password"
                {...register('password')}
                className="mt-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                {...register('confirmPassword')}
                className="mt-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}