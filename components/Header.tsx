"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MenuIcon } from "lucide-react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { navItems } from "@/utils/data";

// Define the shape of navigation items
interface NavItem {
  path: string;
  title: string;
  icon: React.ElementType;
}

const Header: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="sticky bg-background top-0 z-50 shadow-md text-heading">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <RiCheckboxCircleLine className="mr-2 text-2xl text-blue-600 dark:text-blue-400" />
            <span className="lg:text-xl text-sm font-black text-neutral-900 dark:text-white tracking-tight">
              FolioSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <Menubar className="hidden md:flex border-0">
            {navItems.map((item: NavItem) => (
              <MenubarMenu key={item.path}>
                <MenubarTrigger
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer border-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>

        {/* Mobile Navigation Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="md:hidden bg-transparent text-heading">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 border-0 shadow-md rounded-md">
            {navItems.map((item: NavItem) => (
              <DropdownMenuItem
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="cursor-pointer flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="h-4 w-4 text-gray-600" />
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
