"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { RiCheckboxCircleLine, RiMenuLine, RiLogoutBoxLine, RiUserLine } from "react-icons/ri"
import { navItems } from "@/utils/data"
import { useSession, signOut } from "next-auth/react"
import { X } from "lucide-react"

const Header: React.FC = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobileView()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobileView)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobileView)
    }
  }, [])

  useEffect(() => {
    // Only prevent scrolling if menu is open AND we're in mobile view
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden"
      // Prevent scrolling on mobile
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      // Restore scrolling
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [isMenuOpen, isMobile])

  const shouldShowHeader = useCallback(() => {
    if (!pathname) return false
    if (pathname === "/") return true
    if (pathname === "/profile" || pathname.startsWith("/profile/")) return true
    if (pathname === "/portfolio" || pathname.startsWith("/portfolio/")) return false

    return false
  }, [pathname])

  useEffect(() => {
    setShowHeader(shouldShowHeader())
  }, [shouldShowHeader])

  if (!showHeader) return null

  const handleSignOut = async () => {
    setIsMenuOpen(false)
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  if (status === "unauthenticated") {
    return (
      <header
        className={`
          w-full top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-black text-white"}
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <RiCheckboxCircleLine className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
              <span
                className={`text-lg sm:text-xl font-bold tracking-tight ${isScrolled ? "text-gray-800" : "text-white"}`}
              >
                FolioSpace
              </span>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/auth/login"
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors
                  ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
  }

  // If there is a session, show the full header
  return (
    <header
      className={`
        w-full top-0 left-0 right-0 z-50 overflow-hidden
        transition-all duration-300 ease-in-out
        ${isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-black text-white"}
      `}
    >
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <RiCheckboxCircleLine className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            <span
              className={`text-lg sm:text-xl font-bold tracking-tight ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              FolioSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center space-x-1 mr-2 lg:mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : `${
                            isScrolled
                              ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              : "text-white hover:bg-white/10"
                          }`
                    }
                  `}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-1">

              <button
                onClick={handleSignOut}
                className={`
                  px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                  ${isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"}
                `}
              >
                <RiLogoutBoxLine className="mr-1" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                p-2 rounded-md focus:outline-none transition-colors
                ${isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"}
              `}
              aria-label="Toggle menu"
            >
              <RiMenuLine className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`
              fixed inset-0 bg-black/50 z-40 md:hidden
              transition-opacity duration-300 ease-in-out
              ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className={`
                absolute top-0 right-0 w-64 h-full bg-white shadow-xl
                transition-transform duration-300 ease-in-out
                ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold">Menu</span>
                  <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-800">
                    <X className="h-6 w-6 transform rotate-45" />
                  </button>
                </div>

                {/* User Info (Mobile) */}
                {session?.user && (
                  <div className="mb-6 pb-4 border-b">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {session.user.name?.[0] || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-black">{session.user.name || "User"}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[180px]">{session.user.email || ""}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links (Mobile) */}
                <nav className="space-y-1 mb-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          pathname === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                      `}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>

                {/* User Actions (Mobile) */}
                <div className="space-y-1 pt-4 border-t">
                  <Link
                    href="/profile/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <RiUserLine className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <RiLogoutBoxLine className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

