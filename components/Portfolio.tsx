'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LinkIcon, 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon 
} from "lucide-react"

interface PortfolioContentProps {
  initialData: any
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({ initialData }) => {
  const [portfolioData] = useState(initialData)
  const userName = portfolioData?.user?.name ?? 'Unknown User'
  const userTagline = portfolioData?.profile?.tagline ?? 'Professional Developer'
  const userAvatar = portfolioData?.profile?.picture || '/default-avatar.png'
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">{userName}</CardTitle>
            <p className="text-muted-foreground">{userTagline}</p>
          </div>
        </CardHeader>
      </Card>


    </div>
  )
}

export default PortfolioContent



