"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function UserNavigation() {
  const { data: session } = useSession()
  const user = session?.user || {}
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 text-heading cursor-pointer hover:opacity-80 transition-opacity">
        {/*  @ts-ignore */}
          <AvatarImage src={user.image || undefined} alt={user.name || ""} />
          {/*  @ts-ignore */}
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => router.push("/profile/dashboard")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

