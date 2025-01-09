import { BatteryCharging, WifiHigh } from "lucide-react";
import React, { ReactNode } from "react";

export const IPhoneFrame: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[390px] h-[844px] bg-black rounded-[50px] overflow-hidden shadow-2xl dark:bg-gray-900">
        <div className="absolute inset-[4px] bg-gray-900 rounded-[50px] dark:bg-gray-800"></div>
        <div className="absolute inset-[8px] bg-white rounded-[46px] overflow-hidden dark:bg-gray-800">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black w-[150px] h-[30px] rounded-[30px]"></div>
          <div className="absolute top-[10px] left-0 w-full flex justify-between px-4 text-xs text-gray-700 dark:text-gray-300">
            <div className="flex font-bold items-center space-x-1 text-sm">12:45</div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-bold dark:text-gray-400">5G</span>
              <WifiHigh className="text-gray-700 dark:text-gray-300" />
              <BatteryCharging className="text-gray-700 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex p-4 flex-col h-full pt-16 overflow-y-auto">
            {children}
          </div>
        </div>
        <div className="absolute left-[-4px] top-[140px] w-[4px] h-[80px] bg-gray-700 rounded-r-md dark:bg-gray-600"></div>
        <div className="absolute left-[-4px] top-[240px] w-[4px] h-[60px] bg-gray-700 rounded-r-md dark:bg-gray-600"></div>
        <div className="absolute right-[-4px] top-[180px] w-[4px] h-[100px] bg-gray-700 rounded-l-md dark:bg-gray-600"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[120px] h-[4px] bg-gray-600 rounded-lg dark:bg-gray-500"></div>
      </div>
    </div>
  );
};
