'use client'
import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [links, setLinks] = useState([]);
  const [socials, setSocials] = useState([]);
  const [resume, setResume] = useState({
    experiences: [],
    education: [],
    skills: [],
  });

  return (
    <PortfolioContext.Provider
      value={{
        userId,
        setUserId,
        links,
        setLinks,
        socials,
        setSocials,
        resume,
        setResume,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
