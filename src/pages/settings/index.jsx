import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { settingsCategories } from "../../../utils";
import SettingsLayout from "../../../components/SettingsLayout";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsNavOpen(false);
  };

  const activeCategory = settingsCategories.find((cat) => cat.id === activeTab);

  return (
    <SettingsLayout>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <SettingsHeader isNavOpen={isNavOpen} toggleNav={toggleNav} />

        <div className="">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Navigation
                isNavOpen={isNavOpen}
                activeTab={activeTab}
                handleTabClick={handleTabClick}
                setIsNavOpen={setIsNavOpen}
              />

              <SettingsContent activeCategory={activeCategory} />
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsPage;

const Navigation = ({ isNavOpen, activeTab, handleTabClick, setIsNavOpen }) => {
  return (
    <>
      <nav
        className={`
            md:sticky md:top-[73px] w-full md:w-64 
            bg-white dark:bg-gray-800 z-40 
            transform transition-transform duration-300 ease-in-out
            md:transform-none flex-shrink-0 
            ${
              isNavOpen
                ? "fixed top-[73px] left-0 h-[calc(100vh-73px)]"
                : "fixed top-[73px] -left-full h-[calc(100vh-73px)]"
            }
            md:relative md:left-0 md:h-auto
          `}
      >
        <div className="p-4 space-y-1 overflow-y-auto h-full">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabClick(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === category.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </nav>

      {isNavOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </>
  );
};

const SettingsHeader = ({ isNavOpen, toggleNav }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={toggleNav}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

const SettingsContent = ({ activeCategory }) => {
  const router = useRouter();

  const renderSection = (section) => (
    <div key={section.title} className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
      <div className="space-y-3">
        {section.features.map((feature) => (
          <div
            key={feature.name}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span>{feature.name}</span>
            <button
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
           <a href={feature.path}>
            Configure
           </a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold mb-6">{activeCategory?.label}</h2>
      {activeCategory?.sections.map(renderSection)}
    </main>
  );
};
