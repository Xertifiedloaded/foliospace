import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RiDashboardLine, RiLogoutBoxLine, RiUserLine, RiSettingsLine, RiMoreFill } from "react-icons/ri";
import { useRouter } from "next/router";
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

  if (!user) return null;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex border-borderColor border-b  items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center space-x-3">
              <Avatar className="md:h-10 md:w-10 h-8 w-8 ring-1 ring-white/10">
                <AvatarFallback className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="md:text-sm text-xs font-medium text-heading">
                  {user?.name}
                </p>
                <p className="text-xs text-paragraph">
                  {user?.email}
                </p>
              </div>
            </div>
            <RiMoreFill className="w-5 h-5 text-gray-400" />
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 border-0 mt-2" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => router.push("/profile/dashboard")}>
            <RiDashboardLine className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => router.push("/profile/details")}>
            <RiUserLine className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <RiSettingsLine className="mr-2 h-4 w-4" />
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