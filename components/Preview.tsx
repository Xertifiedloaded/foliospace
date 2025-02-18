"use client";

import { useState, useEffect } from "react";
import {
  BatteryCharging,
  WifiIcon as WifiHigh,
  Signal,
  Lock,
} from "lucide-react";
import React, { ReactNode } from "react";

export const IPhoneFrame: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[430px] h-[932px] bg-[#1C1C1E] rounded-[55px] overflow-hidden shadow-xl">
        <div className="absolute inset-[3px] bg-black rounded-[52px] overflow-hidden">
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[160px] h-[34px] rounded-b-[20px] z-10">
            <div className="absolute top-[8px] left-[50px] w-[8px] h-[8px] bg-[#3a3a3c] rounded-full"></div>
            <div className="absolute top-[8px] right-[50px] w-[12px] h-[12px] bg-[#3a3a3c] rounded-full"></div>
          </div>
        </div>
        <div className="absolute inset-[8px] bg-white rounded-[46px] overflow-hidden dark:bg-gray-800">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black w-[150px] h-[30px] rounded-[30px]"></div>
          <div className="absolute top-[12px] left-0 w-full flex justify-between px-8 text-xs text-white z-20">
            <CurrentTime />
            <div className="flex items-center space-x-2">
              {/* <Signal size={16} /> */}
              <span className="font-medium">5G</span>
              <WifiHigh size={16} />
              <BatteryCharging size={16} />
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

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex font-bold justify-around items-center space-x-1 text-xs">
      {formattedTime}
    </div>
  );
};
