import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  RiDashboardLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiSettingsLine,
  RiMoreFill,
} from "react-icons/ri";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function UserNavigation() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout().then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      {user && (
        <div className="flex     justify-between items-center space-x-2">
          <div className="flex items-center">
            <Avatar className="mr-2">
              <AvatarFallback>
                {user?.name?.charAt(0) || user?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {user?.name || user?.username}
              </p>
              <p className="text-xs text-gray-500 -mt-0.5">{user?.email}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RiMoreFill className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile/dashboard")}
                className="cursor-pointer"
              >
                <RiDashboardLine className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                <RiUserLine className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/settings")}
                className="cursor-pointer"
              >
                <RiSettingsLine className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <RiLogoutBoxLine className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
