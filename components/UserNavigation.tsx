import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  RiDashboardLine, 
  RiLogoutBoxLine, 
  RiUserLine, 
  RiSettingsLine, 
  RiMoreFill 
} from "react-icons/ri";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export function UserNavigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  if (!user) return null;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors border-b border-borderColor">
            <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-1 ring-white/10">
              <AvatarFallback className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col">
              <p className="text-sm font-medium text-heading">{user?.name}</p>
              <p className="text-xs text-paragraph">{user?.email}</p>
            </div>
            <RiMoreFill className="w-5 h-5 text-gray-400 md:hidden" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56  border-borderColor border-0 shadow-md rounded-md mt-2" align="end">
          <DropdownMenuLabel className="font-semibold text-heading">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push("/profile/dashboard")}>
            <RiDashboardLine className="mr-2 h-4 w-4 text-gray-500" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/profile/details")}>
            <RiUserLine className="mr-2 h-4 w-4 text-gray-500" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <RiSettingsLine className="mr-2 h-4 w-4 text-gray-500" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            <RiLogoutBoxLine className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserNavigation;
