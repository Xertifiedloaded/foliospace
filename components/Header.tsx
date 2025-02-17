"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { MenuIcon} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { navItems } from "@/utils/data";


const Header: React.FC = () => {

  const handleNavigation = (path: string): void => {
    window.location.href = path;
  };

  return (
    <header className="sticky bg-background  top-0 z-50 shadow-md text-heading">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <RiCheckboxCircleLine className="mr-2 text-2xl text-blue-600 dark:text-blue-400" />
            <span className="lg:text-xl text-sm font-black text-neutral-900 dark:text-white tracking-tight">
              FolioSpace
            </span>
          </div>
          <Menubar className="hidden border-0 md:flex">
            {navItems.map((item) => (
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

        <Menubar className="flex md:hidden items-center space-x-4">
          <MenubarMenu>
            <MenubarTrigger className="border-0" asChild>
              <Button variant="default" className="md:hidden bg-transparent text-heading">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </MenubarTrigger>
            <MenubarContent className="md:hidden border-0">
              {navItems.map((item) => (
                <MenubarItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="cursor-pointer py-1 bg-background"
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
