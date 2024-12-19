import React, { ReactNode } from "react";
export const IPhoneFrame: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[340px] h-[690px] bg-black rounded-[50px] overflow-hidden shadow-2xl">
        <div className="absolute inset-[4px] bg-gray-900 rounded-[50px]"></div>
        <div className="absolute inset-[8px] bg-white rounded-[46px] overflow-hidden">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black w-[150px] h-[30px] rounded-[30px]"></div>
          <div className="flex flex-col h-full pt-16 overflow-y-auto">
            {children}
          </div>
        </div>
        <div className="absolute left-[-2px] top-[140px] w-[2px] h-[60px] bg-gray-700"></div>
        <div className="absolute left-[-2px] top-[240px] w-[2px] h-[80px] bg-gray-700"></div>
        <div className="absolute right-[-2px] top-[140px] w-[2px] h-[60px] bg-gray-700"></div>
        <div className="absolute right-[-2px] top-[240px] w-[2px] h-[80px] bg-gray-700"></div>
      </div>
    </div>
  );
};