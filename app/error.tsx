import Link from "next/link"
'use client'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

import {AlertCircleIcon} from "lucide-react"
export default function ErrorPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-destructive/10 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <AlertCircleIcon size={64} className="mx-auto text-destructive mb-4" />
            <CardTitle className="text-3xl text-destructive">
              Unexpected Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Something went wrong. Our team has been notified and is working on a fix.
            </p>
            <Button variant="destructive" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }