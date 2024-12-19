import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  RiDashboardLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiSettingsLine,
  RiMoreFill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export function UserNavigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/auth/login",
    });
  };

  return (
    <>
      {user && (
        <div className="flex justify-between items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2">
            <Avatar className="mr-2 w-10 h-10">
              <AvatarFallback className="text-sm text-white bg-gradient-to-tr from-blue-500 to-purple-600">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-neutral-900">{user?.name}</p>
              <p className="text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 text-neutral-700 hover:bg-neutral-100">
                <RiMoreFill className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-lg p-2 mt-1">
              <DropdownMenuLabel className="font-medium text-sm text-neutral-900">My Account</DropdownMenuLabel>

              {/* User Info in Dropdown */}
              <div className="flex items-center space-x-2 p-2 border-b border-neutral-200">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm text-white bg-gradient-to-tr from-blue-500 to-purple-600">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-xs text-neutral-500">{user?.email}</p>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuItem
                onClick={() => router.push("/profile/dashboard")}
                className="cursor-pointer text-sm text-neutral-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <RiDashboardLine className="mr-2 h-5 w-5 text-neutral-600" />
                <span>Dashboard</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/profile/details")}
                className="cursor-pointer text-sm text-neutral-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <RiUserLine className="mr-2 h-5 w-5 text-neutral-600" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-sm text-neutral-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <RiSettingsLine className="mr-2 h-5 w-5 text-neutral-600" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <RiLogoutBoxLine className="mr-2 h-5 w-5 text-red-600" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
