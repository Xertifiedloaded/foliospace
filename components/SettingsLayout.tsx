"use client";
import React, { ReactNode, useEffect, useState } from "react";


const SettingsLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default SettingsLayout;
