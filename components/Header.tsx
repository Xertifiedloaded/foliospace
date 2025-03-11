"use client"

import type React from "react"
import { useState } from "react" 
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { RiCheckboxCircleLine } from "react-icons/ri"
import { navItems } from "@/utils/data"
import { Menu } from "lucide-react"
import Link from "next/link"

interface NavItem {
  path: string
  title: string
  icon: React.ElementType
}

const Header: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleNavigation = (path: string) => {
    setOpen(false) 
    router.push(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <RiCheckboxCircleLine className="h-6 w-6 text-primary" />
            <span className="font-bold">FolioSpace</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center text-sm font-medium">
            {navItems.map((item: NavItem) => (
              <Button
                key={item.path}
                variant="ghost"
                className="hidden text-heading md:inline-flex"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                className="px-4 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item: NavItem) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full text-heading justify-start"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header

