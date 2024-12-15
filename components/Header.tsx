"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  LayoutDashboard,
  Link,
  Share2,
  FileText,
  Palette,
  LogOut,
  Menu as MenuIcon,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface NavItem {
  path: string;
  title: string;
  icon: LucideIcon;
}

const Header: React.FC = () => {
  const navItems: NavItem[] = [
    { path: "/profile/dashboard", title: "Dashboard", icon: LayoutDashboard },
    {
      path: "/profile/details",
      title: "Profile Details",
      icon: LayoutDashboard,
    },
    { path: "/profile/links", title: "Links", icon: Link },
    { path: "/profile/socials", title: "Socials", icon: Share2 },
    { path: "/profile/resume", title: "Resume", icon: FileText },
    { path: "/profile/portfolio", title: "Portfolio", icon: Palette },
    { path: "/profile/page-view", title: "Page View", icon: Palette },
  ];

  const handleNavigation = (path: string): void => {
    window.location.href = path;
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-white">Creatify</h1>
          <Menubar className="hidden md:flex">
            {navItems.map((item) => (
              <MenubarMenu key={item.path}>
                <MenubarTrigger
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>

        <Menubar className="flex md:hidden items-center space-x-4">
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </MenubarTrigger>
            <MenubarContent className="md:hidden">
              {navItems.map((item) => (
                <MenubarItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};

export default Header;
