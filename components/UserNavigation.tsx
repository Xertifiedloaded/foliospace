  /* @ts-ignore  */
"use client";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserNavigation() {
  const { data: session } = useSession();
  const user = session?.user || {};
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };
  const renderAvatar = () => {
          /*  @ts-ignore */
    if (user.image) {
      return (
        <img
          /*  @ts-ignore */
          src={user.image || undefined}
          /*  @ts-ignore */
          alt={user.name || "User Avatar"}
          className="h-full w-full rounded-full object-cover"
        />
      );
    }

    return (
      <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
        {/* @ts-ignore  */}
        {user.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 cursor-pointer hover:opacity-80  transition-opacity"
      >
        {renderAvatar()}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background border border-white rounded-md shadow-lg z-50 overflow-hidden">
          <div
            onClick={() => handleMenuItemClick("/profile/dashboard")}
            className="px-4 py-2  hover:text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          >
            Profile
          </div>

          <div
            onClick={() => handleMenuItemClick("/settings")}
            className="px-4 py-2 hover:text-black hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          >
            Settings
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100 my-1"></div>

          <div
            onClick={() => signOut()}
            className="px-4 py-2  hover:text-black hover:bg-red-50 cursor-pointer text-red-600 transition-colors duration-200"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
